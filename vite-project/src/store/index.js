import {createStore} from "vuex";
import axiosClient from "../axios";


const store = createStore({
  state: {
    user: {
    data: {},
    token: sessionStorage.getItem('TOKEN')
    },
    currentSurvey: {
      loading: false,
      data: {}
    },
    surveys: {
      loading: false,
      data: []
    },
    questionTypes: ['text', 'select', 'checkbox', 'radio', 'textarea']
  },
  getters: {},
  actions: {
    register({commit}, user){
      return axiosClient.post('/register', user)
      .then(({data}) => {
        commit('setUser', data)
        return data
      })

    },
    login({commit}, user){
      return axiosClient.post('/login', user)
      .then(({data}) => {
        commit('setUser', data)
        return data
      })
    },
    logout({commit}){
      return axiosClient.post('/logout')
      .then(response => {
        commit('logout')
        return response
      })
    },
    getSurvey({commit}, id){
      commit("setCurrentSurveyLoading", true);
      return axiosClient.get(`/surveys/${id}`)
      .then(response => {
        commit("setCurrentSurvey", response.data);
        commit("setCurrentSurveyLoading", false);
        return response
      })
      .catch( (err) => {
        commit("setCurrentSurveyLoading", false);
        throw err;
      } )
    },
    saveSurvey( {commit}, survey ){
      delete survey.image_url;
      let response;

      if(survey.id){
        response = axiosClient.put(`/surveys/${survey.id}`, survey)
        .then( (res) => {
          commit("setCurrentSurvey", res.data)
          return res
        } )
      } else {
        response = axiosClient.post('/surveys', survey)
        .then( res => {
            commit('setCurrentSurvey', res.data)
            return res
        } )
      }

      return response;
    },
    deleteSurvey({}, id){
      return axiosClient.delete(`/surveys/${id}`);
    },
    getSurveys({commit}){
      commit('setSurveysLoading', true);
      return axiosClient.get("/surveys")
      .then( (res) => {
        commit('setSurveysLoading', false);
        commit('setSurveys', res.data);
        return res
      })
    }
  },
  mutations: {
    setCurrentSurveyLoading:( state, loading ) => {
      state.currentSurvey.loading = loading;
    },
    setSurveysLoading: (state, loading) => {
      state.surveys.loading = loading;
    },
    setCurrentSurvey:( state , survey ) => {
      state.currentSurvey.data = survey.data;
    },
    setSurveys: (state, surveys) => {
      state.surveys.data = surveys.data;
    },
    logout: (state) => {
    state.user.data = {};
    state.user.token = null;
    sessionStorage.removeItem('TOKEN');
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem('TOKEN', userData.token);
    },

  },
  modules: {},
});


export default store;
