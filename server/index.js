require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("./db/connection");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const userdb = require("./models/userSchema");



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
//!SECTION Google Auth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await userdb.findOne({ googleId: profile.id });
        if (!user) {
          user = new userdb({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/home",
    failureRedirect: "http://localhost:5173/login",
  })
);

app.get("/login/sucess", async (req, res) => {
  if (req.user) {
    res.status(200).json({ message: "user login", user: req.user });
  } else {
    res.status(400).json({ message: "user not login" });
  }
});

//!SECTION Github Auth

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
      authorizationURL:
        "https://github.com/login/oauth/authorize?prompt=consent",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        let user = await userdb.findOne({ githubId: profile.id });
        if (!user) {
          user = new userdb({
            githubId: profile.id,
            displayName: profile.displayName,
            email: profile._json.blog,
            image: profile.photos[0].value,
          });
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        console.log(err);
      }
      console.log(profile);
      done(null, profile);
    }
  )
);

app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    successRedirect: "http://localhost:5173/home",
    failureRedirect: "http://localhost:5173/login",
  })
);

// app.post("/home", (req, res) => {
// if (
//   req.body.username === "newrocker2468@gmail.com" &&
//   req.body.password === "admin"
// ) {
//   res.json({ message: "Login Successfull" });
// } else {
//   res.json({ message: "Login Failed" });
// }
// });

app.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      res.status(500).send("Could not log out.");
    } else {
      res.status(200).send("Logged out.");
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
