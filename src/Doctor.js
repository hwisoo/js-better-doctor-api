import { API_KEY } from '../.env';
export class Doctor {
  constructor(keyword) {
    this.keyword = keyword;
    this.location = "47.6062%2C-122.3321"
  }

  keyWordSearch() {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${this.keyword}&user_location=${this.location}&sort=distance-asc&skip=0&limit=10&user_key=${API_KEY}`

      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }

  nameSearch() {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      let url = ` https://api.betterdoctor.com/2016-03-01/doctors?name=${this.keyword}&user_location=${this.location}&sort=distance-asc&skip=0&limit=10&user_key=${API_KEY}`

      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });

  }

  getDetails(id) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${id}&skip=0&limit=1&user_key=${API_KEY}`

      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}