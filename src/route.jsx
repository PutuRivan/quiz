import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/login-page";
import QuizPage from "./pages/quiz-page";
import ResultsPage from "./pages/results-page";
import HomePage from "./pages/home-page";
import ProtectedRoute from "./protected-route";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/quiz",
    element: (
      <ProtectedRoute>
        <QuizPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/results",
    element: (
      <ProtectedRoute>
        <ResultsPage />
      </ProtectedRoute>
    ),
  },
]);
