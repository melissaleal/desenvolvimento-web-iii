const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// utilizando o schema definido para criar uma classe modelo para produto
const Product = mongoose.model("Product", productSchema);

// exportando Product, permitindo o uso em outros arquivos
module.exports = Product;