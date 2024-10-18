import express from 'express';
import router from './src/router/index'
import errorHandler from './src/middlewares/errorHandler';
import sequelize from './src/database/models/index';	
import logger from './src/middlewares/logger';

const app = express();

app.use(logger);

app.use(express.json());

app.use('/api', router);

app.use(errorHandler);

sequelize.sync({
        force: true //no llegue a armar migraciones :(
})
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((err: any) => {
        console.log(err)
    });
