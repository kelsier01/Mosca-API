import { DataTypes } from 'sequelize';
import Persona from './Persona';
import Rol from './Rol';
import Alerta from './Alerta';
import FuncionarioHasTrampa from './FuncionarioHasTrampa';
import bd from '../bd/connection';

const Funcionario = bd.define('funcionarios',{
  persona_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  rol_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Funcionario.belongsTo(Persona, { foreignKey: 'persona_id' });
Funcionario.belongsTo(Rol, { foreignKey: 'rol_id' });
// Funcionario.hasMany(Alerta, { foreignKey: 'funcionario_id' });
// Funcionario.hasMany(FuncionarioHasTrampa, { foreignKey: 'funcionario_id' });

export default Funcionario;
