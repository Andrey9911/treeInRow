<template>
        <div class="drawingBoard">
            <div class="options">
              <div class="reset__but but" @click="resetCanvas">
                
              </div>
                <div class="background but">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                    <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z"/>
                </svg>
                <div class="back__file-inp">
                    <input accept="image/png" type="file" name="" id="file" @input="changeImageBg">
                </div>  
            </div>
        </div>
            <nav>
                <!-- <label for="color"> </label> -->
                <input type="color" @change="(e) => canvas_parametrs.colorpicker = e.target.value" 
                    class="nav__par color-input" id="colorpicker">
                <div class="eraser">
                    <input  type="checkbox" class="nav__par Eraser" 
                        @input="(e) => canvas_parametrs.isEraser = e.target.checked"
                        :checked="canvas_parametrs.isEraser" 
                         name="eraser" id="eraser"> 
                        <label for="eraser">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-eraser-fill" viewBox="0 0 16 16">
                                <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z"/>
                            </svg>
                        </label>   
                    
                </div>
                

                <!-- <label for="sizepicker"> BRUSH SIZE </label> -->
                <div class="size_range">
                    <input type="range" class="nav__par" min="1" max="20" 
                        @input="(e) => canvas_parametrs.sizepicker = e.target.value" 
                        :value="canvas_parametrs.sizepicker" > 
                    <div class="demo-size nav__par" 
                        :style="
                        {'width':canvas_parametrs.sizepicker+'px',
                         'height':canvas_parametrs.sizepicker+'px',
                          'border-radius': 50+'%',
                          'background-color':'#fff',
                          'margin':30+'px'+'auto'
                          }"></div>  
                </div>
                
            </nav>
            <vue-drawing-canvas ref="VueCanvas" 
                class="canvas"
                :color="canvas_parametrs.colorpicker"
                strokeType="dash"
                :lineWidth="canvas_parametrs.sizepicker"
                :width="canvas_parametrs.width"
                :height="canvas_parametrs.height"
                :eraser="canvas_parametrs.isEraser"
                :backgroundImage="canvas_parametrs.background_image"
                @startDraw="draww"/>

        </div>
        <div class="option">
            <div class="but option__but save" @click="saveImage">save</div>
            <div class="but option__but download" @click="saveImage"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                    </svg>
            </div>
            <div class="but option__but share" @click="shareImage">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
                <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"/>
                </svg>
            </div>
        </div>

        <div class="actions">
            <div style="font-size:1.5em; font-weight:600">Actions</div>
            <div class="actions__content">
                <ul>
                    <li v-for="a in actions_array" :key="a.id"><div class="action">
                        <div class="action__coordinate" style="display:flex;">
                            <span style="font-weight:bold; font-size:1.2em;">from: </span>
                                {{a.from.x.toFixed(0)}}, {{ a.from.y.toFixed(0)}}
                        </div>
                        <div class="action__data">
                            <div class="data__color" style="width:40px;height:40px; margin:10px; border-radius:7px" :style="{backgroundColor: a.color}"></div>
                        </div>
                        <div class="action__actions">
                            <div class="method_metka" @click="() => {clickMetka(a)}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-down-right-circle" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.854 5.146a.5.5 0 1 0-.708.708L9.243 9.95H6.475a.5.5 0 1 0 0 1h3.975a.5.5 0 0 0 .5-.5V6.475a.5.5 0 1 0-1 0v2.768z"/>
                                </svg>
                            </div>
                        </div>

                    </div></li>
                </ul>  
            </div>
            
        </div>
  
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import VueDrawingCanvas from "vue-drawing-canvas";
import { useHistoryStore } from '../js/store';
import {messageShow} from '../js/messageShow';


let props = defineProps(['user','statistic']);
let statistic = props.statistic;
let actions_array = ref();
let VueCanvas = ref()
onMounted(() => {
    console.log(VueCanvas.value);
    actions_array.value = VueCanvas.value.getAllStrokes()
    console.log(actions_array.value);
    

})


let img = ref();
let history = useHistoryStore()

let colorpicker = ref('');
let sizepicker = ref(5)
console.log(colorpicker);
let canvas_parametrs = reactive({
    colorpicker: '000',
    sizepicker: 5,
    width: 400,
    height:500,
    isEraser: false,
    background_image: ''
})
watch(canvas_parametrs.isEraser, (val) => {
    console.log(val);
    
})
function resetCanvas()
{
    VueCanvas.value.reset();   
    document.querySelector('.drawingBoard')
        .querySelector('.metka').remove()
}
function changeImageBg(e)
{
    let reader = new FileReader();
    // file.onload(e);
    let file = e.target.files[0]
    // reader.readAsText(file);
    reader.readAsDataURL(file);  
     
    reader.onload = function() {
        console.log(reader.result);
        canvas_parametrs.background_image = reader.result
        
    };
    
    reader.onerror = function() {
        console.log(reader.error);
    };
}

function saveImage(){
    console.log('statistic ', statistic);
    messageShow('succes', 'картинка сохранена')
    
    // VueCanvas.value.setContext('2d');
    var dataURL = VueCanvas.value.save();
    let image ={
        img: dataURL,
            metadata: {
              user: statistic.user_id === undefined ? 'unknow': statistic.user_id,
              date_create: new Date().toISOString(),
            }
    }
    history.addImage(image)
    console.log(image);
    
}
function shareImage(e){
    try {
        console.log('[telegram. shareLink]: ');
        
        Telegram.WebApp.shareApp();
    } catch (error) {
        messageShow('error', 'вы зашли через браузер')
    }
    console.log(VueCanvas.value.getAllStrokes());
    
}
function draww(e){
    console.log(e);
    
}

function clickMetka(x)
{
    console.log(x.from.x.toFixed(2));
    let metka = document.createElement('div')
    metka.className = 'circle metka'
    metka.style.top = ''+x.from.y + 'px'
    metka.style.left = ''+x.from.x + 'px'
    console.log(metka.style.backgroundColor);
    document.querySelector('.drawingBoard')
    .append(metka)
    
}

</script>

<style lang="scss" scoped>

.drawingBoard{
    position: relative;
    .options{
    position: absolute;
    top: 20px;
    left: 20px;
    display: flex;

    .back__file-inp{
        position: relative;
        display: inline-block;
        top: -20px;
        width: 100%;
        padding: 10px 12px;
        input[type='file']{
            position: absolute;
            height: 40px;
            opacity: 0;
            top: -10px;
            left: -10px;
            width: 100%;
        }  
    }
    .but{
        width: 40px;
        height: 40px;
        margin: 0 5px;
        padding: 10px;
        box-sizing: border-box;
    }
    
    }
    .nav__par{
        display: block;
        margin: 10px auto;
        &[type='range']{
            margin: 80px -50px;
        }
    }
}
.eraser{
    margin: 20px 0;
            position: relative;
            width: 100%;
            input{
                position: absolute;
                width: 100%;
                opacity: 0;
                &:checked+label{color: #0862bc;}
            }
        }
nav{
    position: absolute;
    top: 100px;
    right: 5px;
    max-width: 50px;
    padding: 10px 5px;
    background-color: #00000033;
    border: .5px solid #ffffff68;
    border-radius: 10px;
    display: block;

        input[type='range'] {
        -webkit-appearance: none !important;
        appearance: none;
        background:#ffffff74;
        height:10px;
        border-radius: 10px;
        transform: rotate(270deg);
        margin-block: 0 -100px;
        
    }
    input[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none !important;
        background:rgb(255, 255, 255);
        height:30px;
        width:30px;
        border-radius: 50%;
}
}
.option{
    display: flex;
    justify-content: space-around;

    .option__but{
        margin: 10px; font-size: 2em; padding: 0 15px; box-sizing: border-box;
        &.save{width: 60%; text-align: center;font-weight: 600;background-color: #00d704;}
    }
}
.but{
    background-color: #7777777c;
    border-radius: 7px;
    width: fit-content;
    padding: 5px 10px;
}
.color-input{
    width: 30px;
    height: 30px;
    border-radius: 5px;
    border: none;
}
.canvas{
    border-radius: 10px;
}
.actions{
    margin: 5px;
    padding: 10px;
    .actions__content{
        height: 500px;
        overflow-y: scroll;
        background-color: #00000033;
        // padding: 10px;
    }
    ul{
        margin: 0;
        padding: 0;
        li{list-style: none;width: 100%;}
        .action{
            display: flex;
            align-items: center;
            background-color: #00000033;
            border-radius: 10px;
            padding: 10px 10px;
            margin: 10px;
        }
        
    }
}
</style>