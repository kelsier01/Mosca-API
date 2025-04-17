import { Request, Response } from 'express';
import Duenio from '../models/Duenio';
import Persona from '../models/Persona';

export const getDuenios = async (req: Request, res: Response) => {
  try {
    const duenios = await Duenio.findAll({
      include: [{
        model: Persona,
        as: 'persona'
      }]
    });
    res.json(duenios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener dueños', error });
  }
};

export const getDuenio = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;
    const duenio = await Duenio.findByPk(id, {
      include: [{
        model: Persona,
        as: 'persona'
      }]
    });
    
    if (duenio) {
      res.json(duenio);
    } else {
      res.status(404).json({ message: `Dueño con ID ${id} no encontrado` });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener dueño', error });
  }
};

export const postDuenio = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const newDuenio = await Duenio.create(body);
    
    // Buscar el dueño recién creado con sus datos de persona
    const duenioConPersona = await Duenio.findByPk(newDuenio.getDataValue('id'), {
      include: [{
        model: Persona,
        as: 'persona'
      }]
    });
    
    res.json(duenioConPersona);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear dueño', error });
  }
};

export const putDuenio = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const duenio = await Duenio.findByPk(id);
    if (!duenio) {
      return res.status(404).json({
        msg: "No existe el dueño"
      });
    }
    await duenio.update(body);
    
    // Obtener el dueño actualizado con sus datos de persona
    const duenioActualizado = await Duenio.findByPk(id, {
      include: [{
        model: Persona,
        as: 'persona'
      }]
    });
    
    res.json(duenioActualizado);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al actualizar dueño"
    });
  }
};

export const deleteDuenio = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const duenio = await Duenio.findByPk(id);
    if (!duenio) {
      return res.status(404).json({
        msg: `No existe un dueño con el id ${id}`
      });
    }
    
    // En lugar de eliminar el registro físicamente, actualizamos el estado a 0 (inactivo)
    await duenio.update({ estado: 0 });
    res.json({ msg: 'Dueño desactivado correctamente' });
    
    // Si prefieres eliminar físicamente el registro, descomenta esta línea y comenta la anterior
    // await duenio.destroy();
    // res.json({ msg: 'Dueño eliminado correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al eliminar dueño"
    });
  }
};
