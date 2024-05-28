const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');
const clientModel = require('../models/client-model');
const userModel = require('../models/user-model');

class UserService {
    async registration(email, password) {
            const candidate = await UserModel.findOne({ email });
            if (candidate) {
                throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже зарегистрирован`);
            }


            const hashPassword = await bcrypt.hash(password, 3);
            const activationLink = uuid.v4();

            const user = await UserModel.create({ email, password: hashPassword, activationLink });
            await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
            const userDto = new UserDto(user);
            const tokens = tokenService.generateTokens({...userDto});
            await tokenService.saveToken(userDto.id, tokens.refreshToken);
            const client = await clientModel.create({user:userDto.id});
            return {
                ...tokens,
                user: userDto,
                client: client
            };
        
    }

    async activate(activationLink){
        const user = await UserModel.findOne({activationLink})
        if (!user){
            throw ApiError.BadRequest('Некорректная ссылка активации')
        }
        user.isActivated= true;
        await user.save();
    }

    async login(email, password) {
            const user = await UserModel.findOne({ email });
            if (!user) {
                throw ApiError.BadRequest('Пользователь с таким email не был найден');
            }
            const isPassEquals = await bcrypt.compare(password, user.password);
            if (!isPassEquals) {
                throw ApiError.BadRequest('Пароль введён неверно');
            }
            const userDto = new UserDto(user);
            const tokens = tokenService.generateTokens({ ...userDto });
            console.log(userDto.id);
            await tokenService.saveToken(userDto.id, tokens.refreshToken);  
            const client = await clientModel.findOne({user:userDto.id});  
            return {
                ...tokens,
                user: userDto,
                client:client
            };
    }

    async logout(refreshToken){
        const token = await  tokenService.removeToken(refreshToken);
        return token;
    }
    
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
    
        const userData = tokenService.validateRefreshToken(refreshToken);
    
        // Immediately check if the token is valid
        if (!userData) {
            console.log('Invalid user data from token:', { userData });
            throw ApiError.UnauthorizedError();
        }
    
        // Check if the token is expired
        if (userData.exp < Date.now() / 1000) {
            console.log('Token expired:', { userData });
            throw ApiError.UnauthorizedError();
        }
    
        // Find the token in the database
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!tokenFromDb) {
            console.log('Token not found in DB:', { refreshToken });
            throw ApiError.UnauthorizedError();
        }
    
        const user = await UserModel.findById(userData.id);
        if (!user) {
            throw ApiError.UnauthorizedError();
        }
    
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
    
        console.log('Generated tokens:', tokens);
    
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        console.log('Saved new refresh token to DB');
    
        const client = await clientModel.findOne({ user: userDto.id });
        console.log('Fetched client data:', client);
    
        return {
            ...tokens,
            user: userDto,
            client
        };
    }
    
    

    async getAllUsers(){
        const users=await UserModel.find();
        return users;

    }
    async getUsersByEmail(email) {
        const users = await UserModel.find({ email: { $regex: new RegExp(email, "i") } });
        return users;
    }
    async getUser(id) {
        try {
          
          const user = await userModel.findById(id);
          return user;
        } catch (error) {
          throw error;
        }
    }
    async updateUser(id, userDataToUpdate) {
        try {
            const user = await userModel.findById(id);
            if (!user) {
                throw new Error('User not found');
            }
            if (userDataToUpdate.password) {
                userDataToUpdate.password = await bcrypt.hash(userDataToUpdate.password, 3);
            }
            Object.assign(user, userDataToUpdate);
            const updatedUser = await user.save(); 
            return updatedUser; 
        } catch (error) {
            throw error;
        }
    }
    
        async  checkPass(id, password) {
            try {
                
              const user = await userModel.findById(id);
              if (!user) {
                throw new Error('User not found');
              }
              
              const isPassEquals = await bcrypt.compare(password, user.password);
              if (!isPassEquals) {
                  throw ApiError.BadRequest('Пароль введён неверно');
              }
              return isPassEquals
            } catch (error) {
                throw error;
              }}

    async deleteUser(id){
        await UserModel.findByIdAndDelete( id );
        return 'Данные клиента успешно  удалены';
    }

}

module.exports = new UserService();
