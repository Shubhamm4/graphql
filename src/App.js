import React from "react";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import TableList from "./component/TableList";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://countries.trevorblades.com",
});

const LIST_COUNTRIES = gql`
  {
    countries {
      name
      code
      phone
      capital
      currency
      languages {
        code
        name
      }
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(LIST_COUNTRIES, { client });

  if (loading || error) {
    return <p>{error ? error.message : "Loading..."}</p>;
  }
  
  localStorage.setItem('countryDetails', JSON.stringify(data));
  const countryDetails = JSON.parse(localStorage.getItem("countryDetails"));

  return (
    <div className="w-full h-full bg-white bg-gradient-to-r from-orange-200 to-rgb(251 146 60 / 0) ">
    <div 
    className="px-10 md:px-28 py-16 ">
      <TableList data={countryDetails?.countries} />
    </div>
      </div>
  );
}

export default App;
