/*(async function getData() {
  //Axios use params to add the query-string values
  const result = await axios.get(
    `https://ltv-data-api.herokuapp.com/api/v1/records.json`,
    {
      params: { email: "jonsmith@example.com" },
    }
  );

  console.log(result.data);
  const {
    email,
    description,
    first_name,
    last_name,
    address,
    phone_numbers,
    relatives,
  } = result.data;

  for (let person of relatives) {
    const para = document.createElement("p");
    const node = document.createTextNode(person);
    para.appendChild(node);
    document.getElementById("relatives").appendChild(para);
  }

  for (let numbers of phone_numbers) {
    const para = document.createElement("p");
    const node = document.createTextNode(numbers);
    para.appendChild(node);
    document.getElementById("phoneNumbers").appendChild(para);
  }

  document.getElementById("name").innerHTML = `${first_name} ${last_name}`;
  document.getElementById("email").innerHTML = email;
  document.getElementById("description").innerHTML = description;
  document.getElementById("address").innerHTML = address;
})();*/

function getData(email) {
  axios()
    .then((res) => showOutput(res.data))
    .catch((err) => console.error(err));
}
