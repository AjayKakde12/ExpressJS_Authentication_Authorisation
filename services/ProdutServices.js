const Product = require("../models/Product")

exports.addProduct = async (product) => {
    try {
        const getProduct = await Product.create(product);
        return { created: true }

    } catch (error) {
        return {
            error: true,
            message: error.message
        }
    }
}

exports.updateProduct = async (filter, update) => {
    try {
        const updatedProduct = await Product.findOneAndUpdate(filter, update);
        return { updated: true }

    } catch (error) {
        return {
            error: true,
            message: error.message
        }
    }
}

exports.deleteProduct = async (filter) => {
    try {
        const deletedProduct = await Product.findOneAndRemove(filter);
        return { deleted: true }

    } catch (error) {
        return {
            error: true,
            message: error.message
        }
    }
}

exports.getProducts = async (filter, options = {}) => {
    try {
        const limit = options.limit || 1;
        const pageNumber = options.page || 0;
        const totalProducts = await Product.find(filter).countDocuments();
        const products = await Product.find(filter)
            .populate("user", "name")
            .limit(limit)
            .skip(limit * (pageNumber-1))
        return { error: false, products, total: totalProducts}
    } catch (error) {
        return {
            error: true,
            message: error.message
        }
    }
}