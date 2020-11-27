import Vue from 'vue';
import app from './app.vue';
import './registerServiceWorker';
import router from './router/index';
import store from './store/index';
import './styles/main.scss';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';
import VueInitialsImg from 'vue-initials-img';

Vue.use(ElementUI, { locale })
Vue.use(VueInitialsImg)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app');
