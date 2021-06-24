export default class Random {
  private models: string[];
  private names: string[];
  constructor() {
    this.models = ['Audi', 'Mersedes', 'BMW', 'Toyouta', 'Opel', 'Tesla', 'Porsche', 'Peuogeot'];
    this.names = ['A4', 'A5', 'A6', 'S4', 'RS6', 'Camry', 'S', 'SLS', '911', 'Astra', '3'];
  }
  getRandomName(): string {
    const model = this.models[Math.floor(Math.random() * this.models.length)];
    const name = this.names[Math.floor(Math.random() * this.names.length)];
    return `${model} ${name}`;
  }
  getRandomColor(): string {
    const random = '0123456789ABCDEFGHJYUIO';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += random[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  generateRandomCars = (count = 100): { color: string; name: string }[] =>
    new Array(count).fill(1).map((_) => ({
      name: this.getRandomName(),
      color: this.getRandomColor(),
    }));
}
