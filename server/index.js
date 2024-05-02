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
const Csschallengesdb = require("./models/csschallengesSchema");
const CssElementdb = require("./models/CssElementSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const uuidv4 = require("uuid").v4;
const fsPromises = require("fs").promises;
const fs = require("fs");
const axios = require("axios");
const Table =require("./models/TableSchema")
const FormData = require("form-data");
const Eventsdb = require("./models/EventsSchema")
const nodemailer = require("nodemailer");
const uuid = require("uuid");

//git fetch origin
//git checkout master
//git merge origin/master
//npm i
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: "corenexui1@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://firebasestorage.googleapis.com"],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use(express.json());

app.use(cookieParser());
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

function validateUser(req, res, next) {
  const { email, password } = req.body;
  if(!email){
    return res.json({ message: "Email is required" });
  }
  if(!password){
    return res.json({ message: "Password is required" });
  }

  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) {
    return res.json({ message: "Invalid email format" });
  }


  if (!password) {
    return res.json({ message: "Password is required" });
  } else if (password.length < 8) {
    return res
  
      .json({ message: "Password must be at least 8 characters long" });
  } else if (!/(?=.*[0-9])/.test(password)) {
    return res.status(400).json({ message: "Password must contain a number" });
  } else if (!/(?=.*[a-z])/.test(password)) {
    return res
 
      .json({ message: "Password must contain a lowercase letter" });
  } else if (!/(?=.*[A-Z])/.test(password)) {
    return res
    
      .json({ message: "Password must contain an uppercase letter" });
  } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
    return res

      .json({ message: "Password must contain a special character" });
  }


  next();
}





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
        let user = await userdb.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = new userdb({
            google: {
              Id: profile.id,
              displayName: profile.displayName,
              image: profile.photos[0].value,
              bio: "",
            },
            github: {
              Id: "",
              displayName: "",
              image: "",
              bio: "",
            },
            email: profile.emails[0].value,
            lastLoggedInWith: "google",
            password: uuidv4(),
            Permissions:["newuser"]
          });

          await user.save();
        } else {
          console.log("User already exists");
          // Check if the fields are empty before updating
          user = await userdb.findOneAndUpdate(
            { email: profile.emails[0].value },
            {
              $set: {
                google: {
                  Id: profile.id,
                  displayName: profile.displayName,
                  image: profile.photos[0].value,
                  bio: "",
                },
                lastLoggedInWith: "google",
                password: uuidv4(),
              },
            },
            { new: true }
          );
              
          //  console.log(user);
          return done(null, user);
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
    failureRedirect: "http://localhost:5173/login",
  }),
  function (req, res) {
    // Successful authentication, create JWT.
    const token = jwt.sign(
      {
        email: req.user.email,
        google: {
          displayName: req.user.google.displayName || "",
          image: req.user.google.image || "",
          bio: req.user.google.bio || "",
        },
        github: {
          displayName: req.user.github.displayName || "",
          image: req.user.github.image || "",
          bio: req.user.github.bio || "",
        },
        lastLoggedInWith: req.user.lastLoggedInWith,
        default:{
          displayName: req.user.default.displayName || "",
          image: req.user.default.image || "",
          bio: req.user.default.bio || "",
        },
        Permissions: req.user.Permissions || ["newuser"],
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" } // Set the access token to expire in 1 hour
    );

    // Create a refresh token
    const refreshToken = jwt.sign(
      {
        email: req.user.email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" } // Set the refresh token to expire in 7 days
    );

    // Send the tokens back to the client
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 1 hour
      sameSite: "none",
      secure: true,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "none",
      secure: true,
    });
  
    res.redirect("http://localhost:5173/home");
  }
);





// app.get("/login/sucess", async (req, res) => {
// const token = req.cookies.token;
// if(!token){
//     if (req.user) {
//       const user = req.user;
//       const token = jwt.sign(
//         {
//           email: user.email,
//           google: {
//             displayName: user.google.displayName || "",
//             image: user.google.image || "",
//             bio: user.google.bio || "",
//           },
//           github: {
//             displayName: user.github.displayName || "",
//             image: user.github.image || "",
//             bio: user.github.bio || "",
//           },
//           lastLoggedInWith: user.lastLoggedInWith,
//           Permissions: user.Permissions,
//         },
//         process.env.TOKEN_SECRET
//       );
//       res.cookie("token", token, {
//         httpOnly: true,
//         maxAge: 2 * 24 * 60 * 60 * 1000,
//         sameSite: "none",
//         secure: true,
//       });
//       res
//         .status(200)
//         .json({ message: "user login", user: token});
//     } else {
//       res.status(400).json({ message: "user not login" });
//     }
// }
// });
// app.get("/login/sucess", async (req, res) => {
//   if (req.user) {
//     const user = req.user;
//     // const token = generateAccessToken();
//     const token = jwt.sign(
//       {
//         email: user.email,
//         google: {
//           displayName: user.google.displayName || "",
//           image: user.google.image || "",
//           bio: user.google.bio || "",
//         },
//         github: {
//           displayName: user.github.displayName || "",
//           image: user.github.image || "",
//           bio: user.github.bio || "",
//         },
//         lastLoggedInWith: user.lastLoggedInWith,
//         Permissions: user.Permissions,
//       },
//       process.env.TOKEN_SECRET
//     );
//     let data = req.session.remember;
//     console.log("session storage dtata test")
//     console.log(req.session.remember);
//     const rememberMe = data === "true";
//     const maxAge = rememberMe
//       ? 15 * 24 * 60 * 60 * 1000
//       : 2 * 24 * 60 * 60 * 1000;
//     res.cookie("token", token, {
//       httpOnly: true,
//       maxAge: maxAge,
//       sameSite: "none",
//       secure: true,
//     });
//     // console.log(maxAge);
//     if (rememberMe) {
//       const rememberMeToken = jwt.sign(
//         {
//           id: user.id,
//           issuedAt: Date.now(),
//         },
//         process.env.REMEMBER_ME_TOKEN_SECRET,
//         {
//           expiresIn: "15d",
//         }
//       );
//       res.cookie("rememberMeToken", rememberMeToken, {
//         httpOnly: true,
//         maxAge: 15 * 24 * 60 * 60 * 1000,
//         sameSite: "none",
//         //  secure: true,
//       });
//     }
//     res
//       .status(200)
//       .json({ message: "user login", user: token, rememberMe: rememberMe });
//   } else {
//     res.status(400).json({ message: "user not login" });
//   }
// });

//!SECTION Github Auth

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
      authorizationURL:
        "https://github.com/login/oauth/authorize?prompt=consent",
      scope: ["user", "repo"],
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        console.log("hi");
        console.log(profile._json.bio);
        let user = await userdb.findOne({ email: profile._json.blog });
        if (!user) {
          user = new userdb({
            github: {
              Id: profile.id,
              displayName: profile.displayName,
              image: profile.photos[0].value,
              bio: profile._json.bio,
            },
            google: {
              Id: "",
              displayName: "",
              image: "",
              bio: "",
            },
            email: profile._json.blog,
            password: uuidv4(),
            lastLoggedInWith: "github",
            Permissions: ["newuser"],
          });

          await user.save();
        } else {
          console.log("User already exists");
          user = await userdb.findOneAndUpdate(
            // Assign the result to user
            { email: profile._json.blog }, // Use the correct field for email
            {
              $set: {
                github: {
                  Id: profile.id,
                  displayName: profile.displayName,
                  image: profile.photos[0].value,
                  bio: profile._json.bio,
                },
                lastLoggedInWith: "github",
                email: profile._json.blog,
              },
            },

            { new: true }
          );
          console.log(user);

          return done(null, user);
        }

        console.log(user); // Log the updated user
        return done(null, user);
      } catch (err) {
        console.log(err);
      }

      console.log(profile);

      console.log("hi");
      console.log(profile._json);
      done(null, profile);
    }
  )
);

app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user", "repo"] })
);


app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "http://localhost:5173/login",
  }),
  function (req, res) {
    // Successful authentication, create JWT.
    const token = jwt.sign(
      {
        email: req.user.email,
        google: {
          displayName: req.user.google.displayName || "",
          image: req.user.google.image || "",
          bio: req.user.google.bio || "",
        },
        github: {
          displayName: req.user.github.displayName || "",
          image: req.user.github.image || "",
          bio: req.user.github.bio || "",
        },
        lastLoggedInWith: req.user.lastLoggedInWith,
        Permissions: req.user.Permissions,
      },
      process.env.TOKEN_SECRET
    );

    // Send the token back to the client
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    });

    // Redirect user to the desired page
    res.redirect("http://localhost:5173/home");
  }
);


  app.post("/login", async (req, res) => {
    console.log("ddddddddd");
    const { email, password, remember } = req.body;
    console.log(email, password, remember);
  try{
    const user = await userdb.findOne({ email: email });
    if (!user) {
      console.log("User not found.");
      return res.json({ message: "User not found.",signup:true  });
    }
    else{
    if(user){

        const validPassword = await bcrypt.compare(password, user.password);
        console.log(validPassword);
        if (!validPassword) {
          return res.json({ message: "Invalid Credentials !",error:true });
        }
      const token = jwt.sign(
        {
          email: user.email,
          google: {
            displayName: user.google.displayName || "",
            image: user.google.image || "",
            bio: user.google.bio || "",
          },
          github: {
            displayName: user.github.displayName || "",
            image: user.github.image || "",
            bio: user.github.bio || "",
          },
          default:{
              displayName: user.default.displayName || "",
              image: user.default.image || "",
              bio: user.default.bio || "",
          },
          lastLoggedInWith: "default",
          Permissions: user.Permissions,
        },
        process.env.TOKEN_SECRET
      );
      const maxage = remember ? 7 * 24 * 60 * 60 * 1000 : 2 * 24 * 60 * 60 * 1000;
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: maxage,
        sameSite: "none",
        secure: true,
      });
    
      const decodedtoken = jwt.decode(token);
      res.json({ user: decodedtoken,message:"login success" });
    }
  }
  }
  catch(err){
    res.status(500).json({ message: "An error occurred while logging in." });
  }

  });
app.post("/verify/:email/resendotp", async (req, res) => {
  const { email } = req.params;
  const otp = Math.floor(100000 + Math.random() * 900000);
  const user = await userdb.findOne({ email: email });
  if (!user) {
    return res.json({ message: "User not found." });
  }
  user.otp = otp;

  let html = fs.readFileSync("template.html", "utf8");
  html = html.replace("%OTP%", otp);

  let mailOptions = {
    from: "corenexui1@gmail.com",
    to: email,
    subject: "Email Verification",
    html: html,
  };
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Email sent: " + info.response);
        resolve(info);
      }
    });
  });

  await user.save();

  res.json({ message: "OTP Re-sent successfully." });
});




 
app.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      res.status(500).send("Could not log out.");
    } else {
      res.clearCookie("token");
           res.clearCookie("refreshToken");
      // // Clear the 'rememberMeToken' cookie
      // res.clearCookie("rememberMeToken");
      res.status(200).send("Logged out.");
    }
  });
});


app.get("/csschallenges", async (req, res) => {
  try {
    let Csschallenges = await Csschallengesdb.find({});

    Csschallenges = Csschallenges.map((challenge) => {
      const status = challenge.getStatus();
      const numSubmissions = challenge.submissions.length;

      challenge.status = status;
      challenge.numSubmissions = numSubmissions;
      return challenge;
    });
    res.status(200).json(Csschallenges);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching CSS challenges.");
  }
});

app.get("/csschallenges/:id", async (req, res) => {
  let csschallenges = await Csschallengesdb.findOne({ id: req.params.id });
  if (csschallenges) {
    const status = csschallenges.getStatus();
    csschallenges.status = status;
    const numSubmissions = csschallenges.submissions.length;
    res.json({ csschallenges, numSubmissions });
  } else {
    res.status(404).json({ message: "Challenge not found" });
  }
});

app.post("/csschallenges/:id", async (req, res) => {
  if (req.cookies.token) {
    jwt.verify(
      req.cookies.token,
      process.env.TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Failed to authenticate token" });
        }
          if(decoded.Permissions.includes("admin") || decoded.Permissions.includes("createchallenges")){
            let Csschallenges = await Csschallengesdb.findOne({
              id: req.params.id,
            });
            if (!Csschallenges) {
              // console.log(req.body);
              Csschallenges = new Csschallengesdb({
                id: req.params.id,
                title: req.body.title,
                sdesc: req.body.sdesc,
                description: req.body.description,
                img: req.body.img,
                status: req.body.status,
                date: req.body.date,
              });
              Csschallenges.save();
              res.json({ message: "CSS challenges added successfully." });
            } else {
              res.json({ message: "CSS challenges already exists." });
            }
          }
          else{
            res.json({ message: "You are not authorized to add CSS challenges." });
          }
        console.log(decoded);
      }
    );
  } else {
    console.log("no token provided");
    res.status(401).json({ message: "No token provided" });
  }
});
app.post("/csschallengesupdate", async (req, res) => {
  console.log(req.cookies.token);
const token = req.cookies.token;
if(token){
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: "Failed to authenticate token" });
    }
    if(decoded.Permissions.includes("admin") || decoded.Permissions.includes("editchallenges")){
      try {
        let Csschallenges = await Csschallengesdb.findOne({
          id: req.body.id,
        });
        if (!Csschallenges) {
          return res.status(404).json({ message: "CSS challenges not found." });
        }
        Csschallenges = await Csschallengesdb.findOneAndUpdate(
          { id: req.body.id },
          {
            $set: {
              title: req.body.title,
              sdesc: req.body.sdesc,
              description: req.body.description,
              img: req.body.img,
              status: req.body.status,
              date: req.body.date,
            },
          },
          { new: true }
        );
        res.status(200).json({
          Csschallenges: Csschallenges,
          message: "CSS challenges updated successfully.",
        });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ message: "An error occurred while updating CSS challenges." });
      }
    }
    else{
      return res.status(401).json({ message: "You are not authorized to update CSS challenges." });
    }
  })
}
else{
  return res.status(401).json({ message: "No token provided" });
}
});

app.post("/csschallengesdelete", async (req, res) => {
if(req.cookies.token){
  jwt.verify(req.cookies.token, process.env.TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: "Failed to authenticate token" });
    }
    if(decoded.Permissions.includes("admin") || decoded.Permissions.includes("deletechallenges")){
       const { id } = req.body;
       console.log("id " + id);
       try {
         const challenges = await Csschallengesdb.findOneAndDelete({ id: id });
         console.log(challenges);
         res
           .status(200)
           .json({ message: "CSS challenges deleted successfully." });
       } catch (error) {
         console.error(error);
         res
           .status(500)
           .json({
             message: "An error occurred while deleting CSS challenges.",
           });
       }
    }
    else{
      return res.status(401).json({ message: "You are not authorized to delete CSS challenges." });
    }
  })
}
else{
  return res.status(401).json({ message: "No token provided" });
}
 
});
// app.post("/csschallengesget", async (req, res) => {
//   const { id } = req.body;
//   console.log("id " + id);
//   try {
//     const challenges = await Csschallengesdb.findOne({ id: id });
//     console.log(challenges);
//     res.status(200).json(challenges);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("An error occurred while fetching CSS challenges.");
//   }
// });
app.post("/csschallengesget", async (req, res) => {
  const { id } = req.body;
  console.log("id " + id);
  try {
    let challenges = await Csschallengesdb.findOne({ id: id });
    if (challenges) {
      // Use the getStatus method here
      const status = challenges.getStatus();

      // Update the status of the challenge
      challenges.status = status;

      const numSubmissions = challenges.submissions.length;
      res.status(200).json({ challenges, numSubmissions });
    } else {
      res.status(404).json({ message: "Challenge not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching CSS challenges.");
  }
});

// app.post("/editor/create/:id", async (req, res) => {
//   const { id } = req.params;

//   if (!req.body.login) {
//     console.log("not login");
//     res.json({ message: "You are not logged in. Login First" }).status(400);
//     return;
//   }
//   let csselements;
//   try {
//     if (req.body.login || (req.body.html && req.body.css)) {
//       const user = await userdb.findOne({ email: req.body.email });
//       csselements = new CssElementdb({
//         id: id,
//         html: req.body.html,
//         css: req.body.css,
//         elementtype: req.body.Category,
//         user: user._id,
//       });

//       user.cssElements.push(csselements._id);
//       await user.save();
//       await csselements.save();
//     }
//     res.json({ message: "Code saved successfully." }).status(200);
//   } catch (err) {
//     res.json({ message: "Code not saved,something went wrong" }).status(400);
//     console.log(err);
//   }
//   // CssElementdb.save();
// });
app.post("/editor/create/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  if (!req.body.login) {
    console.log("not login");
    res.json({ message: "You are not logged in. Login First" }).status(400);
    return;
  }
  let csselements;
  try {
    if (req.body.login || (req.body.html && req.body.css)) {
      const user = await userdb.findOne({ email: req.body.email });
      csselements = new CssElementdb({
        id: id,
        html: req.body.html,
        css: req.body.css,
        elementtype: req.body.Category,
        user: user._id,
        approvalStatus: "inReview",
        isSelected: req.body.isSelected,
      });

      user.cssElementsInReview.push(csselements._id); 
      await user.save();
      await csselements.save();
    }
    res.json({ message: "Code Sent For Approval" }).status(200);
  } catch (err) {
    res.json({ message: "Code not saved, something went wrong" }).status(400);
    console.log(err);
  }
});


// app.post("/editor/create/:id", async (req, res) => {
//   const { id } = req.params;

//   if (!req.body.login) {
//     console.log("not login");
//     res.json({ message: "You are not logged in. Login First" }).status(400);
//     return;
//   }
//   let cssElementsInReview;
//   try {
//     if (req.body.login || (req.body.html && req.body.css)) {
//       const user = await userdb.findOne({ email: req.body.email });
//       cssElementsInReview = new NeedApproaldb({
//         elementtype: req.body.Category,
//       });

//       user.cssElementsInReview.push(cssElementsInReview._id);
      
//       await user.save();
//       await cssElementsInReview.save();
//     }
//     res.json({ message: "Code Sent For Approval" }).status(200);
//   } catch (err) {
//     res.json({ message: "Code not saved,something went wrong" }).status(400);
//     console.log(err);
//   }
//   // CssElementdb.save();
// });
app.get("/allcsselements", async (req, res) => {
  try {
    const CssElements = await CssElementdb.find({
      approvalStatus: "approved",
    }).populate("user");
    res.status(200).json(CssElements);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching CSS elements.");
  }
});


app.get("/editor/:id", async (req, res) => {
  try {
    const CssElements = await CssElementdb.findOne({ _id: req.params.id });
    res.status(200).json(CssElements);
  } catch (error) {
    console.error(error);
    res.status(404).send("An error occurred while fetching CSS elements.");
  }
});
app.get("/csschallenge/editor/:id", async (req, res) => {
  try {
    const challenge = await Csschallengesdb.findOne({
      submissions: { $elemMatch: { _id: req.params.id } },
    });

    if (!challenge) {
      return res.status(404).send("Submission not found");
    }

    const submission = challenge.submissions.id(req.params.id);

    res.status(200).json(submission);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching the submission.");
  }
});

app.post('/challenges/:challengeId/submissions/:submissionId/vote', async (req, res) => {
  console.log(req.params.challengeId, req.params.submissionId);
  // Get the challenge and submission from the database
  const challenge = await Csschallengesdb.findOne({
    id: req.params.challengeId,
  });
  const submission = challenge.submissions.id(req.params.submissionId);
  console.log(submission);

  // // Call the vote method
  // challenge.vote(req.user._id, submission._id);

  // // Save the challenge
  // await challenge.save();

  // res.send('Vote has been recorded');
});






app.get("/getalluserdata",async(req,res) =>{
  try{
    const user =await userdb.find({});
    res.json({user:user})
  }
  catch(err){
    res.json({ message: "Some Error Occured", error: true });
  }
})
app.get("/getuserdata", async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to authenticate token" });
      }
      try {
        const user = await userdb.findOne({ email: decoded.email }).populate("cssElements").populate("cssElementsInReview");
        res.status(200).json({ user });
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    res.status(401).json({ message: "No token provided" });
  }
});
app.get("/getuserdata/csschallenges", async (req, res) => {
  console.log("getuserdata");
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to authenticate token" });
      }
      try {
        const user = await userdb.findOne({ email: decoded.email });
        res.status(200).json({ user });
        console.log(user);
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    res.status(401).json({ message: "No token provided" });
  }
});
app.get("/getuserdata/:email",async(req,res)=>{
 try{
   const {email} = req.params
   const user = await userdb.findOne({ email: email }).populate("cssElements");
  res.json({user:user})}
  catch(err){
    console.log(err)
  }

});





app.post("/editor/:id/delete", async (req, res) => {
  // console.log(req.cookies.token);
  try {
    const token = req.cookies.token;
    const decodedToken = jwt.decode(token);

    const user = await userdb.findOne({ email: decodedToken.email });
    const CssElements = await CssElementdb.findById({ _id: req.params.id });

    // console.log(decodedoken);
    // Check if decodedToken is not null and permissions includes 'admin' or 'delete'
    if (
      decodedToken &&
      (decodedToken.Permissions.includes("admin") ||
        decodedToken.Permissions.includes("deletecsselement") ||
        user._id.toString() === CssElements.user.toString())
    ) {
      const CssElements = await CssElementdb.findOneAndDelete({
        _id: req.params.id,
      });
      const userdb1 = await userdb.updateOne(
        { _id: user._id },
        { $pull: { cssElements: req.params.id } }
      );

      res.status(200).json({ message: "CSS elements deleted successfully." });
    } else {
      res
        .status(401)
        .json({ message: "You are not authorized to delete the element" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching CSS elements." });
  }
});

app.post("/editor/:id/update", async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to authenticate token" });
        }
      try {
        const CssElements = await CssElementdb.findOne({
          _id: req.params.id,
        }).populate("user");
        if (!CssElements) {
          return res.status(404).json({ message: "CSS elements not found." });
        }

        console.log(CssElements.user.email, decoded.email);
        if (
          decoded.Permissions.includes("admin") ||
          decoded.Permissions.includes("editcsselement") ||
          decoded.email === CssElements.user.email
        ) {
          try {
 let CssElements = await CssElementdb.findOne({
   _id: req.params.id,
 }).populate("user");
            const approvalStatus =
              decoded.Permissions.includes("admin") ||
              decoded.Permissions.includes("editcsselement")
                ? CssElements.approvalStatus
                : "inReview";
           CssElements = await CssElementdb.findOneAndUpdate(
              { _id: req.params.id },
              {
                $set: {
                  html: req.body.html,
                  css: req.body.css,
                  elementtype: req.body.Category,
                  approvalStatus: approvalStatus,
                },
              },
              { new: true }
            );
            CssElements = await CssElements.populate("user");
            res.status(200).json({
              CssElements: CssElements,
              message: "CSS elements updated successfully.",
              user:decoded,
            });
          } catch (error) {
            console.error(error);
            res.status(500).json({
              message: "An error occurred while updating CSS elements.",
            });
          }
        }
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    res.status(401).json({ message: "No token provided" });
  }
});



app.get("/getuserdata/match/:id", async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to authenticate token" });
      }
      const { id } = req.params;
      const user = await userdb.findOne({ email: decoded.email });
      const CssElements = await CssElementdb.findOne({ _id: id }).populate(
        "user"
      );
      if (user && CssElements && CssElements.user) {
        if (user.email === CssElements.user.email) {
          res.status(200).json({ sameUser: true });
        } else {
          res.status(200).json({ sameUser: false });
        }
      }
      // res.status(200).json({ user: decoded });
    });
  } else {
    res.status(401).json({ message: "No token provided" });
  }
});


app.get("/events", async (req, res) => {
  try {
    console.log("route hit ")
    const Event = await Eventsdb.find({});
    console.log(Event)
    res.json(Event);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error has occured while fetching event " });
  }
});
app.get("/event/:id", async (req, res) => {
  try {
    let Event = await Eventsdb.findOne({ id: req.params.id });
    res.json({Event});
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error has occured while fetching event " });
  }
});
app.post("/event/:id/create", async (req, res) => {

            let Event = await Eventsdb.findOne({
              id: req.params.id,
            });
            if (!Event) {
              console.log(req.body);
              Event = new Eventsdb({
                id: req.params.id,
                eventName: req.body.eventName,
                description: req.body.description,
                img: req.body.img,
                status: req.body.status,
                date: req.body.date,
              });
              Event.save();
              res.json({ message: "Event added successfully." });
            } else {
              res.json({ message: "Event already is Going on..." });
            }
      
});

app.post("/event/:id/update", async (req, res) => {
  try {
    const Event = await Eventsdb.findByIDAndupdateOne({ _id: req.params.id });
    res.status(200).json({ message: "event successfully updated" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "an error has occured while updating event" });
  }
});

app.post("/event/:id/delete", async (req, res) => {
  try {
    const Event = await Eventsdb.findByIDAnddeleteOne({ _id: req.params.id });
    res.status(200).json({ message: "event successfully deleted" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "an error has occured while deleting event" });
  }
});


app.post("/eventsget", async (req, res) => {
  const { id } = req.body;
  console.log("id " + id);
  try {
    const Event = await Eventsdb.findOne({ id: id });
    console.log(Event);
    res.status(200).json(Event);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching Event.");
  }
});


//route for notes upload
app.post("/notesUpload/:id", async (req, res) => {
  try {
    const Note = await Notesdb.findone({ _id: req.params.id });
    res.status(200).json({ Note });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error has occured while fetching the notes " });
  }
});

app.post("/notesUpload/:id/upload", async (req, res) => {
  try {
    const Note = new Notesdb({
      id: req.params.id,
      topicName: req.body.Name,
      description: req.body.description,
      img: req.body.img,
      date: req.body.date,
    });
    Note.save();
    res.status(200).json({ message: "Document added successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occured when added the Document" });
  }
});

app.post("/notesupload/:id/update", async (req, res) => {
  try {
    const Note = await Notesdb.findByIDAndupdateOne({ _id: req.params.id });
    res.status(200).json(Note);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "an error has occured while updating the Document" });
  }
});

app.post("/notesupload/:id/delete", async (req, res) => {
  try {
    const Note = await Notesdb.findByIDAnddeleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Document successfully Deleted" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "an error has occured while deleting the Document" });
  }
});


app.post("/register", validateUser, async (req, res) => {
  const { email, password, repassword, terms } = req.body;
  if (!repassword) {
    return res.status(400).json({ message: "Re-enter password is required" });
  }
  const user = await userdb.findOne({ email: email });
  if (!user) {
    try {
      if (password !== repassword) {
        console.log("password not match");
        res.json({ message: "Passwords do not match" });
      }
      const hash = await bcrypt.hash(password, 12);
   const user = new userdb({
     google: {
       Id: "",
       displayName: "",
       image: "",
       bio: "",
     },
     github: {
       Id: "",
       displayName: "",
       image: "",
       bio: "",
     },
     default: {
       displayName: "",
       image: "",
       bio: "",
     },
     email: email,
     password: hash,
     lastLoggedInWith: "default",
     emailVerified: false,
   });
      await user.save();

      res
        .status(200)
        .json({
          message: "Registration done successfully. Please verify your email.",
        });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error has occurred during registration" });
    }
  } else {
    if (user.emailVerified) {
      res.json({ message: "User already exists, Please Login!" });
    } else {
      res.json({ message: "User already exists, Please verify your email!" });
    }
  }
});
app.post("/send-verification-email", async (req, res) => {
  const { email } = req.body;
  const user = await userdb.findOne({ email: email });
if(!user){
  return res.json({message:"User Not Found Register your Email First"})
}
  if (user.emailVerified) {
    return res.json({ message: "Email Already Verified" });
  }
  user.emailVerificationToken = uuid.v4();
  await user.save();
  let mailOptions = {
    from: "corenexui1@gmail.com",
    to: email,
    subject: "Email Verification",
    html: `<a href="http://localhost:5173/verify-email/${user.emailVerificationToken}">Click here to verify your email</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Email sent: " + info.response);
  });

  res.json({ message: "Verification email sent successfully." });
});










app.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;
  const user = await userdb.findOne({email : email})
  if (!user) {
    return res.json({ message: "User not found" });
  }
if(user.emailVerified){
    user.password = uuid.v4();
   bcrypt.hash(user.password, 12).then((hash) => {
      user.password = hash;
      user.save();
   })
    let mailOptions = {
      from: "corenexui19167@gmail.com",
      to: email,
      subject: "Password Reset",
      text: `Your new password is ${user.password}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Email sent: " + info.response);
    });
    res.json({ message: "Password reset successfully. Please check your email." });
}
else{
  return res.json({ message: "Email not verified" });
}


})
app.get("/verify/:email/getotp", async (req, res) => {
  const email = req.params.email;
  const user = await userdb.findOne({ email: email });
  if (!user) {
    return res.json({ message: "User not found register first" });
  }
  if (user.emailVerified) {
    return res.json({ message: "Email already verified" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  user.otp = otp;
 
  await user.save();

let html = fs.readFileSync("template.html", "utf8"); 
html = html.replace("%OTP%", otp);

let mailOptions = {
  from: "corenexui1@gmail.com",
  to: email,
  subject: "Email Verification",
  html: html, 
};
  // let mailOptions = {
  //   from: "corenexui1@gmail.com",
  //   to: email,
  //   subject: "OTP for Email Verification",
  //   text: `Your OTP is ${otp}`,
  // };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Email sent: " + info.response);
  });

  res
    .status(200)
    .json({ message: "OTP sent successfully. Please check your email." });
});


app.post("/verify/:email/verifyotp",async(req,res)=>{
  const {email} = req.params;
  const {otp} = req.body;
  await userdb.findOne({email:email}).then(async user=>{
if(!user.emailVerified){
      if (user.otp === otp) {
        user.emailVerified = true;
        user.otp = undefined;
        user.emailVerificationToken = undefined;
        await user.save();
        res.json({ message: "Email verified successfully" });
      } else {
        res.json({ message: "Invalid OTP" });
      }
}else{
  res.json({ message: "Email already verified" });
}
  })
});




app.get("/verify-email/:token", async (req, res) => {
  const { token } = req.params;
  const user = await userdb.findOne({ emailVerificationToken: token });

  if (!user) {
    return res.json({ message: "Invalid verification link" });
  }
  user.emailVerified = true;
  user.emailVerificationToken = undefined;
  user.otp = undefined; 
  await user.save();
res.json({
  message: "Email verified successfully",
  redirect: "http://localhost:5173/login",
});
});

app.post("/login/save", async (req, res) => {
  try {
    const { email, password, remember } = req.body;

    // Set the 'remember' value in a cookie instead of the session
    res.cookie("remember", remember, { maxAge: 900000, httpOnly: true });

    console.log("Cookie set");
    // You can redirect to another route here
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during registration" });
  }
});


app.post("/CssChallengecreate/:id/create", async (req, res) => {
  const { id } = req.params;
  if (req.body.login || (id && req.body.html && req.body.css)) {
    const user = await userdb.findOne({ email: req.body.email });
    let csselements = new CssElementdb({
      id: id,
      html: req.body.html,
      css: req.body.css,
      user: user._id,
    });
    await csselements.save();
  }
});

app.get("/validate-token", (req, res) => {
  if (req.cookies.token) {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to authenticate token" });
      }
      // console.log(decoded);
      res.status(200).json({ user: decoded });
    });
  } else {
    console.log("no token provided");
    res.status(401).json({ message: "No token provided" });
  }
});
app.post("/refresh_token", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401); // No token provided

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,async (err, decoded) => {
    if (err) return res.sendStatus(403); // Invalid token
    console.log(decoded);
    const user = await userdb.findOne({ email: decoded.email });
    console.log(user);
    // Create new JWT
   if(user){
     const token = jwt.sign(
       {
         email: user.email,
         google: {
           displayName: user.google.displayName || "",
           image: user.google.image || "",
           bio: user.google.bio || "",
         },
         github: {
           displayName: user.github.displayName || "",
           image: user.github.image || "",
           bio: user.github.bio || "",
         },
         lastLoggedInWith: user.lastLoggedInWith,
         Permissions: user.Permissions,
       },
       process.env.TOKEN_SECRET
     );
     res.cookie("token", token, {
       httpOnly: true,
       maxAge: 7 * 24 * 60 * 60 * 1000,
       sameSite: "none",
       secure: true,
     });

     // Decode the JWT
     const decodedtoken = jwt.decode(token);
     // Send the decoded JWT to the client
     res.json({ token: decodedtoken });
   }
   else{
    res.json({message:"user doesnt exist"})
   }
  });
});


app.get("/CssElements/getallforApproval", async (req, res) => {
  if (req.cookies.token) {
    jwt.verify(
      req.cookies.token,
      process.env.TOKEN_SECRET,
      async function (err, decoded) {
        if (err) {
          res
            .status(401)
            .json({
              message: "Unauthorized Cannot perform this action",
              error: true,
            });
        } else {
          const requiredPermissions = ["admin", "rejectposts", "approveposts"];
    if (
      decoded.Permissions.some((permission) =>
        requiredPermissions.includes(permission)
      )
    ) {
      try {
        const elements = await CssElementdb.find({
          approvalStatus: "inReview",
        }).populate("user");
        res.json(elements);
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, error: true });
      }
    } else {
      res.json({
        message: "You Dont Have permissions to perform this action",
        error: true,
      });
    }
        }
      }
    );
  } else {
    res.status(401).json({ message: "No token provided", error: true });
  }
});



app.post("/Cssinapproval/delete/:id", async (req, res) => {
   if (req.cookies.token) {
     jwt.verify(
       req.cookies.token,
       process.env.TOKEN_SECRET,
       async function (err, decoded) {
         if (err) {
           res
             .status(401)
             .json({ message: "Unauthorized Cannot perform this action",error:true });
         } else {
           const requiredPermissions = ["admin", "rejectposts"];
           if (
             decoded.Permissions.some((permission) =>
               requiredPermissions.includes(permission)
             )
           ) {
             try {
                const { id } = req.params;
                const { email } = req.body;
              const user = await userdb.updateOne(
                { email: email },
                { $pull: { cssElementsInReview: id } }
              );
              await CssElementdb.findOneAndDelete({ _id: id }, { new: true });
              const element = await CssElementdb.find({
                approvalStatus: "inReview",
              }).populate("user");
              res.json({
                element: element,
                message: "Request Rejected, and Element Deleted SuccessFully!",
              });
              console.log(element);
             } catch (err) {
               console.log(err);
               res.status(500).json({ message: err.message });
             }
           } else {
             res.json({
               message: "You Dont Have permissions to perform this action",
               error:true 
             });
           }
         }
       }
     );
   } else {
     res.status(401).json({ message: "No token provided", error: true });
   }

  
});


// app.post("/Cssinapproval/approve/:id",async (req,res)=>{
  
//     const { id } = req.params;
//     const { email } = req.body;
// console.log(id,email)

// const csselements = await CssElementdb.findOneAndUpdate(
//   { _id: id },
//   { approvalStatus :"approved"},
//   {new:true}
// );
//      const user = await userdb.updateOne(
//        { email: email },
//        { $pull: { cssElementsInReview: id } },
//        { new: true, useFindAndModify: false }
//      );
//      const updatedUser = await userdb.findOneAndUpdate(
//        { email: email },
//        { $push: { cssElements: req.params.id } },
//        { new: true, useFindAndModify: false }
//      );


// const elements = await CssElementdb.find({
//   approvalStatus: "inReview",
// }).populate("user");
// console.log(elements)
//      res.json({elements : elements , message:"Csselement Approved Successfully"});
// });


app.post("/Cssinapproval/approve/:id", async (req, res) => {
     if (req.cookies.token) {
       jwt.verify(
         req.cookies.token,
         process.env.TOKEN_SECRET,
         async function (err, decoded) {
           if (err) {
             res
               .status(401)
               .json({
                 message: "Unauthorized Cannot perform this action",
                 error: true,
               });
           } else {
             const requiredPermissions = [
               "admin",
               "approveposts",
             ];
             if (
               decoded.Permissions.some((permission) =>
                 requiredPermissions.includes(permission)
               )
             ) {
               try {
               const { id } = req.params;
               const { email } = req.body;
               console.log(id, email);

               const csselements = await CssElementdb.findOneAndUpdate(
                 { _id: id },
                 { approvalStatus: "approved" },
                 { new: true }
               );
               const user = await userdb.updateOne(
                 { email: email },
                 { $pull: { cssElementsInReview: id } },
                 { new: true, useFindAndModify: false }
               );
               const updatedUser = await userdb.findOneAndUpdate(
                 { email: email },
                 { $push: { cssElements: req.params.id } },
                 { new: true, useFindAndModify: false }
               );

               const elements = await CssElementdb.find({
                 approvalStatus: "inReview",
               }).populate("user");
               console.log(elements);
               res.json({
                 elements: elements,
                 message: "Csselement Approved Successfully",
               });
               } catch (err) {
                 console.log(err);
                 res.status(500).json({ message: err.message });
               }
             } else {
               res.json({
                 message: "You Dont Have permissions to perform this action",
                 error: true,
               });
             }
           }
         }
       );
     } else {
       res.status(401).json({ message: "No token provided", error: true });
     }
 
});





  app.get("/Csselements/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const elements = await CssElementdb.find({
        elementtype: category,
        approvalStatus: "approved",
      });
      if(!elements){res.json({message:`No  elements found`,error:true})}
      console.log(elements);
      res.json(elements);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });



app.post("/assignpermissions/:email", async (req, res) => {
   if (req.cookies.token) {
     jwt.verify(
       req.cookies.token,
       process.env.TOKEN_SECRET,
       async function (err, decoded) {
         if (err) {
           res.status(401).json({
             message: "Unauthorized Cannot perform this action",
             error: true,
           });
         } else {
           const requiredPermissions = ["admin"];
           if (
             decoded.Permissions.some((permission) =>
               requiredPermissions.includes(permission)
             )
           ) {
            try {
       if (decoded.email !== req.params.email) {
         const { email } = req.params;
         const { selected } = req.body;

         const user = await userdb.findOne({ email: email });
         if (!user) return res.status(404).send("User not found");

         const updatedPermissions = [
           ...new Set([...user.Permissions, ...selected]),
         ];

         user.Permissions = updatedPermissions;
         await user.save();
         res.json({
           user: user,
           message: "Permissions updated successfully",
         });
       } else {
         res.json({ message: "You cannot change your own permissions" });
       }
            } catch (err) {
              console.error(err);
              res.status(500).send("Server error");
            }
           } else {
             res.json({
               message: "You Dont Have permissions to perform this action",
               error: true,
             });
           }
         }
       }
     );
   } else {
     res.status(401).json({ message: "No token provided", error: true });
   }
 
});

app.post("/challenge/:id/submission", async (req, res) => {
  console.log("route hit");
  const { id } = req.params;
  const { html, css, login, email, Category, isSelected } = req.body;
  if (!login) {
    console.log("not login");
    res.json({ message: "You are not logged in. Login First" }).status(400);
    return;
  }
  let user = await userdb.findOne({ email: email });

  let existingSubmission = await Csschallengesdb.findOne({
    "submissions.user": user._id,
  });
  if (existingSubmission) {
    res.json({ message: "You have already made a submission. One Submission per user only!" }).status(400);
    return;
  }

  let submission = {
    html: html,
    css: css,
    elementtype: Category,
    user: user._id,
    isSelected: isSelected,
  };

  try {
    let challenge = await Csschallengesdb.findOne({ id: id });
    if (!challenge) {
      res.json({ message: "Challenge not found." }).status(404);
      return;
    }
    challenge.submissions.push(submission);
    await challenge.save();
    res.json({ message: "Submission added successfully." }).status(200);
  } catch (err) {
    console.error(err);
    res
      .json({ message: "An error occurred while adding the submission." })
      .status(500);
  }
});














app.get("/data", async (req, res) => {
  try {
    const tables = await Table.find({});

   

    console.log(tables);
    res.json(tables);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    // Check if the file type is supported
    if (
      !["image/png", "image/jpeg", "image/jpg", "application/pdf"].includes(
        file.mimetype
      )
    ) {
      return res
        .status(400)
        .json({
          error:
            "Unsupported file type. Please upload a PNG, JPEG, JPG, or PDF file.",
        });
    }

    const fileBuffer = await fsPromises.readFile(file.path);
    const formData = new FormData();
    formData.append("input", fileBuffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    const response = await axios.post(
      "https://trigger.extracttable.com/",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "x-api-key": process.env.EXTRACT_API_KEY,
        },
      }
    );

    const tableJsons = response.data.Tables.map((table) => table.TableJson);
    const table = new Table({ ...response.data, Tables: tableJsons });
    await table.save();
    res.json({ message: "File uploaded and data saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
