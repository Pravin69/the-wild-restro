import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";

// Setting up React Query : Okay, so let's now install and set up React Query in our application. And so back in VS code, let's head to our terminal and then in here NPM install. And then "@tanstack/react-query"

// So the idea behind integrating React Query into our application is very similar to what we did earlier with the Context API or with Redux. So first we create a place where the data basically lives and then second, we provide that to the application. And in the case of React Query, we set up the cache and the Query client using "new QueryClient." So using this function right here, coming again from "tanstack/react-query." All right. And so let's store this into a variable called "QueryClient." And then in here we can pass a couple of options.

// So we can specify here the default options. And then usually what we want is to specify options for our queries. And so here, one that we can experiment with is called "staleTime". And "staleTime" is basically the amount of time that the data in the cache will stay fresh so that it will stay valid until it is refetched again. But more about that in the next lecture. So here, let's just set it to one minute, which is 60 seconds times 1000 milliseconds. Okay. And this is just one of the many, many options that we can override. So React Query sets a few quite aggressive, as they say, defaults. But as always we can override them.

// But anyway, with this we have created our "QueryClient," which basically sets up the cash behind the scenes. And so now it's time to provide this to the application. And we want to provide our Query data to the entire application tree. And so we make this basically a parent component of our entire tree. So right here, let's then use the "QueryClientProvider" component and then provide it with the actual client. So we specified a client prompt, and then " QueryClient". So just the one that we have created earlier.

// Now, another thing that we can immediately do here is to install the React Query Dev Tools. So just like Redux, React Query also has some excellent Dev Tools. We just set them up in a different way. So in this case, it is simply an NPM package and not something in the browser. So here, let's then install "npm" install at and then again, "tanstack/react-query-devtools" .But anyway, now with this here installed let's then include another component right here. So as the first child of the Query provider let's do "ReactQueryDevTools." Then let's say initial is open to "false".

// So if you click this then this will basically open up the React Query Dev Tools. So for now, we don't have anything in our cache.

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            {/* AppLayout is called Layout Route because it doesn't have any path props. */}
            <Route
              element={
                // So remember that all of these routes right here are child routes of this layout route right here. Nowt hat means that basically all of these components, so all of these pages, are rendered inside this app layout component that we built earlier. Now these routes here will all be children not only of the app layout but also of protected route. And so in that component we will then only return the children if the user is actually authenticated.
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              {/* replace is used to replace the current url in the history stack */}
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingId" element={<Booking />} />
              <Route path="checkin/:bookingId" element={<Checkin />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
              <Route path="account" element={<Account />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        {/* Displaying Toast : So let's now display some nicely formatted notifications which in the world of web design and development are also called toasts for some reason. So React Hot Toast is the name of this library. And then we will actually need to set that up right here again in our application. So in this component right here in our component tree. So similar to these global styles and these dev tools we need to add yet another self-closing component here in this case, one that is responsible for providing some options to our toaster. 
      
      So here I want to display this. In the top center, the gutter should be 12 which is the space between the window and the toaster. Then the container style should be and so here we need to specify now an object of styles. So let's give it a margin of eight pixels. And then here we can specify some toast options. So we can, for example, define for how long a success toast will stay on the screen. So success and then duration. And let's set it to three seconds. So 3000 milliseconds. And then we can do the same for error.
      
      And with this, we are now ready to use this toaster. So right here, let's now replace these alerts with toast. So this is the function that we can import from React Hot Toast. And then on there we can create a bunch of different toasts so styles of toasts. So here we want an error toast. And here we want a toast dot success. And so this will then get different icons. And also as we defined earlier, this one will be displayed for three seconds and this one for five.
      */}
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
