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

const todos = []

function sayHello(call, callback) {
    console.log('Received: ' + call.request.name);
    callback(null, { message: 'Hello ' + call.request.name });
}

function createTodo(call, callback) {
    const todoItem = {
        "id": todos.length + 1,
        "text": call.request.text
    }
    todos.push(todoItem)
    callback(null, todoItem);
}


function getServer() {
    const server = new grpc.Server();

    server.addService(todoPackage.Todo.service,
        {
            "sayHello": sayHello,
            "createTodo": createTodo,
            // "readTodos": readTodos,
            // "readTodosStream": readTodosStream
        });
    return server;
}

function main() {
    const server = getServer();

    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (error, port) => {
        if (error) {
            console.error(`Server binding failed: ${error.message}`);
            return;
        }
        console.log(`Server running at http://0.0.0.0:${port}`);
        // server.start();
    });
}

main();