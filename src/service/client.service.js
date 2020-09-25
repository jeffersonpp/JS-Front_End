import http from "../http-common";

class ClientDataService 
{
  getAll() 
  {
    return http.get("/clients");
  }

  get(id) 
  {
    return http.get(`/client/${id}`);
  }

  create(data) 
  {
    return http.post("/client", data);
  }

  update(id, data) 
  {
    return http.put(`/client/${id}`, data);
  }

  delete(id) 
  {
    return http.delete(`/client/${id}`);
  }

  deleteAll()
  {
    return http.delete(`/clients`);
  }

  findByName(name) 
  {
    return http.get(`/client/name/${name}`);
  }
}

export default new ClientDataService();