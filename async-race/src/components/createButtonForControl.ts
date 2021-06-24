export default class CreateButtonForControl {
  buildButtonForControl = async (): Promise<void> => {
    const body: HTMLBodyElement | null = document.querySelector('body');
    const divForButton = document.createElement('div');
    divForButton.classList.add('control');
    body?.appendChild(divForButton);
    if (body) {
      divForButton.innerHTML = `<form id="createCar" class="form"  >
      <input id="nameCar" class="inputName" type="text" placeholder="Name">
      <input id="colorCreate" class="inputColor" type="color" value="black">
      <input id="submit" class="submit" type="submit" value="Create">
      </form>
        <form id="updateCar" class="form">
        <input id="updateNameCar" placeholder="Update name" type="text">
        <input id="updateColor" class="inputColor"  type="color" value="black">
        <input id="updateSubmit" class="submit" type="submit" value="Update">
      </form>
      <div class="raceControl">
      <button id="race" class="race">race</button>
      <button id="reset" class="reset">reset</button>
      <button id="generate" class="generate">generate cars</button>
       </div>`;
    }
  };
}
