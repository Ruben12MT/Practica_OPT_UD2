const request = require("supertest");
const app = require("../index");
const sequelize = require("../config/sequelize");

describe("Rutas de la API de Bancos", () => {
    let bankId;

    const testBankData = {
        name: "Test Bank Jest",
        n_employees: 150,
        initial_cap: 5000000.00,
        foundation: "2000-01-01",
        active: true
    };

    const updatedBankData = {
        name: "Test Bank Jest Updated",
        n_employees: 200,
        initial_cap: 6000000.00,
        foundation: "2000-01-01",
        active: false
    };

    // Clean up before starting tests (optional, depending on DB state)
    // For now, we rely on creating a new entry and cleaning it up.

    afterAll(async () => {
        // Limpiar el banco creado si existe
        if (bankId) {
            await request(app).delete(`/api/banks/${bankId}`);
        }
        await sequelize.close();
    });

    // 1. GET /api/banks - Recuperar todos los bancos
    test("GET /api/banks - debería devolver todos los bancos y validar estructura", async () => {
        const res = await request(app).get("/api/banks");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("ok", true);
        expect(Array.isArray(res.body.datos)).toBe(true);
        expect(res.body).toHaveProperty("mensaje");

        if (res.body.datos.length > 0) {
            const bank = res.body.datos[0];
            expect(bank).toHaveProperty("id");
            expect(bank).toHaveProperty("name");
            expect(bank).toHaveProperty("n_employees");
            expect(bank).toHaveProperty("initial_cap");
            expect(bank).toHaveProperty("foundation");
            expect(bank).toHaveProperty("active");
        }
    });

    // 2. POST /api/banks - Crear un banco
    test("POST /api/banks - debería crear un nuevo banco con datos correctos", async () => {
        const res = await request(app).post("/api/banks").send(testBankData);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("ok", true);
        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("mensaje", "Banco insertado correctamente");

        bankId = res.body.id; // Guardar ID para siguientes tests
        expect(typeof bankId).toBe("number");
    });

    // 3. GET /api/banks/:id - Recuperar banco por ID
    test("GET /api/banks/:id - debería devolver el banco creado", async () => {
        const res = await request(app).get(`/api/banks/${bankId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("ok", true);

        const bank = res.body.datos;
        expect(bank).toHaveProperty("id", bankId);
        expect(bank).toHaveProperty("name", testBankData.name);
        expect(bank).toHaveProperty("n_employees", testBankData.n_employees);
        // initial_cap viene como string en JSON si es DECIMAL en BD, o number. 
        // Sequelize devuelve DECIMAL como string a veces, pero supertest parsea JSON.
        // Verificamos parseando.
        expect(parseFloat(bank.initial_cap)).toEqual(testBankData.initial_cap);
        expect(bank).toHaveProperty("foundation", testBankData.foundation);
        // active es boolean en request, 1/0 en BD a veces. Sequelize lo mapea a boolean si está definido así.
        expect(Boolean(bank.active)).toBe(true);
    });

    // 4. PUT /api/banks/:id - Actualizar banco
    test("PUT /api/banks/:id - debería actualizar el banco", async () => {
        const res = await request(app).put(`/api/banks/${bankId}`).send(updatedBankData);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("ok", true);
        expect(res.body).toHaveProperty("mensaje", "Banco actualizado correctamente");

        // Verificar cambio
        const getRes = await request(app).get(`/api/banks/${bankId}`);
        const bank = getRes.body.datos;
        expect(bank.name).toBe(updatedBankData.name);
        expect(bank.n_employees).toBe(updatedBankData.n_employees);
        expect(Boolean(bank.active)).toBe(false);
    });

    // 5. GET /api/banks/bypage/:npage - Paginación
    test("GET /api/banks/bypage/:npage - debería devolver bancos paginados", async () => {
        const res = await request(app).get("/api/banks/bypage/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("ok", true);
        expect(res.body.datos).toHaveProperty("count");
        expect(res.body.datos).toHaveProperty("banks");
        expect(Array.isArray(res.body.datos.banks)).toBe(true);
    });

    // 6. GET /api/banks (Filter) - Filtrado
    test("GET /api/banks - debería filtrar por propiedades", async () => {
        const res = await request(app).get("/api/banks").query({
            name: "Jest",
            initial_cap: 1000, // Debería ser >=
            active: false
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("ok", true);
        // Debería encontrar al menos el nuestro modificado
        const found = res.body.datos.find(b => b.id === bankId);
        expect(found).toBeDefined();
        if (found) {
            expect(found.name).toContain("Jest");
            expect(Boolean(found.active)).toBe(false);
        }
    });

    // 7. GET /api/banks/:id - Error 404
    test("GET /api/banks/:id - debería devolver 404 para ID inexistente", async () => {
        const res = await request(app).get("/api/banks/99999999");
        expect(res.statusCode).toEqual(404); // O 500 dependiendo del controlador, pero debería ser 404
        // Revisando controlador: si no existe, devuelve 404 "No existe ningún banco con ese ID"
        // o 500 "No se ha encontrado a ese banco" si falla query.
        // Si findByPk devuelve null, el controller devuelve 404.
    });

    // 8. DELETE /api/banks/:id - Borrar banco
    test("DELETE /api/banks/:id - debería borrar el banco", async () => {
        const res = await request(app).delete(`/api/banks/${bankId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("ok", true);
        expect(res.body).toHaveProperty("mensaje", "Banco borrado correctamente");
    });

    // 9. Verificar borrado
    test("GET /api/banks/:id - debería devolver 404 tras borrado", async () => {
        const res = await request(app).get(`/api/banks/${bankId}`);
        expect(res.statusCode).toEqual(404);
    });
});
