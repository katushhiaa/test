import axios from "axios";

class Network {
  constructor() {
    this.baseUrl = "http://localhost:3001";
  }

  signUp(data) {
    return axios.post(`${this.baseUrl}/signup`, data);
  }

  login(data) {
    return axios.post(`${this.baseUrl}/login`, data);
  }

  getAllStudents() {
    return axios.get(`${this.baseUrl}/students`);
  }

  certificateDate(data) {
    return axios.post(`${this.baseUrl}/certificateData`, data);
  }

  getCertData() {
    return axios.get(`${this.baseUrl}/getCertData`);
  }

  getAll() {
    return axios.get(`${this.baseUrl}/signup`);
  }

  get(id) {
    return axios.get(`${this.baseUrl}/signup/${id}`);
  }

  create(data) {
    return axios.post(`${this.baseUrl}/signup`, data);
  }

  update(id, data) {
    return axios.put(`${this.baseUrl}/signup/${id}`, data);
  }

  delete(id) {
    return axios.delete(`${this.baseUrl}/signup/${id}`);
  }

  deleteAll() {
    return axios.delete(`${this.baseUrl}/signup`);
  }
}

export default new Network();
