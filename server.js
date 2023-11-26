const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const exercisesRoutes = require("./routes/exercises");
const apptRoutes = require("./routes/appts");
const clientRoutes = require("./routes/clients");
const commentRoutes = require("./routes/comments");
const clientWorkoutRoutes = require("./routes/clientWorkout");
const passwordResetRoutes = require("./routes/passwordReset");
const { DateTime } = require("luxon");
const storage = require('node-persist');

//Use Luxon to parse dates
app.locals.DateTime = DateTime

async function setupStore() { 
  await storage.init({
    dir: 'store',
    expiredInterval: 7200000,
  });
}
setupStore()

app.locals.storage = storage


//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs",{async: true});

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/exercise", exercisesRoutes);
app.use("/client", clientRoutes);
app.use("/comment", commentRoutes);
app.use("/clientWorkout", clientWorkoutRoutes);
app.use("/appointment", apptRoutes);
app.use("/passwordReset", passwordResetRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running!");
});
