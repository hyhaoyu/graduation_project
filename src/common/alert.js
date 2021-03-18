import Alert from "@/components/alert/Alert";
import Vue from "vue";

let AlertConstructor = Vue.extend(Alert);
let instance;
let instances = [];
let seed = 1;
const alert = {};
alert.close = function (id) {
  for (let i = 0, len = instances.length; i < len; i++) {
    if (id === instances[i].id) {
      instances.splice(i, 1);
      break;
    }
  }
};
['success', 'warning', 'info', 'danger'].forEach(type => {
  alert[type] = message => {
    let id = 'message_' + seed++;
    let onClose = function () {
      alert.close(id);
    };
    instance = new AlertConstructor({
      data: {
        message,
        type,
        onClose
      }
    });
    instance.id = id;
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
    instance.vm.visible = true;
    instance.dom = instance.vm.$el;
    instance.dom.style.zIndex = '999';
    instances.push(instance);
    return instance.vm;
  };
});

export default alert;