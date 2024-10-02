<template>
    
    <div class="main__parametrs"></div>
    <div class="field">
        <table ref="table">
            <tr>
                <td><div class="box"></div></td>
                <td><div class="box"></div></td>
                <td><div class="box"></div></td>
                <td><div class="box"></div></td>
            </tr>
            <tr>
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
            </tr>
            <tr>
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
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </table>
    </div>
    <div class="main__boosts boosts">
        <boost>
            
        </boost>
    </div>
    <div class="but play" @click="startGame">play</div>
</template>

<script setup>
import boost from './boost.vue';
import {start} from '../js/logic.mjs';
import {onMounted, ref} from 'vue';

let table = ref(null);

onMounted(() => {
    console.log(table.value);
})
function startGame()
{
    console.log(table.children);
    for(rw of table.children)
    {
        console.log(rw);
        
        // for(cll of table.children[ind])
        // {
        //     console.log(cll);
            
        // }
    }
}

</script>

<style lang="scss" scoped>
.field{
    width: 95%;
    height: 500px;
    background-color: #c4c5a6;
    border-radius: 10px;
    padding: 5px;
}
table{
    width: 100%;
    td{
        // padding: 40px;
        border-radius: 5px;
    }
}
th,
td{border: solid 1px #000;}
.box{background-color: aqua;width: 90px; height: 90px;border-radius: 5px;}

.but{
    margin: 10px auto;
    width: fit-content;
    padding: 10px 30px;
    background-color: rgb(19, 236, 19);
    font-weight: 600;
    color: #fff;
    border: 2px solid #fff;
    font-size: 2em;
    border-radius: 10px;
}
</style>