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
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 5px 5px;
    font-size: .7em;
}
</style>