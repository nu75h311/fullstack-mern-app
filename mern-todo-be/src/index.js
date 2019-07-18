import 'dotenv/config';

import server from './server';
import { connectDb } from './models';

connectDb().then(async () => {
    server.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT} in ${process.env.NAME} mode`);
    });
});