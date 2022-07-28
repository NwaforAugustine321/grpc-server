const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = './src/main.proto';

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const NewServices = grpc.loadPackageDefinition(packageDefinition).NewServices;


const client = new NewServices('localhost:5000', grpc.credentials.createInsecure());

// client.getAllNews({}, (error, news) => {
//   if (error) throw error;
//   console.log(news);
// });

// client.addNews(
//   { id: '1', title: 'Note 1', body: 'Content 1', newsImage: 'Post image 1' },
//   (error, newNews) => {
//     if (error) throw error;
//     console.log(newNews);
//   }
// );

// client.editNews({
//     params: {
//     id:"1"
//     }
// }, (error,res) => {
//     console.log(res)
// })

// const stream = client.streamNewVideos()
// stream.on("data", (chunk) => {
//     console.log(chunk)
// })

// stream.on("error", (error) => {
//     console.log(error)
// })