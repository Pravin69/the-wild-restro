import { css, styled } from "styled-components";

// Styled Components Css Function : Now, if we write big blocks of CSS this way, so basically in an external variable, then we don't get the syntax highlighting that we are used to, and so one way of fixing that is to use the CSS function here so we can import CSS from styled components, and so then here we get again this syntax highlighting. So in this case, the CSS function actually wouldn't be necessary, but we can still use it just to get OR syntax highlighting back. Now, this function is actually necessary if we want to do some logic in here. So if we wanted to write some JavaScript expression here and then use that in here,
// const test = css`
//     text-align: center;
//     ${10 > 5 && 'background-color: yellow'}
// `

// Using Props in Styled Components : And so now we want, of course, these three headings here to look different. So that's why we passed this type prop in there. And again, we could give it any name that we wanted. And so now we can actually receive that prop in here. So let's enter our JavaScript mode, and then in here we can get access to the props by using a callback function like this. So this function receives the props, and then from there we can read props.type. And so let's check if this is actually an H1, so this string right here. And so if it is, then let's return this piece of CSS. Let's actually make it a template literal so that we can then use the CSS function and get OR syntax highlighting.
const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}

    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `}

    line-height: 1.4;
`;

export default Heading;
