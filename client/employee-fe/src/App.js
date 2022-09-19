import ListEmployees from "./components/ListEmployees";
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header";
import AddEmployee from "./components/AddEmployee";
import EmployeeDetails from "./components/EmployeeDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<ListEmployees />}></Route>
            <Route path="/employees" element={<ListEmployees />}></Route>
            <Route path="/add-employee" element={<AddEmployee />}></Route>
            <Route path="/edit-employee/:id" element={<AddEmployee />}></Route>
            <Route path="/employee-details" element={<EmployeeDetails />}></Route>
          </Routes>
          <ToastContainer />

        </div>

      </Router>
    </div>
  );
}

export default App;
