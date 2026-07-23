const jwt = require("jsonwebtoken");

const genJWT = (uid, fullName, role, restaurant) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, fullName, role, restaurant };
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
