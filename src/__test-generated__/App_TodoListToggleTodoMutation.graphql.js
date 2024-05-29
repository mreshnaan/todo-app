/**
 * @generated SignedSource<<ef45ee6dec62eb0b3fad05851d93b008>>
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
    "name": "App_TodoListToggleTodoMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "App_TodoListToggleTodoMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a918e4bfc2a84f715c751bdedee9d949",
    "id": null,
    "metadata": {},
    "name": "App_TodoListToggleTodoMutation",
    "operationKind": "mutation",
    "text": "mutation App_TodoListToggleTodoMutation(\n  $id: ID!\n) {\n  toggleTodoCompleted(id: $id) {\n    id\n    completed\n  }\n}\n"
  }
};
})();

node.hash = "ac9c818ed7bb77e2e59b86f4b9a53582";

module.exports = node;
