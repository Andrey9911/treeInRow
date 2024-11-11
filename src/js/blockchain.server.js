import { LiteClient, LiteRoundRobinEngine, LiteSingleEngine, LiteEngine } from "ton-lite-client";
import { TonClient, Address, fromNano } from "ton";
import { getHttpEndpoint } from "@orbs-network/ton-access";




const address = "EQD4eA1SdQOivBbTczzElFmfiKu4SXNL4S29TReQwzzr_70k";
let adress_sc = Address.parse(address);
console.log(adress_sc);


function intToIP(int) {
	var part1 = int & 255;
	var part2 = ((int >> 8) & 255);
	var part3 = ((int >> 16) & 255);
	var part4 = ((int >> 24) & 255);

	return part4 + "." + part3 + "." + part2 + "." + part1;
}
let server = {
	"ip": -2018145068,
	"port": 13206,
	"id": {
		"@type": "pub.ed25519",
		"key": "K0t3+IWLOXHYMvMcrGZDPs+pn58a17LFbnXoQkKc2xw="
	}
}
    let engines = []
    engines.push(new LiteSingleEngine({
		host: `tcp://${intToIP(server.ip)}:${server.port}`,
		publicKey: Buffer.from(server.id.key, 'base64'),
	}));
	const engine = new LiteRoundRobinEngine(engines);
    const client = new LiteClient({ engine });

// function sendTr()
// {
//     new Promise(resolve => resolve())
//     .then(r => {
//         let total_old = client.runMethod(adress_sc,'get_total');
//         addMessage(address,100000);
//         return total_old
//     })
//     .finally((t) => {
//         if(sending) 
//         message = 'transa sending'
//     })
    
// }