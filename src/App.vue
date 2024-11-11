<script setup>
import profile from './components/profile.vue';
import game from './components/game.vue';
import history from './components/history.vue';
import {RouterLink, RouterView, useRoute, useRouter} from 'vue-router';
// import gql from 'graphql-tag'
import { useHistoryStore } from './js/store';
import { reactive } from 'vue';


let historyStore = reactive(useHistoryStore())

console.log(window);

// historyStore.saveUser(user)
const route = useRoute()
function pushWithQuery(query) {
  router.push({
    name: 'search',
    query: {
      ...route.query,
      ...query,
    },
  })
}

</script>

<template>
    <header>
        <div class="header__logo">Tree in ROW</div>
        <div class="header__setting">Setting</div>
    </header>
    <main>
      <Router-View :dataMiniApp="historyStore"/>
    </main>
    <footer>
      <Router-Link to="/history"><div class="but">history</div></Router-Link>
      <Router-Link to="/"><div class="but">game</div></Router-Link>
      <Router-Link to="/draw"><div class="but">draw</div></Router-Link>
      <Router-Link to="/profile"> <div class="but">profile</div></Router-Link>
    </footer>
  <main></main>
  <footer></footer>
</template>

<style scoped>
header{display: flex;align-items: center;}
main{
  width: 100%;
}
footer{
  padding: 0 30px 20px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
