const request = require("supertest");
const app = require("../index");
const sequelize = require("../config/sequelize");

describe("Rutas de la API de Sucursales", () => {
    let bankId;
    let branchId;

    const testBranchData = {
        name: "Sucursal Sevilla Centro",
        n_tellers: 25,
        monthly_income: 200000,
        opening_date: "2010-03-15",
        open: true
    };

    const updatedBranchData = {
        name: "Sucursal Sevilla Centro Renovada",
        n_tellers: 30,
        monthly_income: 250000,
        opening_date: "2010-03-15",
        open: false
    };

    // Crear un banco para asociar sucursales
    beforeAll(async () => {
        const newBank = {
            name: "Test Bank For Branch Validation",
            n_employees: 100,
            initial_cap: 1000000,
            foundation: "2023-01-01"
        };
        const res = await request(app).post("/api/banks").send(newBank);
        bankId = res.body.id;
        testBranchData.id_bank = bankId;
        updatedBranchData.id_bank = bankId;
    });

    afterAll(async () => {
        // Limpiar el banco
        if (bankId) {
            await request(app).delete(`/api/banks/${bankId}`);
        }
        await sequelize.close();
    });

    test("GET /api/branches - debería devolver todas las sucursales y validar estructura", async () => {
        const res = await request(app).get("/api/branches");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("ok", true);
        expect(Array.isArray(res.body.datos)).toBe(true);
        if (res.body.datos.length > 0) {
            const branch = res.body.datos[0];
            expect(branch).toHaveProperty("id");
            expect(branch).toHaveProperty("name");
            expect(branch).toHaveProperty("n_tellers");
            expect(branch).toHaveProperty("monthly_income");
            expect(branch).toHaveProperty("opening_date");
            expect(branch).toHaveProperty("id_bank");
        }
    });

    test("POST /api/branches - debería crear una nueva sucursal con datos correctos", async () => {
        const res = await request(app).post("/api/branches").send(testBranchData);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("ok", true);
        expect(res.body).toHaveProperty("id");
        expect(typeof res.body.id).toBe("number");
        branchId = res.body.id;
    });

    test("GET /api/branches/:id - debería devolver la sucursal creada con los datos correctos", async () => {
        const res = await request(app).get(`/api/branches/${branchId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("ok", true);

        const branch = res.body.datos;
        expect(branch).toHaveProperty("id", branchId);
        expect(branch).toHaveProperty("name", testBranchData.name);
        expect(branch).toHaveProperty("n_tellers", testBranchData.n_tellers);
        // monthly_income might be returned as string or number depending on DECIMAL config
        expect(Number(branch.monthly_income)).toEqual(testBranchData.monthly_income);
        expect(branch).toHaveProperty("opening_date", testBranchData.opening_date);
        // open might be returned as 1/0 or true/false
        expect(Boolean(branch.open)).toEqual(testBranchData.open);
        expect(branch).toHaveProperty("id_bank", bankId);
    });

    test("PUT /api/branches/:id - debería actualizar la sucursal y verificar cambios", async () => {
        const res = await request(app).put(`/api/branches/${branchId}`).send(updatedBranchData);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("ok", true);

        // Verify update
        const getRes = await request(app).get(`/api/branches/${branchId}`);
        const branch = getRes.body.datos;
        expect(branch).toHaveProperty("name", updatedBranchData.name);
        expect(branch).toHaveProperty("n_tellers", updatedBranchData.n_tellers);
        expect(Number(branch.monthly_income)).toEqual(updatedBranchData.monthly_income);
        expect(Boolean(branch.open)).toEqual(updatedBranchData.open);
    });

    test("GET /api/branches - debería filtrar sucursales por props (name, dateMin, id_bank)", async () => {
        const res = await request(app).get("/api/branches").query({
            name: "Renovada",
            dateMin: "2000-01-01",
            id_bank: bankId
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.datos.length).toBeGreaterThan(0);
        const branch = res.body.datos[0];
        expect(branch.name).toContain("Renovada");
        expect(branch.id_bank).toEqual(bankId);
        // Javascript date comparison or string
        expect(new Date(branch.opening_date) >= new Date("2000-01-01")).toBe(true);
    });

    test("DELETE /api/branches/:id - debería borrar la sucursal", async () => {
        const res = await request(app).delete(`/api/branches/${branchId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("ok", true);
    });

    test("GET /api/branches/:id - debería devolver 404 para la sucursal borrada", async () => {
        const res = await request(app).get(`/api/branches/${branchId}`);
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty("ok", false);
    });
});
