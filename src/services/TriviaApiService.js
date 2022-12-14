import ApiService from "./ApiService";

const BASE_URL = 'https://opentdb.com/';

export default class TriviaApiService {

  constructor() {
    this.apiService = new ApiService(BASE_URL)
  }

  fetchAllCategories(onSuccess = (res) => {}, onFailure = (error) => {}) {
    this.apiService.get('api_category.php', onSuccess, onFailure)
  }

  fetchQuestions(params, onSuccess = (res) => {}, onFailure = (error) => {}) {
    let queryParams = ''
    for (let key in params) {
      queryParams += `${key}=${params[key]}&`
    }
    // removing the last '&' character
    queryParams = queryParams.substring(0, queryParams.length - 1);
    this.apiService.get(`api.php${queryParams ? `?${queryParams}` : ``}`, onSuccess, onFailure)
  }

}