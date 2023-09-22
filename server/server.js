import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const server = new ApolloServer({
	typeDefs: `
    type Book {
      title: String
      author: String
    }

    type Query {
      getBooks: [Book]
    }
`,
	resolvers: {
		Query: {
			getBooks: () => {
				return [
					{
						title: "The Awakening",
						author: "Kate Chopin",
					},
					{
						title: "City of Glass",
						author: "Paul Auster",
					},
				];
			},
		},
	},
});

const { url } = await startStandaloneServer(server, {
	listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
