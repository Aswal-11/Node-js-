const express = require("express");
const app = express();

// This is the router middleware also we can say router based middleware
const router = express.Router();

app.listen(3000, () => {
  console.log("Connected on 3000");
});

/**
 * This is the custom middleware
 * It applies only when we declare them in routes
 */
// const middleware = ((req,res,next)=>{
//   console.log(`${req.method} ${req.url}`);
//   console.log("This is the first middleware");
//   const d= new Date();
//   console.log(`Time: ${d.getDate()} Date / ${d.getMonth()} month`)
//   console.log(`Time: ${d.getHours()} hr / ${d.getMinutes()} min`)
//   next();
// });

/**
 * This is other middleware
 */
// const otherMiddleware = ((req, res, next)=>[
//   console.log("This is the second middleware")
// ]);

// app.get("/", middleware, otherMiddleware, (req, res) => {
//   res.send("hello ji");
// });

// app.get("/about",middleware, (req, res) => {
//   res.send("this is about page");
// });


/**
 * Router Level Middleware
 */
// router.use((req, res, next)=>{
//   console.log("Router level Middleware");
//   next();
// })
// router.get("/",(req, res) => {
//   res.send("hello ji");
// });

// router.get("/about", (req, res) => {
//   res.send("this is about page");
// });

// Here we have make the routes nested 
// To access a route we have use this "/test" first
// app.use("/test",router);


/**
 * Error Handling Middleware
 */
app.use((req, res, next)=>{
  console.log("This is the second middleware")
  next();
});

app.get("/", (req, res) => {
  res.send("hello ji");
});

app.get("/about", (req, res) => {
  res.send("this is about page");
});

/**
 * All the middlewares which are error baaed we have to place them all below the normal routes
 */
app.use((err, req, res, next)=>{
  console.error(err);
  res.status(500).send("Something is broken");
  next();
});
