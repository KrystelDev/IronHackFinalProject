<template>
  <div class="wrapper">
    <Nav :username="username" class="notMobile" />

    <h1 class="tituloProfile">Name: {{ username }}</h1>
    <img
      :src="
        avatar_url
          ? avatar_url
          : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
      "
      alt="Profile picture"
    />
    <div v-show="editPerfil">
      <label for="name">Nombre</label>
      <input type="text" v-model="username" />
      <label for="avatar">Avatar</label>
      <input type="text" v-model="avatar_url" />
      <button @click="changePerfil">Save</button>
    </div>
    <section>
      <h1 class="header">TIC TOC TOE</h1>
      <table class="table">
        <tr class="row">
          <td @click="tictactoc(0)">{{ celda1a }}</td>
          <td @click="tictactoc(1)">{{ celda2a }}</td>
          <td @click="tictactoc(2)">{{ celda3a }}</td>
        </tr>
        <tr class="row">
          <td @click="tictactoc(3)">{{ celda1b }}</td>
          <td @click="tictactoc(4)">{{ celda2b }}</td>
          <td @click="tictactoc(5)">{{ celda3b }}</td>
        </tr>
        <tr class="row">
          <td @click="tictactoc(6)">{{ celda1c }}</td>
          <td @click="tictactoc(7)">{{ celda2c }}</td>
          <td @click="tictactoc(8)">{{ celda3c }}</td>
        </tr>
      </table>
      <button id="button_id" type="reset" value="Reset" @click="getReset()">
        <b> RESET </b>
      </button>
    </section>
    <button class="editProfile" @click="changeEditPerfil">Edit</button>
    <Footer :username="username" class="onlyMobile positionBottom" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Nav from "../components/Nav.vue";
import Footer from "../components/Footer.vue";
import { useUserStore } from "../stores/user";

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
const user_id = ref(null);

// PREFILE
const getProfile = async () => {
  await userStore.fetchUser();
  profile.value = userStore.profile;
  username.value = profile.value.username;
  avatar_url.value = profile.value.avatar_url;
  user_id.value = profile.value.user_id;
};
getProfile();

//Editar Perfil
let editPerfil = ref(false);

const changeEditPerfil = () => {
  editPerfil.value = !editPerfil.value;
};

const changePerfil = async () => {
  changeEditPerfil();
  await userStore.changeProfiles(
    username.value,
    avatar_url.value,
    user_id.value
  );
};

// TIC TAC TOC
let i = 0;
let arr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

let celda1a = ref("");
let celda2a = ref("");
let celda3a = ref("");

let celda1b = ref("");
let celda2b = ref("");
let celda3b = ref("");

let celda1c = ref("");
let celda2c = ref("");
let celda3c = ref("");

// Calcular resultado despues de la primera posiblidad de exito:

//Casos de Exito
const exito = () => {
  console.log("turno", i);

  if (i > 3) {
    if (
      (celda1a.value == celda2a.value && celda2a.value == celda3a.value) ||
      (celda1b.value == celda2b.value && celda2b.value == celda3b.value) ||
      (celda1c.value == celda2c.value && celda2c.value == celda3c.value) ||
      (celda1a.value == celda1a.value && celda1a.value == celda1a.value) ||
      (celda2a.value == celda2a.value && celda2a.value == celda2a.value) ||
      (celda3a.value == celda3a.value && celda3a.value == celda3a.value)
    ) {
      console.log("El jugador", celda1a.value, "ganaaaa!!");
      setTimeout(() => {
        getReset();
      }, 5000);
    }
  }
};

const tictactoc = (num) => {
  //Si la celda no está ya ocupada...
  if (arr[num] != "X" && arr[num] != "O") {
    // El turno par, 2, 4.. será el "X"
    if (i % 2 == 0) {
      // Así no funciona:
      // celda.value = "X";

      switch (num) {
        case 0:
          exito();
          celda1a.value = "X";
          break;
        case 1:
          celda2a.value = "X";
          exito();
          break;
        case 2:
          celda3a.value = "X";
          exito();
          break;
        case 3:
          celda1b.value = "X";
          exito();
          break;
        case 4:
          celda2b.value = "X";
          exito();
          break;
        case 5:
          celda3b.value = "X";
          exito();
          break;
        case 6:
          celda1c.value = "X";
          exito();
          break;
        case 7:
          celda2c.value = "X";
          exito();
          break;
        case 8:
          celda3c.value = "X";
          exito();
          break;

        default:
          break;
      }

      arr[num] = "X";
      i++;

      // El turno impar, 1, 2.. será el "O"
    } else {
      // Así no funciona:
      // celda.value = "O";

      switch (num) {
        case 0:
          celda1a.value = "O";
          exito();
          break;
        case 1:
          celda2a.value = "O";
          exito();
          break;
        case 2:
          celda3a.value = "O";
          exito();
          break;
        case 3:
          celda1b.value = "O";
          exito();
          break;
        case 4:
          celda2b.value = "O";
          exito();
          break;
        case 5:
          celda3b.value = "O";
          exito();
          break;
        case 6:
          celda1c.value = "O";
          exito();
          break;
        case 7:
          celda2c.value = "O";
          exito();
          break;
        case 8:
          celda3c.value = "O";
          exito();
          break;
        default:
          break;
      }
      arr[num] = "O";
      i++;
    }
  }
};

const getReset = () => {
  celda1a.value = "";
  celda2a.value = "";
  celda3a.value = "";
  celda1b.value = "";
  celda2b.value = "";
  celda3b.value = "";
  celda1c.value = "";
  celda2c.value = "";
  celda3c.value = "";
};
</script>

<style>
img {
  width: 200px;
  border-radius: 50%;
}
</style>
