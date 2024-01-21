import { IService, IServiceDetail } from "../models/IService";
import { get, post } from "../utils/axios";

const BASE_PATH = "/Order";

export const getAllServices = async (): Promise<IService[]> => {
  return get(BASE_PATH);
};

export const getServiceById = async (
  id: string
): Promise<IService | undefined> => {
  return get(`${BASE_PATH}/${id}`);
};

export const addService = async (service: IService): Promise<IService> => {
  return post(BASE_PATH, service);
};

export const getServiceDetailById = async (
  id: string
): Promise<IServiceDetail[]> => {
  return get(`${BASE_PATH}/detail/${id}`);
};

export const addServiceDetail = async (
  serviceDetail: IServiceDetail[],
  orderID: string
): Promise<IServiceDetail> => {
  console.log(serviceDetail);
  return post(`${BASE_PATH}/detail/${orderID}`, serviceDetail);
};

export const updateServiceDetail = async (
  serviceDetail: IServiceDetail
): Promise<IServiceDetail> => {
  return post(`${BASE_PATH}/detail/${serviceDetail.orderID}`, serviceDetail);
};
