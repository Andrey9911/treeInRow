<template>
  <div class="best-bundle__block content">
        <div :data-type-action="props.data.type" class="bundle__action action-type">{{props.data.type}}</div>
        <div class="bundle__changer changer"><a :href="props.data.url">{{props.data.exchange}}</a></div>
        <slot></slot>
        
    </div>
</template>

<script setup>
import { defineProps, reactive } from 'vue';
let props = defineProps(['data']);

console.log(props.data);

</script>

<style lang="scss" scoped>
@import url('../style.css');
.best-bundle__block{
  width: 100%;
  padding: 5px;
  display: flex;
  height: 70px;
  .bundle__action{
    padding: 20px 0px;
    text-align: center;
    box-sizing: border-box;
    width: 70px;
    height: 100%;
    &[data-type-action='buy']{
      background-color: var(--rigth-bgc);
    }
    &[data-type-action='sale']{
      background-color: var(--negative-bgc);
    }
    &[data-type-action='change']{
      background-color: var(--yellow-bgc);
    }
  }
  
}

</style>