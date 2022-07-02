
import { scheduleJob } from 'node-schedule';
import axios from "axios";
import { P2PTraders } from './src/db.js';
//
const log = console.log;
const EVRY_TIME = '*/5 * * * * *';
//

const data = {
    name: "winoO",
    price: 23,
    time: new Date().getTime()
}
const PATHP2P = 'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search';
const asset = "USDT";
const fiat = "MAD";
const tradeType = "SELL";

const POST_DATA = {
    asset,
    fiat,
    tradeType,
    "merchantCheck": true,
    "page": 1,
    "payTypes": [
    ],
    "publisherType": null,
    "rows": 20,
    "transAmount": "5000"
}

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
        arrData.push({
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
        P2PTraders.insertMany(arrData).then(function(){
            console.log("Data inserted")  // Success
        }).catch(function(error){
            console.log(error)      // Failure
        });
        //const trade =  new P2PTraders(arrData);
        return
        P2PTraders.collection.insert(arrData,(err, res) => {
            if (err) return log({ err })
            log({ res })
        })
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
