let bodyContent = document.getElementById('body-container');

let idCardForm = document.getElementById('id-card-form');
let idCardNumber = document.getElementById('id-card-input');
let formButton = document.getElementById('id-card-form-button');
let username = document.getElementById('name');
let clientSince = document.getElementById('client-since');
let clientId = document.getElementById('card-id');
const loyaltyCards = document.querySelectorAll('.loyalty-card');
let historyHeaderAmount = document.getElementById('history-header-amount');
let historyList = document.getElementById('history-list');
let progressRemaining = document.getElementById('progress-remaining');
let errorContainer = document.getElementById('error-container');
let dialogContainer = document.getElementById('dialog-container');

idCardNumber.addEventListener('input', function (event) {
  if (!event.target.value) {
    formButton.disabled = true;
  } else {
    formButton.disabled = false;
  }
});

dialogContainer.addEventListener('click', function () {
  dialogContainer.style.display = 'none';
});

function updateProgress(current, total) {
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const percentage = (current / total) * 100;

  progressBar.style.width = percentage + '%';
  progressText.textContent = `${current} de ${total}`;
}

idCardForm.addEventListener('submit', function (event) {
  event.preventDefault();

  fetch(`http://localhost:3001/clients/${idCardNumber.value}`)
    .then((response) => response.json())
    .then((data) => {
      console.log('data', data);
      if (data) {
        errorContainer.style.display = 'none';
        bodyContent.style.display = 'grid';
        username.innerText = data.name ?? '';
        clientSince.innerText = `Cliente desde ${data.clientSince}` ?? '';
        clientId.innerText = `ID: ${data.id}` ?? '';

        loyaltyCards.forEach((card, index) => {
          if (index < data.loyaltyCard.totalCuts) {
            card.innerHTML = `<img src="assets/PinCheck.svg"  class="pincheck" />`;
          }
        });
        historyHeaderAmount.innerText = `${data.appointmentHistory.length} cortes`;

        data.appointmentHistory.forEach((history) => {
          const historyItem = document.createElement('div');
          historyItem.classList.add('history-item');
          historyItem.innerHTML = `          
            <div>
              <p>${history.date}</p>
              <p>${history.time}</p>
            </div>
            <img src="assets/PinCheckFilled.svg" /> 
          `;

          historyList.appendChild(historyItem);
        });

        progressRemaining.innerHTML = `<span>${data.loyaltyCard.cutsRemaining}</span> cortes restantes`;
        updateProgress(data.loyaltyCard.totalCuts, 10);

        if (data.loyaltyCard.cutsRemaining === 0) {
          dialogContainer.style.display = 'flex';
        }
      }
    })
    .catch((error) => {
      bodyContent.style.display = 'none';
      errorContainer.style.display = 'flex';
    });
});
