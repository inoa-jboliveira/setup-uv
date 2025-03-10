import * as core from "@actions/core";
import path from "path";

export const version = core.getInput("version");
export const checkSum = core.getInput("checksum");
export const enableCache = core.getInput("enable-cache") === "true";
export const cacheSuffix = core.getInput("cache-suffix") || "";
export const cacheLocalPath = getCacheLocalPath();
export const cacheDependencyGlob = core.getInput("cache-dependency-glob");
export const toolBinDir = getToolBinDir();
export const toolDir = getToolDir();
export const githubToken = core.getInput("github-token");

function getToolBinDir(): string | undefined {
  const toolBinDirInput = core.getInput("tool-bin-dir");
  if (toolBinDirInput !== "") {
    return toolBinDirInput;
  }
  if (process.platform === "win32") {
    if (process.env.RUNNER_TEMP !== undefined) {
      return `${process.env.RUNNER_TEMP}${path.sep}uv-tool-bin-dir`;
    }
    throw Error(
      "Could not determine UV_TOOL_BIN_DIR. Please make sure RUNNER_TEMP is set or provide the tool-bin-dir input",
    );
  }
  return undefined;
}

function getToolDir(): string | undefined {
  const toolDirInput = core.getInput("tool-dir");
  if (toolDirInput !== "") {
    return toolDirInput;
  }
  if (process.platform === "win32") {
    if (process.env.RUNNER_TEMP !== undefined) {
      return `${process.env.RUNNER_TEMP}${path.sep}uv-tool-dir`;
    }
    throw Error(
      "Could not determine UV_TOOL_DIR. Please make sure RUNNER_TEMP is set or provide the tool-dir input",
    );
  }
  return undefined;
}

function getCacheLocalPath(): string {
  const cacheLocalPathInput = core.getInput("cache-local-path");
  if (cacheLocalPathInput !== "") {
    return cacheLocalPathInput;
  }
  if (process.env.RUNNER_TEMP !== undefined) {
    return `${process.env.RUNNER_TEMP}${path.sep}setup-uv-cache`;
  }
  throw Error(
    "Could not determine UV_CACHE_DIR. Please make sure RUNNER_TEMP is set or provide the cache-local-path input",
  );
}
