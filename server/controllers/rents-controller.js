const productService = require('../service/product-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');
const rentsService = require('../service/rents-service');

class RentsController {

    async deleteRent(req, res, next) {
      try {
          const { rentId } = req.params;
          
          await productService.deleteRent(rentId);
          return res.send('Удалено успешно');
      } catch (e) {
          next(e);
      }
  }
    async rentReq(req, res, next) {
      try {
          console.log(req.body)
          const { user_id,price,period } = req.body;
          const {productId}  = req.params;
          const rentData = await rentsService.rentReq(user_id,productId,price,period);
          return res.json(rentData);
      } catch (e) {
          next(e);
      }
  }
  async confirmRent(req, res, next) {
    try {
      const updatedRent = await rentsService.confirmRent(req.params.id);
      res.status(200).json(updatedRent);
    } catch (error) {
      next(error);
    }
  }
  async endRent(req, res, next) {
    try {
      const updatedRent = await rentsService.endRent(req.params.id);
      res.status(200).json(updatedRent);
    } catch (error) {
      next(error);
    }
  }
  async getRents(req, res, next) {
    try {
        const rentsData = await rentsService.getRents(); 
      
        return res.json(rentsData);
    } catch (e) {
        next(e);
    }
}
async getRent(req, res, next) {
    try {
      const { id } = req.params;
      const rent = await rentsService.getRent(id);
      return res.json(rent);
    } catch (error) {
      next(error);
    }
  }
  async getUserRent(req, res, next) {
    try {
      const { id } = req.params;
      
      const rent = await rentsService.getUserRent(id);
      return res.json(rent);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RentsController();
