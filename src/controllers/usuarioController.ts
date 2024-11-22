import { Request, Response } from 'express';
import Usuario from '../models/Usuario';
import bcrypt from "bcrypt";

export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};

export const getUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ message: `usuario con ID ${ id } no encontrada` });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario', error });
  }
};

export const postUsuario = async (req: Request, res: Response) => {
  const { body } = req;
  const { email, password } = body;
  try {
    const existeEmail = await Usuario.findOne({
      where: {
        email,
      },
    });

    if (existeEmail) {
      return res.status(400).json({
        msg: "Ya existe un usuario con el email " + email,
      });
    }

    const salto = bcrypt.genSaltSync();
    const psswd = bcrypt.hashSync(password, salto);

    const usuario = await Usuario.create({ email, password: psswd });

    //res.json(psswd);
    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export const putUsuario= async (req: Request, res: Response) => {
  const {id} = req.params;
  const {body} = req;

  try {
    const usuario = await Usuario.findByPk(id);
    if(!usuario){
      return res.status(404).json({
        msg:"No existe la usuario"
      });
    }
    await usuario.update(body);
    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mesg:"Error al crear usuario"
    })
  }
}

export const deleteUsuario = async(req: Request, res:Response) =>{
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    return res.status(404).json({
      msg: `No existe una usuario con el id ${id}`,
    });
  }
  await usuario.destroy();
  res.json(usuario);
}


export const crearUsuario = async (email:string, password:string) => {
  try {
    const existeEmail = await Usuario.findOne({
      where: {
        email,
      },
    });
    if (existeEmail) {
      console.log("Correo ya registrado");
    }
    const salto = bcrypt.genSaltSync();
    const psswd = bcrypt.hashSync(password, salto);
    const usuario = await Usuario.create({ email, password: psswd });
    
    return usuario;
  } catch (error) {
    console.log(error);
  }
};

