import { Repository } from "sequelize-typescript";
import CreateOrderDTO from "../../dto/request/createOrderDTO";
import OrderDTO from "../../dto/response/orderDTO";
import orderMapper from "../../mapper/orderMapper";
import Order, { OrderStatus } from "../../database/models/order";
import UpdateOrderDTO from "../../dto/request/updateOrderDTO";
import OrderNotFoundError from "./orderNotFoundError";
import ValidationError from "../../errors/validationError";
import { IOrderService } from "./iOrderService";
import { IProductService } from "../productService/iProductService";
import AddProductToOrderDTO from "../../dto/request/addProductToOrderDTO";
import sequelize from "../../database/models";
import { Transaction } from "sequelize";
import OrderProduct from "../../database/models/orderProduct";

export default class orderService implements IOrderService {
  private orderRepository: Repository<Order>;
  private orderProductRepository: Repository<OrderProduct>;
  private productService: IProductService;

  constructor(
    orderRepository: Repository<Order>,
    productService: IProductService,
    orderProductRepository: Repository<OrderProduct>,
  ) {
    this.orderRepository = orderRepository;
    this.productService = productService;
    this.orderProductRepository = orderProductRepository;
  }

  public createOrder = async (
    createOrderDTO: CreateOrderDTO,
  ): Promise<OrderDTO> => {
    const createdOrder = await this.orderRepository.create(
      orderMapper.createOrderDTOToPlainObject(createOrderDTO),
    );
    return orderMapper.orderToOrderDTO(createdOrder);
  };

  public updateOrder = async (
    id: number,
    updateOrderDTO: UpdateOrderDTO,
  ): Promise<OrderDTO> => {
    const originalOrder = await this.findOrderById(id);
    if (!originalOrder.canTransitionTo(updateOrderDTO.status)) {
      throw new ValidationError(
        `Order with status ${originalOrder.status} cannot be updated to status ${updateOrderDTO.status}`,
      );
    }
    const orderToUpdate =
      orderMapper.updateOrderDTOToPlainObject(updateOrderDTO);
    await this.orderRepository.update(orderToUpdate, { where: { id } });
    const updatedOrder = await this.findOrderById(id); //get the value from the database because the update method does not return the updated value
    return orderMapper.orderToOrderDTO(updatedOrder);
  };

  public findOrderById = async (
    id: number,
    transaction?: Transaction,
  ): Promise<Order> => {
    const order = await this.orderRepository.findByPk(id, { transaction });
    if (!order) {
      throw new OrderNotFoundError(id);
    }
    return order;
  };

  public findAndMapOrderById = async (id: number): Promise<OrderDTO> => {
    const order = await this.findOrderById(id);
    return orderMapper.orderToOrderDTO(order);
  };

  public addProductToOrder = async (
    addProductToOrderDTO: AddProductToOrderDTO,
  ): Promise<OrderDTO> => {
    const transaction = await sequelize.transaction();
    try {
      const order = await this.findOrderById(addProductToOrderDTO.getOrderId());
      if (order.status !== OrderStatus.PENDING) {
        throw new ValidationError(
          `Products can only be added to orders with status ${OrderStatus.PENDING}`,
        );
      }
      const product = await this.productService.findProductById(
        addProductToOrderDTO.getProductId(),
        transaction,
      );

      await this.productService.subtractStock(
        product,
        addProductToOrderDTO.getQuantity(),
        transaction,
      );

      const existingOrderProduct = await order.$get("orderProducts", {
        where: { productId: product.id, orderId: order.id },
        transaction,
      });

      if (existingOrderProduct.length > 0) {
        // a better way to do this?
        const orderProduct = existingOrderProduct[0];
        orderProduct.quantity += addProductToOrderDTO.getQuantity();
        await orderProduct.save({ transaction });
      } else {
        await this.orderProductRepository.create(
          {
            orderId: order.id,
            productId: product.id,
            quantity: addProductToOrderDTO.getQuantity(),
          },
          { transaction },
        );
      }

      await transaction.commit();
      return orderMapper.orderToOrderDTO(order);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
}
