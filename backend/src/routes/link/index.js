const {
  handleLinkCreation,
  handleLinkRead,
  handleUrlUpdation,
  handleUrlDeletion,
} = require("../../controllers/link");
const { isUserOrAdmin } = require("../../middleware/authMiddleware");

const router = require("express").Router();

router
  .route("/")
  .post(isUserOrAdmin, handleLinkCreation)
  .get(isUserOrAdmin, handleLinkRead).put(handleUrlUpdation).delete(handleUrlDeletion);

module.exports = router;
