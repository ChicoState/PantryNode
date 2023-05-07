const express = require("express");
const createHttpErrors = require("http-errors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json"); // replace with your Swagger file path
const userRoutes = require("./routes/user");
const salesRoutes = require("./routes/sale");
const path = require("path");
const DbInit = require("./services/db-init");
const passport = require("./services/jwt-auth");

const PORT = process.env.PORT || 3001;

// The web server
const app = express();

// serve the Swagger UI at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// To handle body
app.use(express.json());

// Initialize passport middleware
app.use(passport.initialize());

// Web Server
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "public")));

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// APIs
app.use("/user", userRoutes);
app.use("/sale", salesRoutes);
// app.use('/api', ApiRouter);

// Catch-all route to serve index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 404 Handler
app.use((req, res, next) => {
  next(
    createHttpErrors(404, `Unknown Resource ${req.method} ${req.originalUrl}`)
  );
});

// Error Handler
app.use((error, req, res, next) => {
  console.error(error);
  return res.status(error.status || 500).json({
    error: error.message || `Unknown Error!`,
  });
});

// Listen to port PORT
// Start the server
DbInit()
  .then(() => {
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error initializing database:", err);
  });
1;
