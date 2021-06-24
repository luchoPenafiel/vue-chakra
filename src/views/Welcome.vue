<template>
  <div>
    <the-title>¡Hola!</the-title>
    <auth></auth>
  </div>
</template>

<script>
import Auth from '../components/Auth/Auth.vue';
import TheTitle from '../components/Title/Title.vue';

export default {
  name: 'Home',
  components: { TheTitle, Auth },
};
</script>
