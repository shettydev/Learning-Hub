// Import necessary dependencies 
import Hero from "./pages/app/hero/Hero";
import Nav from "./components/nav/Nav";
import Courses from "./pages/app/courses/Courses";
import Details from "./pages/app/details/Details.jsx"
import Enrolled from "./pages/app/enrolled/Enrolled";
import EnrolledDetails from "./pages/app/enrolledDetails/EnrolledDetails";
import Learn from "./pages/app/learn/Learn";
import Chapter from "./pages/app/chapter/Chapter";
import Page404 from "./pages/misc/Page404/Page404";
import SignIn from "./pages/app/authentication/SignIn";
import SignUp from "./pages/app/authentication/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


// App Component 
function App() {

  // browserRouter configuration
  const browserRouter = createBrowserRouter([
    {
      path:"/",
      element: <Nav />,
      errorElement: <Page404 />,
      children: [
        {index: true, element: <Hero />},
        {
          path: "/courses", 
          children: [
            {index: true, element: <Courses />},
            {path: ":courseId", element: <Details />},
          ]
        },
        {
          path: "/enrolled",
          children: [
            {index: true, element: <Enrolled/>},
            {path: ":enrolledId", element: <EnrolledDetails/>}
          ]
        },
        {
          path: "/learn/:courseId",
          element: <Learn />,
          children: [
            {
              path: "chapter/:chapterId",
              element: <Chapter />
            }
          ]
        },
        {
          path: "/signin",
          element: <SignIn />,
        },
        {
          path: "/signup",
          element: <SignUp />
        } 
      ],
    },
  ]);

  return (
    <RouterProvider router={browserRouter} />
  );
}

// Export the App component
export default App;
