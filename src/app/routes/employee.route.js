module.exports = app => {
    const empController = require('../contollers/employee.controller');
    const validateToken = require('../../utilities/jwt.utils').validateToken;
    const type = require('../../utilities/multer.utils');
    app.post('/emp', empController.createUser);
    app.get('/emp', validateToken, empController.getAllUser);
    app.get('/emp/:id', validateToken, empController.getUserById);
    app.get('/refreshtoken/:id', empController.refreshToken);
};


