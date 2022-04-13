import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      const isCustomAuth = token.length < 500;
      if (isCustomAuth) {
        decodeData = jwt.verify(token, "secret123");
        req.useId = decodeData?.id;
      } else {
        decodeData = jwt.decode(token);
        req.userId = decodeData?.sub;
      }
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

export default auth;
