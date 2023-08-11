import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./common/Layout";
import Mypage from "./pages/Mypage";
import Start from "./pages/Start";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage/:id" element={<Mypage />} />
      </Route>
      <Route
        path="*"
        element={
          <>
            <div>없는 페이지입니다.</div>
            <Link to="/">홈으로 이동</Link>
          </>
        }
      />
    </Routes>
  );
}

export default App;
