import {createStore} from "vuex";
import axiosClient from "../axios";

const tmpSurveys = [
  {
    id: 100,
    title: "teste",
    slug: "teste",
    status: "draft",
    image: "https://pbs.twim.go/teste.png",
    description: "teste testerson teste",
    created_at: "2021-12-20 18:00:00",
    updated_at: "2021-12-20 18:00:00",
    expire_date: "2021-12-20 18:00:00",
    questions: [
      {
        id: 1,
        type: "select",
        question: "From wich country are you",
        description: null,
        data: {
          options: [
            { uuid: "", text: "USA"},
            { uuid: "", text: "Brasil"},
            { uuid: "", text: "Germany"},
            { uuid: "", text: "India"}
          ]
        }
      },
      {
        id: 2,
        type: "checkbox",
        question: "wich language do you like most",
        description: "teste teste",
        data: {
          options: [
            { uuid: "", text: "Javascript"},
            { uuid: "", text: "HTML"},
            { uuid: "", text: "PHP"},
          ]
        }
      },
      {
        id: 3,
        type: "radio",
        question: "wich laravel do you like most",
        description: "teste teste",
        data: {
          options: [
            { uuid: "", text: "laravel 5"},
            { uuid: "", text: "laravel 6"},
            { uuid: "", text: "laravel 7"},
          ]
        }
      },
      {
        id: 4,
        type: "radio",
        question: "wich laravel do you like most",
        description: "teste teste",
        data: {
          options: [
            { uuid: "", text: "laravel 5"},
            { uuid: "", text: "laravel 6"},
            { uuid: "", text: "laravel 7"},
          ]
        }
      },
      {
        id: 4,
        type: "radio",
        question: "wich laravel do you like most",
        description: "teste teste",
        data: {
          options: [
            { uuid: "", text: "laravel 5"},
            { uuid: "", text: "laravel 6"},
            { uuid: "", text: "laravel 7"},
          ]
        }
      },
      {
        id: 5,
        type: "text",
        question: "something here",
        description: "null",
        data: { }
      },
      {
        id: 6,
        type: "textarea",
        question: "something here",
        description: "lorem ipsum lor",
        data: { }
      }

    ]
  }
]

const store = createStore({
  state: {
    user: {
    data: {},
    token: sessionStorage.getItem('TOKEN')
    },
    surveys: [...tmpSurveys]
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
    }
  },
  mutations: {
    logout: (state) => {
    state.user.data = {};
    state.user.token = null;
    sessionStorage.removeItem('TOKEN');
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem('TOKEN', userData.token);
    }
  },
  modules: {},
});


export default store;
