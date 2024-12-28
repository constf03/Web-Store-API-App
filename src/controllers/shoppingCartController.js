import ShoppingCartItem from "../models/ShoppingCartItem.js";
import Product from "../models/Product.js";

const getShoppingCartItems = async (req, res) => {
  try {
    const { user_id } = req.params;
    const shoppingCartItems = await ShoppingCartItem.findAll({
      where: { user_id: user_id },
    });
    return res.status(200).json({ data: shoppingCartItems });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: "An error occurred." });
  }
};

const createShoppingCartItem = async (req, res) => {
  try {
    const { product_id, product_title, product_price, quantity, user_id } =
      req.body;

    // check that the product the user wants to add to cart exists in the api
    const product = await Product.findOne({
      where: { id: product_id, title: product_title },
    });
    if (!product) {
      return res.status(404).json({ success: false, msg: "Product not found" });
    }

    const totalPrice = quantity * product_price;

    const shoppingCartItem = await ShoppingCartItem.create({
      product_id,
      product_title,
      product_price,
      quantity,
      total_price: totalPrice,
      user_id,
    });
    return res.status(201).send({ success: true, data: shoppingCartItem });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: "An error occurred." });
  }
};

export default { getShoppingCartItems, createShoppingCartItem };
