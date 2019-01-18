const seattle = "47.6062%2C-122.3321";
const portland = "45.5122%2C-122.6587";
const houston = "29.7604%2C-95.3698";
const sanantonio = "29.4241%2C-98.4936";
const austin = "30.2672%2C-97.7431";

export class Doctor {

  constructor(keyword, location) {
    this.keyword = keyword;
    this.location = location;
  }

  keyWordSearch() {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      let location;
      if (this.location == "seattle") {
        location = seattle;
      } else if (this.location == "portland") {
        location = portland;
      } else if (this.location == "houston") {
        location = houston;
      } else if (this.location == "sanantonio") {
        location = sanantonio;
      } else if (this.location == "austin") {
        location = austin;
      }
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${this.keyword}&user_location=${location}&sort=distance-asc&skip=0&limit=10&user_key=${process.env.exports.apiKey}`

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
      let location2;
      if (this.location == "seattle") {
        location2 = seattle;
      } else if (this.location == "portland") {
        location2 = portland;
      } else if (this.location == "houston") {
        location2 = houston;
      } else if (this.location == "sanantonio") {
        location2 = sanantonio;
      } else if (this.location == "austin") {
        location2 = austin;
      }
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${this.keyword}&user_location=${location2}&sort=distance-asc&skip=0&limit=10&user_key=${process.env.exports.apiKey}`

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
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${id}&skip=0&limit=1&user_key=${process.env.exports.apiKey}`

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