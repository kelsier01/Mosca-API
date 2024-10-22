import { DataTypes } from 'sequelize';
import bd from '../bd/connection';
import Trampa from './Trampa';
import Predio from './Predio';
import EstadoDeteccion from './EstadoDeteccion';
import Alerta from './Alerta';


const Deteccion = bd.define('detecciones',{
  trampa_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  imagen: {
    type: DataTypes.STRING(300000),
    allowNull: false,
  },
  predio_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estado_deteccion_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    unique: true,
  },
});

Deteccion.belongsTo(Trampa, { foreignKey: 'trampa_id' });
Deteccion.belongsTo(Predio, { foreignKey: 'predio_id' });
Deteccion.belongsTo(EstadoDeteccion, { foreignKey: 'estado_deteccion_id' });
// Deteccion.hasMany(Alerta, { foreignKey: 'deteccion_id' });

export default Deteccion;
