
import { scheduleJob } from 'node-schedule';
import axios from "axios";
import { OrderBook, LastPrice } from './src/db.js';
//
import {
    EVRY_TIME,
    PATHP2P,
    POST_DATA
} from "./config.js";
//
const log = console.log;




//
const perparDataSave = ({ data = [] }) => {

    // log()
    //data || data.forEach(({ adv = [] }) => {
    const { price:_lastPrice, advNo } = data[0]?.adv || []

    const lastPrice = new LastPrice({ price:_lastPrice, advNo });

    lastPrice.save((err, res) => {
        if (err)  log({ err })
        log("last price",  res?.price )
    })
  //  return;
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
            advNo,
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
            advNo
        })
        //  console.log({ arrData })

    }
    OrderBook.insertMany(arrData).then(function () {
        console.log("Data inserted")  // Success
    }).catch(function (error) {
        console.log(error)      // Failure
    });
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


}

const jobDataP2P = scheduleJob(EVRY_TIME, getDataP2P);
