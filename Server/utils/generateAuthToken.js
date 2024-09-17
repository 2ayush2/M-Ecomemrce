import jwt from "jsonwebtoken"; // Ensure you have jsonwebtoken installed

const generateAuthToken = (user) => {
  const payload = {
    username: user.username,
    email: user.email,
  };

  // Generate and sign a token
  const JWT_KEY = process.env.JWT_SECRET;

  // Use a Promise to handle async operation
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_KEY,
      { expiresIn: "10d" }, // Expires in 10 days
      (err, token) => {
        if (err) {
          return reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

const validateToken = (accessToken) => {
  const JWT_KEY = process.env.JWT_SECRET;
  JWT.verify(accessToken, JWT_KEY, (err, decoded) => {
    if (err) {
      return err;
    }
    return decoded;
  });
};

export { generateAuthToken, validateToken };
