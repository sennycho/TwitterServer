import { config } from '../config.js';
import SQ from 'sequelize';

const { host, user, database, password } = config.db

export const sequelize = new SQ.Sequelize(database, user, password, {
    host,
    dialect: 'mariadb',
    logging: false,    // 로그로 남길지
    timezone: "+09:00",
    port: '31060',
});