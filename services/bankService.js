// services/bankService.js
// Servicio para interactuar con el modelo Sequelize `banks`

// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
const { where } = require("sequelize");
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");
// Cargar las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recuperar el modelo bank
const bank = models.bank;

class BankService {
  async getAllBanks() {
    // Devuelve todos los bancos. Ajusta atributos si tu modelo usa otros nombres.
    const result = await bank.findAll();
    return result;
  }

  async getBankById(idBank) {
    // Devuelve todos los bancos. Ajusta atributos si tu modelo usa otros nombres.
    const result = await bank.findByPk(idBank);
    return result;
  }

  async deleteBank(id) {
    return await bank.destroy({ where: { id: id } });
  }

  async createBank(bankData) {
    const result = await bank.create(bankData);
    return result;
  }

  async updateBank(id, bankData) {
    return await bank.update(bankData, { where: { id: id } });
  }

  async updateLogo(id, logoUrl){
    return await bank.update({url_image: logoUrl}, {where:{id:id}})
  }
}

module.exports = new BankService();
