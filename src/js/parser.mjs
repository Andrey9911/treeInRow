import  get from "axios";
import { RestClientV5 } from 'bybit-api';

const API_KEY = 'fiJnfH6m3gnHshlT8l';
let url = 'https://api2.bybit.com/fiat/otc/item/online';
let data = {"userId":"","tokenId":"USDT","currencyId":"RUB","payment":[],"side":"1","size":"10","page":"1","amount":"","vaMaker":false,"bulkMaker":false,"canTrade":false,"sortType":"TRADE_PRICE","paymentPeriod":[],"itemRegion":1}
let USDT = Number().toFixed(2);

const client = new RestClientV5({
    // testnet: true,
});
export async function parsingDataBB(){

    await get(url,{data: data,method:'post',
            headers: {
                'Access-Control-Allow-Origin': 'https://www.bybit.com',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }})
        // Show response data
        .then((res) => console.log(res.data))
        .catch((err) => {
            console.log(err);
            return false;
           
        });
}

export async function getTicketBB(symbol){
    let price;
    try {
        return await client
            .getTickers({
                category: 'spot',
                symbol: symbol + 'USDT',
            })
            .then((response) => {
                price = response.result;
                return price;
            })
            .catch((error) => {
                return error;
        });
    } catch (error) {
        return error;
           
    }
    
}
