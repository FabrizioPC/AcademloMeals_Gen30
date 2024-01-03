import { Sequelize } from 'sequelize';
import { envs } from '../enviroments/enviroments.js';

export const sequelize = new Sequelize(envs.DB_URI, {
  logging: false,
});

export const authenticated = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established succesfully. 😁');
  } catch (error) {
    throw new Error('Error al autenticar: ', error);
  }
};
export async function syncUp() {
  try {
    await sequelize.sync();
    console.log('Connection has been synced succesfully. 😀');
  } catch (error) {
    throw new Error('Error al sincronizar: ', error);
  }
}

export default sequelize;
