import { Request, Response } from 'express';
import Funcionario from '../models/Funcionario';
import Rol from '../models/Rol';
import Persona from '../models/Persona';
import Usuario from '../models/Usuario';
import { crearUsuario } from './usuarioController';

export const getFuncionarios = async (req: Request, res: Response) => {
  try {
    const funcionarios = await Funcionario.findAll({
      include: [
        {
          model: Persona,
          as: 'persona',
          include: [
            {
              model: Usuario,
              as: 'usuario',
            },
          ],
        },
        {
          model: Rol,
          as: 'rol',
        },
      ],
    });
    res.json(funcionarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener Funcionarios', error });
  }
};

export const getFuncionario = async (req: Request, res: Response) => {
  try {
    const { id }:any = req.params;
    const funcionario = await Funcionario.findByPk(id);
    if (funcionario) {
      res.json(funcionario);
    } else {
      res.status(404).json({ message: `funcionario con ID ${ id } no encontrada` });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener funcionario', error });
  }
};

export const postFuncionario = async (req: Request, res: Response) => {
  const { email, password, rut, nombre, apellido, telefono, rol } = req.body;
  
  try {
    //Crear usuario
    const { id: usuario_id }:any = await crearUsuario(email, password);

    //Crear persona
    const newPersona = await Persona.create({ usuario_id, rut, nombre, apellido, telefono });

    //Crear funcionario
    const newfuncionario = await Funcionario.create({ persona_id: newPersona.getDataValue('id'), rol_id: rol });

    res.json(newfuncionario);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear funcionario', error });
  }
};

export const putFuncionario= async (req: Request, res: Response) => {
  const {id} = req.params;
  const {body} = req;

  try {
    const funcionario = await Funcionario.findByPk(id);
    if(!funcionario){
      return res.status(404).json({
        msg:"No existe la funcionario"
      });
    }
    await funcionario.update(body);
    res.json(funcionario);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mesg:"Error al crear funcionario"
    })
  }
}

export const deleteFuncionario = async(req: Request, res:Response) =>{
  const { id } = req.params;
  const funcionario = await Funcionario.findByPk(id);
  if (!funcionario) {
    return res.status(404).json({
      msg: `No existe un servicio con el id ${id}`,
    });
  }
  await funcionario.destroy();
  res.json(funcionario);
}