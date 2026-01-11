var DataTypes = require("sequelize").DataTypes;
var _bank = require("./bank");
var _bank_branch = require("./bank_branch");

function initModels(sequelize) {
  var bank = _bank(sequelize, DataTypes);
  var bank_branch = _bank_branch(sequelize, DataTypes);

  bank_branch.belongsTo(bank, { as: "id_bank_bank", foreignKey: "id_bank"});
  bank.hasMany(bank_branch, { as: "bank_branches", foreignKey: "id_bank"});

  return {
    bank,
    bank_branch,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
