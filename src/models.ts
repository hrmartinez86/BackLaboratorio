import sequelize from './models/index';
import Lab from './models/Lab';
import User from './models/User';
import Study from './models/Study';
import Test from './models/Test';
import Result from './models/Result';

// Exportar todos los modelos
export { Lab, User, Study, Test, Result };

// Exportar sequelize para acceso global
export default sequelize;
