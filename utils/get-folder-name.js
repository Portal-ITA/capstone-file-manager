'use strict';

//const capstone = require('capstonejs');
const normalizePath = require('./normalize-path');

const CF = require('../registry/CONFIG_FIELDS');

/**
 * Save path to current model folder based on model's name
 * @param {string} modelName
 */
module.exports = (modelName, capstone) => {
  if (!modelName) {
    throw new Error(`${__filename} Please, provide model name! Current modelName is ${modelName}`);
  }

  if (!capstone.get(CF.UPLOADED_FILES_STORAGE)) {
    throw new Error(`${__filename} Please, provide capstone option! Current options is ${capstone.get(CF.UPLOADED_FILES_STORAGE)}`);
  }

  return normalizePath(capstone.get(CF.UPLOADED_FILES_STORAGE) + normalizePath(modelName));
};