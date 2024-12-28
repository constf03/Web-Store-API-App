import jwt from "jsonwebtoken";

const adminCheck = async (req, res, next) => {
  // get the admin property value from jwt
  const tokenHeader = req.headers.authorization;
  const token = tokenHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const { role } = decoded;
  req.user = { role };

  if (role !== "admin") {
    return res.status(401).json({ msg: "Unauthrorized" });
  }
  next();
};

export default adminCheck;
