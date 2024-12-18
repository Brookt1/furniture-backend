const allowedOrigins = require("../config/allowedOrigins");

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

module.exports = corsOptions;
