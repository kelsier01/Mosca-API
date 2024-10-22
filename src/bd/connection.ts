import { Sequelize } from "sequelize";

const bd = new Sequelize(
  process.env.DB_NAME || "",
  process.env.DB_USER || "",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "",
    dialect: "mysql",
    define: {
      createdAt: false,
      updatedAt: false,
    },
  }
);
export default bd;
