const userService= require('../service/user-service');
const {validationResult}=require('express-validator');
const ApiError=require('../exceptions/api-error');
const clientService = require('../service/client-service');

class UserController{
    async registration(req,res,next){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Ошибка при валидации',errors.array()))
            }
            const {email, password} = req.body;
            const userData = await userService.registration(email,password);
            res.cookie('refreshToken',userData.refreshToken,{maxAge: 30*24*60*60*1000, httpOnly:true})
            return res.json(userData);
        } catch(e){
            next(e);
        }
    }
    async login(req,res,next){
        try{
            const {email,password}=req.body;
            const userData = await userService.login(email,password);
            res.cookie('refreshToken',userData.refreshToken,{maxAge: 30*24*60*60*1000, httpOnly:true})
            return res.json(userData);
        } catch(e){
            next(e);
        }
    }
    async logout(req,res,next){
        try{
            const {refreshToken}=req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch(e){
            next(e);
        }
    }
    async activate(req,res,next){
        try{
            const activationLink=req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch(e){
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            const client = await clientService.getClient(userData.user.id);
            return res.json({ ...userData, ...client });
        } catch (e) {
            next(e);
        }
    }
    
    
    async getUsers(req, res, next) {
        try {
            const { search } = req.query; 
            let users;
            if (!search) {
                users = await userService.getAllUsers();
            } else {
                users = await userService.getUsersByEmail(search);
            }
    
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }
    async getUser(req, res, next) {
        try {
          const { id } = req.params;
          const user = await userService.getUser(id);
          return res.json(user);
        } catch (error) {
          next(error);
        }
      }
      async updateUser(req, res, next) {
        try {
            
          const client = await clientService.updateClient(req.params.id, req.body);
          const user = await userService.updateUser(req.params.id, req.body);
          const responseData = {
            client,
            user
        };
          res.status(200).json(responseData);
        } catch (error) {
          next(error);
        }
      }
      async checkPass(req, res, next) {
        try {
            
          const isValid = await userService.checkPass(req.params.id, req.body.password.password.password);
          
          const responseData = {
            isValid
        };
          res.status(200).json(responseData);
        } catch (error) {
          next(error);
        }
      }
    async deleteUser(req,res,next){
        try{
            const {id}=req.params;
            await userService.deleteUser(id);
            await clientService.deleteClient(id);
            return res.send('Пользователь удален успешно');
        } catch(e){
            next(e);
        }
    }
}

module.exports = new UserController();