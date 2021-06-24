import { Api } from '../app/api';
import store from '../app/store';
import HelpsForRace from './helpsForRace';

const API = new Api();
const HELPSRACE = new HelpsForRace();
export default class Race {
  startRace = async (id: string): Promise<{ success: number; id: string; time: number }> => {
    const startButton = document.getElementById(`startEngine-${id}`) as HTMLButtonElement;
    const stopButton = document.getElementById(`stopEngine-${id}`) as HTMLButtonElement;
    startButton.disabled = true;
    stopButton.disabled = false;
    const { velocity, distance } = await API.startEngine(id);
    const time = Math.round(distance / velocity);
    const car = <HTMLElement>document.getElementById(`car-${id}`);
    const flag = <HTMLElement>document.getElementById(`flag-${id}`);
    const raceDistance = Math.floor(HELPSRACE.getDistanceBetweenElements(car, flag)) + 100;
    store.animation = HELPSRACE.moveCarAnimation(car, raceDistance, time);
    const { success } = await API.drive(id);
    if (!success) {
      window.cancelAnimationFrame(store.animation.id);
    }
    return { success, id, time };
  };
  stopRace = async (id: string): Promise<void> => {
    const stopButton = document.getElementById(`stopEngine-${id}`) as HTMLButtonElement;
    const startButton = document.getElementById(`startEngine-${id}`) as HTMLButtonElement;
    stopButton.disabled = true;
    stopButton.classList.toggle('enabling', true);
    console.log(id);
    await API.stopEngine(id);
    stopButton.classList.toggle('enabling', false);
    startButton.disabled = false;
    const car = document.getElementById(`car-${id}`) as HTMLElement;
    car.style.transform = 'translateX(0)';
    window.cancelAnimationFrame(Number(id));
  };
}
