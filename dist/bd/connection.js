"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const bd = new sequelize_1.Sequelize(process.env.DB_NAME || "", process.env.DB_USER || "", process.env.DB_PASSWORD || "", {
    host: process.env.DB_HOST || "",
    dialect: "mysql",
    define: {
        createdAt: false,
        updatedAt: false,
    },
});
exports.default = bd;
