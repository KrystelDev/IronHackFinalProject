<template>
  <Nav />
  <h1>Name: {{ username }}</h1>
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
  <button @click="changeEditPerfil">Edit</button>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Nav from "../components/Nav.vue";
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

  console.log(profile.value);

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

/*
const getProfiles = async () => {
  profiles.value = await profileStore.fetchProfiles();
};
//getProfiles();

async function getProfile() {
  console.log("getProfile:");
  console.log(profiles.value);
  // console.log(profiles.value);
  // profiles.value = await profileStore.fetchProfiles();

  username.value = await profiles.value.username;
  avatar_url.value = await profiles.value;
  console.log(profiles.value);
  getProfiles();
}
*/

// const loading = ref(false);
// const website = ref(null);

onMounted(() => {
  //getProfile();
});

// PREFILE
// const getProfiles = async () => {
//   profiles.value = await profileStore.fetchProfiles().id;
// };
// getProfiles();

// async function getProfile() {
//   console.log(profiles.value);
//   // console.log(profiles.value);
//   // profiles.value = await profileStore.fetchProfiles();

//   username.value = await profileStore.username;
//   avatar_url.value = await profileStore.avatar_url;
// }
// getProfile();
</script>

<style>
img {
  width: 200px;
  border-radius: 50%;
}
</style>
