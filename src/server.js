const grpc = require("@grpc/grpc-js");
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './src/main.proto';

let list = [
  { id: '1', title: 'Note 1', body: 'Content 1', newsImage: 'Post image 1' }
];
const news = {
  data:list
}

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const configProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(configProto.NewServices.service, {
  getAllNews: (req, callback) => {
    console.log("hi")
    callback(null, news);
  },

  addNews: (req, callback) => {
    list.push(req.request);
    callback(null, req.request);
  },

  editNews: (req,callback) => {
    console.log(req.request)
    callback(null,{message:"updated successfully"})
  },

  streamNewVideos: (call) => {
    // let times = 0;
    // const id = setInterval(() => {
    //   times++;
    //   if (times > 5) {
    //     clearInterval(id)
       
    //   }
     
   // }, 900)
    call.write({ video: `${Math.random()}` });
     call.end();
  }
});

console.log("server is ok")
server.bindAsync(
  '0.0.0.0:4000',
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log(`Server running on port ${port}`);
    server.start();
  }
);