import { DataTypes } from "sequelize";
import sequelize from "../db/postgres.js";

const ShoppingCartItem = sequelize.define(
  "shopping_cart_item",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    product_title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    product_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    associate(models) {
      ShoppingCartItem.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    },
  }
);

export default ShoppingCartItem;
