import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import DataExtraction from "./components/DataExtraction";
import BasicDetails from "./components/BasicDetails";
import ReportSummary from "./components/ReportSummary";
import CreditAccounts from "./components/CreditAccounts";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data-extraction" element={<DataExtraction />} />
        <Route path="/basic-details" element={<BasicDetails />} />
        <Route path="/report-summary" element={<ReportSummary />} />
        <Route path="/credit-accounts" element={<CreditAccounts />} />
      </Routes>
    </Router>
  );
};

export default App;
