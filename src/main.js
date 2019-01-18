import { Doctor } from './Doctor.js';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import logoIcon from './images/logo.jpg';
$("#logo").attr("src", function () {
  return logoIcon;
})

$(document).ready(function () {
  //Search by Keyword
  $("#conditionButton").click(function (event) {
    event.preventDefault();
    $("#results").empty();
    $("#results").html("<h2>Search Results</h2>");
    let condition = $("#condition").val();
    let location = $("#location").val();
    let newSearch = new Doctor(condition, location);
    let promise = newSearch.keyWordSearch();

    promise.then(function (response) {
      let body = JSON.parse(response);
      console.table(body);
      if (body.data.length == 0) {
        $("#results").append("No results found.");
      }
      for (let i = 0; i < body.data.length; i++) {

        $("#results").append(`<li id='${body.data[i].profile.first_name} ${body.data[i].profile.last_name}'>${body.data[i].profile.first_name} ${body.data[i].profile.last_name} ${body.data[i].profile.title}</li>`);
      }
      $("li").click(function (event) {
        $("#details").empty();
        $("#details").html("<h2>Doctor Details</h2>");
        let id = this.getAttribute("id");

        let detailsPromise = newSearch.getDetails(id);
        detailsPromise.then(function (response) {
          let body = JSON.parse(response);
          console.table(body);
          $("#details").append(`<img class='img-thumbnail' src=${body.data[0].profile.image_url} alt='profile'>`);
          $("#details").append(`<p>Name: ${body.data[0].profile.first_name} ${body.data[0].profile.last_name} ${body.data[0].profile.title}</p>`);
          if (body.data[0].ratings.length > 0) {
            $("#details").append(`<p>Ratings: ${body.data[0].ratings[0].rating}</p>`);
          }
          $("#details").append(`<p>Address: ${body.data[0].practices[0].visit_address.street}. ${body.data[0].practices[0].visit_address.city}, ${body.data[0].practices[0].visit_address.state} ${body.data[0].practices[0].visit_address.zip} </p>`);
          $("#details").append(`<span>Phone: </span><a href="tel:${body.data[0].practices[0].phones[0].number}"> ${body.data[0].practices[0].phones[0].number} </a>`);
          $("#details").append(`<p>Bio: ${body.data[0].profile.bio} </p>`);

        })
      })
    })
  })

  //Search by Doctor Name
  $("#doctorButton").click(function (event) {
    event.preventDefault();
    $("#results").empty();
    $("#results").html("<h2>Search Results</h2>");
    let doctor = $("#doctor").val();
    let location = $("#location").val();
    let newSearch = new Doctor(doctor, location);
    let promise = newSearch.nameSearch();

    promise.then(function (response) {
      let body = JSON.parse(response);
      console.table(body);
      if (body.data.length == 0) {
        $("#results").append("No results found.");
      }
      for (let i = 0; i < body.data.length; i++) {

        $("#results").append(`<li id='${body.data[i].profile.first_name} ${body.data[i].profile.last_name}'>${body.data[i].profile.first_name} ${body.data[i].profile.last_name} ${body.data[i].profile.title}</li>`);
      }
      $("li").click(function (event) {
        $("#details").empty();
        $("#details").html("<h2>Doctor Details</h2>");
        let id = this.getAttribute("id");

        let detailsPromise = newSearch.getDetails(id);
        detailsPromise.then(function (response) {
          let body = JSON.parse(response);
          console.table(body);
          $("#details").append(`<img class='img-thumbnail' src=${body.data[0].profile.image_url} alt='profile'>`);
          $("#details").append(`<p>Name: ${body.data[0].profile.first_name} ${body.data[0].profile.last_name} ${body.data[0].profile.title}</p>`);
          if (body.data[0].ratings.length > 0) {
            $("#details").append(`<p>Ratings: ${body.data[0].ratings[0].rating}</p>`);
          }
          $("#details").append(`<p>Address: ${body.data[0].practices[0].visit_address.street}. ${body.data[0].practices[0].visit_address.city}, ${body.data[0].practices[0].visit_address.state} ${body.data[0].practices[0].visit_address.zip} </p>`);
          $("#details").append(`<span>Phone: </span><a href="tel:${body.data[0].practices[0].phones[0].number}">${body.data[0].practices[0].phones[0].number} </a>`);
          $("#details").append(`<p>Bio: ${body.data[0].profile.bio} </p>`);
        })
      })
    })
  })
})
