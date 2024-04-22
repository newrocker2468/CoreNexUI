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
const cookieParser = require("cookie-parser");
const uuidv4 = require("uuid").v4;
//git fetch origin
//git checkout master
//git merge origin/master
//npm i 
function generateAccessToken(user) {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}

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
app.use(cookieParser());
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
       
       console.log(user);
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
    successRedirect: "http://localhost:5173/home",
    failureRedirect: "http://localhost:5173/login",
  })
);

app.get("/login/sucess", async (req, res) => {
  if (req.user) {
    const user = req.user;
    // const token = generateAccessToken();
    const token = jwt.sign(
      {
        email: user.email,
        permissions: user.permissions,
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
      },
      process.env.TOKEN_SECRET
    );
    const rememberMe = req.query.rememberMe === "true";
    const maxAge = rememberMe
      ? 15 * 24 * 60 * 60 * 1000
      : 2 * 24 * 60 * 60 * 1000; 
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: maxAge,
      sameSite: "none",
      secure: true,
    });console.log(maxAge)

    res.status(200).json({ message: "user login", user: token });
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
    successRedirect: "http://localhost:5173/home",
    failureRedirect: "http://localhost:5173/login",
  })
);

app.post("/login", async (req, res) => {
const {email,password,remember}=req.body;
const token =req.cookies.token;
if(token){
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: "Failed to authenticate token" });
    }
    res.status(200).json({ user: decoded });
  })
}
else{
  const user = await userdb.findOne({ email: email });
  if (!user) {
    console.log("User not found");
    // return res.status(400).json({ message: "User not found" });
  }

  if (user.password !== password) {
    console.log("Password is incorrect");
    // return res.status(400).json({ message: "Password is incorrect" });
  }
  if(user.password === password){
    console.log("password is correct");
}
}

});
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



app.get("/csschallenges", async (req, res) => {
  try {
    const Csschallenges = await Csschallengesdb.find({});
    res.status(200).json(Csschallenges);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching CSS challenges.");
  }
});

app.get("/csschallenges/:id", async (req, res) => {
  let csschallenges = await Csschallengesdb.findOne({ id: req.params.id });
  res.json({ csschallenges });
});
app.post("/csschallenges/:id", async (req, res) => {
  let Csschallenges = await Csschallengesdb.findOne({ id: req.params.id });
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
    res.json({ message: "CSS challenges already exists."});
  }
});
app.post("/csschallengesupdate", async (req, res) => {
const{id,title,sdesc,description,img,status,date}=req.body
  try {
    const challenges = await Csschallengesdb.findOneAndUpdate(
      { id: id },
      {
        $set: {
          title: title,
          sdesc: sdesc,
          description: description,
          img: img,
          status: status,
          date: date,
        },
      },
      { new: true }
    );
    console.log(challenges);
    res.status(200).json(challenges);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating CSS challenges.");
  }
});
app.post("/csschallengesdelete", async (req, res) => {
  const { id } = req.body;
  console.log("id " + id);
  try {
    const challenges = await Csschallengesdb.findOneAndDelete({ id: id });
    console.log(challenges);
    res.status(200).json({ message: "CSS challenges deleted successfully."});
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"An error occurred while deleting CSS challenges."});
  }

})
app.post("/csschallengesget", async (req, res) => {
  const { id } = req.body;
  console.log("id " + id);
  try {
    const challenges = await Csschallengesdb.findOne({ id: id });
    console.log(challenges);
    res.status(200).json(challenges);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching CSS challenges.");
  }
});

app.post("/editor/create/:id", async (req, res) => {
  const { id } = req.params;

if(!req.body.login){
  console.log("not login");
  res.json({ message: "You are not login" }).status(400);
  return;
}
 let csselements;
try{
  if (req.body.login || id && req.body.html && req.body.css) {
  const user = await userdb.findOne({ email: req.body.email })
  csselements = new CssElementdb({
    id: id,
    html: req.body.html,
    css: req.body.css,
    user:user._id
  });

  user.cssElements.push(csselements._id);
  await user.save();
  await csselements.save();
} 
  res.json({ message: "Code saved successfully." }).status(200);
}
catch(err){
  res.json({ message: "Code not saved,something went wrong" }).status(400);
  console.log(err);
}
  // CssElementdb.save();

}

)



app.get("/allcsselements", async (req, res) => {
  try {
    const CssElements = await CssElementdb.find({}).populate("user");
    console.log(CssElements);
    res.status(200).json(CssElements);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching CSS elements.");
  }
});


app.get("/editor/:id", async (req, res) => {
  try {
    const CssElements = await CssElementdb.findOne({_id:req.params.id});
    res.status(200).json(CssElements);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching CSS elements.");
  }
});

app.post("/editor/:id/delete", async (req, res) => {
  try {
    const CssElements = await CssElementdb.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "CSS elements deleted successfully."});
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"An error occurred while fetching CSS elements."});
  }
});//getallevents
//events/:id

app.post("/event/:id",async(req,res)=>{
  try{
    const Event = await Eventsdb.findOne({_id: req.params.id});
    res.status(200).json({Event})
  }catch(error){
    console.error(error);
    res.status(500).json({message:"An error has occured while fetching event "})
    
  }
});

app.post("/event/:id/create", async (req, res) => {
  let Event;
  try{
Event = new Eventsdb({
  id:req.param.id,
  eventName:req.body.Name,
  description:req.body.description,
  img:req.body.img,
  status:req.body.status,
  date:req.body.date
});
Event.save();
res.status(200).json({message:"event successfully added"})
} catch(error){
  console.error(error);
  res.status(500).json({message:"an error has occured while fetching event"})
}
})


app.post("/event/:id/update", async (req, res) => {
  try{
const Event = await Eventsdb.findByIDAndupdateOne({_id: req.params.id});
res.status(200).json({message:"event successfully updated"})
} catch(error){
  console.error(error);
  res.status(500).json({message:"an error has occured while updating event"})
}
   
})

app.post("/event/:id/delete", async (req, res) => {
  try{
const Event = await Eventsdb.findByIDAnddeleteOne({_id: req.params.id});
res.status(200).json({message:"event successfully deleted"})
} catch(error){
  console.error(error);
  res.status(500).json({message:"an error has occured while deleting event"})
}
})

//route for notes upload
app.post("/notesUpload/:id",async(req,res)=>{
  try{
    const Note = await Notesdb.findone({_id:req.params.id});
    res.status(200).json({Note})

  } catch(error){
    console.error(error);
    res.status(500).json({message:"An error has occured while fetching the notes "})
  }

})

app.post("/notesUpload/:id/upload",async(req,res)=>{
  try{
    const Note = new Notesdb({
      id:req.params.id,
      topicName:req.body.Name,
      description:req.body.description,
      img:req.body.img,
      date:req.body.date,

    });
    Note.save();
    res.status(200).json({message:"Document added successfully"})
  }catch(error){
    console.error(error);
    res.status(500).json({message:"An error occured when added the Document"})
  }
})

app.post("/notesupload/:id/update", async(req,res)=>{
  try{
    const Note = await Notesdb.findByIDAndupdateOne({_id: req.params.id});
    res.status(200).json(Note)
    } catch(error){
      console.error(error);
      res.status(500).json({message:"an error has occured while updating the Document"})
    }
       
    })


    app.post("/notesupload/:id/delete", async(req,res)=>{
      try{
        const Note = await Notesdb.findByIDAnddeleteOne({_id: req.params.id});
        res.status(200).json({message:"Document successfully Deleted"})
        } catch(error){
          console.error(error);
          res.status(500).json({message:"an error has occured while deleting the Document"})
        }
           
        })

app.post("/CssChallengecreate/:id/create", async (req, res) => {
 const { id } = req.params;
  if (req.body.login || id && req.body.html && req.body.css) {
  const user = await userdb.findOne({ email: req.body.email });
  let csselements = new CssElementdb({
    id: id,
    html: req.body.html,
    css: req.body.css,
    user:user._id
  });
  await csselements.save(); 
  }
});

app.get("/validate-token", (req, res) => {
if(req.cookies.token){
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: "Failed to authenticate token" });
    }
 
    res.status(200).json({ user: decoded });
  });}
  else{
    console.log("no token provided");
    res.status(401).json({ message: "No token provided" });
  }
});





app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});


