import Garage from './garage';
import { Api } from '../app/api';
import Race from './race';
import Random from './random';
import Winner from './winner';
import store from '../app/store';
import HelpsForRace from './helpsForRace';
import Sort from './sort';

const GARAGE = new Garage();
const API = new Api();
const RACE = new Race();
const RANDOM = new Random();
const WINNER = new Winner();
const HELPSFORRACE = new HelpsForRace();
const SORT = new Sort();
export default class Listener {
  createCar = async () => {
    const nameCar = <HTMLInputElement>document.getElementById('nameCar');
    const colorCar = <HTMLInputElement>document.getElementById('colorCreate');
    document.getElementById('createCar')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nameCarValue = nameCar.value;
      const colorCarValue = colorCar.value;
      const car = {
        name: nameCarValue,
        color: colorCarValue,
      };
      await API.createCar(car);
      await GARAGE.renderGarage();
      await GARAGE.changePageGarage();
    });
  };
  selectIdCar = async (): Promise<void> => {
    document.body.addEventListener('click', async (e) => {
      const eTarget = <HTMLElement>e.target;
      const updateNameCar = <HTMLInputElement>document.getElementById('updateNameCar');
      const updateColor = <HTMLInputElement>document.getElementById('updateColor');
      let currentCar = null;
      if (eTarget.classList.contains('selectCar')) {
        currentCar = await API.getIdCar(eTarget.id.split('selectCar-')[1]);
        updateNameCar.value = currentCar?.name;
        updateColor.value = currentCar?.color;
        await this.updateCar(currentCar?.id);
      }
    });
  };
  updateCar = async (id: string): Promise<void> => {
    const updateNameCar = <HTMLInputElement>document.getElementById('updateNameCar');
    const updateColor = <HTMLInputElement>document.getElementById('updateColor');
    document.getElementById('updateCar')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const updateNameCarValue = updateNameCar.value;
      const updateColorValue = updateColor.value;
      const updateCar = {
        id,
        name: updateNameCarValue,
        color: updateColorValue,
      };
      await API.updateCar(updateCar.id, updateCar);
      await API.updateWinner(updateCar.id, updateCar);
      await GARAGE.renderGarage();
    });
  };
  deleteCar = (): void => {
    document.body.addEventListener('click', async (e) => {
      const eTarget = <HTMLElement>e.target;
      if (eTarget.classList.contains('removeCar')) {
        const id = eTarget.id.split('removeCar-')[1];
        await API.deleteWinner(id);
        await API.deleteCar(id);
        await GARAGE.renderGarage();
        await GARAGE.changePageGarage();
      }
    });
  };
  startCar = (): void => {
    document.body.addEventListener('click', async (e) => {
      const eTarget = <HTMLElement>e.target;
      if (eTarget.classList.contains('startEngine')) {
        const id = eTarget.id.split('startEngine-')[1];
        await RACE.startRace(id);
      }
    });
  };
  stopCar = (): void => {
    document.body.addEventListener('click', async (e) => {
      const eTarget = <HTMLElement>e.target;
      if (eTarget.classList.contains('stopEngine')) {
        const id = eTarget.id.split('stopEngine-')[1];
        await RACE.stopRace(id);
      }
    });
  };
  generateCar = (): void => {
    document.body.addEventListener('click', async (e) => {
      const eTarget = <HTMLElement>e.target;
      if (eTarget.classList.contains('generate')) {
        const cars = RANDOM.generateRandomCars();
        await Promise.all(cars.map(async (generate) => API.createCar(generate)));
        await GARAGE.renderGarage();
        await GARAGE.changePageGarage();
      }
    });
  };
  clickWinners = (): void => {
    document.body.addEventListener('click', (e) => {
      const eTarget = <HTMLElement>e.target;
      if (eTarget.classList.contains('winner')) {
        const control = <HTMLElement>document.querySelector('.control');
        const wrapper = <HTMLElement>document.querySelector('.wrapper');
        const buttonPage = <HTMLElement>document.querySelector('.buttonPage');
        const winnerTable = <HTMLElement>document.querySelector('.winnerTable');
        const winnerButton = <HTMLElement>document.querySelector('.buttonPageWinners');
        const textCongratulations = <HTMLDivElement>document.querySelector('.congratulations');
        control.style.display = 'none';
        wrapper.style.display = 'none';
        buttonPage.style.display = 'none';
        if (textCongratulations) {
          textCongratulations.remove();
        }
        if (winnerButton) {
          winnerButton.style.display = 'block';
        }
        if (winnerTable) {
          winnerTable.remove();
        }
        if (!winnerButton) {
          WINNER.renderChangePageWinners();
        }
        WINNER.renderWinners();
        WINNER.checkButtonWinners();
      }
    });
  };
  clickToGarage = (): void => {
    document.body.addEventListener('click', (e) => {
      const eTarget = <HTMLElement>e.target;
      if (eTarget.classList.contains('garage')) {
        const control = <HTMLElement>document.querySelector('.control');
        const wrapper = <HTMLElement>document.querySelector('.wrapper');
        const buttonPage = <HTMLElement>document.querySelector('.buttonPage');
        const winnerTable = <HTMLElement>document.querySelector('.winnerTable');
        const winnerButton = <HTMLElement>document.querySelector('.buttonPageWinners');
        control.style.display = 'block';
        wrapper.style.display = 'block';
        buttonPage.style.display = 'block';
        winnerTable.style.display = 'none';
        winnerButton.style.display = 'none';
      }
    });
  };
  changePageClickGarage = (): void => {
    document.body.addEventListener('click', async (e) => {
      const eTarget = <HTMLElement>e.target;
      if (eTarget.classList.contains('buttonPrev')) {
        store.carsPage--;
        await GARAGE.changePageGarage();
        await GARAGE.renderGarage();
      }
      if (eTarget.classList.contains('buttonNext')) {
        store.carsPage++;
        await GARAGE.changePageGarage();
        await GARAGE.renderGarage();
      }
    });
  };
  changePageClickWinner = (): void => {
    document.body.addEventListener('click', async (e) => {
      const winnerTable = <HTMLDivElement>document.querySelector('.winnerTable');
      const eTarget = <HTMLElement>e.target;
      if (eTarget.classList.contains('buttonPrevWinners')) {
        store.winnersPage--;
        await WINNER.renderWinners();

        winnerTable.remove();
        await WINNER.checkButtonWinners();
      }
      if (eTarget.classList.contains('buttonNextWinners')) {
        store.winnersPage++;
        winnerTable.remove();
        await WINNER.checkButtonWinners();
        await WINNER.renderWinners();
      }
    });
  };
  resetButton = (): void => {
    document.body.addEventListener('click', async (e) => {
      const raceButton = <HTMLButtonElement>document.querySelector('.race');
      const textCongratulations = <HTMLDivElement>document.querySelector('.congratulations');
      const eTarget = <HTMLButtonElement>e.target;
      if (eTarget.classList.contains('reset')) {
        if (textCongratulations) {
          textCongratulations.remove();
        }
        raceButton.disabled = false;
        eTarget.disabled = true;
        console.log(store.cars);
        store.cars.map(({ id }) => RACE.stopRace(id));
      }
    });
  };
  raceButton = (): void => {
    const textCongratulations = <HTMLDivElement>document.querySelector('.congratulations');
    const resetButton = <HTMLButtonElement>document.querySelector('.reset');
    document.body.addEventListener('click', async (e) => {
      const eTarget = <HTMLButtonElement>e.target;
      if (eTarget.classList.contains('race')) {
        if (textCongratulations) {
          textCongratulations.remove();
        }
        eTarget.disabled = true;
        resetButton.disabled = false;
        const winner = await this.raceCar();
        await API.saveWinner(winner.id.id, winner.time);
        GARAGE.renderCongratulations(winner, winner);
      }
    });
  };
  raceCar = async (): Promise<{ id: { name: string; color: string; id: string }; time: number }> => {
    const { items: cars } = await API.getCars(store.carsPage, store.limitGarage);
    const promises: Promise<{ success: number; id: string; time: number }> = cars.map((id: { id: string }) => RACE.startRace(id.id));
    return await HELPSFORRACE.raceAllCar(
      promises,
      cars.map((id: string) => id)
    );
  };
  sortByWinner = (): void => {
    document.body.addEventListener('click', async (e) => {
      const eTarget = <HTMLButtonElement>e.target;
      if (eTarget.classList.contains('table-wins')) {
        await SORT.sortWinner('wins');
      }
    });
  };
  sortByTime = (): void => {
    document.body.addEventListener('click', async (e) => {
      const eTarget = <HTMLButtonElement>e.target;
      if (eTarget.classList.contains('table-time')) {
        await SORT.sortWinner('time');
      }
    });
  };
}
