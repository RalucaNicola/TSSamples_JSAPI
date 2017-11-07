define(["require", "exports", "esri/WebScene", "esri/views/SceneView", "esri/layers/SceneLayer", "./rendererGenerator"], function (require, exports, WebScene, SceneView, SceneLayer, rendererGenerator) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ;
    var webscene = new WebScene({
        portalItem: {
            id: "03a9607d96244883af64c7f8c7e5de1b"
        }
    });
    var view = new SceneView({
        map: webscene,
        container: "viewDiv"
    });
    var layer = new SceneLayer({
        portalItem: {
            id: "5ecba5273b2d41ff9f6f1eb33f238d18"
        },
        title: "Buildings in Helsinki"
    });
    webscene.add(layer);
    layer.renderer = rendererGenerator.getRandomRenderer();
    document.getElementById('changeColor').addEventListener('click', function () {
        layer.renderer = rendererGenerator.getRandomRenderer();
    });
});
//# sourceMappingURL=main.js.map