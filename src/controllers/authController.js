import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });

  if (!user || !user.password_hash) {
    return res
      .status(400)
      .json({ success: false, msg: "Invalid username or password" });
  }

  const passwordCorrect = await bcrypt.compare(password, user.password_hash);

  if (!passwordCorrect) {
    return res
      .status(400)
      .json({ success: false, msg: "Invalid username or password" });
  }

  const userToken = {
    username: user.username,
    id: user.id,
    role: user.role,
  };

  const token = jwt.sign(userToken, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  res
    .status(200)
    .send({ token, username: user.username, role: user.role, id: user.id });
};

export default { loginUser };
