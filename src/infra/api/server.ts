
import { app, setupDb } from "./express";
import * as dotenv from "dotenv";

dotenv.config();
const port: number = Number(process.env.PORT) || 3000;

async function startServer() {
  try {
    await setupDb();
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
