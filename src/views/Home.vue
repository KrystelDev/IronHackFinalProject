<template>
  <div class="wrapper">
    <Nav :username="username" />
    <main>
      <h2>Tu progreso:</h2>
      <Progreso
        :tasksCompleteLength="tasksCompleteLength"
        :tasksLength="tasksLength"
        :tasksProgreso="tasksProgreso"
        :avatar_url="avatar_url"
        :progresoConversor="progresoConversor"
      />
      <div>
        <TaskPendientes :tasks="tasks" />
      </div>
      <div>
        <h2>Consejos:</h2>
        {{ tasks }}
      </div>
    </main>

    <footer>
      <h2>FOOTER</h2>
    </footer>
  </div>
</template>

<script setup>
import Nav from "../components/Nav.vue";
import TaskPendientes from "../components/TaskPendientes.vue";
import Progreso from "../components/Progreso.vue";
import { useTaskStore } from "../stores/task";
import { reactive, ref } from "vue";
import { useUserStore } from "../stores/user";

const taskStore = useTaskStore();
// Variable para guardar las tareas de supabase
const tasks = ref([]);
const tasksLength = ref(0);
let tasksComplete = reactive([]);
let count = -1;
const tasksCompleteLength = ref(0);
const tasksProgreso = ref(0);
const progresoConversor = ref(0);

// Creamos una función que conecte a la store para conseguir las tareas de supabase y trabajar con ellas:
const getTasks = async () => {
  tasks.value = await taskStore.fetchTasks();
  tasksLength.value = tasks.value.length;
  tasksComplete = tasks.value.filter((task) => {
    if (task.is_complete == true) {
      count += 1;
      tasksComplete[count] = task;
    }
    tasksCompleteLength.value = tasksComplete.length;
  });
  tasksProgreso.value = (
    (tasksCompleteLength.value / tasksLength.value) *
    100
  ).toFixed(2);
  conversor();
};
getTasks();

// More info conversor -> https://stackoverflow.com/questions/70787435/convert-range-0-5-1-to-output-range-10-with-javascript

// rango antigo es el percentatge
// rango destino es de 0 a 450

// rango destino inicio + ()
const conversor = () => {
  progresoConversor.value =
    450 + ((tasksProgreso.value - 0) * (0 - 450)) / (100 - 0);
};

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

<style>
/* Progress Circular, falta transición */
/* @keyframes anim {
    100% {
      stroke-dashoffset: progresoConversor;
    }
  } */
</style>
