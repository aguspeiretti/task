import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import TaskPage from "./pages/TaskPage";
import TaskCreator from "./pages/TaskCreator";
import Profile from "./pages/Profile";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import { TaskProvider } from "./context/TaskContext";
import Nav from "./components/Nav";

function App() {
  return (
    <>
      <AuthProvider>
        <TaskProvider>
          <BrowserRouter>
            <main className="container mx-auto px-10">
              <Nav />
              <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/register" element={<RegisterPage />}></Route>

                <Route element={<ProtectedRoutes />}>
                  <Route path="/task" element={<TaskPage />}></Route>
                  <Route path="/add-task" element={<TaskCreator />}></Route>
                  <Route path="/task/:id" element={<TaskCreator />}></Route>
                  <Route path="/profile" element={<Profile />}></Route>
                </Route>
              </Routes>
            </main>
          </BrowserRouter>
        </TaskProvider>
      </AuthProvider>
    </>
  );
}

export default App;
