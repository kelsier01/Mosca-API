import { Request, Response } from 'express';
import Persona from '../models/Persona';


export const getPersonas = async (req: Request, res: Response) => {
  try {
    const personas = await Persona.findAll();
    res.json(personas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener personas', error });
  }
};

export const getPersona = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const persona = await Persona.findByPk(id);
    if (persona) {
      res.json(persona);
    } else {
      res.status(404).json({ message: `Persona con ID ${ id } no encontrada` });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener persona', error });
  }
};

export const postPersona = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const newpersona = await Persona.create(body);
    res.json(newpersona);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear persona', error });
  }
};

export const putPersona= async (req: Request, res: Response) => {
  const {id} = req.params;
  const {body} = req;

  try {
    const persona = await Persona.findByPk(id);
    if(!persona){
      return res.status(404).json({
        msg:"No existe la persona"
      });
    }
    await persona.update(body);
    res.json(persona);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mesg:"Error al crear persona"
    })
  }
}

export const deletePersona = async(req: Request, res:Response) =>{
  const { id } = req.params;
  const persona = await Persona.findByPk(id);
  if (!persona) {
    return res.status(404).json({
      msg: `No existe una persona con el id ${id}`,
    });
  }
  await persona.destroy();
  res.json(persona);
}