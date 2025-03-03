import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../view/HomeView.vue";
import JobsView from "../view/JobsView.vue";
import NotFoundJob from "../view/NotFoundJob.vue";
import JobView from "../view/JobView.vue";
import AddJobView from "../view/AddJobView.vue";
import EditJobView from "../view/EditJobView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.Base_url),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/jobs",
      name: "jobs",
      component: JobsView,
    },
    {
      path: "/jobs/:id",
      name: "job",
      component: JobView,
    },
    {
      path: "/jobs/add",
      name: "job-add",
      component: AddJobView,
    },

    {
      path: "/jobs/edit/:id",
      name: "edit-job",
      component: EditJobView,
    },

    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundJob,
    },
  ],
});

export default router;
