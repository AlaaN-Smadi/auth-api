

'use strict';


const { Sequelize, DataTypes } = require('sequelize');
const UserSchema = require('./model-finder');
const sequelize = new Sequelize('postgres://postgres@localhost:5432/lab08');


const Users = UserSchema(sequelize, DataTypes);

module.exports={
    db: sequelize,
    users: Users
}