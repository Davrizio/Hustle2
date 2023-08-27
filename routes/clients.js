const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const clientsController = require("../controllers/clients");
const clientWorkoutController = require("../controllers/clientWorkout");
const clientPhotoEditController = require("../controllers/clientPhotoEdit");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/:id", ensureAuth, clientsController.getPost);

router.post("/createPostClient", upload.single("file"), clientsController.createPost, clientWorkoutController.createPost);

router.put("/editPost/:id", clientsController.editPost);

router.put("/editPhoto/:id", upload.single("file"), clientPhotoEditController.editPhoto);

router.delete("/deletePost/:id", clientsController.deletePost, clientWorkoutController.deletePost);

module.exports = router;
