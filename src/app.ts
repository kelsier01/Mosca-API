import dotenv from 'dotenv';
dotenv.config();

import Server from './models/Server';

//Obtenemos la instancia del servidor
const server =  Server.getInstance();
server.listen();

