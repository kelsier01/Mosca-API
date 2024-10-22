import { DataTypes } from 'sequelize';
import bd from '../bd/connection';
import Funcionario from './Funcionario';
import FuncionarioHasTrampa from './FuncionarioHasTrampa';

const Rol = bd.define('roles', {
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Rol.hasOne(Funcionario, { foreignKey: 'rol_id' });
// Rol.hasOne(FuncionarioHasTrampa, { foreignKey: 'rol_id' });

export default Rol;
