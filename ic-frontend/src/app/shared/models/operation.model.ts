import { Investment } from "./investment.model";
import { OperationType } from "./operation-type.model";
import { CurrencyType } from "./currency-type.model";

export interface Operation {
  operation_id: number;
  investment: Investment;
  operation_type: OperationType;
  currency_type: CurrencyType;
  operation_date: Date;
  quantity: number;
  unit_price: number;
  operation_value: number;
}
