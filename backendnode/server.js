// const http = require("http");
// const port = 8080;
// const menuControllers = require('./controller/menu')

// const server = http.createServer((req, res) => {
//   if (server.address().port === port) {
//     if (req.method === "GET" && req.url === "/") {
//       res.writeHead(200, { "Content-Type": "application/json" });
//       res.end(JSON.stringify({ message: "Hello, World!" }));
//       if (req.method === "POST" && req.url === "/restaurant/addMenu") {
//         menuControllers.addMenuItem(req,res)
//       }
//       if (req.method === "PUT" && req.url === "/restaurant/editMenu/:id") {
//         menuControllers.editMenuItem(req,res)
//       }
//       if (req.method === "GET" && req.url === "/restaurant/getAllMenu") {
//         menuControllers.getAllMenuItems(req,res);
//       }
//     } else {
//       res.writeHead(404, { "Content-Type": "text/plain" });
//       res.end("Not Found");
//     }
//   }
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   res.end("Hello, Node.js Server!\n");
// });

// server.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// module.exports = server;
