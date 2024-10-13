import { OperationType } from "./operation-type.model";

export interface Operation {
  operation_id: number;
  investment_id: number;
  operation_type: OperationType;
  operation_date: Date;
  quantity: number;
  unit_price: number;
  operation_value: number;
}
