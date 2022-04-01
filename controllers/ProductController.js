const req = require("express/lib/request");
const ProductServices = require("../services/ProdutServices")

exports.createProduct = async (req, res, next) => {
    req.body.visible = false;
    const product = await ProductServices.addProduct(req.body);
    if (product.error) {
        return res.status(500).send({
            error: true,
            type: "SERVER_ERROR",
            message: "Internal error."
        })
    }
    console.log(product)
    if (product.created) {
        return res.status(200).send({
            error: false,
            message: "Product created."
        })
    }
}

exports.updateProduct = async (req, res, next) => {
    if (!req.query.id) {
        return res.status(400).send({
            type: "UNABLE_TO_PROCESS_DATA",
            message: "Please provide valid data."
        })
    }
    const updatedProduct = await ProductServices.updateProduct(req.query.id, req.body);
    if (updatedProduct.error) {
        return res.status(500).send({
            error: true,
            type: "SERVER_ERROR",
            message: "Internal error."
        })
    }
    return res.status(200).send({
        error: false,
        message: "Product updated."
    })

}

exports.getProductById = async (req, res, next) => {
    if (!req.query.id) {
        return res.status(400).send({
            type: "UNABLE_TO_PROCESS_DATA",
            message: "Please provide valid data."
        })
    }
    const product = await ProductServices.getProducts({ _id: req.query.id });
    if (product.error) {
        return res.status(500).send({
            error: true,
            type: "SERVER_ERROR",
            message: "Internal error."
        })
    }
    if (!product.products.length) {
        return res.status(404).send({
            error: true,
            type: "RESOURCE_NOT_FOUND",
            message: "Requested data not found."
        })
    }
    return res.status(200).send({
        error: false,
        product: product.products[0]
    })
}

exports.getAllProducts = async (req, res, next) => {
    if (!req.query.page || !req.query.limit) {
        return res.status(400).send({
            type: "UNABLE_TO_PROCESS_DATA",
            message: "Please provide valid data."
        })
    }
    const options = {
        page: req.query.page,
        limit: req.query.limit
    }
    const products = await ProductServices.getProducts(req.body, options)
    if (products.error) {
        return res.status(500).send({
            error: true,
            type: "SERVER_ERROR",
            message: "Internal error."
        })
    }
    if (!products.products.length) {
        return res.status(404).send({
            error: true,
            type: "RESOURCE_NOT_FOUND",
            message: "Requested data not found."
        })
    }
    return res.status(200).send({
        error: false,
        product: products.products,
        total: products.total,
        paginate_count: products.products.length
    })
}

exports.deleteProduct = async (req, res, next) => {
    if(!req.query.id) {
        return res.status(400).send({
            type: "UNABLE_TO_PROCESS_DATA",
            message: "Please provide valid data."
        })
    }
    const deleteProduct = await ProductServices.deleteProduct({_id: req.query.id});
    if(deleteProduct.error) {
        return res.status(500).send({
            error: true,
            type: "SERVER_ERROR",
            message: "Internal error."
        })
    }
    return res.status(200).send({
        error: false,
        message: "Product deleted."
    })
}
