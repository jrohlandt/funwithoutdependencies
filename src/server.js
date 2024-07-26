import http from 'node:http';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(Object.keys(req), req.url);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');

  const urlParts = req.url.split('?');

  const urlPath = urlParts[0];
  
  let urlParams = '';
  if (urlParts.length > 1) {
    urlParams = urlParts[1];
  }

  switch(urlPath) {
    case '/':
      console.log("HOME");
      res.end(`<h1>Home<h1>`);
      break;
    case '/about':
      console.log('ABOUT');
      res.end(`<h1>About<h1>`);
      break;
    default:
      console.log("NOT FOUND 404");
      res.statusCode = 404;
      res.end(`<h1>NOT FOUND 404</h1>`);
      break;
  }
return;
  console.log('URLPARAMS: ', urlParams);

  let params = [];

  if (urlParams) {
    params = urlParams.split('&').map(p => {
      const param = p.split('=');
      return param;
    });
  }

  console.log('params: ', params);

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// function paramExists(key) {
//   const param = params.find
// }