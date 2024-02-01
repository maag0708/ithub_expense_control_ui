import { IService, IServiceDetail, IServiceForm } from "../models/IService";
import { get, post, put } from "../utils/axios";

const BASE_PATH = "/Order";

//update status []
export const updateStatus = async (invoices: number[]): Promise<any> => {
  return put(`${BASE_PATH}/status/update`, invoices);
}

export const getAllServices = async (): Promise<IService[]> => {
  return get(BASE_PATH);
};

export const getAllServicesByDateRange = async (
  startDate: string,
  endDate: string
): Promise<IService[]> => {
  return get(`${BASE_PATH}/${startDate}/${endDate}`);
}

export const getAllServicesByWeek = async (
  week: number
): Promise<IService[]> => {
  return get(`${BASE_PATH}/week?=${week}`);
}

export const getServiceById = async (
  id: string
): Promise<IService | undefined> => {
  return get(`${BASE_PATH}/${id}`);
};

export const addService = async (service: IServiceForm): Promise<IService> => {
  return post(BASE_PATH, service);
};

export const getServiceDetailById = async (
  id: string
): Promise<IServiceDetail[]> => {
  return get(`${BASE_PATH}/detail/${id}`);
};

export const addServiceDetail = async (
  serviceDetail: any[],
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
