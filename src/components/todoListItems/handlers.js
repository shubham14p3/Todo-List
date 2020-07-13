import utils from '../utils';
import pasteData from './listUtils';

function handlers() {
  const handleDeleteItem = (event) => {
    const parent = event.target.parentNode.parentNode;
    const itemId = parent.getAttribute('data-id');
    const oldData = JSON.parse(window.localStorage.getItem('listItems'));
    const newData = oldData.filter((item) => item.uuid.toString() !== itemId);

    // window.localStorage.removeItem('listItems');
    window.localStorage.setItem('listItems', JSON.stringify(newData));

    parent.parentNode.removeChild(parent);
  };

  const isDone = (event) => {
    const { target } = event;
    const isChecked = target.checked;
    const id = target.getAttribute('data');
    const db = JSON.parse(window.localStorage.getItem('listItems'));
    const item = db.filter((item) => item.uuid.toString() === id)[0];
    item.complete = isChecked;
    const oldData = db.filter((item) => item.uuid.toString() !== id);
    oldData.push(item);
    window.localStorage.setItem('listItems', JSON.stringify(oldData));


    if (isChecked === true) {
      utils.strike(target.parentNode);
    }
    if (isChecked === false) {
      Array.from(target.parentNode.childNodes)
        .slice(1, -2)
        .forEach((element) => {
          element.classList.remove('strike-through');
        });
    }

    // .classLists.add('strike-through');
    // pasteData(oldData, document.getElementsByClassName('list-item-wrapper')[0]);
  };

  function toggleInputForm(current = undefined) {
    const select = document.getElementById('project');
    select.innerHTML = '';

    const projects = JSON.parse(window.localStorage.getItem('projects'));

    // projects.

    projects.forEach((project) => {
      const option = utils.make('option', '', select, {
        project,
      });
      option.appendChild(document.createTextNode(project));
    });
    // select.setAttribute('id', 'project');

    const inputForm = document.getElementsByClassName('list-input-wrapper')[0];
    inputForm.data = current.uuid || '';

    const description = document.getElementById('description');
    const due = document.getElementById('due-date');
    due.value = current.due;
    description.value = current.description || '';
    const title = document.getElementById('title');
    title.value = current.title || '';

    inputForm.classList.toggle('d-none');
  }

  const handleEdit = (event) => {
    const { target } = event;
    const parent = target.parentNode.parentNode;

    const data = JSON.parse(window.localStorage.getItem('listItems'));
    const current = data.filter(
      (record) =>
        record.uuid.toString() === parent.getAttribute('data-id').toString()
    );

    toggleInputForm(current[0]);
  };

  return {
    handleDeleteItem,
    handleEdit,
    toggleInputForm,
    isDone,
  };
}

export default handlers();
