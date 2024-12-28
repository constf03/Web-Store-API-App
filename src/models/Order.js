import { DataTypes } from "sequelize";
import sequelize from "../db/postgres.js";

const Order = sequelize.define(
  "order",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    products: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("sent", "processed", "en route", "delivered"),
      defaultValue: "sent",
      allowNull: false,
    },
    time_estimate: {
      type: DataTypes.STRING,
    },
    cost: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    delivery_details_first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    delivery_details_last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    delivery_details_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    delivery_details_address_line1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    delivery_details_city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    delivery_details_postal_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    delivery_details_country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    },
  }
);

export default Order;
