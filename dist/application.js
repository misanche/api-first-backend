"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as bodyParser from "body-parser";
var cors = require("cors");
var express = require("express");
var path_1 = require("path");
var swagger_1 = require("./middlewares/swagger");
var env = require("./env");
var log_1 = require("./log");
var log_2 = require("./log");
var monit = require("./monitoring");
var cls = require("./lib/cls");
var cors_1 = require("./cors");
env.checkEnv();
var app = express();
exports.default = app;
monit.init(app);
app.use(cors(cors_1.getCorsOptions()));
app.use(cls.setRequestId);
app.use(log_2.inOutLogger);
swagger_1.initSwaggerMiddlware(app, path_1.resolve(__dirname), function () {
    // self.express.use('/api/weather', helloRouteBuilder);
    // self.express.use(bodyParser.json());
    // self.express.use(bodyParser.urlencoded({ extended: false }));
    // Custom error handler that returns JSON
    app.use(function (err, req, res, next) {
        if (err) {
            log_1.default.error(err.stack || err.message || err.toString());
            log_1.default.error(err);
            var errStr = err.message || err.toString();
            var errMsg = { message: errStr, extra: err };
            if (res.statusCode < 400) {
                res.status(500);
            }
            res.json(errMsg);
        }
    });
});
//# sourceMappingURL=application.js.map