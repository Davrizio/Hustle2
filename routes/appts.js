const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const apptsController = require("../controllers/appts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/:id", ensureAuth, apptsController.getPost);

router.post("/createPost", upload.single("file"), apptsController.createPost);

router.put("/editPost/:id", apptsController.editPost, apptsController.notePost);

router.put("/notePost/:id", apptsController.notePost);

router.delete("/deletePost/:id", apptsController.deletePost);

router.delete("/deletePostFromClient/:id", apptsController.deletePostFromClient);

module.exports = router;
