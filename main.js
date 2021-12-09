import App from './App'

// #ifndef VUE3
import Vue from 'vue'

//引入socket
import io from 'components/socket/weapp.socket.io.js'

Vue.config.productionTip = false
Vue.prototype.serverUrl = 'http://localhost:3000'
Vue.prototype.socket =io('http://localhost:8082') 



App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif