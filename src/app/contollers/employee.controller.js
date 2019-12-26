const EmpModel = require("../models/employee.model");
const response = require('../../utilities/reponse.utils');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw Error('body is null');
    } else {
      const newUser = new EmpModel(req.body);
      const saveUser = await newUser.save();
      const token = jwtToken(req.body.email);
      response.AUTHSUCCESS(res, saveUser, token);
    }
  } catch (error) {
    next(error);
  }
};

exports.getAllUser = async (req, res, next) => {
  try {
    const getAllUser = await EmpModel.find();
    if (getAllUser.length > 0)
      response.GETSUCCESS(res, getAllUser);
    else
      throw Error('no record found');
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const empId = req.params.id;
    const findUserById = await EmpModel.find({
      empId: empId
    });
    if (findUserById.length > 0)
      response.GETSUCCESS(res, findUserById);
    else
      throw Error('Emp id not found ' + empId);

  } catch (error) {
    next(error);
  }
}

exports.refreshToken = async (req, res, next) => {
  try {
    const empId = req.params.id;
    const token = jwtToken('hoola@hoola.com');
    const data = await EmpModel.findOne({ empId: empId });
    if (data) {
      response.SUCCESS(res, token);
    } else {
      throw Error('emp not found with id ' + empId);
    }
  } catch (error) {
    next(error);
  }
}

const jwtToken = email => {
  const payload = { email: email };
  const options = { expiresIn: '12h' };
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret, options);
  return token;
}
