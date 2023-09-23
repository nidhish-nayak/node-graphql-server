import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import axios from "axios";

const server = new ApolloServer({
	typeDefs: `
    type Todos {
			id: ID!,
			title: String!,
			completed: Boolean
    }

		type Users {
			id: ID!,
			name: String!,
			username: String!,
			email: String!,
			phone: String!,
			website: String!
		}

    type Query {
      getTodos: [Todos],
			getUsers: [Users]
    }
`,
	resolvers: {
		Query: {
			getTodos: async () =>
				(await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
			getUsers: async () =>
				(await axios.get("https://jsonplaceholder.typicode.com/users")).data,
		},
	},
});

const { url } = await startStandaloneServer(server, {
	listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
