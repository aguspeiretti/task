import { z } from "zod";

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
      message: "El password debe tener al menos 6 caracteres",
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
