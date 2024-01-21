import { ILogin } from "../models/ILogin";
import { post } from "../utils/axios";

const BASE_PATH = "/Auth";

export const login = async (values: ILogin): Promise<any> => 
    post(`${BASE_PATH}/Login`, values);