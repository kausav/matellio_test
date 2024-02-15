let express = require("express");
let router = express();

const userApis = require("../controllers/user");
const userApiSchema = require("../schemas/user");
const { checkAuth } = require("../services/auth");

router.post(
  "/addresses",
  checkAuth,
  userApiSchema.createUserAddressesSchema,
  userApis.createUserAddresses
);
router.get("/users", checkAuth, userApis.getUserData);
router.post(
  "/addresses/delete",
  checkAuth,
  userApiSchema.deleteAddressSchema,
  userApis.deleteAddress
);

module.exports = router;
