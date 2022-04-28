import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/styles/fonts.scss";
import "@/styles/fonts/iconfont.js";
import "@/styles/fonts/iconfont.css";
import "font-awesome/css/font-awesome.css";
import { ElSlider, ElAvatar } from "element-plus";
import "md-editor-v3/lib/style.css";
import "highlight.js/scss/atom-one-dark.scss";
import "element-plus/dist/index.css";
import "lib-flexible";
import lazyPlugin from "vue3-lazy";
import "@/styles/base.css";
import "@/utils/index";
import Aos from "aos";
import "../mock";
import VueContextMenu from "vue-contextmenu";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(Aos);
app.use(VueContextMenu);
app.use(ElSlider);
app.use(ElAvatar);
app.use(lazyPlugin, {
  loading: require("@/assets/load.gif"),
  error: require("@/assets/load.gif")
});
app.mount("#app");
