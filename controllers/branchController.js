// controllers/branchController.js
const branchService = require("../services/branchService");

class BranchController {
  async getAllbranches(req, res) {
    try {
      const branches = await branchService.getAllbranches();
      return res.status(200).json({
        ok: true,
        datos: branches,
        mensaje: "Sucursales recuperadas correctamente",
      });
    } catch (err) {
      console.error("Error en getAllbranches:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al recuperar sucursales",
      });
    }
  }

  async getBranchById(req, res) {
    const id_branch = parseInt(req.params.id);

    try {
      const branches = await branchService.getBranchById(id_branch);
      return res.status(200).json({
        ok: true,
        datos: branches,
        mensaje: "Datos recuperados correctamente",
      });
    } catch (err) {
      console.error("Error en getBranchById:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "No se ha encontrado los datos",
      });
    }
  }

    async deleteBranch(req, res) {
    const id_branch = parseInt(req.params.id);

    try {
      const branch = await branchService.deleteBranch(id_branch);
      return res.status(200).json({
        ok: true,
        datos: branch,
        mensaje: "Sucursal borrada correctamente",
      });
    } catch (err) {
      console.error("Error en deleteBranch:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "No se ha podido borrar a esa sucursal",
      });
    }
  }



  async createBranch(req, res) {
    try {
      const branchData = req.body;

      const newBranch = await branchService.createBranch(branchData);
      return res.status(200).json({
        ok: true,
        datos: null,
        mensaje: "Sucursal insertada correctamente",
      });
    } catch (err) {
      console.error("Error en createBranch:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al insertar sucursal",
      });
    }
  }

  async updateBranch(req, res) {
    try {
      const id = req.params.id;
      const branchData = req.body;
      const updated = await branchService.updateBranch(id, branchData);

      return res.status(200).json({
        ok: true,
        datos: updated,
        mensaje: "Sucursal actualizada correctamente",
      });
    } catch (err) {
      console.error("Error en updateBranch:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al actualizar sucursal",
      });
    }
  }
}

module.exports = new branchController();
