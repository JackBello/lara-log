import { LaraGlobalLogger, LaraLogger } from "../src/index.ts";

LaraGlobalLogger.setName("Lara-IO")

LaraGlobalLogger.setSetting({
    showDate: true
})

LaraGlobalLogger.init()

const mainLogger = new LaraGlobalLogger();

mainLogger.log("hello")

const logger = new LaraLogger("Controller Main")

const logger2 = new LaraLogger("Controller Fonts");

logger.error("a is not defined");

logger.waring("a port is not a number")

logger2.error("load fonts")

logger2.debug("init fonts", {
    hello: "s"
})

logger.critical("Server")

logger.info("Listening on port 3000")
logger.success("user created")
logger.log("display any")