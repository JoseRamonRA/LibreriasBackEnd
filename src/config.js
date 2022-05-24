import { config } from "dotenv";

config();

const c = {
    port: process.env.PORT
}

module.exports = c;