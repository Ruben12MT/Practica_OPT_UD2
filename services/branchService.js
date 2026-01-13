// services/branchService.js
// Servicio para interactuar con el modelo Sequelize `branch`

const initModels = require("../models/init-models.js").initModels;
const { Op } = require("sequelize");
const sequelize = require("../config/sequelize.js");
const models = initModels(sequelize);

// Recuperar el modelo branch
const branch = models.bank_branch;
class BranchService {
  async getAllBranches() {
    return await branch.findAll();
  }
  async getBranchById(idBranch) {
    return await branch.findByPk(idBranch);
  }
  async deleteBranch(id) {
    return await branch.destroy({ where: { id } });
  }

  async createBranch(branchData) {
    return await branch.create(branchData);
  }

  async updateBranch(id, branchData) {
    return await branch.update(branchData, { where: { id } });
  }

  async getBranchesByProps(name, dateMin, dateMax, id_bank) {
    const where = {};

    // Buscar sucursal por nombre.
    if (name && name.trim() !== "") {
      where.name = { [Op.like]: `%${name}%`};
    }

    // Filtrar por rango de fechas
    if (dateMin && dateMax) {
      where.opening_date = { [Op.between]: [dateMin, dateMax] };
    } else if (dateMin) {
      where.opening_date = {[Op.gte]:dateMin };
    } else if (dateMax) {
      where.opening_date = { [Op.lte]: dateMax};
    }

    // Filtrar por banco asociado así puedo sacar las sucursales que tiene un banco en concreto.
    if (id_bank && !isNaN(id_bank)) {
      where.id_bank = parseInt(id_bank);
    }

    return await branch.findAll({ where });
  }
}

module.exports = new BranchService();
