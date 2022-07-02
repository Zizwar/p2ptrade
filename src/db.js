import { config } from "dotenv";

import mongoose from 'mongoose';
//
config();
const { DB_USER, DB_PASS } = process.env;
console.log({ DB_USER, DB_PASS })
//
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.dognspk.mongodb.net/?retryWrites=true&w=majority`);
//
const Schema = mongoose.Schema

const tradeSchema = new Schema({

    price: {
        type: Number,
        required: 'price is required.'
    },
    classify: {
        type: String,
    },
    fiatUni: {
        type: String,
    },
    tradeType: {
        type: String,
    },
    asset: {
        type: String,
    },
    initAmount: {
        type: Number,
    },
    surplusAmount: {
        type: Number,
    },
    amountAfterEditing: {
        type: Number,
    },
    maxSingleTransAmount: {
        type: Number,
    },
    minSingleTransAmount: {
        type: Number,
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})
export const P2PTraders = mongoose.model('trades', tradeSchema)
