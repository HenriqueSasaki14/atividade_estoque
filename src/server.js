import express from 'express'
import {prisma} from "./lib/prisma.ts"
import cors from "cors"

const app = express();
const port = 3000;

app.use(express.json());


app.get("/produtos", async (req, res) => {
    try {
        const itens = await prisma.produto.findMany()
        res.json(itens)
    } catch(error) {
        res.status(500).json({error: "Erro ao buscar itens"})
    }
})

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
    return res.status(400).json({error: "Erro ao criar produto"});
    }
})

app.put('/produtos/:id', async (req, res) => {
    const {id} = req.params
    const {nome, categoria, quantidade} = req.body

    try {
        const atualizacaoItem = await prisma.produto.update({
            where: {id: Number(id)},
            data: {nome, categoria, quantidade: Number(quantidade)}
        })
    } catch(error) {
        res.status(404).json({error: "Produto não encontrado"})
    }
})

app.delete ('/produtos/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const deleteProduto = await prisma.Produto.delete({
            where: {id: Number(id)}
        });
        res.status(204).json("macaco apagado com sucesso");
    }
    catch(error){
        res.status(400).json("chimpa não apagado!");
    }

    })

app.listen(port, () => {console.log("Servidor rodando na porta 3000");
})