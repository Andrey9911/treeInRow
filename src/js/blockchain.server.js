import { TonClient, WalletContractV4, internal, wa } from "@ton/ton";
import { mnemonicNew, mnemonicToPrivateKey, mnemonicToWalletKey } from "@ton/crypto";


const client = new TonClient({
	endpoint: 'https://toncenter.com/api/v2/jsonRPC',
	apiKey: '00444fea3228c14ba22a3ef6b444ebaa80aaac0511db418b2a4ed3373eb94516'
  });
let wallet;
let contract;
let mnemonics = "artefact math illegal differ menu differ unable giggle screen unveil divorce company gorilla skull tourist asthma magic cart peace solar sniff abandon acquire aware".split(" ");
let keyPair = await mnemonicToPrivateKey(mnemonics);

export async function createWallet(a_wallet, res){
	
	const workchain = 0; // Usually you need a workchain 0
    wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });    
	try {
		console.log('[wallet address] '+ wallet.address.toString({ bounceable: false }));
		contract = client.open(wallet);
		res(wallet.address.toString({ bounceable: false }))				
	} catch (error) {
		console.log(error);
		return
		
	}

	const rawFormat = `${workchain}:${wallet.publicKey.toString("hex")}`;
    // return toUserFriendlyAddress(wallet.address.toRawString()); // change here
}




export async function sendTrans(adress_sender, adress_via)
{
	
	console.log('[wallet senqo]: ');
	await contract.getSeqno()
		.then((r) => {console.log(r);
		})
	console.log('[wallet addresses] ' + wallet.address.toString({ bounceable: false }), adress_via);
	
	
	const senqo = await contract.getSeqno();
	await contract.sendTransfer({
		seqno: senqo,
		secretKey: keyPair.secretKey,
		messages: [internal({
			value: '0.01',
			to: adress_via,
			body: 'Example transfer body',
		})]
	})
	.then(r => {	
		return true;
	})
	return contract;
}