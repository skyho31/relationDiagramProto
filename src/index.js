import './css/style.scss';
import {ObjectBox, Arrow} from './js/component';
import TreeGenerator from './js/data/TreeGenerator';
import { LevelContainer } from './js/container';

TreeGenerator();

$('#relationDiagram').append(
  LevelContainer(ObjectBox('hello', 'descrip'))
);

$('#relationDiagram').append($('<div class="blank"></div>'))
$('#relationDiagram').append(
  Arrow()
);
