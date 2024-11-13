<template>
    <div class="connected__block">
        <TonConnectButton />
        <div class="status__wallet" :class="{'active':status_connect}">{{ address != '' ? 'you connected' : 'no active' }}</div>    
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
                <div class="task__title">{{ task.title }}</div><div class="task__type-task but" :class="{'notActive': task.isDone}" @click="() => completing(task)">{{ task.reward }} $TROW</div>
                
            </div>
        </div>
    </div>
    
</template>

<script setup>
import { TonConnectButton, useTonAddress,useTonWallet,useSendTransaction, useTonConnectUI } from "ton-ui-vue";
import data_obj from "../js/data-obj";
import { onMounted, reactive } from "vue";
import { useHistoryStore } from "../js/store";
import {ref} from 'vue';
// import { LiteClient } from "ton-lite-client";

const tg = window.Telegram.WebApp;
let history = useHistoryStore()
let statistic = reactive({
    balans: 0,
    picture_len: history.games.length,
    user_id: 'amdrey'
});
console.log(window.Telegram);

let tasks_array = reactive(data_obj.tasks);

const { sendTransaction, addMessage, sending, error } = useSendTransaction();
const tonConnectUI = useTonConnectUI().tonConnectUI.value;

onMounted(() => {
    tg.ready();
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
    let array_trans = 
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
                        ask.isDone = true
                        messageShow('succes', 'Поздравляем');
                        statistic.balans += ask.reward;
                    }
                    break;
                case 'call_contract':

                     addMessage("EQD4eA1SdQOivBbTczzElFmfiKu4SXNL4S29TReQwzzr_70k",'100000');
                     await fetch('https://toncenter.com/api/v2/getTransactions?address=0QDplguoDgJLRiLAGwlyn9EeY69M7reUVRG2t1gFQAdXIREl&limit=10&to_lt=0&archival=true')
                     .then(r => {console.log(r.json());
                     })


                    
                    console.log();
                    
                    break;
            }
        }
        catch (error) {
            console.log('z');
            
        }
    
    // switch(type){
    //     case 'connect':
    //         if()
    // }

}

function messageShow(type, message)
{
    let div = document.createElement('div');
    div.textContent = message;
    div.className = 'message-block ' + type;
    document.querySelector('#app').append(div)
    setTimeout(() => {div.remove()},1000);
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
    
</style>