import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const host = process.env.MYSQL_HOST;
const port = Number(process.env.MYSQL_PORT || 3306);
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MYSQL_DB || "todo_db";

if (!host) {
    console.warn("MYSQL_HOST is not configured");
}

const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: "mysql",
    logging: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },

    dialectOptions: {
        connectTimeout: 10000,
    },
});

export const initDb = async () => {
    try {
        await sequelize.authenticate();
        console.log("MySQL DB Connected");
    } catch (error) {
        console.error("MySQL connection failed:", error.message);
        throw error;
    }
};

export default sequelize;