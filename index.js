
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
const PATHP2P =  'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search';
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

const getDataP2P = () => {
    axios.post(PATHP2P, POST_DATA)
      .then(function (response) {
        perparDataSave(response)
        //console.log(response);
      })
      .catch(function (error) {
        console.log({error});
      });

    return;
    const trade = new P2PTraders(data);
    trade.save((err, res) => {
        if (err) return log({ err })
        log({ res })
    })
}

const jobDataP2P = scheduleJob(EVRY_TIME, getDataP2P);
