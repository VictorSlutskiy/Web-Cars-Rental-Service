const ApiError = require('../exceptions/api-error');
const productModel = require('../models/product-model');
const Category = require('../models/category-model');
const rentModel = require('../models/rent-model');




class ProductService {
    async addProduct(title, price, description, images, categoryId) {
        const productEx = await productModel.findOne({ title });
        if (productEx) {
            throw ApiError.BadRequest(`Продукт с названием ${title} уже существует`);
        }

        const product = await productModel.create({ title, price, description, images, category: categoryId });    
        return {
            product
        };
    }

    async getProducts(title = '', categoryId = '', limit = Infinity, offset = 0, price_min = 0, price_max = 0) {
        let products;
    
        // Создаем объект для фильтрации
        let filter = {};
    
        // Если передан параметр title, добавляем его в фильтр
        if (title) {
            filter.title = { $regex: new RegExp(title, 'i') };
        }
    
        // Если передан параметр categoryId, добавляем его в фильтр
        if (categoryId) {
            filter.category = categoryId;
        }
    
        // Если переданы параметры price_min и price_max, добавляем их в фильтр
        if (price_min || price_max) {
            filter.price = {};
            if (price_min) {
                filter.price.$gte = parseInt(price_min);
            }
            if (price_max) {
                filter.price.$lte = parseInt(price_max);
            }
        }
    
        // Выполняем запрос с учетом всех фильтров и опций limit и offset
        products = await productModel.find(filter).skip(parseInt(offset)).limit(parseInt(limit)).populate('category');
    
        return products;
    }
    async getProduct(id) {
        try {
          
          const prod = await productModel.findById(id);
          return prod;
        } catch (error) {
          throw error;
        }
      }
      async  updateProduct(id, ProdDataToUpdate) {
        try {
          const prod = await productModel.findById(id);
          if (!prod) {
            throw new Error('Prod not found');
          }
        
          Object.assign(prod, ProdDataToUpdate);
          await prod.save();
          return prod; 
        } catch (error) {
          throw error;
        }}
    async deleteProduct(productId){
        await productModel.deleteOne({ _id: productId });
        return 'Продукт успешно удален';
    }
   }

module.exports = new ProductService();
