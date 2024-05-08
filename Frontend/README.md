# React + Vite

instalamos tailwind buscamos la seccion de frameworks y hacemos la instalacion sumamos la extencion de tailwind css pra autocompletado

instalamos react-router-dom npm i react-router-dom

agrego todo en el app
import { BrowserRouter, Routes, Route } from "react-router-dom";

creamos las rutas

return (
<>
<BrowserRouter>
<Routes>
<Route path="/" element={<h1>Home page</h1>}></Route>
<Route path="/login" element={<h1>Login</h1>}></Route>
<Route path="/register" element={<h1>Register</h1>}></Route>
<Route path="/task" element={<h1>tareas</h1>}></Route>
<Route path="/add-task" element={<h1>agregar tarea</h1>}></Route>
<Route path="/task/:id" element={<h1>traer unica tarea</h1>}></Route>
<Route path="/profile" element={<h1>perfil</h1>}></Route>
</Routes>
</BrowserRouter>
</>
);

creamos la carpeta pages components y context

creamos dentro de pages los archivos login y register. jsx

VAMOS A CREAR EL REGISTER

DENTRO CREAMOS UN FORM

<div>
      <form action="">
        <input type="text" name="username" />
        <input type="email" name="email" />
        <input type="password" name="password" />
      </form>
    </div>

    para este form vamos a usar react hoook form asi que lo isntalamos de npm

    con npm install react-hook-form

    este va a gestionar todo nuestro formulario sin crear estados aparte

    VAMOS A CREAR UNA CARPETA API

    y vamos a instalar axios

    npm i axios

import axios from "axios";

const API = "http://localhost:3000/api";

export const registerRequest = (user) => axios.post(`${API}/register`, user);

con esta funcion le digo que cree un registerRecuestr le vamos a pasar un usuario quye haga la peticion y envie ese usuario

en el submit voy a importar esta funcion

  <form
        onSubmit={handleSubmit(async (values) => {
          console.log(values);
          const res = await registerRequest(values);
          console.log(res);
        })}
      >

      esto va a dar un error de cors por estar en host diferentes
      para solucionarlo vamos a instalar en el backend

      npm i cors

      y en mi app.js voy a agreagar

      import cors from "cors";

      Y inicializarlo

      app.use(cors());

      AHORA VAMOS A CREAR UN CONTEXTO
      creanmos el archivo AuthCOntext y hacemos un context basico

      import { Children, createContext, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
return(
<AuthContext.Provider value={{}}>
{
children
}
</AuthContext.Provider>
)
}

ahora aqui puedo crear un estado para guardar el usuario y poder verlo en todos lados

    const[user, setUser]= useState(null)

    voy a mi app y englobo todo en el AuthProvider

en mi context voy a crear esta funcion para poder optener todo en los componentes

export const useAuth = () => {
const context = useContext(AuthContext);
if (!context) {
throw new Error("useAuth must be used within Authprovider");
}
return context;
};

instalar js-cookie

en api creamos un axios.js para poder decirle que guarde la cookie

import axios from "axios";

const instance = axios.create({
baseURL: "http//localhost:3000/api",
withCredentials: true,
});

export default instance;

y cambio mi auth contecxt a

import axios from "./axios.js";

export const registerRequest = (user) => axios.post(`/register`, user);

export const loginRequest = (user) => axios.post(`/login`, user);

y en el backend en coors poner credentials en true
