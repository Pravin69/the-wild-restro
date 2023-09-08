import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

// Styled Components : So Styled Components essentially allow us to write CSS right inside our JavaScript component files. And the way it works is that we take a regular HTML element and then using the styled function we create a brand new React component with some CSS styles applied to it. And we can then use and reuse that new component instead of using the regular HTML element.

// And then here, let's say that we want to style an H1 element. And so we just write "styled.h1". And then here we write a template literal which is basically the string in which we are going to write our styles. And this is just a nice trick that leverages the ES6 feature called Tagged Template Literals.

// And so what's great about this is that that this CSS that we just wrote is of course only scoped to this exact component, which eliminates all the problems of global CSS that we talked about earlier such as name collisions between class names, or for example another developer changing the class without some other developer knowing about that which would create all sorts of problems.

// Now what's really cool and really helpful about this is that these styled components actually are able to receive all the same props that the regular HTML or JSX elements can receive. So for example, we can just as always use the onClick prop in order to attach some event handler here.

// const H1 = styled.h1`
//   font-size: 30px;
//   font-weight: 600;
//   background-color: yellow;
// `;

// But now the question that you might have is, how do we actually style this app component itself? Because app itself is of course already a component. And so if the styled function here also returns a component then how can we do this? So basically what we want to style is this div right here. Right? And so what we can do is to create yet another styled component only to basically replace this div right here. And then here a convention is to call this new component "StyledApp"

// So let's again distinguish between the two different things that we did here. So first we created some simple reusable components which we can then think of primitives of our user interface. So for example, if we want a reusable input element we just call that input here and then use that all over the place so we can, of course again reuse this as many times as we want. And then if we want to basically style the component itself, so a component that is already pre-built, then we have to do it in a slightly different way. So if the component is called App, then the convention is to create a styled component, which is called StyledApp and then we apply all the styles to that and use it instead of the regular HTML element that we had here before.
const StyledApp = styled.div`
  /* background-color: orangered; */
  padding: 20px;
`;

function App() {
  return (
    <>
      {/* Global Styles : So we created these global styles, but now, in order to actually apply them, let's come back to our app component here, and then include them right here. And the way that this works is that the GlobalStyles component that we just exported needs to be added to the component tree, but it cannot accept any children. So, basically, we want this to be a sibling of this styled app. */}
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row type="horizontal">
            <Heading as="h1">The Wild Oasis</Heading>

            <div>
              <Heading as="h2">Check in and out</Heading>
              <Button
                variation="primary"
                size="medium"
                onClick={() => alert("Check in")}
              >
                Check In
              </Button>
              <Button onClick={() => alert("Check out")}>Check Out</Button>
            </div>
          </Row>
          {/* as Prop : So we can pass a special prop to our components to tell them as which HTML element they should be rendered, and that special prop is called the as prop. So we should now instead of type, actually use this as prop right here. */}
          <Row type="vertical">
            <Heading as="h3">Form</Heading>
            <form>
              <Input type="number" placeholder="Number of guests" />
              <Input type="number" placeholder="Number of guests" />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
