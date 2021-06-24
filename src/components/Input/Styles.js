import styled from 'vue-styled-components';

export const SWrapper = styled('div')`
  position: relative;
`;

export const SLabel = styled('label')`
  display: block;
  padding-left: 8px;
  margin-bottom: 8px;

  color: rgb(88, 88, 88);
  font-size: 14px;
  font-weight: 600;
`;

const hintProps = {
  isValid: Boolean,
};

export const SHint = styled('p', hintProps)`
  font-size: 14px;
  color: ${({ isValid }) => (isValid ? '#000' : 'red')};
`;
