import { DataTypes } from 'sequelize';
import Persona from './Persona';
import Predio from './Predio';
import bd from '../bd/connection';


const Duenio = bd.define('duenios',{
  persona_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

Duenio.belongsTo(Persona, { as:'persona', foreignKey: 'persona_id' });
// Duenio.hasMany(Predio, { foreignKey: 'duenio_id' });

export default Duenio;
