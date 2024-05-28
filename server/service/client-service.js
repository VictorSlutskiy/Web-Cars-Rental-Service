const ClientModel = require('../models/client-model');
const ApiError = require('../exceptions/api-error')
const bcrypt = require('bcrypt');
const { Types } = require('mongoose');


class ClientService {
    
    async addClient(user, surname, name, patronymic, passport_number, driver_license) {
        // const hashPassport = await bcrypt.hash(passport_number, 3);
        const client = await ClientModel.create({ user, surname, name, patronymic,  passport_number/*: hashPassport*/, driver_license });
        console.log(client);
        return {
            client
        };
    }
    
    async  updateClient(id, userDataToUpdate) {
        try {
          const client = await ClientModel.findOne({user: id});
          if (!client) {
            throw new Error('Client not found');
          }
          Object.assign(client, userDataToUpdate);
          await client.save();
          return client; 
        } catch (error) {
          throw error;
        }}


    async getClient(user) {
        
            const client = await ClientModel.findOne({ user });
            if (!client) {
                throw ApiError.BadRequest('Пользователь с таким id не был найден');
            }
            console.log(client.user);
            return {
                client
            };
    }
    async deleteClient(userId) {
        await ClientModel.deleteOne({ user: userId });
        return 'Данные клиента успешно удалены';
    }
    
    
}

module.exports = new ClientService();
