import { LiteClient, LiteRoundRobinEngine, LiteSingleEngine } from "ton-lite-client";
import { Address} from "ton-core";

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
const engines = [];
	engines.push(new LiteSingleEngine({
		host: `tcp://${intToIP(server.ip)}:${server.port}`,
		publicKey: Buffer.from(server.id.key, 'base64'),
	}));
	const engine = new LiteRoundRobinEngine(engines);
	const client = new LiteClient({ engine });

export async function main() {
	
	const master = await client.getMasterchainInfo()
	console.log('master', master)
    return master
}

main()