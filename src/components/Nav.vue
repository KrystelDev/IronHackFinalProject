<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/tasks">Task Manager</router-link>

    <div>
      <ul>
        <li>
          <p>Welcome,</p>
          <router-link to="/account">{{ props.username }}</router-link>
        </li>
        <li>
          <button @click="signOut({ getUser })">Log out</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";

const props = defineProps({
  username: String,
});

// // Conseguir nombre del email:
// const getUser = useUserStore().user;
// const getUserEmail = getUser.email;
// const indexArroba = getUser.email.indexOf("@", 1);
// const getUSerNameEmail = getUserEmail.slice(0, indexArroba);

// // Conseguir nombre real del usuario:
// const userStore = useUserStore();

// // Variable para guardar el perfil de supabase
// const profile = ref({
//   avatar_url: "",
//   created_at: "",
//   name: "",
//   user_id: "",
//   username: "",
//   website: "",
// });
// const username = ref(null);
// const avatar_url = ref(null);
// const user_id = ref(null);

// // PREFILE
// const getProfile = async () => {
//   // Hago una llamada para que no vaya más rapido que el primer fetchUser de App.vue
//   await userStore.fetchUser();
//   // Guardo el perfil en una constante:
//   profile.value = userStore.profile;

//   // Cuando se registra un user no tiene nombre.
//   //Si ya ha editado el nombre vacio:
//   if (profile.value.username) {
//     username.value = profile.value.username;
//   } else {
//     // Si aun no ha registrado un nombre:
//     const getUser = useUserStore().user;
//     const getUserEmail = getUser.email;
//     const indexArroba = getUser.email.indexOf("@", 1);
//     username.value = getUserEmail.slice(0, indexArroba);
//   }
//   // avatar_url.value = profile.value.avatar_url;
//   // user_id.value = profile.value.user_id;
// };
// getProfile();

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();

// Arrow function to Signin user to supaBase
async function signOut() {
  await useUserStore().signOut();
  redirect.push({ path: "/auth/login" });
}
</script>

<style>
.navbar-img {
  width: 90px;
}

nav {
  background-color: lightgray;
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
}

nav ul {
  list-style: none;
  padding-inline-start: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
