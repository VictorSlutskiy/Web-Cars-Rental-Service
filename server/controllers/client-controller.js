const clientService= require('../service/client-service');
const {validationResult}=require('express-validator');
const ApiError=require('../exceptions/api-error');


class ClientController{
    async addClient(req,res,next){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Ошибка при валидации',errors.array()))
            }
            const {user, surname,name, patronymic, passport_number, driver_license} = req.body;
            const clientData = await clientService.addClient(user, surname,name, patronymic, passport_number, driver_license);
            return res.json(clientData);
        } catch(e){
            next(e);
        }
    }
    async getClient(req,res,next){
        try{
            const {user}=req.body;
            const clientData = await clientService.getClient(user);
            return res.json(clientData);
        } catch(e){
            next(e);
        }
    }
    async deleteClient(req, res, next) {
        try {
            const { user } = req.body;
            await clientService.deleteClient(user);
            return res.send('Клиент удален успешно');
        } catch (e) {
            next(e);
        }
    }    
   
}

module.exports = new ClientController();