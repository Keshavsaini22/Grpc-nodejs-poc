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

const client = new todoPackage.Todo("0.0.0.0:50051", grpc.credentials.createInsecure())

client.sayHello({ "name": "John" }, (err, response) => {
    if (err) {
        console.log("Error in sayHello: " + err)
    }

    console.log("Received from server " + JSON.stringify(response))
})

// client.createTodo({
//     "id": -1,
//     "text": text
// }, (err, response) => {

//     console.log("Recieved from server " + JSON.stringify(response))

// })