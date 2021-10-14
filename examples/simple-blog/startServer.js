const liveServer = require("live-server")

liveServer.start({
    host: "0.0.0.0", 
    root: "./dist",
    open: false,
    wait: 1000, 
    logLevel: 2,
});    
