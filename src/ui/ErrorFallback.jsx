/* eslint-disable react/prop-types */
import styled from "styled-components";
import Heading from "./Heading";
import GlobalStyles from "../styles/GlobalStyles";
import Button from "./Button";

const StyledErrorFallback = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: "Sono";
    margin-bottom: 3.2rem;
    color: var(--color-grey-500);
  }
`;

// Error Boundary : Now the problem is that here we are now outside of app.JSX and therefore we no longer have access to our global styles. And so let's bring them back in here. So that's called global styles, like this.And then here we could even write the exact error message that has occurred, because remember that this component here actually gets past the error. And so then we can, here do error.message. And so, then that provides at least some information, which isn't that useful to the user, but may be to the developer.

// Basically it tells us here that React will try to recreate using the error boundary that we have provided. So React is aware that this exists, and so that's why it now rendered this error boundary instead of just this blank screen that we had earlier. Now, this in itself is still not that useful, because the user still doesn't know what to do with it. And so here let's just quickly add a button, which will allow the user to simply go back to the app's home screen.

// Now the callback function here, we will actually provide right into the error boundary. So here we can pass in another prop, which is called the on reset prop. And so here, let's then basically redirect the user back to the index page. So here, of course, we're not gonna use React Router, but instead just the regular dump function window.location.replace, and then back to the homepage. All right, and so then inside the error fallback, we get access to this on reset prop, but it's gonna be called, resetErrorBoundary.

// So the error has been reset, and of course, if we then go back here, the error will come back again. But at least now the user knows that they can use the rest of the application. 


function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <GlobalStyles />
      <StyledErrorFallback>
        <Box>
          <Heading as="h1">Something went wrong 😢</Heading>
          <p>{error.message}</p>
          <Button $size="large" onClick={resetErrorBoundary}>
            Try again
          </Button>
        </Box>
      </StyledErrorFallback>
    </>
  );
}

export default ErrorFallback;
