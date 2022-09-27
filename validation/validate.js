const isValid = function (value) {
  if (typeof value == "undefined" || value == null) return false;
  if (typeof value == "string" && value.trim().length == 0) return false;
  else if (typeof value == "string") return true;
};

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const validNumber = function (num) {
  return /^\d{10}$/.test(num);
};

const validName = function (name) {
  return /(?!^\d+$)^.+$/.test(name);
};

module.exports = { isValid, validateEmail, validNumber, validName };
