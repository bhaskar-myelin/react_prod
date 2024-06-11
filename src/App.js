import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Analysis from "./components/Analysis/Analysis";
import Header from "./components/reusable/Header";
import Upload from "./components/Upload/Upload";
import HistoricalAnalysis from "./components/Analysis/HistoricalAnalysis";
import CrossoverAnalysis from "./components/Analysis/CrossoverAnalysis";
import ColorHit from "./components/Analysis/ColorHit";
import PeriodicAnalysis from "./components/Analysis/PeriodicAnalysis";
// import Router from "./router";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/dashboard/historical" element={<HistoricalAnalysis />} />
        <Route path="/dashboard/crossover" element={<CrossoverAnalysis />} />
        <Route path="/dashboard/sma" element={<ColorHit />} />
        <Route path="/dashboard/periodic" element={<PeriodicAnalysis />} />
        <Route
          path="/dashboard/:companyName/historical"
          element={<Analysis />}
        />
        <Route
          path="/dashboard/:companyName/crossover"
          element={<Analysis />}
        />
        <Route path="/dashboard/:companyName/sma" element={<Analysis />} />
        <Route path="/dashboard/:companyName/periodic" element={<Analysis />} />
        <Route
          path="/dashboard/:companyName/aftereffect"
          element={<Analysis />}
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
