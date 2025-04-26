interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  statusCode?: number;
  message?: string;
}
export default ServiceResponse;
