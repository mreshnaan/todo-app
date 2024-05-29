/**
 * @generated SignedSource<<28764eb0e46add4f673a60a2eb70684e>>
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
    "name": "toggleTodoCompleted",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "completed",
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
    "name": "TodoList_TodoListToggleTodoMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TodoList_TodoListToggleTodoMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f26979f956abf73df66c507099ba9d96",
    "id": null,
    "metadata": {},
    "name": "TodoList_TodoListToggleTodoMutation",
    "operationKind": "mutation",
    "text": "mutation TodoList_TodoListToggleTodoMutation(\n  $id: ID!\n) {\n  toggleTodoCompleted(id: $id) {\n    id\n    completed\n  }\n}\n"
  }
};
})();

node.hash = "f6726a4205d6eb964eae5bfa3f37a369";

module.exports = node;
