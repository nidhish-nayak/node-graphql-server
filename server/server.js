import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import axios from "axios";

const server = new ApolloServer({
	typeDefs: `
    type Todos {
			id: ID!,
			title: String!,
			completed: Boolean
			user: Users
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
			getUsers: [Users],
			getUserById(id: ID!): Users
    }
`,
	resolvers: {
		Todos: {
			user: async (todo) =>
				(
					await axios.get(
						`https://jsonplaceholder.typicode.com/users/${todo.id}`
					)
				).data,
		},
		Query: {
			getTodos: async () =>
				(await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
			getUsers: async () =>
				(await axios.get("https://jsonplaceholder.typicode.com/users")).data,
			getUserById: async (parent, { id }) =>
				(await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`))
					.data,
		},
	},
});

const { url } = await startStandaloneServer(server, {
	listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
