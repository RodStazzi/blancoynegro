const http = require("http");
const url = require("url");
const fs = require("fs");
const Jimp = require("jimp");

const port = process.env.PORT || 8081;

const server = http.createServer((request, response) => {


  if (request.url === '/') {
    fs.readFile('public/index.html', 'utf8', (err, data) => {
      if (err) {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({ code: 404, err }));
        return response.end();
      }
      response.writeHead(200, { 'Content-Type': 'text/html' });
      return response.end(data);
    });

  } else if (request.url === '/assets/css/style.css') {
    fs.readFile('public/assets/css/style.css', 'utf8', (err, data) => {
      if (err) {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({ code: 404, err }));
        return response.end();
      }
      response.writeHead(200, { 'Content-Type': 'text/css' });
      return response.end(data);
    });
  }


  const params = url.parse(request.url, true).query;
  if (request.url.startsWith("/subir")) {
    const { imagen } = params;
    console.log(imagen)


    Jimp.read(imagen, (err, img) => {
      if (err) {
        response.write('Ha ocurrido un error al leer la imagen');
        return response.end();
      }
      img
        .resize(350, Jimp.AUTO)
        .quality(60)
        .greyscale()
        .getBase64(Jimp.MIME_JPEG, (err, src) => {
          if (err) {
            response.write('No se ha podido cargar la imagen');
            return response.end();
          }
          fs.readFile('public/assets/css/style.css', 'utf8', (err, data) => {
            response.writeHead(200, { 'Content-Type': 'text/css' });
            return response.end(data);
          });
          response.writeHead(200, { 'Content-Type': 'text/html' });
          img.writeAsync('newImg.jpg');
          response.write(`
          <head>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
            integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
            crossorigin="anonymous"
          />
        
          <link rel="stylesheet" href="assets/css/style.css">
        </head>
        
        <div class="w-75 m-auto">
          <div class="col-12 col-sm-3 container text-center p-5">
            <img src="${src}" alt="img de Marte">
          </div>
        </div>
          `);
          response.write('Se ha guardado exitosamente el archivo')
          response.end();
        });
    });
  }
});


server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});