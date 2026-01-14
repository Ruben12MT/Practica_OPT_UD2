// controllers/branchController.js
const branchService = require("../services/branchService");

class BranchController {
  async getAllBranches(req, res) {
    try {
      const branches = await branchService.getAllBranches();
      return res.status(200).json({
        ok: true,
        datos: branches,
        mensaje: "Sucursales recuperadas correctamente",
      });
    } catch (err) {
      console.error("Error en getAllBranches:", err);
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
      const branch = await branchService.getBranchById(id_branch);

      if (!branch) {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: "No existe ninguna sucursal con ese ID",
        });
      }

      return res.status(200).json({
        ok: true,
        datos: branch,
        mensaje: "Sucursal recuperada correctamente",
      });
    } catch (err) {
      console.error("Error en getBranchById:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "No se ha encontrado esa sucursal",
      });
    }
  }

  async deleteBranch(req, res) {
    const id_branch = parseInt(req.params.id);

    try {
      const deleted = await branchService.deleteBranch(id_branch);

      return res.status(200).json({
        ok: true,
        datos: deleted,
        mensaje: "Sucursal borrada correctamente",
      });
    } catch (err) {
      console.error("Error en deleteBranch:", err);

      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "No se ha podido borrar esa sucursal",
      });
    }
  }

  async createBranch(req, res) {
    try {
      const branchData = req.body;
      const newBranch = await branchService.createBranch(branchData);

      return res.status(200).json({
        id: newBranch.id,
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
  async getBranchesByProps(req, res) {
    try {
      const { name, dateMin, dateMax, id_bank } = req.query;
      const branches = await branchService.getBranchesByProps(
        name,
        dateMin,
        dateMax,
        id_bank
      );

      return res.status(200).json({
        ok: true,
        datos: branches,
        mensaje: "Sucursales recuperadas correctamente",
      });
    } catch (err) {
      console.error("Error en getBranchesByProps:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al recuperar sucursales",
      });
    }
  }
}

module.exports = new BranchController();
