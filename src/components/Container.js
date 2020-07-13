import utils from './utils';
import nav from './header/header';
import asideContainer from './sidebar/aside';
import footer from './footer/footer';
import listWrapper from './todoListItems/todoListItems';
import addListItem from './todoListItems/addTodoListItem';

let container = utils.make('div', 'container-fluid');
let contentWrapper = utils.make('div', 'content-wrapper');
const aside = utils.make('aside', 'left-aside');
aside.appendChild(asideContainer);

let main = utils.make('main', 'body-content');

main = utils.appendBulkChild(main, [nav, listWrapper]);
contentWrapper = utils.appendBulkChild(contentWrapper, [aside, main]);

container = utils.appendBulkChild(container, [
  contentWrapper,
  addListItem.addListContainer,
]);

export default container;
