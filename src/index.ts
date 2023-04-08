// deno-lint-ignore-file no-explicit-any
import { ILaraLoggerSetting } from "./types.ts";

const colorsLogger = {
    error: "color: red;",
    critical: "color: orange;",
    success: "color: green;",
    warning: "color: yellow;",
    debug: "color: purple;",
    info: "color: blue;",
    log: "color: white;"
}

abstract class BaseLogger {
    public abstract error(...data: any[]): void;
    
    public abstract waring(...data: any[]): void;

    public abstract debug(...data: any[]): void;

    public abstract critical(...data: any[]): void;

    public abstract info(...data: any[]): void;

    public abstract success(...data: any[]): void;

    public abstract log(...data: any[]): void;
}

export class LaraGlobalLogger extends BaseLogger{
    protected static SETTINGS: ILaraLoggerSetting = {
        saveFile: false,
        showDate: false
    };
    public static DATA: any = {
        message: ["",""],
        date: ""
    };

    protected static topLevelName = "Top Log";

    constructor() {
        super();
    }

    public static setSetting(settings: ILaraLoggerSetting) {
        LaraGlobalLogger.SETTINGS = settings;
    }

    public static setName(name: string) {
        LaraGlobalLogger.topLevelName = name;
    }

    public static init() {
        if (LaraGlobalLogger.SETTINGS.showDate) {
            const date = new Date();
        
            const formatDate = `${date.getFullYear()}-${date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
            const formatTime = `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}:${date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()}`
    
            LaraGlobalLogger.DATA.date = `${formatDate} ${formatTime}`;
        }

        LaraGlobalLogger.DATA.message = [`%c[${LaraGlobalLogger.topLevelName}] %c-${LaraGlobalLogger.SETTINGS.showDate ? ` ${LaraGlobalLogger.DATA.date}` : ""} `, ["color: green; font-weight: bold;", "color: white"]]
    }

    public error(...data: any[]): void {
        console.log(`${LaraGlobalLogger.DATA.message[0]}%cERROR %c${data}`, ...LaraGlobalLogger.DATA.message[1], `${colorsLogger.error} font-weight: bold;`, "color: white")
    }

    public waring(...data: any[]): void {
        console.log(`${LaraGlobalLogger.DATA.message[0]}%cWARNING %c${data}`, ...LaraGlobalLogger.DATA.message[1], `${colorsLogger.warning} font-weight: bold;`, "color: white")
    }

    public debug(...data: any[]): void {
        console.log(`${LaraGlobalLogger.DATA.message[0]}%cDEBUG %c${data}`, ...LaraGlobalLogger.DATA.message[1], `${colorsLogger.debug} font-weight: bold;`, "color: white")
    }

    public critical(...data: any[]): void {
        console.log(`${LaraGlobalLogger.DATA.message[0]}%cCRITICAL %c${data}`, ...LaraGlobalLogger.DATA.message[1], `${colorsLogger.critical} font-weight: bold;`, "color: white")
    }

    public info(...data: any[]): void {
        console.log(`${LaraGlobalLogger.DATA.message[0]}%cINFO %c${data}`, ...LaraGlobalLogger.DATA.message[1], `${colorsLogger.info} font-weight: bold;`, "color: white")
    }

    public success(...data: any[]): void {
        console.log(`${LaraGlobalLogger.DATA.message[0]}%cSUCCESS %c${data}`, ...LaraGlobalLogger.DATA.message[1], `${colorsLogger.success} font-weight: bold;`, "color: white")
    }

    public log(...data: any[]): void {
        console.log(`${LaraGlobalLogger.DATA.message[0]}%cLOG %c${data}`, ...LaraGlobalLogger.DATA.message[1], `${colorsLogger.log} font-weight: bold;`, "color: white")
    }
}

export class LaraLogger extends BaseLogger{
    protected lowLevelName: string;

    constructor (name: string) {
        super();

        this.lowLevelName = name;
    }

    public error(...data: any[]): void {
        console.log(`${LaraGlobalLogger.DATA.message[0]}%cERROR %c[${this.lowLevelName}] %c${data}`, ...LaraGlobalLogger.DATA.message[1], `${colorsLogger.error} font-weight: bold;`, `${colorsLogger.error} font-weight: bold;`, "color: white");
    }

    public waring(...data: any[]): void {
        console.log(`${LaraGlobalLogger.DATA.message[0]}%cWARNING %c[${this.lowLevelName}] %c${data}`, ...LaraGlobalLogger.DATA.message[1], `${colorsLogger.warning} font-weight: bold;`, `${colorsLogger.warning} font-weight: bold;`, "color: white");
    }

    public debug(...data: any[]): void {
        console.log(`${LaraGlobalLogger.DATA.message[0]}%cDEBUG %c[${this.lowLevelName}] %c${data}`, ...LaraGlobalLogger.DATA.message[1], `${colorsLogger.debug} font-weight: bold;`, `${colorsLogger.debug} font-weight: bold;`, "color: white");
    }

    public critical(...data: any[]): void {
        console.log(`${LaraGlobalLogger.DATA.message[0]}%cCRITICAL %c[${this.lowLevelName}] %c${data}`, ...LaraGlobalLogger.DATA.message[1], `${colorsLogger.critical} font-weight: bold;`, `${colorsLogger.critical} font-weight: bold;`, "color: white");
    }

    public info(...data: any[]): void {
        console.log(`${LaraGlobalLogger.DATA.message[0]}%cINFO %c[${this.lowLevelName}] %c${data}`, ...LaraGlobalLogger.DATA.message[1], `${colorsLogger.info} font-weight: bold;`, `${colorsLogger.info} font-weight: bold;`, "color: white");
    }

    public success(...data: any[]): void {
        console.log(`${LaraGlobalLogger.DATA.message[0]}%cSUCCESS %c[${this.lowLevelName}] %c${data}`, ...LaraGlobalLogger.DATA.message[1], `${colorsLogger.success} font-weight: bold;`, `${colorsLogger.success} font-weight: bold;`, "color: white");
    }

    public log(...data: any[]): void {
        console.log(`${LaraGlobalLogger.DATA.message[0]}%cLOG %c[${this.lowLevelName}] %c${data}`, ...LaraGlobalLogger.DATA.message[1], `${colorsLogger.log} font-weight: bold;`, `${colorsLogger.log} font-weight: bold;`, "color: white");
    }
}
