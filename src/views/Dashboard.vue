<template>
  <div>
    <h1>Dashboard</h1>
    <c-box>
      <c-button @click="logout">Logout</c-button>
    </c-box>
  </div>
</template>

<script>
import { CBox, CButton } from '@chakra-ui/vue';

export default {
  name: 'Home',
  components: { CBox, CButton },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace({ name: 'Welcome' });
    },
  },
};
</script>
