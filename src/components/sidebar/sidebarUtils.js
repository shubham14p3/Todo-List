import utils from '../utils';
import data from '../data';
import pasteData from '../todoListItems/listUtils';

const projectFilter = (event) => {
  const { target } = event;

  const allLinks = document.getElementsByClassName('links');
  Array.from(allLinks).forEach((anchor) => anchor.classList.remove('active'));

  target.classList.add('active');

  const inText = target.innerText;

  const listTitle = document.getElementsByClassName('list-title')[0];
  listTitle.innerText = '';
  listTitle.appendChild(document.createTextNode(inText));

  let newData = [];
  const data = JSON.parse(window.localStorage.getItem('listItems'))
  data.forEach((item) => {
    const listItemWrapper = document.getElementsByClassName(
      'list-item-wrapper'
    )[0];
    if (inText === 'All') {
      newData = data;
    } else if (item.project === inText) {
      newData.push(item);
    }
    pasteData(newData, listItemWrapper);
  });
};

const pasteProjects = function pasteProjects(projects, filter = projectFilter) {
  JSON.parse(window.localStorage.getItem('projects')).forEach((project) => {
    const li = utils.make('li', 'd-flex flex-column project-item');
    const link = utils.make('a', 'links', undefined, {
      href: '#',
    });

    link.addEventListener('click', filter);
    const text = document.createTextNode(project);

    link.appendChild(text);
    li.appendChild(link);
    projects.appendChild(li);
  });
};

export default pasteProjects;
