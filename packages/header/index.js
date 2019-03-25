import RtHeader from './src/main';

/* istanbul ignore next */
RtHeader.install = function(Vue) {
  Vue.component(RtHeader.name, RtHeader);
};

export default RtHeader;