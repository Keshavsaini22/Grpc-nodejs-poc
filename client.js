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



const text = process.argv[2];


const client = new todoPackage.Todo("0.0.0.0:50051", grpc.credentials.createInsecure())

client.sayHello({ "name": "John" }, (err, response) => {
    if (err) {
        console.log("Error in sayHello: " + err)
    }

    console.log("Received from server " + JSON.stringify(response))
})


client.createTodo({ "id": -1, "text": text }, (err, response) => {
    if (err) {
        console.log("Error in sayHello: " + err)
    }

    console.log("Received from server " + JSON.stringify(response))

})


client.readTodos(null, (err, response) => {
    if (err) {
        console.log("Error in sayHello: " + err)
    }

    console.log("read the todos from server " + JSON.stringify(response))
    if (!response.items)
        response.items.forEach(a => console.log(a.text));
})


// Server Streaming call
const call = client.readTodosStream();
call.on("data", item => {
    console.log("received item from server " + JSON.stringify(item))
})
call.on("end", e => console.log("server done!"))