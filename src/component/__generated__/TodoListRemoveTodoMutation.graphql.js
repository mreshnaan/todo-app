/**
 * @generated SignedSource<<9ca876768a3ce7fb15d9abc56240426e>>
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
    "name": "TodoListRemoveTodoMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TodoListRemoveTodoMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ac06e49202ce70f3a6b1138e305be0b2",
    "id": null,
    "metadata": {},
    "name": "TodoListRemoveTodoMutation",
    "operationKind": "mutation",
    "text": "mutation TodoListRemoveTodoMutation(\n  $id: ID!\n) {\n  removeTodo(id: $id) {\n    id\n  }\n}\n"
  }
};
})();

node.hash = "99f0136d9f2fe4a41273fda9d43f8ed9";

module.exports = node;
