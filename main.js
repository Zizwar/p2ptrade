
import { scheduleJob } from 'node-schedule';
import axios from "axios";
import { P2PTraders } from './src/db.js';
//
import {
    EVRY_TIME,
    PATHP2P,
    asset,
    fiat,
    tradeType,
    POST_DATA
} from "./config";
//
const log = console.log;




//
const perparDataSave = ({ data = [] }) => {

    // log(data[0].adv.price)
    //data || data.forEach(({ adv = [] }) => {
    const arrData = [];
    for (const item of data) {

        const {
            price = 0,
            classify = "mass",
            tradeType = "BUY",
            asset = "USDT",
            fiatUni = "MAD",
            initAmount,
            surplusAmount,
            amountAfterEditing,
            maxSingleTransAmount,
            minSingleTransAmount,
        } = item?.adv;

        price && arrData?.push({
            price,
            classify,
            tradeType,
            asset,
            fiatUni,
            initAmount,
            surplusAmount,
            amountAfterEditing,
            maxSingleTransAmount,
            minSingleTransAmount,
        })
        //  console.log({ arrData })
        P2PTraders.insertMany(arrData).then(function () {
            console.log("Data inserted")  // Success
        }).catch(function (error) {
            console.log(error)      // Failure
        });
    }
}
//
const getDataP2P = () => {
    axios.post(PATHP2P, POST_DATA)
        .then(function ({ data = [] }) {
            perparDataSave(data)
            //console.log(response);
        })
        .catch(function (error) {
            console.log({ error });
        });

    return;
    const trade = new P2PTraders(data);
    trade.save((err, res) => {
        if (err) return log({ err })
        log({ res })
    })
}

const jobDataP2P = scheduleJob(EVRY_TIME, getDataP2P);
