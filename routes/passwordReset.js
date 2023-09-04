const express = require("express");
const router = express.Router();
const passwordResetController = require("../controllers/passwordReset");

router.get("/password-reset", passwordResetController.getReset);

router.post("/passwordResetCheck", passwordResetController.postResetCheck);

router.post("/passwordReset", passwordResetController.postReset);

module.exports = router;
