import { ISwitchLogin } from './switchLogin';

interface IOrderAction {
    type: string;
}

export type OrderAction = ISwitchLogin | IOrderAction;
