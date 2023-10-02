import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_DB_STRING = process.env.MONGO_DB_STRING || '';
const MONGO_STRING_LOCAL = process.env.MONGO_DB_LOCAL_STRING || '';
const LOCAL = (process.env.LOCAL == "True") ? true : false;

const MONGO_URL_REMOTE = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@groundsupport.${MONGO_DB_STRING}.mongodb.net/`;
const MONGO_URL_LOCAL = MONGO_STRING_LOCAL;
const MONGO_URL = LOCAL ? MONGO_URL_LOCAL : MONGO_URL_REMOTE;
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 9090;

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};