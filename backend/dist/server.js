"use strict";

var _app = require("./app");

var _app2 = _interopRequireDefault(_app);

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _env = require("./env");

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require("debug")("node-angular");


var normalizePort = function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

var onError = function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  var bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

var onListening = function onListening() {
  var addr = server.address();
  var bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

var port = normalizePort(process.env.PORT || "3000");
_app2.default.set("port", port);

var server = _http2.default.createServer(_app2.default);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);