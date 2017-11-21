import WebScene = require("esri/WebScene");
import SceneView = require("esri/views/SceneView");
import SceneLayer = require("esri/layers/SceneLayer");
import rendererGenerator = require("./rendererGenerator");
import BasemapGallery = require("esri/widgets/BasemapGallery");
import all = require("dojo/promise/all");

let webscene = new WebScene({
    portalItem: {
        id: "7722874d77644b54b009be7eb7c9925e"
    }
});

let view = new SceneView({
    map: webscene,
    container: "viewDiv"
});

view.ui.empty("top-left");

let basemapGallery = new BasemapGallery({
  view: view
});
// Add widget to the bottom left corner of the view
view.ui.add(basemapGallery, { position: "bottom-right" });

interface layerMetadata {
    name: string;
    portalItemId: string;
    title: string;
}

let layerMetadataArray: Array<layerMetadata> = [{
    name: 'Helsinki',
    portalItemId: '5ecba5273b2d41ff9f6f1eb33f238d18',
    title: 'Buildings in Helsinki'
}, {
    name: 'New York',
    portalItemId: 'c4054b475e60472f8d24585287ceebca',
    title: 'Buildings in New York'
}, {
    name: 'Lyon',
    portalItemId: '2342ab7928834076a1240fb93c60e978',
    title: 'Buildings in Lyon'
}];


let layers: Array<SceneLayer> = layerMetadataArray.map((meta) => {
    return new SceneLayer({
        portalItem: {
            id: meta.portalItemId
        },
        title: meta.title
    })
});

webscene.addMany(layers);

function getLayer(title: string): SceneLayer {
    return layers.find((e:SceneLayer) => {
        return (e.title === title);
    });
}

const list: HTMLElement = document.getElementById('cityList');
list.addEventListener('click', function(evt) {
    let target = <HTMLElement>evt.target;
    let layerMetadata = layerMetadataArray.find((e) => e.title === target.textContent);
    let layer = getLayer(target.textContent);
    history.pushState({layer: layerMetadata}, '', `#${layerMetadata.name}`);
    view.goTo(layer.fullExtent)
        .then(() => console.log("success"))
        .otherwise((err) => console.log(err));
});

function historyStateChanged(layer) {
    view.goTo(getLayer(layer.title).fullExtent);
}

window.onpopstate = function(history) {
    if (history.state) {
        historyStateChanged(history.state.layer);
    }
  }
function setRenderers(): void {
    for (let i = 0; i < layers.length; i++) {
        let layer = layers[i];
        layer.renderer = rendererGenerator.getRandomRenderer(layer.objectIdField);
    }
}

all(layers.map((l) => l.load())).then(() => {
    if (window.location.hash) {
        let hash = window.location.hash.split("#")[1];
        view.goTo(getLayer(`Buildings in ${hash.replace('%20', ' ')}`).fullExtent)
          .then(() => console.log("success"))
          .otherwise((err) => console.log(err));
    }
});

document.getElementById('changeColor').addEventListener('click', () => {
    setRenderers();
});
