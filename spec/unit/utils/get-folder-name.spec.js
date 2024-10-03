'use strict';

const sinon  = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const CF = require('../../../registry/CONFIG_FIELDS');

const capstone = require('capstonejs');

const getFolderName = require('../../../utils/get-folder-name');

describe('Test suite for get-folder-name module.', () => {
  afterEach(() => {
    capstone.get.restore && capstone.get.restore();
  });

  const modelName = 'dasModel';
  const capstoneOption = CF.UPLOADED_FILES_STORAGE;

  it('should return concatenation of capstone option and model`s name', () => {
    const capstoneStub = sinon.stub(capstone, 'get');

    capstoneStub.withArgs(capstoneOption).returns('/uploads/images/');

    expect(getFolderName(modelName)).to.be.equal(`/uploads/images/${modelName}/`);
  });

  it('should throw an error if there is no model name provided', () => {
    const modelName = undefined;

    expect(() => {getFolderName(modelName)}).to.throw();
  });

  it('should throw an error if there is no capstone option provided', () => {
    const capstoneStub = sinon.stub(capstone, 'get');

    capstoneStub.withArgs(capstoneOption).returns(undefined);

    expect(() => {getFolderName(modelName)}).to.throw();
  });
});