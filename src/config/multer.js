const multer = require('multer');
const path = require('path');

const crypto = require('crypto');

/**
 * configuração para armazenamento de media em disco local
 */
module.exports = ({
    dest: path.resolve(__dirname, '..', '..', 'media'),
    storage: multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, path.resolve(__dirname, '..', '..', 'media'));
        },
        filename: function (req, file, callback) {
            crypto.randomBytes(16, function (err, hash) {
                if (err) callback(err);

                //gerando chave única para o arquivo
                file.key = `${hash.toString('hex')}-${file.originalname}`;

                callback(null, file.key);
            });
        }
    })
});