import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { AuthProvider } from "./context/AuthContext";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from "./App";
import Reports from "./pages/Reports";
import Home from "./pages/Home";
import SeasonCards from "./components/SeasonList";
import GameComponent from "./components/Game";
import ReportDetail from "./components/ReportDetail";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="home" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="reports" element={<Reports />} />
      <Route path="reports/:reportId" element={<ReportDetail />} />
      <Route path="season/:year" element={<SeasonCards />} />
      <Route path="season/:year/:team" element={<SeasonCards />} />
      <Route path="game/:gameId" element={<GameComponent />} />
      <Route path="*" element={<App />} /> {/* Handle unknown routes */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
          <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
