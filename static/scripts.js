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

async function updateCourses() {
  const query = document.querySelector('#courseQuery').value;
  const courses = await fetch(`/courses?q=${query}`).then((res) => res.json());

  const container = document.querySelector('#courseContainer');
  container.innerHTML = '';

  let selectedCourses = document.getElementsByName('courseDiv');
  selectedCourses = Array.from(selectedCourses).map((course) => course.id);
  console.log(selectedCourses);

  courses.forEach((course) => {
    if (selectedCourses.includes(course.code)) {
      return;
    }

    const div = document.createElement('div');
    div.classList.add('col');
    div.setAttribute('name', 'courseDiv');
    div.setAttribute('draggable', 'true');
    div.ondragstart = (event) => drag(event);
    div.setAttribute('id', course.code);

    const div2 = document.createElement('div');
    div2.classList.add('border', 'border-black', 'my-1', 'py-2', 'rounded-1');

    const courseName = document.createElement('h5');
    courseName.classList.add('text-center', 'm-0');
    courseName.textContent = course.name;

    const courseCode = document.createElement('p');
    courseCode.classList.add('text-center', 'm-0', 'p-0');
    courseCode.textContent = course.code;

    // append
    div2.appendChild(courseName);
    div2.appendChild(courseCode);
    div.appendChild(div2);
    container.appendChild(div);
  });
}

window.onload = () => {
  updateCourses();
};
