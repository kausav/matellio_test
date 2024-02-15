let express = require("express");
let router = express();

const authApis = require("../controllers/auth");
const authApiSchema = require("../schemas/auth");

router.post("/signUp", authApiSchema.signUpSchema, authApis.signUp);
router.post("/signIn", authApiSchema.signInSchema, authApis.signIn);

module.exports = router;
