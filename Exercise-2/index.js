const http = require("http");
const { readColorFile, writeColorFile } = require("./file_operations");

async function createAndReadRandomColors(res) {
  //reading from color palette
  let colorPalette = await readColorFile("./color_palette.json");
  let colorPaletteLength = colorPalette.length;

  //writing to random color palette
  let randomColorPalette = [];
  for (let itemCount = 0; itemCount < 5; itemCount++) {
    randomColorPalette.push(colorPalette[Math.floor(Math.random() * colorPaletteLength)]);
  }
  await writeColorFile("./random_color_palette.json", JSON.stringify(randomColorPalette));

  //reading from random color palette
  colorPalette = await readColorFile("./random_color_palette.json");
  res.write(JSON.stringify(colorPalette));
  res.end();
}

http
  .createServer(async (req, res) => {
    await createAndReadRandomColors(res);
    res.end();
  })
  .listen(4000);
