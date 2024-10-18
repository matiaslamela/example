import Order from "../database/models/order";
import CreateOrderDTO from "../dto/request/createOrderDTO";
import UpdateOrderDTO from "../dto/request/updateOrderDTO";
import OrderDTO from "../dto/response/orderDTO";

function createOrderDTOToPlainObject(createUserDTO: CreateOrderDTO) {
  return {
    userId: createUserDTO.userId,
    status: createUserDTO.status,
  };
}

function updateOrderDTOToPlainObject(updateOrderDTO: UpdateOrderDTO) {
  const orderToUpdate: { userId?: number; status?: string } = {};

  if (updateOrderDTO.userId) {
    orderToUpdate.userId = updateOrderDTO.userId;
  }

  if (updateOrderDTO.status) {
    orderToUpdate.status = updateOrderDTO.status;
  }
  return {
    orderToUpdate,
  };
}

function orderToOrderDTO(order: Order): OrderDTO {
  return new OrderDTO(
    order.id,
    order.status,
    order.userId,
    order.createdAt,
    order.updatedAt,
  );
}

export default {
  createOrderDTOToPlainObject,
  orderToOrderDTO,
  updateOrderDTOToPlainObject,
};
