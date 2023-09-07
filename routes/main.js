const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const startController = require("../controllers/start");
const clientsController = require("../controllers/clients");
const exercisesController = require("../controllers/exercises");
const clientWorkoutController = require("../controllers/clientWorkout");
const apptsController = require("../controllers/appts");
const passwordRoutes = require("../routes/passwordReset");
const passwordController = require("../controllers/passwordReset");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", homeController.getIndex);
router.get("/exercises", ensureAuth, exercisesController.getWorkout);
router.get("/clientWorkout", ensureAuth, clientWorkoutController.getWorkout);
router.get("/appointments", ensureAuth, apptsController.getAppts);
router.get("/clients", ensureAuth, clientsController.getClient);
router.get("/client", ensureAuth, clientsController.getClient);
router.get("/start", ensureAuth, startController.getStart);
router.get("/login", authController.getLogin);
router.get("/password-reset", passwordController.getReset);
router.get("/passwordReset/:userID/:token", passwordController.getResetUserInput);


router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
