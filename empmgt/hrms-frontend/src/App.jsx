import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import Employees from "./pages/Employee";
import AddEmployee from "./pages/AddEmployee";
import Attendance from "./pages/Attendance";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Employees />} />
          <Route path="/add" element={<AddEmployee />} />
          <Route path="/attendance" element={<Attendance />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;