export const EVRY_TIME = '*/5 * * * * *'; //evry 15 sec
export const PATHP2P = 'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search';
export const asset = "USDT";
export const fiat = "MAD";
export const tradeType = "SELL";

export const POST_DATA = {
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