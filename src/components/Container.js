import utils from './utils';
import nav from './header/header';
import footer from './footer/footer';

let container = utils.make('div', 'container-fluid');

// nav
container = utils.appendBulkChild(container, [nav]);

// body content
const contentWrapper = utils.make('div', 'content-wrapper')

// left section of the main content
const aside = utils.make('aside', 'left-aside', main);

// right section of th main section
const main = utils.make('main', 'body-content');

container = utils.appendBulkChild(container, [main,]);

export default container;
