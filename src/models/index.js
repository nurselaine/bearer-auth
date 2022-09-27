'use strict';

const express = require('express');
const sequelize = require('sequelize');

const app = express();
const { sequelizeDatabase, DataTypes } = new sequelize();


