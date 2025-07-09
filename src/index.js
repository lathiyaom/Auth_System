const express = require("express");

const { logger, ServerConfig } = require("./config")

const  router  = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.listen(ServerConfig.PORT, () => {
    logger.info("Server started successfully", {
        port: ServerConfig.PORT,
        environment: process.env.NODE_ENV || "DEV",
        timestamp: new Date().toISOString(),
    });
});

// Optional: handle unexpected crashes
process.on("uncaughtException", (err) => {
    logger.error("Uncaught Exception occurred", {
        message: err.message,
        stack: err.stack,
    });
    process.exit(1);
});
