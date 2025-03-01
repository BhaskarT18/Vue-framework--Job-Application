<script setup>
import { ref, defineProps, onMounted, reactive } from "vue";
import JobListingSingle from "./JobListingSingle.vue";
import { RouterLink } from "vue-router";
import axios from "axios";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

const state= reactive({
  jobs:[],
  isLoading: true,

})

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:5000/jobs");
    state.jobs = response.data;
  } catch (error) {
    console.error("error fetching jobs", error);
  }finally{
    state.isLoading=false;
  }
});

defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <section class="bg-gray-50 px-4 py-10">
    <div class="container lg:container mx-auto">
      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
        Browse Jobs
      </h2>
      <!-- Loader when loader is true  -->
       <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
        <PulseLoader/>
       </div>
       <!-- show jobs when loading is done  -->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <JobListingSingle
          v-for="job in state.jobs.slice(0, limit || state.jobs.length)"
          :key="job.id"
          :job="job"
        />
      </div>
    </div>
  </section>

  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <RouterLink
      to="/jobs"
      class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
      >View All Jobs</RouterLink
    >
  </section>
</template>
