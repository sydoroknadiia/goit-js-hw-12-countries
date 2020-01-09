import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import PNotify from 'pnotify/dist/es/PNotify.js';

const input = document.querySelector('.input');
const ul = document.querySelector('.country');

input.addEventListener(
  'input',
  debounce(e => {
    fetchCountries(e.target.value)
      .then(data => {
        if (data.length <= 10 && data.length >= 2) {
          PNotify.error({
            text: 'Too much matches found. Please enter a more specific query!',
            delay: 4000,
            icon: true,
          });
          return data.reduce((acc, counrty) => {
            acc += `<li>${counrty.name}</li>`;
            return (ul.innerHTML = acc);
          }, '');
        }
        if (data.length === 1) {
          return data.reduce((acc, counrty) => {
            console.log('counrty', counrty);
            acc += `<h2 class="country__title">${counrty.name}</h2>
            <div class="country__wrapper">
            <div>
          <p class="counrty_descr"> Capital: ${counrty.capital}</p>
          <p class="counrty_descr"> Population: ${counrty.population} citizens</p>
          <p class="counrty_descr">Languages:
          <ul>
          ${counrty.languages.reduce((acc, cur) => {
            return (acc += `<li class="country_leng">${cur.name}</li>`);
          }, '')}
          </ul></p>
          </div>
          <div><img class="flag" src="${counrty.flag}"  alt="Flag"></div>`;
            return (ul.innerHTML = acc);
          }, '');
        } else {
          return '';
        }
      })
      .catch(error => console.warn(error));
  }, 500),
);
