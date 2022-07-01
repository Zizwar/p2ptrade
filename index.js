const log = console.log
import {P2PTraders} from './src/db.js';
const data = {
    name:"wino",
    price:23,
    time:new Date().getTime()
}
const trade = new P2PTraders(data);
trade.save((err, res) => {
    if (err) return log({err})
    log({res})
})