import Product from "../database/models/product";
import CreateProductDTO from "../dto/request/createProductDTO";
import ProductDTO from "../dto/response/productDTO";

function createProductDTOToPlainObject(createProductDTO: CreateProductDTO) {
  return {
    name: createProductDTO.name,
    stock: createProductDTO.stock,
  };
}

function productToProductDTO(product: Product): ProductDTO {
  return new ProductDTO(
    product.id,
    product.name,
    product.stock,
    product.createdAt,
    product.updatedAt,
  );
}

export default {
  createProductDTOToPlainObject,
  productToProductDTO,
};
