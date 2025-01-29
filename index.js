const dotenv = require('dotenv');
dotenv.config();

const grpc = require('@grpc/grpc-js');
const protoLoader = require("@grpc/proto-loader")


const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

const packageDef = protoLoader.loadSync("todo.proto", options);

const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;



const server = new grpc.Server();

server.bindAsync("localhost:8080", grpc.ServerCredentials.createInsecure(), (error, port) => {
    console.log('error: ', error);
    console.log('port: ', port);
    console.log("Server running at http://localhost:8080");
    server.start();
}
);

const APP_PORT = process.env.APP_PORT || 8080;

console.log(APP_PORT);