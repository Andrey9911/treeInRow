<template>
    <!-- <technical_problems style="position: absolute;top:0;left:0; bottom:0; right:0;"></technical_problems> -->
    <div class="main__parametrs" ref="game_page">
        <div class="block-parametrs">
            <div class="user-data content">
                <div class="change__but user-data__change-but" @click="ChangeCurrence">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                </div>
                <div class="input__buy input-parametrs">
                    Это 
                    <div class="icon-active"></div>
                    <div class="block-input">
                        <input @focus="search_block = true" @input="search" type="search" class="search-active currencies-input_buy" :value="currDataCurrenciesSale">
                        <input @change="(el) => {data_exchange.active_sale.price = el.target.value}" data-type="sale" class="value-summ " type="text" placeholder="укаите сумму">
                    </div>
                   
                    <div v-if="search_block" class="content content-search search-block" ref="search-block">
                        <div v-for="i in data_exchange.active_sale.array_data" :key="i.id"
                            @click="() => {data_exchange.active_sale.id = i.id}"
                                class="item-active">
                                    <span class="item-title">{{i.name}}</span>
                                </div>
                    </div>
                </div>
                <div class="input__sale input-parametrs">
                    Меняем на это
                    <div class="icon-active"></div>
                    <div class="block-input">
                        <input @focus="search_block2 = true" type="search" class="search-active" :value="currDataCurrenciesBuy">
                    </div>
                    
                    <div v-if="search_block2" class="content content-search search-block" ref="search-block2">
                        <div v-for="i in data_exchange.active_buy.array_data" :key="i.id"
                            @click="() => {data_exchange.active_buy.id = i.id}"
                                class="item-active">
                                    <span class="item-title">{{i.name}}</span>
                                </div>
                    </div>
                </div>
                <div style="margin: 10px auto" class="submit button but" @click="submitData">Поиск</div>
            </div>
            <div class="best-bundle" :class="{active: active_bundle}">
                <div class="header-block" style="display:flex; justify-content:space-between; flex-wrap:wrap;align-items: center;">
                    <h2 style="font-size:1.5em; font-weight:600">Лучшая Связка</h2>
                    <div class="but button" style="" @click="loadDataBB">BB</div>
                    <div class="header-block__time" style="color:var(--negative-bgc);font-size:.9em; width:100px">Обновленно сейчас</div></div>
                
                <div class="best-bundle__list">
                    <bundle-element v-for="el in best_bundle" :key="el.type" :data="el">
                        <div v-if="el.type=='buy'" class="bundle__pair pair">{{ Number(best_bundle.find(el => el.type=='buy').rate * data_exchange.active_sale.price).toFixed(2)}} = {{ data_exchange.active_sale.price }} {{data_exchange.active_sale.title}}</div>
                        <div v-else-if="el.type=='sale'" class="bundle__pair pair"> {{ data_exchange.active_sale.price }} {{data_exchange.active_sale.title}} =  {{Number(data_exchange.active_sale.price / best_bundle.find(el => el.type=='sale').rate).toFixed(2)}} {{data_exchange.active_buy.title}} </div>
                        <div v-else-if="el.type=='change'" class="bundle__pair pair">{{ data_exchange.active_sale.price }} {{data_exchange.active_sale.title}} => {{best_bundle.find(el => el.type=='change').rate}}$</div>
                    </bundle-element>
                </div>
               
                <div class="bundle__result content">
                    <div class="bundle__spred">{{ Number((data_exchange.active_sale.price / best_bundle.find(el => el.type=='sale').rate - best_bundle.find(el => el.type=='buy').rate)/(data_exchange.active_sale.price / best_bundle.find(el => el.type=='sale').rate) * 100).toFixed(2)}}</div>
                   {{ Number(best_bundle.find(el => el.type=='buy').rate).toFixed(2) - Number(data_exchange.active_sale.price/best_bundle.find(el => el.type=='sale')).rate <= 0 ? 'Ничего нет': Number(data_exchange.active_sale.price/best_bundle.find(el => el.type=='sale').rate).toFixed(2) - Number(best_bundle.find(el => el.type=='buy').rate).toFixed(2)}}  
                </div>
                <div class="bundle__time-update data-update">{{ new Date().getHours() }}:{{ new Date().getMinutes() }} {{ new Date().getHours() >= 12 ?'PM':'AM' }}</div>
            </div> 
            <div class="" style="font-size:1.5em; font-weight:600">Лучший курс</div> 
            <div class="best-rate rate content" :class="{active: active_bundle}">
                <div class="rate__changer changer"><a :href="best_rate.url">{{best_rate.exchange}}</a></div>
                <div class="rate__pair pair">{{ data_exchange.active_sale.price }} {{ data_exchange.active_sale.title }} = {{best_rate.rate * data_exchange.active_sale.price}}</div>
                <div class="rate__time-update data-update">{{ new Date().getHours() }}:{{ new Date().getMinutes() }} {{ new Date().getHours() >= 12 ?'PM':'AM' }}</div>
            </div>
            <div class="content-list changes content">
                <div v-for="i in pairs" :key="i.changer" ref="changes_block" class="item rate change">
                    <div class="rate__changer changer">{{ determineChanger }}</div>
                    <div class="rate__pair pair">1 {{ data_exchange.active_sale.title }} = {{ i.rate }} rub</div>
                    <div class="rate__time-update data-update">12:23 PM</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {computed, onBeforeMount, onMounted, reactive, ref, defineModel} from 'vue';
import bundleElement from './bundle_element.vue';
import { useHistoryStore } from '../js/store'
import {apolloClient} from '../js/graph.js';
import gql from 'graphql-tag';
// import technical_problems from './technical_problems.vue';
import { messageShow } from '../js/messageShow';
import {parsingDataBB, getTicketBB} from '../js/parser.mjs';

const BESTCHANGES_TOKEN = '739f245eedd702a5feccc6acc9e9ff5d';
let active_bundle = false;
let pairs = ref([]);
const key_word_bundle = ['buy','sale','change'] //к.слова для индексирования в массиве данных для свзки

let data_exchange = reactive({
    active_buy: {
        symbol:'',
        array_data:[],
        id:0,
        title:'',
        icon:'',
        price: 1
    },
    active_sale:{
        array_data:[] ,
        symbol:'',
        id:0,
        title:'',
        icon:'',
        price:1
    }
})
let best_rate = reactive({
    exchange:'',
    rate:0,
    date_update:0,
    url:''
})
let best_bundle = reactive([
    {
        type: 'sale',
        exchange:'',
        rate:0,
        url:''
    },
    {
        type: 'buy',
        exchange:'',
        rate:0,
        url:''
    },
    
]);
let bundle_block = ref();
let changes_block = ref();
let search_block = ref(true);
let search_block2 = ref(false)
let exchanges = ref([]);
let currencies = ref([]);


onBeforeMount(async () => {
    console.log(localStorage.getItem('exchanges'));
    if(!(localStorage.getItem('exchanges') || localStorage.getItem('currencies'))){
        if(navigator.onLine){
            const response = await fetch('https://www.bestchange.app/v2/739f245eedd702a5feccc6acc9e9ff5d/changers/ru');
            exchanges.value = await response.json();
            const response2 = await fetch('https://www.bestchange.app/v2/739f245eedd702a5feccc6acc9e9ff5d/currencies/ru');
            currencies.value = await response2.json();

            setTimeout(() => {loadPage(exchanges, currencies)},1000);
            localStorage.setItem('currencies',JSON.stringify(currencies));
            localStorage.setItem('exchanges',JSON.stringify(exchanges));

            data_exchange.active_sale.array_data =  currencies._rawValue.currencies.filter(el => !el.cash && el.crypto);
            data_exchange.active_buy.array_data = currencies._rawValue.currencies.filter(el => !el.cash && !el.crypto);

        } else messageShow('error','not Network connect');
    }else{
        let currencies_v = JSON.parse(localStorage.getItem('currencies'));
        exchanges.value = JSON.parse(localStorage.getItem('exchanges'))._rawValue
        console.log(JSON.parse(localStorage.getItem('exchanges')));
        
        data_exchange.active_sale.array_data = currencies_v._rawValue.currencies.filter(el => !el.cash && el.crypto);
        data_exchange.active_buy.array_data = currencies_v._rawValue.currencies.filter(el => !el.cash && !el.crypto);
    }
    
    
});

async function loadPage(exchanges, currencies){
    localStorage.setItem('exchanges',JSON.stringify(exchanges));
    console.log(exchanges.value, currencies.value);
}
onMounted(() => {
    console.log(bundle_block.value)
    // console.log(currencies.value);

//Скрыть блок поиска при нажатии в любую пустую зону
  document.addEventListener('click', function(e){
    if(!e.target.classList.contains('search-block') && !e.target.classList.contains('search-active')){
      //element clicked wasn't the div; hide the div
      search_block.value = false
      search_block2.value   = false
    }
  })
    
})

let game_story = useHistoryStore(); 

//для добавления курса конкретной валюьы в блок юзер данных
let rateActive = computed(async () => {
    console.log();
    
    const response = await fetch(`https://www.bestchange.app/v2/739f245eedd702a5feccc6acc9e9ff5d/presences/${data_exchange.active_buy-data_exchange.active_sale}`);
    return await response.json(); 
})

//Загрузка данных курсов на ByBit
async function loadDataBB(){
    best_bundle.push({
        type: 'change',
        exchange: 'bybitConvert'
    })
    try {        
        await getTicketBB(data_exchange.active_buy.symbol)
                .then(res => {
                    best_bundle.find(el => el.type == 'change').rate = res['list'][0].lastPrice
                    console.log(res);
                })
    } catch (error) {
        messageShow('error', error);
        console.log(error);
        
    }
}
let currDataCurrenciesSale = computed(() => {
    try {
        data_exchange.active_sale.title = data_exchange.active_sale.array_data.find((el) => el.id == data_exchange.active_sale.id).name
        data_exchange.active_sale.symbol = data_exchange.active_sale.array_data.find((el) => el.id == data_exchange.active_sale.id).code
    } catch (error) {
        return
    }
    
    console.log(data_exchange.active_sale.title);
    
    return data_exchange.active_sale.title
})
let currDataCurrenciesBuy = computed(() => {
    try {

        data_exchange.active_buy.title = data_exchange.active_buy.array_data.find((el) => el.id == data_exchange.active_buy.id).name
        data_exchange.active_buy.symbol = data_exchange.active_sale.array_data.find((el) => el.id == data_exchange.active_sale.id).code
    } catch (error) {return}
    
    return data_exchange.active_buy.title})
//смена местами актива продажи и покупки
function ChangeCurrence(){
    let middle = data_exchange.active_sale.array_data;
    data_exchange.active_sale.array_data = data_exchange.active_buy.array_data;
    data_exchange.active_buy.array_data = middle;
    // [data_exchange.active_sale.array_data, data_exchange.active_buy.array_data = data_exchange.active_buy.array_data, data_exchange.active_sale.array_data]
    console.log(data_exchange.active_buy.array_data[0], data_exchange.active_sale.array_data[0]);
}
async function submitData(){
    // if(navigator.onLine) messageShow('error','not Network connect');
    resetData();
    best_bundle.slice(best_bundle.indexOf(['type']=='change'));
    document.querySelectorAll('.search-active').forEach((el) => {
        if(el.value === ''){
            messageShow('error', 'какое-то поле пустое');
            return;
        }
    })

    const response = await fetch(`https://www.bestchange.app/v2/739f245eedd702a5feccc6acc9e9ff5d/rates/${data_exchange.active_buy.id}-${data_exchange.active_sale.id}`);
    pairs.value =  await response.json(); 
    let rateValue = Object.keys(pairs.value.rates)
    pairs.value = pairs.value.rates[rateValue];
    
    console.log(data_exchange.active_sale)
    setTimeout(() => {
        console.log( changes_block.value);
        // changes_block.value..textContent = exchanges._rawValue.exchanges.find(el => el.id === changes_block.value.key )

        findBestRate(pairs.value);
        findBestBundle();
        active_bundle = true;
        console.log(active_bundle);
        
        
    },1000)
}
//сброс всех временных объектов данных
function resetData(){
    active_bundle = false;
    // Object.
}

//Найти лучший курс
function findBestRate(br,callback){
    
    if(callback === undefined){
        console.log("Элемент покупки");
        
        let min_s = {exchange:'', rate:1000000000};;
        let min_m = {exchange:'', rate:1000000000};;
        let min = {exchange:'', rate:0};
            let start = 0;
            let end = br.length-1;
            while(start < br.length/2){
                
                if(br[start].rate < min_s.rate){
                    min_s.rate = br[start].rate;
                    min_s.exchange = br[start].changer
                } 
                start++;
                // console.log(`start = ${start}; end = ${end}`);
                // console.log(`curr = ${br[start].rate} min_s = ${min_s.rate}`);
                
            }
            while(end > br.length/2){
                if(br[end].rate < min_m.rate){
                    min_m.rate = br[end].rate;
                    min_m.exchange = br[end].changer
                }
                end--;
                // console.log(`start = ${start}; end = ${end}`);
                // console.log(`curr = ${br[end].rate} min_n = ${min_m.rate}`);
            }



        min.rate = min_m.rate < min_s.rate ? min_m.rate : min_s.rate; 
        min.exchange = min_m.rate < min_s.rate ? min_m.exchange : min_s.exchange;
        best_rate.rate = min.rate;
        console.log(exchanges._rawValue._rawValue);
        best_rate.exchange = exchanges._rawValue.changers.filter(el => el.id === min.exchange)[0].name;
        best_rate.url = exchanges._rawValue.changers.filter(el => el.id === min.exchange)[0].urls.ru
        
    }
    else{
        let max = {exchange:'', rate:0};
        console.log("Элемент продажи");

        let max_s = {exchange:'', rate:0};
        let max_m = {exchange:'', rate:0};
        
        let start = 0;
        let end = br.length-1;
        while(start < br.length/2){
            if(1/br[start].rate > max_s.rate){
                // console.log(`[цена проджажи - ${ br[start].rate} левой стороны больше max - ${ max_s.rate}] `);
                max_s.rate = br[start].rate;
                max_s.exchange = br[start].changer
                
            } 
            start++;
            
        }
        while(end > br.length/2){
            if(1/br[end].rate > max_m.rate){
                // console.log(`[цена проджажи - ${ br[end].rate} правой стороны больше max - ${ max_m.rate}] `);
                max_m.rate = br[end].rate;
                max_s.exchange = br[end].changer
                // console.log(`[цена проджажи правой стороны изменена] составляет - `, 1/max_m.rate);
            } 
            end--;
        }

        max.rate = max_m.rate > max_s.rate ? max_m.rate : max_s.rate;
        max.exchange = max_m.rate > max_s.rate ? max_m.exchange : max_s.exchange;
        // console.log(max);
        callback(br,max);

    } 
   
}
async function findBestBundle(){
    let p;
    const response = await fetch(`https://www.bestchange.app/v2/739f245eedd702a5feccc6acc9e9ff5d/rates/${data_exchange.active_sale.id}-${data_exchange.active_buy.id}`);
    p =  await response.json(); 
    let rateValue = Object.keys(p.rates)
    p = p.rates[rateValue];
    findBestRate(p,(array,min) => {
        console.log(best_bundle);
        console.log(`[курс продажи]${1/min.rate}`);
        console.log(`[курс покупки]${best_rate.rate}`);
        best_bundle.find(el => el.type=='buy').rate = Number(best_rate.rate)
        best_bundle.find(el => el.type=='sale').rate = Number(min.rate);
        
        console.log('[массив обменников]',exchanges._rawValue.changers.filter(el => el.id === min.exchange));
        best_bundle.find(el => el.type=='sale').exchange = exchanges._rawValue.changers.filter(el => el.id === min.exchange)[0].name;
        best_bundle.find(el => el.type=='sale').url = exchanges._rawValue.changers.filter(el => el.id === min.exchange)[0].urls.ru
        console.log(min.rate);
        
    });  

}
function search(even){
    
    
    data_exchange.active_sale.array_data.filter((el,i,array) => {
        return el.name.includes(even.value)
    })
}
</script>

<style lang="scss" scoped>
@import url('../style.css');
.user-data{
    text-align: center;
    margin: 30px auto;
    position: relative;
    .user-data__change-but{

        position: absolute;
        right: 50px;
        top: 50%;
    }
}
.change__but{
    color: #ffffff;
    background-color: #00519d45;
    border-radius: 10px;
    padding: 7px 12px;
    
}
.input-parametrs{
    margin: 0 auto;
    width: 80%;
    .block-input{
        display: flex;
        justify-content: space-between;
        input.value-summ{
            min-width: 20%;
            &:focus{
                max-width: 50%;
            }
            &:focus+.currencies-input_buy{
                width: 50%;
            }
        }
        input{
            transition: all ease-out .4s;
            min-width: 80%;
            height: 50px;
            margin: 0 1px;
            padding: 5px 10px;
            border-radius: 10px;
            background-color: #acacac49;
            box-sizing: border-box;
            border: none;
        }
        input:focus{
            width: 80%;
        }
    }
    
}
.input__buy{
    position: relative;
    .content-search{
        font-weight: 600;
        font-size: 1.2em;
        z-index: 2;
        max-height: 400px;
        width: 90%;
        overflow: scroll;
        position: absolute;
        background-color: #7e7e7e;
        &>div:hover{background-color: #00519d45;}
    }
}
.input__sale{
    position: relative;
    .content-search{
        font-weight: 600;
        font-size: 1.2em;
        z-index: 2;
        max-height: 400px;
        width: 90%;
        overflow: scroll;
        position: absolute;
        background-color: #7e7e7e;
        &>div:hover{background-color: #00519d45;}
    }
}
.rate{
    z-index: 1;
    margin: 10px auto 40px auto;
    position: relative;
    width: 90%;
    height: 60px;
    padding: 30px 20px;
    box-sizing: border-box;
    .rate__changer{
        position: absolute;
        top: -10px;
        left: 30px;
    }
    .rate__time-update{
        color: #272727;
        font-weight: 400;
        position: absolute;
        bottom: 5px;
        right: 10px;
    }
}

.best-rate{display: none;
    &.active{display: block;}}
.best-bundle{
    display: none;
    position: relative;
    .best-bundle__list{
        &:first-child{
            border-radius: 10px 10px 0 0;
        }
        &:last-child{
            border-radius: 0 0 10px 10px ;
        } 
        .best-bundle__block{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 15px;
            .bundle__pair{
                width: 50%;
            }
            &.content{
                margin: 0;
                padding: 1px 1px;
            }
        }
    }
    
    &.active{display: block;}
    &:first-child{border-bottom:thick;}

    .bundle__time-update{
        color: #272727;
        font-weight: 400;
        position: absolute;
        bottom: 2px;
        right: 10px;
    }
    .bundle__result{
        position: relative;
        border-top: .8px dashed #888888cd;
        &.content{
            margin: 0;
            padding: 7px 10px;
            text-align: center;
            font-weight: bold;
            font-size: 1.2em;
            border-radius: 0 0 10px 10px;
        }
        .bundle__spred{
            font-weight: 400;
            font-size: 1em;
            position: absolute;
            top: 2px;
            left: 5px;

            background-color: #272727;
            border-radius: 7px;
            padding: 1px 7px;
        }
    }
}
.changes{
    &::-webkit-scrollbar-track{
        width: 10px;
        height: 7px;
    }
    &::-webkit-slider-thumb{
        -webkit-appearance: none !important;
        background:rgb(255, 255, 255);
        height:8px;
        width:10px;
        border-radius: 50%;
    }
}
</style>