import { NextFunction, Request, Response } from "express";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { StatusCodes } from "http-status-codes";
import { validate } from "class-validator";
import FieldValidationError from "../errors/fieldValidationError";
import { mapValidationErrorToFieldValidationErrorDTOList } from "../mapper/validationErrorMapper";
import { IProductService } from "../service/productService/iProductService";
import CreateProductDTO from "../dto/request/createProductDTO";
import ProductDTO from "../dto/response/productDTO";
import FieldValidationErrorDTO from "../dto/error/fieldValidationErrorDTO";

export default class ProductController {
  private productService: IProductService;

  constructor(productService: IProductService) {
    this.productService = productService;
  }

  public findProductById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return next(
          new FieldValidationError([
            new FieldValidationErrorDTO("id", "id must be a number"),
          ]),
        );
      }
      const productDTO = await this.productService.findAndMapProductById(id);
      res.status(StatusCodes.OK).json(instanceToPlain(productDTO));
    } catch (e) {
      next(e);
    }
  };

  public createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const createProductDTO: CreateProductDTO = plainToInstance(
        CreateProductDTO,
        req.body as CreateProductDTO,
      );
      const errors = await validate(createProductDTO);
      if (errors.length > 0) {
        return next(
          new FieldValidationError(
            mapValidationErrorToFieldValidationErrorDTOList(errors),
          ),
        );
      }
      const createdProductDTO: ProductDTO =
        await this.productService.createProduct(createProductDTO);
      res.status(StatusCodes.CREATED).json(instanceToPlain(createdProductDTO));
    } catch (e) {
      next(e);
    }
  };
}
