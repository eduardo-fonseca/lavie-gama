var { expressjwt: jwt } = require("express-jwt");
const jwtSecret = require("../configs/jwtSecret");

module.exports = jwt({
    secret: jwtSecret.key,
    algorithms: ["HS256"]
});