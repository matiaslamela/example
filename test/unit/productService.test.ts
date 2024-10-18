// src/services/orderService.test.ts
import ProductService from "../../src/service/productService";
import productRepository from "../__mocks__/productRepository.mock";
import { Transaction } from "sequelize";
import Product from "../../src/database/models/product";
import ProductNotFoundError from "../../src/service/productService/productNotFoundError";

jest.mock("../../src/database/models/product");

describe("OrderService", () => {
  let productService: ProductService;

  beforeEach(() => {
    productService = new ProductService(productRepository as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a product if found", async () => {
    const mockOrder = { id: 1 } as Product;
    productRepository.findByPk.mockResolvedValue(mockOrder);

    const result = await productService.findProductById(1);

    expect(result).toBe(mockOrder);
    expect(productRepository.findByPk).toHaveBeenCalledWith(1, {
      transaction: undefined,
    });
  });

  it("should throw ProductNotFoundError if order is not found", async () => {
    productRepository.findByPk.mockResolvedValue(null);

    await expect(productService.findProductById(1)).rejects.toThrow(
      ProductNotFoundError,
    );
    expect(productRepository.findByPk).toHaveBeenCalledWith(1, {
      transaction: undefined,
    });
  });
});
