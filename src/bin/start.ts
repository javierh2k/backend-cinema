import * as dotEnvSafe from 'dotenv-safe';
dotEnvSafe.config();

import { startServer } from '../config/app';

startServer();
