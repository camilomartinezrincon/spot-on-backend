const jwt = require("jsonwebtoken");

const genJWT = (uid, fullName, role) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, fullName, role };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Error generating the token");
          return;
        }

        resolve(token);
      },
    );
  });
};

module.exports = {
  genJWT,
};
