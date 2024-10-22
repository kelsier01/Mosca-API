import { Request, Response } from 'express';
import Trampa from '../models/Trampa';

export const getTrampas = async (req: Request, res: Response) => {
  try {
    const trampa = await Trampa.findAll();
    res.json(trampa);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener trampa', error });
  }
};

export const getTrampa = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const trampa = await Trampa.findByPk(id);
    if (trampa) {
      res.json(trampa);
    } else {
      res.status(404).json({ message: `trampa con ID ${ id } no encontrada` });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener trampa', error });
  }
};

export const postTrampa = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const newtrampa = await Trampa.create(body);
    res.json(newtrampa);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear trampa', error });
  }
};

export const putTrampa = async (req: Request, res: Response) => {
  const {id} = req.params;
  const {body} = req;

  try {
    const trampa = await Trampa.findByPk(id);
    if(!trampa){
      return res.status(404).json({
        msg:"No existe la trampa"
      });
    }
    await trampa.update(body);
    res.json(trampa);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mesg:"Error al crear trampa"
    })
  }
}

export const deleteTrampa = async(req: Request, res:Response) =>{
  const { id } = req.params;
  const trampa = await Trampa.findByPk(id);
  if (!trampa) {
    return res.status(404).json({
      msg: `No existe una trampa con el id ${id}`,
    });
  }
  await trampa.destroy();
  res.json(trampa);
}