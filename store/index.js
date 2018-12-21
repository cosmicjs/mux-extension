import Vuex from 'vuex'
import state from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const createStore = () => {
  return new Vuex.Store({
    state,
    actions,
    mutations,
    getters
  })
}

export default createStore