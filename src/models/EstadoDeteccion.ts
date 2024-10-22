import { DataTypes } from 'sequelize';
import bd from '../bd/connection';
import Deteccion from './Deteccion';

const EstadoDeteccion = bd.define('estados_detecciones', {
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
});

// EstadoDeteccion.hasOne(Deteccion, { foreignKey: 'estado_deteccion_id' });

export default EstadoDeteccion;
