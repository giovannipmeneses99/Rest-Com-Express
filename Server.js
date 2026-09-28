const express = require('express');
const app = express();

app.use(express.json());

let livros = [
    { id: 1, titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", ano: 1954 },
    { id: 2, titulo: "Dom Casmurro", autor: "Machado de Assis", ano: 1899 }
];

app.get('/livros', (req, res) => {
    res.json(livros);
});

app.get('/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const livro = livros.find(l => l.id === id);

    if (!livro) {
        return res.status(404).json({ erro: "Livro não encontrado." });
    }

    res.json(livro);
});

app.post('/livros', (req, res) => {
    const { titulo, autor, ano } = req.body;

    if (!titulo || !autor || !ano) {
        return res.status(400).json({ erro: "Os campos titulo, autor e ano são obrigatórios." });
    }

    const novoLivro = {
        id: livros.length > 0 ? livros[livros.length - 1].id + 1 : 1,
        titulo,
        autor,
        ano
    };

    livros.push(novoLivro);
    res.status(201).json(novoLivro);
});

app.put('/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, autor, ano } = req.body;
    const index = livros.findIndex(l => l.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: "Livro não encontrado." });
    }

    if (!titulo || !autor || !ano) {
        return res.status(400).json({ erro: "Os campos titulo, autor e ano são obrigatórios para atualização." });
    }

    livros[index] = { id, titulo, autor, ano };
    res.json(livros[index]);
});

app.delete('/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = livros.findIndex(l => l.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: "Livro não encontrado." });
    }

    livros.splice(index, 1);
    res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} (http://localhost:${PORT})`);
});