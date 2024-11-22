import { Request, Response } from 'express';
import FuncionarioHasTrampa from '../models/FuncionarioHasTrampa';
import Funcionario from '../models/Funcionario';
import Trampa from '../models/Trampa';
import Rol from '../models/Rol';

// Obtener todos los FuncionarioHasTrampa
export const getFuncionarioHasTrampas = async (req: Request, res: Response) => {
  try {
    const funcionarioHasTrampas = await FuncionarioHasTrampa.findAll({
      include: [
        {
          model: Funcionario,
          as: 'funcionario',
        },
        {
          model: Trampa,
          as: 'trampa',
        },
        {
          model: Rol,
          as: 'rol',
        }
      ],
    });
    res.json(funcionarioHasTrampas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener FuncionarioHasTrampas', error });
  }
};

// Obtener un FuncionarioHasTrampa por ID
export const getFuncionarioHasTrampa = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;
    const funcionarioHasTrampa = await FuncionarioHasTrampa.findByPk(id, {
      include: [
        {
          model: Funcionario,
          as: 'funcionario',
        },
        {
          model: Trampa,
          as: 'trampa',
        },
        {
        model: Rol,
        as: 'rol',
        }
      ],
    });

    if (funcionarioHasTrampa) {
      res.json(funcionarioHasTrampa);
    } else {
      res.status(404).json({ message: `FuncionarioHasTrampa con ID ${id} no encontrado` });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener FuncionarioHasTrampa', error });
  }
};

// Crear un FuncionarioHasTrampa
export const postFuncionarioHasTrampa = async (req: Request, res: Response) => {
  const { funcionario_id, trampa_id, rol_id } = req.body;

  try {
    // Crear FuncionarioHasTrampa
    const newFuncionarioHasTrampa = await FuncionarioHasTrampa.create({ funcionario_id, trampa_id, rol_id });
    res.json(newFuncionarioHasTrampa);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear FuncionarioHasTrampa', error });
  }
};

// Actualizar un FuncionarioHasTrampa
export const putFuncionarioHasTrampa = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const funcionarioHasTrampa = await FuncionarioHasTrampa.findByPk(id);

    if (!funcionarioHasTrampa) {
      return res.status(404).json({ msg: "No existe el FuncionarioHasTrampa" });
    }

    await funcionarioHasTrampa.update(body);
    res.json(funcionarioHasTrampa);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al actualizar FuncionarioHasTrampa" });
  }
};

// Eliminar un FuncionarioHasTrampa
export const deleteFuncionarioHasTrampa = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const funcionarioHasTrampa = await FuncionarioHasTrampa.findByPk(id);

    if (!funcionarioHasTrampa) {
      return res.status(404).json({ msg: `No existe un FuncionarioHasTrampa con el id ${id}` });
    }

    await funcionarioHasTrampa.destroy();
    res.json(funcionarioHasTrampa);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar FuncionarioHasTrampa', error });
  }
};
