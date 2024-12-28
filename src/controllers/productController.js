import Product from "../models/Product.js";

const getProducts = async (_req, res) => {
  try {
    const product = await Product.findAll();
    res.status(200).json({ data: product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: "An error occurred." });
  }
};

// this controller filters products by the objects' category property
const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const product = await Product.findAll({ where: { category: category } });
    if (!product) {
      return res.status(404).json({ success: false, msg: "Not found." });
    }
    res.status(200).json({ data: product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: "An error occurred." });
  }
};

const createProduct = async (req, res) => {
  try {
    const { title, price, description, category } = req.body;
    const product = await Product.create({
      title,
      price,
      description,
      category,
    });

    return res.status(201).send({ success: true, data: product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: "An error occurred." });
  }
};

export default { getProducts, getProductsByCategory, createProduct };
