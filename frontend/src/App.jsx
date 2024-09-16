import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkUserSignedIn } from "./store/reducers/userSlice";
import Footer from "./components/global/Footer";
import Navbar from "./components/global/Navbar";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Blogs from "./pages/Blogs";
import Dashboard from "./pages/Dashboard";
import Help from "./pages/Help";
import Landing from "./pages/Landing";
import GameSimulation from "./pages/GameSimulation";
import SettingPage from "./pages/SettingPage";
import EditPage from "./pages/EditPage";
import SessionPage from "./pages/SessionPage";
import GameStats from "./pages/GameStats";
import Lobby from "./pages/Lobby";
import OnboardingForm from "./pages/Onboarding";
import ProtectedRoute from "./pages/ProtectedRoute";
import { LoadingProvider } from "./contexts/LoadingContext";
import Loading from "./components/LoadingComponent";
import Session from "./components/dashboard/Session";
import DashboardLayout from './InstructorDashboard/DashboardLayout'
import Overview from "./components/dashboard/Overview";
import Upgrade from "./components/dashboard/Upgrade";
import Settings from "./components/dashboard/Settings";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSignedIn());
  }, [dispatch]);

  const hideNavFooter = [
    "/dashboard",
    "/game",
    "/settings",
    "/edit",
    "/session",
    "/lobby",
    "/signin",
    "/onboarding",
    "/stats",
  ].some((path) => location.pathname.includes(path));

  return (
    <LoadingProvider>
      <div className="App">
        <Loading />
        {!hideNavFooter && <Navbar />}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/signin" element={<Auth />} />
          <Route path="/onboarding" element={<OnboardingForm />} />
          <Route path="/session/:sessionId" element={<SessionPage />} />
          <Route path="/stats/:gameId" element={<GameStats />} />
          <Route path="/game/:gameId/:role" element={<GameSimulation />} />
          <Route path="/lobby/:sessionId" element={<Lobby />} />

          <Route element={<ProtectedRoute />}>
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              {/* <Route index element={<Dashboard />} /> */}
              <Route path="overview" element={<Overview />} />
              <Route path="upgrade" element={<Upgrade />} />
              <Route path="sessions" element={<Session />} />
              <Route path="students" element={<div>Students Page</div>} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="/game" element={<GameSimulation />} />
            <Route path="/edit" element={<EditPage />} />
            <Route path="/session/:sessionId" element={<SessionPage />} />
          </Route>
        </Routes>
        {!hideNavFooter && <Footer />}
      </div>
    </LoadingProvider>
  );
}

export default App;
