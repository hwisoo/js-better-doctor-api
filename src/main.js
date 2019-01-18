import { Doctor } from './Doctor.js';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function () {
  $("#conditionButton").click(function (event) {
    event.preventDefault();
    $("#results").empty();
    $("#results").html("<h2>Search Results</h2>");
    let condition = $("#condition").val();
    let newSearch = new Doctor(condition);
    let promise = newSearch.keyWordSearch();

    promise.then(function (response) {
      let body = JSON.parse(response);
      console.table(body);
      for (let i = 0; i < body.data.length; i++) {

        $("#results").append(`<li id=${body.data[i].profile.slug}>${body.data[i].profile.first_name} ${body.data[i].profile.last_name} ${body.data[i].profile.title}</li>`);
      }
      $("li").click(function (event) {
        $("#details").empty();
        $("#detail").html("<h2>Doctor Details</h2>");
        let id = this.getAttribute("id");

        let detailsPromise = newSearch.getDetails(id);
        detailsPromise.then(function (response) {
          let body = JSON.parse(response);

          $("#details").append(`<img class='img-thumbnail' src=${body.data[0].profile.image_url} alt='profile'>`);
          $("#details").append(`<p>Name: ${body.data[0].profile.first_name} ${body.data[0].profile.last_name} ${body.data[0].profile.title}</li>`);
          $("#details").append(`<p>Bio: ${body.data[0].profile.bio} </li>`);


          $("#details").fadeIn();

        })

      })
    })
  })
})
