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
          pl="4"
          py="3"
          bg="white"
          color="blue.500"
          border-color="#ececec"
          border-width="1.5px"
          border-radius="12px"
          font-weight="semibold"
          flex="1"
          :_focus="{ outline: 'none', borderColor: 'blue.500', boxShadow: '0px 0px 2px #2764ae' }"
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
.form-control {
  margin-bottom: 18px;
}

label {
  display: block;
  padding-left: 8px;
  margin-bottom: 8px;

  color: rgb(88, 88, 88);
  font-size: 14px;
  font-weight: 600;
}

p {
  font-size: 14px;
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
  top: 13px;
  right: 10px;
}
</style>
