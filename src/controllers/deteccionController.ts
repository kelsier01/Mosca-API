import { Request, Response } from 'express';
import Deteccion from '../models/Deteccion';

export const getDetecciones = async (req: Request, res: Response) => {
  try {
    const detecciones = await Deteccion.findAll();
    res.json({detecciones});
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener detecciones', error });
  }
};

export const getDeteccion = async (req: Request, res: Response) => {
  try {
    const { id }:any = req.params;
    const deteccion = await Deteccion.findByPk(id);
    if (deteccion) {
      res.json(deteccion);
    } else {
      res.status(404).json({ message: `Deteccion con ID ${ id } no encontrada` });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener Deteccion', error });
  }
};

export const postDeteccion = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const newDeteccion = await Deteccion.create(req.body);
    res.json(newDeteccion);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear Deteccion', error });
  }
};

export const putDeteccion= async (req: Request, res: Response) => {
  const {id} = req.params;
  const {body} = req;

  try {
    const deteccion = await Deteccion.findByPk(id);
    if(!deteccion){
      return res.status(404).json({
        msg:"No existe la Deteccion"
      });
    }
    await deteccion.update(body);
    res.json(deteccion);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mesg:"Error al crear Deteccion"
    })
  }
}

export const deleteDeteccion = async(req: Request, res:Response) =>{
  const { id } = req.params;
  const deteccion = await Deteccion.findByPk(id);
  if (!deteccion) {
    return res.status(404).json({
      msg: `No existe una deteccion con el id ${id}`,
    });
  }
  await deteccion.destroy();
  res.json(Deteccion);
}