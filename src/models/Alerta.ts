import { DataTypes } from 'sequelize';
import bd from '../bd/connection';
import Funcionario from './Funcionario';
import Deteccion from './Deteccion';


const Alerta = bd.define('alertas',{
  funcionario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  deteccion_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

Alerta.belongsTo(Funcionario, { foreignKey: 'funcionario_id' });
Alerta.belongsTo(Deteccion, { foreignKey: 'deteccion_id' });

export default Alerta;
