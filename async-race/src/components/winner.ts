import store from '../app/store';
import { Api } from '../app/api';
import CreateCar from './createCar';

const API = new Api();
const CREATECAR = new CreateCar();
export default class Winner {
  renderWinners = async (): Promise<void> => {
    const { items: winners, count: winnersCount } = await API.getWinners(store.winnersPage.toString(), store.limitWinners, store.sortBy, store.sortOrder);
    // @ts-ignore
    store.winners = winners;
    store.winnersCount = winnersCount;
    const body = <HTMLElement>document.querySelector('body');
    const winner = <HTMLDivElement>document.createElement('div');
    winner.classList.add('winnerTable');
    body.appendChild(winner);
    winner.innerHTML = `
      <p>Winners (${winnersCount}) </p>
      <p>Page #(${store.winnersPage}) </p>
      <table class="table" cellpadding="0" border="0" cellspacing="0">
      <thead>
      <th>Number</th>
      <th>Car</th>
      <th>Name</th>
      <th class="table-wins ${store.sortBy === 'wins' ? store.sortOrder : ''}" id="sortByWins">Wins</th>
      <th class="table-time ${store.sortBy === 'time' ? store.sortOrder : ''}" id="sortByTime">Best Time</th>
    </thead>
    <tbody>
       ${store.winners
         .map((winnerName, index) => {
           const carColor = winnerName.car!.color;
           const carName = winnerName.car!.name;
           const carWins = winnerName.winner!.wins;
           const carTime = winnerName.winner!.time;
           return `
       <tr>
            <td>${index + 1}</td>
            <td>${CREATECAR.renderCarImage(carColor)}</td>
            <td>${carName}</td>
            <td>${carWins}</td>
            <td>${carTime}</td>

        </tr>`;
         })
         .join('')}
  </tbody>
  </table>
     `;
  };
  renderChangePageWinners = async (): Promise<void> => {
    const divButtonPage = document.createElement('div');
    const controlButton = <HTMLDivElement>document.querySelector('.controlButton');
    divButtonPage.classList.add('buttonPageWinners');
    divButtonPage.innerHTML = `<button id="prevWinners" class="buttonPrevWinners" disabled>previus page </button>
      <button id="nextWinners" class="buttonNextWinners" disabled>next page</button>`;
    controlButton.appendChild(divButtonPage);
  };
  checkButtonWinners = async (): Promise<void> => {
    const { count } = await API.getWinners(store.winnersPage.toString(), store.limitWinners, store.sortBy, store.sortOrder);
    const countWinners = Number(count);
    const pageNumber = Number(store.winnersPage);
    const buttonNext = <HTMLButtonElement>document.getElementById('nextWinners');
    const buttonPrev = <HTMLButtonElement>document.getElementById('prevWinners');
    const minPageNumber = 1;
    if (buttonPrev && buttonNext) {
      buttonNext.disabled = pageNumber * store.limitWinners >= countWinners;
      buttonPrev.disabled = pageNumber <= minPageNumber;
    }
  };
}
