import Row from './row';
import Col from './col';

/* istanbul ignore next */

export default {
  install: function(Vue) {
    Vue.component(Row.name, Row);
    Vue.component(Col.name, Col);
  }
}
