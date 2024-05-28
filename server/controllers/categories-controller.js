
const {validationResult}=require('express-validator');
const ApiError=require('../exceptions/api-error');
const categoriesService = require('../service/categories-service');


class CategoryController{
    async addCategory(req,res,next){
        try{
           
            const {name, image} = req.body;
            const categoryData = await categoriesService.addCategory(name,image);
            return res.json(categoryData);
        } catch(e){
            next(e);
        }
    }

    async getCategories(req,res,next){
        try{
            const categories = await categoriesService.getCategories();
            return res.json(categories);
        } catch(e){
            next(e);
        }
    }
    async getCategory(req, res, next) {
        try {
          const { id } = req.params;
          const category = await categoriesService.getCategory(id);
          return res.json(category);
        } catch (error) {
          next(error);
        }
      }
    async deleteCategory(req,res,next){
        try{
            const {id}=req.params;
            await categoriesService.deleteCategory(id);
            return res.send('Категория удалена успешно');
        } catch(e){
            next(e);
        }
    }
    async updateCategory(req, res, next) {
        try {
          const updatedCat = await categoriesService.updateCategory(req.params.id, req.body);
          res.status(200).json(updatedCat);
        } catch (error) {
          next(error);
        }
      }
}

module.exports = new CategoryController();