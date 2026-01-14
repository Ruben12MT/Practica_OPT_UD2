// controllers/bankController.js
const bank = require("../models/bank");
const bankService = require("../services/bankService");

class BankController {
  async uploadBankLogo(req, res) {
    try {
      const id = req.params.id;
      const ext = req.file.filename.split(".").pop();
      const logoUrl = `${id}.${ext}`;
      await bankService.updateLogo(id, logoUrl);
      res.json({ message: "Logo subido correctamente", logoUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al subir el logo" });
    }
  }

  async getAllBanks(req, res) {
    try {
      const banks = await bankService.getAllBanks();
      return res.status(200).json({
        ok: true,
        datos: banks,
        mensaje: "Bancos recuperados correctamente",
      });
    } catch (err) {
      console.error("Error en getAllBank:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al recuperar bancos",
      });
    }
  }

  async getBanksByPage(req, res) {
    const n_page = parseInt(req.params.npage);
    try {
      const { count, banks } = await bankService.getBanksByPage(n_page);
      return res.status(200).json({
        ok: true,
        datos: { count: count, banks: banks },
        mensaje: "Bancos recuperados correctamente",
      });
    } catch (err) {
      console.error("Error en getAllBank:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al recuperar bancos",
      });
    }
  }

  async getBankById(req, res) {
    const id_bank = parseInt(req.params.id);

    try {
      const bank = await bankService.getBankById(id_bank);

      if (!bank) {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: "No existe ningún banco con ese ID",
        });
      }

      return res.status(200).json({
        ok: true,
        datos: bank,
        mensaje: "Banco recuperado correctamente",
      });
    } catch (err) {
      console.error("Error en getAllBanks:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "No se ha encontrado a ese banco",
      });
    }
  }

  async deleteBank(req, res) {
    const id_bank = parseInt(req.params.id);

    try {
      const bank = await bankService.deleteBank(id_bank);

      return res.status(200).json({
        ok: true,
        datos: bank,
        mensaje: "Banco borrado correctamente",
      });
    } catch (err) {
      console.error("Error en deleteBank:", err);

      if (
        err.name === "SequelizeForeignKeyConstraintError" ||
        err.parent?.code === "ER_ROW_IS_REFERENCED_2" ||
        err.parent?.code === "ER_ROW_IS_REFERENCED"
      ) {
        return res.status(400).json({
          ok: false,
          datos: null,
          mensaje:
            "No se puede borrar el banco porque tiene sucursales asociadas",
        });
      }

      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "No se ha podido borrar a ese banco",
      });
    }
  }

  async createBank(req, res) {
    try {
      const bankData = req.body;
      const newBank = await bankService.createBank(bankData);

      return res.status(200).json({
        id: newBank.id,
        ok: true,
        datos: null,
        mensaje: "Banco insertado correctamente",
      });
    } catch (err) {
      console.error("Error en createBank:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al insertar banco",
      });
    }
  }

  async updateBank(req, res) {
    try {
      const id = req.params.id;
      const bankData = req.body;
      const updated = await bankService.updateBank(id, bankData);

      return res.status(200).json({
        ok: true,
        datos: updated,
        mensaje: "Banco actualizado correctamente",
      });
    } catch (err) {
      console.error("Error en updateBank:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al actualizar banco",
      });
    }
  }

  async getBanksByProps(req, res) {
    try {
      const { name, initial_cap, active } = req.query;
      const activeBool = active === "true";

      const banks = await bankService.getBanksByProps(
        name,
        initial_cap,
        activeBool
      );

      return res.status(200).json({
        ok: true,
        datos: banks,
        mensaje: "Bancos recuperados correctamente",
      });
    } catch (err) {
      console.error("Error en getBanksByProps:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al recuperar bancos",
      });
    }
  }
}

module.exports = new BankController();
