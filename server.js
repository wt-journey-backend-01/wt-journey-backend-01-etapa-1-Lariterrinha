const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// pega tudo da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.urlencoded({ extended: true }));

// Rota Raiz (GET /): pagina principal (cardápio)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Rota de Sugestão (GET /sugestao): Processa a sugestao com query string (?parametros)
app.get('/sugestao', (req, res) => {
    const nomeLanche = req.query.nome;
    const ingredientes = req.query.ingredientes;

    // pagina de agradecimento basicazinha
    res.send(`
        <html>
            <head>
                <title>Obrigado!</title>
                <link rel="stylesheet" href="/css/style.css">
            </head>
            <body>
                <div class="container">
                    <h1>Obrigado pela sua sugestão, ${nomeLanche}!</h1>
                    <p>Anotamos seu lanche com os ingredientes: ${ingredientes}.</p>
                    <p>Nossos chefs analisarão com carinho!</p>
                    <a href="/" class="btn">Voltar ao Cardápio</a>
                </div>
            </body>
        </html>
    `);
});

// Rota de Contato (GET /contato)
app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});

// Rota de Contato (POST /contato)
app.post('/contato', (req, res) => {
    const { nome, email, assunto, mensagem } = req.body;

    // pgina de confirmação 
    res.send(`
        <html>
            <head>
                <title>Contato Recebido</title>
                <link rel="stylesheet" href="/css/style.css">
            </head>
            <body>
                <div class="container">
                    <h1>Olá, ${nome}. Contato recebido!</h1>
                    <p>Obrigado por sua mensagem sobre "${assunto}".</p>
                    <p>Responderemos em breve no e-mail: ${email}.</p>
                    <a href="/" class="btn">Voltar ao Início</a>
                </div>
            </body>
        </html>
    `);
});

// Rota da API (GET /api/lanches): Serve o JSON com a lista de lanches
app.get('/api/lanches', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'data', 'lanches.json'));
});


// Tratar erros 404 (Pagina não encontrada)
app.use((req, res) => {
    res.status(404).send(`
        <html>
            <head>
                <title>Erro 404</title>
                <link rel="stylesheet" href="/css/style.css">
            </head>
            <body>
                <div class="container">
                    <h1>Oops! Página não encontrada (Erro 404)</h1>
                    <p>A rota que você tentou acessar não existe.</p>
                    <a href="/" class="btn">Voltar para o Cardápio</a>
                </div>
            </body>
        </html>
    `);
});


// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em http://localhost:${PORT}`);
});