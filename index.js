let idCardForm = document.getElementById('id-card-form');
let idCardNumber = document.getElementById('id-card-input');
let formButton = document.getElementById('id-card-form-button');
let username = document.getElementById('name');
let clientSince = document.getElementById('client-since');

idCardNumber.addEventListener('input', function (event) {
  if (!event.target.value) {
    formButton.disabled = true;
  } else {
    formButton.disabled = false;
  }
});

idCardForm.addEventListener('submit', function (event) {
  event.preventDefault();

  fetch(`http://localhost:3001/clients/${idCardNumber.value}`)
    .then((response) => response.json())
    .then((data) => {
      console.log('data', data);
      if (data) {
        username.innerText = data.name ?? '';
        clientSince.innerText = `Cliente desde ${data.clientSince}` ?? '';
      }
    });
});
