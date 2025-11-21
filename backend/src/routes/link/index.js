const {
  handleLinkCreation,
  handleLinkRead,
  handleUrlUpdation,
  handleUrlDeletion,
  handleSlugRandom,
  handleSlugUserUrl,
  handleOneUrlAnalyticsAndQrCode,
} = require("../../controllers/link");
const { isUserOrAdmin } = require("../../middleware/authMiddleware");

const router = require("express").Router();

router
  .route("/")
  .post(isUserOrAdmin, handleLinkCreation)
  .get(isUserOrAdmin, handleLinkRead).put(handleUrlUpdation).delete(handleUrlDeletion);// update , delete testing remaining and then frontedn
router.get("/user/:slug", handleSlugUserUrl);       // static first
router.get("/analytics",isUserOrAdmin, handleOneUrlAnalyticsAndQrCode);
router.get("/:slugs", handleSlugRandom);            // dynamic last


module.exports = router;
