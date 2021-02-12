const $form = $("#form");
const $formWrapper = $("#form-wrapper");
const $items = $("#items");
const $loading = $("#loading");
const $result = $("#result");
const $search = $("#search");
const $searchEmailFormBtn = $("#get");
const $emailField = $("#email");
const $anotherEmailField = $("#anotherEmail");
const $searchAnotherEmailFormBtn = $("#getEmail");
const $alertAnother = $("alertAnother");
const $inputAnother = $("#inputAnother");
const $relatives = $("#relatives");
const $phoneNumbers = $("#phoneNumbers");
const $name = $("#name");
const $input = $("#input");
const $alert = $("#alert");
const $negativeResult = $("#negativeResult");
const $personEmail = $("#personEmail");
const $description = $("#description");
const $address = $("#address");

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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

function toggleSearch(show) {
  if (show) {
    $loading.show();
    $form.hide();
    $items.hide();
    $result.hide();
    $search.hide();
    $negativeResult.hide();
  } else {
    $loading.hide();
    $form.show();
    $items.show();
  }
}

function waitNSeconds(seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}

function getData(email) {
  toggleSearch(true);

  waitNSeconds(3).then(() => {
    axios(
      "https://ltv-data-api.herokuapp.com/api/v1/records.json?" +
        objToQueryString({ email: email })
    )
      .then((res) => {
        displayDataSuccess(res);
        $loading.hide();
      })
      .catch((err) => {
        toggleSearch(false);
        console.error(err);
      });
  });
}

function displayDataSuccess({ data, status }) {
  if (status === 200 && !Array.isArray(data)) {
    showOutput(data);
  } else {
    displayDataError();
  }
}

function displayDataError() {
  $negativeResult.show();
  $search.show();
}

function deployInfo({
  email,
  description,
  first_name,
  last_name,
  address,
  phone_numbers,
  relatives,
}) {
  const relativesInfo = $("<div></div>");
  for (const person of relatives) {
    relativesInfo.append("<p>" + person + "</p>");
  }

  $relatives.append(relativesInfo);

  const phoneNumberInfo = $("<div></div>");
  for (const number of phone_numbers) {
    phoneNumberInfo.append("<p>" + number + "</p>");
  }

  $phoneNumbers.append(phoneNumberInfo);

  $name.text(`${first_name} ${last_name}`);
  $personEmail.text(`${email}`);
  $description.text(`${description}`);
  $address.text(`${address}`);
}

function showOutput(res) {
  $result.show();
  $search.show();
  $negativeResult.hide();
  deployInfo(res);
}

function handleSearchEmailForm(event) {
  event.preventDefault();

  const email = $emailField.val();

  if (!validateEmail(email)) {
    $emailField.addClass("error");
    $input.addClass("input");
    $alert.css("display", "block");
  } else {
    $emailField.removeClass("error");
    getData(email);
  }
}

function handleSearchAnotherEmailFormBtn(event) {
  event.preventDefault();

  const anotherEmail = $anotherEmailField.val();

  if (!validateEmail(anotherEmail)) {
    $anotherEmailField.addClass("error");
    $inputAnother.addClass("input");
    $alertAnother.css("display", "block");
  } else {
    $anotherEmailField.removeClass("error");
    getData(anotherEmail);
  }
}

function addEvents() {
  $searchEmailFormBtn.click(handleSearchEmailForm);
  $searchAnotherEmailFormBtn.click(handleSearchAnotherEmailFormBtn);
}

function init() {
  addEvents();
  toggleSearch(false);
}

$(document).ready(init);

//function () {
//   $("#loading").hide("slow");
//   $("#negativeResult").hide("slow");
//   $("#search").hide("slow");
//   $("#result").hide("slow");
// }
