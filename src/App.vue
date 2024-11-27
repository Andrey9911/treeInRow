<script setup>
import profile from './components/profile.vue';
import game from './components/game.vue';
import history from './components/history.vue';
import {RouterLink, RouterView, useRoute, useRouter} from 'vue-router';
// import gql from 'graphql-tag'
import { useHistoryStore } from './js/store';
import { onMounted, reactive } from 'vue';
import { json } from 'express';


let historyStore = reactive(useHistoryStore())
const tg = window.Telegram.WebApp;
let user;
try {
    tg.disableVerticalSwipes();
    tg.CloudStorage.getItem('image').then((data, err) => {
      if(!data) {
        console.log(`[images true]`,data)
        historyStore.images.push(JSON.parse(data))
      }else {
        setInterval(() => {
          tg.CloudStorage.setItem('images',JSON.stringify(historyStore.images)).then((data, err) => {
            if(data && !err) {
              console.log(`[user images]`,data)
            console.log(JSON.parse(data))
            } else {
            console.log(`[user auth, but not user images]`,err)
            }
        },10000)})
      }
    })
    

    user = tg.initDataUnsafe
    tg.CloudStorage.getItem('user').then((data, err) => {
    if(data && !err) {
      console.log(`[user auth]`,data)
     console.log(JSON.parse(data))
    } else {
     console.log(`[user auth, but not reg]`,err)
     tg.CloudStorage.setItem('user', JSON.stringify(user))
    }
})
} catch (TypeError) {
    user = 'undefind'
    console.log('[user undefind]', user);
    
}
let statistic = reactive({
    balans: 0,
    picture_len: historyStore.games.length,
    user_id: user == 'undefined' ? 'undefind' : user.id
});



console.log(window);

// historyStore.saveUser(user)
const route = useRoute()
const router = useRouter()
function pushWithQuery(query) {
  router.push('/');
}
onMounted(() =>{
  router.push('/profile');
})

</script>

<template>
    <header>
        <div class="header__logo">Tree in ROW</div>
        <div class="header__setting">Setting</div>
    </header>
    <main>
      <Router-View  
                :user="user" 
                :statistic="statistic"/>
    </main>
    <footer>
      <Router-Link class="link" to="/history"><div class="but">history</div></Router-Link>
      <Router-Link class="link"  to="/"><div class="but">game</div></Router-Link>
      <Router-Link class="link"  to="/draw"><div class="but">draw</div></Router-Link>
      <Router-Link  class="link" to="/profile"> <div class="but">profile</div></Router-Link>
    </footer>
</template>

<style scoped>
header{display: flex;align-items: center;}
main{
  padding: 5px;
  width: 100%;
}
footer{
  padding: 10px 30px 20px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: #242424;
}

</style>
