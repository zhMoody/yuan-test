import Alert from "./index.vue";
import { h, render } from "vue";

function alerts() {
  const vNode = h(Alert);
  const container = document.createComment("div");
  document.body.appendChild(container);
  render(vNode, container);
}

export { alerts };
