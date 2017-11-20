import UniqueValueRenderer = require("esri/renderers/UniqueValueRenderer");
import MeshSymbol3D = require("esri/symbols/MeshSymbol3D");
import FillSymbol3DLayer = require("esri/symbols/FillSymbol3DLayer");

const colorPalletes = [
  ['#877C6A', '#A57150', '#D9CCB2', '#C8C7B5', '#9D9486', '#C5AC95', '#DED0C2', '#A87268'],
  ['#FCFBFA', '#9F9297', '#9EA19C', '#E0D2CE', '#7D7A80', '#DBD9D7', '#D5C5B9', '#E8EDE1', '#AFA5A7', '#594D4E', '#675D61']
];
let i = 0;

function getRandomRenderer(field): UniqueValueRenderer {
  i++;
  let index = i % colorPalletes.length;
  const colors = colorPalletes[index];
  const uniqueValueInfos = colors.map((color: string, index: number) => {
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
    }
  })

  let renderer:UniqueValueRenderer = new UniqueValueRenderer({
    valueExpression: `$feature.${field} % ${colorPalletes[index].length}`,
    uniqueValueInfos: uniqueValueInfos
  });

  return renderer;

}

export {getRandomRenderer};