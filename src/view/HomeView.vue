<script setup>

import HeroSection from '../components/HeroSection.vue'
import HomeCards from '../components/HomeCards.vue'
import JobListing from '../components/JobListing.vue'
</script>


<template>

<HeroSection/> <!-- title="Test title props" subTitle="Test subtitle props" //to dynamic title and subtitles from component-->
<HomeCards/>
<JobListing :limit="3" :showButton="true" />

</template>