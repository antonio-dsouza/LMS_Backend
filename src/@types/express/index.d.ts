declare namespace Express {
    export interface Request {
        userAuthenticated: number;
        groups: Array;
    }
}