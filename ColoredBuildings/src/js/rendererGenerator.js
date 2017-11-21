define(["require", "exports", "esri/renderers/UniqueValueRenderer", "esri/symbols/MeshSymbol3D", "esri/symbols/FillSymbol3DLayer"], function (require, exports, UniqueValueRenderer, MeshSymbol3D, FillSymbol3DLayer) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const colorPalletes = [
        ['#786D4D', '#A19271', '#997263', '#8A8477'],
        ['#FFFFFF', '#E5E4E3', '#C4C0BA', '#B0A795', '#B49C6F', '#797C7F', '#9C9C9D', '#C5C5C5'],
        ['#A0745B', '#8A5638', '#9B3D08', '#91461C', '#9B3D08'],
        ['#877C6A', '#A57150', '#D9CCB2', '#C8C7B5', '#9D9486', '#C5AC95', '#DED0C2', '#A87268'],
        ['#FCFBFA', '#9F9297', '#9EA19C', '#E0D2CE', '#7D7A80', '#DBD9D7', '#D5C5B9', '#E8EDE1', '#AFA5A7', '#594D4E', '#675D61']
    ];
    let i = 0;
    function getRandomRenderer(field) {
        i++;
        let index = i % colorPalletes.length;
        const colors = colorPalletes[index];
        const uniqueValueInfos = colors.map((color, index) => {
            return {
                value: index,
                symbol: new MeshSymbol3D({
                    symbolLayers: [new FillSymbol3DLayer({
                            material: {
                                color: color,
                                colorMixMode: "replace"
                            }
                        })]
                })
            };
        });
        let renderer = new UniqueValueRenderer({
            valueExpression: `$feature.${field} % ${colorPalletes[index].length}`,
            uniqueValueInfos: uniqueValueInfos
        });
        return renderer;
    }
    exports.getRandomRenderer = getRandomRenderer;
});
