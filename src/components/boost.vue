<template>
    <div class="boost">
        <slot></slot>
    </div>
  <slot></slot>
</template>

<script setup>
import {onMounted} from 'vue';
</script>

<style lang="scss" scoped>
.boost{
    width: 50px;
    height: 50px;
    box-sizing: border-box;
    border-radius: 50%;
    padding: 5px 5px;
    border: 1px solid #fff;
}
</style>