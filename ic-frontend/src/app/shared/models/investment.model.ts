import { InvestmentType } from "./investment-type.model";

export interface Investment {
  investment_id: number;
  investment_name: string;
  investment_type_id: number;
  investment_type: InvestmentType;
}
