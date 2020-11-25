import Vue from 'vue';
import app from './app.vue';
import './registerServiceWorker';
import router from './router/index';
import store from './store/index';
import './styles/main.scss';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app');
