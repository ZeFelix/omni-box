const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

/** lib para permitir o gerenciamento de rotas */
const app = express();

app.use(cors());

/** conexão com o database mongo atlas */
mongoose.connect(
    "mongodb+srv://omnistack:omnistack@cluster0-hsloi.mongodb.net/dbOmnistack?retryWrites=true",
    { useNewUrlParser: true }
);

const server = require('http').Server(app);

/** lib para permitir servidor em realtime */
const io = require('socket.io')(server);

/** escuta a conexão do usuário */
io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    });
});

/**
 * .......lista de middlewares
 */
/**middleware global */
app.use((req, res, next) => {
    //adicionando uma variavel a todo request
    req.io = io;

    return next();
});

/** cadastrar middlware habilitar para usar comunicação json*/
app.use(express.json());

/** cadastrar middlware habilitar para usar transferencia de arquivo */
app.use(express.urlencoded({ extended: true }));

/**redirecionamento dos arquivos estaticos para a rota file */
app.use('/files', express.static(
    path.resolve(__dirname, '..', 'media'))
    );

/** importando modulo de routas */
app.use(require('./routes'));

/** Habilitar porta a ser escultada em real time*/
server.listen(process.env.PORT || 8000);