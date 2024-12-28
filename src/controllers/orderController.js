import Order from "../models/Order.js";

const getOrders = async (req, res) => {
  try {
    const { user_id } = req.params;
    const orders = await Order.findAll({
      where: { user_id: user_id },
    });
    return res.status(200).json({ data: orders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: "An error occurred." });
  }
};

const createOrder = async (req, res) => {
  try {
    const {
      user_id,
      products,
      cost,
      delivery_details_first_name,
      delivery_details_last_name,
      delivery_details_email,
      delivery_details_address_line1,
      delivery_details_city,
      delivery_details_postal_address,
      delivery_details_country,
    } = req.body;

    const order = await Order.create({
      user_id,
      products,
      cost,
      delivery_details_first_name,
      delivery_details_last_name,
      delivery_details_email,
      delivery_details_address_line1,
      delivery_details_city,
      delivery_details_postal_address,
      delivery_details_country,
    });

    return res.status(201).send({ success: true, data: order });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: "An error occurred." });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, time_estimate } = req.body;
    const order = await Order.findOne({ where: { id: id } });

    if (!order) {
      return res.status(404).json({ msg: "Order not found." });
    }

    order.status = status;
    order.time_estimate = time_estimate;

    await order.save();
    return res.status(201).send({ success: true, data: order });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: "An error occurred." });
  }
};

export default { createOrder, updateOrder, getOrders };
