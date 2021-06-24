import store from '../app/store';
import CreateCar from './createCar';
import { Api } from '../app/api';

const CREATECAR = new CreateCar();
const API = new Api();
export default class Garage {
  buildMainPage = (): void => {
    const { body } = document;
    const wrapper = <HTMLDivElement>document.createElement('div');
    const garage = <HTMLDivElement>document.createElement('div');
    garage.classList.add('garage');
    wrapper.classList.add('wrapper');
    wrapper.append('garage');
    body.append(wrapper);
  };
  togglerGarageAndWinner = (): void => {
    const { body } = document;
    const controlButton: HTMLElement = document.createElement('div');
    controlButton.classList.add('controlButton');
    controlButton.innerHTML = `<button id="toGarage" class="garage">Garage</button>
       <button id="toWinner" class="winner">Winner</button>`;
    body.append(controlButton);
  };
  renderGarage = async (): Promise<void> => {
    const { items: cars, count: carsCount } = await API.getCars(store.carsPage, store.limitGarage);
    const wrapper = <HTMLDivElement>document.querySelector('.wrapper');
    wrapper.innerHTML = `
    <p>Garage (${carsCount}) </p>
    <p>Page #${store.carsPage} </p>
    <ul class="garage">
     ${cars
       .map(
         (car: { id: string; name: string; color: string; isEngineStarted: boolean }) => `
           <li class="li__garage"><div class="car">${CREATECAR.buildCarMap(car.id, car.name, car.color, car.isEngineStarted)}</div></li>`
       )
       .join('')}
        </ul>
        `;
  };
  renderChangePageGarage = (): void => {
    const body = <HTMLBodyElement>document.querySelector('body');
    const divButtonPage = document.createElement('div');
    divButtonPage.classList.add('buttonPage');
    divButtonPage.innerHTML = `<button id="prev" class="buttonPrev" disabled>previus page </button>
      <button id="next" class="buttonNext" disabled>next page</button>`;
    body.appendChild(divButtonPage);
    this.changePageGarage();
  };
  changePageGarage = async (): Promise<void> => {
    const { items, count } = await API.getCars(store.carsPage);
    store.cars = items;
    if (count) {
      store.carsCount = +count;
    }
    const limit = 7;
    const page = 1;
    const buttonNext = <HTMLButtonElement>document.getElementById('next');
    const buttonPrev = <HTMLButtonElement>document.getElementById('prev');
    buttonPrev.disabled = store.carsPage <= page;
    buttonNext.disabled = store.carsCount < limit;
    buttonNext.disabled = store.carsPage * limit >= store.carsCount;
  };
  renderCongratulations = (winner: { id: { name: string } }, winnerTime: { id: { name: string; color: string; id: string }; time: number }): void => {
    const { time } = winnerTime;
    const { name } = winner.id;
    const body = <HTMLElement>document.querySelector('body');
    const message = document.createElement('div');
    message.classList.add('congratulations');
    message.innerHTML = `${name} went first ${time}`;
    body.appendChild(message);
  };
}
