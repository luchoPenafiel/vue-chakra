<template>
  <div>
    <c-box aria-label="Formulario de registro o de inicio de sesión.">
      <div class="switch-wrapper" aria-lebel="Cambia entre inicio de sesión y registro de usuario.">
        <c-button @click="setSignInMode" :class="{ outline: mode === 'signup' }">Inicia Sesión</c-button>
        <c-button @click="setSignUpMode" :class="{ outline: mode === 'signin' }">Regístrate</c-button>
      </div>

      <form v-if="mode === 'signin'" @submit.prevent="onSignIn" aria-lebel="Formulario de inicio de sesión">
        <custom-input :name="email" :type="'email'" :label="'Email'" errorMessage="Debes ingresar tu email." />

        <custom-input
          :name="password"
          :type="'password'"
          :label="'Contraseña'"
          errorMessage="Debes ingresar una contraseña."
        />

        <c-button type="submit">Ingresar</c-button>
      </form>

      <form v-else @submit.prevent="onSignUp" aria-lebel="Formulario de registro de usuario">
        <custom-input
          :type="'text'"
          :name="name"
          :label="'Nombre'"
          v-model.trim="name.value"
          errorMessage="Debes ingresar un nombre."
        />

        <custom-input
          :type="'text'"
          :name="lastName"
          :label="'Apellido'"
          errorMessage="Debes ingresar tu apellido."
          v-model.trim="lastName.value"
        />

        <custom-input
          :type="'email'"
          :name="email"
          v-model.trim="email.value"
          :label="'Email'"
          errorMessage="Debes ingresar tu email."
        />

        <custom-input
          :type="'password'"
          :name="password"
          v-model.trim="password.value"
          :label="'Contraseña'"
          errorMessage="Debes ingresar tu contraseña."
        />

        <p v-if="!!errorAuth">{{ errorAuth }}</p>

        <c-button type="submit">Registrarse</c-button>
      </form>
      <p v-if="loading">Cargando...</p>
    </c-box>
  </div>
</template>

<script>
import { CBox, CButton } from '@chakra-ui/vue';
import CustomInput from '../Input/Input.vue';

export default {
  components: { CBox, CButton, CustomInput },
  data() {
    return {
      mode: 'signin',
      loading: false,
      formIsValid: false,
      errorAuth: '',
      email: {
        value: '',
        isValid: true,
      },
      password: {
        title: 'password',
        value: '',
        isValid: true,
      },
      name: {
        value: '',
        isValid: true,
      },
      lastName: {
        value: '',
        isValid: true,
      },
    };
  },
  methods: {
    validate() {
      this.formIsValid = true;
      this.name.isValid = true;
      this.lastName.isValid = true;
      this.email.isValid = true;
      this.password.isValid = true;

      if (this.name.value === '') {
        this.name.isValid = false;
        if (this.mode === 'signup') {
          this.formIsValid = false;
        }
      }

      if (this.lastName.value === '') {
        this.lastName.isValid = false;
        if (this.mode === 'signup') {
          this.formIsValid = false;
        }
      }

      if (this.email.value === '') {
        this.email.isValid = false;
        this.formIsValid = false;
      }

      if (this.password.value === '') {
        this.password.isValid = false;
        this.formIsValid = false;
      }
    },
    async onSignIn() {
      this.errorAuth = '';
      this.validate();

      if (!this.formIsValid) {
        return;
      }

      const formData = {
        email: this.email.value,
        password: this.password.value,
      };

      try {
        this.loading = true;
        const response = await this.$store.dispatch('signin', formData);

        if (response.token) {
          this.$router.replace({ name: 'Dashboard' });
        } else {
          this.errorAuth = 'Faild to sign in, try later.';
        }
      } catch (err) {
        this.errorAuth = err.message || 'Faild to sign in, try later.';
      } finally {
        this.loading = false;
      }
    },
    async onSignUp() {
      this.errorAuth = '';
      this.validate();

      if (!this.formIsValid) {
        return;
      }

      const formData = {
        name: this.name.value,
        lastName: this.lastName.value,
        email: this.email.value,
        password: this.password.value,
      };

      try {
        this.loading = true;
        const response = await this.$store.dispatch('signup', formData);

        if (response.token) {
          this.$router.replace({ name: 'Dashboard' });
        } else {
          this.errorAuth = 'Faild to sign up, try later.';
        }
      } catch (err) {
        this.errorAuth = err.message || 'Faild to sign up, try later.';
      } finally {
        this.loading = false;
      }
    },
    setSignInMode() {
      this.mode = 'signin';
    },
    setSignUpMode() {
      this.mode = 'signup';
    },
  },
};
</script>

<style scoped>
form {
  max-width: 500px;

  margin: 1rem auto;
  padding: 1rem;

  border: 1px solid #ccc;
  border-radius: 12px;
}

label {
  display: block;

  margin-bottom: 0.5rem;

  text-align: left;
  font-size: 14px;
  font-weight: bold;
}

.switch-wrapper {
  text-align: center;
}
</style>
