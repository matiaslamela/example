import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  Default,
  HasMany,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import User from "./user";
import OrderProduct from "./orderProduct";

export enum OrderStatus {
  PENDING = "pending",
  COMPLETED = "completed",
}

@Table({
  tableName: "orders",
  timestamps: true,
  underscored: true,
})
export default class Order extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  id!: number;

  @Default(OrderStatus.PENDING)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status!: OrderStatus;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => OrderProduct)
  orderProducts!: OrderProduct[];

  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt!: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updatedAt!: Date;

  public canTransitionTo(nextStatus?: OrderStatus): boolean {
    if (
      nextStatus &&
      this.status === OrderStatus.PENDING &&
      nextStatus === OrderStatus.COMPLETED
    ) {
      return true;
    }
    return false;
  }
}
