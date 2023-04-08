export interface ILaraLoggerSetting {
    showDate?: boolean;
    saveFile?: boolean;
}

export interface ILogger {
    log(msg: string, metadata?: Record<string, unknown>): void;

    success(msg: string, metadata?: Record<string, unknown>): void;

    debug(msg: string, metadata?: Record<string, unknown>): void;

    info(msg: string, metadata?: Record<string, unknown>): void;

    error(msg: string, metadata?: Record<string, unknown>): void;

    waring(msg: string, metadata?: Record<string, unknown>): void;
    
    critical(msg: string, metadata?: Record<string, unknown>): void;
}

export interface IDataLogger {
    message: string
    extra: string[]
    date: string
}

export enum ELevelLogger {
    NOTSET = 0,
    LOG = 10,
    SUCCESS = 20,
    DEBUG = 30,
    INFO = 40,
    ERROR = 50,
    WARNING = 60,
    CRITICAL = 70
}