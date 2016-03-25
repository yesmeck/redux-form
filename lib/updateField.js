'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _isPristine = require('./isPristine');

var _isPristine2 = _interopRequireDefault(_isPristine);

var _isValid = require('./isValid');

var _isValid2 = _interopRequireDefault(_isValid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Updates a field object from the store values
 */
var updateField = function updateField(field, formField, active, syncError) {
  var diff = {};

  // update field value
  if (field.value !== formField.value) {
    diff.value = formField.value;
    diff.checked = typeof formField.value === 'boolean' ? formField.value : undefined;
  }

  // update dirty/pristine
  var pristine = (0, _isPristine2.default)(formField.value, formField.initial);
  if (field.pristine !== pristine) {
    diff.dirty = !pristine;
    diff.pristine = pristine;
  }

  // update field error
  var error = syncError || formField.submitError || formField.asyncError;
  if (error !== field.error) {
    diff.error = error;
  }
  var valid = (0, _isValid2.default)(error);
  if (field.valid !== valid) {
    diff.invalid = !valid;
    diff.valid = valid;
  }

  if (active !== field.active) {
    diff.active = active;
  }
  var touched = !!formField.touched;
  if (touched !== field.touched) {
    diff.touched = touched;
  }
  var visited = !!formField.visited;
  if (visited !== field.visited) {
    diff.visited = visited;
  }

  if ('initial' in formField && formField.initial !== field.initialValue) {
    field.defaultChecked = formField.initial === true;
    field.defaultValue = formField.initial;
    field.initialValue = formField.initial;
  }

  return Object.keys(diff).length ? _extends({}, field, diff) : field;
};
exports.default = updateField;