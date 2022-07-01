import { config } from "dotenv";

import mongoose from 'mongoose';
//
config();
const { DB_USER, DB_PASS } = process.env;
console.log({DB_USER,DB_PASS})
//
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.dognspk.mongodb.net/?retryWrites=true&w=majority`)
//
const Schema = mongoose.Schema

const tradeSchema = new Schema({
    name: {
        type: String,
        required: 'Name required'
    },
    price: {
        type: Number,
        required: 'price is required.'
    },
    time: {
        type: Number,
        default:new Date().getTime()
    }
})
export const P2PTraders = mongoose.model('trades', tradeSchema)
