import { DataTypes } from 'sequelize';
import bd from '../bd/connection';
import Funcionario from './Funcionario';
import Trampa from './Trampa';
import Rol from './Rol';


const FuncionarioHasTrampa = bd.define('funcionarios_has_trampas', {
  funcionario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  trampa_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rol_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

FuncionarioHasTrampa.belongsTo(Funcionario, { as: 'funcionario', foreignKey: 'funcionario_id' });
FuncionarioHasTrampa.belongsTo(Trampa, { as: 'trampa', foreignKey: 'trampa_id' });
FuncionarioHasTrampa.belongsTo(Rol, { as:'rol', foreignKey: 'rol_id' });

export default FuncionarioHasTrampa;
