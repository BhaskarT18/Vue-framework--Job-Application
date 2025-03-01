<script setup>
import { ref, onMounted } from "vue";

const name = ref("vishal");
const status = ref("active");
const tasks = ref(["task one", "task two", "task three"]);
const newTask = ref("");

const addTask = () => {
  if (newTask.value.trim() !== "") {
    tasks.value.push(newTask.value);
    newTask.value = "";
  }
};

const deleteTask = (index) => {
  tasks.value.splice(index, 1);
};

const handleToggle = () => {
  if (status.value === "active") {
    status.value = "pending";
  } else if (status.value === "pending") {
    status.value = "inactive";
  } else {
    status.value = "active";
  }
};

onMounted(async () => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await res.json();
    console.log(data);
    tasks.value = data.map((task) => {
      return task.title;
    });
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <h1>Vue Jobs</h1>

  <p>{{ name }}</p>

  <form @submit.prevent="addTask">
    <label for="newTask">add Task : </label>
    <input
      type="text"
      id="newTask"
      placeholder="enter new task"
      name="newTask"
      v-model="newTask"
    />
    <button type="submit">Submit</button>
  </form>

  <p>Task:</p>
  <ul>
    <li v-for="(task, index) in tasks" :key="task">
      <span>{{ task }} </span> <button @click="deleteTask(index)">X</button>
    </li>
  </ul>
  <p v-if="status === 'active'">User is active</p>
  <p v-else-if="status === 'pending'">User is Pending</p>
  <p v-else>User is inactive</p>
  <button @click="handleToggle">Toggle Button</button>
</template>
