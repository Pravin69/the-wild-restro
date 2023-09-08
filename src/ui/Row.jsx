import { css, styled } from "styled-components";

// Creating a more reusable Row Component : And let's start with a reusable row component. So let's say, for example, that we want this entire part here, so all of this, to be side by side with this Wild Oasis title. So basically, we want a row which contains both this and then a box with this. And following the same logic, we might also want a row for all of this. But this one might be a different row. So here, maybe we want the form first and then after that we want a box with these two. So they should still be in some kind of box, but a different box. So here, the layout is horizontal and here, vertical. And so let's create a component for that.
const Row = styled.div`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

// Setting Default Props on a React Component in other Way
Row.defaultProps = {
    type: "vertical"
}

export default Row;
