<template>
    <div class="history__content">
        <table class="history__table" >
            <thead>
                <tr>
                    <th>Best time</th>
                    <th>Record</th>
                </tr>
            </thead>
            
        </table>
    </div>
    
</template>

<script setup>
</script>

<style lang="scss" scoped>
.history__content{
    width: 95%;
    height: 500px;
    border-radius: 10px;
    background-color: #c4c5a6;
    padding: 10px;
    box-sizing: border-box;
}
table{
    border-radius: 10px;
    width: 100%;
    border-collapse:separate;
    thead{border: 1px solid black;}
    // tr{background-color: aliceblue;}
    color: #000;
}
</style>