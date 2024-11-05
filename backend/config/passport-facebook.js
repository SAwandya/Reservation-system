const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("./models/User"); // Adjust to your user model path

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ["id", "displayName", "emails"], // Add fields as needed
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if a user already exists
        let user = await User.findOne({ facebookId: profile.id });

        if (!user) {
          // Create a new user if one doesn't exist
          user = new User({
            facebookId: profile.id,
            name: profile.displayName,
            email: profile.emails ? profile.emails[0].value : null, // Facebook might not return email
          });
          await user.save();
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);
