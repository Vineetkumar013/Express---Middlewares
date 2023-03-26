// const express = require("express");
// const app = express();
// // const path = require("path");
// const fs = require("fs");
// app.use(express.json())
// // const moviedata = require("./movie/moviedata");

// // Custom validation middleware
// const movieData = (req, res, next) => {
//   const { id, name, rating, description, genre, cast } = req.body;

//   if (!id || !name || !rating || !description || !genre || !cast) {
//     return res.status(400).send({ error: "Missing required field" });
//   }

//   if (typeof id !== "number" || typeof rating !== "number") {
//     return res.status(400).send({ error: "ID and rating must be numbers" });
//   }

//   if (
//     typeof name !== "string" ||
//     typeof description !== "string" ||
//     typeof genre !== "string"
//   ) {
//     return res
//       .status(400)
//       .send({ error: "Name, description, and genre must be strings" });
//   }

//   if (!Array.isArray(cast)) {
//     return res.status(400).send({ error: "Cast must be an array" });
//   }

//   next();
// };

// app.get("/", (req, res) => {
//   const data =  fs.readFileSync("./posts.json", "utf-8",)
//  const  parse_data = JSON.parse(data)

//   res.json("data");
//   console.log(parse_data)
// });



// // app.get("/:id", (req, res) => {
// //   const found = moviedata.some(
// //     (moviedata) => moviedata.id === parseInt(req.params.id)
// //   );
// //   if (found) {
// //     res.json(
// //       moviedata.filter((moviedata) => moviedata.id === parseInt(req.params.id))
// //     );
// //   } else {
// //     res.status(400).json({ msg: `No member with id of ${req.params.id}` });
// //   }
// // });

// // POST route for 'movies' database
// // app.post("/movie", moviedata , (req, res) => {
// //   // Validation has passed, so the request can be processed further
// //   const { id, name, rating, description, genre, cast } = req.body;

// //   // Add movie to the database
// //   // ...

// //   res.send({ message: "Movie added successfully" });
// // });

// app.delete("/posts/:Id",(req,res)=>{
//     const {Id} = req.params
//      const data = fs.readFileSync("./posts.json",{encoding:"utf-8"})
//          const parse_data =JSON.parse(data)
//          parse_data.posts = parse_data.posts.filter((item)=>item.id!=Id)
//          fs.writeFileSync("./posts.json",JSON.stringify(parse_data))       
//        res.end("Data Deleted")
//        console.log(parse_data.posts)
//      })
 
// app.listen(4500, () => {
//   console.log("SERVER ON 4500");
// });
const express = require("express");
const app = express();
const fs = require("fs");
const path  = require("path");
app.use(express.json());

const logger = (req,res,next)=>{
console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}:${moment().format()}`);
next();
}

//get data
app.get("/",(req,res)=>{
  const data = fs.readFileSync("./db.json","utf-8");
  const parsedata = JSON.parse(data);
  res.end(JSON.stringify(parsedata.moviedata));
});

// get single data
app.get("/movie/:id",(req,res)=>{
  const movieId = parseInt(req.params.id);
  const data = fs.readFileSync("./db.json","utf-8");
  const parsedata = JSON.parse(data);
  const movie = parsedata.moviedata.filter(m=>m.id === movieId);
  res.end(JSON.stringify(movie));
});

// app.get("/movie/:id",(req,res)=>{
//   res.json(moviedata.filter(movie => movie.id === parseInt(req.params.id)));
// });

//post data
app.post("/post",(req,res)=>{
  const data = fs.readFileSync("./db.json","utf-8");
  const parsedata = JSON.parse(data);
  parsedata.moviedata.push(req.body);
  fs.writeFileSync("./db.json",JSON.stringify(parsedata.moviedata))
  res.end("Data posted");
});

//put data
app.put("/put",(req,res)=>{
  const data = fs.writeFileSync("./db.json",JSON.stringify(req.body));
  const parsedata = JSON.stringify(data);
  res.end("Data updated");
});

app.delete("/",(req,res)=>{
  const data = fs.readFileSync("./db.json","utf-8");
  const parsedata = JSON.parse(data);
  res.end(JSON.stringify(parsedata.moviedata));
});

const port = process.env.port|| 4500;
app.listen(4500,()=>{
  console.log(`server start ${port}`);
})