const { authSignupController } = require('../../authSignupController/authSignup');
const User = require('../../models/User');
const bcrypt = require('bcrypt');

jest.mock('../../models/User');

const req = {
    body: {
        name: 'temp_name',
        email: 'temp_email',
        password: 'temp_password',
        phone: 'temp_phone'
    }
}

let errors = [{ msg: 'User Exist!' }];
const res = {
    render: jest.fn((x) => x)
}

it('Send User Exist! msg if entry in database', async () => {

    User.findOne = jest.fn().mockImplementation(() => Promise.resolve({
        id: 1,
        name: 'fake_name',
        email: 'fake_email',
        password: 'fake_password',
        phone: 'fake_phone'
      }));
      

    await authSignupController(req, res);
    expect(res.render).toHaveBeenCalledWith('signup', { errors });
});     

