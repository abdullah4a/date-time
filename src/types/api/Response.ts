export interface AxiosResponseError {
    code: number | string;
    name: string;
    message: string;
    stack?: string;
}