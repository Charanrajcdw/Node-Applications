const http = require("http");
const { readColorFile, writeColorFile } = require("./file.utils");

async function createAndReadRandomColors(res) {
  try {
    //reading from color palette
    let colorPalette = await readColorFile("./color_palette");

    //writing to random color palette
    let randomColorPalette = [];
    for (let itemCount = 0; itemCount < 5; itemCount++) {
      randomColorPalette.push(colorPalette[Math.floor(Math.random() * colorPalette.length)]);
    }
    await writeColorFile("./random_color_palette.json", JSON.stringify(randomColorPalette));

    //reading from random color palette
    colorPalette = await readColorFile("./random_color_palette.json");
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(colorPalette));
  } catch (err) {
    res.write(String(err));
  }
  res.end();
}

http
  .createServer(async (req, res) => {
    await createAndReadRandomColors(res);
    res.end();
  })
  .listen(4000);
