import { DataTypes } from "sequelize";
import sequelize from "../db/postgres.js";

const Feedback = sequelize.define(
  "feedback",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.ENUM("1", "2", "3", "4", "5"),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Feedback;
