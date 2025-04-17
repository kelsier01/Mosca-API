import { Request, Response } from 'express';
import Predio from "../models/Predio"
import Duenio from '../models/Duenio';
import Persona from '../models/Persona';
import Usuario from '../models/Usuario';

export const getPredios = async (req: Request, res: Response) => {
  try {
    const predios = await Predio.findAll({
      include: [{
        model: Duenio,
        as: 'duenio',
        include: [
          {
            model: Persona,
            as: 'persona',
            include: [
              {
                model: Usuario,
                as: 'usuario',
              }],
          },
        ],
      }],
    });
    res.json(predios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener personas', error });
  }
};

export const getPredio = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const predio = await Predio.findByPk(id);
    if (predio) {
      res.json(predio);
    } else {
      res.status(404).json({ message: `predio con ID ${ id } no encontrada` });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener predio', error });
  }
};

export const postPredio = async (req: Request, res: Response) => {
  const { duenio_id, direccion, estado } = req.body;
  try {
    const newpredio = await Predio.create({
      duenio_id,
      direccion,
      estado
    });
    res.json(newpredio);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear nuevo pedido', error });
  }
};

export const putPredio = async (req: Request, res: Response) => {
  const {id} = req.params;
  const {body} = req;

  try {
    const predio = await Predio.findByPk(id);
    if(!predio){
      return res.status(404).json({
        msg:"No existe la predio"
      });
    }
    await predio.update(body);
    res.json(predio);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mesg:"Error al crear predio"
    })
  }
}

export const deletePredio = async(req: Request, res:Response) =>{
  const { id } = req.params;
  const predio = await Predio.findByPk(id);
  if (!predio) {
    return res.status(404).json({
      msg: `No existe una predio con el id ${id}`,
    });
  }
  await predio.destroy();
  res.json(predio);
}