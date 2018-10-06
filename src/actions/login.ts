export const SWITCH_LOGIN = 'SWITCH_LOGIN';
export type SWITCH_LOGIN = typeof SWITCH_LOGIN;

export interface ISwitchLogin {
    type: SWITCH_LOGIN;
    userName: string;
}

export const switchLogin = (userName: string): ISwitchLogin => (
    {
        type: SWITCH_LOGIN,
        userName
    }
);
