import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Nav = () => {
  const { isAutenticated, logOut, user } = useAuth();

  console.log(user);

  return (
    <nav className=" bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to={isAutenticated ? "/task" : "/"}>
        <h1 className="text-2xl font-bold">Task Manager</h1>
      </Link>
      <ul className="flex gap-x-2 flex items-center">
        {isAutenticated ? (
          <>
            <li>Welcome {user.username}</li>
            <li>
              <Link
                className="bg-indigo-500 px-4 py-1 rounded-sm"
                to={"/add-task"}
              >
                Add Task
              </Link>
            </li>
            <button>
              <Link
                className="bg-red-500 px-4 py-1 rounded-sm"
                to="/"
                onClick={() => {
                  logOut();
                }}
              >
                Logout
              </Link>
            </button>
          </>
        ) : (
          <>
            <li>
              <Link
                className="bg-indigo-500 px-4 py-1 rounded-sm"
                to={"/login"}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                className="bg-indigo-500 px-4 py-1 rounded-sm"
                to={"/register"}
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
