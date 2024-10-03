const jwt = require('jsonwebtoken');
const config = require('config');
const { access } = require('fs');

exports.generateToken = (user) => {
    return jwt.sign(
      { _id: user._id, name: user.name, email: user.email, accessToken: user.accessToken },
      config.get("GOOGLE_CLIENT_SECRET"),
      {
        expiresIn: "7d",
      }
    );
};

exports.generateRefreshToken = (user) => {
    return jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        accessToken: user.accessToken,
      },
      config.get("REFRESH_TOKEN_SECRET"),
      {
        expiresIn: "7d",
      }
    );
};

exports.refreshToken = async (refreshToken) => {
    try {
        const decoded = jwt.verify(
          refreshToken,
          config.get("REFRESH_TOKEN_SECRET")
        );
        return this.generateToken({
          _id: decoded.id,
          name: user.name,
          email: user.email,
          accessToken: user.accessToken,
        });
    } catch (error) {
        console.error('Error refreshing token:', error);
        return null;
    }
};
