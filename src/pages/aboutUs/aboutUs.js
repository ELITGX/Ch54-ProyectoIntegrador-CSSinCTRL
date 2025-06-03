import {insertHeader} from '../../../modules/header/header.js';
import { insertFooter } from '../../../modules/footer/footer.js';
const homePath ="../../../"

insertHeader(document.getElementById('header'), homePath);
insertFooter(document.getElementById('footer'));