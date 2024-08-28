const ApiError = require('../exceptions/api-error');
const productModel = require('../models/product-model');
const Category = require('../models/category-model');
const rentModel = require('../models/rent-model');




class RentsService {
  async deleteRent(rentId){
    await rentModel.deleteOne({ _id: rentId });
    return 'Успешно удалено';
}
    async rentReq(userId, productId, price, period) {
      const currentDate = new Date();
      const endDate = new Date(currentDate.getTime() + period * 24 * 60 * 60 * 1000); // Добавляем период в миллисекундах
    
      const rent = await rentModel.create({ 
        user_id: userId,
        product_id: productId,
        price,
        period,
        endDate, 
      });
    
      return {
        rent,
      };
    }
    
  async  confirmRent(id) {
    try {
        const result = await rentModel.updateOne(
            { _id: id }, 
            { $set: { isConfirm: true, confirmationDate: Date.now() } } 
        );
        if (result.nModified === 0) {
            throw new Error('Rent not found or not modified');
        }
        return result; 
    } catch (error) {
        throw error;
    }
}
async  endRent(id) {
  try {
      const result = await rentModel.updateOne(
          { _id: id }, 
          { $set: { isEnd: true, endDate: Date.now() } } 
      );
      if (result.nModified === 0) {
          throw new Error('Rent not found or not modified');
      }
      return result; 
  } catch (error) {
      throw error;
  }
}
async getRent(id) {
  try {
    
    const rent = await rentModel.findById(id);
    
    return rent;
  } catch (error) {
    throw error;
  }
}
async  getUserRent(id) {
  try {
    const rents = await rentModel.find({ user_id: id }).lean();
    const rentWithProductDetails = await Promise.all(rents.map(async (rent) => {
      const product = await productModel.findById(rent.product_id).lean();
      return { 
        ...rent, 
        title: product.title, 
        image: product.images[0] 
      };
    }));
    return rentWithProductDetails;
  } catch (error) {
    throw error;
  }
}


  async getRents() {
    try {
      const rents = await rentModel.find().lean();
      const rentWithProductDetails = await Promise.all(rents.map(async (rent) => {
        const product = await productModel.findById(rent.product_id).lean();
        return { 
          ...rent, 
          title: product.title, 
          image: product.images[0] 
        };
      }));
      return rentWithProductDetails;
    } catch (error) {
      throw error;
    }}}

module.exports = new RentsService();
