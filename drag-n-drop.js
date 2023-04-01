const iconContainer = document.querySelector("#icon-container");
const iconItem = document.querySelectorAll("#icon-item");

function createElement(tag, options) {
  const e = document.createElement(tag);

  const elementId = options.id;
  const elementClassName = options.class;

  if (elementId) e.setAttribute("id", elementId);

  if (elementClassName) {
    e.classList.add(elementClassName);
  }

  return e;
}

// -------------------------------------------------------
// Icon grid functionality
// -------------------------------------------------------
function makeBaby(n) {
  Array.from(Array(n)).map((_) => {
    iconContainer?.append(createElement("div", { id: "grid-helper" }));
  });
}

const gridResize = () => {
  const gridHelper = document.querySelectorAll("#grid-helper");
  const icCols = Math.floor(iconContainer.clientWidth / 100);
  const icRows = Math.floor(iconContainer.clientHeight / 100);

  iconContainer.style.setProperty("--cols", icCols);
  iconContainer.style.setProperty("--rows", icRows);

  gridHelper.forEach((box) => box.remove());

  makeBaby(icCols * icRows);
};

gridResize();
window.addEventListener("resize", gridResize);

const multipleEventListeners = (element, events, callbackfn) => {
  events.forEach((event) => {
    element.addEventListener(event, callbackfn);
  });
};

function sortIcons() {
  iconItem.forEach((icon, index) => {
    const indexClient = iconContainer.children[index].getBoundingClientRect();

    const containerX = indexClient.x;
    const containerY = indexClient.y;

    icon.style.transform = `translate3d(${containerX}px, ${containerY}px, 0)`;
  });
}

sortIcons();

iconItem.forEach((icon, index) => {
  const moveItem = (e) => {
    const t = e.target;
    // const parentItemChildren = t.parentNode.children;
    // const itemIndex = Array.from(parentItemChildren).indexOf(t);
    const itemRect = t.getBoundingClientRect();

    const irX = itemRect.x;
    const irY = itemRect.y;

    console.log({ irX, irY });
    icon.style.transform = `translate3d(${irX}px, ${irY}px, 0)`;
  };

  // Event listeners to move the damn thing
  icon.onmousedown = () => {
    icon.style.pointerEvents = "none";
    console.log(`${index} down`);
    window.addEventListener("mousemove", moveItem);
  };

  icon.onmouseup = () => {
    icon.style.pointerEvents = "";
    console.log(`${index} up`);
    window.removeEventListener("mousemove", moveItem);
  };
});
