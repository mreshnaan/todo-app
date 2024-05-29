/**
 * @generated SignedSource<<1a7ce9fd06c77d70e48156c438fc0e73>>
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
    "name": "TodoListToggleTodoMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TodoListToggleTodoMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7b97ce86be79f17e48951e02070f324c",
    "id": null,
    "metadata": {},
    "name": "TodoListToggleTodoMutation",
    "operationKind": "mutation",
    "text": "mutation TodoListToggleTodoMutation(\n  $id: ID!\n) {\n  toggleTodoCompleted(id: $id) {\n    id\n    completed\n  }\n}\n"
  }
};
})();

node.hash = "7081bc96316d771e4c256b8addd6acb0";

module.exports = node;
