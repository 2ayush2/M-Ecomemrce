import JWT from "jsonwebtoken";

const generateAuthToken = (user) => {
  const payload = {
    username: user.username,
    email: user.email,
  };

  // generating and signing a token
  const JWT_KEY = process.env.JWT_SECRET;
  JWT.sign(
    {
      data: payload,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 10,
    },
    JWT_KEY,
    (err, accessToken) => {
      return accessToken;
    }
  );
};

const validateToken = (accessToken) => {
  const JWT_KEY = process.env.JWT_SECRET;
  JWT.verify(accessToken, JWT_KEY, (err, decoded) => {
    if (err) {
      return err;    }
    return decoded;
  });
};

module.exports = { generateAuthToken, validateToken };
