import { Request, Response } from 'express';
import Alerta from '../models/Alerta';


export const getAlertas = async (req: Request, res: Response) => {
  try {
    const alertas = await Alerta.findAll();
    res.json(alertas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener alertas', error });
  }
};

export const getAlerta = async (req: Request, res: Response) => {
  try {
    const { id }:any = req.params;
    const alerta = await Alerta.findByPk(id);
    if (alerta) {
      res.json(alerta);
    } else {
      res.status(404).json({ message: `Alerta con ID ${ id } no encontrada` });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener alerta', error });
  }
};

export const postAlerta = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const newAlerta = await Alerta.create(req.body);
    res.json(newAlerta);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear alerta', error });
  }
};

export const putAlerta= async (req: Request, res: Response) => {
  const {id} = req.params;
  const {body} = req;

  try {
    const alerta = await Alerta.findByPk(id);
    if(!alerta){
      return res.status(404).json({
        msg:"No existe la alerta"
      });
    }
    await alerta.update(body);
    res.json(alerta);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mesg:"Error al crear alerta"
    })
  }
}

export const deleteAlerta = async(req: Request, res:Response) =>{
  const { id } = req.params;
  const alerta = await Alerta.findByPk(id);
  if (!alerta) {
    return res.status(404).json({
      msg: `No existe un servicio con el id ${id}`,
    });
  }
  await alerta.destroy();
  res.json(alerta);
}
