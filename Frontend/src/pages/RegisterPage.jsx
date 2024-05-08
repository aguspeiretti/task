import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isAutenticated, signUp, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    signUp(values);
  });

  useEffect(() => {
    if (isAutenticated) {
      navigate("/login");
    }
  }, [isAutenticated]);

  console.log(isAutenticated);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md ">
        <h1 className="text-2xl font-bold mb-2 ">Register</h1>
        {registerErrors.map((error, i) => (
          <div className="bg-red-500 mb-2 p-2 text-white" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Nombre de usuario"
          />
          {errors.username && (
            <p className="text-red-500">Username is requiered</p>
          )}
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
          <button type="submit"> register</button>
        </form>
        <p className="flex gap-x-2 justify-between">
          {" "}
          ya tienes una cuenta?{" "}
          <Link to={"/login"}>
            <p className="mr-2 text-sky-500">Login</p>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
