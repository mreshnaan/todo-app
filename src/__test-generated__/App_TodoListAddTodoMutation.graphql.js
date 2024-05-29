/**
 * @generated SignedSource<<ef8147821187f821004685254b5699f7>>
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
    "name": "task"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "task",
        "variableName": "task"
      }
    ],
    "concreteType": "Todo",
    "kind": "LinkedField",
    "name": "addTodo",
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
        "name": "task",
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
    "name": "App_TodoListAddTodoMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "App_TodoListAddTodoMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f73e9f012021c4704d96f47d85769b54",
    "id": null,
    "metadata": {},
    "name": "App_TodoListAddTodoMutation",
    "operationKind": "mutation",
    "text": "mutation App_TodoListAddTodoMutation(\n  $task: String!\n) {\n  addTodo(task: $task) {\n    id\n    task\n    completed\n  }\n}\n"
  }
};
})();

node.hash = "d1a8a12d05d2b1265a107111a49aee2b";

module.exports = node;
