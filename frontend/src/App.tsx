import { Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Shell from './components/Shell';
import Landing from './pages/Landing';
import { Login, Register } from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Scenarios from './pages/Scenarios';
import Session from './pages/Session';
import Debrief from './pages/Debrief';
import History from './pages/History';
import Progress from './pages/Progress';
import ClientGames from './pages/ClientGames';
import GamePlay from './pages/GamePlay';
import Tma from './pages/Tma';
import Admin from './pages/Admin';
import Supervisor from './pages/Supervisor';
import Review from './pages/Review';
import States from './pages/States';

export default function App() {
  return (
    <ErrorBoundary>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/app" element={<Shell role="psych" />}>
        <Route index element={<Dashboard />} />
        <Route path="scenarios" element={<Scenarios />} />
        <Route path="session/:sid" element={<Session />} />
        <Route path="debrief/:rid" element={<Debrief />} />
        <Route path="history" element={<History />} />
        <Route path="progress" element={<Progress />} />
      </Route>

      <Route path="/client" element={<Shell role="client" />}>
        <Route index element={<ClientGames />} />
        <Route path="game/:gid" element={<GamePlay />} />
      </Route>

      <Route path="/tma" element={<Tma />} />

      <Route path="/admin" element={<Shell role="admin" />}>
        <Route index element={<Admin />} />
      </Route>

      <Route path="/supervisor" element={<Shell role="supervisor" />}>
        <Route index element={<Supervisor />} />
        <Route path="review/:rid" element={<Review />} />
      </Route>

      <Route path="/states" element={<States />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </ErrorBoundary>
  );
}
