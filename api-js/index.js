import express from 'express';
import router from './router.js';
import db from './database.js';
import './modelIndex.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/', router);

try {
    await db.authenticate();
    await db.sync();
    console.log("Eba!");
} catch (error) {
    console.log("Não eba...");
}

app.listen(port, () => {
    console.log(`Rodando na porta ${port}.`);
});