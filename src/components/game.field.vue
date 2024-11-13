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
                        @change="(e) => canvas_parametrs.sizepicker = e.target.value" 
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
                :backgroundImage="canvas_parametrs.background_image"/>

        </div>
        <div class="option">
            <div class="but option__but save" @click="saveImage">save</div>
            <div class="but option__but share">share</div>
        </div>
  
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import VueDrawingCanvas from "vue-drawing-canvas";
import { useHistoryStore } from '../js/store';

let VueCanvas = ref()
onMounted(() => {
    console.log(VueCanvas.value);
    
})

let img = ref();
let history = useHistoryStore()

let colorpicker = ref('');
let sizepicker = ref(5)
console.log(colorpicker);
let canvas_parametrs = reactive({
    colorpicker: '',
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
    // VueCanvas.value.setContext('2d');
    var dataURL = VueCanvas.value.save();
    let image ={
        img: dataURL,
            metadata: {
              user: 'andrey',
              date_create: new Date().toISOString(),
            }
    }
    history.addImage(image)
    console.log(image);
    
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

    .option__but{margin: 10px; font-size: 2em;}
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

</style>