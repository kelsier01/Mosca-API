import { Request, Response } from 'express';
import Deteccion from '../models/Deteccion';
import Alerta from '../models/Alerta';
import FuncionarioHasTrampa from '../models/FuncionarioHasTrampa';
import Server from '../models/Server';

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
  const { trampa_id } = req.body;
  const funcionarios_has_trampas = await FuncionarioHasTrampa.findAll({ 
    where: { trampa_id }
  });
  try {
    const newDeteccion = await Deteccion.create(req.body);

    const alerta = funcionarios_has_trampas.forEach((funcionario_has_trampa)=>{
      Alerta.create({
        funcionario_id: funcionario_has_trampa.getDataValue('funcionario_id'),
        deteccion_id: newDeteccion.getDataValue('id'),
      });
    });

    // Notificar a los clientes WebSocket
    const server = Server.getInstance(); // Obtén la instancia del servidor
    server.notifyClients("nuevaAlerta", newDeteccion);


    res.json({newDeteccion, alerta});
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