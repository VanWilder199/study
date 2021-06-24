export class Api {
  private base: string;
  private garage: string;
  private engine: string;
  private winners: string;
  constructor() {
    this.base = 'http://localhost:3000';
    this.garage = `${this.base}/garage`;
    this.engine = `${this.base}/engine`;
    this.winners = `${this.base}/winners`;
  }
  getCars = async (page: number, limit = 7) => {
    const response = await fetch(`${this.garage}?_page=${page}&_limit=${limit}`);
    return {
      items: await response.json(),
      count: response.headers.get('X-Total-Count'),
    };
  };
  getIdCar = async (id: string) => (await fetch(`${this.garage}/${id}`)).json();
  createCar = async (body: { color: string; name: string }) =>
    (
      await fetch(this.garage, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();
  deleteCar = async (id: string) =>
    (
      await fetch(`${this.garage}/${id}`, {
        method: 'DELETE',
      })
    ).json();
  updateCar = async (id: string, body: { color: string; name: string }) =>
    (
      await fetch(`${this.garage}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();
  startEngine = async (id: string) => (await fetch(`${this.engine}?id=${id}&status=started`)).json();
  stopEngine = async (id: string) => (await fetch(`${this.engine}?id=${id}&status=stopped`)).json();
  drive = async (id: string) => {
    const res = await fetch(`${this.engine}?id=${id}&status=drive`).catch();
    return res.status !== 200 ? { success: false } : { ...(await res.json()) };
  };
  getSortOrder = (sort: string, order: string) => {
    if (sort && order) return `&_sort=${sort}&_order=${order}`;
    return '';
  };
  getWinners = async (page: string, limit = 10, sort: string, order: string) => {
    const response = await fetch(`${this.winners}?_page=${page}&_limit=${limit}${this.getSortOrder(sort, order)}`);
    const items = await response.json();
    return {
      items: await Promise.all<{
        winner: { id: string; wins: string; time: number };
        car: { color: string; name: string };
      }>(
        items.map(async (winner: { id: string; wins: string; time: number }) => ({
          winner,
          car: await this.getIdCar(winner.id),
        }))
      ),
      count: <string>response.headers.get('X-Total-Count'),
    };
  };

  getWinner = async (id: string) => (await fetch(`${this.winners}/${id}`)).json();
  getWinnerStatus = async (id: string) => (await fetch(`${this.winners}/${id}`)).status;
  deleteWinner = async (id: string) =>
    (
      await fetch(`${this.winners}/${id}`, {
        method: 'DELETE',
      })
    ).json();
  createWinner = async (body: { id: string; wins: number; time: number }) =>
    (
      await fetch(`${this.winners}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();
  updateWinner = async (id: string, body: { color: string; name: string; id: string }) =>
    (
      await fetch(`${this.winners}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();
  updateWinnerToSave = async (id: string, body: { wins: number; id: string; time: number }) =>
    (
      await fetch(`${this.winners}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();

  saveWinner = async (id: string, time: number) => {
    const winnerStatus = await this.getWinnerStatus(id);
    if (winnerStatus === 404) {
      await this.createWinner({
        id: '',
        wins: 1,
        time,
      });
    } else {
      const winner = await this.getWinner(id);
      await this.updateWinnerToSave(id, {
        id: '',
        wins: winner.wins + 1,
        time: time < winner.time ? time : winner.time,
      });
    }
  };
}
