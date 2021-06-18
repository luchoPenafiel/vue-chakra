<template>
  <div>
    <c-box>
      <div class="switch-wrapper">
        <c-button @click="setSignInMode" :class="{ outline: mode === 'signup' }">Sign in</c-button>
        <c-button @click="setSignUpMode" :class="{ outline: mode === 'signin' }">Sign up</c-button>
      </div>

      <form v-if="mode === 'signin'" @submit.prevent="onSignIn">
        <custom-input :name="email" :type="'email'" :label="'Email'" errorMessage="Your Email is required." />

        <custom-input
          :name="password"
          :type="'password'"
          :label="'Password'"
          errorMessage="Your password is required."
        />

        <c-button type="submit">Sign in</c-button>
      </form>

      <form v-else @submit.prevent="onSignUp">
        <div class="form-control">
          <label for="name">Name</label>
          <c-input type="text" name="name" id="name" v-model.trim="name.value" />
          <p v-if="!name.isValid">Your name is required.</p>
        </div>
        <div class="form-control">
          <label for="lastName">Last Name</label>
          <c-input type="text" name="lastName" id="lastName" v-model.trim="lastName.value" />
          <p v-if="!lastName.isValid">Your lastName is required.</p>
        </div>
        <div class="form-control">
          <label for="email">Email</label>
          <c-input type="email" name="email" id="email" v-model.trim="email.value" />
          <p v-if="!email.isValid">Email is required.</p>
        </div>

        <div class="form-control">
          <label for="password">Password</label>
          <c-input type="password" name="password" id="password" v-model.trim="password.value" />
          <p v-if="!password.isValid">Password is required.</p>
        </div>

        <p v-if="!!errorAuth">{{ errorAuth }}</p>

        <c-button type="submit">Sign up</c-button>
      </form>
      <p v-if="loading">Loading...</p>
    </c-box>
  </div>
</template>

<script>
import { CBox, CButton, CInput } from '@chakra-ui/vue';
import CustomInput from '../Input/Input.vue';

export default {
  components: { CBox, CButton, CInput, CustomInput },
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
