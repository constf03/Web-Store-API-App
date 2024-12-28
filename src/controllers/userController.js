import User from "../models/User.js";
import bcrypt from "bcrypt";

const createUser = async (req, res) => {
  try {
    const {
      username,
      password,
      first_name,
      last_name,
      email,
      address_line1,
      city,
      postal_address,
      country,
    } = req.body;

    // check if email already exists
    const emailTaken = await User.findOne({ where: { email } });
    if (emailTaken) {
      return res
        .status(409)
        .json({ success: false, msg: "Email already taken" });
    }

    // check if username is taken
    const usernameTaken = await User.findOne({ where: { username } });
    if (usernameTaken) {
      return res
        .status(409)
        .json({ success: false, msg: "Username already taken" });
    }

    // hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      password_hash: passwordHash,
      first_name,
      last_name,
      email,
      address_line1,
      city,
      postal_address,
      country,
    });

    await user.save();
    const response = { ...user.toJSON(), password_hash: undefined }; // hide password hash property from response
    return res.status(201).send({ success: true, data: response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: "An error occurred." });
  }
};

export default { createUser };
