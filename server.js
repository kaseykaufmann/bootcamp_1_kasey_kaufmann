import * as http from "http";
import * as fs from "fs";
import * as url from "url";

const port = 5000;

/* Global variables */
let listingData, server;

const requestHandler = (request, response) => {
  const parsedUrl = url.parse(request.url);
  console.log("server listening on: http//localhost:5000");
  // console.log(parsedUrl);
  // Your request handler should send listingData in the JSON format as a response if a GET request
  // is sent to the '/listings' path. Otherwise, it should send a 404 error.
  if (parsedUrl.pathname == "/listings") {
    // console.log(listingData);
    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(JSON.stringify(listingData));
    response.end();
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.write("Bad gateway error");
    response.end();
  }

  // HINT: Explore the request object and its properties
  // HINT: Explore the response object and its properties
  // https://code.tutsplus.com/tutorials/http-the-protocol-every-web-developer-must-know-part-1--net-31177
  // http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation

  // HINT: Explore how callback's work
  // http://www.theprojectspot.com/tutorial-post/nodejs-for-beginners-callbacks/4

  // HINT: Explore the list of MIME Types
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
};

fs.readFile("listings.json", "utf8", (err, data) => {
  /*
      This callback function should save the data in the listingData variable,
      then start the server.

      HINT: Check out this resource on fs.readFile
      https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback

      HINT: Read up on JSON parsing Node.js
     */

  // Check for errors
  if (err) throw err;

  // Save the state in the listingData variable already defined
  listingData = JSON.parse(data);
  // console.log(listingData);

  // Creates the server
  server = http.createServer(requestHandler);

  // Start the server
  server.listen(port);
});
