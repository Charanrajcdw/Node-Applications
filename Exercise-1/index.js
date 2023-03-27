const fs = require("fs").promises;

async function createAndReadRandomColors() {
  //reading from color palette json
  let colorPalette;
  let colorPaletteLength;
  colorPalette = JSON.parse(await fs.readFile("./color_palette.json", "utf-8"));
  colorPaletteLength = colorPalette.length;

  //writing to random color palette json
  let randomColorPalette = [];
  for (let itemCount = 0; itemCount < 5; itemCount++) {
    randomColorPalette.push(colorPalette[Math.floor(Math.random() * colorPaletteLength)]);
  }
  await fs.writeFile("./random_color_palette.json", JSON.stringify(randomColorPalette));

  //reading from random color palette json
  colorPalette = await fs.readFile("./random_color_palette.json", "utf-8");
  colorPalette = JSON.parse(colorPalette);
  console.log(colorPalette);
}

createAndReadRandomColors();
