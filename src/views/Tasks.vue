<template>
  <div class="wrapper">
    <Nav :username="username" class="notMobile" />

    <NewTask @getTasks="getTasks" />
    <h1>Tasks:</h1>
    <div class="tasksItem tasksItemTask">
      <TaskItem
        @deleteTask="deleteTask"
        @changeComplete="changeComplete"
        @changeTask="changeTask"
        v-for="task in tasks"
        :key="task.id"
        :task="task"
      />
    </div>

    <Footer :username="username" class="onlyMobile positionBottom" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";
import { useUserStore } from "../stores/user";
import Nav from "../components/Nav.vue";
import Footer from "../components/Footer.vue";
import NewTask from "../components/NewTask.vue";
import TaskItem from "../components/TaskItem.vue";

const taskStore = useTaskStore();

// Variable para guardar las tareas de supabase
const tasks = ref([]);

// Creamos una función que conecte a la store para conseguir las tareas de supabase
const getTasks = async () => {
  tasks.value = await taskStore.fetchTasks();
};
getTasks();

const deleteTask = async () => {
  tasks.value = await taskStore.fetchTasks();
};
deleteTask();

const changeComplete = async () => {
  tasks.value = await taskStore.fetchTasks();
};
changeComplete();

const changeTask = async () => {
  tasks.value = await taskStore.fetchTasks();
};
changeTask();

// ******** Conseguir nombre real del usuario:
const userStore = useUserStore();

// Variable para guardar el perfil de supabase
const profile = ref({
  avatar_url: "",
  created_at: "",
  name: "",
  user_id: "",
  username: "",
  website: "",
});
const username = ref(null);
const avatar_url = ref(null);
// const user_id = ref(null);

// PREFILE
const getProfile = async () => {
  // Hago una llamada para que no vaya más rapido que el primer fetchUser de App.vue
  await userStore.fetchUser();
  // Guardo el perfil en una constante:
  profile.value = userStore.profile;

  // Cuando se registra un user no tiene nombre.
  //Si ya ha editado el nombre vacio:
  if (profile.value.username) {
    username.value = profile.value.username;
  } else {
    // Si aun no ha registrado un nombre:
    const getUser = useUserStore().user;
    const getUserEmail = getUser.email;
    const indexArroba = getUser.email.indexOf("@", 1);
    username.value = getUserEmail.slice(0, indexArroba);
  }
  avatar_url.value = profile.value.avatar_url;
  // user_id.value = profile.value.user_id;
};
getProfile();
</script>

<style></style>
