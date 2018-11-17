const http = require('http');

http.createServer((request, response) => {
  const { headers, method, url } = request;
  let body = [];
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    

    response.on('error', (err) => {
      console.error(err);
    });
    response.statusCode = 200;
    console.log(request.headers)
    response.setHeader('Access-Control-Allow-Origin', request.headers['origin']);
    response.setHeader("Access-Control-Allow-Credentials", true);
    response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    response.setHeader("Acces-Control-Max-Age", "3600");
	response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
    // set the header to bypass CORS

    const responseBody = { headers, method, url, body };

    response.write(JSON.stringify(responseBody));
    response.end();

  });
}).listen(8080, '0.0.0.0');
console.log("Server started on port 8080");
// Start server with node (file)
// All that needs to be done is to add an extra header to the get, that specifies the file, then the server pushes the file back with the ACAO headers.
