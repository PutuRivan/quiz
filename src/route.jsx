import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/login-page";
import QuizPage from "./pages/quiz-page";
import ResultsPage from "./pages/results-page";
import HomePage from "./pages/home-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/quiz",
    element: <QuizPage />,
  },
  {
    path: "/results",
    element: <ResultsPage />,
  },
]);
