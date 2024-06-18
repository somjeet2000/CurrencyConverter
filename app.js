// Initialize the variable to get the elements
const BASE_URL =
  'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies';

const dropdowns = document.querySelectorAll('.dropdown select');
const btn = document.querySelector('#btn');
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const message = document.querySelector('#message');
const error = document.querySelector('#error');

// Code to get the list of countryList in the dropdown menu
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement('option');
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === 'from' && currCode === 'USD') {
      newOption.selected = select;
    } else if (select.name === 'to' && currCode === 'INR') {
      newOption.selected = select;
    }
    select.append(newOption);
  }
  select.addEventListener('click', evt => {
    updateFlag(evt.target);
  });
}

/* When user will change the value of the dropdown it will change the flag and the flag of the country will apprears*/
const updateFlag = element => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector('img');
  img.src = newSrc;
};

/* When user clicks on Get Exchange rates button, it will evaluate the from value and to value and call the API and then give the final amount */
const updateExchangeRate = async () => {
  let amount = document.querySelector('.amount input');
  let amtValue = amount.value;
  if (amtValue == 0 || amtValue < 0) {
    error.classList.remove('hide');
    // amtValue = 1;
    // amount.value = '1';
    message.classList.add('hide');
    error.innerText = 'Amount cannot be 0 or less than 0.';
  } else {
    error.classList.add('hide');
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount = amtValue * rate;
    console.log(amtValue);

    let convertStringToNumber = Number(amtValue);

    if (
      !Number.isInteger(convertStringToNumber) &&
      convertStringToNumber.toFixed(15) !== convertStringToNumber.toFixed(0)
    ) {
      message.innerText = `${convertStringToNumber.toFixed(15)}... ${
        fromCurr.value
      } = ${finalAmount} ${toCurr.value}`;
    } else {
      message.innerText = `${convertStringToNumber} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    }

    //message.innerText = `${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    message.classList.remove('hide');
  }
};

btn.addEventListener('click', evt => {
  evt.preventDefault();
  updateExchangeRate();
});

// window.addEventListener('load', () => {
//   updateExchangeRate();
// });
