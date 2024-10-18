import Order from "../../database/models/order";
import AddProductToOrderDTO from "../../dto/request/addProductToOrderDTO";
import CreateOrderDTO from "../../dto/request/createOrderDTO";
import UpdateOrderDTO from "../../dto/request/updateOrderDTO";
import OrderDTO from "../../dto/response/orderDTO";

export interface IOrderService {
  createOrder(createOrderDTO: CreateOrderDTO): Promise<OrderDTO>;
  updateOrder(id: number, updateOrderDTO: UpdateOrderDTO): Promise<OrderDTO>;
  findOrderById(id: number): Promise<Order>;
  findAndMapOrderById(id: number): Promise<OrderDTO>;
  addProductToOrder(
    addProductToOrderDTO: AddProductToOrderDTO,
  ): Promise<OrderDTO>;
}
