/**
 * @generated SignedSource<<c76369de21ca7de981dc3aee81ff51a9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Todo",
    "kind": "LinkedField",
    "name": "removeTodo",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TodoList_TodoListRemoveTodoMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TodoList_TodoListRemoveTodoMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3b16b951b017d9597984511dd0633866",
    "id": null,
    "metadata": {},
    "name": "TodoList_TodoListRemoveTodoMutation",
    "operationKind": "mutation",
    "text": "mutation TodoList_TodoListRemoveTodoMutation(\n  $id: ID!\n) {\n  removeTodo(id: $id) {\n    id\n  }\n}\n"
  }
};
})();

node.hash = "7ea405925f4d34905579c3b0ec00abcc";

module.exports = node;
