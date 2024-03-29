import 'dotenv/config'

import fastify from "fastify";
import cors from "@fastify/cors"
import jwt from '@fastify/jwt';
import { memoriesRoutes } from "./routes/memories";
import { authRoutes } from './routes/auth';
import multipart from '@fastify/multipart'
import { uploadRoutes } from './routes/upload';
import { resolve } from 'node:path';

const app = fastify()

//Esse metodo do fastify serve para registrar um arquivo de rotas separado
app.register(memoriesRoutes)
app.register(authRoutes)
app.register(uploadRoutes)
app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../upload'),
  prefix: '/upload'
})
app.register(multipart)
app.register(cors, { 
  origin: true, //Todas as URLs de front-end podem acessar nosso back-end
})
app.register(jwt,  {
  secret: 'jefnbih495hg05vn345nc3iweohgvsndogkjn34gb3w934i0rf943mwa0vc4i93ng9'
})

app.listen({
  port: 3333
}).then(() => {
  console.log(`😎 API is running on the port 3333`)
})