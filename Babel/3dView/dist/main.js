define(["esri/Map", "esri/WebScene", "esri/views/MapView", "esri/views/SceneView", "esri/widgets/Home", "esri/widgets/Fullscreen", "esri/geometry/Point", "esri/Graphic"], function (_Map, _WebScene, _MapView, _SceneView, _Home, _Fullscreen, _Point, _Graphic) {
    "use strict";

    var _Map2 = _interopRequireDefault(_Map);

    var _WebScene2 = _interopRequireDefault(_WebScene);

    var _MapView2 = _interopRequireDefault(_MapView);

    var _SceneView2 = _interopRequireDefault(_SceneView);

    var _Home2 = _interopRequireDefault(_Home);

    var _Fullscreen2 = _interopRequireDefault(_Fullscreen);

    var _Point2 = _interopRequireDefault(_Point);

    var _Graphic2 = _interopRequireDefault(_Graphic);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var map = new _WebScene2.default({
        portalItem: {
            id: "53ed0a887ec7409692a7d1c6ba0e6763"
        },
        ground: "world-elevation"
    });
    var view = new _SceneView2.default({
        map: map,
        container: "viewDiv"
    });

    var homeBtn = new _Home2.default({
        view: view
    });
    view.ui.add(homeBtn, "top-left");

    view.when(function () {
        /* Create an overview map and add it to the lower left corner
        when the scene view is modified udpate overview map */
        var insetDiv = document.createElement("div");
        insetDiv.classList.add("inset-map");
        var insetView = new _MapView2.default({
            map: map,
            center: view.camera.position,
            scale: view.scale * 4 * Math.max(view.width / 250, view.height / 250),
            container: insetDiv,
            constraints: {
                rotationEnabled: false
            },
            ui: {
                components: []
            }
        });
        view.ui.add(insetView.container, "bottom-left");

        var fullScreen = new _Fullscreen2.default({
            view: insetView
        });
        insetView.ui.add(fullScreen, "bottom-left");

        insetView.when(function () {
            updateOverview();
            view.watch("stationary", updateOverview);
            insetView.on("click", insetMapClicked);
        });

        function insetMapClicked(e) {

            // 2d map clicked - navigate to location on 3d map
            view.map.ground.queryElevation(e.mapPoint).then(function (result) {

                // the clicked point is the point from where I look
                /* result.geometry.z *= 5;
                const camera = view.camera.clone();
                camera.position = result.geometry;
                view.camera = camera; */

                // the clicked point is the point to look at
                view.goTo(result.geometry);
                updateGraphic();
            });
        }
        window.view = view;

        function updateGraphic() {

            insetView.graphics.removeAll();

            var location = new _Graphic2.default({
                geometry: view.camera.position,
                symbol: {
                    type: "text",
                    color: "#FFFF00",
                    text: "\uE688",
                    angle: view.camera.heading,
                    font: {
                        size: 22,
                        family: "CalciteWebCoreIcons"
                    }
                }
            });
            insetView.graphics.add(location);
        }

        function updateOverview() {
            if (view) {
                insetView.goTo({
                    center: view.camera.position,
                    scale: view.scale * 4 * Math.max(view.width / insetView.width, view.height / insetView.height)
                }).then(function () {
                    updateGraphic();
                });
            }
        }
    });
});