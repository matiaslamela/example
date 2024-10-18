import { Transaction } from "sequelize";
import Product from "../../database/models/product";
import CreateProductDTO from "../../dto/request/createProductDTO";
import ProductDTO from "../../dto/response/productDTO";

export interface IProductService {
  createProduct(createProductDTO: CreateProductDTO): Promise<ProductDTO>;
  findProductById(id: number, transaction?: Transaction): Promise<Product>;
  findAndMapProductById(id: number): Promise<ProductDTO>;
  subtractStock(
    product: Product,
    stockToSubtract: number,
    transaction?: Transaction,
  ): Promise<void>;
}
