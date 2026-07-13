import { execFile } from "child_process";
import { promisify } from "util";

export const execFileAsync = promisify(execFile);

export const GS_PATH =
  "C:\\Program Files\\gs\\gs10.07.1\\bin\\gswin64c.exe";