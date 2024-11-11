import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '../src/js/router'
// import VueApollo from 'vue-apollo'
import { createPinia } from 'pinia'
import { apolloClient } from './js/graph'

import {
  createTonConnectUIProvider,
  TonConnectUIContext,
  TonConnectUIOptionsContext,
} from "ton-ui-vue";
const { tonConnectUI, setOptions } = createTonConnectUIProvider({
  manifestUrl:
    "https://gist.githubusercontent.com/siandreev/75f1a2ccf2f3b4e2771f6089aeb06d7f/raw/d4986344010ec7a2d1cc8a2a9baa57de37aaccb8/gistfile1.txt",
});

const pinia = createPinia()


createApp(App)
  .provide(apolloClient)
  .provide(TonConnectUIContext, tonConnectUI)
  .provide(TonConnectUIOptionsContext, setOptions)
  .use(router)
  .use(pinia)
  .mount('#app')
