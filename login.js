//parte2

/**
 * @fileOverview This command should be execute to Login an user.
 * @author <a href="mailto:andretorresdg@usp.br">André Devay</a>
 * @version 1.0
 */

const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const _ = require('lodash');
const Request = require('request');

var mongoose = require('mongoose');
var {mongoose} = require('./models/mongoose');
var {ObjectID} = require('mongodb');
var bodyParser = require('body-parser');
var app = express();
var {Login} = require('./models/login.js');
var Joi = require('joi')

