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
            { uuid: "f1c2c056-5d32-4219-915f-596ebc6f8197", text: "USA"},
            { uuid: "ec8d1a93-6070-4a2e-b2e2-1b9333d5e309", text: "Brasil"},
            { uuid: "d27f8a94-51e9-42d9-b480-09da2dbcc411", text: "Germany"},
            { uuid: "b824f2cb-cb6d-4f49-bc1b-9b2d23d9b930", text: "India"}
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
            { uuid: "91d63bd4-b5e9-4e6c-8a3d-70cb0a83b056", text: "Javascript"},
            { uuid: "1a7ed6a0-cc92-4d8b-bc1c-2edfc19e6e24", text: "HTML"},
            { uuid: "8e22d880-075e-4aaf-8f7b-1f6237d207fc", text: "PHP"},
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
            { uuid: "3d7ec0f7-16aa-4f47-bf4a-38c9cde8f1c3", text: "laravel 5"},
            { uuid: "ee8fcb31-6962-4eac-bef8-2c1938ad45cd", text: "laravel 6"},
            { uuid: "d041ac1f-75a2-4c4d-b083-0d18be7a8653", text: "laravel 7"},
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
            { uuid: "786b09b4-b3dd-4ef1-b3e5-7a98e0c0500a", text: "laravel 5"},
            { uuid: "a4e0990b-8a85-4f8e-961b-481f6710ff97", text: "laravel 6"},
            { uuid: "7d7da5b2-4802-496e-bc66-31a1b621e2c5", text: "laravel 7"},
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
            { uuid: "731de6c5-4e91-490f-bb3b-d65d2b52d6e2", text: "laravel 5"},
            { uuid: "c8167a19-9615-4f6c-96fb-8882c47a8582", text: "laravel 6"},
            { uuid: "22cc0a5b-5228-42ab-99e4-07ee5ef22ea6", text: "laravel 7"},
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
    surveys: [...tmpSurveys],
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
    saveSurvey( {commit}, survey ){
      let response;

      if(survey.id){
        response = axiosClient.put(`/survey/${survey.id}`, survey)
        .then( (res) => {
          commit("updateSurvey", res.data)
        } )
      } else {
        response = axiosClient.post('/survey', survey)
        .then( res => {
            commit('saveSurvey', res.data)
            return res
        } )
      }

      return response;
    }
  },
  mutations: {
    saveSurvey:(state, survey) => {

      state.surveys = [...state.surveys, survey.data];
    },
    updateSurvey:(state, survey) => {
      state.surveys = state.surveys.map( (s) => {
        if( s.id == survey.data.id){
          return survey.data;
        }
        return s;
      } );
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
    }
  },
  modules: {},
});


export default store;
