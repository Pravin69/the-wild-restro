import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App.jsx";
import ErrorFallback from "./ui/ErrorFallback.jsx";

// ErrorBundary : Let's now quickly learn how to handle errors that might occur during React rendering. So this is something that every single React app should have. And so, let's now go implement an error boundary for this. So first of all, it's just completely normal that bugs in our code make it into production. So all these times where we get a white screen in development when the app stops working, our users would also only get that white screen in production. And so that's just completely unacceptable, because then the user has no idea what to do. For example, here in our bookings table, let's say that for some reason we have a bug here that we didn't detect. So here we are trying to now read bookings.length in a situation where it might not exist yet. So maybe we wrote this code, but for some reason we didn't test it and then this code made it into production. And so then when the users, and let's actually reload this here, so then when a user comes here, well then we get this white screen, because we had an error here inside React rendering. 

// So then we see all of this and this kind of situation happened all the time while we were developing our application, right? And so that means that this might also happen in production. Now luckily for us, we can fix this situation with a React feature called error boundaries. So error boundaries are like try-catch but for React rendering, which basically allows us to react to JavaScript errors in our render code, so in React render logic. Now error boundaries are actually quite hard to use in React because for some reason they're still implemented using class components and in a very weird and hard to use way. And therefore, everyone just uses this package called React error boundary, which makes it really, really easy. So let's come here and install it. So NPM install React error boundary.

// And so this package now all it does is to give us an error boundary component where we can pass in a fallback and also a function to reset the application, so whenever an error has occurred. And so to use this, we basically wrap our entire application into that error boundary. So we could do that here. So here we can then specify a prop called, fallback component, this one right here. And so then here, it's not an element, but really the component itself.

// Great, now, just know that these error boundaries really only catch errors while React is rendering. So bugs that occur in some event handlers or in an effect or in some asynchronous code will not be caught by the error boundary. But for those, we many times have some other mechanisms, like for example, those errors that are usually returned from useQuery, but for all the bugs that might happen in rendering, like this one, that, So for errors like this, you should always, always implement an error boundary, like I just showed you.

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
