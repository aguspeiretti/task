-crear la carpeta src

al mismo nivel hacer un npm init

en el package.json agergar despues del main un "type:"module para poder usar la importacion

instalar express con npm i express

dentro de src crear app.js

y dentro de app importar express

inicializar el backend basico con

//
import express from "express";

const app = express();

export default app
//

dentro de src creo la carpeta routes para crear todos los endpoints

creo la carpeta controllers que va a alojar todas las funciones que quiero que se ejecuten cuando visito una url

creo la carpeta models que nos va a servir para guardar los modelos de los datos de nuestra base de datos "creamos los esquemas"

creao la carpeta middelwares que nos va a servir para protejer las rutas que van a usar los usuarios autenticados

creo la carpeta schemas que en esta voy a hacer todas las validaciones de tipos de datos etc

creo la carpeta libs en la que voy a agregar codigo reutilizable

y creo los archivos db.js dondoe voy a traer mi base de datos

y config.js para crear configuraciones para importar en en resto del codigo

y creo index.js que va a estar relacionado con el arranque de la aplicacion

instalo npm i nodemon -D

en el packageJsonn despues del scripts agrego una ,
y agrego "dev": "nodemon src/index.js"

ahora ya puedo correr npm run dev

ahora voy a instalar morgan con npm i morgan que me va a permitir ver las peticiuones que van llegando por consola

ahora en app importo morgan con import morgan from "morgan";

lo inicializo con app.use(morgan("dev"));

ahora instalamos npm i mongoose para conectarnos a mongo y modelar los datos

ahora en db.js importo mongoose from "mongoose"

y exporto la funcion de coneccion

export const conectDB = async () => {
try {
await mongoose.connect("mongodb://localhost/merndb");
console.log(">>>>>DB is conected");
} catch (error) {
console.log(error);
}
};

en index.js importo mi conectDB lo importo entre llaves por que no lo exporte default
import app from "./app.js";
import { conectDB } from "./db.js";

y lo inicializo conectDB()

ahora vamos a crear un modelo para los usuarios creo el archivo

user.models.js

con esto creamos una estructura fija para los datos que va a guardar mongo

esta es la estructuira

import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema({
username: {
type: String,
require: true,
//limpia los espacios
trim: true,
},
email: {
type: String,
require: true,
//limpia los espacios
trim: true,
// verifico que sea unico
unique: true,
},
password: {
type: String,
require: true,
},
});

export default mongoose.model("User", userSchema);

ahora en mi carpeta rouutes voy a crear un archivo globarl de rutas co el nombre auth.routes.js y dentro de este

import { Router } from "express";

const router = Router() con esta linea ya puedo empezar a crear peticiones post put etc

por ejemplo añado
router.post("/register");
router.post("/login");

ahora en mi carpeta controller voy a crear las funciones que me van a permitir procesar las peticiones
por ejemplo
export const register = (req, res) => {
res.send("register");
};

export const login = (req, res) => {
res.send("login");
};

ahora en mi auth.routes importo estas funciones

y exporto el enrutador

export default router;

ahora voy a mi app.js

importo las rutas y la inicializo
import authRoutes from "./routes/auth.routes.js";

app.use("/api",authRoutes); //agrego el "/api" para identificar las rutas del backend

en nuestro app tambien vamos a agregar la linea app.use(express.json());
para que express pueda leer los archivos json

ahora en mi auth controler se que en la peticion register necesito recibir los datos email,password y username por lo que hago un destructuring del body y digo

const { email, password, username } = req.body;
console.log(email, password, username);

y voy a crear el objeto que se va a guardar en la base de datos

importo mi modelo desde
import User from "../models/user.model.js";

y creoun nuevo usuario con

const newUser = new User({
username,
email,
password,
});
una vez creado lo guardo en la DB con

    newUser.save();

    la peticion completa quedaria

export const register = async (req, res) => {
const { email, password, username } = req.body;

try {
const newUser = new User({
username,
email,
password,
});

       const userSaved = await newUser.save();
       //con esta linea envio los datos al frontend
    res.json(userSaved);

} catch (error) {
console.log(error);
}

res.send("registrando");
};

//creacion de TOKEN

vamos a ir al authCOntroller y en el momento de crear el usuario vamos a encriptar la contraseña

vamos a instalar bcrypt.js

vamos a agregar

const passwordHash = await bcrypt.hash(password, 10);

quedaria asi el try:

try {
const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();
    res.json(userSaved);}

    TENER CUIDADO DE NO MANDAR DOS RES. para que no de error

para crear una credencial que nos avice que el usuario ya esta logueado vamos a generar un TOKEN

para esto vamos a usar JSON WEB TOKEN

npm i jsonwebtoken

despues de guardar el usuario vamos a crear el token

primero en la carpeta libs vamos a crear el archivo jwt.js

import { TOKEN_SECRET } from "../config";

export function createAccesToken(payload) {
return new Promise((resolve, reject) => {
jwt.sign(payload, TOKEN_SECRET, { expiresIn: "1d" }, (err, token) => {
if (err) reject(err);
resolve(token);
});
});
}

en config.js vamos a crear el TOKEN_SECRET y lo vamos a importar y ya despues en el controler vamos a guardar el token en la coookie quedaria asi

export const register = async (req, res) => {
const { email, password, username } = req.body;

try {
const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();

    const token = await createAccesToken({ id: userSaved._id });
    res.cookie("token", token);
    res.json(userSaved);

} catch (error) {
res.status(500).json({ message: error.message });
}
};

creamos el token y lo guardamos en una cookie

AHORA VAMOS A CREAR EL LOGIN

COPIAMOS TODO LO DEL REGISTER Y VAMOS A HACER ALGUNOS CAMBIOS

el req.body ya no necesitamos que envie el username solo email y password

ya no necesitamos encriptar la contraseña pero si necesitamos compararla

esti lo hacemos con bcrypt.compare

despues comparamos siu la clave encontrada es igual a la que pas el usuario

y seteamos un token con el id del usuario encontrado

quedaria asi
export const login = async (req, res) => {
const { email, password } = req.body;

try {
const userFound = await User.findOne({ email });

    if (!userFound) return res.status(400).json({ message: "user not found" });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch)
      return res.status(400).json({ message: "invalid credential" });

    const token = await createAccesToken({ id: userFound._id });
    res.cookie("token", token);
    res.json(userFound);

} catch (error) {
res.status(500).json({ message: error.message });
}
};

ahora crearemos el logout

lo que vamos a hacer es dejar el token en blanco

export const logout = async (req, res) => {
res.cookie("token", "", { expires: new Date(0) });
return res.sendStatus(200);
};

AHORA VAMOS A CREAR UNA FUNCION PARA SABER SI EL USUARIO ESTA AUTENTICADO O NO

en middelwares vamos a crear una funcion que se llame validateToken

se crea en middlewares por que son funciones q se ejecutan antes q lleguen a la ruta

vamos a instalar npm i cookie-parser

y vamos a agregarlo a app

import cookieParser from "cookie-parser

app.use(cookieParser());
ahora en nuestro validateTOken
vamos a extraer el token de req.cookie con
const { token } = req.cookies;

y vamos a usar verify de jwt para validar el token para esto necesitamos pasarle el token el token secret q tenemos en el config y a esto vamos a agregarle una callbak que nos diga si hubo un error o si se obtuvo el usuario

import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import { login } from "../controllers/auth.controller.js";

export const authRequiered = (req, res, next) => {
const { token } = req.cookies;
if (!token) return res.status(401).json({ message: "no token, denegado" });
jwt.verify(token, TOKEN_SECRET, (err, user) => {
if (err) res.status(403).json({ message: "invalid token" });
console.log(user);

req.user = user

});
next();
};

guardo en req.user el usuario para poder acceder desde todas las rutas

despues en mi auth controller puedo mandar al front el usuario cuando hago un get del profile

export const profile = async (req, res) => {
console.log(req.user.id);
const userFound = await User.findById(req.user.id);
if (!userFound) return res.status(400).json({ message: "user not found" });

return res.json(userFound);
};

AHORA VAMOS A CREAR OTRA RUTA PROTEGIDA TASKS

en la carpeta routeas agregamos el archivo tasks.routes.js

importamos {router} from express
importamos el {authrequiered }del validatetoken

inicializamos las rutas con

router.get("/tasks , authRequiered , funcion)

exportamos export default router

agregamos en app

importamos taskRouter de la carpeta de task.router.js

y iniciamos las rutas app.use("/api", taskRoutes);

AHORA VAMOS A CREAR EL CRUD DE TASK

dentro de nuestro taskRoutes vamos a crear todas las rutas

get get:id oist delete y put

router.get("/tasks", authRequiered, getTasks);
router.get("/tasks/:id", authRequiered, getTask);
router.post("/tasks", authRequiered, createTasks);
router.delete("/tasks/:id", authRequiered, deleteTasks);
router.put("/tasks/:id", authRequiered, updateTasks);

y en el controller le damos la funcionalidad

vamos a crear funciones asyncronas para poder hacer el crud

vamos a importar Task que es el modulo q creamos

import Task from "../models/task.model.js";

y con esto vamos a usar los metodos de mongoose para treaernos la data

AHORA VAMOS A ASIGNAR LA TAREA AL USUARIO

Lo primero que vamos a hacer es en Nuestro task model asignarle un usuario
del tipo mongooose id

user: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
require: true,
},

    con esto le asignamos la tarea a un usuario en particualar ahora para que esta tarea se le asigne al usuario conectado vamos a ir a el task.controller y en el create le vamos a agregar  a la newTask el user que va a ser   user: req.user.id,

    este req.user se guarda cuando hacemos el validate

    ahora si quiero que al momento de traerme la tarea tambien me traiga los datos del usuario lo que hacemos es en  el getUserTask le agregamos un .populate

export const getUserTasks = async (req, res) => {
const tasks = await Task.find({
user: req.user.id,
}).populate("user");
res.json(tasks);
};

AGREGAR VALIDACIONES PARA LOS DATOS DEL USUARIO

vamos a utilizar ZOD npm i zod

en nuestra carpeta schemas vamos a crear el esquema q queremos validarimport { z } from "zod";

export const registerSchema = z.object({
username: z.string({
required_error: "Username is requiered",
}),
email: z
.string({
required_error: "Email is requiered",
})
.email({
required_error: "Email invalido",
}),
password: z
.string({
required_error: "Password is requiered",
})
.min(6, {
message: "El password deve tener al menos 6 caracteres",
}),
});

export const loginSchema = z.object({
email: z
.string({
required_error: "Email is requiered",
})
.email({
required_error: "Email invalido",
}),
password: z
.string({
required_error: "Password is requiered",
})
.min(6, {
message: "El password deve tener al menos 6 caracteres",
}),
});

para utilizarlo vamos a crear un middleware

const validateSchema = ( schema)=>(req,res,next)=>{
try {
schema.parse(req.body)
next()
} catch (error) {
return res.status(400).json({
error
})
}
}

ahora vamos a nuestro auth.routes y vamos a utilizar el middleware en la ruta de registro y login

con esto terminariamos las validaciones podemos agregar mas si quisieramos en task por ejemplo
