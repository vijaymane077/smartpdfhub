import { execFile } from "child_process";
import { promisify } from "util";

export const execFileAsync = promisify(execFile);

export const QPDF_PATH =
  "C:\\Program Files\\qpdf 12.3.2\\bin\\qpdf.exe";