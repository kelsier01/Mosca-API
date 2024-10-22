import { DataTypes } from 'sequelize';
import bd from '../bd/connection';
import Persona from './Persona';

const Usuario = bd.define('usuarios',{
  email: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});
// Usuario.prototype.toJSON = function () {
//   let values = Object.assign({}, this.get());

//   delete values.password;
//   return values;
// };

// Usuario.hasOne(Persona, { foreignKey: 'usuario_id' });

export default Usuario;
