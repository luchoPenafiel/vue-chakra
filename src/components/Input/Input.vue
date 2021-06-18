<template>
  <div class="form-control">
    <label :for="name.title" :class="{ isInvalid: !name.isValid }">{{ label }}</label>
    <div class="wrapper">
      <c-flex as="div">
        <c-pseudoBox
          as="input"
          :class="{ isInvalid: !name.isValid }"
          :type="type"
          :name="name.title"
          :id="name.title"
          v-model.trim="name.value"
          width="100"
          pr="10"
          pl="2"
          py="2"
          bg="white"
          color="blue.500"
          border-color="#ececec"
          border-width="1.5px"
          border-radius="12px"
          flex="1"
          :_focus="{ outline: 'none', borderColor: 'blue.500' }"
        />
      </c-flex>
      <c-icon class="icon" v-if="!name.isValid" name="warning" size="24px" color="blue.50" />
    </div>
    <p class="isInvalid" v-if="!name.isValid">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { CPseudoBox, CFlex } from '@chakra-ui/vue';

export default {
  props: ['name', 'type', 'errorMessage', 'label'],
  components: { CPseudoBox, CFlex },
};
</script>

<style scoped>
label {
  font-size: 14px;
  color: #2764ae;
}

p {
  font-size: 14px;
}

.form-control {
  margin: 0.5rem 0;
}

.wrapper {
  position: relative;
}

.isInvalid {
  color: red;
  border-color: red;
}

.icon {
  position: absolute;
  top: 9px;
  right: 8px;
}
</style>
