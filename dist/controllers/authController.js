"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login_trampa = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Usuario_1 = __importDefault(require("../models/Usuario"));
const Trampa_1 = __importDefault(require("../models/Trampa"));
const FuncionarioHasTrampa_1 = __importDefault(require("../models/FuncionarioHasTrampa"));
//Recibe las peticiones request y response
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //recibe una request
    const { email, password } = req.body;
    try {
        //Busca el email y el password del objeto req.body
        const user = yield Usuario_1.default.findOne({
            where: {
                email,
            },
        });
        //Si el usuario no existe
        if (!user) {
            return res.status(400).json({
                msg: `El usuario con el email ${email} no existe`,
            });
        }
        //Si el estado del usuario es false
        if (user.estado == 0) {
            return res.status(400).json({
                msg: `El usuario se encuentra desabilitado`,
            });
        }
        //Comienza la validacion de los datos
        console.log(password);
        console.log(user.password);
        const validPassword = bcrypt_1.default.compareSync(password, user.password);
        console.log(validPassword);
        if (!validPassword) {
            return res.status(400).json({
                msg: `La contraseña no es valida para este usuario`,
            });
        }
        //Si todos los datos ya fueron validados y confirmamos que son los correspondientes
        //Entonces definimos 
        //name e id como variables con el valor extraido del objeto user con atributos del mismo nombre, eso se llama destructuring
        // const { name, id } = user;
        // Crearemos un payload con los valores de name y id, esto esta encriptado
        // const payload = { name, id };
        //Creamos un token con el payload creado
        // const token = await generarjwt(payload);
        //Con el token podemos realizar una response desde la api
        res.status(200).json({
            msg: "login Ok",
            user
            // token,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Algo salio mal, Hable con el Administrador",
        });
    }
});
exports.login = login;
const login_trampa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        //Busca el email y el password del objeto req.body
        const user = yield Usuario_1.default.findOne({
            where: {
                email,
            },
        });
        //Si el usuario no existe
        if (!user) {
            return res.status(400).json({
                msg: `El usuario con el email ${email} no existe`,
            });
        }
        //Si el estado del usuario es false
        if (user.estado == 0) {
            return res.status(400).json({
                msg: `El usuario se encuentra desabilitado`,
            });
        }
        //Comienza la validacion de los datos
        const validPassword = bcrypt_1.default.compareSync(password, user.password);
        console.log(validPassword);
        if (!validPassword) {
            return res.status(400).json({
                msg: `La contraseña no es valida para este usuario`,
            });
        }
        //Si todos los datos ya fueron validados y confirmamos que son los correspondientes
        //Entonces definimos 
        //name e id como variables con el valor extraido del objeto user con atributos del mismo nombre, eso se llama destructuring
        // const { name, id } = user;
        // Crearemos un payload con los valores de name y id, esto esta encriptado
        // const payload = { name, id };
        //Creamos un token con el payload creado
        // const token = await generarjwt(payload);
        //Con el token podemos realizar una response desde la api
        const trap = yield Trampa_1.default.findOne({
            where: {
                usuario_id: user.id
            }
        });
        const funcionarios = yield FuncionarioHasTrampa_1.default.findAll({
            where: {
                trampa_id: trap.id
            }
        });
        res.status(200).json({
            email: user.email,
            password: password,
            trampa_id: trap.id,
            predio_id: trap.predio_id,
            funcionarios
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Algo salio mal, Hable con el Administrador",
        });
    }
});
exports.login_trampa = login_trampa;
