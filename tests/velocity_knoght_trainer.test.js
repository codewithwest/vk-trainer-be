import { InsertVelocityTrainerRegistrationData } from '../const/velocity_trainer_functions';
import { target_velocity_collection } from '../routes/velocty_knight_trainer_routes';
import { } from './connection';


describe('functions.js', function () {
    test('should contain important values in object', async function () {
        var object = await InsertVelocityTrainerRegistrationData(target_velocity_collection, 'west@gmail.com', 'Jonas', 'Lekgau', 'west', 'West1327')
        expect(object).toEqual(expect.objectContaining({
            email: 'west@gmail.com', fullName: 'Jonas Lekgau', username: 'west', password: 'West1327'
        }));
    });
})