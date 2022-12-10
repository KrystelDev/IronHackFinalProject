<template>
  <div class="wrapper">
    <Nav :username="username" />

    <main>
      <div id="progressBar">
        <div class="container">
          <progress
            class="progress is-primary"
            :value="tasksCompleteLength"
            :max="tasksLength"
          ></progress>
          {{ tasksProgreso }}% completado
        </div>
      </div>
      <div class="padre">
        <div class="skill">
          <div class="outer">
            <div class="inner">
              <div id="number">{{ tasksProgreso }}%</div>
            </div>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="160px"
            height="160px"
          >
            <defs>
              <linearGradient id="GradientColor">
                <stop offset="0%" stop-color="#DA22FF" />
                <stop offset="100%" stop-color="#9733EE" />
              </linearGradient>
            </defs>
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke-linecap="round"
              :stroke-dashoffset="progresoConversor"
            />
          </svg>
        </div>
      </div>
      <div>
        {{ tasks }}
      </div>
    </main>

    <footer></footer>
  </div>
</template>

<script setup>
import Nav from "../components/Nav.vue";
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
      //Vue2.set(tasksIncomplete, count, task);
      console.log(task.is_complete);
      console.log(task);
      console.log(tasksComplete);
    }
    tasksCompleteLength.value = tasksComplete.length;
  });
  tasksProgreso.value = (
    (tasksCompleteLength.value / tasksLength.value) *
    100
  ).toFixed(2);
  console.log(tasksLength.value);
  console.log(tasksCompleteLength.value);
  console.log(tasksProgreso.value);
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

<!-- 
**Hints**
1. ref() is used here!
2. (NewTask, TaskItem, Footer, Nav) components are used here! 
3. Tasks are going to be contained in an array here!
4. An async function is needed to get all of the tasks stored within the supabase database, this async function's body will 
contain the tasks value which be use to store the fetchTasks method which lives inside the userTaskStore. This function 
needs to be called within the setUp script in order to run within the first instance of this component lifecycle.

5. NewTask component will receive a customEvent on this instance of the homeView that will fire the add-to-do function
6. add-to-do function will receive 2 params/arguments that will tak a taskTitle and a taskDescription and the body of this 
async function will call the taskStore that calls the addTask function from the store that pushes the info of the task to the 
backEnd. This is possible by passing the 2 param/arguments that will be passed by the user from the inputs within the NewTask 
Component. 

7. TaskItem component will loop through the tasks-array that will print an individual instance of an individual TaskItem 
component. TaskItem will receive 3 customEvents on this instance of the homeView. 1 customEvent for toggling the task to show 
either a text or an icon to display if the task is completed or not completed. 1 customEevent for removing/deleting the 
task out of the array. 1 customEvent for editing the task title and description. This function needs to call the function 
mentioned on hint4.


7.1-customEvent will fire an async function that will take in 1 param/argument. On the body of this function the param/argument 
will be used to define 2 constants. 1 of this constants will take care of setting the boolean value to the opposite of the 
value that checks wether this task is_complete. 1 of this constants will take of calling the id of this specific task in 
order to call the right id. 
7.2-customEvent will fire an asynf function that will take in 1 param/argument. This async function's body will be used to 
call the deleteTaskmethod which will take the param/argument's id in order to delete the task. This function needs to call 
the function mentioned on hint4. 
7.3-customEvent will fire an async function that will take in 1 param/argument. this async function's body will be used to 
take in 2 constants. 1 constant will take in the param/argument newValue. 1 constant will be used to get the param/argument 
oldValue id. These 2 constants will be sent to the backend via the useTaskStore which holds an editTask method. This function 
needs to call the function mentioned on hint4.
-->
