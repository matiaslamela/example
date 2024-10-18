import { NextFunction, Request, Response } from "express";
import { IOrderService } from "../service/orderService/iOrderService";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { StatusCodes } from "http-status-codes";
import CreateOrderDTO from "../dto/request/createOrderDTO";
import { validate } from "class-validator";
import FieldValidationError from "../errors/fieldValidationError";
import { mapValidationErrorToFieldValidationErrorDTOList } from "../mapper/validationErrorMapper";
import OrderDTO from "../dto/response/orderDTO";
import AddProductToOrderDTO from "../dto/request/addProductToOrderDTO";
import FieldValidationErrorDTO from "../dto/error/fieldValidationErrorDTO";

export default class OrderController {
  private orderService: IOrderService;

  constructor(orderService: IOrderService) {
    this.orderService = orderService;
  }

  public findOrderById = async (
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
      const order = await this.orderService.findAndMapOrderById(id);
      res.status(StatusCodes.OK).json(instanceToPlain(order));
    } catch (e) {
      next(e);
    }
  };

  public createOrder = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const createOrderDTO: CreateOrderDTO = new CreateOrderDTO(
        req.body.user_id,
        req.body.status,
      );
      const errors = await validate(createOrderDTO);
      if (errors.length > 0) {
        return next(
          new FieldValidationError(
            mapValidationErrorToFieldValidationErrorDTOList(errors),
          ),
        );
      }
      const createdOrderDTO: OrderDTO =
        await this.orderService.createOrder(createOrderDTO);
      res.status(StatusCodes.CREATED).json(instanceToPlain(createdOrderDTO));
    } catch (e) {
      next(e);
    }
  };

  public addProductToOrder = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const addProductToOrderDTO: AddProductToOrderDTO =
        new AddProductToOrderDTO(
          req.body.quantity,
          req.params.id,
          req.params.productId,
        );
      const errors = await validate(addProductToOrderDTO);
      if (errors.length > 0) {
        return next(
          new FieldValidationError(
            mapValidationErrorToFieldValidationErrorDTOList(errors),
          ),
        );
      }
      const updatedOrderDTO: OrderDTO =
        await this.orderService.addProductToOrder(addProductToOrderDTO);
      res.status(StatusCodes.CREATED).json(instanceToPlain(updatedOrderDTO));
    } catch (e) {
      next(e);
    }
  };
}
