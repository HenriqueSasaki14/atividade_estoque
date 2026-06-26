import express from 'express'
import {prisma} from "./lib/prisma.ts"

const app = express();
const port = 3000;

app.use(express.json());


app.post('/produtos', async (req, res) => {
    const {nome, categoria, quantidade} = req.body;
    try {
        const novoProduto = await prisma.produto.create({
            data: {
                nome,
                categoria,
                quantidade: parseInt(quantidade, 10)
            }
        })
        return res.status(201).json(novoProduto);
    } catch (error) {
    return res.status(500).json({error: "Erro ao cadastrar produto"});
    }
})

app.listen(port, () => {console.log("Servidor rodando");
})