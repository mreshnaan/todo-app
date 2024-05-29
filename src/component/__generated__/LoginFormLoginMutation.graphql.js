/**
 * @generated SignedSource<<d08acd8fea6064c0d23e7aaea4ba6d75>>
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
    "name": "email"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "password"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "email",
        "variableName": "email"
      },
      {
        "kind": "Variable",
        "name": "password",
        "variableName": "password"
      }
    ],
    "kind": "ScalarField",
    "name": "login",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LoginFormLoginMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LoginFormLoginMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "095493b3d75cbfe8219610e5cca9a0c2",
    "id": null,
    "metadata": {},
    "name": "LoginFormLoginMutation",
    "operationKind": "mutation",
    "text": "mutation LoginFormLoginMutation(\n  $email: String!\n  $password: String!\n) {\n  login(email: $email, password: $password)\n}\n"
  }
};
})();

node.hash = "833bb4f26126bc6c8265cedf873e7837";

module.exports = node;
