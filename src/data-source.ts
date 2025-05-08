import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import * as path from 'path';

// Load environment variables from .env file
config();

// Relative import for the entity (No need to use path.join for imports)
import { Challenge } from './challenge/entities/challenge.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Challenge], // Add all your entities here
  synchronize: false, // Enable synchronization in development
  migrations: [path.join(__dirname, 'migrations', '*.ts')], // Use path.join for migrations
  subscribers: [],
});
