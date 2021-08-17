// import api from '../../api/BackEnd';
// import {router} from '../../main';

const state = {
  isMobile: true
}

const getters = {
  isMobile: state => state.isMobile
}

const actions = {
  setIsMobile ({commit},value) {
    commit('setIsMobile',value)
  }
}

const mutations = {
  setIsMobile (value) {
    state.isMobile = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
