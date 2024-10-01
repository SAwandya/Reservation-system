const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../models/user"); // Assuming you have a User model

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "130634797957-3nomoq3u697vsc0kpht36manaik0r5qm.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      // Find or create user in the database
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            // Add any other fields you need
          });
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
