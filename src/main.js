import Vue from "vue";
import App from "./App.vue";
import { Select, Option } from "element-ui";

Vue.use(Select);
Vue.use(Option);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
