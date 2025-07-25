import RegisterForm from "./Component/register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./Component/Login";
import TodoList from "./Component/TodoList";

function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/list" element={<TodoList/>} />
      </Routes>
    </Router>
  );
}
export default App;