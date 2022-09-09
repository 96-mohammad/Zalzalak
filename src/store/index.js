import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: [],
    foundArticle: null,
    user: false,
    profileInfo: null,
  },
  mutations: {
    GET_DATA(state, payload) {
      state.articles = payload
    },
    ELIMINITE_SEARCH_RESAULT(state) {
      state.foundArticle = null
    },
    CHANGE_ADMIN_STATE(state) {
      state.user = !state.user
    },
    PUT_PROFILE_INFO(state, payload) {
      state.profileInfo = payload
    },
    ELIMINITE_PROFILE_INFO(state) {
      state.profileInfo = null
    }
  },
  actions: {
    async fetchData({ commit }) {
      try {
        const response = await axios.get('http://localhost:1337/articles?_sort=created_at:DESC')

        commit("GET_DATA", response.data)
      }
      catch(err) {
        console.log(err)
      }
    },
    async searchArticle({ state }, payload) {
      try {
        const response = await axios.get(`http://localhost:1337/articles?title_contains=${payload}`)
                
        state.foundArticle = response.data
      }
      catch(err) {
        console.log(err)
      }
    },
    async signIn({ commit }, payload) {
      try {
        const response = await axios.post(`http://localhost:1337/auth/local`, {
          identifier: payload.email,
          password: payload.password
        });

        const {
          jwt,
          user
        } = response.data;

        localStorage.setItem('jwt', jwt);
        localStorage.setItem('user', user);

        commit("PUT_PROFILE_INFO", user);
        commit("CHANGE_ADMIN_STATE");
      }

      catch(error) {
        this.email = "";
        this.password = '';
        this.errorShow = true;
        this.errorMsg = 'رمزعبور یا ایمیل شما اشتباه است';
      }
    },
  },
  getters: {
    articles: state => state.articles,
    foundArticle: state => state.foundArticle,
    userState: state => state.user,
    profileInfo: state => state.profileInfo,
  }
})
