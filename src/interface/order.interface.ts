import {CartInterface} from "./cart.interface";

export interface OrderInterface {
  $key : string;
  deliveryDetails : {
    address : string;
    contact :string;
    name : string;
    date : string;
    time : string;
  }

  orders : [CartInterface];

}
