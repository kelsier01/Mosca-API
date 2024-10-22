import { Request, Response } from 'express';
import Funcionario from '../models/Funcionario';

export const getFuncionarios = async (req: Request, res: Response) => {
  try {
    const funcionario = await Funcionario.findAll();
    res.json(funcionario);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener Funcionario', error });
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
  const { body } = req;
  try {
    const newfuncionario = await Funcionario.create(req.body);
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