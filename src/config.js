import { config } from "dotenv";

config();

const c = {
    port: process.env.PORT,
    user: process.env.USER,
    pass: process.env.PASS,
    server: process.env.SERVER,
    database: process.env.DATABASE
}

module.exports = c;