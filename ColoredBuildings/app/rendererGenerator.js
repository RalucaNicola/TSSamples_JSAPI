define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var colorPalletes = [
        ['#c2d2ea', '#93a6c4', '#7a879b', '#4d668e'],
        ['#c9e8e0', '#bdc9c6', '#8aa39d', '#b6efe1'],
        ['#ffe7af', '#eddebb', '#e8dfc9'],
        ['#9b8eaf', '#bab4c4', '#d8cee8', '#937aba', '#ceafff']
    ];
    var i = 0;
    function getRandomRenderer() {
        i++;
        var index = i % colorPalletes.length;
        var colors = colorPalletes[index];
        var uniqueValueInfos = colors.map(function (color, index) {
            return {
                value: index,
                symbol: {
                    type: "mesh-3d",
                    symbolLayers: [{
                            type: "fill",
                            material: {
                                color: color,
                                colorMixMode: "replace"
                            }
                        }]
                }
            };
        });
        var renderer = {
            type: "unique-value",
            valueExpression: 'Floor(Random() * ' + colorPalletes[index].length + ')',
            //valueExpression: '$feature.OBJECTID - Floor($feature.OBJECTID / 4) * 4',
            uniqueValueInfos: uniqueValueInfos
        };
        return renderer;
    }
    exports.getRandomRenderer = getRandomRenderer;
});
//# sourceMappingURL=rendererGenerator.js.map