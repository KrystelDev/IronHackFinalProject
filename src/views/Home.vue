<template>
  <div class="wrapper">
    <Nav :username="username" class="notMobile" />
    <section>
      <Progreso
        :tasksCompleteLength="tasksCompleteLength"
        :tasksLength="tasksLength"
        :tasksProgreso="tasksProgreso"
        :avatar_url="avatar_url"
        :progresoConversor="progresoConversor"
      />
    </section>
    <main>
      <section class="addHome">
        <div v-if="showErrorMessage">
          <p class="error-text">{{ errorMessage }}</p>
        </div>
        <div v-if="showCorrectMessage">
          <p class="error-text">{{ correctMessage }}</p>
        </div>
      </section>
      <!-- Necesito dos v-swosh dentro del fondo puzzle que no se va a mover, lo de dentro si se cambia. van por separado, si se ve uno el otro no. -->
      <section class="tareas">
        <h2>Tus tareas pendientes:</h2>
        <div class="tasksPendiente">
          <div class="dentroPuzzle" v-show="!addNewTask">
            <button @click="changeIndex(-1)">&lt;</button>
            <TaskPendientes :taskPendienteActive="taskPendienteActive" />
            <button @click="changeIndex(1)">&gt;</button>
          </div>
          <div class="dentroPuzzle" v-show="addNewTask">
            <button @click="addTask" class="button">+</button>
            <div class="addNewTaskFatherInputs">
              <input type="text" placeholder="Título" v-model="name" />
              <input
                type="text"
                placeholder="Descripción..."
                v-model="description"
              />
            </div>
            <button @click="changeaddNewTask">x</button>
          </div>
        </div>
      </section>
      <section class="notMobile">
        <div>
          <h2>Consejos:</h2>
          {{ tasks }}
        </div>
      </section>
    </main>
    <div :class="classAddNewTask">
      <button @click="changeaddNewTask">+ Add Taks</button>
    </div>
    <Footer :username="username" class="onlyMobile positionBottom" />
  </div>
</template>

<script setup>
import Nav from "../components/Nav.vue";
import Footer from "../components/Footer.vue";
import TaskPendientes from "../components/TaskPendiente.vue";
import Progreso from "../components/Progreso.vue";
import { useTaskStore } from "../stores/task";
import { reactive, ref } from "vue";
import { useUserStore } from "../stores/user";

const taskStore = useTaskStore();
// Variable para guardar las tareas de supabase
const tasks = ref([]);
// Variables para poder visulaizar el progreso de las tascas:
const tasksLength = ref(0);
let tasksComplete = reactive([]);
let countComplete = 0;
let countIncomplete = 0;
const tasksCompleteLength = ref(0);
const tasksProgreso = ref(0);
const progresoConversor = ref(0);
let tasksInComplete = reactive([]);
const taskPendienteActive = ref({
  id: "",
  user_id: tasks.user_id,
  title: "No tienes tareas pendientes!",
  is_complete: false,
  inserted_at: "",
  description: "¿Cual será tu proximo paso?",
});

// Creamos una función que conecte a la store para conseguir las tareas de supabase y trabajar con ellas:

const getTasks = async () => {
  tasks.value = await taskStore.fetchTasks();
  tasksLength.value = tasks.value.length;
  countComplete = 0;
  countIncomplete = 0;
  tasks.value.forEach((task) => {
    if (task.is_complete == true) {
      tasksComplete[countComplete] = task;
      countComplete = countComplete + 1;
    } else {
      tasksInComplete[countIncomplete] = task;
      countIncomplete = countComplete + 1;
    }
    tasksCompleteLength.value = tasksComplete.length;
  });
  tasksProgreso.value = parseFloat(
    ((tasksCompleteLength.value / tasksLength.value) * 100).toFixed(2)
  );

  conversor();

  if (tasksInComplete.length != 0) {
    taskPendienteActive.value = tasksInComplete[i.value];
  }
};
getTasks();

// More info conversor -> https://stackoverflow.com/questions/70787435/convert-range-0-5-1-to-output-range-10-with-javascript

// rango antigo es el percentatge (de 0 a 100)
// rango destino es el stroke-dashoffset (de 450 a 0)
const conversor = () => {
  progresoConversor.value =
    450 + ((tasksProgreso.value - 0) * (0 - 450)) / (100 - 0);
};

// Moverte por las tareas pendientes:
// Variable indice para desplazamiento de visualización "Tus tareas pendietnes:"
let i = ref(0);

const changeIndex = (num) => {
  if (tasksInComplete.length != 0) {
    i.value += num;
    if (i.value >= tasksInComplete.length) {
      i.value = 0;
    }
    if (i.value == -1) {
      i.value = tasksInComplete.length - 1;
    }
    taskPendienteActive.value = tasksInComplete[i.value];
  }
};

// ADD TASK
// Arrow function para crear tareas.
// variables para los valors de los inputs
const name = ref("");
const description = ref("");
let addNewTask = ref(false);
const classAddNewTask = ref("addNewTask");

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const showErrorMessage = ref(false);
const showCorrectMessage = ref(false);

// const constant to save a variable that holds the value of the error message
const errorMessage = ref(null);
const correctMessage = ref(null);

const changeaddNewTask = () => {
  addNewTask.value = !addNewTask.value;
  classAddNewTask.value = addNewTask.value ? "notAddNewTask" : "addNewTask";
};

const addTask = async () => {
  if (name.value.length === 0 || description.value.length === 0) {
    // Primero comprobamos que ningún campo del input esté vacío y lanzamos el error con un timeout para informar al user.

    showErrorMessage.value = true;
    errorMessage.value = "The task title or description is empty";
  } else {
    // Aquí mandamos los valores a la store para crear la nueva Task.
    changeaddNewTask();
    await taskStore.addTask(name.value, description.value);
    name.value = "";
    description.value = "";

    showCorrectMessage.value = true;
    correctMessage.value = "Hemos registrado tu nueva tarea!";

    getTasks();
  }
  setTimeout(() => {
    showErrorMessage.value = false;
    showCorrectMessage.value = false;
  }, 3000);
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
/* TO DO */
/* Progress Circular, falta transición */
/* @keyframes anim {
    100% {
      stroke-dashoffset: progresoConversor;
    }
  } */
</style>
