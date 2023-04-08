// deno-lint-ignore-file no-explicit-any
import { ELevelLogger, IDataLogger, ILaraLoggerSetting, ILogger } from "./types.ts";

const colorsLogger: any = {
    LOG: "color: white; font-weight: bold;",
    SUCCESS: "color: green;",
    DEBUG: "color: purple;",
    INFO: "color: blue;",
    ERROR: "color: red;",
    WARNING: "color: yellow;",
    CRITICAL: "color: orange;",
}

export class LaraGlobalLogger implements ILogger{
    protected static SETTINGS: ILaraLoggerSetting = {
        saveFile: false,
        showDate: false
    };

    public static DATA: IDataLogger = {
        message: "",
        extra: [],
        date: ""
    };

    protected static loggers = new Map();

    protected static loggerName = "Top Log";

    public static executeHandler(name: string, level: string) {
        return LaraGlobalLogger.loggers.get(name).handlers[level];
    }

    public static addHandler(name: string, level: string, callback: any) {
        LaraGlobalLogger.loggers.get(name).handlers[level] = callback;
    }

    public static hasHandler(name: string, level: string) {
        return !!LaraGlobalLogger.loggers.get(name).handlers[level];
    }

    public static addLogger(name: string) {
        LaraGlobalLogger.loggers.set(name, {
            handlers: {}
        })
    }

    public static setSetting(settings: ILaraLoggerSetting) {
        LaraGlobalLogger.SETTINGS = settings;
    }

    public static setName(name: string) {
        LaraGlobalLogger.loggerName = name;
    }

    public static init() {
        if (LaraGlobalLogger.SETTINGS.showDate) {
            const date = new Date();
        
            const formatDate = `${date.getFullYear()}-${date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
            const formatTime = `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}:${date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()}`
    
            LaraGlobalLogger.DATA.date = `${formatDate} ${formatTime}`;
        }

        LaraGlobalLogger.DATA.message = `%c[${LaraGlobalLogger.loggerName}] %c-${LaraGlobalLogger.SETTINGS.showDate ? ` ${LaraGlobalLogger.DATA.date}` : ""} `;
        LaraGlobalLogger.DATA.extra = ["color: green; font-weight: bold;", "color: white"]
    }

    public log(msg: string, metadata?: Record<string, unknown>): void {
        this.print(10, msg, metadata);
    }

    public success(msg: string, metadata?: Record<string, unknown>): void  {
        this.print(20, msg, metadata);
    }

    public debug(msg: string, metadata?: Record<string, unknown>): void  {
        this.print(30, msg, metadata);
    }

    public info(msg: string, metadata?: Record<string, unknown>): void  {
        this.print(40, msg, metadata);
    }

    public error(msg: string, metadata?: Record<string, unknown>): void  {
        this.print(50, msg, metadata);
    }

    public waring(msg: string, metadata?: Record<string, unknown>): void  {
        this.print(60, msg, metadata);
    }

    public critical(msg: string, metadata?: Record<string, unknown>): void  {
        this.print(70, msg, metadata);
    }

    private print(level: ELevelLogger, msg: string, metadata?: Record<string, unknown>): void {
        console.log(`${LaraGlobalLogger.DATA.message}\t%c${ELevelLogger[level]} %c${msg}`, ...LaraGlobalLogger.DATA.extra, `${colorsLogger[ELevelLogger[level]]}`, "color: white", metadata ? metadata : "");
    }
}

export class LaraLogger implements ILogger{
    protected loggerName: string;

    constructor (name: string) {
        this.loggerName = name;

        LaraGlobalLogger.addLogger(name);
    }

    public log(msg: string, metadata?: Record<string, unknown>): void {
        this.print(10, msg, metadata);
    }

    public success(msg: string, metadata?: Record<string, unknown>): void  {
        this.print(20, msg, metadata);
    }

    public debug(msg: string, metadata?: Record<string, unknown>): void  {
        this.print(30, msg, metadata);
    }

    public info(msg: string, metadata?: Record<string, unknown>): void  {
        this.print(40, msg, metadata);
    }

    public error(msg: string, metadata?: Record<string, unknown>): void  {
        this.print(50, msg, metadata);
    }

    public waring(msg: string, metadata?: Record<string, unknown>): void  {
        this.print(60, msg, metadata);
    }

    public critical(msg: string, metadata?: Record<string, unknown>): void  {
        this.print(70, msg, metadata);
    }

    private print(level: ELevelLogger, msg: string, metadata?: Record<string, unknown>): void {
        const output = [`${LaraGlobalLogger.DATA.message}\t%c${ELevelLogger[level]} %c[${this.loggerName}] %c${msg}`, metadata];

        if (LaraGlobalLogger.hasHandler(this.loggerName, ELevelLogger[level])) {
            LaraGlobalLogger.executeHandler(this.loggerName, ELevelLogger[level])(this.loggerName, level, output);
        }

        console.log(output[0], ...LaraGlobalLogger.DATA.extra, `${colorsLogger[ELevelLogger[level]]}`, `${colorsLogger[ELevelLogger[level]]}`, "color: white", metadata ? metadata : "");
    }
}
