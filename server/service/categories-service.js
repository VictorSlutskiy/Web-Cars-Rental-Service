
const ApiError = require('../exceptions/api-error');
const categoryModel = require('../models/category-model');

class CategoryService {
    async addCategory(name, image) {
            const categoryEx = await categoryModel.findOne({ name });
            if (categoryEx) {
                throw ApiError.BadRequest(`Категория с названием ${name} уже зарегистрирован`);
            }

            const category = await categoryModel.create({ name, image });    
            return {
                category
            };
        
    }

    async getCategory(id) {
        try {
          
          const category = await categoryModel.findById(id);
          return category;
        } catch (error) {
          throw error;
        }
      }
    async getCategories(){
        const categories=await categoryModel.find();
        return categories;

    }
    async deleteCategory(categoryId){
        await categoryModel.deleteOne({ _id: categoryId });
        return 'Данные категории успешно  удалены';
    }
    async  updateCategory(id, catDataToUpdate) {
      try {
        const cat = await categoryModel.findById(id);
        if (!cat) {
          throw new Error('Category not found');
        }
      
        Object.assign(cat, catDataToUpdate);
        await cat.save();
        return cat; 
      } catch (error) {
        throw error;
      }}
}

module.exports = new CategoryService();
