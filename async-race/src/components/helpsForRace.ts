import store from '../app/store';
import { Api } from '../app/api';

const API = new Api();
export default class HelpsForRace {
  getPositionAtCenter = (el: HTMLElement) => {
    const { top, left, width, height } = el.getBoundingClientRect();
    return {
      x: left + width / 2,
      y: top + height / 2,
    };
  };
  getDistanceBetweenElements = (carOne: HTMLElement, flag: HTMLElement) => {
    const carOnePosition = this.getPositionAtCenter(carOne);
    const carTwoPosition = this.getPositionAtCenter(flag);
    return Math.hypot(carOnePosition.x - carTwoPosition.x, carOnePosition.y - carTwoPosition.y);
  };
  moveCarAnimation(car: HTMLElement, distance: number, animationTime: number): { id: number } {
    let start: number | null = null;
    const state = {
      id: 0,
    };
    function step(timestamp: number) {
      if (!start) start = timestamp;
      const time = timestamp - start;
      const passed = Math.round(time * (distance / animationTime));
      car.style.transform = `translateX(${Math.min(passed, distance)}px)`;
      if (passed < distance) {
        state.id = window.requestAnimationFrame(step);
      }
    }
    state.id = window.requestAnimationFrame(step);
    return state;
  }
  raceAllCar = async (
    promises: Promise<{ success: number; id: string; time: number }>,
    ids: string[]
  ): Promise<{ id: { name: string; color: string; id: string }; time: number }> => {
    // @ts-ignore
    const { success, time, id } = await Promise.race(promises);
    const { items: cars } = await API.getCars(store.carsPage, store.limitGarage);
    const fixedTime = 2;
    const conversationTimeToSec = 1000;
    if (!success) {
      await API.stopEngine(id);
      return this.raceAllCar(promises, ids);
    }
    const rightIdWinCars = cars.find((car: { id: string }) => car.id === id);
    return {
      id: rightIdWinCars,
      time: +(time / conversationTimeToSec).toFixed(fixedTime),
    };
  };
}
