/* eslint-disable react/prop-types */
import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({ label, error, children }) {
  return (
    <StyledFormRow>
      {/* So this name is basically always the ID of the input. So the way that this works is that when we then click the label, the input will be selected. So these two are basically connected by this ID. So the way we can access that ID there is by using a nice trick that we have never talked about and that we never used, but now let's actually use it. So this input here is what will be the children, right? So this right here. And since we know that we only have one children, we can actually do this. So, again, this children will be the input and that input here always receives an ID, so as a prop. And so we can do children.props.id */}
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
