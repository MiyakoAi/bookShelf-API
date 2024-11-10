import Hapi from '@hapi/hapi';
import dotenv from 'dotenv';
import routes from './routes/routes.js';

dotenv.config();

const PORT = process.env.PORT || 9000;

const runServer = async () => {
    const server = Hapi.server({
        port: PORT,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    server.route(routes);

    await server.start();
    console.info(`Server berjalan dengan baik di http://${server.info.host}:${server.info.port}`);
};

runServer();
