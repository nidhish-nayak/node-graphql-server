const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");

async function startServer() {
	const app = express();
	const server = new ApolloServer({});

	app.use(bodyParser.json());
	app.use(cors());
}
