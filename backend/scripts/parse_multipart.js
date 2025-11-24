// utils/parseMultipart.js
const Busboy = require("busboy");

function parseMultipart(req) {
  return new Promise((resolve, reject) => {
    const busboy = Busboy({ headers: req.headers });

    const fields = {};
    let fileBuffer = null;
    let fileInfo = null;

    busboy.on("file", (name, file, info) => {
      fileInfo = info; // { filename, mimeType, encoding }

      const chunks = [];
      file.on("data", (chunk) => chunks.push(chunk));
      file.on("end", () => {
        fileBuffer = Buffer.concat(chunks);
      });
    });

    busboy.on("field", (name, value) => {
      fields[name] = value;
    });

    busboy.on("error", reject);

    busboy.on("finish", () => {
      resolve({
        fields,
        file: fileBuffer ? { buffer: fileBuffer, info: fileInfo } : null,
      });
    });

    req.pipe(busboy);
  });
}
module.exports = { parseMultipart };
