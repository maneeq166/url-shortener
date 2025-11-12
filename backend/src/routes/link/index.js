const { handleLinkCreation, handleLinkRead } = require("../../controllers/link");
const { isUserOrAdmin } = require("../../middleware/authMiddleware");

const router = require("express").Router();

router.route("/").post(isUserOrAdmin ,handleLinkCreation).get(isUserOrAdmin,handleLinkRead);

module.exports=router;