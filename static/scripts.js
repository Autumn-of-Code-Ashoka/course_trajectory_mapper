function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData('text', ev.target.id);
}

function drop(ev) {
  ev.preventDefault();

  const data = ev.dataTransfer.getData('text');
  const elem = document.getElementById(data);

  let target = ev.target;
  while (target.getAttribute('droppable') !== 'true') {
    target = target.parentNode;
    if (!target) {
      ev.preventDefault();
      return;
    }
  }

  target.appendChild(elem);
}
