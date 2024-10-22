import { DataTypes } from 'sequelize';
import Duenio from './Duenio';
import Trampa from './Trampa';
import bd from '../bd/connection';

const Predio = bd.define('predios',{
  duenio_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

Predio.belongsTo(Duenio, { foreignKey: 'duenio_id' });
// Predio.hasMany(Trampa, { foreignKey: 'predio_id' });
export default Predio;
