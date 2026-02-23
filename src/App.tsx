import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { DailyChecklist } from './pages/DailyChecklist';
import { WorkoutPlan } from './pages/WorkoutPlan';
import { Photos } from './pages/Photos';
import { Settings } from './pages/Settings';
import { WeeklyLog } from './pages/WeeklyLog';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="daily" element={<DailyChecklist />} />
          <Route path="weekly" element={<WeeklyLog />} />
          <Route path="workout" element={<WorkoutPlan />} />
          <Route path="photos" element={<Photos />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;