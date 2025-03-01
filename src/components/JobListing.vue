<script setup>
import { ref, defineProps } from "vue";
import JobData from "../jobs.json";
import JobListingSingle from "./JobListingSingle.vue";
import { RouterLink } from "vue-router";

const jobs = ref(JobData);
defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    defualt: false,
  },
});
</script>

<template>
  <section class="bg-gray-50 px-4 py-10">
    <div class="container lg:container mx-auto">
      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
        Browse Jobs
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <JobListingSingle
          v-for="job in jobs.slice(0, limit || jobs.length)"
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
