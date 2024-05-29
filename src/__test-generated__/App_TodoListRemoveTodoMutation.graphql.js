/**
 * @generated SignedSource<<ef84e4c1fc7aee4f551fa6f3ac124b6f>>
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
    "name": "App_TodoListRemoveTodoMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "App_TodoListRemoveTodoMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7d67d009fa52eee0aa1e9e34ad852b8e",
    "id": null,
    "metadata": {},
    "name": "App_TodoListRemoveTodoMutation",
    "operationKind": "mutation",
    "text": "mutation App_TodoListRemoveTodoMutation(\n  $id: ID!\n) {\n  removeTodo(id: $id) {\n    id\n  }\n}\n"
  }
};
})();

node.hash = "a89cfc3fa6dd81fbd02e7bdfa7b6bce9";

module.exports = node;
