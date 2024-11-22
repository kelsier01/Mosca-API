import { DataTypes } from 'sequelize';
import Predio from './Predio';
import Deteccion from './Deteccion';
import FuncionarioHasTrampa from './FuncionarioHasTrampa';
import bd from '../bd/connection';
import Usuario from './Usuario';

const Trampa = bd.define('trampas',{
  predio_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  usuario_id:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  direccion_mac: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  modelo: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  coordenadas: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

Trampa.belongsTo(Predio, { foreignKey: 'predio_id', as:'predio'});
Trampa.belongsTo(Usuario, { foreignKey: 'usuario_id', as:'usuario' });
// Trampa.hasMany(Deteccion, { foreignKey: 'trampa_id' });
// Trampa.hasMany(FuncionarioHasTrampa, { foreignKey: 'trampa_id' });

export default Trampa;
