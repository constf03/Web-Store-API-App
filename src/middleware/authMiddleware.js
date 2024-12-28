import jwt from "jsonwebtoken";

const jwtCheck = async (req, res, next) => {
  const tokenHeader = req.headers.authorization;

  if (!tokenHeader || !tokenHeader.startsWith("Bearer")) {
    return res.status(401).send({ success: false, msg: "Unauthorized" });
  }

  const token = tokenHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const { id, username } = decoded;
  req.user = { id, username };
  next();
};

export default jwtCheck;
