import { config } from "dotenv";

import mongoose from 'mongoose';
//
const { DB_USER, DB_PASS } = config();
//
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.dognspk.mongodb.net/?retryWrites=true&w=majority`)
//
const Schema = mongoose.Schema

const DownloadSchema = new Schema({
    name: {
        type: String,
        required: 'File Name required'
    },
    price: {
        type: String,
        required: 'path is required.'
    },
    time: {
        type: Date
    }
})

export default tradeSchema;