import './css/style.scss';
import {ObjectBox, Arrow} from './js/component';
import data from './js/data/data.json';
import TreeGenerator from './js/data/TreeGenerator';
import { LevelContainer } from './js/container';

TreeGenerator(data);

for(let key in data){
  let objectTypename = data[key].name;
  let objectId = data[key].id;
  let description = data[key].description;
  $('#relationDiagram').append(
    LevelContainer(ObjectBox(objectTypename, objectId))
  );
}

$('#relationDiagram').append($('<div class="blank"></div>'))
$('#relationDiagram').append(
  Arrow()
);
