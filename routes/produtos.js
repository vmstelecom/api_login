const express = require('express');
const router = express.Router();
const multer = require('multer');
const login = require('../middleware/login');
const ProdutosController = require('../controllers/produtos-controller');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        var compl = Math.floor(Math.random() * 65536).toString();
        cb(null, compl + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 2},
    fileFilter: fileFilter
});

router.get('/', ProdutosController.getProdutos);
router.post('/', login.obrigatorio, upload.single('produto_imagem'), ProdutosController.postProdutos);
router.get('/:id_produto', ProdutosController.getUmProduto);
router.patch('/', login.obrigatorio, ProdutosController.updateProduto);
router.delete('/', login.obrigatorio, ProdutosController.deleteProduto);

module.exports = router;