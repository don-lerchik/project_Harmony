const main = document.querySelector(`.central`);

export const changeView = (node) => {
  main.innerHTML = ``;
  main.appendChild(node.element);
};

export const createElement = (string) => {
  const screen = document.createElement(`section`);
  screen.classList.add(`central`);
  screen.insertAdjacentHTML(`afterbegin`, string);
  return screen;
};
