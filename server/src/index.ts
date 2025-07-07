import app from './app';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//run the database connection
import {run} from './db/mongo';
run().catch(console.dir);