const form = document.querySelector("form");
const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const { value } = form.children[0];
  console.log(value);
  if (!value) return;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetch("http://localhost:3000/weather?address=" + value).then((response) =>
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        messageOne.textContent = data.error;
      } else {
        console.log(data);
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    })
  );
});
