import Vue from 'vue';
import app from './app.vue';
import './registerServiceWorker';
import router from './router/index';
import store from './store/index';
import './styles/main.scss';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';
import vClickOutside from 'v-click-outside';
import VueInitialsImg from 'vue-initials-img';
import moment from 'moment';
import 'animate.css'


Vue.prototype.moment = moment
Vue.use(moment)
Vue.use(vClickOutside)
Vue.use(ElementUI, { locale })
Vue.use(VueInitialsImg)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app');
