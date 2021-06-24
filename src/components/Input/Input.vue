<template>
  <div class="form-control">
    <s-label :for="name.title" :class="{ isInvalid: !name.isValid }">{{ label }}</s-label>
    <s-wrapper>
      <c-flex as="div">
        <c-pseudoBox
          as="input"
          aria-required="true"
          :aria-invalid="!name.isValid"
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
    </s-wrapper>
    <s-hint :isValid="name.isValid" v-if="!name.isValid">{{ errorMessage }}</s-hint>
  </div>
</template>

<script>
import { CPseudoBox, CFlex } from '@chakra-ui/vue';
import { SWrapper, SLabel, SHint } from './Styles';

export default {
  props: ['name', 'type', 'errorMessage', 'label'],
  components: { CPseudoBox, CFlex, SWrapper, SLabel, SHint },
};
</script>

<style scoped>
.form-control {
  margin-bottom: 18px;
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
