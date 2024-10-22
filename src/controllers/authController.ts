// import Users from "../models/usuario";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Users from "./../models/Usuario";
import Trampas from "./../models/Trampa";
import FuncionariosHasTrampa from "../models/FuncionarioHasTrampa"
import { generarjwt } from "../helpers/generarJWT";

//Recibe las peticiones request y response
export const login = async (req: Request, res: Response) => {
  //recibe una request
  const { email, password } = req.body;
  try {
    //Busca el email y el password del objeto req.body
    const user: any = await Users.findOne({
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

    const validPassword = bcrypt.compareSync(password, user.password);
    console.log(validPassword);

    if (!validPassword) {
      return res.status(400).json({
        msg: `La contraseña no es valida para este usuario`,
      });
    }
    //Si todos los datos ya fueron validados y confirmamos que son los correspondientes
    //Entonces definimos 
    //name e id como variables con el valor extraido del objeto user con atributos del mismo nombre, eso se llama destructuring
    const { name, id } = user;
    // Crearemos un payload con los valores de name y id, esto esta encriptado
    const payload = { name, id };
    //Creamos un token con el payload creado
    const token = await generarjwt(payload);
    //Con el token podemos realizar una response desde la api

    res.status(200).json({
      msg: "login Ok",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Algo salio mal, Hable con el Administrador",
    });
  }
};

export const login_trampa = async (req: Request, res: Response) =>{
  const { email, password } = req.body;
  try {
    //Busca el email y el password del objeto req.body
    const user: any = await Users.findOne({
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
    const validPassword = bcrypt.compareSync(password, user.password);
    console.log(validPassword);

    if (!validPassword) {
      return res.status(400).json({
        msg: `La contraseña no es valida para este usuario`,
      });
    }
    //Si todos los datos ya fueron validados y confirmamos que son los correspondientes
    //Entonces definimos 
    //name e id como variables con el valor extraido del objeto user con atributos del mismo nombre, eso se llama destructuring
    const { name, id } = user;
    // Crearemos un payload con los valores de name y id, esto esta encriptado
    const payload = { name, id };
    //Creamos un token con el payload creado
    const token = await generarjwt(payload);
    //Con el token podemos realizar una response desde la api

    const trap:any = await Trampas.findOne({
      where:{
        usuario_id: user.id
      }
    });
    const funcionarios = await FuncionariosHasTrampa.findAll({
      where:{
        trampa_id: trap.id
      }
    })

    res.status(200).json({
      email: user.email,
      password: password,
      trampa_id: trap.id,
      predio_id: trap.predio_id,
      funcionarios
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Algo salio mal, Hable con el Administrador",
    });
  }
}