import { SendMode, TonClient, WalletContractV4, internal } from "@ton/ton";
import { mnemonicNew, mnemonicToPrivateKey, mnemonicToWalletKey } from "@ton/crypto";


const client = new TonClient({
	endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
	apiKey: '213fff03c52b16fb93899b0bb55830e6e61ee2f307aa9253d80dfc1afb1cdcae'
  });
let wallet;
let contract;
let mnemonics = "artefact math illegal differ menu differ unable giggle screen unveil divorce company gorilla skull tourist asthma magic cart peace solar sniff abandon acquire aware".split(" ");
let keyPair = await mnemonicToPrivateKey(mnemonics);

export async function createWallet(a_wallet, res){
	
	const workchain = 0; // Usually you need a workchain 0
    wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });    
	try {
		console.log('[wallet address] '+ wallet.address.toString({ bounceable: false,testOnly:true }));
		contract = client.open(wallet);
		res(wallet.address.toString({ bounceable: false, testOnly: true }))				
	} catch (error) {
		console.log(error);
		return
		
	}

	const rawFormat = `${workchain}:${wallet.publicKey.toString("hex")}`;
    // return toUserFriendlyAddress(wallet.address.toRawString()); // change here
}


export async function getTransactions() {
	return await client.getTransactions(wallet.address.toString({ bounceable: false,testOnly:true }),{limit:1,lt:0})
}

export async function sendTrans(adress_sender, adress_via)
{
	const senqo = await contract.getSeqno();
	console.log('[wallet senqo]: ');
	await contract.getSeqno();
	console.log('[wallet addresses] ' + wallet.address.toString({ bounceable: false }), adress_via);
	
	
	
	try {
		await contract.sendTransfer({
			seqno: senqo,
			secretKey: keyPair.secretKey,
			messages: [internal({
				value: '0.01',
				to: adress_via,
				body: 'demo',
			})]
		})
		.then(r => {	
			return;
		})
	} catch (error) {
		console.log('[trans error]', error);
		return {
			type: 'error',
			message: error.message
		}
	}
	
}