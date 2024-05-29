/**
 * @generated SignedSource<<007f43ec242d3fefe45623cacbe8c6ea>>
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
    "name": "TodoList_TodoListAddTodoMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TodoList_TodoListAddTodoMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a1b21e2bb9d33fd78488ab428bb06d86",
    "id": null,
    "metadata": {},
    "name": "TodoList_TodoListAddTodoMutation",
    "operationKind": "mutation",
    "text": "mutation TodoList_TodoListAddTodoMutation(\n  $task: String!\n) {\n  addTodo(task: $task) {\n    id\n    task\n    completed\n  }\n}\n"
  }
};
})();

node.hash = "8da061693ee9fae64418db946e0f020e";

module.exports = node;
