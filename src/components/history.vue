<template>
    <div class="history__content">
        <table class="history__table" >
            <thead>
                <tr>
                    <th>id</th>
                    <th>Record</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="g in history" :key="g.id">
                        <td>
                            <img class="image" :src="g.img" alt=""></td>
                        <td>
                            <div class="metadata-content">
                                <div class="mt mt_content">{{ g.metadata.user }}</div>
                                <div class="mt mt_date">{{ g.metadata.date_create }}</div>
                            </div>
                        </td>
                        <!-- <td>{{g.score}}</td> -->
                    </tr>
                </tbody>
                
            
            
        </table>
    </div>
    
</template>

<script setup>
import { gql } from '@apollo/client/core';
import {apolloClient} from '../js/graph.js';
import {defineProps, onMounted} from 'vue';
import { useHistoryStore } from '../js/store';

let id = 1

let history = useHistoryStore().images;
console.log(history);

// apolloClient.query({query: gql(`
// query GetAllGame{
//         RecordWorld{
//                 id
//                 time
//                 user_id
//                 record
//             }
            
//         }
// `),variables: {"id":'a1'}})
// .then(rez => {console.log(rez)});
    
// console.log(apolloClient.query(gql('query{HistoryGamesByUser(id:ID){GameStory(id:1){time, record }}}',[])
// ));

// onMounted(() => {
//     apolloClient
//     .mutate(gql(`mutation($time:${game.time}, $record: ${game.record},data: ${game.data}){createHistoryPost(field: $data){$time $record}}`));
//     apolloClient
//     // .mutate(gql(`mutation($userID: ${user.id}}){createHistoryPost(field: $data){$time $record}}`));
// })

</script>

<style lang="scss" scoped>
.history__content{
    overflow-y: scroll;
    width: 95%;
    height: 500px;
    border-radius: 10px;
    background-color: #c4c5a6;
    padding: 10px;
    box-sizing: border-box;
    &::-webkit-scrollbar{width: 10px;height: 10px;}
    &::-webkit-scrollbar-thumb{background-color: #00000030;border-radius: 20px;width: 10px;}
}
table{
    border-radius: 10px;
    width: 100%;
    border-collapse:separate;
    thead{color: #000;}
    tbody{
        text-align: center;
        font-size: 1.3em;font-weight: 700;
        color: darkblue;
    }
    // tr{background-color: aliceblue;}
.image{
    width: 200px;
    height: 100px;
    border-radius: 10px;
}

}
.mt{
    &.mt_content{

    }
    &.mt_date{
        background-color: #00000030;
        border-radius: 20px;
        padding: 5px 10px;
        color: #fff;
        font-size: .7em;
        font-weight: 300;
    }
}
</style>