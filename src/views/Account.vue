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
      class="profilePicture"
    />
    <div class="editable editablePerfil" v-show="editPerfil">
      <label for="name">Nombre</label>
      <input type="text" v-model="username" />
      <label for="avatar">Avatar</label>
      <input type="text" v-model="avatar_url" />
      <button @click="changePerfil" class="btn-save">
        <Icon icon="iconoir:save-floppy-disk" :class="siSave"></Icon>
        <Icon icon="iconoir:save-action-floppy" :class="awaitSave"></Icon>
      </button>
    </div>
    <section class="notMobile">
      <div>
        <CAlert color="success" dismissible :visible="visible" class="CAlert">
          <CAlertHeading>
            🏆Gana el jugador {{ jugadorWiner }} 🏆</CAlertHeading
          >
          <p>😎Aww yeah!! 🎉Felicidades!!!</p>
          <p class="mb-0">
            🏁 El breve descanso recarga las pilas, y marcar unos tempos de
            productividad y otros de descanso nos da una sensación de logro y
            querer seguir hasta completar la jornada.
          </p>
        </CAlert>
      </div>
      <div>
        <h1 class="headerTicTacToe">TIC TOC TOE</h1>
        <table class="table">
          <tr>
            <td @click="tictactoc(0)">{{ celda1a }}</td>
            <td @click="tictactoc(1)">{{ celda2a }}</td>
            <td @click="tictactoc(2)">{{ celda3a }}</td>
          </tr>
          <tr>
            <td @click="tictactoc(3)">{{ celda1b }}</td>
            <td @click="tictactoc(4)">{{ celda2b }}</td>
            <td @click="tictactoc(5)">{{ celda3b }}</td>
          </tr>
          <tr>
            <td @click="tictactoc(6)">{{ celda1c }}</td>
            <td @click="tictactoc(7)">{{ celda2c }}</td>
            <td @click="tictactoc(8)">{{ celda3c }}</td>
          </tr>
        </table>
        <button id="button_id" type="reset" value="Reset" @click="getReset()">
          <b> RESET </b>
        </button>
      </div>
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
// iconos
import { Icon } from "@iconify/vue";
// aler winner
import { CAlert, CAlertHeading } from "@coreui/vue";

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
//Clase Save
let siSave = ref("siSave");
let awaitSave = ref("noVer");

const clickSave = () => {
  siSave.value = "noVer";
  awaitSave.value = "siSave";
  setTimeout(() => {
    siSave.value = "siSave";
    awaitSave.value = "noVer";
  }, 2000);
};

let editPerfil = ref(false);

const changeEditPerfil = () => {
  editPerfil.value = !editPerfil.value;
};

const changePerfil = async () => {
  clickSave();
  setTimeout(() => {
    changeEditPerfil();
  }, 1000);
  await userStore.changeProfiles(
    username.value,
    avatar_url.value,
    user_id.value
  );
};

// TIC TAC TOC
let i = 0;
let arr = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

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
let visible = ref(false);
let jugadorWiner = ref("");
const exito = () => {
  if (i > 3) {
    if (
      (celda1a.value == celda2a.value &&
        celda2a.value == celda3a.value &&
        celda1a.value != "") ||
      (celda1a.value == celda2b.value &&
        celda2b.value == celda3c.value &&
        celda1a.value != "") ||
      (celda1a.value == celda1b.value &&
        celda1b.value == celda1c.value &&
        celda1a.value != "")
    ) {
      jugadorWiner.value = celda1a.value;
      console.log("El jugador", celda1a.value, "ganaaaa!!");
      (visible.value = true),
        setTimeout(() => {
          (visible.value = false), getReset();
        }, 5000);
    } else if (
      (celda1b.value == celda2b.value &&
        celda2b.value == celda3b.value &&
        celda1b.value != "") ||
      (celda2a.value == celda2b.value &&
        celda2b.value == celda2c.value &&
        celda2a.value != "") ||
      (celda3a.value == celda2b.value &&
        celda2b.value == celda1c.value &&
        celda3a.value != "")
    ) {
      jugadorWiner.value = celda2b.value;
      console.log("El jugador", celda2b.value, "ganaaaa!!");
      (visible.value = true),
        setTimeout(() => {
          (visible.value = false), getReset();
        }, 5000);
    } else if (
      (celda3a.value == celda3b.value &&
        celda3b.value == celda3c.value &&
        celda3a.value != "") ||
      (celda1c.value == celda2c.value &&
        celda2c.value == celda3c.value &&
        celda1c.value != "") ||
      (celda1c.value == celda2c.value &&
        celda2c.value == celda3c.value &&
        celda1c.value != "")
    ) {
      jugadorWiner.value = celda3c.value;
      console.log("El jugador", celda3c.value, "ganaaaa!!");
      (visible.value = true),
        setTimeout(() => {
          (visible.value = false), getReset();
        }, 5000);
    }

    if (i == 8) {
      console.log("Empate!!!");
      getReset();
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
  console.log("Entra en reset");
  console.log(i);
  console.log(arr);
  i = 0;
  arr = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  celda1a.value = "";
  celda2a.value = "";
  celda3a.value = "";
  celda1b.value = "";
  celda2b.value = "";
  celda3b.value = "";
  celda1c.value = "";
  celda2c.value = "";
  celda3c.value = "";
  console.log("Sale de reset");
  console.log(i);
  console.log(arr);
};
</script>

<style>
img {
  width: 200px;
  border-radius: 50%;
}
</style>
