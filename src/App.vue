<script setup>
import profile from './components/profile.vue';
import game from './components/game.vue';
import history from './components/history.vue';
import {RouterLink, RouterView, useRoute, useRouter} from 'vue-router';
// import gql from 'graphql-tag'
import { useHistoryStore } from './js/store';
import { onBeforeMount, onMounted, reactive } from 'vue';
import { messageShow } from './js/messageShow';


let historyStore = reactive(useHistoryStore())
const tg = window.Telegram.WebApp;
let user;
try {
    user = tg.initDataUnsafe
    tg.disableVerticalSwipes();
    try {
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
      tg.CloudStorage.getItem('user').then((data, err) => {
          if(data && !err) {
            console.log(`[user auth]`,data)
          console.log(JSON.parse(data))
          } else {
          console.log(`[user auth, but not reg]`,err)
          tg.CloudStorage.setItem('user', JSON.stringify(user))
          }
      })
      console.log('[user access added] ',user);
      
    } catch (error) {
      console.log('[storage not save]', error);
      
    }
} catch (TypeError) {
    user = 'undefind'
    console.log('[user undefind]', user);
    console.log(TypeError);
    
    
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
onBeforeMount(() => {
  if(!navigator.onLine){
     messageShow('error', 'not network connect');
     return;
  }
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
