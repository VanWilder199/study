import store from '../app/store';
import Winner from './winner';

const WINNERS = new Winner();
export default class Sort {
  sortWinner = async (sort: string): Promise<void> => {
    store.sortOrder = store.sortOrder === 'asc' ? 'desc' : 'asc';
    store.sortBy = sort;
    const winnerTable = <HTMLElement>document.querySelector('.winnerTable');
    winnerTable.remove();
    await WINNERS.renderWinners();
  };
}
