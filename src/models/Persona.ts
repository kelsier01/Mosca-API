import { DataTypes } from 'sequelize';
import Usuario from './Usuario';
import bd from '../bd/connection';
import Duenio from './Duenio';
import Funcionario from './Funcionario';


const Persona = bd.define('personas', {
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  rut: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

Persona.belongsTo(Usuario, { foreignKey: 'usuario_id' });
// Persona.hasOne(Duenio, { foreignKey: 'persona_id' });
// Persona.hasOne(Funcionario, { foreignKey: 'persona_id' });

export default Persona;
