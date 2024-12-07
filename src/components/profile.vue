<template>
    <div class="connected__block">
        <div class="status__wallet" :class="{'active':status_connect}">{{ address != '' ? `${statistic.user_id} connected` : 'no active' }}</div>    
        <TonConnectButton />
    </div>
    <div class="profile-tg">
    </div>
    <div class="statistic">
        <div class="stat__c plashka balance-block"><span style="font-size:1.3em; font-weight:600">{{ statistic.balans }}</span> $TROW</div>
        <div class="stat__c plashka best-gameLen">Рисунков: {{ statistic.picture_len }}</div>
    </div>
    <!-- <div class="message">{{ address }}</div> -->
    <div class="Tasks">
        <div style="font-size:1.5em; font-weight:600">Задания</div>
        <div class="t Tasks_content">
            <div :data-index="task.id" class="task plashka" :class="{'active': !task.isDone}"
                v-for="task in tasks_array" :key="task.id">
                <div class="plaska_act" v-if="task.isDone"></div>
                <div class="task__title">{{ task.title }}</div><div class="task__type-task but" :class="{'notActive': task.isDone}" @click="() => completing(task)">{{ task.buttype.def }}</div>
                
            </div>
        </div>
    </div>
    <div class="transactions">
            <div style="font-size:1.5em; font-weight:600">Transactions</div>
            <div class="tr__content">
                <ul>
                    <li v-for="a in history_transactions" :key="a[0].address"><div class="tr-row">
                        <div class="tr__coordinate" style="display:flex;">
                            <span class="tr__adress">{{ a[0].address.toString() }}</span>
                            <div class="tr__time">{{ new Date(a[0].now* 1000).toISOString() }}</div>
                        </div>
                        
                    </div></li>
                </ul>  
            </div>
            
        </div>
    
</template>

<script setup>
import { TonConnectButton, useTonAddress,useTonWallet,useSendTransaction, useTonConnectUI, toUserFriendlyAddress } from "ton-ui-vue";
import data_obj from "../js/data-obj";
import { onMounted, reactive, watch } from "vue";
import { useHistoryStore } from "../js/store";
import {ref, defineProps} from 'vue';
import { sendTrans, createWallet, getTransactions } from "../js/blockchain.server";
import { messageShow,closeMessageLoad } from '../js/messageShow.js';

// import { LiteClient } from "ton-lite-client";


const tg = window.Telegram.WebApp | undefined;
let props = defineProps(['user','statistic']);
let history_transactions = ref([]);



let history = useHistoryStore()
let statistic = props.statistic;
console.log(window.Telegram);


let tasks_array = reactive(data_obj.tasks);

const { sendTransaction, addMessage, sending, error } = useSendTransaction();
const tonConnectUI = useTonConnectUI().tonConnectUI.value;

onMounted(() => {
    
    if(wallet.value != null){

    }
    console.log(wallet.value);
    
})

let status_connect = ref(useTonAddress().value == '' ? false : true);
let address = ref(useTonAddress().value);
let wallet = useTonWallet()

const myTransaction = {
      validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
      messages: [
        {
          address: "EQD4eA1SdQOivBbTczzElFmfiKu4SXNL4S29TReQwzzr_70k",
          amount: "1000000",
        }
    ]
}

async function completing(ask)
{
    // let array_trans = 
    console.log(ask);
    
        if(address.value == ''){
                messageShow('error', 'you not connected')
                console.log('error');
                return
            }
        try{
            switch(ask.type_task){
                case 'connect':
                    if(address.value != ''){
                        messageShow('succes', 'Поздравляем, кошелек присоединен');
                        taskDone(statistic, ask)
                    }
                    break;
                case 'call_contract':
                    new Promise(res => {
                        createWallet(wallet,res);
                    })
                    .then(res =>{
                        console.log('[resultat promise] ' + res);
                        if(res != '')
                        {
                            messageShow('sanding', 'отправка')
                            sendTrans(res, 'EQD4eA1SdQOivBbTczzElFmfiKu4SXNL4S29TReQwzzr_70k')
                            .then(res => {
                                getTransactions()
                                .then(result => {
                                    console.log('[last transaction] : ',result);

                                    // taskDone(statistic, ask)
                                    history_transactions.value.push(result)
                                })
                                closeMessageLoad();
                                console.log(res);
                                
                                messageShow('succes', 'Транзакция успешна');
                                
                            })
                            console.log(true);
                            
                        }
                        
                    })
                    break;
                case 'draw_picture':
                    console.log('[ckeck work case]'+ history.getImagesLen);
                    if(history.getImagesLen >= 5){
                        console.log('[ckeck len games]'+ history.getImagesLen >= 5);
                        messageShow('succes', 'Поздравляем');
                        taskDone(statistic, ask)
                    }
                    else{
                        messageShow('error', 'нет столько');
                    }
                    break;
            }
        }
        catch (error) {
            console.log(error);
            
        }
    
    // switch(type){
    //     case 'connect':
    //         if()
    // }

}
function taskDone(statistic, ask){
    statistic.balans += ask.reward;
    ask.isDone = true
}



</script>

<style lang="scss" scoped>

.plashka{
    background-color:#ffffff37;
    border-radius: 10px;
    padding: 10px 7px;
}
.but{
    background-color: #0098EA;
    color: #fff;
    font-weight: 500;
    font-size: 1em;
    padding: 5px 10px;
    width: fit-content;
    border-radius: 50px;
    cursor: pointer;
    transition: .2s ease-in all;
    &.notActive{background-color: #ffffff37;}
    &:hover{
        transform: scale(1.05);
    }
}
.statistic{
    display: flex;
    margin: 10px;

    .stat__c{
        margin: 0 10px;
    }
}
.task{
    position: relative;
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    font-weight: bold;
    font-size: 1em;
    padding: 15px 20px;

    .plaska_act{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        background-color: #0000003c;
        border-radius: 10px;
    }
}

.connected__block{padding: 10px 20px; display: flex; justify-content: space-between;margin-bottom: 40px;}
.Tasks{
    padding: 10px 15px;
    border-radius: 7px;
    background-color: #ffffff37;
}

.status__wallet{
    position: relative;

    border-radius: 10px;
    padding: 5px 15px;
    background-color: #ffffff37;
    width: fit-content;
   &::after{
        position: absolute;
        top: 5px;
        right: 5px;

        content: '';
        display: inline-block;
        background-color: red;
        width: 7px;
        height: 7px;
        border-radius: 50%;

    } 
    &.active::after{
        background-color: rgb(0, 255, 0);   
     }
}
.transactions{
    margin: 5px;
    padding: 10px;
    .tr__content{
        height: 200px;
        overflow-y: scroll;
        background-color: #00000033;
        // padding: 10px;
    }
    ul{
        margin: 0;
        padding: 0;
        li{list-style: none;width: 100%;}
        .tr-row{
            height: 50px;
            background-color: #00000033;
            border-radius: 10px;
            padding: 10px 10px;
            margin: 10px;

            .tr__time{
                border-radius: 10px;
                background-color: #00000033;
                padding: 10px;
            }
        }
        
    }
}    
</style>