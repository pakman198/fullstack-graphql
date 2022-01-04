import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client'


/**
 * Create a new apollo client and export as default
 */

 const typeDefs = gql`
  extend type Pet {
    vaccinated: Boolean!
  }
 `;

 const resolvers = {
   User: {
     age() {
       return 35
     }
   },
   Pet: {
     vaccinated(){
       return true;
     }
   }
 }

const link = new HttpLink({ uri: 'http://localhost:4000'});
const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
  resolvers,
  typeDefs
});

const query = gql`
  query CHARACTERS {
    characters {
      results {
        id
        fullName: name
      }
    }
  }
`

client.query({ query }).then(r => {
  console.log({ r })
})

export default client;