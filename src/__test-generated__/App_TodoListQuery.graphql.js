/**
 * @generated SignedSource<<1082ddf6c00369bb3955b313ffabc592>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Todo",
    "kind": "LinkedField",
    "name": "todos",
    "plural": true,
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "App_TodoListQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "App_TodoListQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "0fb33a05eb05640396d4d940530a295e",
    "id": null,
    "metadata": {},
    "name": "App_TodoListQuery",
    "operationKind": "query",
    "text": "query App_TodoListQuery {\n  todos {\n    id\n    task\n    completed\n  }\n}\n"
  }
};
})();

node.hash = "83d883849e38a6649621c523cc7b59a0";

module.exports = node;
