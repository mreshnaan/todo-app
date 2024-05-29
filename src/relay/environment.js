import {
  Store,
  RecordSource,
  Environment,
  Network,
  Observable,
} from "relay-runtime";

const fetchFn = (params, variables) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });

  return Observable.from(response.then((data) => data.json()));
};

const network = Network.create(fetchFn);
const source = new RecordSource();
const store = new Store(source);
const environment = new Environment({ store, network });

export default environment;
