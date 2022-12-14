import axios from "axios";

export default class ApiService {

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  get(endpoint, onSuccess = (res) => {}, onFailure = (error) => {}) {
    axios
      .get(this.baseUrl + endpoint)
      .then(res => {
        console.log(res)
        onSuccess(res)
      }).catch(error => {
        console.log(error)
        onFailure(error)
      })
  }

  post(endpoint, body = {}, onSuccess = (res) => {}, onFailure = (error) => {}) {
    axios
      .post(this.baseUrl + endpoint, body)
      .then(res => {
        console.log(res)
        onSuccess(res)
      }).catch(error => {
        console.log(error)
        onFailure(error)
      })
  }
  
}