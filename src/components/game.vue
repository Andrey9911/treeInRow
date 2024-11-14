<template>
    <technical_problems style="position: absolute;top:0;left:0; bottom:0; right:0;"></technical_problems>
    <div class="main__parametrs">
        <div class="but parametr__but boosts-but parametr__boosts">
            <select name="" id="">
                <option v-for="item of boosts" :key="item.id"
                :value="item.symbol">{{ item.symbol }}</option>
                
            </select>
            <div class="boosts__full " v-if="b_panel">
            </div>
        </div>
        <div class="parametr__score score-text">{{ game.score }}</div>
        <div class="parametr__time time-text">{{ (game.time/60).toFixed(0) }}:{{ game.time%60 }}</div>

    </div>
    <div class="field">
        <div class="field__motion-block motion-content">{{ motion }}</div>
        <div class="started_tablo active">
            <div class="main__but but play" @click="(ev) => startGame(ev)">play</div>
        </div>
        <div class="table" ref="table" ></div>
        <!-- <table ref="table" @dragstart="evt => DragEvent(evt)" @dragend="dragEnd()">
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </table> -->
    </div>
</template>

<script setup>
import boost from './boost.vue';
import {getRandomColor, start} from '../js/logic.mjs';
import {computed, onMounted, reactive, ref} from 'vue';
import { useHistoryStore } from '../js/store'
import {apolloClient} from '../js/graph.js';
import gql from 'graphql-tag';

import Game from '../../game_alt/jewels-game-master/script/modules/Game';
import {initBoard, moves, score } from '../js/game-controller';
import technical_problems from './technical_problems.vue';



let game_story = useHistoryStore(); 

let b_panel = ref(true);
let boosts = [
    {
        id: 1,
        image:'',
        title:"boomb",
        symbol: 'B'
    },
    {
        id: 2,
        image:'',
        title:"clearCrest",
        symbol: '+'
    }
]

let table = ref(null);
let array_row;
let array_coll;

let motion = ref(moves);

let game = reactive({
    game_id: 0,
    score: ref(score),
    time: 0,
    date:new Date().toDateString()
})

onMounted(() => {
})

function startGame(ev)
{
    initBoard(table.value)
    ev.target.parentElement.classList.remove('active');
    timer(motion);
    // let g = new Game(table.value);
    // g.start();
    // g.refresh();
}



// function startGame(ev)
// {
//     console.log(ev);
//     ev.target.parentElement.classList.remove('active')
//     game.game_id+=1;
//     // id_game = Telegram.webApp.id+n 
//    timer(motion);
//     array_row = Array.from(table.value.children);
//     array_coll;
//     console.log(table.value.children);
//     array_row.forEach((el,i,arr) => { 
//         array_coll = table.value.children[i].children;
//         for(let ind = 0; ind < array_coll.length; ind++)
//         {
//             let bgc = getRandomColor();
//             let cll = array_coll[ind];
//             let box = document.createElement('div');
//             box.classList.add('box');
//             box.draggable = true
//             box.setAttribute('data-coordinate',`${i}${ind}`)
//             box.setAttribute('data-bg',`${bgc.num}`)
//             box.style.backgroundColor = bgc.color;
//             box.style.width = '57px';
//             box.style.height = '57px';
//             box.style.borderRadius = '5px';
            
//             cll.appendChild(box);
//             box.addEventListener('click', (ev) => {
//                 if(!ev.target.classList.contains('selected'))
//                   ev.target.classList.add('selected')
//             if(ev.target.classList.contains('variante'))
//                 changeCell(document.querySelector('.box.selected'), ev.currentTarget)
//             else{
//                 if( i > 0 )
//                     {
//                         table.value.querySelector(`.box[data-coordinate="${i-1}${ind}"]`).classList.add('variante')
//                     }
                    
                    
//                     if(i < table.value.children.length - 1)
//                     {
//                         table.value.querySelector(`.box[data-coordinate="${i+1}${ind}"]`).classList.add('variante')
//                     }
                    
                    
//                     if(ind < table.value.children[i].children.length - 1)
//                     {
//                         table.value.querySelector(`.box[data-coordinate="${i}${ind+1}"]`).classList.add('variante')
//                     }
                    
//                     if(ind > 0)
//                     {
//                         table.value.querySelector(`.box[data-coordinate="${i}${ind-1}"]`);
//                     }
//                 }
//                 // table.value.querySelector(`.box[data-coordinate="${i-1}${cllx-1}"]`).classList.add('variante')
//             })
//         }
//     })
// }
// // function DragEvent()
// // {
// //     evt.target.classList.add(`selected`);
// // }



function timer (motion, tick, result) {
  if (motion.value >= 0) {
    // game.time++;
    setTimeout(function () { timer(motion); }, 1000);
  } else {
    gameEnd();
    return;
  }
}

//конец игры
function gameEnd()
{   
    game_story.addGameRecord(game)
    console.log(game_story.games);
    Array.from(table.value.querySelectorAll('td')).forEach((el,i) =>{
            el.innerHTML = '';
        })
        document.querySelector('.started_tablo').classList.add('active')
        saveGame();
        game.time=0;
        game.score = 0;
        game.date = new Date().toISOString()
}
async function saveGame()
{
    // let str = await apolloClient
    // .mutate({mutate: gql(
    //     `mutation($id:string, $user_id: String, $time:INT,$score:INT){
    //             AddGameRecord(id: $id, user_id: $user_id, time: $time,record: $score){   
    //                 id
    //                 time
    //                 user_id
    //                 record
    //             }`,),
    //             variables: {
    //                 "id": game.game_id,
    //                 "user_id": 'andrey',
    //                 "record": game.score,
    //                 "time": game.time
    //             }
    //         },);

    console.log(game);
    
}
function dragEnd(){}

//смена местами клетки
function changeCell(select, variant)
{   
    [[select.dataset.bg , variant.dataset.bg] = [variant.dataset.bg, select.dataset.bg]];    
    [[select.style.backgroundColor,variant.style.backgroundColor] = [variant.style.backgroundColor,select.style.backgroundColor]];
    checked(variant.dataset.coordinate.split(''));
}
function checked(row_cell)
{
    let row = Number(row_cell[0]);
    let cell = Number(row_cell[1]);
    if(checkedVertical(row,cell).isStrike || checkedHorizont(row, cell).isStrike) 
    {
        game.score+= 100;
        motion.value--;
        console.log('boom');
        Array.from(table.value.querySelectorAll('tr .box')).forEach((el,i) =>{
            el.classList.remove('variante')
            el.classList.remove('selected')
        })
         
        // return strike
    };
}
function checkedVertical(row,cell)
{
    console.log(array_row[row+1].querySelector('td .box'));
    
    let strike = 0;
    let coll = row;
    let cells = [];
    strike++;
    // while(row <= array_row.length-1 && array_row[coll-1].querySelector('td .box').dataset.bg == table.value.querySelector('td .box.selected').dataset.bg)
    // {
    //         cells.push(array_row[coll-1].querySelector('td .box').dataset.coordinate)
    //         strike++;
    //         coll++;
    // }
    // coll = row
    // while(row >= 0  && array_row[coll-1].querySelector('td .box').dataset.bg == table.value.querySelector('td .box.selected').dataset.bg)
    // {
    //         strike++;
    //         coll--;
    // }
    // console.log();
    return {
        isStrike: strike > 0,
        unnecessary: cells //те, которые надо удалить
    }
}
function checkedHorizont(row, cell){
    let strike = 0;
    let coll = cell;
    let cells = [];

    return {
        isStrike: strike > 0,
        unnecessary: cells //те, которые надо удалить
    }
}
</script>

<style lang="scss" scoped>

.boosts__full{
    position: absolute;
    width: 100%;
    height: fit-content;
    border-radius: 5px;
    left: 0;
    right: 0;
    background-color: #010043;
}
.motion-content{
    color: #ff0000;
    font-weight: 800;
    font-size: 2em;
}
.field{
    position: relative;
    width: 95%;
    height: 557px;
    background-color: #c4c5a6;
    border-radius: 10px;
    padding: 5px;
    & .started_tablo{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 50% 0;
        display: none;
        background-color: #0000007b;
        &.active{display: block;}
    }
    & .field__motion-block{
        position: absolute;
        top: 10px;
        right: 10px;
    }
}

.table{
display: flex;
    flex-wrap: wrap;
    width: 100%;
    td{
        // padding: 40px;
        border-radius: 5px;
    }
}
th,
td{
    border: solid 1px #000;
}
.box{width: 90px; height: 90px;border-radius: 5px;}
.box.variante{
    background-color: #000;
}

.but{
    border-radius: 5px;
    padding: 5px;
    width: fit-content;
    font-weight: 600;
    color: #fff;
    border: 2px solid #fff;
    font-size: 2em;
    
}
.main__but{
    margin: 10px auto;
    padding: 10px 30px;
    border-radius: 10px;
    background-color: rgb(19, 236, 19);
}
.parametr__but{
    width: 20px;
    height: 20px;
}
.parametr__boosts{
    padding: 0;
    margin: 0;
    & select{
        margin: 0;
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 5px;
        -webkit-appearance: none;
        padding: 3px 5px;

    }
}
.main__parametrs{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.score-text{
    font-size: 3em;
    font-weight: 700;
    color: #ffea00;
    -webkit-text-stroke:1.5px #fff;
}

</style>