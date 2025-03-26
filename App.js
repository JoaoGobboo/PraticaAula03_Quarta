const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('api_produtos', 'root', 'GIOben1010@', {
    host: 'localhost', // Defina o host como localhost
    dialect: 'mysql'   // Use 'mysql' como o dialeto
});

const Produto = sequelize.define('Produto', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    fornecedor: { type: DataTypes.STRING, allowNull: false },
    endereco_fornecedor: { type: DataTypes.STRING, allowNull: false },
    quantidade: { type: DataTypes.INTEGER, allowNull: false },
    endereco: { type: DataTypes.STRING, allowNull: false },
    preco_unitario: { type: DataTypes.FLOAT, allowNull: false }
});

sequelize.sync({ force: true }).then(async () => {
    console.log('Banco de dados sincronizado!');
    await Produto.bulkCreate([
        { nome: 'Produto A', fornecedor: 'Fornecedor X', endereco_fornecedor: 'Endereço X', quantidade: 10, endereco: 'Local X', preco_unitario: 15.50 },
        { nome: 'Produto B', fornecedor: 'Fornecedor Y', endereco_fornecedor: 'Endereço Y', quantidade: 20, endereco: 'Local Y', preco_unitario: 25.75 },
        { nome: 'Produto C', fornecedor: 'Fornecedor Z', endereco_fornecedor: 'Endereço Z', quantidade: 30, endereco: 'Local Z', preco_unitario: 35.00 },
        { nome: 'Produto D', fornecedor: 'Fornecedor W', endereco_fornecedor: 'Endereço W', quantidade: 40, endereco: 'Local W', preco_unitario: 45.25 }
    ]);
});

const app = express();
app.use(express.json());

app.get('/produtos', async (req, res) => {
    const produtos = await Produto.findAll();
    res.status(200).json(produtos);
});

app.post('/produtos', async (req, res) => {
    try {
        const produto = await Produto.create(req.body);
        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao criar produto' });
    }
});

app.put('/produtos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Produto.findByPk(id);
        if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });
        await produto.update(req.body);
        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar produto' });
    }
});

app.delete('/produtos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Produto.findByPk(id);
        if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });
        await produto.destroy();
        res.status(200).json({ mensagem: 'Produto removido com sucesso' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao remover produto' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
