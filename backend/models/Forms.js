const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FieldSchema = new Schema({
  type: String,
  name: String,
  label: String,
  placeholder: String,
});

const RadioSchema = new Schema({
  type: String,
  label: String,
  options: [{ type: String }],
});

const FormScheme = new Schema({
  formName: String,
  fieldsData: [{ type: Schema.Types.Mixed }],
});

const FormModel = mongoose.model('forms', FormScheme);

module.exports = FormModel;
