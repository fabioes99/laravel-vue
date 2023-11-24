
<template>
  <PageComponent title="Dashboard">
    <div v-if="loading" class="flex justify-center">Loading...</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700">
      <div style="animation-delay: 0.1s" class="animate-fade-in-down bg-white shadow-md p-3 text-center flex flex-col order-1 lg:order-2">
        <h3 class="text-2xl font-semibold">Totla Surveys</h3>
        <div class="text-8xl font-semibold flex-1 flex items-center justify-center">
           {{ data.totalSurveys }}
        </div>
      </div>
      <div style="animation-delay: 0.2s" class="animate-fade-in-down bg-white shadow-md p-3 text-center flex flex-col order-2 lg:order-4">
        <h3 class="text-2xl font-semibold">Total Answers</h3>
        <div class="text-8xl font-semibold flex-1 flex items-center justify-center">
          {{ data.totalAnswers }}
       </div>
      </div>
      <div class="animate-fade-in-down bg-white shadow-md p-4 row-span-2 order-3 lg:order-1">
        <h3 class="text-2xl font-semibold">Latest Survey</h3>
        <img :src="data.latestSurvey.image_url" class="w-[240px] mx-auto my-2" alt=""/>
        <h3 class="text-xl font-bold mb-3">{{ data.latestSurvey.title }}</h3>
        <div class="flex justify-between text-sm mb-2">
          <div>Create Date:</div>
          <div>{{ data.latestSurvey.created_at }}</div>
        </div>
        <div class="flex justify-between text-sm mb-2">
          <div>Expire Date:</div>
          <div>{{ data.latestSurvey.expire_date }}</div>
        </div>
        <div class="flex justify-between text-sm mb-2">
          <div>Status:</div>
          <div>{{ data.latestSurvey.status ? 'Active' : 'Draft' }}</div>
        </div>
        <div class="flex justify-between text-sm mb-2">
          <div>Questions:</div>
          <div>{{ data.latestSurvey.questions }}</div>
        </div>
        <div class="flex justify-between text-sm mb-2">
          <div>Answers:</div>
          <div>{{ data.latestSurvey.answers }}</div>
        </div>
        <div class="flex justify-between">
          <router-link
            :to="{name: 'SurveyView', params: {id: data.latestSurvey.id}}"
            class="flex py-2 px-4 border border-transparent text-sm rounded-md text-indigo-500 focus:ring-indigo-500 focus:ring-2 focus:ring-offset-2 hover:bg-indigo-500 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
            Edit Survey
          </router-link>
          <button
          class="flex py-2 px-4 border border-transparent text-sm rounded-md text-indigo-500 hover:bg-indigo-700 hover:text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path
              fill-rule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clip-rule="evenodd"
            />
          </svg>
          View Answers
        </button>
        </div>
      </div>
      <div style="animation-delay: 0.3s" class="animate-fade-in-down bg-white shadow-md p-3 row-span-2 order-4 lg:order-3">
        <div class="flex justify-between items-center mb-3 px-2">
          <h3 class="text-2xl font-semibold">Latest Answers</h3>

          <a
            href="javascript:void(0)"
            class="text-sm text-blue-500 hover:decoration-blue-500"
          >
            View all
          </a>
        </div>
        <a
          href="#"
          v-for="answer of data.latestAnswers"
          :key="answer.id"
          class="block p-2 hover:bg-gray-100/90"
        >
        <div class="font-semibold"> {{ answer.survey.title }} </div>
        <small>
          Answer Made at:
          <i class="font-semibold"> {{ answer.end_date }} </i>
        </small>

        </a>
      </div>
    </div>
  </PageComponent>
</template>

<script setup>
import PageComponent from '../components/PageComponent.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();

const loading = computed( () => store.state.dashboard.loading );
const data = computed( () => store.state.dashboard.data );

store.dispatch('getDashboardData');

</script>
