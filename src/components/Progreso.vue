<template>
  <div id="progressBar">
    <p>hola</p>
    <div class="container">
      <progress
        class="progress is-primary"
        :value="props.tasksCompleteLength"
        :max="props.tasksLength"
      ></progress>
      {{ props.tasksProgreso }}% completado
    </div>
  </div>
  <div class="padre">
    <div class="skill">
      <div class="outer">
        <div class="inner">
          <img
            class="avatarHomeMobile"
            :src="
              props.avatar_url
                ? props.avatar_url
                : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
            "
            alt="Profile picture"
          />
          <div id="number">{{ props.tasksProgreso }}%</div>
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
          :stroke-dashoffset="props.progresoConversor"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tasksCompleteLength: Number,
  tasksLength: Number,
  tasksProgreso: Number,
  avatar_url: String,
  progresoConversor: Number,
});

// TO DO
// Limpiar aviso de consola . No le gusta el typeof tasksProgresso, sale como Number, lo recibe como Number, en algún punto lo detecta como string.
// [Vue warn]: Invalid prop: type check failed for prop "tasksProgreso". Expected Number with value 66.67, got String with value "66.67".
// at <Progreso tasksCompleteLength=2 tasksLength=3 tasksProgreso="66.67"  ... >
// at <Home onVnodeUnmounted=fn<onVnodeUnmounted> ref=Ref< Proxy {__v_skip: true} > >
// at <RouterView>
// at <App>
</script>

<style></style>
