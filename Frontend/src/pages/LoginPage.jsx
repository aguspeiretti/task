import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn, errors: signinErrors } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    signIn(data);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md ">
        <h1 className="text-2xl font-bold mb-2 ">Login</h1>

        {signinErrors.map((error, i) => (
          <div className="bg-red-500 mb-2 p-2 text-white" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is requiered</p>}
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">password is requiered</p>
          )}
          <button type="submit"> login</button>
        </form>

        <p className="flex gap-x-2 justify-between">
          {" "}
          no tienes una cuenta?{" "}
          <Link to={"/register"}>
            <p className="mr-2 text-sky-500">Registrate</p>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
