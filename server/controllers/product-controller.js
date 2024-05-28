const productService = require('../service/product-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');

class ProductController {
    async addProduct(req, res, next) {
        try {
          
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const { title, price, description, images, categoryId } = req.body;
            console.log(req.body)
            const productData = await productService.addProduct(title, price, description, images, categoryId);
            return res.json(productData);
        } catch (e) {
            next(e);
        }
    }

    async getProducts(req, res, next) {
        try {
            const { title, categoryId, limit, offset, price_min, price_max } = req.query; // Получаем параметры из запроса
            const productsData = await productService.getProducts(title, categoryId, limit, offset, price_min, price_max); // Передаем параметры в метод getProducts
            return res.json(productsData);
        } catch (e) {
            next(e);
        }
    }
    async getProduct(req, res, next) {
        try {
          const { id } = req.params;
          const prod = await productService.getProduct(id);
          return res.json(prod);
        } catch (error) {
          next(error);
        }
      }
      async updateProduct(req, res, next) {
        try {
          const updatedProduct = await productService.updateProduct(req.params.id, req.body);
          res.status(200).json(updatedProduct);
        } catch (error) {
          next(error);
        }
      }
    async deleteProduct(req, res, next) {
        try {
            const { id } = req.params;
            await productService.deleteProduct(id);
            return res.send('Продукт удален успешно');
        } catch (e) {
            next(e);
        }
    }
    
}

module.exports = new ProductController();
