import { request } from './Http';

const apiService = {
  getAll: (params: object = {}) => request.get(`tasks`, { params }),
  add: (task: object) => request.post(`tasks`, task),
  update: (id: number | undefined, task: object) => request.put(`tasks/${id}`, task),
  delete: (id: number | undefined) => request.delete(`tasks/${id}`),
};

export default apiService;
