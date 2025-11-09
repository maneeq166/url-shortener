const { handleLinkCreation } = require("../../controllers/link");
const { isUserOrAdmin } = require("../../middleware/authMiddleware");

const router = require("express").Router();

router.route("/").post(isUserOrAdmin ,handleLinkCreation);

module.exports=router;