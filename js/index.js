function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //Return true or false from validation
  return re.test(email);
}

function objToQueryString(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

function getData(email) {
  axios(
    "https://ltv-data-api.herokuapp.com/api/v1/records.json?" +
      objToQueryString({ email: email })
  )
    .then((res) => display(res))
    .catch((err) => console.error(err));
}

function display(res) {
  if (res.statusText === "OK") {
    $("#form").hide("fast");
    $("#items").hide("fast");
    showOutput(res);
  }
}

function deployInfo(res) {
  const {
    email,
    description,
    first_name,
    last_name,
    address,
    phone_numbers,
    relatives,
  } = res.data;

  console.log(res.data);
  for (let person of relatives) {
    const para = document.createElement("p");
    const node = document.createTextNode(person);
    para.appendChild(node);
    document.getElementById("relatives").appendChild(para);
  }

  for (let number of phone_numbers) {
    const para = document.createElement("p");
    const node = document.createTextNode(number);
    para.appendChild(node);
    document.getElementById("phoneNumbers").appendChild(para);
  }

  document.getElementById("name").innerHTML = `${first_name} ${last_name}`;
  document.getElementById("personEmail").innerHTML = email;
  document.getElementById("description").innerHTML = description;
  document.getElementById("address").innerHTML = address;
}

function showOutput(res) {
  $("#loading").show("slow");
  setTimeout(() => {
    $("#loading").hide("slow");

    $("#result").show("slow");
    $("#search").show("slow");

    deployInfo(res);
  }, 5000);
}

const form = document.getElementById("send");
form.addEventListener("submit", (event) => {
  const email = document.getElementById("email").value;
  event.preventDefault();

  if (!validateEmail(email)) {
    document.getElementById("input").setAttribute("class", "input");
    document.getElementById("email").setAttribute("class", "error");
    document.getElementById("alert").style.display = "block";
  } else {
    document.getElementById("email").setAttribute("class", "");
    console.log(email);
    getData(email);
  }
});

const formSearch = document.getElementById("sendSearch");
formSearch.addEventListener("submit", (event) => {
  const email = document.getElementById("email").value;
  event.preventDefault();

  if (!validateEmail(email)) {
    document.getElementById("email").setAttribute("class", "error");
  } else {
    document.getElementById("email").setAttribute("class", "");
    console.log(email);
    getData(email);
  }
});

$(document).ready(function () {
  $("#loading").hide("slow");
  $("#negativeResult").hide("slow");
  $("#search").hide("slow");
  $("#result").hide("slow");
});
