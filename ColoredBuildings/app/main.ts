import WebScene = require("esri/WebScene");
import SceneView = require("esri/views/SceneView");
import SceneLayer = require("esri/layers/SceneLayer");
import rendererGenerator = require("./rendererGenerator");
;
const webscene = new WebScene({
  portalItem: {
    id: "03a9607d96244883af64c7f8c7e5de1b"
  }
});

const view = new SceneView({
  map: webscene,
  container: "viewDiv"
});

let layer = new SceneLayer({
  portalItem: {
    id: "5ecba5273b2d41ff9f6f1eb33f238d18"
  },
  title: "Buildings in Helsinki"
});
webscene.add(layer);

layer.renderer = rendererGenerator.getRandomRenderer();

document.getElementById('changeColor').addEventListener('click', () => {
  layer.renderer = rendererGenerator.getRandomRenderer();
})

