import request from "supertest";
import express, { Application } from "express";
import bodyParser from "body-parser";
import { StatusCodes } from "http-status-codes";
import productRouter from "../../src/router/productRouter";
import sequelize from "../../src/database/models";
import Product from "../../src/database/models/product";
import { Repository } from "sequelize-typescript";

const app: Application = express();
app.use(bodyParser.json());
app.use("/products", productRouter);
let repository: Repository<Product>;
describe("ProductController - findProductById", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
    repository = sequelize.getRepository(Product);
  });

  it("should return a product when found", async () => {
    const createdProduct = await repository.create({
      name: "mockProduct",
      stock: 10,
    });
    const response = await request(app).get("/products/1");
    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.id).toBe(createdProduct.id);
    expect(response.body.name).toBe(createdProduct.name);
    expect(response.body.stock).toBe(createdProduct.stock);
  });

  it("should return 404 when product is not found", async () => {
    const response = await request(app).get("/products/1");

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
  });

  it("should return 400 for invalid product ID", async () => {
    const response = await request(app).get("/products/invalid-id");

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  });
});

/*

router --> definir las rutas y las urls
controller ---> llamar al servicio y validar los parametros de entrada
servicio ---> logica de negocio
repositorio --> sequelize

*/
