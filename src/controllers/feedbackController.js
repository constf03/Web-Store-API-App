import Feedback from "../models/Feedback.js";

const createFeedback = async (req, res) => {
  try {
    const { message, rating } = req.body;
    const feedback = await Feedback.create({
      message,
      rating,
    });
    return res.status(201).send({ success: true, data: feedback });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: "An error occurred." });
  }
};

export default { createFeedback };
