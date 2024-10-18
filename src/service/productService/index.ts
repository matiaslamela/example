import { Repository } from "sequelize-typescript";
import CreateProductDTO from "../../dto/request/createProductDTO";
import ProductDTO from "../../dto/response/productDTO";
import productMapper from "../../mapper/productMapper";
import ProductNotFoundError from "./productNotFoundError";
import Product from "../../database/models/product";
import { IProductService } from "./iProductService";
import ValidationError from "../../errors/validationError";
import { Transaction } from "sequelize";

export default class ProductService implements IProductService {
  private productRepository: Repository<Product>;

  constructor(productRepository: Repository<Product>) {
    this.productRepository = productRepository;
  }

  public createProduct = async (
    createProductDTO: CreateProductDTO,
  ): Promise<ProductDTO> => {
    const createdProduct = await this.productRepository.create(
      productMapper.createProductDTOToPlainObject(createProductDTO),
    );
    return productMapper.productToProductDTO(createdProduct);
  };

  public findProductById = async (
    id: number,
    transaction?: Transaction,
  ): Promise<Product> => {
    const product = await this.productRepository.findByPk(id, { transaction });
    if (!product) {
      throw new ProductNotFoundError(id);
    }
    return product;
  };

  public findAndMapProductById = async (id: number): Promise<ProductDTO> => {
    const product = await this.findProductById(id);
    return productMapper.productToProductDTO(product);
  };

  subtractStock = async (
    product: Product,
    stockToSubtract: number,
    transaction?: Transaction,
  ) => {
    if (product.stock < stockToSubtract) {
      throw new ValidationError(
        `Product with id ${product.id} does not have enough stock to fulfill the order`,
      );
    }

    const newStock = (product.stock -= stockToSubtract);
    await this.productRepository.update(
      { stock: newStock },
      { where: { id: product.id }, transaction },
    );
  };
}
