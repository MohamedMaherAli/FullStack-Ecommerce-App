import { Routes, Route } from "react-router-dom";
import SignIn from "./components/auth/siginIn";
import SignUp from "./components/auth/signUp";
import NavBar from "./components/navbar/Navbar";
import FourOFour from "./components/404/404";
import Home from "./components/home/Home";
function App() {
  const userToken = JSON.parse(localStorage.getItem("User"))?.token;
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="*" element={<FourOFour />} />
      </Routes>
    </div>
  );
}

export default App;
