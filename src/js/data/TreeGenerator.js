import treeData from './objectTree.json';
import typeData from './objectType.json';

const TreeGenerator = () => {
  let mergedType = getMergedType(typeData);
  let basicTree = getBasicTree(mergedType);
  let childTree = getChildTree(mergedType);
  let forceTree = getForceLayoutTreeGenerator(mergedType);

  console.log('merge', mergedType);
  console.log('tree', basicTree);
  console.log('child', childTree);
  console.log('force', forceTree);
};

class ObjectType {
  constructor(parents, children, isRoot, isLastChild) {
    this.parents = parents;
    this.children = children;
    this.isRoot = isRoot || true;
    this.isLastChild = isLastChild || true;
  }
}

function getMergedType(typeData) {
  let returnData = {};
  for (let i = 0; i < typeData.length; i++) {
    let id = typeData[i].id;
    let relation = typeData[i].relation;
    let name = typeData[i].ObjectType;
    returnData[id] = {
      id: id,
      name: name,
      relation: relation,
      metric: treeData[id].metric
    };
  }

  return returnData;
}

function getBasicTree(mergedType) {
  let basicTree = {};
  for (let key in mergedType) {
    let tmpobj = {
      basic: [],
      custom: [],
      filter: [],
      isRoot: false
    };
    let relation = mergedType[key].relation;
    let count = 0;
    for (let key in relation) {
      let type = relation[key].type;
      tmpobj[type].push(key);
      count++;
    }

    if (count == 0) tmpobj.isRoot = true;

    basicTree[key] = tmpobj;
  }

  return basicTree;
}

function getChildTree(mergedType) {
  let childTree = {};

  for (let id in mergedType) {
    let name = id; //mergedType[id].name;
    childTree[name] = {
      parents: {
        basic: [],
        custom: [],
        filter: [],
        length: 0
      },
      children: {
        basic: [],
        custom: [],
        filter: [],
        length: 0
      },
      isRoot: true,
      isLastChild: true
    };
  }

  for (let id in mergedType) {
    let relation = mergedType[id].relation;
    let sourceName = id; //mergedType[id].name;
    for (let key in relation) {
      let type = relation[key].type;
      let name = key; //mergedType[key].name;
      childTree[name].parents[type].push(sourceName);
      childTree[name].isRoot = false;
      childTree[name].parents.length++;

      childTree[sourceName].children[type].push(name);
      childTree[sourceName].children.length++;
      childTree[sourceName].isLastChild = false;
    }
  }

  return childTree;
}



function getForceLayoutTreeGenerator(mergedType) {
  let returnObj = {
    "columns": [
      "source_id",
      "target_id",
      "path_name",
      "path_type",
      "source_name",
      "target_name",
      "path_color",
      "path_width",
      "source_size",
      "target_color",
      "relation_yn"
    ],
    "data": [],
    "config": {
      "option_type": "mix",
      "chart_type": "forcelayout",
      "marked_change": "Y",
      "layout": "x",
      "force_option": {
        "filterToggle": 0,
        "path": {
          "color": "#888",
          "width": 3
        },
        "circle": {
          "color": "#FFFFFF",
          "size": 30
        },
        "label": {
          "path": {
            "color": "#000000",
            "size": 15,
            "font": "Impact"
          },
          "circle": {
            "color": "#000000",
            "size": 15,
            "font": "Arial"
          }
        }
      }
    }
  }

  const itemEnum = {
    "sourceId": 0,
    "targetId": 1,
    "pathName": 2,
    "pathType": 3,
    "sourceName": 4,
    "targetName": 5,
    "path_color": 6,
    "path_width": 7,
    "source_size": 8,
    "target_color": 9,
    "relation_yn": 10,
  }

  const itemTemplate = ["company", "physical", "배우자", 0, "company", "physical", 2, 0, 65000000, 0, "N"];
  let data = returnObj.data;


  for(let key in mergedType){
    let objectTemplete = itemTemplate.slice();
    let {id, name, relation} = mergedType[key];
    objectTemplete[itemEnum['sourceId']] = id;
    objectTemplete[itemEnum['sourceName']] = name;
    for(var rkey in relation){
      let singleItem = objectTemplete.slice();
      singleItem[itemEnum['pathName']] = relation[rkey].relation.targetToSource;
      singleItem[itemEnum['targetId']] = rkey;
      singleItem[itemEnum['targetName']] = mergedType[rkey].name;
      data.push({
        items: singleItem
      });
    }
  }

  return returnObj;
}

export default TreeGenerator;
