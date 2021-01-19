import { SequelizeModule } from '@nestjs/sequelize';

export const sequalizeConfig: SequelizeModule = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'nest_db',
    autoLoadModels: true,
    synchronize: true,
}