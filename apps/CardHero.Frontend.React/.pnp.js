#!/usr/bin/env node
/* eslint-disable */
//HACK: https://github.com/yarnpkg/berry/issues/1073
const path = require("path");

try {
  Object.freeze({}).detectStrictMode = true;
} catch (error) {
  throw new Error(`The whole PnP file got strict-mode-ified, which is known to break (Emscripten libraries aren't strict mode). This usually happens when the file goes through Babel.`);
}

var __non_webpack_module__ = module;

function $$SETUP_STATE(hydrateRuntimeState, basePath) {
  var dataLocation = path.resolve(__dirname, ".pnp.data.json");
  return hydrateRuntimeState(require(dataLocation), {basePath: basePath || path.dirname(dataLocation)});
  }

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["pnpHook"] = factory();
	else
		root["pnpHook"] = factory();
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const path_1 = __importDefault(__webpack_require__(7));

exports.PortablePath = {
  root: `/`,
  dot: `.`
};
exports.Filename = {
  nodeModules: `node_modules`,
  manifest: `package.json`,
  lockfile: `yarn.lock`
};
exports.npath = Object.create(path_1.default);
exports.ppath = Object.create(path_1.default.posix);

const contains = function (pathUtils, from, to) {
  from = pathUtils.normalize(from);
  to = pathUtils.normalize(to);
  if (from === to) return `.`;
  if (!from.endsWith(pathUtils.sep)) from = from + pathUtils.sep;

  if (to.startsWith(from)) {
    return to.slice(from.length);
  } else {
    return null;
  }
};

exports.npath.fromPortablePath = fromPortablePath;
exports.npath.toPortablePath = toPortablePath;

exports.npath.contains = (from, to) => contains(exports.npath, from, to);

exports.ppath.contains = (from, to) => contains(exports.ppath, from, to);

const WINDOWS_PATH_REGEXP = /^[a-zA-Z]:.*$/;
const PORTABLE_PATH_REGEXP = /^\/[a-zA-Z]:.*$/; // Path should look like "/N:/berry/scripts/plugin-pack.js"
// And transform to "N:\berry\scripts\plugin-pack.js"

function fromPortablePath(p) {
  if (process.platform !== 'win32') return p;
  return p.match(PORTABLE_PATH_REGEXP) ? p.substring(1).replace(/\//g, `\\`) : p;
} // Path should look like "N:/berry/scripts/plugin-pack.js"
// And transform to "/N:/berry/scripts/plugin-pack.js"


function toPortablePath(p) {
  if (process.platform !== 'win32') return p;
  return (p.match(WINDOWS_PATH_REGEXP) ? `/${p}` : p).replace(/\\/g, `/`);
}

function convertPath(targetPathUtils, sourcePath) {
  return targetPathUtils === exports.npath ? fromPortablePath(sourcePath) : toPortablePath(sourcePath);
}

exports.convertPath = convertPath;

function toFilename(filename) {
  if (exports.npath.parse(filename).dir !== '' || exports.ppath.parse(filename).dir !== '') throw new Error(`Invalid filename: "${filename}"`);
  return filename;
}

exports.toFilename = toFilename;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const fs_1 = __importDefault(__webpack_require__(2));

const FakeFS_1 = __webpack_require__(3);

const path_1 = __webpack_require__(0);

class NodeFS extends FakeFS_1.BasePortableFakeFS {
  constructor(realFs = fs_1.default) {
    super();
    this.realFs = realFs;
  }

  getExtractHint() {
    return false;
  }

  getRealPath() {
    return path_1.PortablePath.root;
  }

  async openPromise(p, flags, mode) {
    return await new Promise((resolve, reject) => {
      this.realFs.open(path_1.npath.fromPortablePath(p), flags, mode, this.makeCallback(resolve, reject));
    });
  }

  openSync(p, flags, mode) {
    return this.realFs.openSync(path_1.npath.fromPortablePath(p), flags, mode);
  }

  async readPromise(fd, buffer, offset = 0, length = 0, position = -1) {
    return await new Promise((resolve, reject) => {
      this.realFs.read(fd, buffer, offset, length, position, (error, bytesRead) => {
        if (error) {
          reject(error);
        } else {
          resolve(bytesRead);
        }
      });
    });
  }

  readSync(fd, buffer, offset, length, position) {
    return this.realFs.readSync(fd, buffer, offset, length, position);
  }

  async writePromise(fd, buffer, offset, length, position) {
    return await new Promise((resolve, reject) => {
      if (typeof buffer === `string`) {
        return this.realFs.write(fd, buffer, offset, this.makeCallback(resolve, reject));
      } else {
        return this.realFs.write(fd, buffer, offset, length, position, this.makeCallback(resolve, reject));
      }
    });
  }

  writeSync(fd, buffer, offset, length, position) {
    if (typeof buffer === `string`) {
      return this.realFs.writeSync(fd, buffer, offset);
    } else {
      return this.realFs.writeSync(fd, buffer, offset, length, position);
    }
  }

  async closePromise(fd) {
    await new Promise((resolve, reject) => {
      this.realFs.close(fd, this.makeCallback(resolve, reject));
    });
  }

  closeSync(fd) {
    this.realFs.closeSync(fd);
  }

  createReadStream(p, opts) {
    const realPath = p !== null ? path_1.npath.fromPortablePath(p) : p;
    return this.realFs.createReadStream(realPath, opts);
  }

  createWriteStream(p, opts) {
    const realPath = p !== null ? path_1.npath.fromPortablePath(p) : p;
    return this.realFs.createWriteStream(realPath, opts);
  }

  async realpathPromise(p) {
    return await new Promise((resolve, reject) => {
      this.realFs.realpath(path_1.npath.fromPortablePath(p), {}, this.makeCallback(resolve, reject));
    }).then(path => {
      return path_1.npath.toPortablePath(path);
    });
  }

  realpathSync(p) {
    return path_1.npath.toPortablePath(this.realFs.realpathSync(path_1.npath.fromPortablePath(p), {}));
  }

  async existsPromise(p) {
    return await new Promise(resolve => {
      this.realFs.exists(path_1.npath.fromPortablePath(p), resolve);
    });
  }

  accessSync(p, mode) {
    return this.realFs.accessSync(path_1.npath.fromPortablePath(p), mode);
  }

  async accessPromise(p, mode) {
    return await new Promise((resolve, reject) => {
      this.realFs.access(path_1.npath.fromPortablePath(p), mode, this.makeCallback(resolve, reject));
    });
  }

  existsSync(p) {
    return this.realFs.existsSync(path_1.npath.fromPortablePath(p));
  }

  async statPromise(p) {
    return await new Promise((resolve, reject) => {
      this.realFs.stat(path_1.npath.fromPortablePath(p), this.makeCallback(resolve, reject));
    });
  }

  statSync(p) {
    return this.realFs.statSync(path_1.npath.fromPortablePath(p));
  }

  async lstatPromise(p) {
    return await new Promise((resolve, reject) => {
      this.realFs.lstat(path_1.npath.fromPortablePath(p), this.makeCallback(resolve, reject));
    });
  }

  lstatSync(p) {
    return this.realFs.lstatSync(path_1.npath.fromPortablePath(p));
  }

  async chmodPromise(p, mask) {
    return await new Promise((resolve, reject) => {
      this.realFs.chmod(path_1.npath.fromPortablePath(p), mask, this.makeCallback(resolve, reject));
    });
  }

  chmodSync(p, mask) {
    return this.realFs.chmodSync(path_1.npath.fromPortablePath(p), mask);
  }

  async renamePromise(oldP, newP) {
    return await new Promise((resolve, reject) => {
      this.realFs.rename(path_1.npath.fromPortablePath(oldP), path_1.npath.fromPortablePath(newP), this.makeCallback(resolve, reject));
    });
  }

  renameSync(oldP, newP) {
    return this.realFs.renameSync(path_1.npath.fromPortablePath(oldP), path_1.npath.fromPortablePath(newP));
  }

  async copyFilePromise(sourceP, destP, flags = 0) {
    return await new Promise((resolve, reject) => {
      this.realFs.copyFile(path_1.npath.fromPortablePath(sourceP), path_1.npath.fromPortablePath(destP), flags, this.makeCallback(resolve, reject));
    });
  }

  copyFileSync(sourceP, destP, flags = 0) {
    return this.realFs.copyFileSync(path_1.npath.fromPortablePath(sourceP), path_1.npath.fromPortablePath(destP), flags);
  }

  async appendFilePromise(p, content, opts) {
    return await new Promise((resolve, reject) => {
      const fsNativePath = typeof p === `string` ? path_1.npath.fromPortablePath(p) : p;

      if (opts) {
        this.realFs.appendFile(fsNativePath, content, opts, this.makeCallback(resolve, reject));
      } else {
        this.realFs.appendFile(fsNativePath, content, this.makeCallback(resolve, reject));
      }
    });
  }

  appendFileSync(p, content, opts) {
    const fsNativePath = typeof p === `string` ? path_1.npath.fromPortablePath(p) : p;

    if (opts) {
      this.realFs.appendFileSync(fsNativePath, content, opts);
    } else {
      this.realFs.appendFileSync(fsNativePath, content);
    }
  }

  async writeFilePromise(p, content, opts) {
    return await new Promise((resolve, reject) => {
      const fsNativePath = typeof p === `string` ? path_1.npath.fromPortablePath(p) : p;

      if (opts) {
        this.realFs.writeFile(fsNativePath, content, opts, this.makeCallback(resolve, reject));
      } else {
        this.realFs.writeFile(fsNativePath, content, this.makeCallback(resolve, reject));
      }
    });
  }

  writeFileSync(p, content, opts) {
    const fsNativePath = typeof p === `string` ? path_1.npath.fromPortablePath(p) : p;

    if (opts) {
      this.realFs.writeFileSync(fsNativePath, content, opts);
    } else {
      this.realFs.writeFileSync(fsNativePath, content);
    }
  }

  async unlinkPromise(p) {
    return await new Promise((resolve, reject) => {
      this.realFs.unlink(path_1.npath.fromPortablePath(p), this.makeCallback(resolve, reject));
    });
  }

  unlinkSync(p) {
    return this.realFs.unlinkSync(path_1.npath.fromPortablePath(p));
  }

  async utimesPromise(p, atime, mtime) {
    return await new Promise((resolve, reject) => {
      this.realFs.utimes(path_1.npath.fromPortablePath(p), atime, mtime, this.makeCallback(resolve, reject));
    });
  }

  utimesSync(p, atime, mtime) {
    this.realFs.utimesSync(path_1.npath.fromPortablePath(p), atime, mtime);
  }

  async mkdirPromise(p, opts) {
    return await new Promise((resolve, reject) => {
      this.realFs.mkdir(path_1.npath.fromPortablePath(p), opts, this.makeCallback(resolve, reject));
    });
  }

  mkdirSync(p, opts) {
    return this.realFs.mkdirSync(path_1.npath.fromPortablePath(p), opts);
  }

  async rmdirPromise(p) {
    return await new Promise((resolve, reject) => {
      this.realFs.rmdir(path_1.npath.fromPortablePath(p), this.makeCallback(resolve, reject));
    });
  }

  rmdirSync(p) {
    return this.realFs.rmdirSync(path_1.npath.fromPortablePath(p));
  }

  async symlinkPromise(target, p, type) {
    const symlinkType = type || (target.endsWith(`/`) ? `dir` : `file`);
    return await new Promise((resolve, reject) => {
      this.realFs.symlink(path_1.npath.fromPortablePath(target.replace(/\/+$/, ``)), path_1.npath.fromPortablePath(p), symlinkType, this.makeCallback(resolve, reject));
    });
  }

  symlinkSync(target, p, type) {
    const symlinkType = type || (target.endsWith(`/`) ? `dir` : `file`);
    return this.realFs.symlinkSync(path_1.npath.fromPortablePath(target.replace(/\/+$/, ``)), path_1.npath.fromPortablePath(p), symlinkType);
  }

  async readFilePromise(p, encoding) {
    return await new Promise((resolve, reject) => {
      const fsNativePath = typeof p === `string` ? path_1.npath.fromPortablePath(p) : p;
      this.realFs.readFile(fsNativePath, encoding, this.makeCallback(resolve, reject));
    });
  }

  readFileSync(p, encoding) {
    const fsNativePath = typeof p === `string` ? path_1.npath.fromPortablePath(p) : p;
    return this.realFs.readFileSync(fsNativePath, encoding);
  }

  async readdirPromise(p, {
    withFileTypes
  } = {}) {
    return await new Promise((resolve, reject) => {
      if (withFileTypes) {
        this.realFs.readdir(path_1.npath.fromPortablePath(p), {
          withFileTypes: true
        }, this.makeCallback(resolve, reject));
      } else {
        this.realFs.readdir(path_1.npath.fromPortablePath(p), this.makeCallback(value => resolve(value), reject));
      }
    });
  }

  readdirSync(p, {
    withFileTypes
  } = {}) {
    if (withFileTypes) {
      return this.realFs.readdirSync(path_1.npath.fromPortablePath(p), {
        withFileTypes: true
      });
    } else {
      return this.realFs.readdirSync(path_1.npath.fromPortablePath(p));
    }
  }

  async readlinkPromise(p) {
    return await new Promise((resolve, reject) => {
      this.realFs.readlink(path_1.npath.fromPortablePath(p), this.makeCallback(resolve, reject));
    }).then(path => {
      return path_1.npath.toPortablePath(path);
    });
  }

  readlinkSync(p) {
    return path_1.npath.toPortablePath(this.realFs.readlinkSync(path_1.npath.fromPortablePath(p)));
  }

  watch(p, a, b) {
    return this.realFs.watch(path_1.npath.fromPortablePath(p), // @ts-ignore
    a, b);
  }

  makeCallback(resolve, reject) {
    return (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    };
  }

}

exports.NodeFS = NodeFS;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const os_1 = __webpack_require__(9);

const copyPromise_1 = __webpack_require__(13);

const path_1 = __webpack_require__(0);

const path_2 = __webpack_require__(0);

class FakeFS {
  constructor(pathUtils) {
    this.pathUtils = pathUtils;
  }

  async removePromise(p) {
    let stat;

    try {
      stat = await this.lstatPromise(p);
    } catch (error) {
      if (error.code === `ENOENT`) {
        return;
      } else {
        throw error;
      }
    }

    if (stat.isDirectory()) {
      for (const entry of await this.readdirPromise(p)) await this.removePromise(this.pathUtils.resolve(p, entry)); // 5 gives 1s worth of retries at worst


      for (let t = 0; t < 5; ++t) {
        try {
          await this.rmdirPromise(p);
          break;
        } catch (error) {
          if (error.code === `EBUSY` || error.code === `ENOTEMPTY`) {
            await new Promise(resolve => setTimeout(resolve, t * 100));
            continue;
          } else {
            throw error;
          }
        }
      }
    } else {
      await this.unlinkPromise(p);
    }
  }

  removeSync(p) {
    let stat;

    try {
      stat = this.lstatSync(p);
    } catch (error) {
      if (error.code === `ENOENT`) {
        return;
      } else {
        throw error;
      }
    }

    if (stat.isDirectory()) {
      for (const entry of this.readdirSync(p)) this.removeSync(this.pathUtils.resolve(p, entry));

      this.rmdirSync(p);
    } else {
      this.unlinkSync(p);
    }
  }

  async mkdirpPromise(p, {
    chmod,
    utimes
  } = {}) {
    p = this.resolve(p);
    if (p === this.pathUtils.dirname(p)) return;
    const parts = p.split(this.pathUtils.sep);

    for (let u = 2; u <= parts.length; ++u) {
      const subPath = parts.slice(0, u).join(this.pathUtils.sep);

      if (!this.existsSync(subPath)) {
        try {
          await this.mkdirPromise(subPath);
        } catch (error) {
          if (error.code === `EEXIST`) {
            continue;
          } else {
            throw error;
          }
        }

        if (chmod != null) await this.chmodPromise(subPath, chmod);

        if (utimes != null) {
          await this.utimesPromise(subPath, utimes[0], utimes[1]);
        } else {
          const parentStat = await this.statPromise(this.pathUtils.dirname(subPath));
          await this.utimesPromise(subPath, parentStat.atime, parentStat.mtime);
        }
      }
    }
  }

  mkdirpSync(p, {
    chmod,
    utimes
  } = {}) {
    p = this.resolve(p);
    if (p === this.pathUtils.dirname(p)) return;
    const parts = p.split(this.pathUtils.sep);

    for (let u = 2; u <= parts.length; ++u) {
      const subPath = parts.slice(0, u).join(this.pathUtils.sep);

      if (!this.existsSync(subPath)) {
        try {
          this.mkdirSync(subPath);
        } catch (error) {
          if (error.code === `EEXIST`) {
            continue;
          } else {
            throw error;
          }
        }

        if (chmod != null) this.chmodSync(subPath, chmod);

        if (utimes != null) {
          this.utimesSync(subPath, utimes[0], utimes[1]);
        } else {
          const parentStat = this.statSync(this.pathUtils.dirname(subPath));
          this.utimesSync(subPath, parentStat.atime, parentStat.mtime);
        }
      }
    }
  }

  async copyPromise(destination, source, {
    baseFs = this,
    overwrite = true
  } = {}) {
    return await copyPromise_1.copyPromise(this, destination, baseFs, source, {
      overwrite
    });
  }

  copySync(destination, source, {
    baseFs = this,
    overwrite = true
  } = {}) {
    const stat = baseFs.lstatSync(source);
    const exists = this.existsSync(destination);

    if (stat.isDirectory()) {
      this.mkdirpSync(destination);
      const directoryListing = baseFs.readdirSync(source);

      for (const entry of directoryListing) {
        this.copySync(this.pathUtils.join(destination, entry), baseFs.pathUtils.join(source, entry), {
          baseFs,
          overwrite
        });
      }
    } else if (stat.isFile()) {
      if (!exists || overwrite) {
        if (exists) this.removeSync(destination);
        const content = baseFs.readFileSync(source);
        this.writeFileSync(destination, content);
      }
    } else if (stat.isSymbolicLink()) {
      if (!exists || overwrite) {
        if (exists) this.removeSync(destination);
        const target = baseFs.readlinkSync(source);
        this.symlinkSync(path_2.convertPath(this.pathUtils, target), destination);
      }
    } else {
      throw new Error(`Unsupported file type (file: ${source}, mode: 0o${stat.mode.toString(8).padStart(6, `0`)})`);
    }

    const mode = stat.mode & 0o777;
    this.chmodSync(destination, mode);
  }

  async changeFilePromise(p, content, {
    automaticNewlines
  } = {}) {
    let current = '';

    try {
      current = await this.readFilePromise(p, `utf8`);
    } catch (error) {// ignore errors, no big deal
    }

    const normalizedContent = automaticNewlines ? normalizeLineEndings(current, content) : content;
    if (current === normalizedContent) return;
    await this.writeFilePromise(p, normalizedContent);
  }

  changeFileSync(p, content, {
    automaticNewlines = false
  } = {}) {
    let current = '';

    try {
      current = this.readFileSync(p, `utf8`);
    } catch (error) {// ignore errors, no big deal
    }

    const normalizedContent = automaticNewlines ? normalizeLineEndings(current, content) : content;
    if (current === normalizedContent) return;
    this.writeFileSync(p, normalizedContent);
  }

  async movePromise(fromP, toP) {
    try {
      await this.renamePromise(fromP, toP);
    } catch (error) {
      if (error.code === `EXDEV`) {
        await this.copyPromise(toP, fromP);
        await this.removePromise(fromP);
      } else {
        throw error;
      }
    }
  }

  moveSync(fromP, toP) {
    try {
      this.renameSync(fromP, toP);
    } catch (error) {
      if (error.code === `EXDEV`) {
        this.copySync(toP, fromP);
        this.removeSync(fromP);
      } else {
        throw error;
      }
    }
  }

  async lockPromise(affectedPath, callback) {
    const lockPath = `${affectedPath}.flock`;
    const interval = 1000 / 60;
    const startTime = Date.now();
    let fd = null; // Even when we detect that a lock file exists, we still look inside to see
    // whether the pid that created it is still alive. It's not foolproof
    // (there are false positive), but there are no false negative and that's
    // all that matters in 99% of the cases.

    const isAlive = async () => {
      let pid;

      try {
        [pid] = await this.readJsonPromise(lockPath);
      } catch (error) {
        // If we can't read the file repeatedly, we assume the process was
        // aborted before even writing finishing writing the payload.
        return Date.now() - startTime < 500;
      }

      try {
        // "As a special case, a signal of 0 can be used to test for the
        // existence of a process" - so we check whether it's alive.
        process.kill(pid, 0);
        return true;
      } catch (error) {
        return false;
      }
    };

    while (fd === null) {
      try {
        fd = await this.openPromise(lockPath, `wx`);
      } catch (error) {
        if (error.code === `EEXIST`) {
          if (!(await isAlive())) {
            try {
              await this.unlinkPromise(lockPath);
              continue;
            } catch (error) {// No big deal if we can't remove it. Just fallback to wait for
              // it to be eventually released by its owner.
            }
          }

          if (Date.now() - startTime < 60 * 1000) {
            await new Promise(resolve => setTimeout(resolve, interval));
          } else {
            throw new Error(`Couldn't acquire a lock in a reasonable time (via ${lockPath})`);
          }
        } else {
          throw error;
        }
      }
    }

    await this.writePromise(fd, JSON.stringify([process.pid]));

    try {
      return await callback();
    } finally {
      await this.closePromise(fd);
      await this.unlinkPromise(lockPath);
    }
  }

  async readJsonPromise(p) {
    const content = await this.readFilePromise(p, `utf8`);

    try {
      return JSON.parse(content);
    } catch (error) {
      error.message += ` (in ${p})`;
      throw error;
    }
  }

  async readJsonSync(p) {
    const content = this.readFileSync(p, `utf8`);

    try {
      return JSON.parse(content);
    } catch (error) {
      error.message += ` (in ${p})`;
      throw error;
    }
  }

  async writeJsonPromise(p, data) {
    return await this.writeFilePromise(p, `${JSON.stringify(data, null, 2)}\n`);
  }

  writeJsonSync(p, data) {
    return this.writeFileSync(p, `${JSON.stringify(data, null, 2)}\n`);
  }

  async preserveTimePromise(p, cb) {
    const stat = await this.lstatPromise(p);
    const result = await cb();
    if (typeof result !== `undefined`) p = result;

    if (this.lutimesPromise) {
      await this.lutimesPromise(p, stat.atime, stat.mtime);
    } else if (!stat.isSymbolicLink()) {
      await this.utimesPromise(p, stat.atime, stat.mtime);
    }
  }

  async preserveTimeSync(p, cb) {
    const stat = this.lstatSync(p);
    const result = cb();
    if (typeof result !== `undefined`) p = result;

    if (this.lutimesSync) {
      this.lutimesSync(p, stat.atime, stat.mtime);
    } else if (!stat.isSymbolicLink()) {
      this.utimesSync(p, stat.atime, stat.mtime);
    }
  }

}

exports.FakeFS = FakeFS;
FakeFS.DEFAULT_TIME = 315532800;
;

class BasePortableFakeFS extends FakeFS {
  constructor() {
    super(path_2.ppath);
  }

  resolve(p) {
    return this.pathUtils.resolve(path_1.PortablePath.root, p);
  }

}

exports.BasePortableFakeFS = BasePortableFakeFS;

function getEndOfLine(content) {
  const matches = content.match(/\r?\n/g);
  if (matches === null) return os_1.EOL;
  const crlf = matches.filter(nl => nl === `\r\n`).length;
  const lf = matches.length - crlf;
  return crlf > lf ? `\r\n` : `\n`;
}

function normalizeLineEndings(originalContent, newContent) {
  return newContent.replace(/\r?\n/g, getEndOfLine(originalContent));
}

exports.normalizeLineEndings = normalizeLineEndings;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const FakeFS_1 = __webpack_require__(3);

class ProxiedFS extends FakeFS_1.FakeFS {
  getExtractHint(hints) {
    return this.baseFs.getExtractHint(hints);
  }

  resolve(path) {
    return this.mapFromBase(this.baseFs.resolve(this.mapToBase(path)));
  }

  getRealPath() {
    return this.mapFromBase(this.baseFs.getRealPath());
  }

  openPromise(p, flags, mode) {
    return this.baseFs.openPromise(this.mapToBase(p), flags, mode);
  }

  openSync(p, flags, mode) {
    return this.baseFs.openSync(this.mapToBase(p), flags, mode);
  }

  async readPromise(fd, buffer, offset, length, position) {
    return await this.baseFs.readPromise(fd, buffer, offset, length, position);
  }

  readSync(fd, buffer, offset, length, position) {
    return this.baseFs.readSync(fd, buffer, offset, length, position);
  }

  async writePromise(fd, buffer, offset, length, position) {
    if (typeof buffer === `string`) {
      return await this.baseFs.writePromise(fd, buffer, offset);
    } else {
      return await this.baseFs.writePromise(fd, buffer, offset, length, position);
    }
  }

  writeSync(fd, buffer, offset, length, position) {
    if (typeof buffer === `string`) {
      return this.baseFs.writeSync(fd, buffer, offset);
    } else {
      return this.baseFs.writeSync(fd, buffer, offset, length, position);
    }
  }

  closePromise(fd) {
    return this.baseFs.closePromise(fd);
  }

  closeSync(fd) {
    this.baseFs.closeSync(fd);
  }

  createReadStream(p, opts) {
    return this.baseFs.createReadStream(p !== null ? this.mapToBase(p) : p, opts);
  }

  createWriteStream(p, opts) {
    return this.baseFs.createWriteStream(p !== null ? this.mapToBase(p) : p, opts);
  }

  async realpathPromise(p) {
    return this.mapFromBase((await this.baseFs.realpathPromise(this.mapToBase(p))));
  }

  realpathSync(p) {
    return this.mapFromBase(this.baseFs.realpathSync(this.mapToBase(p)));
  }

  existsPromise(p) {
    return this.baseFs.existsPromise(this.mapToBase(p));
  }

  existsSync(p) {
    return this.baseFs.existsSync(this.mapToBase(p));
  }

  accessSync(p, mode) {
    return this.baseFs.accessSync(this.mapToBase(p), mode);
  }

  accessPromise(p, mode) {
    return this.baseFs.accessPromise(this.mapToBase(p), mode);
  }

  statPromise(p) {
    return this.baseFs.statPromise(this.mapToBase(p));
  }

  statSync(p) {
    return this.baseFs.statSync(this.mapToBase(p));
  }

  lstatPromise(p) {
    return this.baseFs.lstatPromise(this.mapToBase(p));
  }

  lstatSync(p) {
    return this.baseFs.lstatSync(this.mapToBase(p));
  }

  chmodPromise(p, mask) {
    return this.baseFs.chmodPromise(this.mapToBase(p), mask);
  }

  chmodSync(p, mask) {
    return this.baseFs.chmodSync(this.mapToBase(p), mask);
  }

  renamePromise(oldP, newP) {
    return this.baseFs.renamePromise(this.mapToBase(oldP), this.mapToBase(newP));
  }

  renameSync(oldP, newP) {
    return this.baseFs.renameSync(this.mapToBase(oldP), this.mapToBase(newP));
  }

  copyFilePromise(sourceP, destP, flags = 0) {
    return this.baseFs.copyFilePromise(this.mapToBase(sourceP), this.mapToBase(destP), flags);
  }

  copyFileSync(sourceP, destP, flags = 0) {
    return this.baseFs.copyFileSync(this.mapToBase(sourceP), this.mapToBase(destP), flags);
  }

  appendFilePromise(p, content, opts) {
    return this.baseFs.appendFilePromise(this.fsMapToBase(p), content, opts);
  }

  appendFileSync(p, content, opts) {
    return this.baseFs.appendFileSync(this.fsMapToBase(p), content, opts);
  }

  writeFilePromise(p, content, opts) {
    return this.baseFs.writeFilePromise(this.fsMapToBase(p), content, opts);
  }

  writeFileSync(p, content, opts) {
    return this.baseFs.writeFileSync(this.fsMapToBase(p), content, opts);
  }

  unlinkPromise(p) {
    return this.baseFs.unlinkPromise(this.mapToBase(p));
  }

  unlinkSync(p) {
    return this.baseFs.unlinkSync(this.mapToBase(p));
  }

  utimesPromise(p, atime, mtime) {
    return this.baseFs.utimesPromise(this.mapToBase(p), atime, mtime);
  }

  utimesSync(p, atime, mtime) {
    return this.baseFs.utimesSync(this.mapToBase(p), atime, mtime);
  }

  mkdirPromise(p, opts) {
    return this.baseFs.mkdirPromise(this.mapToBase(p), opts);
  }

  mkdirSync(p, opts) {
    return this.baseFs.mkdirSync(this.mapToBase(p), opts);
  }

  rmdirPromise(p) {
    return this.baseFs.rmdirPromise(this.mapToBase(p));
  }

  rmdirSync(p) {
    return this.baseFs.rmdirSync(this.mapToBase(p));
  }

  symlinkPromise(target, p, type) {
    return this.baseFs.symlinkPromise(this.mapToBase(target), this.mapToBase(p), type);
  }

  symlinkSync(target, p, type) {
    return this.baseFs.symlinkSync(this.mapToBase(target), this.mapToBase(p), type);
  }

  readFilePromise(p, encoding) {
    // This weird condition is required to tell TypeScript that the signatures are proper (otherwise it thinks that only the generic one is covered)
    if (encoding === 'utf8') {
      return this.baseFs.readFilePromise(this.fsMapToBase(p), encoding);
    } else {
      return this.baseFs.readFilePromise(this.fsMapToBase(p), encoding);
    }
  }

  readFileSync(p, encoding) {
    // This weird condition is required to tell TypeScript that the signatures are proper (otherwise it thinks that only the generic one is covered)
    if (encoding === 'utf8') {
      return this.baseFs.readFileSync(this.fsMapToBase(p), encoding);
    } else {
      return this.baseFs.readFileSync(this.fsMapToBase(p), encoding);
    }
  }

  async readdirPromise(p, {
    withFileTypes
  } = {}) {
    return this.baseFs.readdirPromise(this.mapToBase(p), {
      withFileTypes: withFileTypes
    });
  }

  readdirSync(p, {
    withFileTypes
  } = {}) {
    return this.baseFs.readdirSync(this.mapToBase(p), {
      withFileTypes: withFileTypes
    });
  }

  async readlinkPromise(p) {
    return this.mapFromBase((await this.baseFs.readlinkPromise(this.mapToBase(p))));
  }

  readlinkSync(p) {
    return this.mapFromBase(this.baseFs.readlinkSync(this.mapToBase(p)));
  }

  watch(p, a, b) {
    return this.baseFs.watch(this.mapToBase(p), // @ts-ignore
    a, b);
  }

  fsMapToBase(p) {
    if (typeof p === `number`) {
      return p;
    } else {
      return this.mapToBase(p);
    }
  }

}

exports.ProxiedFS = ProxiedFS;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const os_1 = __importDefault(__webpack_require__(9));

const util_1 = __webpack_require__(10);

const NodeFS_1 = __webpack_require__(1);

const path_1 = __webpack_require__(0);

var FakeFS_1 = __webpack_require__(3);

exports.normalizeLineEndings = FakeFS_1.normalizeLineEndings;

var ZipFS_1 = __webpack_require__(8);

exports.DEFAULT_COMPRESSION_LEVEL = ZipFS_1.DEFAULT_COMPRESSION_LEVEL;

var path_2 = __webpack_require__(0);

exports.PortablePath = path_2.PortablePath;
exports.Filename = path_2.Filename;

var path_3 = __webpack_require__(0);

exports.npath = path_3.npath;
exports.ppath = path_3.ppath;
exports.toFilename = path_3.toFilename;

var AliasFS_1 = __webpack_require__(16);

exports.AliasFS = AliasFS_1.AliasFS;

var FakeFS_2 = __webpack_require__(3);

exports.FakeFS = FakeFS_2.FakeFS;

var CwdFS_1 = __webpack_require__(17);

exports.CwdFS = CwdFS_1.CwdFS;

var JailFS_1 = __webpack_require__(18);

exports.JailFS = JailFS_1.JailFS;

var LazyFS_1 = __webpack_require__(19);

exports.LazyFS = LazyFS_1.LazyFS;

var NoFS_1 = __webpack_require__(20);

exports.NoFS = NoFS_1.NoFS;

var NodeFS_2 = __webpack_require__(1);

exports.NodeFS = NodeFS_2.NodeFS;

var PosixFS_1 = __webpack_require__(21);

exports.PosixFS = PosixFS_1.PosixFS;

var ProxiedFS_1 = __webpack_require__(4);

exports.ProxiedFS = ProxiedFS_1.ProxiedFS;

var VirtualFS_1 = __webpack_require__(22);

exports.VirtualFS = VirtualFS_1.VirtualFS;

var ZipFS_2 = __webpack_require__(8);

exports.ZipFS = ZipFS_2.ZipFS;

var ZipOpenFS_1 = __webpack_require__(23);

exports.ZipOpenFS = ZipOpenFS_1.ZipOpenFS;

function getTempName(prefix) {
  const tmpdir = path_1.npath.toPortablePath(os_1.default.tmpdir());
  const hash = Math.ceil(Math.random() * 0x100000000).toString(16).padStart(8, `0`);
  return path_1.ppath.join(tmpdir, `${prefix}${hash}`);
}

function patchFs(patchedFs, fakeFs) {
  const SYNC_IMPLEMENTATIONS = new Set([`accessSync`, `appendFileSync`, `createReadStream`, `chmodSync`, `closeSync`, `copyFileSync`, `lstatSync`, `mkdirSync`, `openSync`, `readSync`, `readlinkSync`, `readFileSync`, `readdirSync`, `readlinkSync`, `realpathSync`, `renameSync`, `rmdirSync`, `statSync`, `symlinkSync`, `unlinkSync`, `utimesSync`, `watch`, `writeFileSync`, `writeSync`]);
  const ASYNC_IMPLEMENTATIONS = new Set([`accessPromise`, `appendFilePromise`, `chmodPromise`, `closePromise`, `copyFilePromise`, `lstatPromise`, `mkdirPromise`, `openPromise`, `readdirPromise`, `realpathPromise`, `readFilePromise`, `readdirPromise`, `readlinkPromise`, `renamePromise`, `rmdirPromise`, `statPromise`, `symlinkPromise`, `unlinkPromise`, `utimesPromise`, `writeFilePromise`, `writeSync`]);

  const setupFn = (target, name, replacement) => {
    const orig = target[name];
    if (typeof orig === `undefined`) return;
    target[name] = replacement;

    if (typeof orig[util_1.promisify.custom] !== `undefined`) {
      replacement[util_1.promisify.custom] = orig[util_1.promisify.custom];
    }
  };

  setupFn(patchedFs, `existsSync`, p => {
    try {
      return fakeFs.existsSync(p);
    } catch (error) {
      return false;
    }
  });
  setupFn(patchedFs, `exists`, (p, ...args) => {
    const hasCallback = typeof args[args.length - 1] === `function`;
    const callback = hasCallback ? args.pop() : () => {};
    process.nextTick(() => {
      fakeFs.existsPromise(p).then(exists => {
        callback(exists);
      }, () => {
        callback(false);
      });
    });
  });
  setupFn(patchedFs, `read`, (p, buffer, ...args) => {
    const hasCallback = typeof args[args.length - 1] === `function`;
    const callback = hasCallback ? args.pop() : () => {};
    process.nextTick(() => {
      fakeFs.readPromise(p, buffer, ...args).then(bytesRead => {
        callback(null, bytesRead, buffer);
      }, error => {
        callback(error);
      });
    });
  });

  for (const fnName of ASYNC_IMPLEMENTATIONS) {
    const fakeImpl = fakeFs[fnName].bind(fakeFs);
    const origName = fnName.replace(/Promise$/, ``);
    setupFn(patchedFs, origName, (...args) => {
      const hasCallback = typeof args[args.length - 1] === `function`;
      const callback = hasCallback ? args.pop() : () => {};
      process.nextTick(() => {
        fakeImpl(...args).then(result => {
          callback(null, result);
        }, error => {
          callback(error);
        });
      });
    });
  }

  for (const fnName of SYNC_IMPLEMENTATIONS) {
    const fakeImpl = fakeFs[fnName].bind(fakeFs);
    const origName = fnName;
    setupFn(patchedFs, origName, fakeImpl);
  }

  patchedFs.realpathSync.native = patchedFs.realpathSync;
  patchedFs.realpath.native = patchedFs.realpath;
}

exports.patchFs = patchFs;

function extendFs(realFs, fakeFs) {
  const patchedFs = Object.create(realFs);
  patchFs(patchedFs, fakeFs);
  return patchedFs;
}

exports.extendFs = extendFs;
const tmpdirs = new Set();
let cleanExitRegistered = false;

function registerCleanExit() {
  if (!cleanExitRegistered) cleanExitRegistered = true;else return;

  const cleanExit = () => {
    process.off(`exit`, cleanExit);

    for (const p of tmpdirs) {
      tmpdirs.delete(p);

      try {
        exports.xfs.removeSync(p);
      } catch (_a) {// Too bad if there's an error
      }
    }
  };

  process.on(`exit`, cleanExit);
}

exports.xfs = Object.assign(new NodeFS_1.NodeFS(), {
  detachTemp(p) {
    tmpdirs.delete(p);
  },

  mktempSync(cb) {
    registerCleanExit();

    while (true) {
      const p = getTempName(`xfs-`);

      try {
        this.mkdirSync(p);
      } catch (error) {
        if (error.code === `EEXIST`) {
          continue;
        } else {
          throw error;
        }
      }

      const realP = this.realpathSync(p);
      tmpdirs.add(realP);

      if (typeof cb !== `undefined`) {
        try {
          return cb(realP);
        } finally {
          if (tmpdirs.has(realP)) {
            tmpdirs.delete(realP);

            try {
              this.removeSync(realP);
            } catch (_a) {// Too bad if there's an error
            }
          }
        }
      } else {
        return p;
      }
    }
  },

  async mktempPromise(cb) {
    registerCleanExit();

    while (true) {
      const p = getTempName(`xfs-`);

      try {
        await this.mkdirPromise(p);
      } catch (error) {
        if (error.code === `EEXIST`) {
          continue;
        } else {
          throw error;
        }
      }

      const realP = await this.realpathPromise(p);
      tmpdirs.add(realP);

      if (typeof cb !== `undefined`) {
        try {
          return await cb(realP);
        } finally {
          if (tmpdirs.has(realP)) {
            tmpdirs.delete(realP);

            try {
              await this.removePromise(realP);
            } catch (_a) {// Too bad if there's an error
            }
          }
        }
      } else {
        return realP;
      }
    }
  }

});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("module");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result["default"] = mod;
  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const fs_1 = __webpack_require__(2);

const stream_1 = __webpack_require__(14);

const util_1 = __webpack_require__(10);

const FakeFS_1 = __webpack_require__(3);

const NodeFS_1 = __webpack_require__(1);

const errors = __importStar(__webpack_require__(15));

const path_1 = __webpack_require__(0);

exports.DEFAULT_COMPRESSION_LEVEL = `mixed`;
const S_IFMT = 0o170000;
const S_IFDIR = 0o040000;
const S_IFREG = 0o100000;
const S_IFLNK = 0o120000;

class DirEntry {
  constructor() {
    this.name = ``;
    this.mode = 0;
  }

  isBlockDevice() {
    return false;
  }

  isCharacterDevice() {
    return false;
  }

  isDirectory() {
    return (this.mode & S_IFMT) === S_IFDIR;
  }

  isFIFO() {
    return false;
  }

  isFile() {
    return (this.mode & S_IFMT) === S_IFREG;
  }

  isSocket() {
    return false;
  }

  isSymbolicLink() {
    return (this.mode & S_IFMT) === S_IFLNK;
  }

}

class StatEntry {
  constructor() {
    this.dev = 0;
    this.ino = 0;
    this.mode = 0;
    this.nlink = 1;
    this.rdev = 0;
    this.blocks = 1;
  }

  isBlockDevice() {
    return false;
  }

  isCharacterDevice() {
    return false;
  }

  isDirectory() {
    return (this.mode & S_IFMT) === S_IFDIR;
  }

  isFIFO() {
    return false;
  }

  isFile() {
    return (this.mode & S_IFMT) === S_IFREG;
  }

  isSocket() {
    return false;
  }

  isSymbolicLink() {
    return (this.mode & S_IFMT) === S_IFLNK;
  }

}

function makeDefaultStats() {
  return Object.assign(new StatEntry(), {
    uid: 0,
    gid: 0,
    size: 0,
    blksize: 0,
    atimeMs: 0,
    mtimeMs: 0,
    ctimeMs: 0,
    birthtimeMs: 0,
    atime: new Date(0),
    mtime: new Date(0),
    ctime: new Date(0),
    birthtime: new Date(0),
    mode: S_IFREG | 0o644
  });
}

function toUnixTimestamp(time) {
  if (typeof time === 'string' && String(+time) === time) return +time; // @ts-ignore

  if (Number.isFinite(time)) {
    if (time < 0) {
      return Date.now() / 1000;
    } else {
      return time;
    }
  } // convert to 123.456 UNIX timestamp


  if (util_1.isDate(time)) return time.getTime() / 1000;
  throw new Error(`Invalid time`);
}

class ZipFS extends FakeFS_1.BasePortableFakeFS {
  constructor(source, opts) {
    super();
    this.listings = new Map();
    this.entries = new Map();
    this.fds = new Map();
    this.nextFd = 0;
    this.ready = false;
    this.readOnly = false;
    this.libzip = opts.libzip;
    const pathOptions = opts;
    this.level = typeof pathOptions.level !== 'undefined' ? pathOptions.level : exports.DEFAULT_COMPRESSION_LEVEL;

    if (typeof source === `string`) {
      const {
        baseFs = new NodeFS_1.NodeFS()
      } = pathOptions;
      this.baseFs = baseFs;
      this.path = source;
    } else {
      this.path = null;
      this.baseFs = null;
    }

    if (opts.stats) {
      this.stats = opts.stats;
    } else {
      if (typeof source === `string`) {
        try {
          this.stats = this.baseFs.statSync(source);
        } catch (error) {
          if (error.code === `ENOENT` && pathOptions.create) {
            this.stats = makeDefaultStats();
          } else {
            throw error;
          }
        }
      } else {
        this.stats = makeDefaultStats();
      }
    }

    const errPtr = this.libzip.malloc(4);

    try {
      let flags = 0;
      if (typeof source === `string` && pathOptions.create) flags |= this.libzip.ZIP_CREATE | this.libzip.ZIP_TRUNCATE;

      if (opts.readOnly) {
        flags |= this.libzip.ZIP_RDONLY;
        this.readOnly = true;
      }

      if (typeof source === `string`) {
        this.zip = this.libzip.open(path_1.npath.fromPortablePath(source), flags, errPtr);
      } else {
        const lzSource = this.allocateUnattachedSource(source);

        try {
          this.zip = this.libzip.openFromSource(lzSource, flags, errPtr);
        } catch (error) {
          this.libzip.source.free(lzSource);
          throw error;
        }
      }

      if (this.zip === 0) {
        const error = this.libzip.struct.errorS();
        this.libzip.error.initWithCode(error, this.libzip.getValue(errPtr, `i32`));
        throw new Error(this.libzip.error.strerror(error));
      }
    } finally {
      this.libzip.free(errPtr);
    }

    this.listings.set(path_1.PortablePath.root, new Set());
    const entryCount = this.libzip.getNumEntries(this.zip, 0);

    for (let t = 0; t < entryCount; ++t) {
      const raw = this.libzip.getName(this.zip, t, 0);
      if (path_1.ppath.isAbsolute(raw)) continue;
      const p = path_1.ppath.resolve(path_1.PortablePath.root, raw);
      this.registerEntry(p, t); // If the raw path is a directory, register it
      // to prevent empty folder being skipped

      if (raw.endsWith('/')) {
        this.registerListing(p);
      }
    }

    this.ready = true;
  }

  getExtractHint(hints) {
    for (const fileName of this.entries.keys()) {
      const ext = this.pathUtils.extname(fileName);

      if (hints.relevantExtensions.has(ext)) {
        return true;
      }
    }

    return false;
  }

  getAllFiles() {
    return Array.from(this.entries.keys());
  }

  getRealPath() {
    if (!this.path) throw new Error(`ZipFS don't have real paths when loaded from a buffer`);
    return this.path;
  }

  saveAndClose() {
    if (!this.path || !this.baseFs) throw new Error(`ZipFS cannot be saved and must be discarded when loaded from a buffer`);
    if (!this.ready) throw errors.EBUSY(`archive closed, close`);
    if (this.readOnly) return this.discardAndClose();
    const previousMod = this.baseFs.existsSync(this.path) ? this.baseFs.statSync(this.path).mode & 0o777 : null;
    const rc = this.libzip.close(this.zip);
    if (rc === -1) throw new Error(this.libzip.error.strerror(this.libzip.getError(this.zip))); // this.libzip overrides the chmod when writing the archive, which is a weird
    // behavior I don't totally understand (plus the umask seems bogus in some
    // weird cases - maybe related to emscripten?)
    //
    // See also https://github.com/nih-at/libzip/issues/77

    if (previousMod === null) this.baseFs.chmodSync(this.path, this.stats.mode);else if (previousMod !== (this.baseFs.statSync(this.path).mode & 0o777)) this.baseFs.chmodSync(this.path, previousMod);
    this.ready = false;
  }

  discardAndClose() {
    if (!this.ready) throw errors.EBUSY(`archive closed, close`);
    this.libzip.discard(this.zip);
    this.ready = false;
  }

  async openPromise(p, flags, mode) {
    return this.openSync(p, flags, mode);
  }

  openSync(p, flags, mode) {
    const fd = this.nextFd++;
    this.fds.set(fd, {
      cursor: 0,
      p
    });
    return fd;
  }

  async readPromise(fd, buffer, offset, length, position) {
    return this.readSync(fd, buffer, offset, length, position);
  }

  readSync(fd, buffer, offset = 0, length = 0, position = -1) {
    const entry = this.fds.get(fd);
    if (typeof entry === `undefined`) throw errors.EBADF(`read`);
    let realPosition;
    if (position === -1 || position === null) realPosition = entry.cursor;else realPosition = position;
    const source = this.readFileSync(entry.p);
    source.copy(buffer, offset, realPosition, realPosition + length);
    const bytesRead = Math.max(0, Math.min(source.length - realPosition, length));
    if (position === -1) entry.cursor += bytesRead;
    return bytesRead;
  }

  async writePromise(fd, buffer, offset, length, position) {
    if (typeof buffer === `string`) {
      return this.writeSync(fd, buffer, position);
    } else {
      return this.writeSync(fd, buffer, offset, length, position);
    }
  }

  writeSync(fd, buffer, offset, length, position) {
    const entry = this.fds.get(fd);
    if (typeof entry === `undefined`) throw errors.EBADF(`read`);
    throw new Error(`Unimplemented`);
  }

  async closePromise(fd) {
    return this.closeSync(fd);
  }

  closeSync(fd) {
    const entry = this.fds.get(fd);
    if (typeof entry === `undefined`) throw errors.EBADF(`read`);
    this.fds.delete(fd);
  }

  createReadStream(p, {
    encoding
  } = {}) {
    if (p === null) throw new Error(`Unimplemented`);
    const stream = Object.assign(new stream_1.PassThrough(), {
      bytesRead: 0,
      path: p,
      close: () => {
        clearImmediate(immediate);
      }
    });
    const immediate = setImmediate(() => {
      try {
        const data = this.readFileSync(p, encoding);
        stream.bytesRead = data.length;
        stream.write(data);
        stream.end();
      } catch (error) {
        stream.emit(`error`, error);
        stream.end();
      }
    });
    return stream;
  }

  createWriteStream(p, {
    encoding
  } = {}) {
    if (this.readOnly) throw errors.EROFS(`open '${p}'`);
    if (p === null) throw new Error(`Unimplemented`);
    const stream = Object.assign(new stream_1.PassThrough(), {
      bytesWritten: 0,
      path: p,
      close: () => {
        stream.end();
      }
    });
    const chunks = [];
    stream.on(`data`, chunk => {
      const chunkBuffer = Buffer.from(chunk);
      stream.bytesWritten += chunkBuffer.length;
      chunks.push(chunkBuffer);
    });
    stream.on(`end`, () => {
      this.writeFileSync(p, Buffer.concat(chunks), encoding);
    });
    return stream;
  }

  async realpathPromise(p) {
    return this.realpathSync(p);
  }

  realpathSync(p) {
    const resolvedP = this.resolveFilename(`lstat '${p}'`, p);
    if (!this.entries.has(resolvedP) && !this.listings.has(resolvedP)) throw errors.ENOENT(`lstat '${p}'`);
    return resolvedP;
  }

  async existsPromise(p) {
    return this.existsSync(p);
  }

  existsSync(p) {
    let resolvedP;

    try {
      resolvedP = this.resolveFilename(`stat '${p}'`, p);
    } catch (error) {
      return false;
    }

    return this.entries.has(resolvedP) || this.listings.has(resolvedP);
  }

  async accessPromise(p, mode) {
    return this.accessSync(p, mode);
  }

  accessSync(p, mode = fs_1.constants.F_OK) {
    const resolvedP = this.resolveFilename(`access '${p}'`, p);
    if (!this.entries.has(resolvedP) && !this.listings.has(resolvedP)) throw errors.ENOENT(`access '${p}'`);

    if (this.readOnly && mode & fs_1.constants.W_OK) {
      throw errors.EROFS(`access '${p}'`);
    }
  }

  async statPromise(p) {
    return this.statSync(p);
  }

  statSync(p) {
    const resolvedP = this.resolveFilename(`stat '${p}'`, p);
    if (!this.entries.has(resolvedP) && !this.listings.has(resolvedP)) throw errors.ENOENT(`stat '${p}'`);
    if (p[p.length - 1] === `/` && !this.listings.has(resolvedP)) throw errors.ENOTDIR(`stat '${p}'`);
    return this.statImpl(`stat '${p}'`, resolvedP);
  }

  async lstatPromise(p) {
    return this.lstatSync(p);
  }

  lstatSync(p) {
    const resolvedP = this.resolveFilename(`lstat '${p}'`, p, false);
    if (!this.entries.has(resolvedP) && !this.listings.has(resolvedP)) throw errors.ENOENT(`lstat '${p}'`);
    if (p[p.length - 1] === `/` && !this.listings.has(resolvedP)) throw errors.ENOTDIR(`lstat '${p}'`);
    return this.statImpl(`lstat '${p}'`, resolvedP);
  }

  statImpl(reason, p) {
    const entry = this.entries.get(p); // File, or explicit directory

    if (typeof entry !== `undefined`) {
      const stat = this.libzip.struct.statS();
      const rc = this.libzip.statIndex(this.zip, entry, 0, 0, stat);
      if (rc === -1) throw new Error(this.libzip.error.strerror(this.libzip.getError(this.zip)));
      const uid = this.stats.uid;
      const gid = this.stats.gid;
      const size = this.libzip.struct.statSize(stat) >>> 0;
      const blksize = 512;
      const blocks = Math.ceil(size / blksize);
      const mtimeMs = (this.libzip.struct.statMtime(stat) >>> 0) * 1000;
      const atimeMs = mtimeMs;
      const birthtimeMs = mtimeMs;
      const ctimeMs = mtimeMs;
      const atime = new Date(atimeMs);
      const birthtime = new Date(birthtimeMs);
      const ctime = new Date(ctimeMs);
      const mtime = new Date(mtimeMs);
      const type = this.listings.has(p) ? S_IFDIR : this.isSymbolicLink(entry) ? S_IFLNK : S_IFREG;
      const defaultMode = type === S_IFDIR ? 0o755 : 0o644;
      const mode = type | this.getUnixMode(entry, defaultMode) & 0o777;
      return Object.assign(new StatEntry(), {
        uid,
        gid,
        size,
        blksize,
        blocks,
        atime,
        birthtime,
        ctime,
        mtime,
        atimeMs,
        birthtimeMs,
        ctimeMs,
        mtimeMs,
        mode
      });
    } // Implicit directory


    if (this.listings.has(p)) {
      const uid = this.stats.uid;
      const gid = this.stats.gid;
      const size = 0;
      const blksize = 512;
      const blocks = 0;
      const atimeMs = this.stats.mtimeMs;
      const birthtimeMs = this.stats.mtimeMs;
      const ctimeMs = this.stats.mtimeMs;
      const mtimeMs = this.stats.mtimeMs;
      const atime = new Date(atimeMs);
      const birthtime = new Date(birthtimeMs);
      const ctime = new Date(ctimeMs);
      const mtime = new Date(mtimeMs);
      const mode = S_IFDIR | 0o755;
      return Object.assign(new StatEntry(), {
        uid,
        gid,
        size,
        blksize,
        blocks,
        atime,
        birthtime,
        ctime,
        mtime,
        atimeMs,
        birthtimeMs,
        ctimeMs,
        mtimeMs,
        mode
      });
    }

    throw new Error(`Unreachable`);
  }

  getUnixMode(index, defaultMode) {
    const rc = this.libzip.file.getExternalAttributes(this.zip, index, 0, 0, this.libzip.uint08S, this.libzip.uint32S);
    if (rc === -1) throw new Error(this.libzip.error.strerror(this.libzip.getError(this.zip)));
    const opsys = this.libzip.getValue(this.libzip.uint08S, `i8`) >>> 0;
    if (opsys !== this.libzip.ZIP_OPSYS_UNIX) return defaultMode;
    return this.libzip.getValue(this.libzip.uint32S, `i32`) >>> 16;
  }

  registerListing(p) {
    let listing = this.listings.get(p);
    if (listing) return listing;
    const parentListing = this.registerListing(path_1.ppath.dirname(p));
    listing = new Set();
    parentListing.add(path_1.ppath.basename(p));
    this.listings.set(p, listing);
    return listing;
  }

  registerEntry(p, index) {
    const parentListing = this.registerListing(path_1.ppath.dirname(p));
    parentListing.add(path_1.ppath.basename(p));
    this.entries.set(p, index);
  }

  resolveFilename(reason, p, resolveLastComponent = true) {
    if (!this.ready) throw errors.EBUSY(`archive closed, ${reason}`);
    let resolvedP = path_1.ppath.resolve(path_1.PortablePath.root, p);
    if (resolvedP === `/`) return path_1.PortablePath.root;

    while (true) {
      const parentP = this.resolveFilename(reason, path_1.ppath.dirname(resolvedP), true);
      const isDir = this.listings.has(parentP);
      const doesExist = this.entries.has(parentP);
      if (!isDir && !doesExist) throw errors.ENOENT(reason);
      if (!isDir) throw errors.ENOTDIR(reason);
      resolvedP = path_1.ppath.resolve(parentP, path_1.ppath.basename(resolvedP));
      if (!resolveLastComponent) break;
      const index = this.libzip.name.locate(this.zip, resolvedP.slice(1));
      if (index === -1) break;

      if (this.isSymbolicLink(index)) {
        const target = this.getFileSource(index).toString();
        resolvedP = path_1.ppath.resolve(path_1.ppath.dirname(resolvedP), target);
      } else {
        break;
      }
    }

    return resolvedP;
  }

  allocateBuffer(content) {
    if (!Buffer.isBuffer(content)) content = Buffer.from(content);
    const buffer = this.libzip.malloc(content.byteLength);
    if (!buffer) throw new Error(`Couldn't allocate enough memory`); // Copy the file into the Emscripten heap

    const heap = new Uint8Array(this.libzip.HEAPU8.buffer, buffer, content.byteLength);
    heap.set(content);
    return {
      buffer,
      byteLength: content.byteLength
    };
  }

  allocateUnattachedSource(content) {
    const error = this.libzip.struct.errorS();
    const {
      buffer,
      byteLength
    } = this.allocateBuffer(content);
    const source = this.libzip.source.fromUnattachedBuffer(buffer, byteLength, 0, true, error);

    if (source === 0) {
      this.libzip.free(error);
      throw new Error(this.libzip.error.strerror(error));
    }

    return source;
  }

  allocateSource(content) {
    const {
      buffer,
      byteLength
    } = this.allocateBuffer(content);
    const source = this.libzip.source.fromBuffer(this.zip, buffer, byteLength, 0, true);

    if (source === 0) {
      this.libzip.free(buffer);
      throw new Error(this.libzip.error.strerror(this.libzip.getError(this.zip)));
    }

    return source;
  }

  setFileSource(p, content) {
    const target = path_1.ppath.relative(path_1.PortablePath.root, p);
    const lzSource = this.allocateSource(content);

    try {
      const newIndex = this.libzip.file.add(this.zip, target, lzSource, this.libzip.ZIP_FL_OVERWRITE);

      if (this.level !== `mixed`) {
        // Use store for level 0, and deflate for 1..9
        let method;
        if (this.level === 0) method = this.libzip.ZIP_CM_STORE;else method = this.libzip.ZIP_CM_DEFLATE;
        const rc = this.libzip.file.setCompression(this.zip, newIndex, 0, method, this.level);

        if (rc === -1) {
          throw new Error(this.libzip.error.strerror(this.libzip.getError(this.zip)));
        }
      }

      return newIndex;
    } catch (error) {
      this.libzip.source.free(lzSource);
      throw error;
    }
  }

  isSymbolicLink(index) {
    const attrs = this.libzip.file.getExternalAttributes(this.zip, index, 0, 0, this.libzip.uint08S, this.libzip.uint32S);
    if (attrs === -1) throw new Error(this.libzip.error.strerror(this.libzip.getError(this.zip)));
    const opsys = this.libzip.getValue(this.libzip.uint08S, `i8`) >>> 0;
    if (opsys !== this.libzip.ZIP_OPSYS_UNIX) return false;
    const attributes = this.libzip.getValue(this.libzip.uint32S, `i32`) >>> 16;
    return (attributes & S_IFMT) === S_IFLNK;
  }

  getFileSource(index) {
    const stat = this.libzip.struct.statS();
    const rc = this.libzip.statIndex(this.zip, index, 0, 0, stat);
    if (rc === -1) throw new Error(this.libzip.error.strerror(this.libzip.getError(this.zip)));
    const size = this.libzip.struct.statSize(stat);
    const buffer = this.libzip.malloc(size);

    try {
      const file = this.libzip.fopenIndex(this.zip, index, 0, 0);
      if (file === 0) throw new Error(this.libzip.error.strerror(this.libzip.getError(this.zip)));

      try {
        const rc = this.libzip.fread(file, buffer, size, 0);
        if (rc === -1) throw new Error(this.libzip.error.strerror(this.libzip.file.getError(file)));else if (rc < size) throw new Error(`Incomplete read`);else if (rc > size) throw new Error(`Overread`);
        const memory = this.libzip.HEAPU8.subarray(buffer, buffer + size);
        const data = Buffer.from(memory);
        return data;
      } finally {
        this.libzip.fclose(file);
      }
    } finally {
      this.libzip.free(buffer);
    }
  }

  async chmodPromise(p, mask) {
    return this.chmodSync(p, mask);
  }

  chmodSync(p, mask) {
    if (this.readOnly) throw errors.EROFS(`chmod '${p}'`); // We don't allow to make the extracted entries group-writable

    mask &= 0o755;
    const resolvedP = this.resolveFilename(`chmod '${p}'`, p, false);
    const entry = this.entries.get(resolvedP);
    if (typeof entry === `undefined`) throw new Error(`Assertion failed: The entry should have been registered (${resolvedP})`);
    const oldMod = this.getUnixMode(entry, S_IFREG | 0o000);
    const newMod = oldMod & ~0o777 | mask;
    const rc = this.libzip.file.setExternalAttributes(this.zip, entry, 0, 0, this.libzip.ZIP_OPSYS_UNIX, newMod << 16);

    if (rc === -1) {
      throw new Error(this.libzip.error.strerror(this.libzip.getError(this.zip)));
    }
  }

  async renamePromise(oldP, newP) {
    return this.renameSync(oldP, newP);
  }

  renameSync(oldP, newP) {
    throw new Error(`Unimplemented`);
  }

  async copyFilePromise(sourceP, destP, flags) {
    return this.copyFileSync(sourceP, destP, flags);
  }

  copyFileSync(sourceP, destP, flags = 0) {
    if (this.readOnly) throw errors.EROFS(`copyfile '${sourceP} -> '${destP}'`);
    if ((flags & fs_1.constants.COPYFILE_FICLONE_FORCE) !== 0) throw errors.ENOSYS(`unsupported clone operation`, `copyfile '${sourceP}' -> ${destP}'`);
    const resolvedSourceP = this.resolveFilename(`copyfile '${sourceP} -> ${destP}'`, sourceP);
    const indexSource = this.entries.get(resolvedSourceP);
    if (typeof indexSource === `undefined`) throw errors.EINVAL(`copyfile '${sourceP}' -> '${destP}'`);
    const resolvedDestP = this.resolveFilename(`copyfile '${sourceP}' -> ${destP}'`, destP);
    const indexDest = this.entries.get(resolvedDestP);
    if ((flags & (fs_1.constants.COPYFILE_EXCL | fs_1.constants.COPYFILE_FICLONE_FORCE)) !== 0 && typeof indexDest !== `undefined`) throw errors.EEXIST(`copyfile '${sourceP}' -> '${destP}'`);
    const source = this.getFileSource(indexSource);
    const newIndex = this.setFileSource(resolvedDestP, source);

    if (newIndex !== indexDest) {
      this.registerEntry(resolvedDestP, newIndex);
    }
  }

  async appendFilePromise(p, content, opts) {
    return this.appendFileSync(p, content, opts);
  }

  appendFileSync(p, content, opts = {}) {
    if (this.readOnly) throw errors.EROFS(`open '${p}'`);
    if (typeof opts === `undefined`) opts = {
      flag: `a`
    };else if (typeof opts === `string`) opts = {
      flag: `a`,
      encoding: opts
    };else if (typeof opts.flag === `undefined`) opts = Object.assign({
      flag: `a`
    }, opts);
    return this.writeFileSync(p, content, opts);
  }

  async writeFilePromise(p, content, opts) {
    return this.writeFileSync(p, content, opts);
  }

  writeFileSync(p, content, opts) {
    if (typeof p !== `string`) throw errors.EBADF(`read`);
    if (this.readOnly) throw errors.EROFS(`open '${p}'`);
    const resolvedP = this.resolveFilename(`open '${p}'`, p);
    if (this.listings.has(resolvedP)) throw errors.EISDIR(`open '${p}'`);
    const index = this.entries.get(resolvedP);
    if (index !== undefined && typeof opts === `object` && opts.flag && opts.flag.includes(`a`)) content = Buffer.concat([this.getFileSource(index), Buffer.from(content)]);
    let encoding = null;
    if (typeof opts === `string`) encoding = opts;else if (typeof opts === `object` && opts.encoding) encoding = opts.encoding;
    if (encoding !== null) content = content.toString(encoding);
    const newIndex = this.setFileSource(resolvedP, content);

    if (newIndex !== index) {
      this.registerEntry(resolvedP, newIndex);
    }
  }

  async unlinkPromise(p) {
    return this.unlinkSync(p);
  }

  unlinkSync(p) {
    throw new Error(`Unimplemented`);
  }

  async utimesPromise(p, atime, mtime) {
    return this.utimesSync(p, atime, mtime);
  }

  utimesSync(p, atime, mtime) {
    if (this.readOnly) throw errors.EROFS(`utimes '${p}'`);
    const resolvedP = this.resolveFilename(`utimes '${p}'`, p);
    this.utimesImpl(resolvedP, mtime);
  }

  async lutimesPromise(p, atime, mtime) {
    return this.lutimesSync(p, atime, mtime);
  }

  lutimesSync(p, atime, mtime) {
    if (this.readOnly) throw errors.EROFS(`lutimes '${p}'`);
    const resolvedP = this.resolveFilename(`utimes '${p}'`, p, false);
    this.utimesImpl(resolvedP, mtime);
  }

  utimesImpl(resolvedP, mtime) {
    if (this.listings.has(resolvedP)) if (!this.entries.has(resolvedP)) this.hydrateDirectory(resolvedP);
    const entry = this.entries.get(resolvedP);
    if (entry === undefined) throw new Error(`Unreachable`);
    const rc = this.libzip.file.setMtime(this.zip, entry, 0, toUnixTimestamp(mtime), 0);

    if (rc === -1) {
      throw new Error(this.libzip.error.strerror(this.libzip.getError(this.zip)));
    }
  }

  async mkdirPromise(p, opts) {
    return this.mkdirSync(p, opts);
  }

  mkdirSync(p, {
    mode = 0o755,
    recursive = false
  } = {}) {
    if (recursive) return this.mkdirpSync(p, {
      chmod: mode
    });
    if (this.readOnly) throw errors.EROFS(`mkdir '${p}'`);
    const resolvedP = this.resolveFilename(`mkdir '${p}'`, p);
    if (this.entries.has(resolvedP) || this.listings.has(resolvedP)) throw errors.EEXIST(`mkdir '${p}'`);
    this.hydrateDirectory(resolvedP);
    this.chmodSync(resolvedP, mode);
  }

  async rmdirPromise(p) {
    return this.rmdirSync(p);
  }

  rmdirSync(p) {
    throw new Error(`Unimplemented`);
  }

  hydrateDirectory(resolvedP) {
    const index = this.libzip.dir.add(this.zip, path_1.ppath.relative(path_1.PortablePath.root, resolvedP));
    if (index === -1) throw new Error(this.libzip.error.strerror(this.libzip.getError(this.zip)));
    this.registerListing(resolvedP);
    this.registerEntry(resolvedP, index);
    return index;
  }

  async symlinkPromise(target, p) {
    return this.symlinkSync(target, p);
  }

  symlinkSync(target, p) {
    if (this.readOnly) throw errors.EROFS(`symlink '${target}' -> '${p}'`);
    const resolvedP = this.resolveFilename(`symlink '${target}' -> '${p}'`, p);
    if (this.listings.has(resolvedP)) throw errors.EISDIR(`symlink '${target}' -> '${p}'`);
    if (this.entries.has(resolvedP)) throw errors.EEXIST(`symlink '${target}' -> '${p}'`);
    const index = this.setFileSource(resolvedP, target);
    this.registerEntry(resolvedP, index);
    const rc = this.libzip.file.setExternalAttributes(this.zip, index, 0, 0, this.libzip.ZIP_OPSYS_UNIX, (0o120000 | 0o777) << 16);

    if (rc === -1) {
      throw new Error(this.libzip.error.strerror(this.libzip.getError(this.zip)));
    }
  }

  async readFilePromise(p, encoding) {
    // This weird switch is required to tell TypeScript that the signatures are proper (otherwise it thinks that only the generic one is covered)
    switch (encoding) {
      case `utf8`:
        return this.readFileSync(p, encoding);

      default:
        return this.readFileSync(p, encoding);
    }
  }

  readFileSync(p, encoding) {
    if (typeof p !== `string`) throw errors.EBADF(`read`); // This is messed up regarding the TS signatures

    if (typeof encoding === `object`) // @ts-ignore
      encoding = encoding ? encoding.encoding : undefined;
    const resolvedP = this.resolveFilename(`open '${p}'`, p);
    if (!this.entries.has(resolvedP) && !this.listings.has(resolvedP)) throw errors.ENOENT(`open '${p}'`); // Ensures that the last component is a directory, if the user said so (even if it is we'll throw right after with EISDIR anyway)

    if (p[p.length - 1] === `/` && !this.listings.has(resolvedP)) throw errors.ENOTDIR(`open '${p}'`);
    if (this.listings.has(resolvedP)) throw errors.EISDIR(`read`);
    const entry = this.entries.get(resolvedP);
    if (entry === undefined) throw new Error(`Unreachable`);
    const data = this.getFileSource(entry);
    return encoding ? data.toString(encoding) : data;
  }

  async readdirPromise(p, {
    withFileTypes
  } = {}) {
    return this.readdirSync(p, {
      withFileTypes: withFileTypes
    });
  }

  readdirSync(p, {
    withFileTypes
  } = {}) {
    const resolvedP = this.resolveFilename(`scandir '${p}'`, p);
    if (!this.entries.has(resolvedP) && !this.listings.has(resolvedP)) throw errors.ENOENT(`scandir '${p}'`);
    const directoryListing = this.listings.get(resolvedP);
    if (!directoryListing) throw errors.ENOTDIR(`scandir '${p}'`);
    const entries = [...directoryListing];
    if (!withFileTypes) return entries;
    return entries.map(name => {
      return Object.assign(this.statImpl(`lstat`, path_1.ppath.join(p, name)), {
        name
      });
    });
  }

  async readlinkPromise(p) {
    return this.readlinkSync(p);
  }

  readlinkSync(p) {
    const resolvedP = this.resolveFilename(`readlink '${p}'`, p, false);
    if (!this.entries.has(resolvedP) && !this.listings.has(resolvedP)) throw errors.ENOENT(`readlink '${p}'`); // Ensure that the last component is a directory (if it is we'll throw right after with EISDIR anyway)

    if (p[p.length - 1] === `/` && !this.listings.has(resolvedP)) throw errors.ENOTDIR(`open '${p}'`);
    if (this.listings.has(resolvedP)) throw errors.EINVAL(`readlink '${p}'`);
    const entry = this.entries.get(resolvedP);
    if (entry === undefined) throw new Error(`Unreachable`);
    const rc = this.libzip.file.getExternalAttributes(this.zip, entry, 0, 0, this.libzip.uint08S, this.libzip.uint32S);
    if (rc === -1) throw new Error(this.libzip.error.strerror(this.libzip.getError(this.zip)));
    const opsys = this.libzip.getValue(this.libzip.uint08S, `i8`) >>> 0;
    if (opsys !== this.libzip.ZIP_OPSYS_UNIX) throw errors.EINVAL(`readlink '${p}'`);
    const attributes = this.libzip.getValue(this.libzip.uint32S, `i32`) >>> 16;
    if ((attributes & 0o170000) !== 0o120000) throw errors.EINVAL(`readlink '${p}'`);
    return this.getFileSource(entry).toString();
  }

  watch(p, a, b) {
    let persistent;

    switch (typeof a) {
      case `function`:
      case `string`:
      case `undefined`:
        {
          persistent = true;
        }
        break;

      default:
        {
          // @ts-ignore
          ({
            persistent = true
          } = a);
        }
        break;
    }

    if (!persistent) return {
      on: () => {},
      close: () => {}
    };
    const interval = setInterval(() => {}, 24 * 60 * 60 * 1000);
    return {
      on: () => {},
      close: () => {
        clearInterval(interval);
      }
    };
  }

}

exports.ZipFS = ZipFS;
;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ErrorCode;

(function (ErrorCode) {
  ErrorCode["API_ERROR"] = "API_ERROR";
  ErrorCode["BLACKLISTED"] = "BLACKLISTED";
  ErrorCode["BUILTIN_NODE_RESOLUTION_FAILED"] = "BUILTIN_NODE_RESOLUTION_FAILED";
  ErrorCode["MISSING_DEPENDENCY"] = "MISSING_DEPENDENCY";
  ErrorCode["MISSING_PEER_DEPENDENCY"] = "MISSING_PEER_DEPENDENCY";
  ErrorCode["QUALIFIED_PATH_RESOLUTION_FAILED"] = "QUALIFIED_PATH_RESOLUTION_FAILED";
  ErrorCode["INTERNAL"] = "INTERNAL";
  ErrorCode["UNDECLARED_DEPENDENCY"] = "UNDECLARED_DEPENDENCY";
  ErrorCode["UNSUPPORTED"] = "UNSUPPORTED";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));

; // Some errors are exposed as MODULE_NOT_FOUND for compatibility with packages
// that expect this umbrella error when the resolution fails

const MODULE_NOT_FOUND_ERRORS = new Set([ErrorCode.BLACKLISTED, ErrorCode.BUILTIN_NODE_RESOLUTION_FAILED, ErrorCode.MISSING_DEPENDENCY, ErrorCode.MISSING_PEER_DEPENDENCY, ErrorCode.QUALIFIED_PATH_RESOLUTION_FAILED, ErrorCode.UNDECLARED_DEPENDENCY]);
/**
 * Simple helper function that assign an error code to an error, so that it can more easily be caught and used
 * by third-parties.
 */

function makeError(pnpCode, message, data = {}) {
  const code = MODULE_NOT_FOUND_ERRORS.has(pnpCode) ? `MODULE_NOT_FOUND` : pnpCode;
  const propertySpec = {
    configurable: true,
    writable: true,
    enumerable: false
  };
  return Object.defineProperties(new Error(message), {
    code: Object.assign(Object.assign({}, propertySpec), {
      value: code
    }),
    pnpCode: Object.assign(Object.assign({}, propertySpec), {
      value: pnpCode
    }),
    data: Object.assign(Object.assign({}, propertySpec), {
      value: data
    })
  });
}

exports.makeError = makeError;
/**
 * Returns the module that should be used to resolve require calls. It's usually the direct parent, except if we're
 * inside an eval expression.
 */

function getIssuerModule(parent) {
  let issuer = parent;

  while (issuer && (issuer.id === '[eval]' || issuer.id === '<repl>' || !issuer.filename)) issuer = issuer.parent;

  return issuer || null;
}

exports.getIssuerModule = getIssuerModule;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const fslib_1 = __webpack_require__(5);

const libzip_1 = __webpack_require__(24);

const fs_1 = __importDefault(__webpack_require__(2));

const module_1 = __importDefault(__webpack_require__(6));

const string_decoder_1 = __importDefault(__webpack_require__(28));

const applyPatch_1 = __webpack_require__(29);

const hydrateRuntimeState_1 = __webpack_require__(31);

const makeApi_1 = __webpack_require__(32);

const makeManager_1 = __webpack_require__(33); // We must copy the fs into a local, because otherwise
// 1. we would make the NodeFS instance use the function that we patched (infinite loop)
// 2. Object.create(fs) isn't enough, since it won't prevent the proto from being modified


const localFs = Object.assign({}, fs_1.default);
const nodeFs = new fslib_1.NodeFS(localFs);
const defaultRuntimeState = $$SETUP_STATE(hydrateRuntimeState_1.hydrateRuntimeState);
const defaultPnpapiResolution = __filename; // We create a virtual filesystem that will do three things:
// 1. all requests inside a folder named "$$virtual" will be remapped according the virtual folder rules
// 2. all requests going inside a Zip archive will be handled by the Zip fs implementation
// 3. any remaining request will be forwarded to Node as-is

const defaultFsLayer = new fslib_1.VirtualFS({
  baseFs: new fslib_1.ZipOpenFS({
    baseFs: nodeFs,
    libzip: libzip_1.getLibzipSync(),
    maxOpenFiles: 80,
    readOnlyArchives: true
  })
});
let manager;
const defaultApi = Object.assign(makeApi_1.makeApi(defaultRuntimeState, {
  fakeFs: defaultFsLayer,
  pnpapiResolution: defaultPnpapiResolution
}), {
  /**
   * Can be used to generate a different API than the default one (for example
   * to map it on `/` rather than the local directory path, or to use a
   * different FS layer than the default one).
   */
  makeApi: _a => {
    var {
      basePath = undefined,
      fakeFs = defaultFsLayer,
      pnpapiResolution = defaultPnpapiResolution
    } = _a,
        rest = __rest(_a, ["basePath", "fakeFs", "pnpapiResolution"]);

    const apiRuntimeState = typeof basePath !== `undefined` ? $$SETUP_STATE(hydrateRuntimeState_1.hydrateRuntimeState, basePath) : defaultRuntimeState;
    return makeApi_1.makeApi(apiRuntimeState, Object.assign({
      fakeFs,
      pnpapiResolution
    }, rest));
  },

  /**
   * Will inject the specified API into the environment, monkey-patching FS. Is
   * automatically called when the hook is loaded through `--require`.
   */
  setup: api => {
    applyPatch_1.applyPatch(api || defaultApi, {
      fakeFs: defaultFsLayer,
      manager
    });
  }
});
manager = makeManager_1.makeManager(defaultApi, {
  fakeFs: defaultFsLayer
}); // eslint-disable-next-line arca/no-default-export

exports.default = defaultApi;

if (__non_webpack_module__.parent && __non_webpack_module__.parent.id === 'internal/preload') {
  defaultApi.setup();

  if (__non_webpack_module__.filename) {
    // We delete it from the cache in order to support the case where the CLI resolver is invoked from "yarn run"
    // It's annoying because it might cause some issues when the file is multiple times in NODE_OPTIONS, but it shouldn't happen anyway.
    // @ts-ignore
    delete module_1.default._cache[__non_webpack_module__.filename];
  }
} // @ts-ignore


if (process.mainModule === __non_webpack_module__) {
  const reportError = (code, message, data) => {
    process.stdout.write(`${JSON.stringify([{
      code,
      message,
      data
    }, null])}\n`);
  };

  const reportSuccess = resolution => {
    process.stdout.write(`${JSON.stringify([null, resolution])}\n`);
  };

  const processResolution = (request, issuer) => {
    try {
      reportSuccess(defaultApi.resolveRequest(request, issuer));
    } catch (error) {
      reportError(error.code, error.message, error.data);
    }
  };

  const processRequest = data => {
    try {
      const [request, issuer] = JSON.parse(data);
      processResolution(request, issuer);
    } catch (error) {
      reportError(`INVALID_JSON`, error.message, error.data);
    }
  };

  if (process.argv.length > 2) {
    if (process.argv.length !== 4) {
      process.stderr.write(`Usage: ${process.argv[0]} ${process.argv[1]} <request> <issuer>\n`);
      process.exitCode = 64;
      /* EX_USAGE */
    } else {
      processResolution(process.argv[2], process.argv[3]);
    }
  } else {
    let buffer = '';
    const decoder = new string_decoder_1.default.StringDecoder();
    process.stdin.on('data', chunk => {
      buffer += decoder.write(chunk);

      do {
        const index = buffer.indexOf('\n');
        if (index === -1) break;
        const line = buffer.slice(0, index);
        buffer = buffer.slice(index + 1);
        processRequest(line);
      } while (true);
    });
  }
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const fs_1 = __importDefault(__webpack_require__(2));

const path_1 = __webpack_require__(0);

async function copyPromise(destinationFs, destination, sourceFs, source, opts) {
  const normalizedDestination = destinationFs.pathUtils.normalize(destination);
  const normalizedSource = sourceFs.pathUtils.normalize(source);
  const operations = [];
  const utimes = [];
  await destinationFs.mkdirpPromise(destination);
  await copyImpl(operations, utimes, destinationFs, normalizedDestination, sourceFs, normalizedSource, opts);

  for (const operation of operations) await operation();

  for (const [p, atime, mtime] of utimes) {
    await destinationFs.utimesPromise(p, atime, mtime);
  }
}

exports.copyPromise = copyPromise;

async function copyImpl(operations, utimes, destinationFs, destination, sourceFs, source, opts) {
  const destinationStat = await maybeLStat(destinationFs, destination);
  const sourceStat = await sourceFs.lstatPromise(source);
  utimes.push([destination, sourceStat.atime, sourceStat.mtime]);

  switch (true) {
    case sourceStat.isDirectory():
      {
        await copyFolder(operations, utimes, destinationFs, destination, destinationStat, sourceFs, source, sourceStat, opts);
      }
      break;

    case sourceStat.isFile():
      {
        await copyFile(operations, utimes, destinationFs, destination, destinationStat, sourceFs, source, sourceStat, opts);
      }
      break;

    case sourceStat.isSymbolicLink():
      {
        await copySymlink(operations, utimes, destinationFs, destination, destinationStat, sourceFs, source, sourceStat, opts);
      }
      break;

    default:
      {
        throw new Error(`Unsupported file type (${sourceStat.mode})`);
      }
      break;
  }

  operations.push(async () => destinationFs.chmodPromise(destination, sourceStat.mode & 0o777));
}

async function maybeLStat(baseFs, p) {
  try {
    return await baseFs.lstatPromise(p);
  } catch (e) {
    return null;
  }
}

async function copyFolder(operations, utimes, destinationFs, destination, destinationStat, sourceFs, source, sourceStat, opts) {
  if (destinationStat !== null && !destinationStat.isDirectory()) {
    if (opts.overwrite) {
      operations.push(async () => destinationFs.removePromise(destination));
      destinationStat = null;
    } else {
      return;
    }
  }

  if (destinationStat === null) operations.push(async () => destinationFs.mkdirPromise(destination, {
    mode: sourceStat.mode
  }));
  const entries = await sourceFs.readdirPromise(source);
  await Promise.all(entries.map(async entry => {
    await copyImpl(operations, utimes, destinationFs, destinationFs.pathUtils.join(destination, entry), sourceFs, sourceFs.pathUtils.join(source, entry), opts);
  }));
}

async function copyFile(operations, utimes, destinationFs, destination, destinationStat, sourceFs, source, sourceStat, opts) {
  if (destinationStat !== null) {
    if (opts.overwrite) {
      operations.push(async () => destinationFs.removePromise(destination));
      destinationStat = null;
    } else {
      return;
    }
  }

  if (destinationFs === sourceFs) {
    operations.push(async () => destinationFs.copyFilePromise(source, destination, fs_1.default.constants.COPYFILE_FICLONE));
  } else {
    operations.push(async () => destinationFs.writeFilePromise(destination, (await sourceFs.readFilePromise(source))));
  }
}

async function copySymlink(operations, utimes, destinationFs, destination, destinationStat, sourceFs, source, sourceStat, opts) {
  if (destinationStat !== null) {
    if (opts.overwrite) {
      operations.push(async () => destinationFs.removePromise(destination));
      destinationStat = null;
    } else {
      return;
    }
  }

  const target = await sourceFs.readlinkPromise(source);
  operations.push(async () => destinationFs.symlinkPromise(path_1.convertPath(destinationFs.pathUtils, target), destination));
}

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function makeError(code, message) {
  return Object.assign(new Error(`${code}: ${message}`), {
    code
  });
}

function EBUSY(message) {
  return makeError(`EBUSY`, message);
}

exports.EBUSY = EBUSY;

function ENOSYS(message, reason) {
  return makeError(`ENOSYS`, `${message}, ${reason}`);
}

exports.ENOSYS = ENOSYS;

function EINVAL(reason) {
  return makeError(`EINVAL`, `invalid argument, ${reason}`);
}

exports.EINVAL = EINVAL;

function EBADF(reason) {
  return makeError(`EBADF`, `bad file descriptor, ${reason}`);
}

exports.EBADF = EBADF;

function ENOENT(reason) {
  return makeError(`ENOENT`, `no such file or directory, ${reason}`);
}

exports.ENOENT = ENOENT;

function ENOTDIR(reason) {
  return makeError(`ENOTDIR`, `not a directory, ${reason}`);
}

exports.ENOTDIR = ENOTDIR;

function EISDIR(reason) {
  return makeError(`EISDIR`, `illegal operation on a directory, ${reason}`);
}

exports.EISDIR = EISDIR;

function EEXIST(reason) {
  return makeError(`EEXIST`, `file already exists, ${reason}`);
}

exports.EEXIST = EEXIST;

function EROFS(reason) {
  return makeError(`EROFS`, `read-only filesystem, ${reason}`);
}

exports.EROFS = EROFS;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const ProxiedFS_1 = __webpack_require__(4);

class AliasFS extends ProxiedFS_1.ProxiedFS {
  constructor(target, {
    baseFs,
    pathUtils
  }) {
    super(pathUtils);
    this.target = target;
    this.baseFs = baseFs;
  }

  getRealPath() {
    return this.target;
  }

  getBaseFs() {
    return this.baseFs;
  }

  mapFromBase(p) {
    return p;
  }

  mapToBase(p) {
    return p;
  }

}

exports.AliasFS = AliasFS;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const NodeFS_1 = __webpack_require__(1);

const ProxiedFS_1 = __webpack_require__(4);

const path_1 = __webpack_require__(0);

class CwdFS extends ProxiedFS_1.ProxiedFS {
  constructor(target, {
    baseFs = new NodeFS_1.NodeFS()
  } = {}) {
    super(path_1.ppath);
    this.target = target;
    this.baseFs = baseFs;
  }

  getRealPath() {
    return this.pathUtils.resolve(this.baseFs.getRealPath(), this.target);
  }

  mapFromBase(path) {
    return this.pathUtils.relative(this.getRealPath(), path);
  }

  mapToBase(path) {
    return this.pathUtils.resolve(this.getRealPath(), path);
  }

}

exports.CwdFS = CwdFS;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const NodeFS_1 = __webpack_require__(1);

const ProxiedFS_1 = __webpack_require__(4);

const path_1 = __webpack_require__(0);

const JAIL_ROOT = path_1.PortablePath.root;

class JailFS extends ProxiedFS_1.ProxiedFS {
  constructor(target, {
    baseFs = new NodeFS_1.NodeFS()
  } = {}) {
    super(path_1.ppath);
    this.target = this.pathUtils.resolve(path_1.PortablePath.root, target);
    this.baseFs = baseFs;
  }

  getRealPath() {
    return this.pathUtils.resolve(this.baseFs.getRealPath(), this.pathUtils.relative(path_1.PortablePath.root, this.target));
  }

  getTarget() {
    return this.target;
  }

  getBaseFs() {
    return this.baseFs;
  }

  mapToBase(p) {
    const normalized = this.pathUtils.normalize(p);
    if (this.pathUtils.isAbsolute(p)) return this.pathUtils.resolve(this.target, this.pathUtils.relative(JAIL_ROOT, p));
    if (normalized.match(/^\.\.\//)) throw new Error(`Resolving this path (${p}) would escape the jail`);
    return this.pathUtils.resolve(this.target, p);
  }

  mapFromBase(p) {
    return this.pathUtils.resolve(JAIL_ROOT, this.pathUtils.relative(this.target, p));
  }

}

exports.JailFS = JailFS;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const ProxiedFS_1 = __webpack_require__(4);

class LazyFS extends ProxiedFS_1.ProxiedFS {
  constructor(factory, pathUtils) {
    super(pathUtils);
    this.instance = null;
    this.factory = factory;
  }

  get baseFs() {
    if (!this.instance) this.instance = this.factory();
    return this.instance;
  }

  set baseFs(value) {
    this.instance = value;
  }

  mapFromBase(p) {
    return p;
  }

  mapToBase(p) {
    return p;
  }

}

exports.LazyFS = LazyFS;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const FakeFS_1 = __webpack_require__(3);

const path_1 = __webpack_require__(0);

const makeError = () => Object.assign(new Error(`ENOSYS: unsupported filesystem access`), {
  code: `ENOSYS`
});

class NoFS extends FakeFS_1.FakeFS {
  constructor() {
    super(path_1.ppath);
  }

  getExtractHint() {
    throw makeError();
  }

  getRealPath() {
    throw makeError();
  }

  resolve() {
    throw makeError();
  }

  async openPromise() {
    throw makeError();
  }

  openSync() {
    throw makeError();
  }

  async readPromise() {
    throw makeError();
  }

  readSync() {
    throw makeError();
  }

  async writePromise() {
    throw makeError();
  }

  writeSync() {
    throw makeError();
  }

  async closePromise() {
    throw makeError();
  }

  closeSync() {
    throw makeError();
  }

  createWriteStream() {
    throw makeError();
  }

  createReadStream() {
    throw makeError();
  }

  async realpathPromise() {
    throw makeError();
  }

  realpathSync() {
    throw makeError();
  }

  async readdirPromise() {
    throw makeError();
  }

  readdirSync() {
    throw makeError();
  }

  async existsPromise(p) {
    throw makeError();
  }

  existsSync(p) {
    throw makeError();
  }

  async accessPromise() {
    throw makeError();
  }

  accessSync() {
    throw makeError();
  }

  async statPromise() {
    throw makeError();
  }

  statSync() {
    throw makeError();
  }

  async lstatPromise(p) {
    throw makeError();
  }

  lstatSync(p) {
    throw makeError();
  }

  async chmodPromise() {
    throw makeError();
  }

  chmodSync() {
    throw makeError();
  }

  async mkdirPromise() {
    throw makeError();
  }

  mkdirSync() {
    throw makeError();
  }

  async rmdirPromise() {
    throw makeError();
  }

  rmdirSync() {
    throw makeError();
  }

  async symlinkPromise() {
    throw makeError();
  }

  symlinkSync() {
    throw makeError();
  }

  async renamePromise() {
    throw makeError();
  }

  renameSync() {
    throw makeError();
  }

  async copyFilePromise() {
    throw makeError();
  }

  copyFileSync() {
    throw makeError();
  }

  async appendFilePromise() {
    throw makeError();
  }

  appendFileSync() {
    throw makeError();
  }

  async writeFilePromise() {
    throw makeError();
  }

  writeFileSync() {
    throw makeError();
  }

  async unlinkPromise() {
    throw makeError();
  }

  unlinkSync() {
    throw makeError();
  }

  async utimesPromise() {
    throw makeError();
  }

  utimesSync() {
    throw makeError();
  }

  async readFilePromise() {
    throw makeError();
  }

  readFileSync() {
    throw makeError();
  }

  async readlinkPromise() {
    throw makeError();
  }

  readlinkSync() {
    throw makeError();
  }

  watch() {
    throw makeError();
  }

}

exports.NoFS = NoFS;
NoFS.instance = new NoFS();

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const ProxiedFS_1 = __webpack_require__(4);

const path_1 = __webpack_require__(0);

class PosixFS extends ProxiedFS_1.ProxiedFS {
  constructor(baseFs) {
    super(path_1.npath);
    this.baseFs = baseFs;
  }

  mapFromBase(path) {
    return path_1.npath.fromPortablePath(path);
  }

  mapToBase(path) {
    return path_1.npath.toPortablePath(path);
  }

}

exports.PosixFS = PosixFS;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const NodeFS_1 = __webpack_require__(1);

const ProxiedFS_1 = __webpack_require__(4);

const path_1 = __webpack_require__(0);

const NUMBER_REGEXP = /^[0-9]+$/; // $0: full path
// $1: virtual folder
// $2: virtual segment
// $3: hash
// $4: depth
// $5: subpath

const VIRTUAL_REGEXP = /^(\/(?:[^\/]+\/)*?\$\$virtual)((?:\/((?:[^\/]+-)?[a-f0-9]+)(?:\/([^\/]+))?)?((?:\/.*)?))$/;
const VALID_COMPONENT = /^([^\/]+-)?[a-f0-9]+$/;

class VirtualFS extends ProxiedFS_1.ProxiedFS {
  constructor({
    baseFs = new NodeFS_1.NodeFS()
  } = {}) {
    super(path_1.ppath);
    this.baseFs = baseFs;
  }

  static makeVirtualPath(base, component, to) {
    if (path_1.ppath.basename(base) !== `$$virtual`) throw new Error(`Assertion failed: Virtual folders must be named "$$virtual"`);
    if (!path_1.ppath.basename(component).match(VALID_COMPONENT)) throw new Error(`Assertion failed: Virtual components must be ended by an hexadecimal hash`); // Obtains the relative distance between the virtual path and its actual target

    const target = path_1.ppath.relative(path_1.ppath.dirname(base), to);
    const segments = target.split(`/`); // Counts how many levels we need to go back to start applying the rest of the path

    let depth = 0;

    while (depth < segments.length && segments[depth] === `..`) depth += 1;

    const finalSegments = segments.slice(depth);
    const fullVirtualPath = path_1.ppath.join(base, component, String(depth), ...finalSegments);
    return fullVirtualPath;
  }

  static resolveVirtual(p) {
    const match = p.match(VIRTUAL_REGEXP);
    if (!match || !match[3] && match[5]) return p;
    const target = path_1.ppath.dirname(match[1]);
    if (!match[3] || !match[4]) return target;
    const isnum = NUMBER_REGEXP.test(match[4]);
    if (!isnum) return p;
    const depth = Number(match[4]);
    const backstep = `../`.repeat(depth);
    const subpath = match[5] || `.`;
    return VirtualFS.resolveVirtual(path_1.ppath.join(target, backstep, subpath));
  }

  getExtractHint(hints) {
    return this.baseFs.getExtractHint(hints);
  }

  getRealPath() {
    return this.baseFs.getRealPath();
  }

  realpathSync(p) {
    const match = p.match(VIRTUAL_REGEXP);
    if (!match) return this.baseFs.realpathSync(p);
    if (!match[5]) return p;
    const realpath = this.baseFs.realpathSync(this.mapToBase(p));
    return VirtualFS.makeVirtualPath(match[1], match[3], realpath);
  }

  async realpathPromise(p) {
    const match = p.match(VIRTUAL_REGEXP);
    if (!match) return await this.baseFs.realpathPromise(p);
    if (!match[5]) return p;
    const realpath = await this.baseFs.realpathPromise(this.mapToBase(p));
    return VirtualFS.makeVirtualPath(match[1], match[3], realpath);
  }

  mapToBase(p) {
    return VirtualFS.resolveVirtual(p);
  }

  mapFromBase(p) {
    return p;
  }

}

exports.VirtualFS = VirtualFS;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const fs_1 = __webpack_require__(2);

const FakeFS_1 = __webpack_require__(3);

const NodeFS_1 = __webpack_require__(1);

const ZipFS_1 = __webpack_require__(8);

const path_1 = __webpack_require__(0);

const ZIP_FD = 0x80000000;

class ZipOpenFS extends FakeFS_1.BasePortableFakeFS {
  constructor({
    libzip,
    baseFs = new NodeFS_1.NodeFS(),
    filter = null,
    maxOpenFiles = Infinity,
    readOnlyArchives = false,
    useCache = true
  }) {
    super();
    this.fdMap = new Map();
    this.nextFd = 3;
    this.isZip = new Set();
    this.notZip = new Set();
    this.libzip = libzip;
    this.baseFs = baseFs;
    this.zipInstances = useCache ? new Map() : null;
    this.filter = filter;
    this.maxOpenFiles = maxOpenFiles;
    this.readOnlyArchives = readOnlyArchives;
    this.isZip = new Set();
    this.notZip = new Set();
  }

  static async openPromise(fn, opts) {
    const zipOpenFs = new ZipOpenFS(opts);

    try {
      return await fn(zipOpenFs);
    } finally {
      zipOpenFs.saveAndClose();
    }
  }

  getExtractHint(hints) {
    return this.baseFs.getExtractHint(hints);
  }

  getRealPath() {
    return this.baseFs.getRealPath();
  }

  saveAndClose() {
    if (this.zipInstances) {
      for (const [path, zipFs] of this.zipInstances.entries()) {
        zipFs.saveAndClose();
        this.zipInstances.delete(path);
      }
    }
  }

  discardAndClose() {
    if (this.zipInstances) {
      for (const [path, zipFs] of this.zipInstances.entries()) {
        zipFs.discardAndClose();
        this.zipInstances.delete(path);
      }
    }
  }

  remapFd(zipFs, fd) {
    const remappedFd = this.nextFd++ | ZIP_FD;
    this.fdMap.set(remappedFd, [zipFs, fd]);
    return remappedFd;
  }

  async openPromise(p, flags, mode) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.openPromise(p, flags, mode);
    }, async (zipFs, {
      subPath
    }) => {
      return this.remapFd(zipFs, (await zipFs.openPromise(subPath, flags, mode)));
    });
  }

  openSync(p, flags, mode) {
    return this.makeCallSync(p, () => {
      return this.baseFs.openSync(p, flags, mode);
    }, (zipFs, {
      subPath
    }) => {
      return this.remapFd(zipFs, zipFs.openSync(subPath, flags, mode));
    });
  }

  async readPromise(fd, buffer, offset, length, position) {
    if ((fd & ZIP_FD) === 0) return await this.baseFs.readPromise(fd, buffer, offset, length, position);
    const entry = this.fdMap.get(fd);
    if (typeof entry === `undefined`) throw Object.assign(new Error(`EBADF: bad file descriptor, read`), {
      code: `EBADF`
    });
    const [zipFs, realFd] = entry;
    return await zipFs.readPromise(realFd, buffer, offset, length, position);
  }

  readSync(fd, buffer, offset, length, position) {
    if ((fd & ZIP_FD) === 0) return this.baseFs.readSync(fd, buffer, offset, length, position);
    const entry = this.fdMap.get(fd);
    if (typeof entry === `undefined`) throw Object.assign(new Error(`EBADF: bad file descriptor, read`), {
      code: `EBADF`
    });
    const [zipFs, realFd] = entry;
    return zipFs.readSync(realFd, buffer, offset, length, position);
  }

  async writePromise(fd, buffer, offset, length, position) {
    if ((fd & ZIP_FD) === 0) {
      if (typeof buffer === `string`) {
        return await this.baseFs.writePromise(fd, buffer, offset);
      } else {
        return await this.baseFs.writePromise(fd, buffer, offset, length, position);
      }
    }

    const entry = this.fdMap.get(fd);
    if (typeof entry === `undefined`) throw Object.assign(new Error(`EBADF: bad file descriptor, write`), {
      code: `EBADF`
    });
    const [zipFs, realFd] = entry;

    if (typeof buffer === `string`) {
      return await zipFs.writePromise(realFd, buffer, offset);
    } else {
      return await zipFs.writePromise(realFd, buffer, offset, length, position);
    }
  }

  writeSync(fd, buffer, offset, length, position) {
    if ((fd & ZIP_FD) === 0) {
      if (typeof buffer === `string`) {
        return this.baseFs.writeSync(fd, buffer, offset);
      } else {
        return this.baseFs.writeSync(fd, buffer, offset, length, position);
      }
    }

    const entry = this.fdMap.get(fd);
    if (typeof entry === `undefined`) throw Object.assign(new Error(`EBADF: bad file descriptor, write`), {
      code: `EBADF`
    });
    const [zipFs, realFd] = entry;

    if (typeof buffer === `string`) {
      return zipFs.writeSync(realFd, buffer, offset);
    } else {
      return zipFs.writeSync(realFd, buffer, offset, length, position);
    }
  }

  async closePromise(fd) {
    if ((fd & ZIP_FD) === 0) return await this.baseFs.closePromise(fd);
    const entry = this.fdMap.get(fd);
    if (typeof entry === `undefined`) throw Object.assign(new Error(`EBADF: bad file descriptor, close`), {
      code: `EBADF`
    });
    this.fdMap.delete(fd);
    const [zipFs, realFd] = entry;
    return await zipFs.closePromise(realFd);
  }

  closeSync(fd) {
    if ((fd & ZIP_FD) === 0) return this.baseFs.closeSync(fd);
    const entry = this.fdMap.get(fd);
    if (typeof entry === `undefined`) throw Object.assign(new Error(`EBADF: bad file descriptor, close`), {
      code: `EBADF`
    });
    this.fdMap.delete(fd);
    const [zipFs, realFd] = entry;
    return zipFs.closeSync(realFd);
  }

  createReadStream(p, opts) {
    if (p === null) return this.baseFs.createReadStream(p, opts);
    return this.makeCallSync(p, () => {
      return this.baseFs.createReadStream(p, opts);
    }, (zipFs, {
      subPath
    }) => {
      return zipFs.createReadStream(subPath, opts);
    });
  }

  createWriteStream(p, opts) {
    if (p === null) return this.baseFs.createWriteStream(p, opts);
    return this.makeCallSync(p, () => {
      return this.baseFs.createWriteStream(p, opts);
    }, (zipFs, {
      subPath
    }) => {
      return zipFs.createWriteStream(subPath, opts);
    });
  }

  async realpathPromise(p) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.realpathPromise(p);
    }, async (zipFs, {
      archivePath,
      subPath
    }) => {
      return this.pathUtils.resolve((await this.baseFs.realpathPromise(archivePath)), this.pathUtils.relative(path_1.PortablePath.root, (await zipFs.realpathPromise(subPath))));
    });
  }

  realpathSync(p) {
    return this.makeCallSync(p, () => {
      return this.baseFs.realpathSync(p);
    }, (zipFs, {
      archivePath,
      subPath
    }) => {
      return this.pathUtils.resolve(this.baseFs.realpathSync(archivePath), this.pathUtils.relative(path_1.PortablePath.root, zipFs.realpathSync(subPath)));
    });
  }

  async existsPromise(p) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.existsPromise(p);
    }, async (zipFs, {
      subPath
    }) => {
      return await zipFs.existsPromise(subPath);
    });
  }

  existsSync(p) {
    return this.makeCallSync(p, () => {
      return this.baseFs.existsSync(p);
    }, (zipFs, {
      subPath
    }) => {
      return zipFs.existsSync(subPath);
    });
  }

  async accessPromise(p, mode) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.accessPromise(p, mode);
    }, async (zipFs, {
      subPath
    }) => {
      return await zipFs.accessPromise(subPath, mode);
    });
  }

  accessSync(p, mode) {
    return this.makeCallSync(p, () => {
      return this.baseFs.accessSync(p, mode);
    }, (zipFs, {
      subPath
    }) => {
      return zipFs.accessSync(subPath, mode);
    });
  }

  async statPromise(p) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.statPromise(p);
    }, async (zipFs, {
      subPath
    }) => {
      return await zipFs.statPromise(subPath);
    });
  }

  statSync(p) {
    return this.makeCallSync(p, () => {
      return this.baseFs.statSync(p);
    }, (zipFs, {
      subPath
    }) => {
      return zipFs.statSync(subPath);
    });
  }

  async lstatPromise(p) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.lstatPromise(p);
    }, async (zipFs, {
      subPath
    }) => {
      return await zipFs.lstatPromise(subPath);
    });
  }

  lstatSync(p) {
    return this.makeCallSync(p, () => {
      return this.baseFs.lstatSync(p);
    }, (zipFs, {
      subPath
    }) => {
      return zipFs.lstatSync(subPath);
    });
  }

  async chmodPromise(p, mask) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.chmodPromise(p, mask);
    }, async (zipFs, {
      subPath
    }) => {
      return await zipFs.chmodPromise(subPath, mask);
    });
  }

  chmodSync(p, mask) {
    return this.makeCallSync(p, () => {
      return this.baseFs.chmodSync(p, mask);
    }, (zipFs, {
      subPath
    }) => {
      return zipFs.chmodSync(subPath, mask);
    });
  }

  async renamePromise(oldP, newP) {
    return await this.makeCallPromise(oldP, async () => {
      return await this.makeCallPromise(newP, async () => {
        return await this.baseFs.renamePromise(oldP, newP);
      }, async () => {
        throw Object.assign(new Error(`EEXDEV: cross-device link not permitted`), {
          code: `EEXDEV`
        });
      });
    }, async (zipFsO, {
      subPath: subPathO
    }) => {
      return await this.makeCallPromise(newP, async () => {
        throw Object.assign(new Error(`EEXDEV: cross-device link not permitted`), {
          code: `EEXDEV`
        });
      }, async (zipFsN, {
        subPath: subPathN
      }) => {
        if (zipFsO !== zipFsN) {
          throw Object.assign(new Error(`EEXDEV: cross-device link not permitted`), {
            code: `EEXDEV`
          });
        } else {
          return await zipFsO.renamePromise(subPathO, subPathN);
        }
      });
    });
  }

  renameSync(oldP, newP) {
    return this.makeCallSync(oldP, () => {
      return this.makeCallSync(newP, () => {
        return this.baseFs.renameSync(oldP, newP);
      }, async () => {
        throw Object.assign(new Error(`EEXDEV: cross-device link not permitted`), {
          code: `EEXDEV`
        });
      });
    }, (zipFsO, {
      subPath: subPathO
    }) => {
      return this.makeCallSync(newP, () => {
        throw Object.assign(new Error(`EEXDEV: cross-device link not permitted`), {
          code: `EEXDEV`
        });
      }, (zipFsN, {
        subPath: subPathN
      }) => {
        if (zipFsO !== zipFsN) {
          throw Object.assign(new Error(`EEXDEV: cross-device link not permitted`), {
            code: `EEXDEV`
          });
        } else {
          return zipFsO.renameSync(subPathO, subPathN);
        }
      });
    });
  }

  async copyFilePromise(sourceP, destP, flags = 0) {
    const fallback = async (sourceFs, sourceP, destFs, destP) => {
      if ((flags & fs_1.constants.COPYFILE_FICLONE_FORCE) !== 0) throw Object.assign(new Error(`EXDEV: cross-device clone not permitted, copyfile '${sourceP}' -> ${destP}'`), {
        code: `EXDEV`
      });
      if (flags & fs_1.constants.COPYFILE_EXCL && (await this.existsPromise(sourceP))) throw Object.assign(new Error(`EEXIST: file already exists, copyfile '${sourceP}' -> '${destP}'`), {
        code: `EEXIST`
      });
      let content;

      try {
        content = await sourceFs.readFilePromise(sourceP);
      } catch (error) {
        throw Object.assign(new Error(`EINVAL: invalid argument, copyfile '${sourceP}' -> '${destP}'`), {
          code: `EINVAL`
        });
      }

      await destFs.writeFilePromise(destP, content);
    };

    return await this.makeCallPromise(sourceP, async () => {
      return await this.makeCallPromise(destP, async () => {
        return await this.baseFs.copyFilePromise(sourceP, destP, flags);
      }, async (zipFsD, {
        subPath: subPathD
      }) => {
        return await fallback(this.baseFs, sourceP, zipFsD, subPathD);
      });
    }, async (zipFsS, {
      subPath: subPathS
    }) => {
      return await this.makeCallPromise(destP, async () => {
        return await fallback(zipFsS, subPathS, this.baseFs, destP);
      }, async (zipFsD, {
        subPath: subPathD
      }) => {
        if (zipFsS !== zipFsD) {
          return await fallback(zipFsS, subPathS, zipFsD, subPathD);
        } else {
          return await zipFsS.copyFilePromise(subPathS, subPathD, flags);
        }
      });
    });
  }

  copyFileSync(sourceP, destP, flags = 0) {
    const fallback = (sourceFs, sourceP, destFs, destP) => {
      if ((flags & fs_1.constants.COPYFILE_FICLONE_FORCE) !== 0) throw Object.assign(new Error(`EXDEV: cross-device clone not permitted, copyfile '${sourceP}' -> ${destP}'`), {
        code: `EXDEV`
      });
      if (flags & fs_1.constants.COPYFILE_EXCL && this.existsSync(sourceP)) throw Object.assign(new Error(`EEXIST: file already exists, copyfile '${sourceP}' -> '${destP}'`), {
        code: `EEXIST`
      });
      let content;

      try {
        content = sourceFs.readFileSync(sourceP);
      } catch (error) {
        throw Object.assign(new Error(`EINVAL: invalid argument, copyfile '${sourceP}' -> '${destP}'`), {
          code: `EINVAL`
        });
      }

      destFs.writeFileSync(destP, content);
    };

    return this.makeCallSync(sourceP, () => {
      return this.makeCallSync(destP, () => {
        return this.baseFs.copyFileSync(sourceP, destP, flags);
      }, (zipFsD, {
        subPath: subPathD
      }) => {
        return fallback(this.baseFs, sourceP, zipFsD, subPathD);
      });
    }, (zipFsS, {
      subPath: subPathS
    }) => {
      return this.makeCallSync(destP, () => {
        return fallback(zipFsS, subPathS, this.baseFs, destP);
      }, (zipFsD, {
        subPath: subPathD
      }) => {
        if (zipFsS !== zipFsD) {
          return fallback(zipFsS, subPathS, zipFsD, subPathD);
        } else {
          return zipFsS.copyFileSync(subPathS, subPathD, flags);
        }
      });
    });
  }

  async appendFilePromise(p, content, opts) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.appendFilePromise(p, content, opts);
    }, async (zipFs, {
      subPath
    }) => {
      return await zipFs.appendFilePromise(subPath, content, opts);
    });
  }

  appendFileSync(p, content, opts) {
    return this.makeCallSync(p, () => {
      return this.baseFs.appendFileSync(p, content, opts);
    }, (zipFs, {
      subPath
    }) => {
      return zipFs.appendFileSync(subPath, content, opts);
    });
  }

  async writeFilePromise(p, content, opts) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.writeFilePromise(p, content, opts);
    }, async (zipFs, {
      subPath
    }) => {
      return await zipFs.writeFilePromise(subPath, content, opts);
    });
  }

  writeFileSync(p, content, opts) {
    return this.makeCallSync(p, () => {
      return this.baseFs.writeFileSync(p, content, opts);
    }, (zipFs, {
      subPath
    }) => {
      return zipFs.writeFileSync(subPath, content, opts);
    });
  }

  async unlinkPromise(p) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.unlinkPromise(p);
    }, async (zipFs, {
      subPath
    }) => {
      return await zipFs.unlinkPromise(subPath);
    });
  }

  unlinkSync(p) {
    return this.makeCallSync(p, () => {
      return this.baseFs.unlinkSync(p);
    }, (zipFs, {
      subPath
    }) => {
      return zipFs.unlinkSync(subPath);
    });
  }

  async utimesPromise(p, atime, mtime) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.utimesPromise(p, atime, mtime);
    }, async (zipFs, {
      subPath
    }) => {
      return await zipFs.utimesPromise(subPath, atime, mtime);
    });
  }

  utimesSync(p, atime, mtime) {
    return this.makeCallSync(p, () => {
      return this.baseFs.utimesSync(p, atime, mtime);
    }, (zipFs, {
      subPath
    }) => {
      return zipFs.utimesSync(subPath, atime, mtime);
    });
  }

  async mkdirPromise(p, opts) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.mkdirPromise(p, opts);
    }, async (zipFs, {
      subPath
    }) => {
      return await zipFs.mkdirPromise(subPath, opts);
    });
  }

  mkdirSync(p, opts) {
    return this.makeCallSync(p, () => {
      return this.baseFs.mkdirSync(p, opts);
    }, (zipFs, {
      subPath
    }) => {
      return zipFs.mkdirSync(subPath, opts);
    });
  }

  async rmdirPromise(p) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.rmdirPromise(p);
    }, async (zipFs, {
      subPath
    }) => {
      return await zipFs.rmdirPromise(subPath);
    });
  }

  rmdirSync(p) {
    return this.makeCallSync(p, () => {
      return this.baseFs.rmdirSync(p);
    }, (zipFs, {
      subPath
    }) => {
      return zipFs.rmdirSync(subPath);
    });
  }

  async symlinkPromise(target, p, type) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.symlinkPromise(target, p, type);
    }, async (zipFs, {
      subPath
    }) => {
      return await zipFs.symlinkPromise(target, subPath);
    });
  }

  symlinkSync(target, p, type) {
    return this.makeCallSync(p, () => {
      return this.baseFs.symlinkSync(target, p, type);
    }, (zipFs, {
      subPath
    }) => {
      return zipFs.symlinkSync(target, subPath);
    });
  }

  async readFilePromise(p, encoding) {
    return this.makeCallPromise(p, async () => {
      // This weird switch is required to tell TypeScript that the signatures are proper (otherwise it thinks that only the generic one is covered)
      switch (encoding) {
        case `utf8`:
          return await this.baseFs.readFilePromise(p, encoding);

        default:
          return await this.baseFs.readFilePromise(p, encoding);
      }
    }, async (zipFs, {
      subPath
    }) => {
      return await zipFs.readFilePromise(subPath, encoding);
    });
  }

  readFileSync(p, encoding) {
    return this.makeCallSync(p, () => {
      // This weird switch is required to tell TypeScript that the signatures are proper (otherwise it thinks that only the generic one is covered)
      switch (encoding) {
        case `utf8`:
          return this.baseFs.readFileSync(p, encoding);

        default:
          return this.baseFs.readFileSync(p, encoding);
      }
    }, (zipFs, {
      subPath
    }) => {
      return zipFs.readFileSync(subPath, encoding);
    });
  }

  async readdirPromise(p, {
    withFileTypes
  } = {}) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.readdirPromise(p, {
        withFileTypes: withFileTypes
      });
    }, async (zipFs, {
      subPath
    }) => {
      return await zipFs.readdirPromise(subPath, {
        withFileTypes: withFileTypes
      });
    }, {
      requireSubpath: false
    });
  }

  readdirSync(p, {
    withFileTypes
  } = {}) {
    return this.makeCallSync(p, () => {
      return this.baseFs.readdirSync(p, {
        withFileTypes: withFileTypes
      });
    }, (zipFs, {
      subPath
    }) => {
      return zipFs.readdirSync(subPath, {
        withFileTypes: withFileTypes
      });
    }, {
      requireSubpath: false
    });
  }

  async readlinkPromise(p) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.readlinkPromise(p);
    }, async (zipFs, {
      subPath
    }) => {
      return await zipFs.readlinkPromise(subPath);
    });
  }

  readlinkSync(p) {
    return this.makeCallSync(p, () => {
      return this.baseFs.readlinkSync(p);
    }, (zipFs, {
      subPath
    }) => {
      return zipFs.readlinkSync(subPath);
    });
  }

  watch(p, a, b) {
    return this.makeCallSync(p, () => {
      return this.baseFs.watch(p, // @ts-ignore
      a, b);
    }, (zipFs, {
      subPath
    }) => {
      return zipFs.watch(subPath, // @ts-ignore
      a, b);
    });
  }

  async makeCallPromise(p, discard, accept, {
    requireSubpath = true
  } = {}) {
    if (typeof p !== `string`) return await discard();
    const normalizedP = this.pathUtils.normalize(this.pathUtils.resolve(path_1.PortablePath.root, p));
    const zipInfo = this.findZip(normalizedP);
    if (!zipInfo) return await discard();
    if (requireSubpath && zipInfo.subPath === `/`) return await discard();
    return await this.getZipPromise(zipInfo.archivePath, async zipFs => await accept(zipFs, zipInfo));
  }

  makeCallSync(p, discard, accept, {
    requireSubpath = true
  } = {}) {
    if (typeof p !== `string`) return discard();
    const normalizedP = this.pathUtils.normalize(this.pathUtils.resolve(path_1.PortablePath.root, p));
    const zipInfo = this.findZip(normalizedP);
    if (!zipInfo) return discard();
    if (requireSubpath && zipInfo.subPath === `/`) return discard();
    return this.getZipSync(zipInfo.archivePath, zipFs => accept(zipFs, zipInfo));
  }

  findZip(p) {
    if (this.filter && !this.filter.test(p)) return null;
    const parts = p.split(/\//g);

    for (let t = 2; t <= parts.length; ++t) {
      const archivePath = parts.slice(0, t).join(`/`);
      if (this.notZip.has(archivePath)) continue;
      if (this.isZip.has(archivePath)) return {
        archivePath,
        subPath: this.pathUtils.resolve(path_1.PortablePath.root, parts.slice(t).join(`/`))
      };
      let realArchivePath = archivePath;
      let stat;

      while (true) {
        try {
          stat = this.baseFs.lstatSync(realArchivePath);
        } catch (error) {
          return null;
        }

        if (stat.isSymbolicLink()) {
          realArchivePath = this.pathUtils.resolve(this.pathUtils.dirname(realArchivePath), this.baseFs.readlinkSync(realArchivePath));
        } else {
          break;
        }
      }

      const isZip = stat.isFile() && this.pathUtils.extname(realArchivePath) === `.zip`;

      if (isZip) {
        this.isZip.add(archivePath);
        return {
          archivePath,
          subPath: this.pathUtils.resolve(path_1.PortablePath.root, parts.slice(t).join(`/`))
        };
      } else {
        this.notZip.add(archivePath);

        if (stat.isFile()) {
          return null;
        }
      }
    }

    return null;
  }

  limitOpenFiles(max) {
    if (this.zipInstances === null) return;
    let closeCount = this.zipInstances.size - max;

    for (const [path, zipFs] of this.zipInstances.entries()) {
      if (closeCount <= 0) break;
      zipFs.saveAndClose();
      this.zipInstances.delete(path);
      closeCount -= 1;
    }
  }

  async getZipPromise(p, accept) {
    const getZipOptions = async () => ({
      baseFs: this.baseFs,
      libzip: this.libzip,
      readOnly: this.readOnlyArchives,
      stats: await this.baseFs.statPromise(p)
    });

    if (this.zipInstances) {
      let zipFs = this.zipInstances.get(p);
      if (!zipFs) zipFs = new ZipFS_1.ZipFS(p, (await getZipOptions())); // Removing then re-adding the field allows us to easily implement
      // a basic LRU garbage collection strategy

      this.zipInstances.delete(p);
      this.zipInstances.set(p, zipFs);
      this.limitOpenFiles(this.maxOpenFiles);
      return await accept(zipFs);
    } else {
      const zipFs = new ZipFS_1.ZipFS(p, (await getZipOptions()));

      try {
        return await accept(zipFs);
      } finally {
        zipFs.saveAndClose();
      }
    }
  }

  getZipSync(p, accept) {
    const getZipOptions = () => ({
      baseFs: this.baseFs,
      libzip: this.libzip,
      readOnly: this.readOnlyArchives,
      stats: this.baseFs.statSync(p)
    });

    if (this.zipInstances) {
      let zipFs = this.zipInstances.get(p);
      if (!zipFs) zipFs = new ZipFS_1.ZipFS(p, getZipOptions()); // Removing then re-adding the field allows us to easily implement
      // a basic LRU garbage collection strategy

      this.zipInstances.delete(p);
      this.zipInstances.set(p, zipFs);
      this.limitOpenFiles(this.maxOpenFiles);
      return accept(zipFs);
    } else {
      const zipFs = new ZipFS_1.ZipFS(p, getZipOptions());

      try {
        return accept(zipFs);
      } finally {
        zipFs.saveAndClose();
      }
    }
  }

}

exports.ZipOpenFS = ZipOpenFS;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const makeInterface_1 = __webpack_require__(25);

let mod = null;

function getLibzipSync() {
  if (mod === null) mod = makeInterface_1.makeInterface(__webpack_require__(26));
  return mod;
}

exports.getLibzipSync = getLibzipSync;

async function getLibzipPromise() {
  return getLibzipSync();
}

exports.getLibzipPromise = getLibzipPromise;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const number64 = [`number`, `number`];

exports.makeInterface = libzip => ({
  // Those are getters because they can change after memory growth
  get HEAP8() {
    return libzip.HEAP8;
  },

  get HEAPU8() {
    return libzip.HEAPU8;
  },

  ZIP_CHECKCONS: 4,
  ZIP_CREATE: 1,
  ZIP_EXCL: 2,
  ZIP_TRUNCATE: 8,
  ZIP_RDONLY: 16,
  ZIP_FL_OVERWRITE: 8192,
  ZIP_OPSYS_DOS: 0x00,
  ZIP_OPSYS_AMIGA: 0x01,
  ZIP_OPSYS_OPENVMS: 0x02,
  ZIP_OPSYS_UNIX: 0x03,
  ZIP_OPSYS_VM_CMS: 0x04,
  ZIP_OPSYS_ATARI_ST: 0x05,
  ZIP_OPSYS_OS_2: 0x06,
  ZIP_OPSYS_MACINTOSH: 0x07,
  ZIP_OPSYS_Z_SYSTEM: 0x08,
  ZIP_OPSYS_CPM: 0x09,
  ZIP_OPSYS_WINDOWS_NTFS: 0x0a,
  ZIP_OPSYS_MVS: 0x0b,
  ZIP_OPSYS_VSE: 0x0c,
  ZIP_OPSYS_ACORN_RISC: 0x0d,
  ZIP_OPSYS_VFAT: 0x0e,
  ZIP_OPSYS_ALTERNATE_MVS: 0x0f,
  ZIP_OPSYS_BEOS: 0x10,
  ZIP_OPSYS_TANDEM: 0x11,
  ZIP_OPSYS_OS_400: 0x12,
  ZIP_OPSYS_OS_X: 0x13,
  ZIP_CM_DEFAULT: -1,
  ZIP_CM_STORE: 0,
  ZIP_CM_DEFLATE: 8,
  uint08S: libzip._malloc(1),
  uint16S: libzip._malloc(2),
  uint32S: libzip._malloc(4),
  uint64S: libzip._malloc(8),
  malloc: libzip._malloc,
  free: libzip._free,
  getValue: libzip.getValue,
  open: libzip.cwrap(`zip_open`, `number`, [`string`, `number`, `number`]),
  openFromSource: libzip.cwrap(`zip_open_from_source`, `number`, [`number`, `number`, `number`]),
  close: libzip.cwrap(`zip_close`, `number`, [`number`]),
  discard: libzip.cwrap(`zip_discard`, null, [`number`]),
  getError: libzip.cwrap(`zip_get_error`, `number`, [`number`]),
  getName: libzip.cwrap(`zip_get_name`, `string`, [`number`, `number`, `number`]),
  getNumEntries: libzip.cwrap(`zip_get_num_entries`, `number`, [`number`, `number`]),
  stat: libzip.cwrap(`zip_stat`, `number`, [`number`, `string`, `number`, `number`]),
  statIndex: libzip.cwrap(`zip_stat_index`, `number`, [`number`, ...number64, `number`, `number`]),
  fopen: libzip.cwrap(`zip_fopen`, `number`, [`number`, `string`, `number`]),
  fopenIndex: libzip.cwrap(`zip_fopen_index`, `number`, [`number`, ...number64, `number`]),
  fread: libzip.cwrap(`zip_fread`, `number`, [`number`, `number`, `number`, `number`]),
  fclose: libzip.cwrap(`zip_fclose`, `number`, [`number`]),
  dir: {
    add: libzip.cwrap(`zip_dir_add`, `number`, [`number`, `string`])
  },
  file: {
    add: libzip.cwrap(`zip_file_add`, `number`, [`number`, `string`, `number`, `number`]),
    getError: libzip.cwrap(`zip_file_get_error`, `number`, [`number`]),
    getExternalAttributes: libzip.cwrap(`zip_file_get_external_attributes`, `number`, [`number`, ...number64, `number`, `number`, `number`]),
    setExternalAttributes: libzip.cwrap(`zip_file_set_external_attributes`, `number`, [`number`, ...number64, `number`, `number`, `number`]),
    setMtime: libzip.cwrap(`zip_file_set_mtime`, `number`, [`number`, ...number64, `number`, `number`]),
    setCompression: libzip.cwrap(`zip_set_file_compression`, `number`, [`number`, ...number64, `number`, `number`])
  },
  error: {
    initWithCode: libzip.cwrap(`zip_error_init_with_code`, null, [`number`, `number`]),
    strerror: libzip.cwrap(`zip_error_strerror`, `string`, [`number`])
  },
  name: {
    locate: libzip.cwrap(`zip_name_locate`, `number`, [`number`, `string`, `number`])
  },
  source: {
    fromUnattachedBuffer: libzip.cwrap(`zip_source_buffer_create`, `number`, [`number`, `number`, `number`, `number`]),
    fromBuffer: libzip.cwrap(`zip_source_buffer`, `number`, [`number`, `number`, ...number64, `number`]),
    free: libzip.cwrap(`zip_source_free`, null, [`number`]),
    setMtime: libzip.cwrap(`zip_source_set_mtime`, `number`, [`number`, `number`])
  },
  struct: {
    stat: libzip.cwrap(`zipstruct_stat`, `number`, []),
    statS: libzip.cwrap(`zipstruct_statS`, `number`, []),
    statName: libzip.cwrap(`zipstruct_stat_name`, `string`, [`number`]),
    statIndex: libzip.cwrap(`zipstruct_stat_index`, `number`, [`number`]),
    statSize: libzip.cwrap(`zipstruct_stat_size`, `number`, [`number`]),
    statMtime: libzip.cwrap(`zipstruct_stat_mtime`, `number`, [`number`]),
    error: libzip.cwrap(`zipstruct_error`, `number`, []),
    errorS: libzip.cwrap(`zipstruct_errorS`, `number`, [])
  }
});

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var frozenFs = Object.assign({}, __webpack_require__(2));
var Module = typeof Module !== "undefined" ? Module : {};
var moduleOverrides = {};
var key;
for (key in Module) {
  if (Module.hasOwnProperty(key)) {
    moduleOverrides[key] = Module[key];
  }
}
var arguments_ = [];
var thisProgram = "./this.program";
var quit_ = function(status, toThrow) {
  throw toThrow;
};
var ENVIRONMENT_IS_WORKER = false;
var ENVIRONMENT_IS_NODE = true;
var ENVIRONMENT_HAS_NODE = ENVIRONMENT_IS_NODE;
var scriptDirectory = "";
function locateFile(path) {
  if (Module["locateFile"]) {
    return Module["locateFile"](path, scriptDirectory);
  }
  return scriptDirectory + path;
}
var read_, readBinary;
var nodeFS;
var nodePath;
if (ENVIRONMENT_IS_NODE) {
  scriptDirectory = __dirname + "/";
  read_ = function shell_read(filename, binary) {
    var ret;
    ret = tryParseAsDataURI(filename);
    if (ret) {
      return binary ? ret : ret.toString();
    }
    if (!nodeFS) nodeFS = frozenFs;
    if (!nodePath) nodePath = __webpack_require__(7);
    filename = nodePath["normalize"](filename);
    return nodeFS["readFileSync"](filename, binary ? null : "utf8");
  };
  readBinary = function readBinary(filename) {
    var ret = read_(filename, true);
    if (!ret.buffer) {
      ret = new Uint8Array(ret);
    }
    assert(ret.buffer);
    return ret;
  };
  if (process["argv"].length > 1) {
    thisProgram = process["argv"][1].replace(/\\/g, "/");
  }
  arguments_ = process["argv"].slice(2);
  if (true) {
    module["exports"] = Module;
  }
  (function() {})("uncaughtException", function(ex) {
    if (!(ex instanceof ExitStatus)) {
      throw ex;
    }
  });
  (function() {})("unhandledRejection", abort);
  quit_ = function(status) {
    process["exit"](status);
  };
  Module["inspect"] = function() {
    return "[Emscripten Module object]";
  };
} else {
}
var out = Module["print"] || console.log.bind(console);
var err = Module["printErr"] || console.warn.bind(console);
for (key in moduleOverrides) {
  if (moduleOverrides.hasOwnProperty(key)) {
    Module[key] = moduleOverrides[key];
  }
}
moduleOverrides = null;
if (Module["arguments"]) arguments_ = Module["arguments"];
if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
if (Module["quit"]) quit_ = Module["quit"];
function dynamicAlloc(size) {
  var ret = HEAP32[DYNAMICTOP_PTR >> 2];
  var end = (ret + size + 15) & -16;
  if (end > _emscripten_get_heap_size()) {
    abort();
  }
  HEAP32[DYNAMICTOP_PTR >> 2] = end;
  return ret;
}
function getNativeTypeSize(type) {
  switch (type) {
    case "i1":
    case "i8":
      return 1;
    case "i16":
      return 2;
    case "i32":
      return 4;
    case "i64":
      return 8;
    case "float":
      return 4;
    case "double":
      return 8;
    default: {
      if (type[type.length - 1] === "*") {
        return 4;
      } else if (type[0] === "i") {
        var bits = parseInt(type.substr(1));
        assert(
          bits % 8 === 0,
          "getNativeTypeSize invalid bits " + bits + ", type " + type
        );
        return bits / 8;
      } else {
        return 0;
      }
    }
  }
}
var tempRet0 = 0;
var setTempRet0 = function(value) {
  tempRet0 = value;
};
var wasmBinary;
if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
var noExitRuntime;
if (Module["noExitRuntime"]) noExitRuntime = Module["noExitRuntime"];
if (typeof WebAssembly !== "object") {
  err("no native wasm support detected");
}
function setValue(ptr, value, type, noSafe) {
  type = type || "i8";
  if (type.charAt(type.length - 1) === "*") type = "i32";
  switch (type) {
    case "i1":
      HEAP8[ptr >> 0] = value;
      break;
    case "i8":
      HEAP8[ptr >> 0] = value;
      break;
    case "i16":
      HEAP16[ptr >> 1] = value;
      break;
    case "i32":
      HEAP32[ptr >> 2] = value;
      break;
    case "i64":
      (tempI64 = [
        value >>> 0,
        ((tempDouble = value),
        +Math_abs(tempDouble) >= 1
          ? tempDouble > 0
            ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) |
                0) >>>
              0
            : ~~+Math_ceil(
                (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
              ) >>> 0
          : 0)
      ]),
        (HEAP32[ptr >> 2] = tempI64[0]),
        (HEAP32[(ptr + 4) >> 2] = tempI64[1]);
      break;
    case "float":
      HEAPF32[ptr >> 2] = value;
      break;
    case "double":
      HEAPF64[ptr >> 3] = value;
      break;
    default:
      abort("invalid type for setValue: " + type);
  }
}
function getValue(ptr, type, noSafe) {
  type = type || "i8";
  if (type.charAt(type.length - 1) === "*") type = "i32";
  switch (type) {
    case "i1":
      return HEAP8[ptr >> 0];
    case "i8":
      return HEAP8[ptr >> 0];
    case "i16":
      return HEAP16[ptr >> 1];
    case "i32":
      return HEAP32[ptr >> 2];
    case "i64":
      return HEAP32[ptr >> 2];
    case "float":
      return HEAPF32[ptr >> 2];
    case "double":
      return HEAPF64[ptr >> 3];
    default:
      abort("invalid type for getValue: " + type);
  }
  return null;
}
var wasmMemory;
var wasmTable = new WebAssembly.Table({
  initial: 31,
  maximum: 31 + 0,
  element: "anyfunc"
});
var ABORT = false;
var EXITSTATUS = 0;
function assert(condition, text) {
  if (!condition) {
    abort("Assertion failed: " + text);
  }
}
function getCFunc(ident) {
  var func = Module["_" + ident];
  assert(
    func,
    "Cannot call unknown function " + ident + ", make sure it is exported"
  );
  return func;
}
function ccall(ident, returnType, argTypes, args, opts) {
  var toC = {
    string: function(str) {
      var ret = 0;
      if (str !== null && str !== undefined && str !== 0) {
        var len = (str.length << 2) + 1;
        ret = stackAlloc(len);
        stringToUTF8(str, ret, len);
      }
      return ret;
    },
    array: function(arr) {
      var ret = stackAlloc(arr.length);
      writeArrayToMemory(arr, ret);
      return ret;
    }
  };
  function convertReturnValue(ret) {
    if (returnType === "string") return UTF8ToString(ret);
    if (returnType === "boolean") return Boolean(ret);
    return ret;
  }
  var func = getCFunc(ident);
  var cArgs = [];
  var stack = 0;
  if (args) {
    for (var i = 0; i < args.length; i++) {
      var converter = toC[argTypes[i]];
      if (converter) {
        if (stack === 0) stack = stackSave();
        cArgs[i] = converter(args[i]);
      } else {
        cArgs[i] = args[i];
      }
    }
  }
  var ret = func.apply(null, cArgs);
  ret = convertReturnValue(ret);
  if (stack !== 0) stackRestore(stack);
  return ret;
}
function cwrap(ident, returnType, argTypes, opts) {
  argTypes = argTypes || [];
  var numericArgs = argTypes.every(function(type) {
    return type === "number";
  });
  var numericRet = returnType !== "string";
  if (numericRet && numericArgs && !opts) {
    return getCFunc(ident);
  }
  return function() {
    return ccall(ident, returnType, argTypes, arguments, opts);
  };
}
var ALLOC_NORMAL = 0;
var ALLOC_NONE = 3;
function allocate(slab, types, allocator, ptr) {
  var zeroinit, size;
  if (typeof slab === "number") {
    zeroinit = true;
    size = slab;
  } else {
    zeroinit = false;
    size = slab.length;
  }
  var singleType = typeof types === "string" ? types : null;
  var ret;
  if (allocator == ALLOC_NONE) {
    ret = ptr;
  } else {
    ret = [_malloc, stackAlloc, dynamicAlloc][allocator](
      Math.max(size, singleType ? 1 : types.length)
    );
  }
  if (zeroinit) {
    var stop;
    ptr = ret;
    assert((ret & 3) == 0);
    stop = ret + (size & ~3);
    for (; ptr < stop; ptr += 4) {
      HEAP32[ptr >> 2] = 0;
    }
    stop = ret + size;
    while (ptr < stop) {
      HEAP8[ptr++ >> 0] = 0;
    }
    return ret;
  }
  if (singleType === "i8") {
    if (slab.subarray || slab.slice) {
      HEAPU8.set(slab, ret);
    } else {
      HEAPU8.set(new Uint8Array(slab), ret);
    }
    return ret;
  }
  var i = 0,
    type,
    typeSize,
    previousType;
  while (i < size) {
    var curr = slab[i];
    type = singleType || types[i];
    if (type === 0) {
      i++;
      continue;
    }
    if (type == "i64") type = "i32";
    setValue(ret + i, curr, type);
    if (previousType !== type) {
      typeSize = getNativeTypeSize(type);
      previousType = type;
    }
    i += typeSize;
  }
  return ret;
}
var UTF8Decoder =
  typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : undefined;
function UTF8ArrayToString(u8Array, idx, maxBytesToRead) {
  var endIdx = idx + maxBytesToRead;
  var endPtr = idx;
  while (u8Array[endPtr] && !(endPtr >= endIdx)) ++endPtr;
  if (endPtr - idx > 16 && u8Array.subarray && UTF8Decoder) {
    return UTF8Decoder.decode(u8Array.subarray(idx, endPtr));
  } else {
    var str = "";
    while (idx < endPtr) {
      var u0 = u8Array[idx++];
      if (!(u0 & 128)) {
        str += String.fromCharCode(u0);
        continue;
      }
      var u1 = u8Array[idx++] & 63;
      if ((u0 & 224) == 192) {
        str += String.fromCharCode(((u0 & 31) << 6) | u1);
        continue;
      }
      var u2 = u8Array[idx++] & 63;
      if ((u0 & 240) == 224) {
        u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
      } else {
        u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (u8Array[idx++] & 63);
      }
      if (u0 < 65536) {
        str += String.fromCharCode(u0);
      } else {
        var ch = u0 - 65536;
        str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023));
      }
    }
  }
  return str;
}
function UTF8ToString(ptr, maxBytesToRead) {
  return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
}
function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite) {
  if (!(maxBytesToWrite > 0)) return 0;
  var startIdx = outIdx;
  var endIdx = outIdx + maxBytesToWrite - 1;
  for (var i = 0; i < str.length; ++i) {
    var u = str.charCodeAt(i);
    if (u >= 55296 && u <= 57343) {
      var u1 = str.charCodeAt(++i);
      u = (65536 + ((u & 1023) << 10)) | (u1 & 1023);
    }
    if (u <= 127) {
      if (outIdx >= endIdx) break;
      outU8Array[outIdx++] = u;
    } else if (u <= 2047) {
      if (outIdx + 1 >= endIdx) break;
      outU8Array[outIdx++] = 192 | (u >> 6);
      outU8Array[outIdx++] = 128 | (u & 63);
    } else if (u <= 65535) {
      if (outIdx + 2 >= endIdx) break;
      outU8Array[outIdx++] = 224 | (u >> 12);
      outU8Array[outIdx++] = 128 | ((u >> 6) & 63);
      outU8Array[outIdx++] = 128 | (u & 63);
    } else {
      if (outIdx + 3 >= endIdx) break;
      outU8Array[outIdx++] = 240 | (u >> 18);
      outU8Array[outIdx++] = 128 | ((u >> 12) & 63);
      outU8Array[outIdx++] = 128 | ((u >> 6) & 63);
      outU8Array[outIdx++] = 128 | (u & 63);
    }
  }
  outU8Array[outIdx] = 0;
  return outIdx - startIdx;
}
function stringToUTF8(str, outPtr, maxBytesToWrite) {
  return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
}
function lengthBytesUTF8(str) {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    var u = str.charCodeAt(i);
    if (u >= 55296 && u <= 57343)
      u = (65536 + ((u & 1023) << 10)) | (str.charCodeAt(++i) & 1023);
    if (u <= 127) ++len;
    else if (u <= 2047) len += 2;
    else if (u <= 65535) len += 3;
    else len += 4;
  }
  return len;
}
var UTF16Decoder =
  typeof TextDecoder !== "undefined" ? new TextDecoder("utf-16le") : undefined;
function writeArrayToMemory(array, buffer) {
  HEAP8.set(array, buffer);
}
var WASM_PAGE_SIZE = 65536;
function alignUp(x, multiple) {
  if (x % multiple > 0) {
    x += multiple - (x % multiple);
  }
  return x;
}
var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
function updateGlobalBufferAndViews(buf) {
  buffer = buf;
  Module["HEAP8"] = HEAP8 = new Int8Array(buf);
  Module["HEAP16"] = HEAP16 = new Int16Array(buf);
  Module["HEAP32"] = HEAP32 = new Int32Array(buf);
  Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
  Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
  Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
  Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
  Module["HEAPF64"] = HEAPF64 = new Float64Array(buf);
}
var DYNAMIC_BASE = 5263680,
  DYNAMICTOP_PTR = 20640;
var INITIAL_TOTAL_MEMORY = Module["TOTAL_MEMORY"] || 16777216;
if (Module["wasmMemory"]) {
  wasmMemory = Module["wasmMemory"];
} else {
  wasmMemory = new WebAssembly.Memory({
    initial: INITIAL_TOTAL_MEMORY / WASM_PAGE_SIZE
  });
}
if (wasmMemory) {
  buffer = wasmMemory.buffer;
}
INITIAL_TOTAL_MEMORY = buffer.byteLength;
updateGlobalBufferAndViews(buffer);
HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE;
function callRuntimeCallbacks(callbacks) {
  while (callbacks.length > 0) {
    var callback = callbacks.shift();
    if (typeof callback == "function") {
      callback();
      continue;
    }
    var func = callback.func;
    if (typeof func === "number") {
      if (callback.arg === undefined) {
        Module["dynCall_v"](func);
      } else {
        Module["dynCall_vi"](func, callback.arg);
      }
    } else {
      func(callback.arg === undefined ? null : callback.arg);
    }
  }
}
var __ATPRERUN__ = [];
var __ATINIT__ = [];
var __ATMAIN__ = [];
var __ATPOSTRUN__ = [];
var runtimeInitialized = false;
function preRun() {
  if (Module["preRun"]) {
    if (typeof Module["preRun"] == "function")
      Module["preRun"] = [Module["preRun"]];
    while (Module["preRun"].length) {
      addOnPreRun(Module["preRun"].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}
function initRuntime() {
  runtimeInitialized = true;
  if (!Module["noFSInit"] && !FS.init.initialized) FS.init();
  TTY.init();
  callRuntimeCallbacks(__ATINIT__);
}
function preMain() {
  FS.ignorePermissions = false;
  callRuntimeCallbacks(__ATMAIN__);
}
function postRun() {
  if (Module["postRun"]) {
    if (typeof Module["postRun"] == "function")
      Module["postRun"] = [Module["postRun"]];
    while (Module["postRun"].length) {
      addOnPostRun(Module["postRun"].shift());
    }
  }
  callRuntimeCallbacks(__ATPOSTRUN__);
}
function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}
function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}
var Math_abs = Math.abs;
var Math_ceil = Math.ceil;
var Math_floor = Math.floor;
var Math_min = Math.min;
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null;
function getUniqueRunDependency(id) {
  return id;
}
function addRunDependency(id) {
  runDependencies++;
  if (Module["monitorRunDependencies"]) {
    Module["monitorRunDependencies"](runDependencies);
  }
}
function removeRunDependency(id) {
  runDependencies--;
  if (Module["monitorRunDependencies"]) {
    Module["monitorRunDependencies"](runDependencies);
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback();
    }
  }
}
Module["preloadedImages"] = {};
Module["preloadedAudios"] = {};
function abort(what) {
  if (Module["onAbort"]) {
    Module["onAbort"](what);
  }
  what += "";
  out(what);
  err(what);
  ABORT = true;
  EXITSTATUS = 1;
  what = "abort(" + what + "). Build with -s ASSERTIONS=1 for more info.";
  throw new WebAssembly.RuntimeError(what);
}
var dataURIPrefix = "data:application/octet-stream;base64,";
function isDataURI(filename) {
  return String.prototype.startsWith
    ? filename.startsWith(dataURIPrefix)
    : filename.indexOf(dataURIPrefix) === 0;
}
var wasmBinaryFile =
  "data:application/octet-stream;base64,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EDcaCyABKAIMKAIkQQFGBEAgASgCDBBmCwJAIAEoAgwoAixFDQAgASgCDC0AKEEBcQ0AIAEoAgwoAiwgASgCDBD8AgsgASgCDEEAQgBBBRAkGiABKAIMKAIABEAgASgCDCgCABAeCyABKAIMEBgLIAFBEGokAAuBAgEBfyMAQRBrIgEkACABIAA2AgwgASABKAIMKAIcNgIEIAEoAgQQ4gIgASABKAIEKAIUNgIIIAEoAgggASgCDCgCEEsEQCABIAEoAgwoAhA2AggLAkAgASgCCEUNACABKAIMKAIMIAEoAgQoAhAgASgCCBAcGiABKAIMIgAgASgCCCAAKAIMajYCDCABKAIEIgAgASgCCCAAKAIQajYCECABKAIMIgAgASgCCCAAKAIUajYCFCABKAIMIgAgACgCECABKAIIazYCECABKAIEIgAgACgCFCABKAIIazYCFCABKAIEKAIUDQAgASgCBCABKAIEKAIINgIQCyABQRBqJAALYAEBfyMAQRBrIgEkACABIAA2AgggASABKAIIQgIQITYCBAJAIAEoAgRFBEAgAUEAOwEODAELIAEgASgCBC0AACABKAIELQABQQh0ajsBDgsgAS8BDiEAIAFBEGokACAAC1oBAX8jAEEgayICJAAgAiAANgIcIAIgATcDECACIAIoAhwgAikDEBDLATYCDCACKAIMBEAgAigCHCIAIAIpAxAgACkDEHw3AxALIAIoAgwhACACQSBqJAAgAAtvAQF/IwBBEGsiAiQAIAIgADYCCCACIAE7AQYgAiACKAIIQgIQITYCAAJAIAIoAgBFBEAgAkF/NgIMDAELIAIoAgAgAi8BBjoAACACKAIAIAIvAQZBCHU6AAEgAkEANgIMCyACKAIMGiACQRBqJAALjwEBAX8jAEEQayICJAAgAiAANgIIIAIgATYCBCACIAIoAghCBBAhNgIAAkAgAigCAEUEQCACQX82AgwMAQsgAigCACACKAIEOgAAIAIoAgAgAigCBEEIdjoAASACKAIAIAIoAgRBEHY6AAIgAigCACACKAIEQRh2OgADIAJBADYCDAsgAigCDBogAkEQaiQAC7YCAQF/IwBBMGsiBCQAIAQgADYCJCAEIAE2AiAgBCACNwMYIAQgAzYCFAJAIAQoAiQpAxhCASAEKAIUrYaDUARAIAQoAiRBDGpBHEEA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Qf/9+3dqcUGAgYKEeHFFDQALIANB/wFxRQRAIAIhAQwBCwNAIAItAAEhAyACQQFqIgEhAiADDQALCyABIABrC4sDAQF/IwBBMGsiAyQAIAMgADYCJCADIAE2AiAgAyACNwMYAkAgAygCJC0AKEEBcQRAIANCfzcDKAwBCwJAAkAgAygCJCgCIEEATQ0AIAMpAxhC////////////AFYNACADKQMYQgBYDQEgAygCIA0BCyADKAIkQQxqQRJBABAXIANCfzcDKAwBCyADKAIkLQA1QQFxBEAgA0J/NwMoDAELAn8jAEEQayIAIAMoAiQ2AgwgACgCDC0ANEEBcQsEQCADQgA3AygMAQsgAykDGFAEQCADQgA3AygMAQsgA0IANwMQA0AgAykDECADKQMYVARAIAMgAygCJCADKAIgIAMpAxCnaiADKQMYIAMpAxB9QQEQJCICNwMIIAJCAFMEQCADKAIkQQE6ADUgAykDEFAEQCADQn83AygMBAsgAyADKQMQNwMoDAMLIAMpAwhQBEAgAygCJEEBOgA0BSADIAMpAwggAykDEHw3AxAMAgsLCyADIAMpAxA3AygLIAMpAyghAiADQTBqJAAgAgs2AQF/IwBBEGsiASAANgIMAn4gASgCDC0AAEEBcQRAIAEoAgwpAwggASgCDCkDEH0MAQtCAAsLsgECAX8BfiMAQRBrIgEkACABIAA2AgQgASABKAIEQggQITYCAAJAIAEoAgBFBEAgAUIANwMIDAELIAEgASgCAC0AAK0gASgCAC0AB61COIYgASgCAC0ABq1CMIZ8IAEoAgAtAAWtQiiGfCABKAIALQAErUIghnwgASgCAC0AA61CGIZ8IAEoAgAtAAKtQhCGfCABKAIALQABrUIIhnx8NwMICyABKQMIIQIgAUEQaiQAIAIL8QICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgA2AgAgAyACIARrQXxxIgJqIgFBfGogADYCACACQQlJDQAgAyAANgIIIAMgADYCBCABQXhqIAA2AgAgAUF0aiAANgIAIAJBGUkNACADIAA2AhggAyAANgIUIAMgADYCECADIAA2AgwgAUFwaiAANgIAIAFBbGogADYCACABQWhqIAA2AgAgAUFkaiAANgIAIAIgA0EEcUEYciIBayICQSBJDQAgAK0iBUIghiAFhCEFIAEgA2ohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCwvcAQEBfyMAQRBrIgEkACABIAA2AgwgASgCDARAIAEoAgwoAigEQCABKAIMKAIoQQA2AiggASgCDCgCKEIANwMgIAEoAgwCfiABKAIMKQMYIAEoAgwpAyBWBEAgASgCDCkDGAwBCyABKAIMKQMgCzcDGAsgASABKAIMKQMYNwMAA0AgASkDACABKAIMKQMIWkUEQCABKAIMKAIAIAEpAwCnQQR0aigCABAYIAEgASkDAEIBfDcDAAwBCwsgASgCDCgCABAYIAEoAgwoAgQQGCABKAIMEBgLIAFBEGokAAtrAQF/IwBBIGsiAiAANgIcIAJCASACKAIcrYY3AxAgAkEMaiABNgIAA0AgAiACKAIMIgBBBGo2AgwgAiAAKAIANgIIIAIoAghBAEhFBEAgAiACKQMQQgEgAigCCK2GhDcDEAwBCwsgAikDEAuoAQEBfyMAQRBrIgEkACABIAA2AggCQCABKAIIKAIgQQBNBEAgASgCCEEMakESQQAQFyABQX82AgwMAQsgASgCCCIAIAAoAiBBf2o2AiAgASgCCCgCIEUEQCABKAIIQQBCAEECECQaIAEoAggoAgAEQCABKAIIKAIAEDdBAEgEQCABKAIIQQxqQRRBABAXCwsLIAFBADYCDAsgASgCDCEAIAFBEGokACAACy8BAX8jAEEQayIBJAAgASAANgIMIAEoAgwoAggQGCABKAIMQQA2AgggAUEQaiQAC80BAQF/IwBBEGsiAiQAIAIgADYCCCACIAE2AgQCQCACKAIILQAoQQFxBEAgAkF/NgIMDAELIAIoAgRFBEAgAigCCEEMakESQQAQFyACQX82AgwMAQsgAigCBBA+IAIoAggoAgAEQCACKAIIKAIAIAIoAgQQOUEASARAIAIoAghBDGogAigCCCgCABAaIAJBfzYCDAwCCwsgAigCCCACKAIEQjhBAxAkQgBTBEAgAkF/NgIMDAELIAJB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ASgCHCgCbGs2AhQgASgCHCgCbCABKAIQIAEoAhwoAixBhgJrak8EQCABKAIcKAI4IAEoAhwoAjggASgCEGogASgCECABKAIUaxAcGiABKAIcIgAgACgCcCABKAIQazYCcCABKAIcIgAgACgCbCABKAIQazYCbCABKAIcIgAgACgCXCABKAIQazYCXCABKAIcENMCIAEgASgCECABKAIUajYCFAsgASgCHCgCACgCBARAIAEgASgCHCgCACABKAIcKAJ0IAEoAhwoAjggASgCHCgCbGpqIAEoAhQQdTYCGCABKAIcIgAgASgCGCAAKAJ0ajYCdCABKAIcKAJ0IAEoAhwoArQtakEDTwRAIAEgASgCHCgCbCABKAIcKAK0LWs2AgwgASgCHCABKAIcKAI4IAEoAgxqLQAANgJIIAEoAhwgASgCHCgCVCABKAIcKAI4IAEoAgxBAWpqLQAAIAEoAhwoAkggASgCHCgCWHRzcTYCSANAIAEoAhwoArQtBEAgASgCHCABKAIcKAJUIAEoAhwoAjggASgCDEECamotAAAgASgCHCgCSCABKAIcKAJYdHNxNgJIIAEoAhwoAkAgASgCDCABKAIcKAI0cUEBdGogASgCHCgCRCABKAIcKAJIQQF0ai8BADsBACABKAIcKAJEIAEoAhwoAkhBAXRqIAEoAgw7AQAgASABKAIMQQFqNgIMIAEoAhwiACAAKAK0LUF/ajYCtC0gASgCHCgCdCABKAIcKAK0LWpBA08NAQsLC0EAIQAgASgCHCgCdEGGAkkEfyABKAIcKAIAKAIEQQBHBUEAC0EBcQ0BCwsgASgCHCgCwC0gASgCHCgCPEkEQCABIAEoAhwoAmwgASgCHCgCdGo2AggCQCABKAIcKALALSABKAIISQRAIAEgASgCHCgCPCABKAIIazYCBCABKAIEQYICSwRAIAFBggI2AgQLIAEoAhwoAjggASgCCGpBACABKAIEEDQgASgCHCABKAIIIAEoAgRqNgLALQwBCyABKAIcKALALSABKAIIQYICakkEQCABIAEoAghBggJqIAEoAhwoAsAtazYCBCABKAIEIAEoAhwoAjwgASgCHCgCwC1rSwRAIAEgASgCHCgCPCABKAIcKALALWs2AgQLIAEoAhwoAjggASgCHCgCwC1qQQAgASgCBBA0IAEoAhwiACABKAIE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AygCSDYCkAELCwJAIAMoAqQBLwFSRQRAIAMoAqQBIgAgAC8BDEH+/wNxOwEMDAELIAMoAqQBIgAgAC8BDEEBcjsBDAsgAyADKAKkASADKAKgARCCAUEBcToAhgEgAyADKAKgAUGACnFBgApHBH8gAy0AhgEFQQELQQFxOgCHASADAn9BASADKAKkAS8BUkGBAkYNABpBASADKAKkAS8BUkGCAkYNABogAygCpAEvAVJBgwJGC0EBcToAhQEgAy0AhwFBAXEEQCADIANBIGpCHBArNgIcIAMoAhxFBEAgAygCqAFBCGpBDkEAEBcgAygCkAEQJiADQX82AqwBDAILAkAgAygCoAFBgAJxBEACQCADKAKgAUGACHENACADKAKkASkDIEL/////D1YNACADKAKkASkDKEL/////D1gNAgsgAygCHCADKAKkASkDKBAvIAMoAhwgAygCpAEpAyAQLwwBCwJAAkAgAygCoAFBgAhxDQAgAygCpAEpAyBC/////w9WDQAgAygCpAEpAyhC/////w9WDQAgAygCpAEpA0hC/////w9YDQELIAMoAqQBKQMoQv////8PWgRAIAMoAhwgAygCpAEpAygQLwsgAygCpAEpAyBC/////w9aBEAgAygCHCADKAKkASkDIBAvCyADKAKkASkDSEL/////D1oEQCADKAIcIAMoAqQBKQNIEC8LCwsCfyMAQRBrIgAgAygCHDYCDCAAKAIMLQAAQQFxRQsEQCADKAKoAUEIakEUQQAQFyADKAIcEBkgAygCkAEQJiADQX82AqwBDAILIANBAQJ/IwBBEGsiACADKAIcNgIMAn4gACgCDC0AAEEBcQRAIAAoAgwpAxAMAQtCAAunQf//A3ELIANBIGpBgAYQXjYCjAEgAygCHBAZIAMoAowBIAMoApABNgIAIAMgAygCjAE2ApABCyADLQCFAUEBcQRAIAMgA0EVakIHECs2AhAgAygCEEUEQCADKAKoAUEIakEOQQAQFyADKAKQARAmIANBfzYCrAEMAgsgAygCEEECECIgAygCEEHv1wBBAhBCIAMoAhAgAygCpAEvAVJB/wFxEIUBIAMoAhAgAygCpAEoAhBB//8DcRAiAn8jAEEQayIAIAMoAhA2AgwgACgCDC0AAEEBcUULBEAgAygCqAFBCGpBFEEAEBcgAygCEBAZIAMoApABECYgA0F/NgKsAQwCCyADQYGyAkEHIANBFWpBgAYQXjYCDCADKAIQEBkgAygCDCADKAKQATYCACADIAMoAgw2ApABCyADIANB0ABqQi4QKyIANgJMIABFBEAgAygCqAFBCGpBDkEAEBcgAygCkAEQJiADQX82AqwBDAELIAMoAkxB5dcAQerXACADKAKgAUGAAnEbQQQQQiADKAKgAUGAAnFFBEAgAygCTAJ/QS0gAy0AhgFBAXENABogAygCpAEvAQgLQf//A3EQIgsgAygCTAJ/QS0gAy0AhgFBAXENABogAygCpAEvAQoLQf//A3EQIiADKAJMIAMoAqQBLwEMECICQCADLQCFAUEBcQRAIAMoAkxB4wAQIgwBCyADKAJMIAMoAqQBKAIQQf//A3EQIgsgAygCpAEoAhQgA0GeAWogA0GcAWoQvAEgAygCTCADLwGeARAiIAMoAkwgAy8BnAEQIgJAAkAgAy0AhQFBAXFFDQAgAygCpAEpAyhCFFoNACADKAJMQQAQIwwBCyADKAJMIAMoAqQBKAIYECMLAkACQCADKAKgAUGAAnFBgAJHDQAgAygCpAEpAyBC/////w9UBEAgAygCpAEpAyhC/////w9UDQELIAMoAkxBfxAjIAMoAkxBfxAjDAELAkAgAygCpAEpAyBC/////w9UBEAgAygCTCADKAKkASkDIKcQIwwBCyADKAJMQX8QIwsCQCADKAKkASkDKEL/////D1QEQCADKAJMIAMoAqQBKQMopxAjDAELIAMoAkxBfxAjCwsgAygCTCADKAKkASgCMBBgQf//A3EQIiADIAMoAqQBKAI0IAMoAqABEMEBQf//A3EgAygCkAFBgAYQwQFB//8DcWo2AogBIAMoAkwgAygCiAFB//8DcRAiIAMoAqABQYACcUUEQCADKAJMIAMoAqQBKAI4EGBB//8DcRAiIAMoAkwgAygCpAEoAjxB//8DcRAiIAMoAkwgAygCpAEvAUAQIiADKAJMIAMoAqQBKAJEECMCQCADKAKkASkDSEL/////D1QEQCADKAJMIAMoAqQBKQNIpxAjDAELIAMoAkxBfxAjCwsCfyMAQRBrIgAgAygCTDYCDCAAKAIMLQAAQQFxRQsEQCADKAKoAUEIakEUQQAQFyADKAJMEBkgAygCkAEQJiADQX82AqwBDAELIAMo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DAMFIAMoAoABKAIAIAMpA3CnQQR0aigCACgCNCADKAI0EMQBIQAgAygCgAEoAgAgAykDcKdBBHRqKAIAIAA2AjQgAygCgAEoAgAgAykDcKdBBHRqKAIAQQE6AAQgA0EANgI0IAMQWyADIAMpA3BCAXw3A3AMAgsACwsgAwJ+IAMpA2AgAykDaH1C////////////AFQEQCADKQNgIAMpA2h9DAELQv///////////wALNwOIAQsgAykDiAEhBCADQZABaiQAIAQLpgEBAX8jAEEgayIDJAAgAyAANgIYIAMgATYCFCADIAI2AhAgAyADKAIQEPsBIgA2AgwCQCAARQRAIANBADYCHAwBCyADKAIMIAMoAhg2AgAgAygCDCADKAIUNgIEIAMoAhRBEHEEQCADKAIMIgAgACgCFEECcjYCFCADKAIMIgAgACgCGEECcjYCGAsgAyADKAIMNgIcCyADKAIcIQAgA0EgaiQAIAAL1QEBAX8jAEEgayIEJAAgBCAANgIYIAQgATcDECAEIAI2AgwgBCADNgIIAkACQCAEKQMQQv///////////wBXBEAgBCkDEEKAgICAgICAgIB/WQ0BCyAEKAIIQQRBPRAXIARBfzYCHAwBCwJ/IAQpAxAhASAEKAIMIQAgBCgCGCICKAJMQX9MBEAgAiABIAAQkwEMAQsgAiABIAAQkwELQQBIBEAgBCgCCEEEQbScASgCABAXIARBfzYCHAwBCyAEQQA2AhwLIAQoAhwhACAEQSBqJAAgAAsnAAJ/QQBBACAAEAYiACAAQRtGGyIARQ0AGkG0nAEgADYCAEEACxoLagEBfyMAQRBrIgMkACADIAFBwICAAnEEfyADIAJBBGo2AgwgAigCAAVBAAs2AgggAyAANgIAIAMgAUGAgAJyNgIEQQUgAxARIgBBgWBPBEBBtJwBQQAgAGs2AgBBfyEACyADQRBqJAAgAAtXAQJ/IwBBIGsiASQAIAEgADYCEEEKIAFBEGoQEyICQWFGBH8gASAANgIAQSggARASBSACCyIAQYFgTwRAQbScAUEAIABrNgIAQX8hAAsgAUEgaiQAIAALaQECfwJAIAAoAhQgACgCHE0NACAAQQBBACAAKAIkEQAAGiAAKAIUDQBBfw8LIAAoAgQiASAAKAIIIgJJBEAgACABIAJrrEEBIAAoAigRCgAa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GEECdGovAQAEQCACIAIoAhgiATYCECACKAIsQdwWaiEDIAIoAiwiBCgC0ChBAWohACAEIAA2AtAoIABBAnQgA2ogATYCACACKAIYIAIoAixB2ChqakEAOgAADAELIAIoAiQgAigCGEECdGpBADsBAgsgAiACKAIYQQFqNgIYDAELCwNAIAIoAiwoAtAoQQJIBEACQCACKAIQQQJIBEAgAiACKAIQQQFqIgA2AhAMAQtBACEACyACKAIsQdwWaiEDIAIoAiwiBCgC0ChBAWohASAEIAE2AtAoIAFBAnQgA2ogADYCACACIAA2AgwgAigCJCACKAIMQQJ0akEBOwEAIAIoAgwgAigCLEHYKGpqQQA6AAAgAigCLCIAIAAoAqgtQX9qNgKoLSACKAIgBEAgAigCLCIAIAAoAqwtIAIoAiAgAigCDEECdGovAQJrNgKsLQsMAQsLIAIoAiggAigCEDYCBCACIAIoAiwoAtAoQQJtNgIYA0AgAigCGEEBSEUEQCACKAIsIAIoAiQgAigCGBB4IAIgAigCGEF/ajYCGAwBCwsgAiACKAIcNgIMA0AgAiACKAIsKALgFjYCGCACKAIsQdwWaiEBIAIoAiwiAygC0CghACADIABBf2o2AtAoIAIoAiwgAEECdCABaigCADYC4BYgAigCLCACKAIkQQEQeCACIAIoAiwoAuAWNgIUIAIoAhghASACKAIsQdwWaiEDIAIoAiwiBCgC1ChBf2ohACAEIAA2AtQoIABBAnQgA2ogATYCACACKAIUIQEgAigCLEHcFmohAyACKAIsIgQoAtQoQX9qIQAgBCAANgLUKCAAQQJ0IANqIAE2AgAgAigCJCACKAIMQQJ0aiACKAIkIAIoAhhBAnRqLwEAIAIoAiQgAigCFEECdGovAQBqOwEAIAIoAgwgAigCLEHYKGpqAn8gAigCGCACKAIsQdgoamotAAAgAigCFCACKAIsQdgoamotAABOBEAgAigCGCACKAIsQdgoamotAAAMAQsgAigCFCACKAIsQdgoamotAAALQQFqOgAAIAIoAiQgAigCFEECdGogAigCDCIAOwECIAIoAiQgAigCGEECdGogADsBAiACIAIoAgwiAEEBajYCDCACKAIsIAA2AuAWIAIoAiwgAigCJEEBEHggAigCLCgC0ChBAk4NAAsgAigCLCgC4BYh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ACAALQABIAFHDQAaIAIgAigCLCIAQQFqNgIsIAAtAAEhASACIAIoAigiAEEBajYCKEEAIAAtAAEgAUcNABogAiACKAIsIgBBAWo2AiwgAC0AASEBIAIgAigCKCIAQQFqNgIoQQAgAC0AASABRw0AGiACKAIsIAIoAgxJC0EBcQ0ACyACQYICIAIoAgwgAigCLGtrNgIkIAIgAigCDEH+fWo2AiwgAigCJCACKAIgSgRAIAIoAjggAigCNDYCcCACIAIoAiQ2AiAgAigCJCACKAIcTg0CIAIgAigCLCACKAIgQQFrai0AADoACyACIAIoAiwgAigCIGotAAA6AAoLCyACIAIoAhQgAigCNCACKAIQcUEBdGovAQAiATYCNEEAIQAgASACKAIYSwR/IAIgAigCMEF/aiIANgIwIABBAEcFQQALQQFxDQELCwJAIAIoAiAgAigCOCgCdE0EQCACIAIoAiA2AjwMAQsgAiACKAI4KAJ0NgI8CyACKAI8C54QAQF/IwBBMGsiAiQAIAIgADYCKCACIAE2AiQgAgJ/IAIoAigoAgxBBWsgAigCKCgCLEsEQCACKAIoKAIsDAELIAIoAigoAgxBBWsLNgIgIAJBADYCECACIAIoAigoAgAoAgQ2AgwDQAJAIAJB//8DNgIcIAIgAigCKCgCvC1BKmpBA3U2AhQgAigCKCgCACgCECACKAIUSQ0AIAIgAigCKCgCACgCECACKAIUazYCFCACIAIoAigoAmwgAigCKCgCXGs2AhggAigCHCACKAIYIAIoAigoAgAoAgRqSwRAIAIgAigCGCACKAIoKAIAKAIEajYCHAsgAigCHCACKAIUSwRAIAIgAigCFDYCHAsCQCACKAIcIAIoAiBPDQACQCACKAIcRQRAIAIoAiRBBEcNAQsgAigCJEUNACACKAIcIAIoAhggAigCKCgCACgCBGpGDQELDAELQQAhACACQQFBACACKAIkQQRGBH8gAigCHCACKAIYIAIoAigoAgAoAgRqRgVBAAtBAXEbNgIQIAIoAihBAEEAIAIoAhAQViACKAIoKAIIIAIoAigoAhRBBGtqIAIoAhw6AAAgAigCKCgCCCACKAIoKAIUQQNraiACKAIcQQh2OgAAIAIoAigoAgggAigCKCgCFEECa2ogAigCHEF/czoAACACKAIoKAIIIAIoAigoAhRBAWtqIAIoAhxBf3NBCHY6AAAgAigCKCgCABAfIAIoAhgEQCACKAIYIAIoAhxLBEAgAiACKAIcNgIYCyACKAIoKAIAKAIMIAIoAigoAjggAigCKCgCXGogAigCGBAcGiACKAIoKAIAIgAgAigCGCAAKAIMajYCDCACKAIoKAIAIgAgACgCECACKAIYazYCECACKAIoKAIAIgAgAigCGCAAKAIUajYCFCACKAIoIgAgAigCGCAAKAJcajYCXCACIAIoAhwgAigCGGs2AhwLIAIoAhwEQCACKAIoKAIAIAIoAigoAgAoAgwgAigCHBB1GiACKAIoKAIAIgAgAigCHCAAKAIMajYCDCACKAIoKAIAIgAgACgCECACKAIcazYCECACKAIoKAIAIgAgAigCHCAAKAIUajYCFAsgAigCEEUNAQsLIAIgAigCDCACKAIoKAIAKAIEazYCDCACKAIMBEACQCACKAIMIAIoAigoAixPBEAgAigCKEECNgKwLSACKAIoKAI4IAIoAigoAgAoAgAgAigCKCgCLGsgAigCKCgCLBAcGiACKAIoIAIoAigoAiw2AmwMAQsgAigCKCgCPCACKAIoKAJsayACKAIMTQRAIAIoAigiACAAKAJsIAIoAigoAixrNgJsIAIoAigoAjggAigCKCgCOCACKAIoKAIsaiACKAIoKAJsEBwaIAIoAigoArAtQQJJBEAgAigCKCIAIAAoArAtQQFqNgKwLQsLIAIoAigoAjggAigCKCgCbGogAigCKCgCACgCACACKAIMayACKAIMEBwaIAIoAigiACACKAIMIAAoAmxqNgJsCyACKAIoIAIoAigoAmw2AlwgAigCKCIBAn8gAigCDCACKAIoKAIsIAIoAigoArQta0sEQCACKAIoKAIsIAIoAigoArQtawwBCyACKAIMCyABKAK0LWo2ArQtCyACKAIoKALALSACKAIoKAJsSQRAIAIoAiggAigCKCgCbDYCwC0LAkAgAigCEARAIAJBAzYCLAwBCwJAIAIoAiRFDQAgAigCJEEERg0AIAIoAigoAgAoAgQNACACKAIoKAJsIAIoAigoAlxHDQAgAkEBNgIsDAELIAIgAigCKCgCPCACKAIoKAJsa0EBazYCFAJAIAIoAigoAgAoAgQgAigCFE0NACACKAIoKAJcIAIoAigoAixIDQAgAigCKCIAIAAoAlwgAigCKCgCLGs2AlwgAigCKCIAIAAoAmwgAigCKCgCLGs2AmwgAigCKCgCOCACKAIoKAI4IAIoAigoAixqIAIoAigoAmwQHBogAigCKCgCsC1BAkkEQCACKAIoIgAgACgCsC1BAWo2ArAtCyACIAIoAigoAiwgAigCFGo2AhQLIAIoAhQgAigCKCgCACgCBEsEQCACIAIoAigoAgAoAgQ2AhQLIAIoAhQEQCACKAIoKAIAIAIoAigoAjggAigCKCgCbGogAigCFBB1GiACKAIoIgAgAigCFCAAKAJsajYCbAsgAigCKCgCwC0gAigCKCgCbEkEQCACKAIoIAIoAigoAmw2AsAtCyACIAIoAigoArwtQSpqQQN1NgIUIAICf0H//wMgAigCKCgCDCACKAIUa0H//wNLDQAaIAIoAigoAgwgAigCFGsLNgIUIAICfyACKAIUIAIoAigoAixLBEAgAigCKCgCLAwBCyACKAIUCzYCICACIAIoAigoAmwgAigCKCgCXGs2AhgCQCACKAIYIAIoAiBJBEAgAigCGEUEQCACKAIkQQRHDQILIAIoAiRFDQEgAigCKCgCACgCBA0BIAIoAhggAigCFEsNAQsgAgJ/IAIoAhggAigCFEsEQCACKAIUDAELIAIoAhgLNgIcIAJBAUEAAn9BACACKAIkQQRHDQAaQQAgAigCKCgCACgCBA0AGiACKAIcIAIoAhhGC0EBcRs2AhAgAigCKCACKAIoKAI4IAIoAigoAlxqIAIoAhwgAigCEBBWIAIoAigiACACKAIcIAAoAlxqNgJcIAIoAigoAgAQHwsgAkECQQAgAigCEBs2AiwLIAIoAiwhACACQTBqJAAgAAuyAgEBfyMAQRBrIgEkACABIAA2AggCQCABKAIIEHYEQCABQX42AgwMAQsgASABKAIIKAIcKAIENgIEIAEoAggoAhwoAggEQCABKAIIKAIoIAEoAggoAhwoAgggASgCCCgCJBECAAsgASgCCCgCHCgCRARAIAEoAggoAiggASgCCCgCHCgCRCABKAIIKAIkEQIACyABKAIIKAIcKAJABEAgASgCCCgCKCABKAIIKAIcKAJAIAEoAggoAiQRAgALIAEoAggoAhwoAjgEQCABKAIIKAIoIAEoAggoAhwoAjggASgCCCgCJBECAAsgASgC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Rw0AIAIoAgwvAQoEQCACKAIMKAIMIAIoAhQoAgwgAigCDC8BChBQDQELIAIoAgwiACAAKAIEIAIoAhQoAgRBgAZxcjYCBCACQQE2AgQMAQsgAiACKAIMKAIANgIMDAELCyACKAIUQQA2AgACQCACKAIEBEAgAigCFBAmDAELIAIoAgggAigCFCIANgIAIAIgADYCCAsgAiACKAIQNgIUDAELCyACIAIoAhg2AhwLIAIoAhwhACACQSBqJAAgAAtdAQF/IwBBEGsiAiQAIAIgADYCCCACIAE2AgQCQCACKAIERQRAIAJBADYCDAwBCyACIAIoAgggAigCBCgCACACKAIELwEErRA8NgIMCyACKAIMIQAgAkEQaiQAIAALjwEBAX8jAEEQayICJAAgAiAANgIIIAIgATYCBAJAAkAgAigCCARAIAIoAgQNAQsgAiACKAIIIAIoAgRGNgIMDAELIAIoAggvAQQgAigCBC8BBEcEQCACQQA2AgwMAQsgAiACKAIIKAIAIAIoAgQoAgAgAigCCC8BBBBQRTYCDAsgAigCDCEAIAJBEGokACAAC1UBAX8jAEEQayIBJAAgASAANgIMIAFBAEEAQQAQHTYCCCABKAIMBEAgASABKAIIIAEoAgwoAgAgASgCDC8BBBAdNgIICyABKAIIIQAgAUEQaiQAIAALiAEBAX8jAEEgayIDJAAgAyAANgIUIAMgATYCECADIAI3AwgCQAJAIAMoAhQoAiRBAUYEQCADKQMIQv///////////wBYDQELIAMoAhRBDGpBEkEAEBcgA0J/NwMYDAELIAMgAygCFCADKAIQIAMpAwhBCxAkNwMYCyADKQMYIQIgA0EgaiQAIAILcwEBfyMAQSBrIgEkACABIAA2AhggAUIINwMQIAEgASgCGCkDECABKQMQfDcDCAJAIAEpAwggASgCGCkDEFQEQCABKAIYQQA6AAAgAUF/NgIcDAELIAEgASgCGCABKQMIEC42AhwLIAEoAhwaIAFBIGokAAsGAEG0nAELlgEBAX8jAEEgayICIAA2AhggAiABNwMQAkACQAJAIAIoAhgtAABBAXFFDQAgAigCGCkDECACKQMQfCACKQMQVA0AIAIoAhgpAxAgAikDEHwgAigCGCkDCFgNAQsgAigCGEEAOgAAIAJBADYCHAwBCyACIAIoAhgoAgQgAigCGCkDEKdqNgIMIAIgAigCDDYCHAsgAigCHAsYAEGonAFCADcCAEGwnAFBADYCAEGonAELuQIBAX8jAEEQayICIAA2AgggAiABNgIEAkAgAigCCEGAAUkEQCACKAIEIAIoAgg6AAAgAkEBNgIMDAELIAIoAghBgBBJBEAgAigCBCACKAIIQQZ2QR9xQcABcjoAACACKAIEIAIoAghBP3FBgAFyOgABIAJBAjYCDAwBCyACKAIIQYCABEkEQCACKAIEIAIoAghBDHZBD3FB4AFyOgAAIAIoAgQgAigCCEEGdkE/cUGAAXI6AAEgAigCBCACKAIIQT9xQYABcjoAAiACQQM2AgwMAQsgAigCBCACKAIIQRJ2QQdxQfABcjoAACACKAIEIAIoAghBDHZBP3FBgAFyOgABIAIoAgQgAigCCEEGdkE/cUGAAXI6AAIgAigCBCACKAIIQT9xQYABcjoAAyACQQQ2AgwLIAIoAgwLXwEBfyMAQRBrIgEgADYCCAJAIAEoAghBgAFJBEAgAUEBNgIMDAELIAEoAghBgBBJBEAgAUECNgIMDAELIAEoAghBgIAESQRAIAFBAzYCDAwBCyABQQQ2AgwLIAEoAgwL/gIBAX8jAEEwayIEJAAgBCAANgIoIAQgATYCJCAEIAI2AiAgBCADNgIcIAQgBCgCKDYCGAJAIAQoAiRFBEAgBCgCIARAIAQoAiBBADYCAAsgBEEANgIsDAELIARBATYCECAEQQA2AgwDQCAEKAIMIAQoAiRPRQRAIAQgBCgCGCAEKAIMai0AAEEBdEHQ0wBqLwEAEM4BIAQoAhBqNgIQIAQgBCgCDEEBajYCDAwBCwsgBCAEKAIQEBsiADYCFCAARQRAIAQoAhxBDkEAEBcgBEEANgIsDAELIARBADYCCCAEQQA2AgwDQCAEKAIMIAQoAiRPRQRAIAQgBCgCGCAEKAIMai0AAEEBdEHQ0wBqLwEAIAQoAhQgBCgCCGoQzQEgBCgCCGo2AgggBCAEKAIMQQFqNgIMDAELCyAEKAIUIAQoAhBBAWtqQQA6AAAgBCgCIARAIAQoAiAgBCgCEEEBazYCAAsgBCAEKAIUNgIsCyAEKAIsIQAgBEEwaiQAIAAL+wsBAX8jAEEgayIDIAA2AhwgAyABNgIYIAMgAjYCFCADIAMoAhxBCHZBgP4DcSADKAIcQRh2aiADKAIcQYD+A3FBCHRqIAMoAhxB/wFxQRh0ajYCECADIAMoAhBBf3M2AhADQEEAIQAgAygCFAR/IAMoAhhBA3FBAEcFQQALQQFxBEAgAygCEEEYdiEAIAMgAygCGCIBQQFqNgIYIAMgAS0AACAAc0ECdEHQM2ooAgAgAygCEEEIdHM2AhAgAyADKAIUQX9qNgIUDAELCyADIAMoAhg2AgwDQCADKAIUQSBJRQRAIAMgAygCDCIAQQRqNgIMIAMgACgCACADKAIQczYCECADIAMoAhBBGHZBAnRB0MsAaigCACADKAIQQRB2Qf8BcUECdEHQwwBqKAIAIAMoAhBB/wFxQQJ0QdAzaigCACADKAIQQQh2Qf8BcUECdEHQO2ooAgBzc3M2AhAgAyADKAIMIgBBBGo2AgwgAyAAKAIAIAMoAhBzNgIQIAMgAygCEEEYdkECdEHQywBqKAIAIAMoAhBBEHZB/wFxQQJ0QdDDAGooAgAgAygCEEH/AXFBAnRB0DNqKAIAIAMoAhBBCHZB/wFxQQJ0QdA7aigCAHNzczYCECADIAMoAgwiAEEEajYCDCADIAAoAgAgAygCEHM2AhAgAyADKAIQQRh2QQJ0QdDLAGooAgAgAygCEEEQdkH/AXFBAnRB0MMAaigCACADKAIQQf8BcUECdEHQM2ooAgAgAygCEEEIdkH/AXFBAnRB0DtqKAIAc3NzNgIQIAMgAygCDCIAQQRqNgIMIAMgACgCACADKAIQczYCECADIAMoAhBBGHZBAnRB0MsAaigCACADKAIQQRB2Qf8BcUECdEHQwwBqKAIAIAMoAhBB/wFxQQJ0QdAzaigCACADKAIQQQh2Qf8BcUECdEHQO2ooAgBzc3M2AhAgAyADKAIMIgBBBGo2AgwgAyAAKAIAIAMoAhBzNgIQIAMgAygCEEEYdkECdEHQywBqKAIAIAMoAhBBEHZB/wFxQQJ0QdDDAGooAgAgAygCEEH/AXFBAnRB0DNqKAIAIAMoAhBBCHZB/wFxQQJ0QdA7aigCAHNzczYCECADIAMoAgwiAEEEajYCDCADIAAoAgAgAygCEHM2AhAgAyADKAIQQRh2QQJ0QdDLAGooAgAgAygCEEEQdkH/AXFBAnRB0MMAaigCACADKAIQQf8BcUECdEHQM2ooAgAgAygCEEEIdkH/AXFBAnRB0DtqKAIAc3NzNgIQIAMgAygCDCIAQQRqNgIMIAMgACgCACADKAIQczYCECADIAMoAhBBGHZBAnRB0MsAaigCACADKAIQQRB2Qf8BcUECdEHQwwBqKAIAIAMoAhBB/wFxQQJ0QdAzaigCACADKAIQQQh2Qf8BcUECdEHQO2ooAgBzc3M2AhAgAyADKAIMIgBBBGo2AgwgAyAAKAIAIAMoAhBzNgIQIAMgAygCEEEYdkECdEHQywBqKAIAIAMoAhBBEHZB/wFxQQJ0QdDDAGooAgAgAygCEEH/AXFBAnRB0DNqKAIAIAMoAhBBCHZB/wFxQQJ0QdA7aigCAHNzczYCECADIAMoAhRBIGs2AhQMAQsLA0AgAygCFEEESUUEQCADIAMoAgwiAEEEajYCDCADIAAoAgAgAygCEHM2AhAgAyADKAIQQRh2QQJ0QdDLAGooAgAgAygCEEEQdkH/AXFBAnRB0MMAaigCACADKAIQQf8BcUECdEHQM2ooAgAgAygCEEEIdkH/AXFBAnRB0DtqKAIAc3NzNgIQIAMgAygCFEEEazYCFAwBCwsgAyADKAIMNgIYIAMoAhQEQANAIAMoAhBBGHYhACADIAMoAhgiAUEBajYCGCADIAEtAAAgAHNBAnRB0DNqKAIAIAMoAhBBCHRzNgIQIAMgAygCFEF/aiIANgIUIAANAAsLIAMgAygCEEF/czYCECADKAIQQQh2QYD+A3EgAygCEEEYdmogAygCEEGA/gNxQQh0aiADKAIQQf8BcUEYdGoLCABBAUEMEGcLkwsBAX8jAEEgayIDIAA2AhwgAyABNgIYIAMgAjYCFCADIAMoAhw2AhAgAyADKAIQQX9zNgIQA0BBACEAIAMoAhQEfyADKAIYQQNxQQBHBUEAC0EBcQRAIAMoAhAhACADIAMoAhgiAUEBajYCGCADIAEtAAAgAHNB/wFxQQJ0QdATaigCACADKAIQQQh2czYCECADIAMoAhRBf2o2AhQMAQsLIAMgAygCGDYCDANAIAMoAhRBIElFBEAgAyADKAIMIgBBBGo2AgwgAyAAKAIAIAMoAhBzNgIQIAMgAygCEEEYdkECdEHQE2ooAgAgAygCEEEQdkH/AXFBAnRB0BtqKAIAIAMoAhBB/wFxQQJ0QdAraigCACADKAIQQQh2Qf8BcUECdEHQI2ooAgBzc3M2AhAgAyADKAIMIgBBBGo2AgwgAyAAKAIAIAMoAhBzNgIQIAMgAygCEEEYdkECdEHQE2ooAgAgAygCEEEQdkH/AXFBAnRB0BtqKAIAIAMoAhBB/wFxQQJ0QdAraigCACADKAIQQQh2Qf8BcUECdEHQI2ooAgBzc3M2AhAgAyADKAIMIgBBBGo2AgwgAyAAKAIAIAMoAhBzNgIQIAMgAygCEEEYdkECdEHQE2ooAgAgAygCEEEQdkH/AXFBAnRB0BtqKAIAIAMoAhBB/wFxQQJ0QdAraigCACADKAIQQQh2Qf8BcUECdEHQI2ooAgBzc3M2AhAgAyADKAIMIgBBBGo2AgwgAyAAKAIAIAMoAhBzNgIQIAMgAygCEEEYdkECdEHQE2ooAgAgAygCEEEQdkH/AXFBAnRB0BtqKAIAIAMoAhBB/wFxQQJ0QdAraigCACADKAIQQQh2Qf8BcUECdEHQI2ooAgBzc3M2AhAgAyADKAIMIgBBBGo2AgwgAyAAKAIAIAMoAhBzNgIQIAMgAygCEEEYdkECdEHQE2ooAgAgAygCEEEQdkH/AXFBAnRB0BtqKAIAIAMoAhBB/wFxQQJ0QdAraigCACADKAIQQQh2Qf8BcUECdEHQI2ooAgBzc3M2AhAgAyADKAIMIgBBBGo2AgwgAyAAKAIAIAMoAhBzNgIQIAMgAygCEEEYdkECdEHQE2ooAgAgAygCEEEQdkH/AXFBAnRB0BtqKAIAIAMoAhBB/wFxQQJ0QdAraigCACADKAIQQQh2Qf8BcUECdEHQI2ooAgBzc3M2AhAgAyADKAIMIgBBBGo2AgwgAyAAKAIAIAMoAhBzNgIQIAMgAygCEEEYdkECdEHQE2ooAgAgAygCEEEQdkH/AXFBAnRB0BtqKAIAIAMoAhBB/wFxQQJ0QdAraigCACADKAIQQQh2Qf8BcUECdEHQI2ooAgBzc3M2AhAgAyADKAIMIgBBBGo2AgwgAyAAKAIAIAMoAhBzNgIQIAMgAygCEEEYdkECdEHQE2ooAgAgAygCEEEQdkH/AXFBAnRB0BtqKAIAIAMoAhBB/wFxQQJ0QdAraigCACADKAIQQQh2Qf8BcUECdEHQI2ooAgBzc3M2AhAgAyADKAIUQSBrNgIUDAELCwNAIAMoAhRBBElFBEAgAyADKAIMIgBBBGo2AgwgAyAAKAIAIAMoAhBzNgIQIAMgAygCEEEYdkECdEHQE2ooAgAgAygCEEEQdkH/AXFBAnRB0BtqKAIAIAMoAhBB/wFxQQJ0QdAraigCACADKAIQQQh2Qf8BcUECdEHQI2ooAgBzc3M2AhAgAyADKAIUQQRrNgIUDAELCyADIAMoAgw2AhggAygCFARAA0AgAygCECEAIAMgAygCGCIBQQFqNgIYIAMgAS0AACAAc0H/AXFBAnRB0BNqKAIAIAMoAhBBCHZzNgIQIAMgAygCFEF/aiIANgIUIAANAAsLIAMgAygCEEF/czYCECADKAIQC4YBAQF/IwBBIGsiAyQAIAMgADYCGCADIAE2AhQgAyACNgIQAkAgAygCFEUEQCADQQA2AhwMAQsgA0EBNgIMIAMtAAwEQCADIAMoAhggAygCFCADKAIQENIBNgIcDAELIAMgAygCGCADKAIUIAMoAhAQ0AE2AhwLIAMoAhwhACADQSBqJAAgAAsHACAAKAIoC6EBAQF/IwBBEGsiASQAIAEgADYCCAJAIAEoAggoAiRBA0YEQCABQQA2AgwMAQsgASgCCCgCIEEASwRAIAEoAggQN0EASARAIAFBfzYCDAwCCwsgASgCCCgCJARAIAEoAggQZgsgASgCCEEAQgBBDxAkQgBTBEAgAUF/NgIMDAELIAEoAghBAzYCJCABQQA2AgwLIAEoAgwhACABQRBqJAAgAAsHACAAKAIYC4gBAQF/IwBBEGsiAiQAIAIgADYCDCACIAE2AggjAEEQayIAIAIoAgw2AgwgACgCDEEANgIAIAAoAgxBADYCBCAAKAIMQQA2AgggAigCDCACKAIINgIAAkAgAigCDBCNAUEBRgRAIAIoAgxBtJwBKAIANgIEDAELIAIoAgxBADYCBAsgAkEQaiQAC70HAQl/IAAgACgCBCIGQXhxIgNqIQRBmJ0BKAIAIQcCQCAGQQNxIgJBAUYNACAHIABLDQALAkAgAkUEQEEAIQIgAUGAAkkNASADIAFBBGpPBEAgACECIAMgAWtB6KABKAIAQQF0TQ0CC0EADwsCQCADIAFPBEAgAyABayICQRBJDQEgACAGQQFxIAFyQQJyNgIEIAAgAWoiASACQQNyNgIEIAQgBCgCBEEBcjYCBCABIAIQjgEMAQtBACECIARBoJ0BKAIARgRAQZSdASgCACADaiIDIAFNDQIgACAGQQFxIAFyQQJyNgIEIAAgAWoiAiADIAFrIgFBAXI2AgRBlJ0BIAE2AgBBoJ0BIAI2AgAMAQsgBEGcnQEoAgBGBEBBkJ0BKAIAIANqIgMgAUkNAgJAIAMgAWsiBUEQTwRAIAAgBkEBcSABckECcjYCBCAAIAFqIgEgBUEBcjYCBCAAIANqIgIgBTYCACACIAIoAgRBfnE2AgQMAQsgACAGQQFxIANyQQJyNgIEIAAgA2oiASABKAIEQQFyNgIEQQAhBUEAIQELQZydASABNgIAQZCdASAFNgIADAELIAQoAgQiBUECcQ0BIAVBeHEgA2oiCCABSQ0BIAggAWshCgJAIAVB/wFNBEAgBCgCCCIDIAVBA3YiBUEDdEGwnQFqRxogAyAEKAIMIgJGBEBBiJ0BQYidASgCAEF+IAV3cTYCAAwCCyADIAI2AgwgAiADNgIIDAELIAQoAhghCQJAIAQgBCgCDCIDRwRAIAcgBCgCCCICTQRAIAIoAgwaCyACIAM2AgwgAyACNgIIDAELAkAgBEEUaiIFKAIAIgINACAEQRBqIgUoAgAiAg0AQQAhAwwBCwNAIAUhByACIgNBFGoiBSgCACICDQAgA0EQaiEFIAMoAhAiAg0ACyAHQQA2AgALIAlFDQACQCAEIAQoAhwiAkECdEG4nwFqIgUoAgBGBEAgBSADNgIAIAMNAUGMnQFBjJ0BKAIAQX4gAndxNgIADAILIAlBEEEUIAkoAhAgBEYbaiADNgIAIANFDQELIAMgCTYCGCAEKAIQIgIEQCADIAI2AhAgAiADNgIYCyAEKAIUIgJFDQAgAyACNgIUIAIgAzYCGAsgCkEPTQRAIAAgBkEBcSAIckECcjYCBCAAIAhqIgEgASgCBEEBcjYCBAwBCyAAIAZBAXEgAXJBAnI2AgQgACABaiIBIApBA3I2AgQgACAIaiICIAIoAgRBAXI2AgQgASAKEI4BCyAAIQILIAILBwAgACgCEAsUACAAIAGtIAKtQiCGhCADIAQQfQsVACAAIAGtIAKtQiCGhCADIAQQtQELFAAgACABIAKtIAOtQiCGhCAEEHwLFQAgACABrSACrUIghoQgAyAEEPABCxcBAX4gACABIAIQcCIDQiCIpxABIAOnCxYBAX4gACABEJQCIgJCIIinEAEgAqcLEwAgACABrSACrUIghoQgAxC3AQsgAQF+IAAgASACrSADrUIghoQQlQIiBEIgiKcQASAEpwsTACAAIAGtIAKtQiCGhCADEJYCCxUAIAAgAa0gAq1CIIaEIAMgBBCaAgsXACAAIAGtIAKtQiCGhCADIAQgBRCcAQsXACAAIAGtIAKtQiCGhCADIAQgBRCbAgsaAQF+IAAgASACIAMQngIiBEIgiKcQASAEpwsYAQF+IAAgASACEKACIgNCIIinEAEgA6cLCQAgASAAEQYACwYAIAAkAAsQACMAIABrQXBxIgAkACAACwQAIwALBgBBnKEBCwYAQZihAQsGAEGQoQELggECAX8BfiMAQSBrIgQkACAEIAA2AhggBCABNgIUIAQgAjYCECAEIAM2AgwgBCAEKAIYIAQoAhQgBCgCEBBwIgU3AwACQCAFQgBTBEAgBEF/NgIcDAELIAQgBCgCGCAEKQMAIAQoAhAgBCgCDBB9NgIcCyAEKAIcIQAgBEEgaiQAIAAL0gMBAX8jAEEgayIEJAAgBCAANgIYIAQgATcDECAEIAI2AgwgBCADNgIIAkACQCAEKQMQIAQoAhgpAzBUBEAgBCgCCEEJTQ0BCyAEKAIYQQhqQRJBABAXIARBfzYCHAwBCyAEKAIYKAIYQQJxBEAgBCgCGEEIakEZQQAQFyAEQX82AhwMAQsgBCgCDBC5AkEBcUUEQCAEKAIYQQhqQRBBABAXIARBfzYCHAwBCyAEIAQoAhgoAkAgBCkDEKdBBHRqNgIEIAQCf0F/IAQoAgQoAgBFDQAaIAQoAgQoAgAoAhALNgIAAkAgBCgCDCAEKAIARgRAIAQoAgQoAgQEQCAEKAIEKAIEIgAgACgCAEF+cTYCACAEKAIEKAIEQQA7AVAgBCgCBCgCBCgCAEUEQCAEKAIEKAIEEDogBCgCBEEANgIECwsMAQsgBCgCBCgCBEUEQCAEKAIEKAIAEEghACAEKAIEIAA2AgQgAEUEQCAEKAIYQQhqQQ5BABAXIARBfzYCHAwDCwsgBCgCBCgCBCAEKAIMNgIQIAQoAgQoAgQgBCgCCDsBUCAEKAIEKAIEIgAgACgCAEEBcjYCAAsgBEEANgIcCyAEKAIcIQAgBEEgaiQAIAALkAIBAX8jAEEQayICJAAgAiAANgIIIAIgATYCBAJAAkACQCACKAIILwEKIAIoAgQvAQpIDQAgAigCCCgCECACKAIEKAIQRw0AIAIoAggoAhQgAigCBCgCFEcNACACKAIIKAIwIAIoAgQoAjAQxgENAQsgAkF/NgIMDAELAkACQCACKAIIKAIYIAIoAgQoAhhHDQAgAigCCCkDICACKAIEKQMgUg0AIAIoAggpAyggAigCBCkDKFENAQsCQAJAIAIoAgQvAQxBCHFFDQAgAigCBCgCGA0AIAIoAgQpAyBCAFINACACKAIEKQMoUA0BCyACQX82AgwMAgsLIAJBADYCDAsgAigCDCEAIAJBEGokACAAC/oDAQF/IwBB0ABrIgQkACAEIAA2AkggBCABNwNAIAQgAjYCPCAEIAM2AjgCQCAEKAJIEDJCFlQEQCAEKAI4QRVBABAXIARBADYCTAwBCyMAQRBrIgAgBCgCSDYCDCAEAn4gACgCDC0AAEEBcQRAIAAoAgwpAxAMAQtCAAs3AwggBCgCSEIEECEaIAQoAkgQLARAIAQoAjhBAUEAEBcgBEEANgJMDAELIAQgBCgCSBAgQf//A3GtNwMoIAQgBCgCSBAgQf//A3GtNwMgIAQpAyAgBCkDKFIEQCAEKAI4QRNBABAXIARBADYCTAwBCyAEIAQoAkgQLK03AxggBCAEKAJIECytNwMQIAQpAxAgBCkDGHwgBCkDEFQEQCAEKAI4QQRBFhAXIARBADYCTAwBCyAEKQMQIAQpAxh8IAQpA0AgBCkDCHxWBEAgBCgCOEEVQQAQFyAEQQA2AkwMAQsCQCAEKAI8QQRxRQ0AIAQpAxAgBCkDGHwgBCkDQCAEKQMIfFENACAEKAI4QRVBABAXIARBADYCTAwBCyAEIAQpAyAgBCgCOBC/ASIANgI0IABFBEAgBEEANgJMDAELIAQoAjRBADoALCAEKAI0IAQpAxg3AxggBCgCNCAEKQMQNwMgIAQgBCgCNDYCTAsgBCgCTCEAIARB0ABqJAAgAAvVCgEBfyMAQbABayIFJAAgBSAANgKoASAFIAE2AqQBIAUgAjcDmAEgBSADNgKUASAFIAQ2ApABIwBBEGsiACAFKAKkATYCDCAFAn4gACgCDC0AAEEBcQRAIAAoAgwpAxAMAQtCAAs3AxggBSgCpAFCBBAhGiAFIAUoAqQBECBB//8DcTYCECAFIAUoAqQBECBB//8DcTYCCCAFIAUoAqQBEDM3AzgCQCAFKQM4Qv///////////wBWBEAgBSgCkAFBBEEWEBcgBUEANgKsAQwBCyAFKQM4Qjh8IAUpAxggBSkDmAF8VgRAIAUoApABQRVBABAXIAVBADYCrAEMAQsCQAJAIAUpAzggBSkDmAFUDQAgBSkDOEI4fCAFKQOYAQJ+IwBBEGsiACAFKAKkATYCDCAAKAIMKQMIC3xWDQAgBSgCpAEgBSkDOCAFKQOYAX0QLhogBUEAOgAXDAELIAUoAqgBIAUpAzhBABAtQQBIBEAgBSgCkAEgBSgCqAEQGiAFQQA2AqwBDAILIAUgBSgCqAFCOCAFQUBrIAUoApABEEMiADYCpAEgAEUEQCAFQQA2AqwBDAILIAVBAToAFwsgBSgCpAFCBBAhKAAAQdCWmTBHBEAgBSgCkAFBFUEAEBcgBS0AF0EBcQRAIAUoAqQBEBkLIAVBADYCrAEMAQsgBSAFKAKkARAzNwMwAkAgBSgClAFBBHFFDQAgBSkDMCAFKQM4fEIMfCAFKQOYASAFKQMYfFENACAFKAKQAUEVQQAQFyAFLQAXQQFxBEAgBSgCpAEQGQsgBUEANgKsAQwBCyAFKAKkAUIEECEaIAUgBSgCpAEQLDYCDCAFIAUoAqQBECw2AgQgBSgCEEH//wNGBEAgBSAFKAIMNgIQCyAFKAIIQf//A0YEQCAFIAUoAgQ2AggLAkAgBSgClAFBBHFFDQAgBSgCCCAFKAIERgRAIAUoAhAgBSgCDEYNAQsgBSgCkAFBFUEAEBcgBS0AF0EBcQRAIAUoAqQBEBkLIAVBADYCrAEMAQsCQCAFKAIQRQRAIAUoAghFDQELIAUoApABQQFBABAXIAUtABdBAXEEQCAFKAKkARAZCyAFQQA2AqwBDAELIAUgBSgCpAEQMzcDKCAFIAUoAqQBEDM3AyAgBSkDKCAFKQMgUgRAIAUoApABQQFBABAXIAUtABdBAXEEQCAFKAKkARAZCyAFQQA2AqwBDAELIAUgBSgCpAEQMzcDMCAFIAUoAqQBEDM3A4ABAn8jAEEQayIAIAUoAqQBNgIMIAAoAgwtAABBAXFFCwRAIAUoApABQRRBABAXIAUtABdBAXEEQCAFKAKkARAZCyAFQQA2AqwBDAELIAUtABdBAXEEQCAFKAKkARAZCwJAIAUpA4ABQv///////////wBYBEAgBSkDgAEgBSkDMHwgBSkDgAFaDQELIAUoApABQQRBFhAXIAVBADYCrAEMAQsgBSkDgAEgBSkDMHwgBSkDmAEgBSkDOHxWBEAgBSgCkAFBFUEAEBcgBUEANgKsAQwBCwJAIAUoApQBQQRxRQ0AIAUpA4ABIAUpAzB8IAUpA5gBIAUpAzh8UQ0AIAUoApABQRVBABAXIAVBADYCrAEMAQsgBSkDKCAFKQMwQi6AVgRAIAUoApABQRVBABAXIAVBADYCrAEMAQsgBSAFKQMoIAUoApABEL8BIgA2AowBIABFBEAgBUEANgKsAQwBCyAFKAKMAUEBOgAsIAUoAowBIAUpAzA3AxggBSgCjAEgBSkDgAE3AyAgBSAFKAKMATYCrAELIAUoAqwBIQAgBUGwAWokACAAC+ILAQF/IwBB8ABrIgQkACAEIAA2AmggBCABNgJkIAQgAjcDWCAEIAM2AlQjAEEQayIAIAQoAmQ2AgwgBAJ+IAAoAgwtAABBAXEEQCAAKAIMKQMQDAELQgALNwMwAkAgBCgCZBAyQhZUBEAgBCgCVEETQQAQFyAEQQA2AmwMAQsgBCgCZEIEECEoAABB0JaVMEcEQCAEKAJUQRNBABAXIARBADYCbAwBCwJAAkAgBCkDMEIUVA0AIwBBEGsiACAEKAJkNgIMIAAoAgwoAgQgBCkDMKdqQWxqKAAAQdCWmThHDQAgBCgCZCAEKQMwQhR9EC4aIAQgBCgCaCgCACAEKAJkIAQpA1ggBCgCaCgCFCAEKAJUEPMBNgJQDAELIAQoAmQgBCkDMBAuGiAEIAQoAmQgBCkDWCAEKAJoKAIUIAQoAlQQ8gE2AlALIAQoAlBFBEAgBEEANgJsDAELIAQoAmQgBCkDMEIUfBAuGiAEIAQoAmQQIDsBTiAEKAJQKQMgIAQoAlApAxh8IAQpA1ggBCkDMHxWBEAgBCgCVEEVQQAQFyAEKAJQECggBEEANgJsDAELAkAgBC8BTkUEQCAEKAJoKAIEQQRxRQ0BCyAEKAJkIAQpAzBCFnwQLhogBCAEKAJkEDI3AyACQCAEKQMgIAQvAU6tWgRAIAQoAmgoAgRBBHFFDQEgBCkDICAELwFOrVENAQsgBCgCVEEVQQAQFyAEKAJQECggBEEANgJsDAILIAQvAU4EQCAEKAJkIAQvAU6tECEgBC8BTkEAIAQoAlQQXyEAIAQoAlAgADYCKCAARQRAIAQoAlAQKCAEQQA2AmwMAwsLCwJAIAQoAlApAyAgBCkDWFoEQCAEKAJkIAQoAlApAyAgBCkDWH0QLhogBCAEKAJkIAQoAlApAxgQISIANgIcIABFBEAgBCgCVEEVQQAQFyAEKAJQECggBEEANgJsDAMLIAQgBCgCHCAEKAJQKQMYECsiADYCLCAARQRAIAQoAlRBDkEAEBcgBCgCUBAoIARBADYCbAwDCwwBCyAEQQA2AiwgBCgCaCgCACAEKAJQKQMgQQAQLUEASARAIAQoAlQgBCgCaCgCABAaIAQoAlAQKCAEQQA2AmwMAgsgBCgCaCgCABBUIAQoAlApAyBSBEAgBCgCVEETQQAQFyAEKAJQECggBEEANgJsDAILCyAEIAQoAlApAxg3AzggBEIANwNAA0ACQCAEKQM4QgBYDQAgBEEAOgAbIAQpA0AgBCgCUCkDCFEEQCAEKAJQLQAsQQFxDQEgBCkDOEIuVA0BIAQoAlBCgIAEIAQoAlQQvgFBAXFFBEAgBCgCUBAoIAQoAiwQGSAEQQA2AmwMBAsgBEEBOgAbCxCIAyEAIAQoAlAoAgAgBCkDQKdBBHRqIAA2AgACQCAABEAgBCAEKAJQKAIAIAQpA0CnQQR0aigCACAEKAJoKAIAIAQoAixBACAEKAJUELsBIgI3AxAgAkIAWQ0BCwJAIAQtABtBAXFFDQAjAEEQayIAIAQoAlQ2AgwgACgCDCgCAEETRw0AIAQoAlRBFUEAEBcLIAQoAlAQKCAEKAIsEBkgBEEANgJsDAMLIAQgBCkDQEIBfDcDQCAEIAQpAzggBCkDEH03AzgMAQsLAkAgBCkDQCAEKAJQKQMIUQRAIAQpAzhCAFgNAQsgBCgCVEEVQQAQFyAEKAIsEBkgBCgCUBAoIARBADYCbAwBCyAEKAJoKAIEQQRxBEACQCAEKAIsBEAgBCAEKAIsEElBAXE6AA8MAQsgBCAEKAJoKAIAEFQ3AwAgBCkDAEIAUwRAIAQoAlQgBCgCaCgCABAaIAQoAlAQKCAEQQA2AmwMAwsgBCAEKQMAIAQoAlApAyAgBCgCUCkDGHxROgAPCyAELQAPQQFxRQRAIAQoAlRBFUEAEBcgBCgCLBAZIAQoAlAQKCAEQQA2AmwMAgsLIAQoAiwQGSAEIAQoAlA2AmwLIAQoAmwhACAEQfAAaiQAIAAL1wEBAX8jAEEgayICJAAgAiAANgIYIAIgATYCFCACQYmYATYCECACQQQ2AgwCQAJAIAIoAhQgAigCDE8EQCACKAIMDQELIAJBADYCHAwBCyACIAIoAhhBf2o2AggDQAJAIAIgAigCCEEBaiACKAIQLQAAIAIoAhggAigCCGsgAigCFCACKAIMa2oQuAEiADYCCCAARQ0AIAIoAghBAWogAigCEEEBaiACKAIMQQFrEFANASACIAIoAgg2AhwMAgsLIAJBADYCHAsgAigCHCEAIAJBIGokACAACykAIAEgASgCAEEPakFwcSIBQRBqNgIAIAAgASkDACABKQMIEOACOQMAC8EGAQF/IwBB4ABrIgIkACACIAA2AlggAiABNwNQAkAgAikDUEIWVARAIAIoAlhBCGpBE0EAEBcgAkEANgJcDAELIAICfiACKQNQQqqABFQEQCACKQNQDAELQqqABAs3AzAgAigCWCgCAEIAIAIpAzB9QQIQLUEASARAIwBBEGsiACACKAJYKAIANgIMIAIgACgCDEEMajYCCAJAAn8jAEEQayIAIAIoAgg2AgwgACgCDCgCAEEERgsEQCMAQRBrIgAgAigCCDYCDCAAKAIMKAIEQRZGDQELIAIoAlhBCGogAigCCBBFIAJBADYCXAwCCwsgAiACKAJYKAIAEFQiATcDOCABQgBTBEAgAigCWEEIaiACKAJYKAIAEBogAkEANgJcDAELIAIgAigCWCgCACACKQMwQQAgAigCWEEIahBDIgA2AgwgAEUEQCACQQA2AlwMAQsgAkJ/NwMgIAJBADYCTCACKQMwQqqABFoEQCACKAIMQhQQLhoLIAJBEGpBE0EAEBcgAiACKAIMQgAQITYCRANAAkAgAiACKAJEIAIoAgwQMkISfacQ9QEiADYCRCAARQ0AIAIoAgwgAigCRAJ/IwBBEGsiACACKAIMNgIMIAAoAgwoAgQLa6wQLhogAiACKAJYIAIoAgwgAikDOCACQRBqEPQBIgA2AkggAARAAkAgAigCTARAIAIpAyBCAFcEQCACIAIoAlggAigCTCACQRBqEGg3AyALIAIgAigCWCACKAJIIAJBEGoQaDcDKAJAIAIpAyAgAikDKFMEQCACKAJMECggAiACKAJINgJMIAIgAikDKDcDIAwBCyACKAJIECgLDAELIAIgAigCSDYCTAJAIAIoAlgoAgRBBHEE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AXFHDQELCyACDwsgABAwIABqDwsgAAurAwEBfyMAQTBrIgIkACACIAA2AiggAiABNgIkIAJBADYCECACIAIoAiggAigCKBAwajYCGCACIAIoAhhBf2o2AhwDQCACKAIcIAIoAihPBH8gAigCHCwAAEHYAEYFQQALQQFxBEAgAiACKAIQQQFqNgIQIAIgAigCHEF/ajYCHAwBCwsCQCACKAIQRQRAQbScAUEcNgIAIAJBfzYCLAwBCyACIAIoAhxBAWo2AhwDQCACEIcCNgIMIAIgAigCHDYCFANAIAIoAhQgAigCGEkEQCACIAIoAgxBJHA6AAsCfyACLAALQQpIBEAgAiwAC0EwagwBCyACLAALQdcAagshACACIAIoAhQiAUEBajYCFCABIAA6AAAgAiACKAIMQSRuNgIMDAELCyACKAIoIQAgAgJ/QbYDIAIoAiRBf0YNABogAigCJAs2AgAgAiAAQcKBICACEGwiADYCICAAQQBOBEAgAigCJEF/RwRAIAIoAiggAigCJBCGAgsgAiACKAIgNgIsDAILQbScASgCAEEURg0ACyACQX82AiwLIAIoAiwhACACQTBqJAAgAAtDAQF/IwBBEGsiAiQAIAIgATYCBCACIAA2AgBBDyACEA8iAEGBYE8Ef0G0nAFBACAAazYCAEEABSAACxogAkEQaiQAC2cBAn8jAEEQayIAJAACQCAAQQhqEIgCQQFxBEAgACAAKAIINgIMDAELQYShAS0AAEEBcUUEQEEAEAIhAUH4oAEQAyABEIoCQfigARAACyAAEIkCNgIMCyAAKAIMIQEgAEEQaiQAIAELjAEBAX8jAEEQayIBJAAgASAANgIIIAFBBDsBBiABQeeXAUEAQQAQbCIANgIAAkAgAEEASARAIAFBADoADwwBCyABKAIAIAEoAgggAS8BBhCLAiABLwEGRwRAIAEoAgAQayABQQA6AA8MAQsgASgCABBrIAFBAToADwsgAS0AD0EBcSEAIAFBEGokACAAC60BAQR/QfigARADQdiaASgCACEAAkBB1JoBKAIAIgNFBEAgACAAKAIAQe2cmY4EbEG54ABqQf////8HcSIANgIADAELIABB3JoBKAIAIgJBAnRqIgEgASgCACAAQYChASgCACIBQQJ0aigCAGoiADYCAEGAoQFBACABQQFqIgEgASADRhs2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IAEgAzYCBCABIAI2AgAgAEHNlwEgARBxIAEoAqgBIAEoAhw2AgggASABKAIcNgKsAQsgASgCrAEhACABQbABaiQAIAALcQEDfwJAAkADQCAAIAJB0IgBai0AAEcEQEHXACEDIAJBAWoiAkHXAEcNAQwCCwsgAiIDDQBBsIkBIQAMAQtBsIkBIQIDQCACLQAAIQQgAkEBaiIAIQIgBA0AIAAhAiADQX9qIgMNAAsLIAEoAhQaIAALMwEBfyAAKAIUIgMgASACIAAoAhAgA2siASABIAJLGyIBEBwaIAAgACgCFCABajYCFCACC4oBAQJ/IwBBoAFrIgMkACADQQhqQbiHAUGQARAcGiADIAA2AjQgAyAANgIcIANBfiAAayIEQf////8HQf////8HIARLGyIENgI4IAMgACAEaiIANgIkIAMgADYCGCADQQhqIAEgAhC9AiAEBEAgAygCHCIAIAAgAygCGEZrQQA6AAALIANBoAFqJAALvgIBAX8jAEHAwABrIgMkACADIAA2ArhAIAMgATYCtEAgAyACNwOoQAJAIAMoArRAEFNBAEgEQCADKAK4QEEIaiADKAK0QBAaIANBfzYCvEAMAQsgA0EANgIMIANCADcDEANAAkAgAyADKAK0QCADQSBqQoDAABAxIgI3AxggAkIAVw0AIAMoArhAIANBIGogAykDGBA8QQBIBEAgA0F/NgIMBSADKQMYQoDAAFINAiADKAK4QCgCVEUNAiADKQOoQEIAVw0CIAMgAykDGCADKQMQfDcDECADKAK4QCgCVCADKQMQuSADKQOoQLmjEFcMAgsLCyADKQMYQgBTBEAgAygCuEBBCGogAygCtEAQGiADQX82AgwLIAMoArRAEDcaIAMgAygCDDYCvEALIAMoArxAIQAgA0HAwABqJAAgAAuqAQEBfyMAQTBrIgMkACADIAA2AiggAyABNgIkIAMgAjcDGCADIAMoAigoAgAQOyICNwMQAkAgAkIAUwRAIANBfzYCLAwBCyADIAMoAiggAygCJCADKQMYEIoDIgI3AwAgAkIAUwRAIANBfzYCLAwBCyADIAMoAigoAgAQOyICNwMIIAJCAFMEQCADQX82AiwMAQsgA0EANgIsCyADKAIsIQAgA0EwaiQAIAAL/gEBAX8jAEGgwABrIgIkACACIAA2AphAIAIgATcDkEAgAiACKQOQQLo5AwACQANAIAIpA5BAQgBWBEAgAgJ+QoDAACACKQOQQEKAwABWDQAaIAIpA5BACz4CDCACKAKYQCgCACACQRBqIAIoAgytIAIoAphAQQhqEGJBAEgEQCACQX82ApxADAMLIAIoAphAIAJBEGogAigCDK0QPEEASARAIAJBfzYCnEAMAwUgAiACKQOQQCACNQIMfTcDkEAgAigCmEAoAlQgAisDACACKQOQQLqhIAIrAwCjEFcMAgsACwsgAkEANgKcQAsgAigCnEAhACACQaDAAGokACAAC/IRAgF/AX4jAEGgAWsiAyQAIAMgADYCmAEgAyABNgKUASADIAI2ApABAkAgAygClAEgA0E4ahA5QQBIBEAgAygCmAFBCGogAygClAEQGiADQX82ApwBDAELIAMpAzhCwACDUARAIAMgAykDOELAAIQ3AzggA0EAOwFoCwJAAkAgAygCkAEoAhBBf0cEQCADKAKQASgCEEF+Rw0BCyADLwFoRQ0AIAMoApABIAMvAWg2AhAMAQsCQAJAIAMoApABKAIQDQAgAykDOEIEg1ANACADIAMpAzhCCIQ3AzggAyADKQNQNwNYDAELIAMgAykDOEL3////D4M3AzgLCyADKQM4QoABg1AEQCADIAMpAzhCgAGENwM4IANBADsBagsgA0GAAjYCJAJAIAMpAzhCBINQBEAgAyADKAIkQYAIcjYCJCADQn83A3AMAQsgAygCkAEgAykDUDcDKCADIAMpA1A3A3ACQCADKQM4QgiDUARAAkACQAJ/AkAgAygCkAEoAhBBf0cEQCADKAKQASgCEEF+Rw0BC0EIDAELIAMoApABKAIQC0H//wNxIgBBDEsNAAJAAkACQCAAQQFrDgwDAwMDAwMDAQMDAwACCyADQpTC5PMPNwMQDAMLIANCg4Ow/w83AxAMAgsgA0L/////DzcDEAwBCyADQgA3AxALIAMpA1AgAykDEFYEQCADIAMoAiRBgAhyNgIkCwwBCyADKAKQASADKQNYNwMgCwsgAyADKAKYASgCABA7IgQ3A4gBIARCAFMEQCADKAKYAUEIaiADKAKYASgCABAaIANBfzYCnAEMAQsgAygCkAEiACAALwEMQff/A3E7AQwgAyADKAKYASADKAKQASADKAIkEF0iADYCKCAAQQBIBEAgA0F/NgKcAQwBCyADIAMvAWgCfwJAIAMoApABKAIQQX9HBEAgAygCkAEoAhBBfkcNAQtBCAwBCyADKAKQASgCEAtB//8DcUc6ACIgAyADLQAiQQFxBH8gAy8BaEEARwVBAAtBAXE6ACEgAyADLwFoBH8gAy0AIQVBAQtBAXE6ACAgAyADLQAiQQFxBH8gAygCkAEoAhBBAEcFQQALQQFxOgAfIAMCf0EBIAMtACJBAXENABpBASADKAKQASgCAEGAAXENABogAygCkAEvAVIgAy8BakcLQQFxOgAeIAMgAy0AHkEBcQR/IAMvAWpBAEcFQQALQQFxOgAdIAMgAy0AHkEBcQR/IAMoApABLwFSQQBHBUEAC0EBcToAHCADIAMoApQBNgI0IwBBEGsiACADKAI0NgIMIAAoAgwiACAAKAIwQQFqNgIwIAMtAB1BAXEEQCADIAMvAWpBABB6IgA2AgwgAEUEQCADKAKYAUEIakEYQQAQFyADKAI0EB4gA0F/NgKcAQwCCyADIAMoApgBIAMoAjQgAy8BakEAIAMoApgBKAIcIAMoAgwRKwAiADYCMCAARQRAIAMoAjQQHiADQX82ApwBDAILIAMoAjQQHiADIAMoAjA2AjQLIAMtACFBAXEEQCADIAMoApgBIAMoAjQgAy8BaBCiASIANgIwIABFBEAgAygCNBAeIANBfzYCnAEMAgsgAygCNBAeIAMgAygCMDYCNAsgAy0AIEEBcQRAIAMgAygCmAEgAygCNEEAEKEBIgA2AjAgAEUEQCADKAI0EB4gA0F/NgKcAQwCCyADKAI0EB4gAyADKAIwNgI0CyADLQAfQQFxBEAgAyADKAKYASADKAI0IAMoApABKAIQIAMoApABLwFQELgCIgA2AjAgAEUEQCADKAI0EB4gA0F/NgKcAQwCCyADKAI0EB4gAyADKAIwNgI0CyADLQAcQQFxBEAgA0EANgIEAkAgAygCkAEoAlQEQCADIAMoApABKAJUNgIEDAELIAMoApgBKAIcBEAgAyADKAKYASgCHDYCBAsLIAMgAygCkAEvAVJBARB6IgA2AgggAEUEQCADKAKYAUEIakEYQQAQFyADKAI0EB4gA0F/NgKcAQwCCyADIAMoApgBIAMoAjQgAygCkAEvAVJBASADKAIEIAMoAggRKwAiADYCMCAARQRAIAMoAjQQHiADQX82ApwBDAILIAMoAjQQHiADIAMoAjA2AjQLIAMgAygCmAEoAgAQOyIENwOAASAEQgBTBEAgAygCmAFBCGogAygCmAEoAgAQGiADQX82ApwBDAELIAMgAygCmAEgAygCNCADKQNwEKwCNgIsIAMoAjQgA0E4ahA5QQBIBEAgAygCmAFBCGogAygCNBAaIANBfzYCLAsgAyADKAI0ELICIgA6ACMgAEEYdEEYdUEASARAIAMoApgBQQhqIAMoAjQQGiADQX82AiwLIAMoAjQQHiADKAIsQQBIBEAgA0F/NgKcAQwBCyADIAMoApgBKAIAEDsiBDcDeCAEQgBTBEAgAygCmAFBCGogAygCmAEoAgAQGiADQX82ApwBDAELIAMoApgBKAIAIAMpA4gBEJ8BQQBIBEAgAygCmAFBCGogAygCmAEoAgAQGiADQX82ApwBDAELIAMpAzhC5ACDQuQAUgRAIAMoApgBQQhqQRRBABAXIANBfzYCnAEMAQsgAygCkAEoAgBBIHFFBEACQCADKQM4QhCDQgBSBEAgAygCkAEgAygCYDYCFAwBCyADKAKQAUEUahACGgsLIAMoApABIAMvAWg2AhAgAygCkAEgAygCZDYCGCADKAKQASADKQNQNwMoIAMoApABIAMpA3ggAykDgAF9NwMgIAMoApABIAMoApABLwEMQfn/A3EgAy0AI0EBdHI7AQwgAygCkAEgAygCJEGACHFBAEcQhAMgAyADKAKYASADKAKQASADKAIkEF0iADYCLCAAQQBIBEAgA0F/NgKcAQwBCyADKAIoIAMoAixHBEAgAygCmAFBCGpBFEEAEBcgA0F/NgKcAQwBCyADKAKYASgCACADKQN4EJ8BQQBIBEAgAygCmAFBCGogAygCmAEoAgAQGiADQX82ApwBDAELIANBADYCnAELIAMoApwBIQAgA0GgAWokACAAC68CAQF/IwBBIGsiAiAANgIcIAIgATYCGCACQQA2AhQgAkIANwMAAkAgAigCHC0AKEEBcUUEQCACKAIcKAIYIAIoAhwoAhRGDQELIAJBATYCFAsgAkIANwMIA0AgAikDCCACKAIcKQMwVARAAkACQCACKAIcKAJAIAIpAwinQQR0aigCCA0AIAIoAhwoAkAgAikDCKdBBHRqLQAMQQFxDQAgAigCHCgCQCACKQMIp0EEdGooAgRFDQEgAigCHCgCQCACKQMIp0EEdGooAgQoAgBFDQELIAJBATYCFAsgAigCHCgCQCACKQMIp0EEdGotAAxBAXFFBEAgAiACKQMAQgF8NwMACyACIAIpAwhCAXw3AwgMAQsLIAIoAhgEQCACKAIYIAIpAwA3AwALIAIoAhQLjRADAn8BfgF8IwBB4ABrIgEkACABIAA2AlgCQCABKAJYRQRAIAFBfzYCXAwBCyABIAEoAlggAUFAaxCwAjYCJCABKQNAUARAAkAgASgCWCgCBEEIcUUEQCABKAIkRQ0BCyABKAJYKAIAENUBQQBIBEACQAJ/IwBBEGsiAiABKAJYKAIANgIMIwBBEGsiACACKAIMQQxqNgIMIAAoAgwoAgBBFkYLBEAjAEEQayICIAEoAlgoAgA2AgwjAEEQayIAIAIoAgxBDGo2AgwgACgCDCgCBEEsRg0BCyABKAJYQQhqIAEoAlgoAgAQGiABQX82AlwMBAsLCyABKAJYEEEgAUEANgJcDAELIAEoAiRFBEAgASgCWBBBIAFBADYCXAwBCyABKQNAIAEoAlgpAzBWBEAgASgCWEEIakEUQQAQFyABQX82AlwMAQsgASABKQNAp0EDdBAbIgA2AiggAEUEQCABQX82AlwMAQsgAUJ/NwM4IAFCADcDSCABQgA3A1ADQCABKQNQIAEoAlgpAzBUBEACQCABKAJYKAJAIAEpA1CnQQR0aigCAEUNAAJAIAEoAlgoAkAgASkDUKdBBHRqKAIIDQAgASgCWCgCQCABKQNQp0EEdGotAAxBAXENACABKAJYKAJAIAEpA1CnQQR0aigCBEUNASABKAJYKAJAIAEpA1CnQQR0aigCBCgCAEUNAQsgAQJ+IAEpAzggASgCWCgCQCABKQNQp0EEdGooAgApA0hUBEAgASkDOAwBCyABKAJYKAJAIAEpA1CnQQR0aigCACkDSAs3AzgLIAEoAlgoAkAgASkDUKdBBHRqLQAMQQFxRQRAIAEpA0ggASkDQFoEQCABKAIoEBggASgCWEEIakEUQQAQFyABQX82AlwMBAsgASgCKCABKQNIp0EDdGogASkDUDcDACABIAEpA0hCAXw3A0gLIAEgASkDUEIBfDcDUAwBCwsgASkDSCABKQNAVARAIAEoAigQGCABKAJYQQhqQRRBABAXIAFBfzYCXAwBCwJAAn8jAEEQayIAIAEoAlgoAgA2AgwgACgCDCkDGEKAgAiDUAsEQCABQgA3AzgMAQsgASkDOEJ/UQRAIAFCfzcDGCABQgA3AzggAUIANwNQA0AgASkDUCABKAJYKQMwVARAIAEoAlgoAkAgASkDUKdBBHRqKAIABEAgASgCWCgCQCABKQNQp0EEdGooAgApA0ggASkDOFoEQCABIAEoAlgoAkAgASkDUKdBBHRqKAIAKQNINwM4IAEgASkDUDcDGAsLIAEgASkDUEIBfDcDUAwBCwsgASkDGEJ/UgRAIAEgASgCWCABKQMYIAEoAlhBCGoQggMiAzcDOCADUARAIAEoAigQGCABQX82AlwMBAsLCyABKQM4QgBWBEAgASgCWCgCACABKQM4EPECQQBIBEAgAUIANwM4CwsLIAEpAzhQBEAgASgCWCgCABDwAkEASARAIAEoAlhBCGogASgCWCgCABAaIAEoAigQGCABQX82AlwMAgsLIAEoAlgoAlQQ8wIgAUEANgIsIAFCADcDSANAAkAgASkDSCABKQNAWg0AIAEoAlgoAlQgASkDSCIDuiABKQNAuiIEoyADQgF8uiAEoxDyAiABIAEoAiggASkDSKdBA3RqKQMANwNQIAEgASgCWCgCQCABKQNQp0EEdGo2AhACQAJAIAEoAhAoAgBFDQAgASgCECgCACkDSCABKQM4Wg0ADAELIAECf0EBIAEoAhAoAggNABogASgCECgCBARAQQEgASgCECgCBCgCAEEBcQ0BGgsgASgCECgCBAR/IAEoAhAoAgQoAgBBwABxQQBHBUEACwtBAXE2AhQgASgCECgCBEUEQCABKAIQKAIAEEghACABKAIQIAA2AgQgAEUEQCABKAJYQQhqQQ5BABAXIAFBATYCLAwDCwsgASABKAIQKAIENgIMIAEoAlggASkDUBCMA0EASARAIAFBATYCLAwCCyABIAEoAlgoAgAQOyIDNwMwIANCAFMEQCABQQE2AiwMAgsgASgCDCABKQMwNwNIAkAgASgCFARAIAFBADYCCCABKAIQKAIIRQRAIAEgASgCWCABKAJYIAEpA1BBCEEAEKABIgA2AgggAEUEQCABQQE2AiwMBQsLIAEoAlgCfyABKAIIBEAgASgCCAwBCyABKAIQKAIICyABKAIMEK8CQQBIBEAgAUEBNgIsIAEoAggEQCABKAII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HAwCCwsgAygCDCgCAEENIAMoAggQFyADQQI2AhwLIAMoAhwhACADQSBqJAAgAAskAQF/IwBBEGsiASAANgIMIAEgASgCDDYCCCABKAIIQQE6AAwLywIBA38jAEHQAWsiAyQAIAMgAjYCzAFBACECIANBoAFqQQBBKBA0IAMgAygCzAE2AsgBAkBBACABIANByAFqIANB0ABqIANBoAFqEHJBAEgNACAAKAJMQQBOBEBBASECCyAAKAIAIQQgACwASkEATARAIAAgBEFfcTYCAAsgBEEgcSEFAn8gACgCMARAIAAgASADQcgBaiADQdAAaiADQaABahByDAELIABB0AA2AjAgACADQdAAajYCECAAIAM2AhwgACADNgIUIAAoAiwhBCAAIAM2AiwgACABIANByAFqIANB0ABqIANBoAFqEHIgBEUNABogAEEAQQAgACgCJBEAABogAEEANgIwIAAgBDYCLCAAQQA2AhwgAEEANgIQIAAoAhQaIABBADYCFEEACxogACAAKAIAIAVyNgIAIAJFDQALIANB0AFqJAALmQEBAX8jAEEgayIDJAAgAyAANgIYIAMgATYCFCADIAI3AwggAyADKAIYNgIEAkACQCADKQMIQv////8PWARAIAMoAgQoAhRBAE0NAQsgAygCBCgCAEESQQAQFyADQQA6AB8MAQsgAygCBCADKQMIPgIUIAMoAgQgAygCFDYCECADQQE6AB8LIAMtAB9BAXEhACADQSBqJAAgAAuQAQEBfyMAQRBrIgEkACABIAA2AgggASABKAIINgIEAkAgASgCBC0ABEEBcQRAIAEgASgCBEEQahCpATYCAAwBCyABIAEoAgRBEGoQxAI2AgALAkAgASgCAARAIAEoAgQoAgBBDSABKAIAEBcgAUEAOgAPDAELIAFBAToADwsgAS0AD0EBcSEAIAFBEGokACAAC8ABAQF/IwBBEGsiASQAIAEgADYCCCABIAEoAgg2AgQgASgCBEEANgIUIAEoAgRBADYCECABKAIEQQA2AiAgASgCBEEANgIcAkAgASgCBC0ABEEBcQRAIAEgASgCBEEQaiABKAIEKAIIENgCNgIADAELIAEgASgCBEEQahDJAjYCAAsCQCABKAIABEAgASgCBCgCAEENIAEoAgAQFyABQQA6AA8MAQsgAUEBOgAPCyABLQAPQQFx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QdH+ADYCBAwRCyABKAJQQQA2AmwgASgCUEHG/gA2AgQLA0ACQCABKAJQKAJsIAEoAlAoAmQgASgCUCgCaGpPDQADQAJAIAEgASgCUCgCUCABKAI8QQEgASgCUCgCWHRBAWtxQQJ0aigBADYBICABLQAhIAEoAjhNDQAgASgCREUNEiABIAEoAkRBf2o2AkQgASABKAJMIgBBAWo2AkwgASABKAI8IAAtAAAgASgCOHRqNgI8IAEgASgCOEEIajYCOAwBCwsCQCABLwEiQRBIBEAgASABKAI8IAEtACF2NgI8IAEgASgCOCABLQAhazYCOCABLwEiIQIgASgCUEH0AGohAyABKAJQIgQoAmwhACAEIABBAWo2AmwgAEEBdCADaiACOwEADAELAkAgAS8BIkEQRgRAA0AgASgCOCABLQAhQQJqSQRAIAEoAkRFDRUgASABKAJEQX9qNgJEIAEgASgCTCIAQQFqNgJMIAEgASgCPCAALQAAIAEoAjh0ajYCPCABIAEoAjhBCGo2AjgMAQsLIAEgASgCPCABLQAhdjYCPCABIAEoAjggAS0AIWs2AjggASgCUCgCbEUEQCABKAJYQbb0ADYCGCABKAJQQdH+ADYCBAwECyABIAEoAlAgASgCUCgCbEEBdGovAXI2AhQgASABKAI8QQNxQQNqNgIsIAEgASgCPEECdjYCPCABIAEoAjhBAms2AjgMAQsCQCABLwEiQRFGBEADQCABKAI4IAEtACFBA2pJBEAgASgCREUNFiABIAEoAkRBf2o2AkQgASABKAJMIgBBAWo2AkwgASABKAI8IAAtAAAgASgCOHRqNgI8IAEgASgCOEEIajYCOAwBCwsgASABKAI8IAEtACF2NgI8IAEgASgCOCABLQAhazYCOCABQQA2AhQgASABKAI8QQdxQQNqNgIsIAEgASgCPEEDdjYCPCABIAEoAjhBA2s2AjgMAQsDQCABKAI4IAEtACFBB2pJBEAgASgCREUNFSABIAEoAkRBf2o2AkQgASABKAJMIgBBAWo2AkwgASABKAI8IAAtAAAgASgCOHRqNgI8IAEgASgCOEEIajYCOAwBCwsgASABKAI8IAEtACF2NgI8IAEgASgCOCABLQAhazYCOCABQQA2AhQgASABKAI8Qf8AcUELajYCLCABIAEoAjxBB3Y2AjwgASABKAI4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IAEoAjwgAC0AACABKAI4dGo2AjwgASABKAI4QQhqNgI4DAELCyABIAEoAjwgAS0AGXY2AjwgASABKAI4IAEtABlrNgI4IAEoAlAiACABLQAZIAAoAsg3ajYCyDcLIAEgASgCPCABLQAhdjYCPCABIAEoAjggAS0AIWs2AjggASgCUCIAIAEtACEgACgCyDdqNgLINyABLQAgQcAAcQRAIAEoAlhBw/UANgIYIAEoAlBB0f4ANgIEDAwLIAEoAlAgAS8BIjYCSCABKAJQIAEtACBBD3E2AkwgASgCUEHL/gA2AgQLIAEoAlAoAkwEQANAIAEoAjggASgCUCgCTEkEQCABKAJERQ0MIAEgASgCREF/ajYCRCABIAEoAkwiAEEBajYCTCABIAEoAjwgAC0AACABKAI4dGo2AjwgASABKAI4QQhqNgI4DAELCyABKAJQIgAgACgCSCABKAI8QQEgASgCUCgCTHRBAWtxajYCSCABIAEoAjwgASgCUCgCTHY2AjwgASABKAI4IAEoAlAoAkxrNgI4IAEoAlAiACABKAJQKAJMIAAoAsg3ajYCyDcLIAEoAlBBzP4ANgIECyABKAJARQ0IIAEgASgCMCABKAJAazYCLAJAIAEoAlAoAkggASgCLEsEQCABIAEoAlAoAkggASgCLGs2AiwgASgCLCABKAJQKAIwSwRAIAEoAlAoAsQ3BEAgASgCWEHZ9QA2AhggASgCUEHR/gA2AgQMDQsLAkAgASgCLCABKAJQKAI0SwRAIAEgASgCLCABKAJQKAI0azYCLCABIAEoAlAoAjggASgCUCgCLCABKAIsa2o2AigMAQsgASABKAJQKAI4IAEoAlAoAjQgASgCLGtqNgIoCyABKAIsIAEoAlAoAkRLBEAgASABKAJQKAJENgIsCwwBCyABIAEoAkggASgCUCgCSGs2AiggASABKAJQKAJENgIsCyABKAIsIAEoAkBLBEAgASABKAJANgIsCyABIAEoAkAgASgCLGs2AkAgASgCUCIAIAAoAkQgASgCLGs2AkQDQCABIAEoAigiAEEBajYCKCAALQAAIQAgASABKAJIIgJBAWo2AkggAiAAOgAAIAEgASgCLEF/aiIANgIsIAANAAsgASgCUCgCREUEQCABKAJQQcj+ADYCBAsMCQsgASgCQEUNByABKAJQKAJEIQAgASAB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IAIgAigCUCIAQQFqNgJQIAIgAigCLCAALQAAIAIoAih0ajYCLCACIAIoAihBCGo2AigLIAJBEGogAigCJCACKAIsIAIoAhxxQQJ0aigBADYBAAJAAkADQCACIAItABE2AgwgAiACKAIsIAIoAgx2NgIsIAIgAigCKCACKAIMazYCKCACIAItABA2AgwgAigCDEUEQCACLwESIQAgAiACKAJIIgFBAWo2AkggASAAOgAADAILIAIoAgxBEHEEQCACIAIvARI2AgggAiACKAIMQQ9xNgIMIAIoAgwEQCACKAIoIAIoAgxJBEAgAiACKAJQIgBBAWo2AlAgAiACKAIsIAAtAAAgAigCKHRqNgIsIAIgAigCKEEIajYCKAsgAiACKAIIIAIoAixBASACKAIMdEEBa3FqNgIIIAIgAigCLCACKAIMdjYCLCACIAIoAiggAigCDGs2AigLIAIoAihBD0kEQCACIAIoAlAiAEEBajYCUCACIAIoAiwgAC0AACACKAIodGo2AiwgAiACKAIoQQhqNgIoIAIgAigCUCIAQQFqNgJQIAIgAigCLCAALQAAIAIoAih0ajYCLCACIAIoAihBCGo2AigLIAJBEGogAigCICACKAIsIAIoAhhxQQJ0aigBADYBAAJAA0AgAiACLQARNgIMIAIgAigCLCACKAIMdjYCLCACIAIoAiggAigCDGs2AiggAiACLQAQNgIMIAIoAgxBEHEEQCACIAIvARI2AgQgAiACKAIMQQ9xNgIMIAIoAiggAigCDEkEQCACIAIoAlAiAEEBajYCUCACIAIoAiwgAC0AACACKAIodGo2AiwgAiACKAIoQQhqNgIoIAIoAiggAigCDEkEQCACIAIoAlAiAEEBajYCUCACIAIoAiwgAC0AACACKAIodGo2AiwgAiACKAIoQQhqNgIoCwsgAiACKAIEIAIoAixBASACKAIMdEEBa3FqNgIEIAIgAigCLCACKAIMdjYCLCACIAIoAiggAigCDGs2AiggAiACKAJIIAIoAkRrNgIMAkAgAigCBCACKAIMSwRAIAIgAigCBCACKAIMazYCDCACKAIMIAIoAjhLBEAgAigCVCgCxDcEQCACKAJcQdDxADYCGCACKAJUQdH+ADYCBAwKCwsgAiACKAIwNgIAAkAgAigCNEUEQCACIAIoAgAgAigCPCACKAIMa2o2AgAgAigCDCACKAIISQRAIAIgAigCCCACKAIMazYCCANAIAIgAigCACIAQQFqNgIAIAAtAAAhACACIAIoAkgiAUEBajYCSCABIAA6AAAgAiACKAIMQX9qIgA2AgwgAA0ACyACIAIoAkggAigCBGs2AgALDAELAkAgAigCNCACKAIMSQRAIAIgAigCACACKAI8IAIoAjRqIAIoAgxrajYCACACIAIoAgwgAigCNGs2AgwgAigCDCACKAIISQRAIAIgAigCCCACKAIMazYCCANAIAIgAigCACIAQQFqNgIAIAAtAAAhACACIAIoAkgiAUEBajYCSCABIAA6AAAgAiACKAIMQX9qIgA2AgwgAA0ACyACIAIoAjA2AgAgAigCNCACKAIISQRAIAIgAigCNDYCDCACIAIoAgggAigCDGs2AggDQCACIAIoAgAiAEEBajYCACAALQAAIQAgAiACKAJIIgFBAWo2AkggASAAOgAAIAIgAigCDEF/aiIANgIMIAANAAsgAiACKAJIIAIoAgRrNgIACwsMAQsgAiACKAIAIAIoAjQgAigCDGtqNgIAIAIoAgwgAigCCEkEQCACIAIoAgggAigCDGs2AggDQCACIAIoAgAiAEEBajYCACAALQAAIQAgAiACKAJIIgFBAWo2AkggASAAOgAAIAIgAigCDEF/aiIANgIMIAANAAsgAiACKAJIIAIoAgRrNgIACwsLA0AgAigCCEECTUUEQCACIAIoAgAiAEEBajYCACAALQAAIQAgAiACKAJIIgFBAWo2AkggASAAOgAAIAIgAigCACIAQQFqNgIAIAAtAAAhACACIAIoAkgiAUEBajYCSCABIAA6AAAgAiACKAIAIgBBAWo2AgAgAC0AACEAIAIgAigCSCIBQQFqNgJIIAEgADoAACACIAIoAghBA2s2AggMAQsLDAELIAIgAigCSCACKAIEazYCAANAIAIgAigCACIAQQFqNgIAIAAtAAAhACACIAIoAkgiAUEBajYCSCABIAA6AAAgAiACKAIAIgBBAWo2AgAgAC0AACEAIAIgAigCSCIBQQFqNgJIIAEgADoAACACIAIoAgAiAEEBajYCACAALQAAIQAgAiACKAJIIgFBAWo2AkggASAAOgAAIAIgAigCCEEDazYCCCACKAIIQQJLDQALCyACKAIIBEAgAiACKAIA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AigoAmxBAE0NACACIAIoAigoAjggAigCKCgCbGpBf2o2AhggAiACKAIYLQAANgIcIAIoAhwhACACIAIoAhgiAUEBajYCGAJAIAEtAAEgAEcNACACKAIcIQAgAiACKAIYIgFBAWo2AhggAS0AASAARw0AIAIoAhwhACACIAIoAhgiAUEBajYCGCABLQABIABHDQAgAiACKAIoKAI4IAIoAigoAmxqQYICajYCFANAIAIoAhwhASACIAIoAhgiA0EBajYCGAJ/QQAgAy0AASABRw0AGiACKAIcIQEgAiACKAIYIgNBAWo2AhhBACADLQABIAFHDQAaIAIoAhwhASACIAIoAhgiA0EBajYCGEEAIAMtAAEgAUcNABogAigCHCEBIAIgAigCGCIDQQFqNgIYQQAgAy0AASABRw0AGiACKAIcIQEgAiACKAIYIgNBAWo2AhhBACADLQABIAFHDQAaIAIoAhwhASACIAIoAhgiA0EBajYCGEEAIAMtAAEgAUcNABogAigCHCEBIAIgAigCGCIDQQFqNgIYQQAgAy0AASABRw0AGiACKAIcIQEgAiACKAIYIgNBAWo2AhhBACADLQABIAFHDQAaIAIoAhggAigCFEkLQQFxDQALIAIoAihBggIgAigCFCACKAIYa2s2AmAgAigCKCgCYCACKAIoKAJ0SwRAIAIoAiggAigCKCgCdDYCYAsLCwJAIAIoAigoAmBBA08EQCACIAIoAigoAmBBfWo6ABMgAkEBOwEQIAIoAigiACgCpC0gACgCoC1BAXRqIAIvARA7AQAgAi0AEyEBIAIoAigiACgCmC0hAyAAIAAoAqAtIgBBAWo2AqAtIAAgA2ogAToAACACIAIvARBBf2o7ARAgAigCKCACLQATQaDdAGotAABBAnRqQZgJaiIAIAAvAQBBAWo7AQAgAigCKEGIE2oCfyACLwEQQYACSARAIAIvARAtAKBZDAELIAIvARBBB3VBgAJqLQCgWQtBAnRqIgAgAC8BAEEBajsBACACIAIoAigoAqAtIAIoAigoApwtQQFrRjYCICACKAIoIgAgACgCdCACKAIoKAJgazYCdCACKAIoIgAgAigCKCgCYCAAKAJsajYCbCACKAIoQQA2AmAMAQsgAiACKAIoIgAoAjggACgCbGotAAA6AA8gAigCKCIAKAKkLSAAKAKgLUEB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AUEGSARAIAJBATYCJAwBCwJAIAIoAiwoAoQBQQZGBEAgAkECNgIkDAELIAJBAzYCJAsLCyACIAIoAiggAigCJEEGdHI2AiggAigCLCgCbARAIAIgAigCKEEgcjYCKAsgAiACKAIoQR8gAigCKEEfcGtqNgIoIAIoAiwgAigCKBBMIAIoAiwoAmwEQCACKAIsIAIoAjgoAjBBEHYQTCACKAIsIAIoAjgoAjBB//8DcRBMC0EAQQBBABBAIQAgAigCOCAANgIwIAIoAixB8QA2AgQgAigCOBAfIAIoAiwoAhQEQCACKAIsQX82AiggAkEANgI8DAILCyACKAIsKAIEQTlGBEBBAEEAQQAQHSEAIAIoAjggADYCMCACKAIsKAIIIQEgAigCLCIDKAIUIQAgAyAAQQFqNgIUIAAgAWpBHzoAACACKAIsKAIIIQEgAigCLCIDKAIUIQAgAyAAQQFqNgIUIAAgAWpBiwE6AAAgAigCLCgCCCEBIAIoAiwiAygCFCEAIAMgAEEBajYCFCAAIAFqQQg6AAACQCACKAIsKAIcRQRAIAIoAiwoAgghASACKAIsIgMoAhQhACADIABBAWo2AhQgACABakEAOgAAIAIoAiwoAgghASACKAIsIgMoAhQhACADIABBAWo2AhQgACABakEAOgAAIAIoAiwoAgghASACKAIsIgMoAhQhACADIABBAWo2AhQgACABakEAOgAAIAIoAiwoAgghASACKAIsIgMoAhQhACADIABBAWo2AhQgACABakEAOgAAIAIoAiwoAgghASACKAIsIgMoAhQhACADIABBAWo2AhQgACABakEAOgAAAn9BAiACKAIsKAKEAUEJRg0AGkEBIQBBBEEAIAIoAiwoAogBQQJIBH8gAigCLCgChAFBAkgFQQELQQFxGwshACACKAIsKAIIIQMgAigCLCIEKAIUIQEgBCABQQFqNgIUIAEgA2ogADoAACACKAIsKAIIIQEgAigCLCIDKAIUIQAgAyAAQQFqNgIUIAAgAWpBAzoAACACKAIsQfEANgIEIAIoAjgQHyACKAIsKAIUBEAgAigCLEF/NgIoIAJBADYCPAwECwwBC0EBQQAgAigCLCgCHCgCABtBAkEAIAIoAiwoAhwoAiwbakEEQQAgAigCLCgCHCgCEBtqQQhBACACKAIsKAIcKAIcG2pBEEEA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ASgCHCgCCCEDIAEoAhwiBCgCFCEAIAQgAEEBajYCFCAAIANqIAI6AAAgASgCHCABKAIUQf//A3FBECABKAIcKAK8LWt1OwG4LSABKAIcIgAgACgCvC0gASgCGEEQa2o2ArwtDAELIAEoAhwiACAALwG4LUECIAEoAhwoArwtdHI7AbgtIAEoAhwiACABKAIYIAAoArwtajYCvC0LIAFB4ucALwEANgIQAkAgASgCHCgCvC1BECABKAIQa0oEQCABQeDnAC8BADYCDCABKAIcIgAgAC8BuC0gASgCDEH//wNxIAEoAhwoArwtdHI7AbgtIAEoAhwvAbgtQf8BcSECIAEoAhwoAgghAyABKAIcIgQoAhQhACAEIABBAWo2AhQgACADaiACOgAAIAEoAhwvAbgtQQh1IQIgASgCHCgCCCEDIAEoAhwiBCgCFCEAIAQgAEEBajYCFCAAIANqIAI6AAAgASgCHCABKAIMQf//A3FBECABKAIcKAK8LWt1OwG4LSABKAIcIgAgACgCvC0gASgCEEEQa2o2ArwtDAELIAEoAhwiACAALwG4LUHg5wAvAQAgASgCHCgCvC10cjsBuC0gASgCHCIAIAEoAhAgACgCvC1qNgK8LQsgASgCHBCtASABQSBqJAAL2QMCAn8CfiMAQSBrIgIkAAJAIAFC////////////AIMiBUKAgICAgIDA/0N8IAVCgICAgICAwIC8f3xUBEAgAUIEhiAAQjyIhCEEIABC//////////8PgyIAQoGAgICAgICACFoEQCAEQoGAgICAgICAwAB8IQQMAgsgBEKAgICAgICAgEB9IQQgAEKAgICAgICAgAiFQgBSDQEgBEIBgyAEfCEEDAELIABQIAVCgICAgICAwP//AFQgBUKAgICAgIDA//8AURtFBEAgAUIEhiAAQjyIhEL/////////A4NCgICAgICAgPz/AIQhBAwBC0KAgICAgICA+P8AIQQgBUL///////+//8MAVg0AQgAhBCAFQjCIpyIDQZH3AEkNACACIAAgAUL///////8/g0KAgICAgIDAAIQiBEGB+AAgA2sQ7gIgAkEQaiAAIAQgA0H/iH9qEOcCIAIpAwhCBIYgAikDACIAQjyIhCEEIAIpAxAgAikDGIRCAFKtIABC//////////8Pg4QiAEKBgICAgICAgAhaBEAgBEIBfCEEDAELIABCgICAgICAgIAIhUIAUg0AIARCAYMgBHwhBAsgAkEgaiQAIAQgAUKAgICAgICAgIB/g4S/C0UAQaCcAUIANwMAQZicAUIANwMAQZCcAUIANwMAQYicAUIANwMAQYCcAUIANwMAQfibAUIANwMAQfCbAUIANwMAQfCbAQsjAQF/IwBBEGsiASQAIAEgADYCDCABKAIMEK0BIAFBEGokAAuWAQEBfyMAQRBrIgEkACABIAA2AgwgASgCDCABKAIMQZQBajYCmBYgASgCDEGg3wA2AqAWIAEoAgwgASgCDEGIE2o2AqQWIAEoAgxBtN8ANgKsFiABKAIMIAEoAgxB/BRqNgKwFiABKAIMQcjfADYCuBYgASgCDEEAOwG4LSABKAIMQQA2ArwtIAEoAgwQrwEgAUEQaiQAC9cNAQF/IwBBIGsiAyAANgIYIAMgATYCFCADIAI2AhAgAyADKAIYQRB2NgIMIAMgAygCGEH//wNxNgIYAkAgAygCEEEBRgRAIAMgAygCFC0AACADKAIYajYCGCADKAIYQfH/A08EQCADIAMoAhhB8f8DazYCGAsgAyADKAIYIAMoAgxqNgIMIAMoAgxB8f8DTwRAIAMgAygCDEHx/wNrNgIMCyADIAMoAhggAygCDEEQdHI2AhwMAQsgAygCFEUEQCADQQE2AhwMAQsgAygCEEEQSQRAA0AgAyADKAIQIgBBf2o2AhAgAARAIAMgAygCFCIAQQFqNgIUIAMgAC0AACADKAIYajYCGCADIAMoAhggAygCDGo2AgwMAQsLIAMoAhhB8f8DTwRAIAMgAygCGEHx/wNrNgIYCyADIAMoAgxB8f8DcDYCDCADIAMoAhggAygCDEEQdHI2AhwMAQsDQCADKAIQQbArSUUEQCADIAMoAhBBsCtrNgIQIANB2wI2AggDQCADIAMoAhQtAAAgAygCGGo2AhggAyADKAIYIAMoAgxqNgIMIAMgAygCFC0AASADKAIYajYCGCADIAMoAhggAygCDGo2AgwgAyADKAIULQACIAMoAhhqNgIYIAMgAygCGCADKAIMajYCDCADIAMoAhQtAAMgAygCGGo2AhggAyADKAIYIAMoAgxqNgIMIAMgAygCFC0ABCADKAIYajYCGCADIAMoAhggAygCDGo2AgwgAyADKAIULQAFIAMoAhhqNgIYIAMgAygCGCADKAIMajYCDCADIAMoAhQtAAYgAygCGGo2AhggAyADKAIYIAMoAgxqNgIMIAMgAygCFC0AByADKAIYajYCGCADIAMoAhggAygCDGo2AgwgAyADKAIULQAIIAMoAhhqNgIYIAMgAygCGCADKAIMajYCDCADIAMoAhQtAAkgAygCGGo2AhggAyADKAIYIAMoAgxqNgIMIAMgAygCFC0ACiADKAIYajYCGCADIAMoAhggAygCDGo2AgwgAyADKAIULQALIAMoAhhqNgIYIAMgAygCGCADKAIMajYCDCADIAMoAhQtAAwgAygCGGo2AhggAyADKAIYIAMoAgxqNgIMIAMgAygCFC0ADSADKAIYajYCGCADIAMoAhggAygCDGo2AgwgAyADKAIULQAOIAMoAhhqNgIYIAMgAygCGCADKAIMajYCDCADIAMoAhQtAA8gAygCGGo2AhggAyADKAIYIAMoAgxqNgIMIAMgAygCFEEQajYCFCADIAMoAghBf2oiADYCCCAADQALIAMgAygCGEHx/wNwNgIYIAMgAygCDEHx/wNwNgIMDAELCyADKAIQBEADQCADKAIQQRBJRQRAIAMgAygCEEEQazYCECADIAMoAhQtAAAgAygCGGo2AhggAyADKAIYIAMoAgxqNgIMIAMgAygCFC0AASADKAIYajYCGCADIAMoAhggAygCDGo2AgwgAyADKAIULQACIAMoAhhqNgIYIAMgAygCGCADKAIMajYCDCADIAMoAhQtAAMgAygCGGo2AhggAyADKAIYIAMoAgxqNgIMIAMgAygCFC0ABCADKAIYajYCGCADIAMoAhggAygCDGo2AgwgAyADKAIULQAFIAMoAhhqNgIYIAMgAygCGCADKAIMajYCDCADIAMoAhQtAAYgAygCGGo2AhggAyADKAIYIAMoAgxqNgIMIAMgAygCFC0AByADKAIYajYCGCADIAMoAhggAygCDGo2AgwgAyADKAIULQAIIAMoAhhqNgIYIAMgAygCGCADKAIMajYCDCADIAMoAhQtAAkgAygCGGo2AhggAyADKAIYIAMoAgxqNgIMIAMgAygCFC0ACiADKAIYajYCGCADIAMoAhggAygCDGo2AgwgAyADKAIULQALIAMoAhhqNgIYIAMgAygCGCADKAIMajYCDCADIAMoAhQtAAwg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DAELIAMoAjQoAgAgAykDGKdBBHRqKQMIIAMpAxB9CzcDCCADKAIwIAMpAyCnaiADKAI0KAIAIAMpAxinQQR0aigCACADKQMQp2ogAykDCKcQHBogAykDCCADKAI0KAIAIAMpAxinQQR0aikDCCADKQMQfVEEQCADIAMpAxhCAXw3AxgLIAMgAykDCCADKQMgfDcDICADQgA3AxAMAQsLIAMoAjQiACADKQMgIAApAzh8NwM4IAMoAjQgAykDGDcDQCADIAMpAyA3AzgLIAMpAzghAiADQUBrJAAgAguuBAEBfyMAQUBqIgMkACADIAA2AjggAyABNwMwIAMgAjYCLAJAIAMpAzBQBEAgA0EAQgBBASADKAIsEE02AjwMAQsgAykDMCADKAI4KQMwVgRAIAMoAixBEkEAEBcgA0EANgI8DAELIAMoAjgoAigEQCADKAIsQR1BABAXIANBADYCPAwBCyADIAMoAjggAykDMBCxATcDICADIAMpAzAgAygCOCgCBCADKQMgp0EDdGopAwB9NwMYIAMpAxhQBEAgAyADKQMgQn98NwMgIAMgAygCOCgCACADKQMgp0EEdGopAwg3AxgLIAMgAygCOCgCACADKQMgp0EEdGopAwggAykDGH03AxAgAykDECADKQMwVgRAIAMoAixBHEEAEBcgA0EANgI8DAELIAMgAygCOCgCACADKQMgQgF8QQAgAygCLBBNIgA2AgwgAEUEQCADQQA2AjwMAQsgAygCDCgCACADKAIMKQMIQgF9p0EEdGogAykDGDcDCCADKAIMKAIEIAMoAgwpAwinQQN0aiADKQMwNwMAIAMoAgwgAykDMDcDMCADKAIMAn4gAygCOCkDGCADKAIMKQMIQgF9VARAIAMoAjgpAxgMAQsgAygCDCkDCEIBfQs3AxggAygCOCADKAIMNgIoIAMoAgwgAygCODYCKCADKAI4IAMoAgwpAwg3AyAgAygCDCADKQMgQgF8NwMgIAMgAygCDDYCPAsgAygCPCEAIANBQGskACAAC1EBAX4CQAJ+IANBwABxBEAgAiADQUBqrYghAUIADAELIANFDQEgAkHAACADa62GIAEgA60iBIiEIQEgAiAEiAshAgsgACABNwMAIAAgAjcDCAvTCQEBfyMAQfAAayIEJAAgBCAANgJkIAQgATYCYCAEIAI3A1ggBCADNgJUIAQgBCgCZDYCUAJAAkAgBCgCVCIAQRNLDQACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAEEBaw4TBwIMBAUKDwADCRELEA4IEgESDQYLQQBCAEEAIAQoAlAQTSEAIAQoAlAgADYCFCAARQRAIARCfzcDaAwTCyAEKAJQKAIUQgA3AzggBCgCUCgCFEIANwNAIARCADcDaAwSCyAEKAJQKAIQIAQpA1ggBCgCUBDtAiEAIAQoAlAgADYCFCAARQRAIARCfzcDaAwSCyAEKAJQKAIUIAQpA1g3AzggBCgCUCgCFCAEKAJQKAIUKQMINwNAIARCADcDaAwRCyAEQgA3A2gMEAsgBCgCUCgCEBA1IAQoAlAgBCgCUCgCFDYCECAEKAJQQQA2AhQgBEIANwNoDA8LIAQgBCgCUCAEKAJgIAQpA1gQRDcDaAwOCyAEKAJQKAIQEDUgBCgCUCgCFBA1IAQoAlAQGCAEQgA3A2gMDQsgBCgCUCgCEEIANwM4IAQoAlAoAhBCADcDQCAEQgA3A2gMDAsgBCkDWEL///////////8AVgRAIAQoAlBBEkEAEBcgBEJ/NwNoDAwLIAQgBCgCUCgCECAEKAJgIAQpA1gQ7AI3A2gMCwsgBEEAQgBBACAEKAJQEE02AkwgBCgCTEUEQCAEQn83A2gMCwsgBCgCUCgCEBA1IAQoAlAgBCgCTDYCECAEQgA3A2gMCgsgBCgCUCgCFBA1IAQoAlBBADYCFCAEQgA3A2gMCQsgBCAEKAJQKAIQIAQoAmAgBCkDWCAEKAJQELIBrDcDaAwICyAEIAQoAlAoAhQgBCgCYCAEKQNYIAQoAlAQsgGsNwNoDAcLIAQpA1hCOFQEQCAEKAJQQRJBABAXIARCfzcDaAwHCyAEIAQoAmA2AkggBCgCSBA+IAQoAkggBCgCUCgCDDYCKCAEKAJIIAQoAlAoAhApAzA3AxggBCgCSCAEKAJIKQMYNwMgIAQoAkhBADsBMCAEKAJIQQA7ATIgBCgCSELcATcDACAEQjg3A2gMBgsgBCgCUCAEKAJgKAIANgIMIARCADcDaAwFCyAEQX82AkAgBEETNgI8IARBCzYCOCAEQQ02AjQgBEEMNgIwIARBCjYCLCAEQQ82AiggBEEJNgIkIARBETYCICAEQQg2AhwgBEEHNgIYIARBBjYCFCAEQQU2AhAgBEEENgIMIARBAzYCCCAEQQI2AgQgBEEBNgIAIARBACAEEDY3A2gMBAsgBCgCUCgCECkDOEL///////////8AVgRAIAQoAlBBHkE9EBcgBEJ/NwNoDAQLIAQgBCgCUCgCECkDODcDaAwDCyAEKAJQKAIUKQM4Qv///////////wBWBEAgBCgCUEEeQT0QFyAEQn83A2gMAwsgBCAEKAJQKAIUKQM4NwNoDAILIAQpA1hC////////////AFYEQCAEKAJQQRJBABAXIARCfzcDaAwCCyAEIAQoAlAoAhQgBCgCYCAEKQNYIAQoAlAQ6wI3A2gMAQsgBCgCUEEcQQAQFyAEQn83A2gLIAQpA2ghAiAEQfAAaiQAIAILeQEBfyMAQRBrIgEkACABIAA2AggCQCABKAIIKAIkQQFGBEAgASgCCEEMakESQQAQFyABQX82AgwMAQsgASgCCEEAQgBBCBAkQgBTBEAgAUF/NgIMDAELIAEoAghBATYCJCABQQA2AgwLIAEoAgwhACABQRBqJAAgAAuDAQEBfyMAQRBrIgIkACACIAA2AgggAiABNwMAAkAgAigCCCgCJEEBRgRAIAIoAghBDGpBEkEAEBcgAkF/NgIMDAELIAIoAghBACACKQMAQREQJEIAUwRAIAJBfzYCDAwBCyACKAIIQQE2AiQgAkEANgIMCyACKAIMIQAgAkEQaiQAIAALWwEBfyMAQSBrIgMkACADIAA2AhwgAyABOQMQIAMgAjkDCCADKAIcBEAgAygCHCADKwMQOQMgIAMoAhwgAysDCDkDKCADKAIcRAAAAAAAAAAAEFcLIANBIGokAAtYAQF/IwBBEGsiASQAIAEgADYCDCABKAIMBEAgASgCDEQAAAAAAAAAADkDGCABKAIMKAIARAAAAAAAAAAAIAEoAgwoAgwgASgCDCgCBBEFAAsgAUEQaiQAC0gBAX8jAEEQayIBJAAgASAANgIMIAEoAgwEQCABKAIMKAIIBEAgASgCDCgCDCABKAIMKAIIEQYACyABKAIMEBgLIAFBEGokAAsrAQF/IwBBEGsiASQAIAEgADYCDCABKAIMRAAAAAAAAPA/EFcgAUEQaiQAC5wCAgF/AXwjAEEgayIBIAA3AxAgASABKQMQukQAAAAAAADoP6M5AwgCQCABKwMIRAAA4P///+9BZARAIAFBfzYCBAwBCyABAn8gASsDCCICRAAAAAAAAPBBYyACRAAAAAAAAAAAZnEEQCACqwwBC0EACzYCBAsCQCABKAIEQYCAgIB4SwRAIAFBgICAgHg2AhwMAQsgASABKAIEQX9qNgIEIAEgASgCBCABKAIEQQF2cjYCBCABIAEoAgQgASgCBEECdnI2AgQgASABKAIEIAEoAgRBBHZyNgIEIAEgASgCBCABKAIEQQh2cjYCBCABIAEoAgQgASgCBEEQdnI2AgQgASABKAIEQQFqNgIEIAEgASgCBDYCHAsgASgCHAuTAQEBfyMAQSBrIgMkACADIAA2AhggAyABNwMQIAMgAjYCDAJAIAMpAxBQBEAgA0EBOgAfDAELIAMgAykDEBD2AjYCCCADKAIIIAMoAhgoAgBNBEAgA0EBOgAfDAELIAMoAhggAygCCCADKAIMEFlBAXFFBEAgA0EAOgAfDAELIANBAToAHwsgAy0AHxogA0EgaiQAC7MCAgF/AX4jAEEwayIEJAAgBCAANgIkIAQgATYCICAEIAI2AhwgBCADNgIYAkACQCAEKAIkBEAgBCgCIA0BCyAEKAIYQRJBABAXIARCfzcDKAwBCyAEKAIkKQMIQgBWBEAgBCAEKAIgEH42AhQgBCAEKAIUIAQoAiQoAgBwNgIQIAQgBCgCJCgCECAEKAIQQQJ0aigCADYCDANAAkAgBCgCDEUNACAEKAIgIAQoAgwoAgAQWgRAIAQgBCgCDCgCGDYCDAwCBSAEKAIcQQhxBEAgBCgCDCkDCEJ/UgRAIAQgBCgCDCkDCDcDKAwGCwwCCyAEKAIMKQMQQn9SBEAgBCAEKAIMKQMQNwMoDAULCwsLCyAEKAIYQQlBABAXIARCfzcDKAsgBCkDKCEFIARBMGokACAFC0YBAX8jAEEQayIBJAAgASAANgIMA0AgASgCDARAIAEgASgCDCgCGDYCCCABKAIMEBggASABKAIINgIMDAELCyABQRBqJAALlwEBAX8jAEEQayIBJAAgASAANgIMIAEoAgwEQCABKAIMKAIQBEAgAUEANgIIA0AgASgCCCABKAIMKAIASQRAIAEoAgwoAhAgASgCCEECdGooAgAEQCABKAIMKAIQIAEoAghBAnRqKAIAEPkCCyABIAEoAghBAWo2AggMAQsLIAEoAgwoAhAQGAsgASgCDBAYCyABQRBqJAALdAEBfyMAQRBrIgEkACABIAA2AgggAUEYEBsiADYCBAJAIABFBEAgASgCCEEOQQAQFyABQQA2AgwMAQsgASgCBEEANgIAIAEoAgRCADcDCCABKAIEQQA2AhAgASABKAIENgIMCyABKAIMIQAgAUEQaiQAIAALnwEBAX8jAEEQayICIAA2AgwgAiABNgIIIAJBADYCBANAIAIoAgQgAigCDCgCREkEQCACKAIMKAJMIAIoAgRBAnRqKAIAIAIoAghGBEAgAigCDCgCTCACKAIEQQJ0aiACKAIMKAJMIAIoAgwoAkRBAWtBAnRqKAIANgIAIAIoAgwiACAAKAJEQX9qNgJEBSACIAIoAgRBAWo2AgQMAgsLCwtUAQF/IwBBEGsiASQAIAEgADYCDCABKAIMQQE6ACgCfyMAQRBrIgAgASgCDEEMajYCDCAAKAIMKAIARQsEQCABKAIMQQxqQQhBABAXCyABQRBqJAAL4QEBA38jAEEgayICJAAgAiAANgIYIAIgATYCFAJAIAIoAhgoAkRBAWogAigCGCgCSE8EQCACIAIoAhgoAkhBCmo2AgwgAiACKAIYKAJMIAIoAgxBAnQQSjYCECACKAIQRQRAIAIoAhhBCGpBDkEAEBcgAkF/NgIcDAILIAIoAhggAigCDDYCSCACKAIYIAIoAhA2AkwLIAIoAhQhASACKAIYKAJMIQMgAigCGCIEKAJEIQAgBCAAQQFqNgJEIABBAnQgA2ogATYCACACQQA2AhwLIAIoAhwhACACQSBqJAAgAAtAAQF/IwBBEGsiAiQAIAIgADYCDCACIAE2AgggAigCDCACKAIINgIsIAIoAgggAigCDBD+AiEAIAJBEGokACAAC8MJAQF/IwBB4MAAayIFJAAgBSAANgLUQCAFIAE2AtBAIAUgAjYCzEAgBSADNwPAQCAFIAQ2ArxAIAUgBSgC0EA2ArhAAkACQCAFKAK8QCIAQRBLDQACQAJAAkACQAJAAkACQAJAAkACQCAAQQFrDhAEAAYBAgUJCgoKCgoKCAoHAwsgBUIANwPYQAwKCyAFIAUoArhAQeQAaiAFKALMQCAFKQPAQBBENwPYQAwJCyAFKAK4QBAYIAVCADcD2EAMCAsgBSgCuEAoAhAEQCAFIAUoArhAKAIQIAUoArhAKQMYIAUoArhAQeQAahCBASIDNwOYQCADUARAIAVCfzcD2EAMCQsgBSgCuEApAwggBSkDmEB8IAUoArhAKQMIVARAIAUoArhAQeQAakEVQQAQFyAFQn83A9hADAkLIAUoArhAIgAgBSkDmEAgACkDAHw3AwAgBSgCuEAiACAFKQOYQCAAKQMIfDcDCCAFKAK4QEEANgIQCyAFKAK4QC0AeEEBcUUEQCAFQgA3A6hAA0AgBSkDqEAgBSgCuEApAwBUBEAgBQJ+QoDAACAFKAK4QCkDACAFKQOoQH1CgMAAVg0AGiAFKAK4QCkDACAFKQOoQH0LNwOgQCAFIAUoAtRAIAVBEGogBSkDoEAQMSIDNwOwQCADQgBTBEAgBSgCuEBB5ABqIAUoAtRAEBogBUJ/NwPYQAwLCyAFKQOwQFAEQCAFKAK4QEHkAGpBEUEAEBcgBUJ/NwPYQAwLBSAFIAUpA7BAIAUpA6hAfDcDqEAMAgsACwsLIAUoArhAIAUoArhAKQMANwMgIAVCADcD2EAMBwsgBSkDwEAgBSgCuEApAwggBSgCuEApAyB9VgRAIAUgBSgCuEApAwggBSgCuEApAyB9NwPAQAsgBSkDwEBQBEAgBUIANwPYQAwHCyAFKAK4QC0AeEEBcQRAIAUoAtRAIAUoArhAKQMgQQAQLUEASARAIAUoArhAQeQAaiAFKALUQBAaIAVCfzcD2EAMCAsLIAUgBSgC1EAgBSgCzEAgBSkDwEAQMSIDNwOwQCADQgBTBEAgBSgCuEBB5ABqQRFBABAXIAVCfzcD2EAMBwsgBSgCuEAiACAFKQOwQCAAKQMgfDcDICAFKQOwQFAEQCAFKAK4QCkDICAFKAK4QCkDCFQEQCAFKAK4QEHkAGpBEUEAEBcgBUJ/NwPYQAwICwsgBSAFKQOwQDcD2EAMBgsgBSAFKAK4QCkDICAFKAK4QCkDAH0gBSgCuEApAwggBSgCuEApAwB9IAUoAsxAIAUpA8BAIAUoArhAQeQAahCIATcDCCAFKQMIQgBTBEAgBUJ/NwPYQAwGCyAFKAK4QCAFKQMIIAUoArhAKQMAfDcDICAFQgA3A9hADAULIAUgBSgCzEA2AgQgBSgCBCAFKAK4QEEoaiAFKAK4QEHkAGoQjAFBAEgEQCAFQn83A9hADAULIAVCADcD2EAMBAsgBSAFKAK4QCwAYKw3A9hADAMLIAUgBSgCuEApA3A3A9hADAILIAUgBSgCuEApAyAgBSgCuEApAwB9NwPYQAwBCyAFKAK4QEHkAGpBHEEAEBcgBUJ/NwPYQAsgBSkD2EAhAyAFQeDAAGokACADC1YBAX8jAEEgayIEJAAgBCAANgIcIAQgATYCGCAEIAI3AxAgBCADNwMIIAQoAhggBCkDECAEKQMIQQBBAEEAQgAgBCgCHEEIahCAASEAIARBIGokACAAC7UDAQF/IwBBMGsiAyQAIAMgADYCJCADIAE3AxggAyACNgIUIAMgAygCJCADKQMYIAMoAhQQgQEiATcDCAJAIAFQBEAgA0IANwMoDAELIAMgAygCJCgCQCADKQMYp0EEdGooAgA2AgQCQCADKQMIIAMoAgQpAyB8IAMpAwhaBEAgAykDCCADKAIEKQMgfEL///////////8AWA0BCyADKAIUQQRBFhAXIANCADcDKAwBCyADIAMoAgQpAyAgAykDCHw3AwggAygCBC8BDEEIcQRAIAMoAiQoAgAgAykDCEEAEC1BAEgEQCADKAIUIAMoAiQoAgAQGiADQgA3AygMAgsgAygCJCgCACADQgQQMUIEUgRAIAMoAhQgAygCJCgCABAaIANCADcDKAwCCyADKAAAQdCWncAARgRAIAMgAykDCEIEfDcDCAsgAyADKQMIQgx8NwMIIAMoAgRBABCCAUEBcQRAIAMgAykDCEIIfDcDCAsgAykDCEL///////////8AVgRAIAMoAhRBBEEWEBcgA0IANwMoDAILCyADIAMpAwg3AygLIAMpAyghASADQTBqJAAgAQuLAgACQCAABH8gAUH/AE0NAQJAQcyZASgCACgCAEUEQCABQYB/cUGAvwNGDQMMAQsgAUH/D00EQCAAIAFBP3FBgAFyOgABIAAgAUEGdkHAAXI6AABBAg8LIAFBgLADT0EAIAFBgEBxQYDAA0cbRQRAIAAgAUE/cUGAAXI6AAIgACABQQx2QeABcjoAACAAIAFBBnZBP3FBgAFyOgABQQMPCyABQYCAfGpB//8/TQRAIAAgAUE/cUGAAXI6AAMgACABQRJ2QfABcjoAACAAIAFBBnZBP3FBgAFyOgACIAAgAUEMdkE/cUGAAXI6AAFBBA8LC0G0nAFBGTYCAEF/BUEBCw8LIAAgAToAAEEBC/8BAQF/IwBBEGsiAiQAIAIgADYCDCACIAE6AAsCQCACKAIMKAIQQQ5GBEAgAigCDEE/OwEKDAELIAIoAgwoAhBBDEYEQCACKAIMQS47AQoMAQsCQCACLQALQQFxRQRAIAIoAgxBABCCAUEBcUUNAQsgAigCDEEtOwEKDAELAkAgAigCDCgCEEEIRwRAIAIoAgwvAVJBAUcNAQsgAigCDEEUOwEKDAELIAIgAigCDCgCMBBgIgA7AQggAEH//wNxQQBKBEAgAigCDCgCMCgCACACLwEIQQFrai0AAEEvRgRAIAIoAgxBFDsBCgwCCwsgAigCDEEKOwEKCyACQRBqJAALwAIBAX8jAEEwayICJAAgAiAANgIoIAJBgAI7ASYgAiABNgIgIAIgAi8BJkGAAnFBAEc6ABsgAkEeQS4gAi0AG0EBcRs2AhwCQCACKAIoQRpBHCACLQAbQQFxG6xBARAtQQBIBEAgAigCICACKAIoEBogAkF/NgIsDAELIAIgAigCKEEEQQYgAi0AG0EBcRusIAJBDmogAigCIBBDIgA2AgggAEUEQCACQX82AiwMAQsgAkEANgIUA0AgAigCFEECQQMgAi0AG0EBcRtIBEAgAiACKAIIECBB//8DcSACKAIcajYCHCACIAIoAhRBAWo2AhQMAQsLIAIoAggQSUEBcUUEQCACKAIgQRRBABAXIAIoAggQGSACQX82AiwMAQsgAigCCBAZIAIgAigCHDYCLAsgAigCLCEAIAJBMGokACAAC40EAQF/IwBBIGsiAiQAIAIgADYCGCACIAE2AhQCQCACKAIYKAIQQeMARwRAIAJBAToAHwwBCyACIAIoAhgoAjQgAkESakGBsgJBgAZBABCDATYCCAJAIAIoAggEQCACLwESQQdODQELIAIoAhRBFUEAEBcgAkEAOgAfDAELIAIgAigCCCACLwESrRArIgA2AgwgAEUEQCACKAIUQRRBABAXIAJBADoAHwwBCyACQQE6AAcCQCACKAIMECBBf2oiAEEBTQRAIABBAWsNASACKAIYKQMoQhRUBEAgAkEAOgAHCwwBCyACKAIUQRhBABAXIAIoAgwQGSACQQA6AB8MAQsgAigCDEICECEvAABBwYoBRwRAIAIoAhRBGEEAEBcgAigCDBAZIAJBADoAHwwBCwJAIAIoAgwQhgFBf2oiAEECTQRAAkACQAJAIABBAWsOAgECAAsgAkGBAjsBBAwDCyACQYICOwEEDAILIAJBgwI7AQQMAQsgAigCFEEYQQAQFyACKAIMEBkgAkEAOgAfDAELIAIvARJBB0cEQCACKAIUQRVBABAXIAIoAgwQGSACQQA6AB8MAQsgAigCGCACLQAHQQFxOgAGIAIoAhggAi8BBDsBUiACKAIMECBB//8DcSEAIAIoAhggADYCECACKAIMEBkgAkEBOgAfCyACLQAfQQFxIQAgAkEgaiQAIAALuQEBAX8jAEEwayICJAAgAiAAOwEuIAIgATsBLCACQgA3AgAgAkEANgIoIAJCADcCICACQgA3AhggAkIANwIQIAJCADcCCCACQQA2AiAgAiACLwEsQQl1QdAAajYCFCACIAIvASxBBXVBD3FBAWs2AhAgAiACLwEsQR9xNgIMIAIgAi8BLkELdTYCCCACIAIvAS5BBXVBP3E2AgQgAiACLwEuQQF0QT5xNgIAIAIQCCEAIAJBMGokACAAC0wBAn8jAEEQayIAJAAgAEHYABAbIgE2AggCQCABRQRAIABBADYCDAwBCyAAKAIIEFwgACAAKAIINgIMCyAAKAIMIQEgAEEQaiQAIAELYAEBfyMAQRBrIgMkAAJ+An9BACAAKAI8IAGnIAFCIIinIAJB/wFxIANBCGoQCyIARQ0AGkG0nAEgADYCAEF/C0UEQCADKQMIDAELIANCfzcDCEJ/CyEBIANBEGokACABC+AIAQF/IwBBwAFrIgMkACADIAA2ArQBIAMgATYCsAEgAyACNwOoASADIAMoArQBKAIAEDsiAjcDIAJAIAJCAFMEQCADKAK0AUEIaiADKAK0ASgCABAaIANCfzcDuAEMAQsgAyADKQMgNwOgASADQQA6ABcgA0IANwMYA0AgAykDGCADKQOoAVQEQCADIAMoArQBKAJAIAMoArABIAMpAxinQQN0aikDAKdBBHRqNgIMIAMgAygCtAECfyADKAIMKAIEBEAgAygCDCgCBAwBCyADKAIMKAIAC0GABBBdIgA2AhAgAEEASARAIANCfzcDuAEMAwsgAygCEARAIANBAToAFwsgAyADKQMYQgF8NwMYDAELCyADIAMoArQBKAIAEDsiAjcDICACQgBTBEAgAygCtAFBCGogAygCtAEoAgAQGiADQn83A7gBDAELIAMgAykDICADKQOgAX03A5gBAkAgAykDoAFC/////w9YBEAgAykDqAFC//8DWA0BCyADQQE6ABcLIAMgA0EwakLiABArIgA2AiwgAEUEQCADKAK0AUEIakEOQQAQFyADQn83A7gBDAELIAMtABdBAXEEQCADKAIsQdbXAEEEEEIgAygCLEIsEC8gAygCLEEtECIgAygCLEEtECIgAygCLEEAECMgAygCLEEAECMgAygCLCADKQOoARAvIAMoAiwgAykDqAEQLyADKAIsIAMpA5gBEC8gAygCLCADKQOgARAvIAMoAixB29cAQQQQQiADKAIsQQAQIyADKAIsIAMpA6ABIAMpA5gBfBAvIAMoAixBARAjCyADKAIsQeDXAEEEEEIgAygCLEEAECMgAygCLAJ+Qv//AyADKQOoAUL//wNaDQAaIAMpA6gBC6dB//8DcRAiIAMoAiwCfkL//wMgAykDqAFC//8DWg0AGiADKQOoAQunQf//A3EQIiADKAIsAn9BfyADKQOYAUL/////D1oNABogAykDmAGnCxAjIAMoAiwCf0F/IAMpA6ABQv////8PWg0AGiADKQOgAacLECMgAwJ/IAMoArQBLQAoQQFxBEAgAygCtAEoAiQMAQsgAygCtAEoAiALNgKUASADKAIsAn8gAygClAEEQCADKAKUAS8BBAwBC0EAC0H//wNxECICfyMAQRBrIgAgAygCLDYCDCAAKAIMLQAAQQFxRQsEQCADKAK0AUEIakEUQQAQFyADKAIsEBkgA0J/NwO4AQwBCyADKAK0AQJ/IwBBEGsiACADKAIsNgIMIAAoAgwoAgQLAn4jAEEQayIAIAMoAiw2AgwCfiAAKAIMLQAAQQFxBEAgACgCDCkDEAwBC0IACwsQPEEASARAIAMoAiwQGSADQn83A7gBDAELIAMoAiwQGSADKAKUAQRAIAMoArQBIAMoApQBKAIAIAMoApQBLwEErRA8QQBIBEAgA0J/NwO4AQwCCwsgAyADKQOYATcDuAELIAMpA7gBIQIgA0HAAWokACACC8cCAQZ/IwBBIGsiAyQAIAMgACgCHCIFNgIQIAAoAhQhBCADIAI2AhwgAyABNgIYIAMgBCAFayIBNgIUIAEgAmohBkECIQUgA0EQaiEBA0ACQAJ/IAYCfwJ/QQAgACgCPCABIAUgA0EMahAWIgRFDQAaQbScASAENgIAQX8LBEAgA0F/NgIMQX8MAQsgAygCDAsiBEYEQCAAIAAoAiwiATYCHCAAIAE2AhQgACABIAAoAjBqNgIQIAIMAQsgBEF/Sg0BIABBADYCHCAAQgA3AxAgACAAKAIAQSByNgIAQQAgBUECRg0AGiACIAEoAgRrCyEAIANBIGokACAADwsgAUEIaiABIAQgASgCBCIHSyIIGyIBIAQgB0EAIAgbayIHIAEoAgBqNgIAIAEgASgCBCAHazYCBCAGIARrIQYgBSAIayEFDAAACwALtgUBAX8jAEEwayICJAAgAiAANgIoIAIgATcDIAJAIAIpAyAgAigCKCkDMFoEQCACKAIoQQhqQRJBABAXIAJBfzYCLAwBCyACIAIoAigoAkAgAikDIKdBBHRqNgIcAkAgAigCHCgCAARAIAIoAhwoAgAtAARBAXFFDQELIAJBADYCLAwBCyACKAIcKAIAKQNIQhp8Qv///////////wBWBEAgAigCKEEIakEEQRYQFyACQX82AiwMAQsgAigCKCgCACACKAIcKAIAKQNIQhp8QQAQLUEASARAIAIoAihBCGogAigCKCgCABAaIAJBfzYCLAwBCyACIAIoAigoAgBCBCACQRhqIAIoAihBCGoQQyIANgIUIABFBEAgAkF/NgIsDAELIAIgAigCFBAgOwESIAIgAigCFBAgOwEQIAIoAhQQSUEBcUUEQCACKAIUEBkgAigCKEEIakEUQQAQFyACQX82AiwMAQsgAigCFBAZIAIvARBBAEoEQCACKAIoKAIAIAIvARKtQQEQLUEASARAIAIoAihBCGpBBEG0nAEoAgAQFyACQX82AiwMAgsgAkEAIAIoAigoAgAgAi8BEEEAIAIoAihBCGoQYTYCCCACKAIIRQRAIAJBfzYCLAwCCyACKAIIIAIvARBBgAIgAkEMaiACKAIoQQhqEMMBQQFxRQRAIAIoAggQGCACQX82AiwMAgsgAigCCBAYIAIoAgwEQCACIAIoAgwQwgE2AgwgAigCHCgCACgCNCACKAIMEMQBIQAgAigCHCgCACAANgI0CwsgAigCHCgCAEEBOgAEAkAgAigCHCgCBEUNACACKAIcKAIELQAEQQFxDQAgAigCHCgCBCACKAIcKAIAKAI0NgI0IAIoAhwoAgRBAToABAsgAkEANgIsCyACKAIsIQAgAkEw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c2lvbiBtZXRob2QAaW52YWxpZCB3aW5kb3cgc2l6ZQB1bmtub3duIGhlYWRlciBmbGFncyBzZXQAaGVhZGVyIGNyYyBtaXNtYXRjaABpbnZhbGlkIGJsb2NrIHR5cGUAaW52YWxpZCBzdG9yZWQgYmxvY2sgbGVuZ3RocwB0b28gbWFueSBsZW5ndGggb3IgZGlzdGFuY2Ugc3ltYm9scwBpbnZhbGlkIGNvZGUgbGVuZ3RocyBzZXQAaW52YWxpZCBiaXQgbGVuZ3RoIHJlcGVhdABpbnZhbGlkIGNvZGUgLS0gbWlzc2luZyBlbmQtb2YtYmxvY2sAaW52YWxpZCBsaXRlcmFsL2xlbmd0aHMgc2V0AGludmFsaWQgZGlzdGFuY2VzIHNldABpbnZhbGlkIGxpdGVyYWwvbGVuZ3RoIGNvZGUAaW52YWxpZCBkaXN0YW5jZSBjb2RlAGludmFsaWQgZGlzdGFuY2UgdG9vIGZhciBiYWNrAGluY29ycmVjdCBkYXRhIGNoZWNrAGluY29ycmVjdCBsZW5ndGggY2hlY2sAQbD2AAuGEWAHAAAACFAAAAgQABQIcwASBx8AAAhwAAAIMAAACcAAEAcKAAAIYAAACCAAAAmgAAAIAAAACIAAAAhAAAAJ4AAQBwYAAAhYAAAIGAAACZAAEwc7AAAIeAAACDgAAAnQABEHEQAACGgAAAgoAAAJsAAACAgAAAiIAAAISAAACfAAEAcEAAAIVAAACBQAFQjjABMHKwAACHQAAAg0AAAJyAARBw0AAAhkAAAIJAAACagAAAgEAAAIhAAACEQAAAnoABAHCAAACFwAAAgcAAAJmAAUB1MAAAh8AAAIPAAACdgAEgcXAAAIbAAACCwAAAm4AAAIDAAACIwAAAhMAAAJ+AAQBwMAAAhSAAAIEgAVCKMAEwcjAAAIcgAACDIAAAnEABEHCwAACGIAAAgiAAAJpAAACAIAAAiCAAAIQgAACeQAEAcHAAAIWgAACBoAAAmUABQHQwAACHoAAAg6AAAJ1AASBxMAAAhqAAAIKgAACbQAAAgKAAAIigAACEoAAAn0ABAHBQAACFYAAAgWAEAIAAATBzMAAAh2AAAINgAACcwAEQcPAAAIZgAACCYAAAmsAAAIBgAACIYAAAhGAAAJ7AAQBwkAAAheAAAIHgAACZwAFAdjAAAI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OREjQzJCiYqLBQQmKCcNKh41jAcaSJMTlJUAQbCJAQvdDklsbGVnYWwgYnl0ZSBzZXF1ZW5jZQBEb21haW4gZXJyb3IAUmVzdWx0IG5vdCByZXByZXNlbnRhYmxlAE5vdCBhIHR0eQBQZXJtaXNzaW9uIGRlbmllZABPcGVyYXRpb24gbm90IHBlcm1pdHRlZABObyBzdWNoIGZpbGUgb3IgZGlyZWN0b3J5AE5vIHN1Y2ggcHJvY2VzcwBGaWxlIGV4aXN0cwBWYWx1ZSB0b28gbGFyZ2UgZm9yIGRhdGEgdHlwZQBObyBzcGFjZSBsZWZ0IG9uIGRldmljZQBPdXQgb2YgbWVtb3J5AFJlc291cmNlIGJ1c3kASW50ZXJydXB0ZWQgc3lzdGVtIGNhbGwAUmVzb3VyY2UgdGVtcG9yYXJpbHkgdW5hdmFpbGFibGUASW52YWxpZCBzZWVrAENyb3NzLWRldmljZSBsaW5rAFJlYWQtb25seSBmaWxlIHN5c3RlbQBEaXJlY3Rvcnkgbm90IGVtcHR5AENvbm5lY3Rpb24gcmVzZXQgYnkgcGVlcgBPcGVyYXRpb24gdGltZWQgb3V0AENvbm5lY3Rpb24gcmVmdXNlZABIb3N0IGlzIGRvd24ASG9zdCBpcyB1bnJlYWNoYWJsZQBBZGRyZXNzIGluIHVzZQBCcm9rZW4gcGlwZQBJL08gZXJyb3IATm8gc3VjaCBkZXZpY2Ugb3IgYWRkcmVzcwBCbG9jayBkZXZpY2UgcmVxdWlyZWQATm8gc3VjaCBkZXZpY2UATm90IGEgZGlyZWN0b3J5AElzIGEgZGlyZWN0b3J5AFRleHQgZmlsZSBidXN5AEV4ZWMgZm9ybWF0IGVycm9yAEludmFsaWQgYXJndW1lbnQAQXJndW1lbnQgbGlzdCB0b28gbG9uZwBTeW1ib2xpYyBsaW5rIGxvb3AARmlsZW5hbWUgdG9vIGxvbmcAVG9vIG1hbnkgb3BlbiBmaWxlcyBpbiBzeXN0ZW0ATm8gZmlsZSBkZXNjcmlwdG9ycyBhdmFpbGFibGUAQmFkIGZpbGUgZGVzY3JpcHRvcgBObyBjaGlsZCBwcm9jZXNzAEJhZCBhZGRyZXNzAEZpbGUgdG9vIGxhcmdlAFRvbyBtYW55IGxpbmtzAE5vIGxvY2tzIGF2YWlsYWJsZQBSZXNvdXJjZSBkZWFkbG9jayB3b3VsZCBvY2N1cgBTdGF0ZSBub3QgcmVjb3ZlcmFibGUAUHJldmlvdXMgb3duZXIgZGllZABPcGVyYXRpb24gY2FuY2VsZWQARnVuY3Rpb24gbm90IGltcGxlbWVudGVkAE5vIG1lc3NhZ2Ugb2YgZGVzaXJlZCB0eXBlAElkZW50aWZpZXIgcmVtb3ZlZABEZXZpY2Ugbm90IGEgc3RyZWFtAE5vIGRhdGEgYXZhaWxhYmxlAERldmljZSB0aW1lb3V0AE91dCBvZiBzdHJlYW1zIHJlc291cmNlcwBMaW5rIGhhcyBiZWVuIHNldmVyZWQAUHJvdG9jb2wgZXJyb3IAQmFkIG1lc3NhZ2UARmlsZSBkZXNjcmlwdG9yIGluIGJhZCBzdGF0ZQBOb3QgYSBzb2NrZXQARGVzdGluYXRpb24gYWRkcmVzcyByZXF1aXJlZABNZXNzYWdlIHRvbyBsYXJnZQBQcm90b2NvbCB3cm9uZyB0eXBlIGZvciBzb2NrZXQAUHJvdG9jb2wgbm90IGF2YWlsYWJsZQBQcm90b2NvbCBub3Qgc3VwcG9ydGVkAFNvY2tldCB0eXBlIG5vdCBzdXBwb3J0ZWQATm90IHN1cHBvcnRlZABQcm90b2NvbCBmYW1pbHkgbm90IHN1cHBvcnRlZABBZGRyZXNzIGZhbWlseSBub3Qgc3VwcG9ydGVkIGJ5IHByb3RvY29sAEFkZHJlc3Mgbm90IGF2YWlsYWJsZQBOZXR3b3JrIGlzIGRvd24ATmV0d29yayB1bnJlYWNoYWJsZQBDb25uZWN0aW9uIHJlc2V0IGJ5IG5ldHdvcmsAQ29ubmVjdGlvbiBhYm9ydGVkAE5vIGJ1ZmZlciBzcGFjZSBhdmFpbGFibGUAU29ja2V0IGlzIGNvbm5lY3RlZABTb2NrZXQgbm90IGNvbm5lY3RlZABDYW5ub3Qgc2VuZCBhZnRlciBzb2NrZXQgc2h1dGRvd24AT3BlcmF0aW9uIGFscmVhZHkgaW4gcHJvZ3Jlc3MAT3BlcmF0aW9uIGluIHByb2dyZXNzAFN0YWxlIGZpbGUgaGFuZGxlAFJlbW90ZSBJL08gZXJyb3IAUXVvdGEgZXhjZWVkZWQATm8gbWVkaXVtIGZvdW5kAFdyb25nIG1lZGl1bSB0eXBlAE5vIGVycm9yIGluZm9ybWF0aW9uAABVbmtub3duIGVycm9yICVkACVzJXMlcwAAOiAAL3Byb2Mvc2VsZi9mZC8AL2Rldi91cmFuZG9tAHJ3YQAlcy5YWFhYWFgAcitiAHJiAFBLBQYAQcyZAQsCYE4AQYSaAQvsAQwAAAANAAAADgAAAA8AAAAQAAAAEQAAABIAAAATAAAAFAAAAA0AAAAOAAAADwAAABAAAAARAAAAEgAAABMAAAABAAAACAAAAARNAAAkTQAAHwAAAGRNAAADAAAAAAAAAC30UVjPjLHARva1yykxA8cEW3AwtF39IHh/i5rYWSlQaEiJq6dWA2z/t82IP9R3tCulo3DxuuSo/EGD/dlv4Yp6Ly10lgcfDQleA3YscPdApSynb1dBqKp036BYZANKx8Q8U66vXxgEFbHjbSiGqwykv0Pw6VCBOVcWUjf/////////////////////";
if (!isDataURI(wasmBinaryFile)) {
  wasmBinaryFile = locateFile(wasmBinaryFile);
}
function getBinary() {
  try {
    if (wasmBinary) {
      return new Uint8Array(wasmBinary);
    }
    var binary = tryParseAsDataURI(wasmBinaryFile);
    if (binary) {
      return binary;
    }
    if (readBinary) {
      return readBinary(wasmBinaryFile);
    } else {
      throw "sync fetching of the wasm failed: you can preload it to Module['wasmBinary'] manually, or emcc.py will do that for you when generating HTML (but not JS)";
    }
  } catch (err) {
    abort(err);
  }
}
function createWasm() {
  var info = { env: asmLibraryArg, wasi_unstable: asmLibraryArg };
  function receiveInstance(instance, module) {
    var exports = instance.exports;
    Module["asm"] = exports;
    removeRunDependency("wasm-instantiate");
  }
  addRunDependency("wasm-instantiate");
  function instantiateSync() {
    var instance;
    var module;
    var binary;
    try {
      binary = getBinary();
      module = new WebAssembly.Module(binary);
      instance = new WebAssembly.Instance(module, info);
    } catch (e) {
      var str = e.toString();
      err("failed to compile wasm module: " + str);
      if (
        str.indexOf("imported Memory") >= 0 ||
        str.indexOf("memory import") >= 0
      ) {
        err(
          "Memory size incompatibility issues may be due to changing TOTAL_MEMORY at runtime to something too large. Use ALLOW_MEMORY_GROWTH to allow any size memory (and also make sure not to set TOTAL_MEMORY at runtime to something smaller than it was at compile time)."
        );
      }
      throw e;
    }
    receiveInstance(instance, module);
  }
  if (Module["instantiateWasm"]) {
    try {
      var exports = Module["instantiateWasm"](info, receiveInstance);
      return exports;
    } catch (e) {
      err("Module.instantiateWasm callback failed with error: " + e);
      return false;
    }
  }
  instantiateSync();
  return Module["asm"];
}
var tempDouble;
var tempI64;
__ATINIT__.push({
  func: function() {
    ___wasm_call_ctors();
  }
});
function demangle(func) {
  return func;
}
function demangleAll(text) {
  var regex = /\b_Z[\w\d_]+/g;
  return text.replace(regex, function(x) {
    var y = demangle(x);
    return x === y ? x : y + " [" + x + "]";
  });
}
function jsStackTrace() {
  var err = new Error();
  if (!err.stack) {
    try {
      throw new Error(0);
    } catch (e) {
      err = e;
    }
    if (!err.stack) {
      return "(no stack trace available)";
    }
  }
  return err.stack.toString();
}
function stackTrace() {
  var js = jsStackTrace();
  if (Module["extraStackTrace"]) js += "\n" + Module["extraStackTrace"]();
  return demangleAll(js);
}
function ___lock() {}
var PATH = {
  splitPath: function(filename) {
    var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
    return splitPathRe.exec(filename).slice(1);
  },
  normalizeArray: function(parts, allowAboveRoot) {
    var up = 0;
    for (var i = parts.length - 1; i >= 0; i--) {
      var last = parts[i];
      if (last === ".") {
        parts.splice(i, 1);
      } else if (last === "..") {
        parts.splice(i, 1);
        up++;
      } else if (up) {
        parts.splice(i, 1);
        up--;
      }
    }
    if (allowAboveRoot) {
      for (; up; up--) {
        parts.unshift("..");
      }
    }
    return parts;
  },
  normalize: function(path) {
    var isAbsolute = path.charAt(0) === "/",
      trailingSlash = path.substr(-1) === "/";
    path = PATH.normalizeArray(
      path.split("/").filter(function(p) {
        return !!p;
      }),
      !isAbsolute
    ).join("/");
    if (!path && !isAbsolute) {
      path = ".";
    }
    if (path && trailingSlash) {
      path += "/";
    }
    return (isAbsolute ? "/" : "") + path;
  },
  dirname: function(path) {
    var result = PATH.splitPath(path),
      root = result[0],
      dir = result[1];
    if (!root && !dir) {
      return ".";
    }
    if (dir) {
      dir = dir.substr(0, dir.length - 1);
    }
    return root + dir;
  },
  basename: function(path) {
    if (path === "/") return "/";
    var lastSlash = path.lastIndexOf("/");
    if (lastSlash === -1) return path;
    return path.substr(lastSlash + 1);
  },
  extname: function(path) {
    return PATH.splitPath(path)[3];
  },
  join: function() {
    var paths = Array.prototype.slice.call(arguments, 0);
    return PATH.normalize(paths.join("/"));
  },
  join2: function(l, r) {
    return PATH.normalize(l + "/" + r);
  }
};
function ___setErrNo(value) {
  if (Module["___errno_location"])
    HEAP32[Module["___errno_location"]() >> 2] = value;
  return value;
}
var PATH_FS = {
  resolve: function() {
    var resolvedPath = "",
      resolvedAbsolute = false;
    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path = i >= 0 ? arguments[i] : FS.cwd();
      if (typeof path !== "string") {
        throw new TypeError("Arguments to path.resolve must be strings");
      } else if (!path) {
        return "";
      }
      resolvedPath = path + "/" + resolvedPath;
      resolvedAbsolute = path.charAt(0) === "/";
    }
    resolvedPath = PATH.normalizeArray(
      resolvedPath.split("/").filter(function(p) {
        return !!p;
      }),
      !resolvedAbsolute
    ).join("/");
    return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
  },
  relative: function(from, to) {
    from = PATH_FS.resolve(from).substr(1);
    to = PATH_FS.resolve(to).substr(1);
    function trim(arr) {
      var start = 0;
      for (; start < arr.length; start++) {
        if (arr[start] !== "") break;
      }
      var end = arr.length - 1;
      for (; end >= 0; end--) {
        if (arr[end] !== "") break;
      }
      if (start > end) return [];
      return arr.slice(start, end - start + 1);
    }
    var fromParts = trim(from.split("/"));
    var toParts = trim(to.split("/"));
    var length = Math.min(fromParts.length, toParts.length);
    var samePartsLength = length;
    for (var i = 0; i < length; i++) {
      if (fromParts[i] !== toParts[i]) {
        samePartsLength = i;
        break;
      }
    }
    var outputParts = [];
    for (var i = samePartsLength; i < fromParts.length; i++) {
      outputParts.push("..");
    }
    outputParts = outputParts.concat(toParts.slice(samePartsLength));
    return outputParts.join("/");
  }
};
var TTY = {
  ttys: [],
  init: function() {},
  shutdown: function() {},
  register: function(dev, ops) {
    TTY.ttys[dev] = { input: [], output: [], ops: ops };
    FS.registerDevice(dev, TTY.stream_ops);
  },
  stream_ops: {
    open: function(stream) {
      var tty = TTY.ttys[stream.node.rdev];
      if (!tty) {
        throw new FS.ErrnoError(43);
      }
      stream.tty = tty;
      stream.seekable = false;
    },
    close: function(stream) {
      stream.tty.ops.flush(stream.tty);
    },
    flush: function(stream) {
      stream.tty.ops.flush(stream.tty);
    },
    read: function(stream, buffer, offset, length, pos) {
      if (!stream.tty || !stream.tty.ops.get_char) {
        throw new FS.ErrnoError(60);
      }
      var bytesRead = 0;
      for (var i = 0; i < length; i++) {
        var result;
        try {
          result = stream.tty.ops.get_char(stream.tty);
        } catch (e) {
          throw new FS.ErrnoError(29);
        }
        if (result === undefined && bytesRead === 0) {
          throw new FS.ErrnoError(6);
        }
        if (result === null || result === undefined) break;
        bytesRead++;
        buffer[offset + i] = result;
      }
      if (bytesRead) {
        stream.node.timestamp = Date.now();
      }
      return bytesRead;
    },
    write: function(stream, buffer, offset, length, pos) {
      if (!stream.tty || !stream.tty.ops.put_char) {
        throw new FS.ErrnoError(60);
      }
      try {
        for (var i = 0; i < length; i++) {
          stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
        }
      } catch (e) {
        throw new FS.ErrnoError(29);
      }
      if (length) {
        stream.node.timestamp = Date.now();
      }
      return i;
    }
  },
  default_tty_ops: {
    get_char: function(tty) {
      if (!tty.input.length) {
        var result = null;
        if (ENVIRONMENT_IS_NODE) {
          var BUFSIZE = 256;
          var buf = Buffer.alloc ? Buffer.alloc(BUFSIZE) : new Buffer(BUFSIZE);
          var bytesRead = 0;
          try {
            bytesRead = nodeFS.readSync(
              process.stdin.fd,
              buf,
              0,
              BUFSIZE,
              null
            );
          } catch (e) {
            if (e.toString().indexOf("EOF") != -1) bytesRead = 0;
            else throw e;
          }
          if (bytesRead > 0) {
            result = buf.slice(0, bytesRead).toString("utf-8");
          } else {
            result = null;
          }
        } else if (
          typeof window != "undefined" &&
          typeof window.prompt == "function"
        ) {
          result = window.prompt("Input: ");
          if (result !== null) {
            result += "\n";
          }
        } else if (typeof readline == "function") {
          result = readline();
          if (result !== null) {
            result += "\n";
          }
        }
        if (!result) {
          return null;
        }
        tty.input = intArrayFromString(result, true);
      }
      return tty.input.shift();
    },
    put_char: function(tty, val) {
      if (val === null || val === 10) {
        out(UTF8ArrayToString(tty.output, 0));
        tty.output = [];
      } else {
        if (val != 0) tty.output.push(val);
      }
    },
    flush: function(tty) {
      if (tty.output && tty.output.length > 0) {
        out(UTF8ArrayToString(tty.output, 0));
        tty.output = [];
      }
    }
  },
  default_tty1_ops: {
    put_char: function(tty, val) {
      if (val === null || val === 10) {
        err(UTF8ArrayToString(tty.output, 0));
        tty.output = [];
      } else {
        if (val != 0) tty.output.push(val);
      }
    },
    flush: function(tty) {
      if (tty.output && tty.output.length > 0) {
        err(UTF8ArrayToString(tty.output, 0));
        tty.output = [];
      }
    }
  }
};
var MEMFS = {
  ops_table: null,
  mount: function(mount) {
    return MEMFS.createNode(null, "/", 16384 | 511, 0);
  },
  createNode: function(parent, name, mode, dev) {
    if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
      throw new FS.ErrnoError(63);
    }
    if (!MEMFS.ops_table) {
      MEMFS.ops_table = {
        dir: {
          node: {
            getattr: MEMFS.node_ops.getattr,
            setattr: MEMFS.node_ops.setattr,
            lookup: MEMFS.node_ops.lookup,
            mknod: MEMFS.node_ops.mknod,
            rename: MEMFS.node_ops.rename,
            unlink: MEMFS.node_ops.unlink,
            rmdir: MEMFS.node_ops.rmdir,
            readdir: MEMFS.node_ops.readdir,
            symlink: MEMFS.node_ops.symlink
          },
          stream: { llseek: MEMFS.stream_ops.llseek }
        },
        file: {
          node: {
            getattr: MEMFS.node_ops.getattr,
            setattr: MEMFS.node_ops.setattr
          },
          stream: {
            llseek: MEMFS.stream_ops.llseek,
            read: MEMFS.stream_ops.read,
            write: MEMFS.stream_ops.write,
            allocate: MEMFS.stream_ops.allocate,
            mmap: MEMFS.stream_ops.mmap,
            msync: MEMFS.stream_ops.msync
          }
        },
        link: {
          node: {
            getattr: MEMFS.node_ops.getattr,
            setattr: MEMFS.node_ops.setattr,
            readlink: MEMFS.node_ops.readlink
          },
          stream: {}
        },
        chrdev: {
          node: {
            getattr: MEMFS.node_ops.getattr,
            setattr: MEMFS.node_ops.setattr
          },
          stream: FS.chrdev_stream_ops
        }
      };
    }
    var node = FS.createNode(parent, name, mode, dev);
    if (FS.isDir(node.mode)) {
      node.node_ops = MEMFS.ops_table.dir.node;
      node.stream_ops = MEMFS.ops_table.dir.stream;
      node.contents = {};
    } else if (FS.isFile(node.mode)) {
      node.node_ops = MEMFS.ops_table.file.node;
      node.stream_ops = MEMFS.ops_table.file.stream;
      node.usedBytes = 0;
      node.contents = null;
    } else if (FS.isLink(node.mode)) {
      node.node_ops = MEMFS.ops_table.link.node;
      node.stream_ops = MEMFS.ops_table.link.stream;
    } else if (FS.isChrdev(node.mode)) {
      node.node_ops = MEMFS.ops_table.chrdev.node;
      node.stream_ops = MEMFS.ops_table.chrdev.stream;
    }
    node.timestamp = Date.now();
    if (parent) {
      parent.contents[name] = node;
    }
    return node;
  },
  getFileDataAsRegularArray: function(node) {
    if (node.contents && node.contents.subarray) {
      var arr = [];
      for (var i = 0; i < node.usedBytes; ++i) arr.push(node.contents[i]);
      return arr;
    }
    return node.contents;
  },
  getFileDataAsTypedArray: function(node) {
    if (!node.contents) return new Uint8Array();
    if (node.contents.subarray)
      return node.contents.subarray(0, node.usedBytes);
    return new Uint8Array(node.contents);
  },
  expandFileStorage: function(node, newCapacity) {
    var prevCapacity = node.contents ? node.contents.length : 0;
    if (prevCapacity >= newCapacity) return;
    var CAPACITY_DOUBLING_MAX = 1024 * 1024;
    newCapacity = Math.max(
      newCapacity,
      (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125)) | 0
    );
    if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
    var oldContents = node.contents;
    node.contents = new Uint8Array(newCapacity);
    if (node.usedBytes > 0)
      node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
    return;
  },
  resizeFileStorage: function(node, newSize) {
    if (node.usedBytes == newSize) return;
    if (newSize == 0) {
      node.contents = null;
      node.usedBytes = 0;
      return;
    }
    if (!node.contents || node.contents.subarray) {
      var oldContents = node.contents;
      node.contents = new Uint8Array(new ArrayBuffer(newSize));
      if (oldContents) {
        node.contents.set(
          oldContents.subarray(0, Math.min(newSize, node.usedBytes))
        );
      }
      node.usedBytes = newSize;
      return;
    }
    if (!node.contents) node.contents = [];
    if (node.contents.length > newSize) node.contents.length = newSize;
    else while (node.contents.length < newSize) node.contents.push(0);
    node.usedBytes = newSize;
  },
  node_ops: {
    getattr: function(node) {
      var attr = {};
      attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
      attr.ino = node.id;
      attr.mode = node.mode;
      attr.nlink = 1;
      attr.uid = 0;
      attr.gid = 0;
      attr.rdev = node.rdev;
      if (FS.isDir(node.mode)) {
        attr.size = 4096;
      } else if (FS.isFile(node.mode)) {
        attr.size = node.usedBytes;
      } else if (FS.isLink(node.mode)) {
        attr.size = node.link.length;
      } else {
        attr.size = 0;
      }
      attr.atime = new Date(node.timestamp);
      attr.mtime = new Date(node.timestamp);
      attr.ctime = new Date(node.timestamp);
      attr.blksize = 4096;
      attr.blocks = Math.ceil(attr.size / attr.blksize);
      return attr;
    },
    setattr: function(node, attr) {
      if (attr.mode !== undefined) {
        node.mode = attr.mode;
      }
      if (attr.timestamp !== undefined) {
        node.timestamp = attr.timestamp;
      }
      if (attr.size !== undefined) {
        MEMFS.resizeFileStorage(node, attr.size);
      }
    },
    lookup: function(parent, name) {
      throw FS.genericErrors[44];
    },
    mknod: function(parent, name, mode, dev) {
      return MEMFS.createNode(parent, name, mode, dev);
    },
    rename: function(old_node, new_dir, new_name) {
      if (FS.isDir(old_node.mode)) {
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {}
        if (new_node) {
          for (var i in new_node.contents) {
            throw new FS.ErrnoError(55);
          }
        }
      }
      delete old_node.parent.contents[old_node.name];
      old_node.name = new_name;
      new_dir.contents[new_name] = old_node;
      old_node.parent = new_dir;
    },
    unlink: function(parent, name) {
      delete parent.contents[name];
    },
    rmdir: function(parent, name) {
      var node = FS.lookupNode(parent, name);
      for (var i in node.contents) {
        throw new FS.ErrnoError(55);
      }
      delete parent.contents[name];
    },
    readdir: function(node) {
      var entries = [".", ".."];
      for (var key in node.contents) {
        if (!node.contents.hasOwnProperty(key)) {
          continue;
        }
        entries.push(key);
      }
      return entries;
    },
    symlink: function(parent, newname, oldpath) {
      var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
      node.link = oldpath;
      return node;
    },
    readlink: function(node) {
      if (!FS.isLink(node.mode)) {
        throw new FS.ErrnoError(28);
      }
      return node.link;
    }
  },
  stream_ops: {
    read: function(stream, buffer, offset, length, position) {
      var contents = stream.node.contents;
      if (position >= stream.node.usedBytes) return 0;
      var size = Math.min(stream.node.usedBytes - position, length);
      if (size > 8 && contents.subarray) {
        buffer.set(contents.subarray(position, position + size), offset);
      } else {
        for (var i = 0; i < size; i++)
          buffer[offset + i] = contents[position + i];
      }
      return size;
    },
    write: function(stream, buffer, offset, length, position, canOwn) {
      if (buffer.buffer === HEAP8.buffer) {
        canOwn = false;
      }
      if (!length) return 0;
      var node = stream.node;
      node.timestamp = Date.now();
      if (buffer.subarray && (!node.contents || node.contents.subarray)) {
        if (canOwn) {
          node.contents = buffer.subarray(offset, offset + length);
          node.usedBytes = length;
          return length;
        } else if (node.usedBytes === 0 && position === 0) {
          node.contents = new Uint8Array(
            buffer.subarray(offset, offset + length)
          );
          node.usedBytes = length;
          return length;
        } else if (position + length <= node.usedBytes) {
          node.contents.set(buffer.subarray(offset, offset + length), position);
          return length;
        }
      }
      MEMFS.expandFileStorage(node, position + length);
      if (node.contents.subarray && buffer.subarray)
        node.contents.set(buffer.subarray(offset, offset + length), position);
      else {
        for (var i = 0; i < length; i++) {
          node.contents[position + i] = buffer[offset + i];
        }
      }
      node.usedBytes = Math.max(node.usedBytes, position + length);
      return length;
    },
    llseek: function(stream, offset, whence) {
      var position = offset;
      if (whence === 1) {
        position += stream.position;
      } else if (whence === 2) {
        if (FS.isFile(stream.node.mode)) {
          position += stream.node.usedBytes;
        }
      }
      if (position < 0) {
        throw new FS.ErrnoError(28);
      }
      return position;
    },
    allocate: function(stream, offset, length) {
      MEMFS.expandFileStorage(stream.node, offset + length);
      stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
    },
    mmap: function(stream, buffer, offset, length, position, prot, flags) {
      if (!FS.isFile(stream.node.mode)) {
        throw new FS.ErrnoError(43);
      }
      var ptr;
      var allocated;
      var contents = stream.node.contents;
      if (!(flags & 2) && contents.buffer === buffer.buffer) {
        allocated = false;
        ptr = contents.byteOffset;
      } else {
        if (position > 0 || position + length < stream.node.usedBytes) {
          if (contents.subarray) {
            contents = contents.subarray(position, position + length);
          } else {
            contents = Array.prototype.slice.call(
              contents,
              position,
              position + length
            );
          }
        }
        allocated = true;
        var fromHeap = buffer.buffer == HEAP8.buffer;
        ptr = _malloc(length);
        if (!ptr) {
          throw new FS.ErrnoError(48);
        }
        (fromHeap ? HEAP8 : buffer).set(contents, ptr);
      }
      return { ptr: ptr, allocated: allocated };
    },
    msync: function(stream, buffer, offset, length, mmapFlags) {
      if (!FS.isFile(stream.node.mode)) {
        throw new FS.ErrnoError(43);
      }
      if (mmapFlags & 2) {
        return 0;
      }
      var bytesWritten = MEMFS.stream_ops.write(
        stream,
        buffer,
        0,
        length,
        offset,
        false
      );
      return 0;
    }
  }
};
var ERRNO_CODES = {
  EPERM: 63,
  ENOENT: 44,
  ESRCH: 71,
  EINTR: 27,
  EIO: 29,
  ENXIO: 60,
  E2BIG: 1,
  ENOEXEC: 45,
  EBADF: 8,
  ECHILD: 12,
  EAGAIN: 6,
  EWOULDBLOCK: 6,
  ENOMEM: 48,
  EACCES: 2,
  EFAULT: 21,
  ENOTBLK: 105,
  EBUSY: 10,
  EEXIST: 20,
  EXDEV: 75,
  ENODEV: 43,
  ENOTDIR: 54,
  EISDIR: 31,
  EINVAL: 28,
  ENFILE: 41,
  EMFILE: 33,
  ENOTTY: 59,
  ETXTBSY: 74,
  EFBIG: 22,
  ENOSPC: 51,
  ESPIPE: 70,
  EROFS: 69,
  EMLINK: 34,
  EPIPE: 64,
  EDOM: 18,
  ERANGE: 68,
  ENOMSG: 49,
  EIDRM: 24,
  ECHRNG: 106,
  EL2NSYNC: 156,
  EL3HLT: 107,
  EL3RST: 108,
  ELNRNG: 109,
  EUNATCH: 110,
  ENOCSI: 111,
  EL2HLT: 112,
  EDEADLK: 16,
  ENOLCK: 46,
  EBADE: 113,
  EBADR: 114,
  EXFULL: 115,
  ENOANO: 104,
  EBADRQC: 103,
  EBADSLT: 102,
  EDEADLOCK: 16,
  EBFONT: 101,
  ENOSTR: 100,
  ENODATA: 116,
  ETIME: 117,
  ENOSR: 118,
  ENONET: 119,
  ENOPKG: 120,
  EREMOTE: 121,
  ENOLINK: 47,
  EADV: 122,
  ESRMNT: 123,
  ECOMM: 124,
  EPROTO: 65,
  EMULTIHOP: 36,
  EDOTDOT: 125,
  EBADMSG: 9,
  ENOTUNIQ: 126,
  EBADFD: 127,
  EREMCHG: 128,
  ELIBACC: 129,
  ELIBBAD: 130,
  ELIBSCN: 131,
  ELIBMAX: 132,
  ELIBEXEC: 133,
  ENOSYS: 52,
  ENOTEMPTY: 55,
  ENAMETOOLONG: 37,
  ELOOP: 32,
  EOPNOTSUPP: 138,
  EPFNOSUPPORT: 139,
  ECONNRESET: 15,
  ENOBUFS: 42,
  EAFNOSUPPORT: 5,
  EPROTOTYPE: 67,
  ENOTSOCK: 57,
  ENOPROTOOPT: 50,
  ESHUTDOWN: 140,
  ECONNREFUSED: 14,
  EADDRINUSE: 3,
  ECONNABORTED: 13,
  ENETUNREACH: 40,
  ENETDOWN: 38,
  ETIMEDOUT: 73,
  EHOSTDOWN: 142,
  EHOSTUNREACH: 23,
  EINPROGRESS: 26,
  EALREADY: 7,
  EDESTADDRREQ: 17,
  EMSGSIZE: 35,
  EPROTONOSUPPORT: 66,
  ESOCKTNOSUPPORT: 137,
  EADDRNOTAVAIL: 4,
  ENETRESET: 39,
  EISCONN: 30,
  ENOTCONN: 53,
  ETOOMANYREFS: 141,
  EUSERS: 136,
  EDQUOT: 19,
  ESTALE: 72,
  ENOTSUP: 138,
  ENOMEDIUM: 148,
  EILSEQ: 25,
  EOVERFLOW: 61,
  ECANCELED: 11,
  ENOTRECOVERABLE: 56,
  EOWNERDEAD: 62,
  ESTRPIPE: 135
};
var NODEFS = {
  isWindows: false,
  staticInit: function() {
    NODEFS.isWindows = !!process.platform.match(/^win/);
    var flags = { fs: fs.constants };
    if (flags["fs"]) {
      flags = flags["fs"];
    }
    NODEFS.flagsForNodeMap = {
      1024: flags["O_APPEND"],
      64: flags["O_CREAT"],
      128: flags["O_EXCL"],
      0: flags["O_RDONLY"],
      2: flags["O_RDWR"],
      4096: flags["O_SYNC"],
      512: flags["O_TRUNC"],
      1: flags["O_WRONLY"]
    };
  },
  bufferFrom: function(arrayBuffer) {
    return Buffer["alloc"] ? Buffer.from(arrayBuffer) : new Buffer(arrayBuffer);
  },
  convertNodeCode: function(e) {
    var code = e.code;
    assert(code in ERRNO_CODES);
    return ERRNO_CODES[code];
  },
  mount: function(mount) {
    assert(ENVIRONMENT_HAS_NODE);
    return NODEFS.createNode(null, "/", NODEFS.getMode(mount.opts.root), 0);
  },
  createNode: function(parent, name, mode, dev) {
    if (!FS.isDir(mode) && !FS.isFile(mode) && !FS.isLink(mode)) {
      throw new FS.ErrnoError(28);
    }
    var node = FS.createNode(parent, name, mode);
    node.node_ops = NODEFS.node_ops;
    node.stream_ops = NODEFS.stream_ops;
    return node;
  },
  getMode: function(path) {
    var stat;
    try {
      stat = fs.lstatSync(path);
      if (NODEFS.isWindows) {
        stat.mode = stat.mode | ((stat.mode & 292) >> 2);
      }
    } catch (e) {
      if (!e.code) throw e;
      throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
    }
    return stat.mode;
  },
  realPath: function(node) {
    var parts = [];
    while (node.parent !== node) {
      parts.push(node.name);
      node = node.parent;
    }
    parts.push(node.mount.opts.root);
    parts.reverse();
    return PATH.join.apply(null, parts);
  },
  flagsForNode: function(flags) {
    flags &= ~2097152;
    flags &= ~2048;
    flags &= ~32768;
    flags &= ~524288;
    var newFlags = 0;
    for (var k in NODEFS.flagsForNodeMap) {
      if (flags & k) {
        newFlags |= NODEFS.flagsForNodeMap[k];
        flags ^= k;
      }
    }
    if (!flags) {
      return newFlags;
    } else {
      throw new FS.ErrnoError(28);
    }
  },
  node_ops: {
    getattr: function(node) {
      var path = NODEFS.realPath(node);
      var stat;
      try {
        stat = fs.lstatSync(path);
      } catch (e) {
        if (!e.code) throw e;
        throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
      }
      if (NODEFS.isWindows && !stat.blksize) {
        stat.blksize = 4096;
      }
      if (NODEFS.isWindows && !stat.blocks) {
        stat.blocks = ((stat.size + stat.blksize - 1) / stat.blksize) | 0;
      }
      return {
        dev: stat.dev,
        ino: stat.ino,
        mode: stat.mode,
        nlink: stat.nlink,
        uid: stat.uid,
        gid: stat.gid,
        rdev: stat.rdev,
        size: stat.size,
        atime: stat.atime,
        mtime: stat.mtime,
        ctime: stat.ctime,
        blksize: stat.blksize,
        blocks: stat.blocks
      };
    },
    setattr: function(node, attr) {
      var path = NODEFS.realPath(node);
      try {
        if (attr.mode !== undefined) {
          fs.chmodSync(path, attr.mode);
          node.mode = attr.mode;
        }
        if (attr.timestamp !== undefined) {
          var date = new Date(attr.timestamp);
          fs.utimesSync(path, date, date);
        }
        if (attr.size !== undefined) {
          fs.truncateSync(path, attr.size);
        }
      } catch (e) {
        if (!e.code) throw e;
        throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
      }
    },
    lookup: function(parent, name) {
      var path = PATH.join2(NODEFS.realPath(parent), name);
      var mode = NODEFS.getMode(path);
      return NODEFS.createNode(parent, name, mode);
    },
    mknod: function(parent, name, mode, dev) {
      var node = NODEFS.createNode(parent, name, mode, dev);
      var path = NODEFS.realPath(node);
      try {
        if (FS.isDir(node.mode)) {
          fs.mkdirSync(path, node.mode);
        } else {
          fs.writeFileSync(path, "", { mode: node.mode });
        }
      } catch (e) {
        if (!e.code) throw e;
        throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
      }
      return node;
    },
    rename: function(oldNode, newDir, newName) {
      var oldPath = NODEFS.realPath(oldNode);
      var newPath = PATH.join2(NODEFS.realPath(newDir), newName);
      try {
        fs.renameSync(oldPath, newPath);
      } catch (e) {
        if (!e.code) throw e;
        throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
      }
    },
    unlink: function(parent, name) {
      var path = PATH.join2(NODEFS.realPath(parent), name);
      try {
        fs.unlinkSync(path);
      } catch (e) {
        if (!e.code) throw e;
        throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
      }
    },
    rmdir: function(parent, name) {
      var path = PATH.join2(NODEFS.realPath(parent), name);
      try {
        fs.rmdirSync(path);
      } catch (e) {
        if (!e.code) throw e;
        throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
      }
    },
    readdir: function(node) {
      var path = NODEFS.realPath(node);
      try {
        return fs.readdirSync(path);
      } catch (e) {
        if (!e.code) throw e;
        throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
      }
    },
    symlink: function(parent, newName, oldPath) {
      var newPath = PATH.join2(NODEFS.realPath(parent), newName);
      try {
        fs.symlinkSync(oldPath, newPath);
      } catch (e) {
        if (!e.code) throw e;
        throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
      }
    },
    readlink: function(node) {
      var path = NODEFS.realPath(node);
      try {
        path = fs.readlinkSync(path);
        path = NODEJS_PATH.relative(
          NODEJS_PATH.resolve(node.mount.opts.root),
          path
        );
        return path;
      } catch (e) {
        if (!e.code) throw e;
        throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
      }
    }
  },
  stream_ops: {
    open: function(stream) {
      var path = NODEFS.realPath(stream.node);
      try {
        if (FS.isFile(stream.node.mode)) {
          stream.nfd = fs.openSync(path, NODEFS.flagsForNode(stream.flags));
        }
      } catch (e) {
        if (!e.code) throw e;
        throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
      }
    },
    close: function(stream) {
      try {
        if (FS.isFile(stream.node.mode) && stream.nfd) {
          fs.closeSync(stream.nfd);
        }
      } catch (e) {
        if (!e.code) throw e;
        throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
      }
    },
    read: function(stream, buffer, offset, length, position) {
      if (length === 0) return 0;
      try {
        return fs.readSync(
          stream.nfd,
          NODEFS.bufferFrom(buffer.buffer),
          offset,
          length,
          position
        );
      } catch (e) {
        throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
      }
    },
    write: function(stream, buffer, offset, length, position) {
      try {
        return fs.writeSync(
          stream.nfd,
          NODEFS.bufferFrom(buffer.buffer),
          offset,
          length,
          position
        );
      } catch (e) {
        throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
      }
    },
    llseek: function(stream, offset, whence) {
      var position = offset;
      if (whence === 1) {
        position += stream.position;
      } else if (whence === 2) {
        if (FS.isFile(stream.node.mode)) {
          try {
            var stat = fs.fstatSync(stream.nfd);
            position += stat.size;
          } catch (e) {
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
        }
      }
      if (position < 0) {
        throw new FS.ErrnoError(28);
      }
      return position;
    }
  }
};
var NODERAWFS = {
  lookupPath: function(path) {
    return { path: path, node: { mode: NODEFS.getMode(path) } };
  },
  createStandardStreams: function() {
    FS.streams[0] = {
      fd: 0,
      nfd: 0,
      position: 0,
      path: "",
      flags: 0,
      tty: true,
      seekable: false
    };
    for (var i = 1; i < 3; i++) {
      FS.streams[i] = {
        fd: i,
        nfd: i,
        position: 0,
        path: "",
        flags: 577,
        tty: true,
        seekable: false
      };
    }
  },
  cwd: function() {
    return process.cwd();
  },
  chdir: function() {
    process.chdir.apply(void 0, arguments);
  },
  mknod: function(path, mode) {
    if (FS.isDir(path)) {
      fs.mkdirSync(path, mode);
    } else {
      fs.writeFileSync(path, "", { mode: mode });
    }
  },
  mkdir: function() {
    fs.mkdirSync.apply(void 0, arguments);
  },
  symlink: function() {
    fs.symlinkSync.apply(void 0, arguments);
  },
  rename: function() {
    fs.renameSync.apply(void 0, arguments);
  },
  rmdir: function() {
    fs.rmdirSync.apply(void 0, arguments);
  },
  readdir: function() {
    fs.readdirSync.apply(void 0, arguments);
  },
  unlink: function() {
    fs.unlinkSync.apply(void 0, arguments);
  },
  readlink: function() {
    return fs.readlinkSync.apply(void 0, arguments);
  },
  stat: function() {
    return fs.statSync.apply(void 0, arguments);
  },
  lstat: function() {
    return fs.lstatSync.apply(void 0, arguments);
  },
  chmod: function() {
    fs.chmodSync.apply(void 0, arguments);
  },
  fchmod: function() {
    fs.fchmodSync.apply(void 0, arguments);
  },
  chown: function() {
    fs.chownSync.apply(void 0, arguments);
  },
  fchown: function() {
    fs.fchownSync.apply(void 0, arguments);
  },
  truncate: function() {
    fs.truncateSync.apply(void 0, arguments);
  },
  ftruncate: function() {
    fs.ftruncateSync.apply(void 0, arguments);
  },
  utime: function() {
    fs.utimesSync.apply(void 0, arguments);
  },
  open: function(path, flags, mode, suggestFD) {
    if (typeof flags === "string") {
      flags = VFS.modeStringToFlags(flags);
    }
    var nfd = fs.openSync(path, NODEFS.flagsForNode(flags), mode);
    var fd = suggestFD != null ? suggestFD : FS.nextfd(nfd);
    var stream = {
      fd: fd,
      nfd: nfd,
      position: 0,
      path: path,
      flags: flags,
      seekable: true
    };
    FS.streams[fd] = stream;
    return stream;
  },
  close: function(stream) {
    if (!stream.stream_ops) {
      fs.closeSync(stream.nfd);
    }
    FS.closeStream(stream.fd);
  },
  llseek: function(stream, offset, whence) {
    if (stream.stream_ops) {
      return VFS.llseek(stream, offset, whence);
    }
    var position = offset;
    if (whence === 1) {
      position += stream.position;
    } else if (whence === 2) {
      position += fs.fstatSync(stream.nfd).size;
    } else if (whence !== 0) {
      throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
    }
    if (position < 0) {
      throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
    }
    stream.position = position;
    return position;
  },
  read: function(stream, buffer, offset, length, position) {
    if (stream.stream_ops) {
      return VFS.read(stream, buffer, offset, length, position);
    }
    var seeking = typeof position !== "undefined";
    if (!seeking && stream.seekable) position = stream.position;
    var bytesRead = fs.readSync(
      stream.nfd,
      NODEFS.bufferFrom(buffer.buffer),
      offset,
      length,
      position
    );
    if (!seeking) stream.position += bytesRead;
    return bytesRead;
  },
  write: function(stream, buffer, offset, length, position) {
    if (stream.stream_ops) {
      return VFS.write(stream, buffer, offset, length, position);
    }
    if (stream.flags & +"1024") {
      FS.llseek(stream, 0, +"2");
    }
    var seeking = typeof position !== "undefined";
    if (!seeking && stream.seekable) position = stream.position;
    var bytesWritten = fs.writeSync(
      stream.nfd,
      NODEFS.bufferFrom(buffer.buffer),
      offset,
      length,
      position
    );
    if (!seeking) stream.position += bytesWritten;
    return bytesWritten;
  },
  allocate: function() {
    throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
  },
  mmap: function() {
    throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
  },
  msync: function() {
    return 0;
  },
  munmap: function() {
    return 0;
  },
  ioctl: function() {
    throw new FS.ErrnoError(ERRNO_CODES.ENOTTY);
  }
};
var FS = {
  root: null,
  mounts: [],
  devices: {},
  streams: [],
  nextInode: 1,
  nameTable: null,
  currentPath: "/",
  initialized: false,
  ignorePermissions: true,
  trackingDelegate: {},
  tracking: { openFlags: { READ: 1, WRITE: 2 } },
  ErrnoError: null,
  genericErrors: {},
  filesystems: null,
  syncFSRequests: 0,
  handleFSError: function(e) {
    if (!(e instanceof FS.ErrnoError)) throw e + " : " + stackTrace();
    return ___setErrNo(e.errno);
  },
  lookupPath: function(path, opts) {
    path = PATH_FS.resolve(FS.cwd(), path);
    opts = opts || {};
    if (!path) return { path: "", node: null };
    var defaults = { follow_mount: true, recurse_count: 0 };
    for (var key in defaults) {
      if (opts[key] === undefined) {
        opts[key] = defaults[key];
      }
    }
    if (opts.recurse_count > 8) {
      throw new FS.ErrnoError(32);
    }
    var parts = PATH.normalizeArray(
      path.split("/").filter(function(p) {
        return !!p;
      }),
      false
    );
    var current = FS.root;
    var current_path = "/";
    for (var i = 0; i < parts.length; i++) {
      var islast = i === parts.length - 1;
      if (islast && opts.parent) {
        break;
      }
      current = FS.lookupNode(current, parts[i]);
      current_path = PATH.join2(current_path, parts[i]);
      if (FS.isMountpoint(current)) {
        if (!islast || (islast && opts.follow_mount)) {
          current = current.mounted.root;
        }
      }
      if (!islast || opts.follow) {
        var count = 0;
        while (FS.isLink(current.mode)) {
          var link = FS.readlink(current_path);
          current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
          var lookup = FS.lookupPath(current_path, {
            recurse_count: opts.recurse_count
          });
          current = lookup.node;
          if (count++ > 40) {
            throw new FS.ErrnoError(32);
          }
        }
      }
    }
    return { path: current_path, node: current };
  },
  getPath: function(node) {
    var path;
    while (true) {
      if (FS.isRoot(node)) {
        var mount = node.mount.mountpoint;
        if (!path) return mount;
        return mount[mount.length - 1] !== "/"
          ? mount + "/" + path
          : mount + path;
      }
      path = path ? node.name + "/" + path : node.name;
      node = node.parent;
    }
  },
  hashName: function(parentid, name) {
    var hash = 0;
    for (var i = 0; i < name.length; i++) {
      hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
    }
    return ((parentid + hash) >>> 0) % FS.nameTable.length;
  },
  hashAddNode: function(node) {
    var hash = FS.hashName(node.parent.id, node.name);
    node.name_next = FS.nameTable[hash];
    FS.nameTable[hash] = node;
  },
  hashRemoveNode: function(node) {
    var hash = FS.hashName(node.parent.id, node.name);
    if (FS.nameTable[hash] === node) {
      FS.nameTable[hash] = node.name_next;
    } else {
      var current = FS.nameTable[hash];
      while (current) {
        if (current.name_next === node) {
          current.name_next = node.name_next;
          break;
        }
        current = current.name_next;
      }
    }
  },
  lookupNode: function(parent, name) {
    var err = FS.mayLookup(parent);
    if (err) {
      throw new FS.ErrnoError(err, parent);
    }
    var hash = FS.hashName(parent.id, name);
    for (var node = FS.nameTable[hash]; node; node = node.name_next) {
      var nodeName = node.name;
      if (node.parent.id === parent.id && nodeName === name) {
        return node;
      }
    }
    return FS.lookup(parent, name);
  },
  createNode: function(parent, name, mode, rdev) {
    if (!FS.FSNode) {
      FS.FSNode = function(parent, name, mode, rdev) {
        if (!parent) {
          parent = this;
        }
        this.parent = parent;
        this.mount = parent.mount;
        this.mounted = null;
        this.id = FS.nextInode++;
        this.name = name;
        this.mode = mode;
        this.node_ops = {};
        this.stream_ops = {};
        this.rdev = rdev;
      };
      FS.FSNode.prototype = {};
      var readMode = 292 | 73;
      var writeMode = 146;
      Object.defineProperties(FS.FSNode.prototype, {
        read: {
          get: function() {
            return (this.mode & readMode) === readMode;
          },
          set: function(val) {
            val ? (this.mode |= readMode) : (this.mode &= ~readMode);
          }
        },
        write: {
          get: function() {
            return (this.mode & writeMode) === writeMode;
          },
          set: function(val) {
            val ? (this.mode |= writeMode) : (this.mode &= ~writeMode);
          }
        },
        isFolder: {
          get: function() {
            return FS.isDir(this.mode);
          }
        },
        isDevice: {
          get: function() {
            return FS.isChrdev(this.mode);
          }
        }
      });
    }
    var node = new FS.FSNode(parent, name, mode, rdev);
    FS.hashAddNode(node);
    return node;
  },
  destroyNode: function(node) {
    FS.hashRemoveNode(node);
  },
  isRoot: function(node) {
    return node === node.parent;
  },
  isMountpoint: function(node) {
    return !!node.mounted;
  },
  isFile: function(mode) {
    return (mode & 61440) === 32768;
  },
  isDir: function(mode) {
    return (mode & 61440) === 16384;
  },
  isLink: function(mode) {
    return (mode & 61440) === 40960;
  },
  isChrdev: function(mode) {
    return (mode & 61440) === 8192;
  },
  isBlkdev: function(mode) {
    return (mode & 61440) === 24576;
  },
  isFIFO: function(mode) {
    return (mode & 61440) === 4096;
  },
  isSocket: function(mode) {
    return (mode & 49152) === 49152;
  },
  flagModes: {
    r: 0,
    rs: 1052672,
    "r+": 2,
    w: 577,
    wx: 705,
    xw: 705,
    "w+": 578,
    "wx+": 706,
    "xw+": 706,
    a: 1089,
    ax: 1217,
    xa: 1217,
    "a+": 1090,
    "ax+": 1218,
    "xa+": 1218
  },
  modeStringToFlags: function(str) {
    var flags = FS.flagModes[str];
    if (typeof flags === "undefined") {
      throw new Error("Unknown file open mode: " + str);
    }
    return flags;
  },
  flagsToPermissionString: function(flag) {
    var perms = ["r", "w", "rw"][flag & 3];
    if (flag & 512) {
      perms += "w";
    }
    return perms;
  },
  nodePermissions: function(node, perms) {
    if (FS.ignorePermissions) {
      return 0;
    }
    if (perms.indexOf("r") !== -1 && !(node.mode & 292)) {
      return 2;
    } else if (perms.indexOf("w") !== -1 && !(node.mode & 146)) {
      return 2;
    } else if (perms.indexOf("x") !== -1 && !(node.mode & 73)) {
      return 2;
    }
    return 0;
  },
  mayLookup: function(dir) {
    var err = FS.nodePermissions(dir, "x");
    if (err) return err;
    if (!dir.node_ops.lookup) return 2;
    return 0;
  },
  mayCreate: function(dir, name) {
    try {
      var node = FS.lookupNode(dir, name);
      return 20;
    } catch (e) {}
    return FS.nodePermissions(dir, "wx");
  },
  mayDelete: function(dir, name, isdir) {
    var node;
    try {
      node = FS.lookupNode(dir, name);
    } catch (e) {
      return e.errno;
    }
    var err = FS.nodePermissions(dir, "wx");
    if (err) {
      return err;
    }
    if (isdir) {
      if (!FS.isDir(node.mode)) {
        return 54;
      }
      if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
        return 10;
      }
    } else {
      if (FS.isDir(node.mode)) {
        return 31;
      }
    }
    return 0;
  },
  mayOpen: function(node, flags) {
    if (!node) {
      return 44;
    }
    if (FS.isLink(node.mode)) {
      return 32;
    } else if (FS.isDir(node.mode)) {
      if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
        return 31;
      }
    }
    return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
  },
  MAX_OPEN_FDS: 4096,
  nextfd: function(fd_start, fd_end) {
    fd_start = fd_start || 0;
    fd_end = fd_end || FS.MAX_OPEN_FDS;
    for (var fd = fd_start; fd <= fd_end; fd++) {
      if (!FS.streams[fd]) {
        return fd;
      }
    }
    throw new FS.ErrnoError(33);
  },
  getStream: function(fd) {
    return FS.streams[fd];
  },
  createStream: function(stream, fd_start, fd_end) {
    if (!FS.FSStream) {
      FS.FSStream = function() {};
      FS.FSStream.prototype = {};
      Object.defineProperties(FS.FSStream.prototype, {
        object: {
          get: function() {
            return this.node;
          },
          set: function(val) {
            this.node = val;
          }
        },
        isRead: {
          get: function() {
            return (this.flags & 2097155) !== 1;
          }
        },
        isWrite: {
          get: function() {
            return (this.flags & 2097155) !== 0;
          }
        },
        isAppend: {
          get: function() {
            return this.flags & 1024;
          }
        }
      });
    }
    var newStream = new FS.FSStream();
    for (var p in stream) {
      newStream[p] = stream[p];
    }
    stream = newStream;
    var fd = FS.nextfd(fd_start, fd_end);
    stream.fd = fd;
    FS.streams[fd] = stream;
    return stream;
  },
  closeStream: function(fd) {
    FS.streams[fd] = null;
  },
  chrdev_stream_ops: {
    open: function(stream) {
      var device = FS.getDevice(stream.node.rdev);
      stream.stream_ops = device.stream_ops;
      if (stream.stream_ops.open) {
        stream.stream_ops.open(stream);
      }
    },
    llseek: function() {
      throw new FS.ErrnoError(70);
    }
  },
  major: function(dev) {
    return dev >> 8;
  },
  minor: function(dev) {
    return dev & 255;
  },
  makedev: function(ma, mi) {
    return (ma << 8) | mi;
  },
  registerDevice: function(dev, ops) {
    FS.devices[dev] = { stream_ops: ops };
  },
  getDevice: function(dev) {
    return FS.devices[dev];
  },
  getMounts: function(mount) {
    var mounts = [];
    var check = [mount];
    while (check.length) {
      var m = check.pop();
      mounts.push(m);
      check.push.apply(check, m.mounts);
    }
    return mounts;
  },
  syncfs: function(populate, callback) {
    if (typeof populate === "function") {
      callback = populate;
      populate = false;
    }
    FS.syncFSRequests++;
    if (FS.syncFSRequests > 1) {
      console.log(
        "warning: " +
          FS.syncFSRequests +
          " FS.syncfs operations in flight at once, probably just doing extra work"
      );
    }
    var mounts = FS.getMounts(FS.root.mount);
    var completed = 0;
    function doCallback(err) {
      FS.syncFSRequests--;
      return callback(err);
    }
    function done(err) {
      if (err) {
        if (!done.errored) {
          done.errored = true;
          return doCallback(err);
        }
        return;
      }
      if (++completed >= mounts.length) {
        doCallback(null);
      }
    }
    mounts.forEach(function(mount) {
      if (!mount.type.syncfs) {
        return done(null);
      }
      mount.type.syncfs(mount, populate, done);
    });
  },
  mount: function(type, opts, mountpoint) {
    var root = mountpoint === "/";
    var pseudo = !mountpoint;
    var node;
    if (root && FS.root) {
      throw new FS.ErrnoError(10);
    } else if (!root && !pseudo) {
      var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
      mountpoint = lookup.path;
      node = lookup.node;
      if (FS.isMountpoint(node)) {
        throw new FS.ErrnoError(10);
      }
      if (!FS.isDir(node.mode)) {
        throw new FS.ErrnoError(54);
      }
    }
    var mount = { type: type, opts: opts, mountpoint: mountpoint, mounts: [] };
    var mountRoot = type.mount(mount);
    mountRoot.mount = mount;
    mount.root = mountRoot;
    if (root) {
      FS.root = mountRoot;
    } else if (node) {
      node.mounted = mount;
      if (node.mount) {
        node.mount.mounts.push(mount);
      }
    }
    return mountRoot;
  },
  unmount: function(mountpoint) {
    var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
    if (!FS.isMountpoint(lookup.node)) {
      throw new FS.ErrnoError(28);
    }
    var node = lookup.node;
    var mount = node.mounted;
    var mounts = FS.getMounts(mount);
    Object.keys(FS.nameTable).forEach(function(hash) {
      var current = FS.nameTable[hash];
      while (current) {
        var next = current.name_next;
        if (mounts.indexOf(current.mount) !== -1) {
          FS.destroyNode(current);
        }
        current = next;
      }
    });
    node.mounted = null;
    var idx = node.mount.mounts.indexOf(mount);
    node.mount.mounts.splice(idx, 1);
  },
  lookup: function(parent, name) {
    return parent.node_ops.lookup(parent, name);
  },
  mknod: function(path, mode, dev) {
    var lookup = FS.lookupPath(path, { parent: true });
    var parent = lookup.node;
    var name = PATH.basename(path);
    if (!name || name === "." || name === "..") {
      throw new FS.ErrnoError(28);
    }
    var err = FS.mayCreate(parent, name);
    if (err) {
      throw new FS.ErrnoError(err);
    }
    if (!parent.node_ops.mknod) {
      throw new FS.ErrnoError(63);
    }
    return parent.node_ops.mknod(parent, name, mode, dev);
  },
  create: function(path, mode) {
    mode = mode !== undefined ? mode : 438;
    mode &= 4095;
    mode |= 32768;
    return FS.mknod(path, mode, 0);
  },
  mkdir: function(path, mode) {
    mode = mode !== undefined ? mode : 511;
    mode &= 511 | 512;
    mode |= 16384;
    return FS.mknod(path, mode, 0);
  },
  mkdirTree: function(path, mode) {
    var dirs = path.split("/");
    var d = "";
    for (var i = 0; i < dirs.length; ++i) {
      if (!dirs[i]) continue;
      d += "/" + dirs[i];
      try {
        FS.mkdir(d, mode);
      } catch (e) {
        if (e.errno != 20) throw e;
      }
    }
  },
  mkdev: function(path, mode, dev) {
    if (typeof dev === "undefined") {
      dev = mode;
      mode = 438;
    }
    mode |= 8192;
    return FS.mknod(path, mode, dev);
  },
  symlink: function(oldpath, newpath) {
    if (!PATH_FS.resolve(oldpath)) {
      throw new FS.ErrnoError(44);
    }
    var lookup = FS.lookupPath(newpath, { parent: true });
    var parent = lookup.node;
    if (!parent) {
      throw new FS.ErrnoError(44);
    }
    var newname = PATH.basename(newpath);
    var err = FS.mayCreate(parent, newname);
    if (err) {
      throw new FS.ErrnoError(err);
    }
    if (!parent.node_ops.symlink) {
      throw new FS.ErrnoError(63);
    }
    return parent.node_ops.symlink(parent, newname, oldpath);
  },
  rename: function(old_path, new_path) {
    var old_dirname = PATH.dirname(old_path);
    var new_dirname = PATH.dirname(new_path);
    var old_name = PATH.basename(old_path);
    var new_name = PATH.basename(new_path);
    var lookup, old_dir, new_dir;
    try {
      lookup = FS.lookupPath(old_path, { parent: true });
      old_dir = lookup.node;
      lookup = FS.lookupPath(new_path, { parent: true });
      new_dir = lookup.node;
    } catch (e) {
      throw new FS.ErrnoError(10);
    }
    if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
    if (old_dir.mount !== new_dir.mount) {
      throw new FS.ErrnoError(75);
    }
    var old_node = FS.lookupNode(old_dir, old_name);
    var relative = PATH_FS.relative(old_path, new_dirname);
    if (relative.charAt(0) !== ".") {
      throw new FS.ErrnoError(28);
    }
    relative = PATH_FS.relative(new_path, old_dirname);
    if (relative.charAt(0) !== ".") {
      throw new FS.ErrnoError(55);
    }
    var new_node;
    try {
      new_node = FS.lookupNode(new_dir, new_name);
    } catch (e) {}
    if (old_node === new_node) {
      return;
    }
    var isdir = FS.isDir(old_node.mode);
    var err = FS.mayDelete(old_dir, old_name, isdir);
    if (err) {
      throw new FS.ErrnoError(err);
    }
    err = new_node
      ? FS.mayDelete(new_dir, new_name, isdir)
      : FS.mayCreate(new_dir, new_name);
    if (err) {
      throw new FS.ErrnoError(err);
    }
    if (!old_dir.node_ops.rename) {
      throw new FS.ErrnoError(63);
    }
    if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
      throw new FS.ErrnoError(10);
    }
    if (new_dir !== old_dir) {
      err = FS.nodePermissions(old_dir, "w");
      if (err) {
        throw new FS.ErrnoError(err);
      }
    }
    try {
      if (FS.trackingDelegate["willMovePath"]) {
        FS.trackingDelegate["willMovePath"](old_path, new_path);
      }
    } catch (e) {
      console.log(
        "FS.trackingDelegate['willMovePath']('" +
          old_path +
          "', '" +
          new_path +
          "') threw an exception: " +
          e.message
      );
    }
    FS.hashRemoveNode(old_node);
    try {
      old_dir.node_ops.rename(old_node, new_dir, new_name);
    } catch (e) {
      throw e;
    } finally {
      FS.hashAddNode(old_node);
    }
    try {
      if (FS.trackingDelegate["onMovePath"])
        FS.trackingDelegate["onMovePath"](old_path, new_path);
    } catch (e) {
      console.log(
        "FS.trackingDelegate['onMovePath']('" +
          old_path +
          "', '" +
          new_path +
          "') threw an exception: " +
          e.message
      );
    }
  },
  rmdir: function(path) {
    var lookup = FS.lookupPath(path, { parent: true });
    var parent = lookup.node;
    var name = PATH.basename(path);
    var node = FS.lookupNode(parent, name);
    var err = FS.mayDelete(parent, name, true);
    if (err) {
      throw new FS.ErrnoError(err);
    }
    if (!parent.node_ops.rmdir) {
      throw new FS.ErrnoError(63);
    }
    if (FS.isMountpoint(node)) {
      throw new FS.ErrnoError(10);
    }
    try {
      if (FS.trackingDelegate["willDeletePath"]) {
        FS.trackingDelegate["willDeletePath"](path);
      }
    } catch (e) {
      console.log(
        "FS.trackingDelegate['willDeletePath']('" +
          path +
          "') threw an exception: " +
          e.message
      );
    }
    parent.node_ops.rmdir(parent, name);
    FS.destroyNode(node);
    try {
      if (FS.trackingDelegate["onDeletePath"])
        FS.trackingDelegate["onDeletePath"](path);
    } catch (e) {
      console.log(
        "FS.trackingDelegate['onDeletePath']('" +
          path +
          "') threw an exception: " +
          e.message
      );
    }
  },
  readdir: function(path) {
    var lookup = FS.lookupPath(path, { follow: true });
    var node = lookup.node;
    if (!node.node_ops.readdir) {
      throw new FS.ErrnoError(54);
    }
    return node.node_ops.readdir(node);
  },
  unlink: function(path) {
    var lookup = FS.lookupPath(path, { parent: true });
    var parent = lookup.node;
    var name = PATH.basename(path);
    var node = FS.lookupNode(parent, name);
    var err = FS.mayDelete(parent, name, false);
    if (err) {
      throw new FS.ErrnoError(err);
    }
    if (!parent.node_ops.unlink) {
      throw new FS.ErrnoError(63);
    }
    if (FS.isMountpoint(node)) {
      throw new FS.ErrnoError(10);
    }
    try {
      if (FS.trackingDelegate["willDeletePath"]) {
        FS.trackingDelegate["willDeletePath"](path);
      }
    } catch (e) {
      console.log(
        "FS.trackingDelegate['willDeletePath']('" +
          path +
          "') threw an exception: " +
          e.message
      );
    }
    parent.node_ops.unlink(parent, name);
    FS.destroyNode(node);
    try {
      if (FS.trackingDelegate["onDeletePath"])
        FS.trackingDelegate["onDeletePath"](path);
    } catch (e) {
      console.log(
        "FS.trackingDelegate['onDeletePath']('" +
          path +
          "') threw an exception: " +
          e.message
      );
    }
  },
  readlink: function(path) {
    var lookup = FS.lookupPath(path);
    var link = lookup.node;
    if (!link) {
      throw new FS.ErrnoError(44);
    }
    if (!link.node_ops.readlink) {
      throw new FS.ErrnoError(28);
    }
    return PATH_FS.resolve(
      FS.getPath(link.parent),
      link.node_ops.readlink(link)
    );
  },
  stat: function(path, dontFollow) {
    var lookup = FS.lookupPath(path, { follow: !dontFollow });
    var node = lookup.node;
    if (!node) {
      throw new FS.ErrnoError(44);
    }
    if (!node.node_ops.getattr) {
      throw new FS.ErrnoError(63);
    }
    return node.node_ops.getattr(node);
  },
  lstat: function(path) {
    return FS.stat(path, true);
  },
  chmod: function(path, mode, dontFollow) {
    var node;
    if (typeof path === "string") {
      var lookup = FS.lookupPath(path, { follow: !dontFollow });
      node = lookup.node;
    } else {
      node = path;
    }
    if (!node.node_ops.setattr) {
      throw new FS.ErrnoError(63);
    }
    node.node_ops.setattr(node, {
      mode: (mode & 4095) | (node.mode & ~4095),
      timestamp: Date.now()
    });
  },
  lchmod: function(path, mode) {
    FS.chmod(path, mode, true);
  },
  fchmod: function(fd, mode) {
    var stream = FS.getStream(fd);
    if (!stream) {
      throw new FS.ErrnoError(8);
    }
    FS.chmod(stream.node, mode);
  },
  chown: function(path, uid, gid, dontFollow) {
    var node;
    if (typeof path === "string") {
      var lookup = FS.lookupPath(path, { follow: !dontFollow });
      node = lookup.node;
    } else {
      node = path;
    }
    if (!node.node_ops.setattr) {
      throw new FS.ErrnoError(63);
    }
    node.node_ops.setattr(node, { timestamp: Date.now() });
  },
  lchown: function(path, uid, gid) {
    FS.chown(path, uid, gid, true);
  },
  fchown: function(fd, uid, gid) {
    var stream = FS.getStream(fd);
    if (!stream) {
      throw new FS.ErrnoError(8);
    }
    FS.chown(stream.node, uid, gid);
  },
  truncate: function(path, len) {
    if (len < 0) {
      throw new FS.ErrnoError(28);
    }
    var node;
    if (typeof path === "string") {
      var lookup = FS.lookupPath(path, { follow: true });
      node = lookup.node;
    } else {
      node = path;
    }
    if (!node.node_ops.setattr) {
      throw new FS.ErrnoError(63);
    }
    if (FS.isDir(node.mode)) {
      throw new FS.ErrnoError(31);
    }
    if (!FS.isFile(node.mode)) {
      throw new FS.ErrnoError(28);
    }
    var err = FS.nodePermissions(node, "w");
    if (err) {
      throw new FS.ErrnoError(err);
    }
    node.node_ops.setattr(node, { size: len, timestamp: Date.now() });
  },
  ftruncate: function(fd, len) {
    var stream = FS.getStream(fd);
    if (!stream) {
      throw new FS.ErrnoError(8);
    }
    if ((stream.flags & 2097155) === 0) {
      throw new FS.ErrnoError(28);
    }
    FS.truncate(stream.node, len);
  },
  utime: function(path, atime, mtime) {
    var lookup = FS.lookupPath(path, { follow: true });
    var node = lookup.node;
    node.node_ops.setattr(node, { timestamp: Math.max(atime, mtime) });
  },
  open: function(path, flags, mode, fd_start, fd_end) {
    if (path === "") {
      throw new FS.ErrnoError(44);
    }
    flags = typeof flags === "string" ? FS.modeStringToFlags(flags) : flags;
    mode = typeof mode === "undefined" ? 438 : mode;
    if (flags & 64) {
      mode = (mode & 4095) | 32768;
    } else {
      mode = 0;
    }
    var node;
    if (typeof path === "object") {
      node = path;
    } else {
      path = PATH.normalize(path);
      try {
        var lookup = FS.lookupPath(path, { follow: !(flags & 131072) });
        node = lookup.node;
      } catch (e) {}
    }
    var created = false;
    if (flags & 64) {
      if (node) {
        if (flags & 128) {
          throw new FS.ErrnoError(20);
        }
      } else {
        node = FS.mknod(path, mode, 0);
        created = true;
      }
    }
    if (!node) {
      throw new FS.ErrnoError(44);
    }
    if (FS.isChrdev(node.mode)) {
      flags &= ~512;
    }
    if (flags & 65536 && !FS.isDir(node.mode)) {
      throw new FS.ErrnoError(54);
    }
    if (!created) {
      var err = FS.mayOpen(node, flags);
      if (err) {
        throw new FS.ErrnoError(err);
      }
    }
    if (flags & 512) {
      FS.truncate(node, 0);
    }
    flags &= ~(128 | 512);
    var stream = FS.createStream(
      {
        node: node,
        path: FS.getPath(node),
        flags: flags,
        seekable: true,
        position: 0,
        stream_ops: node.stream_ops,
        ungotten: [],
        error: false
      },
      fd_start,
      fd_end
    );
    if (stream.stream_ops.open) {
      stream.stream_ops.open(stream);
    }
    if (Module["logReadFiles"] && !(flags & 1)) {
      if (!FS.readFiles) FS.readFiles = {};
      if (!(path in FS.readFiles)) {
        FS.readFiles[path] = 1;
        console.log("FS.trackingDelegate error on read file: " + path);
      }
    }
    try {
      if (FS.trackingDelegate["onOpenFile"]) {
        var trackingFlags = 0;
        if ((flags & 2097155) !== 1) {
          trackingFlags |= FS.tracking.openFlags.READ;
        }
        if ((flags & 2097155) !== 0) {
          trackingFlags |= FS.tracking.openFlags.WRITE;
        }
        FS.trackingDelegate["onOpenFile"](path, trackingFlags);
      }
    } catch (e) {
      console.log(
        "FS.trackingDelegate['onOpenFile']('" +
          path +
          "', flags) threw an exception: " +
          e.message
      );
    }
    return stream;
  },
  close: function(stream) {
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if (stream.getdents) stream.getdents = null;
    try {
      if (stream.stream_ops.close) {
        stream.stream_ops.close(stream);
      }
    } catch (e) {
      throw e;
    } finally {
      FS.closeStream(stream.fd);
    }
    stream.fd = null;
  },
  isClosed: function(stream) {
    return stream.fd === null;
  },
  llseek: function(stream, offset, whence) {
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if (!stream.seekable || !stream.stream_ops.llseek) {
      throw new FS.ErrnoError(70);
    }
    if (whence != 0 && whence != 1 && whence != 2) {
      throw new FS.ErrnoError(28);
    }
    stream.position = stream.stream_ops.llseek(stream, offset, whence);
    stream.ungotten = [];
    return stream.position;
  },
  read: function(stream, buffer, offset, length, position) {
    if (length < 0 || position < 0) {
      throw new FS.ErrnoError(28);
    }
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if ((stream.flags & 2097155) === 1) {
      throw new FS.ErrnoError(8);
    }
    if (FS.isDir(stream.node.mode)) {
      throw new FS.ErrnoError(31);
    }
    if (!stream.stream_ops.read) {
      throw new FS.ErrnoError(28);
    }
    var seeking = typeof position !== "undefined";
    if (!seeking) {
      position = stream.position;
    } else if (!stream.seekable) {
      throw new FS.ErrnoError(70);
    }
    var bytesRead = stream.stream_ops.read(
      stream,
      buffer,
      offset,
      length,
      position
    );
    if (!seeking) stream.position += bytesRead;
    return bytesRead;
  },
  write: function(stream, buffer, offset, length, position, canOwn) {
    if (length < 0 || position < 0) {
      throw new FS.ErrnoError(28);
    }
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if ((stream.flags & 2097155) === 0) {
      throw new FS.ErrnoError(8);
    }
    if (FS.isDir(stream.node.mode)) {
      throw new FS.ErrnoError(31);
    }
    if (!stream.stream_ops.write) {
      throw new FS.ErrnoError(28);
    }
    if (stream.flags & 1024) {
      FS.llseek(stream, 0, 2);
    }
    var seeking = typeof position !== "undefined";
    if (!seeking) {
      position = stream.position;
    } else if (!stream.seekable) {
      throw new FS.ErrnoError(70);
    }
    var bytesWritten = stream.stream_ops.write(
      stream,
      buffer,
      offset,
      length,
      position,
      canOwn
    );
    if (!seeking) stream.position += bytesWritten;
    try {
      if (stream.path && FS.trackingDelegate["onWriteToFile"])
        FS.trackingDelegate["onWriteToFile"](stream.path);
    } catch (e) {
      console.log(
        "FS.trackingDelegate['onWriteToFile']('" +
          stream.path +
          "') threw an exception: " +
          e.message
      );
    }
    return bytesWritten;
  },
  allocate: function(stream, offset, length) {
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if (offset < 0 || length <= 0) {
      throw new FS.ErrnoError(28);
    }
    if ((stream.flags & 2097155) === 0) {
      throw new FS.ErrnoError(8);
    }
    if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
      throw new FS.ErrnoError(43);
    }
    if (!stream.stream_ops.allocate) {
      throw new FS.ErrnoError(138);
    }
    stream.stream_ops.allocate(stream, offset, length);
  },
  mmap: function(stream, buffer, offset, length, position, prot, flags) {
    if (
      (prot & 2) !== 0 &&
      (flags & 2) === 0 &&
      (stream.flags & 2097155) !== 2
    ) {
      throw new FS.ErrnoError(2);
    }
    if ((stream.flags & 2097155) === 1) {
      throw new FS.ErrnoError(2);
    }
    if (!stream.stream_ops.mmap) {
      throw new FS.ErrnoError(43);
    }
    return stream.stream_ops.mmap(
      stream,
      buffer,
      offset,
      length,
      position,
      prot,
      flags
    );
  },
  msync: function(stream, buffer, offset, length, mmapFlags) {
    if (!stream || !stream.stream_ops.msync) {
      return 0;
    }
    return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
  },
  munmap: function(stream) {
    return 0;
  },
  ioctl: function(stream, cmd, arg) {
    if (!stream.stream_ops.ioctl) {
      throw new FS.ErrnoError(59);
    }
    return stream.stream_ops.ioctl(stream, cmd, arg);
  },
  readFile: function(path, opts) {
    opts = opts || {};
    opts.flags = opts.flags || "r";
    opts.encoding = opts.encoding || "binary";
    if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
      throw new Error('Invalid encoding type "' + opts.encoding + '"');
    }
    var ret;
    var stream = FS.open(path, opts.flags);
    var stat = FS.stat(path);
    var length = stat.size;
    var buf = new Uint8Array(length);
    FS.read(stream, buf, 0, length, 0);
    if (opts.encoding === "utf8") {
      ret = UTF8ArrayToString(buf, 0);
    } else if (opts.encoding === "binary") {
      ret = buf;
    }
    FS.close(stream);
    return ret;
  },
  writeFile: function(path, data, opts) {
    opts = opts || {};
    opts.flags = opts.flags || "w";
    var stream = FS.open(path, opts.flags, opts.mode);
    if (typeof data === "string") {
      var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
      var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
      FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
    } else if (ArrayBuffer.isView(data)) {
      FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
    } else {
      throw new Error("Unsupported data type");
    }
    FS.close(stream);
  },
  cwd: function() {
    return FS.currentPath;
  },
  chdir: function(path) {
    var lookup = FS.lookupPath(path, { follow: true });
    if (lookup.node === null) {
      throw new FS.ErrnoError(44);
    }
    if (!FS.isDir(lookup.node.mode)) {
      throw new FS.ErrnoError(54);
    }
    var err = FS.nodePermissions(lookup.node, "x");
    if (err) {
      throw new FS.ErrnoError(err);
    }
    FS.currentPath = lookup.path;
  },
  createDefaultDirectories: function() {
    FS.mkdir("/tmp");
    FS.mkdir("/home");
    FS.mkdir("/home/web_user");
  },
  createDefaultDevices: function() {
    FS.mkdir("/dev");
    FS.registerDevice(FS.makedev(1, 3), {
      read: function() {
        return 0;
      },
      write: function(stream, buffer, offset, length, pos) {
        return length;
      }
    });
    FS.mkdev("/dev/null", FS.makedev(1, 3));
    TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
    TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
    FS.mkdev("/dev/tty", FS.makedev(5, 0));
    FS.mkdev("/dev/tty1", FS.makedev(6, 0));
    var random_device;
    if (
      typeof crypto === "object" &&
      typeof crypto["getRandomValues"] === "function"
    ) {
      var randomBuffer = new Uint8Array(1);
      random_device = function() {
        crypto.getRandomValues(randomBuffer);
        return randomBuffer[0];
      };
    } else if (ENVIRONMENT_IS_NODE) {
      try {
        var crypto_module = __webpack_require__(27);
        random_device = function() {
          return crypto_module["randomBytes"](1)[0];
        };
      } catch (e) {}
    } else {
    }
    if (!random_device) {
      random_device = function() {
        abort("random_device");
      };
    }
    FS.createDevice("/dev", "random", random_device);
    FS.createDevice("/dev", "urandom", random_device);
    FS.mkdir("/dev/shm");
    FS.mkdir("/dev/shm/tmp");
  },
  createSpecialDirectories: function() {
    FS.mkdir("/proc");
    FS.mkdir("/proc/self");
    FS.mkdir("/proc/self/fd");
    FS.mount(
      {
        mount: function() {
          var node = FS.createNode("/proc/self", "fd", 16384 | 511, 73);
          node.node_ops = {
            lookup: function(parent, name) {
              var fd = +name;
              var stream = FS.getStream(fd);
              if (!stream) throw new FS.ErrnoError(8);
              var ret = {
                parent: null,
                mount: { mountpoint: "fake" },
                node_ops: {
                  readlink: function() {
                    return stream.path;
                  }
                }
              };
              ret.parent = ret;
              return ret;
            }
          };
          return node;
        }
      },
      {},
      "/proc/self/fd"
    );
  },
  createStandardStreams: function() {
    if (Module["stdin"]) {
      FS.createDevice("/dev", "stdin", Module["stdin"]);
    } else {
      FS.symlink("/dev/tty", "/dev/stdin");
    }
    if (Module["stdout"]) {
      FS.createDevice("/dev", "stdout", null, Module["stdout"]);
    } else {
      FS.symlink("/dev/tty", "/dev/stdout");
    }
    if (Module["stderr"]) {
      FS.createDevice("/dev", "stderr", null, Module["stderr"]);
    } else {
      FS.symlink("/dev/tty1", "/dev/stderr");
    }
    var stdin = FS.open("/dev/stdin", "r");
    var stdout = FS.open("/dev/stdout", "w");
    var stderr = FS.open("/dev/stderr", "w");
  },
  ensureErrnoError: function() {
    if (FS.ErrnoError) return;
    FS.ErrnoError = function ErrnoError(errno, node) {
      this.node = node;
      this.setErrno = function(errno) {
        this.errno = errno;
      };
      this.setErrno(errno);
      this.message = "FS error";
    };
    FS.ErrnoError.prototype = new Error();
    FS.ErrnoError.prototype.constructor = FS.ErrnoError;
    [44].forEach(function(code) {
      FS.genericErrors[code] = new FS.ErrnoError(code);
      FS.genericErrors[code].stack = "<generic error, no stack>";
    });
  },
  staticInit: function() {
    FS.ensureErrnoError();
    FS.nameTable = new Array(4096);
    FS.mount(MEMFS, {}, "/");
    FS.createDefaultDirectories();
    FS.createDefaultDevices();
    FS.createSpecialDirectories();
    FS.filesystems = { MEMFS: MEMFS, NODEFS: NODEFS };
  },
  init: function(input, output, error) {
    FS.init.initialized = true;
    FS.ensureErrnoError();
    Module["stdin"] = input || Module["stdin"];
    Module["stdout"] = output || Module["stdout"];
    Module["stderr"] = error || Module["stderr"];
    FS.createStandardStreams();
  },
  quit: function() {
    FS.init.initialized = false;
    var fflush = Module["_fflush"];
    if (fflush) fflush(0);
    for (var i = 0; i < FS.streams.length; i++) {
      var stream = FS.streams[i];
      if (!stream) {
        continue;
      }
      FS.close(stream);
    }
  },
  getMode: function(canRead, canWrite) {
    var mode = 0;
    if (canRead) mode |= 292 | 73;
    if (canWrite) mode |= 146;
    return mode;
  },
  joinPath: function(parts, forceRelative) {
    var path = PATH.join.apply(null, parts);
    if (forceRelative && path[0] == "/") path = path.substr(1);
    return path;
  },
  absolutePath: function(relative, base) {
    return PATH_FS.resolve(base, relative);
  },
  standardizePath: function(path) {
    return PATH.normalize(path);
  },
  findObject: function(path, dontResolveLastLink) {
    var ret = FS.analyzePath(path, dontResolveLastLink);
    if (ret.exists) {
      return ret.object;
    } else {
      ___setErrNo(ret.error);
      return null;
    }
  },
  analyzePath: function(path, dontResolveLastLink) {
    try {
      var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
      path = lookup.path;
    } catch (e) {}
    var ret = {
      isRoot: false,
      exists: false,
      error: 0,
      name: null,
      path: null,
      object: null,
      parentExists: false,
      parentPath: null,
      parentObject: null
    };
    try {
      var lookup = FS.lookupPath(path, { parent: true });
      ret.parentExists = true;
      ret.parentPath = lookup.path;
      ret.parentObject = lookup.node;
      ret.name = PATH.basename(path);
      lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
      ret.exists = true;
      ret.path = lookup.path;
      ret.object = lookup.node;
      ret.name = lookup.node.name;
      ret.isRoot = lookup.path === "/";
    } catch (e) {
      ret.error = e.errno;
    }
    return ret;
  },
  createFolder: function(parent, name, canRead, canWrite) {
    var path = PATH.join2(
      typeof parent === "string" ? parent : FS.getPath(parent),
      name
    );
    var mode = FS.getMode(canRead, canWrite);
    return FS.mkdir(path, mode);
  },
  createPath: function(parent, path, canRead, canWrite) {
    parent = typeof parent === "string" ? parent : FS.getPath(parent);
    var parts = path.split("/").reverse();
    while (parts.length) {
      var part = parts.pop();
      if (!part) continue;
      var current = PATH.join2(parent, part);
      try {
        FS.mkdir(current);
      } catch (e) {}
      parent = current;
    }
    return current;
  },
  createFile: function(parent, name, properties, canRead, canWrite) {
    var path = PATH.join2(
      typeof parent === "string" ? parent : FS.getPath(parent),
      name
    );
    var mode = FS.getMode(canRead, canWrite);
    return FS.create(path, mode);
  },
  createDataFile: function(parent, name, data, canRead, canWrite, canOwn) {
    var path = name
      ? PATH.join2(
          typeof parent === "string" ? parent : FS.getPath(parent),
          name
        )
      : parent;
    var mode = FS.getMode(canRead, canWrite);
    var node = FS.create(path, mode);
    if (data) {
      if (typeof data === "string") {
        var arr = new Array(data.length);
        for (var i = 0, len = data.length; i < len; ++i)
          arr[i] = data.charCodeAt(i);
        data = arr;
      }
      FS.chmod(node, mode | 146);
      var stream = FS.open(node, "w");
      FS.write(stream, data, 0, data.length, 0, canOwn);
      FS.close(stream);
      FS.chmod(node, mode);
    }
    return node;
  },
  createDevice: function(parent, name, input, output) {
    var path = PATH.join2(
      typeof parent === "string" ? parent : FS.getPath(parent),
      name
    );
    var mode = FS.getMode(!!input, !!output);
    if (!FS.createDevice.major) FS.createDevice.major = 64;
    var dev = FS.makedev(FS.createDevice.major++, 0);
    FS.registerDevice(dev, {
      open: function(stream) {
        stream.seekable = false;
      },
      close: function(stream) {
        if (output && output.buffer && output.buffer.length) {
          output(10);
        }
      },
      read: function(stream, buffer, offset, length, pos) {
        var bytesRead = 0;
        for (var i = 0; i < length; i++) {
          var result;
          try {
            result = input();
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (result === undefined && bytesRead === 0) {
            throw new FS.ErrnoError(6);
          }
          if (result === null || result === undefined) break;
          bytesRead++;
          buffer[offset + i] = result;
        }
        if (bytesRead) {
          stream.node.timestamp = Date.now();
        }
        return bytesRead;
      },
      write: function(stream, buffer, offset, length, pos) {
        for (var i = 0; i < length; i++) {
          try {
            output(buffer[offset + i]);
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
        }
        if (length) {
          stream.node.timestamp = Date.now();
        }
        return i;
      }
    });
    return FS.mkdev(path, mode, dev);
  },
  createLink: function(parent, name, target, canRead, canWrite) {
    var path = PATH.join2(
      typeof parent === "string" ? parent : FS.getPath(parent),
      name
    );
    return FS.symlink(target, path);
  },
  forceLoadFile: function(obj) {
    if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
    var success = true;
    if (typeof XMLHttpRequest !== "undefined") {
      throw new Error(
        "Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread."
      );
    } else if (read_) {
      try {
        obj.contents = intArrayFromString(read_(obj.url), true);
        obj.usedBytes = obj.contents.length;
      } catch (e) {
        success = false;
      }
    } else {
      throw new Error("Cannot load without read() or XMLHttpRequest.");
    }
    if (!success) ___setErrNo(29);
    return success;
  },
  createLazyFile: function(parent, name, url, canRead, canWrite) {
    function LazyUint8Array() {
      this.lengthKnown = false;
      this.chunks = [];
    }
    LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
      if (idx > this.length - 1 || idx < 0) {
        return undefined;
      }
      var chunkOffset = idx % this.chunkSize;
      var chunkNum = (idx / this.chunkSize) | 0;
      return this.getter(chunkNum)[chunkOffset];
    };
    LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(
      getter
    ) {
      this.getter = getter;
    };
    LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
      var xhr = new XMLHttpRequest();
      xhr.open("HEAD", url, false);
      xhr.send(null);
      if (!((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304))
        throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
      var datalength = Number(xhr.getResponseHeader("Content-length"));
      var header;
      var hasByteServing =
        (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
      var usesGzip =
        (header = xhr.getResponseHeader("Content-Encoding")) &&
        header === "gzip";
      var chunkSize = 1024 * 1024;
      if (!hasByteServing) chunkSize = datalength;
      var doXHR = function(from, to) {
        if (from > to)
          throw new Error(
            "invalid range (" + from + ", " + to + ") or no bytes requested!"
          );
        if (to > datalength - 1)
          throw new Error(
            "only " + datalength + " bytes available! programmer error!"
          );
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        if (datalength !== chunkSize)
          xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
        if (typeof Uint8Array != "undefined") xhr.responseType = "arraybuffer";
        if (xhr.overrideMimeType) {
          xhr.overrideMimeType("text/plain; charset=x-user-defined");
        }
        xhr.send(null);
        if (!((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304))
          throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
        if (xhr.response !== undefined) {
          return new Uint8Array(xhr.response || []);
        } else {
          return intArrayFromString(xhr.responseText || "", true);
        }
      };
      var lazyArray = this;
      lazyArray.setDataGetter(function(chunkNum) {
        var start = chunkNum * chunkSize;
        var end = (chunkNum + 1) * chunkSize - 1;
        end = Math.min(end, datalength - 1);
        if (typeof lazyArray.chunks[chunkNum] === "undefined") {
          lazyArray.chunks[chunkNum] = doXHR(start, end);
        }
        if (typeof lazyArray.chunks[chunkNum] === "undefined")
          throw new Error("doXHR failed!");
        return lazyArray.chunks[chunkNum];
      });
      if (usesGzip || !datalength) {
        chunkSize = datalength = 1;
        datalength = this.getter(0).length;
        chunkSize = datalength;
        console.log(
          "LazyFiles on gzip forces download of the whole file when length is accessed"
        );
      }
      this._length = datalength;
      this._chunkSize = chunkSize;
      this.lengthKnown = true;
    };
    if (typeof XMLHttpRequest !== "undefined") {
      if (!ENVIRONMENT_IS_WORKER)
        throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
      var lazyArray = new LazyUint8Array();
      Object.defineProperties(lazyArray, {
        length: {
          get: function() {
            if (!this.lengthKnown) {
              this.cacheLength();
            }
            return this._length;
          }
        },
        chunkSize: {
          get: function() {
            if (!this.lengthKnown) {
              this.cacheLength();
            }
            return this._chunkSize;
          }
        }
      });
      var properties = { isDevice: false, contents: lazyArray };
    } else {
      var properties = { isDevice: false, url: url };
    }
    var node = FS.createFile(parent, name, properties, canRead, canWrite);
    if (properties.contents) {
      node.contents = properties.contents;
    } else if (properties.url) {
      node.contents = null;
      node.url = properties.url;
    }
    Object.defineProperties(node, {
      usedBytes: {
        get: function() {
          return this.contents.length;
        }
      }
    });
    var stream_ops = {};
    var keys = Object.keys(node.stream_ops);
    keys.forEach(function(key) {
      var fn = node.stream_ops[key];
      stream_ops[key] = function forceLoadLazyFile() {
        if (!FS.forceLoadFile(node)) {
          throw new FS.ErrnoError(29);
        }
        return fn.apply(null, arguments);
      };
    });
    stream_ops.read = function stream_ops_read(
      stream,
      buffer,
      offset,
      length,
      position
    ) {
      if (!FS.forceLoadFile(node)) {
        throw new FS.ErrnoError(29);
      }
      var contents = stream.node.contents;
      if (position >= contents.length) return 0;
      var size = Math.min(contents.length - position, length);
      if (contents.slice) {
        for (var i = 0; i < size; i++) {
          buffer[offset + i] = contents[position + i];
        }
      } else {
        for (var i = 0; i < size; i++) {
          buffer[offset + i] = contents.get(position + i);
        }
      }
      return size;
    };
    node.stream_ops = stream_ops;
    return node;
  },
  createPreloadedFile: function(
    parent,
    name,
    url,
    canRead,
    canWrite,
    onload,
    onerror,
    dontCreateFile,
    canOwn,
    preFinish
  ) {
    Browser.init();
    var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
    var dep = getUniqueRunDependency("cp " + fullname);
    function processData(byteArray) {
      function finish(byteArray) {
        if (preFinish) preFinish();
        if (!dontCreateFile) {
          FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
        }
        if (onload) onload();
        removeRunDependency(dep);
      }
      var handled = false;
      Module["preloadPlugins"].forEach(function(plugin) {
        if (handled) return;
        if (plugin["canHandle"](fullname)) {
          plugin["handle"](byteArray, fullname, finish, function() {
            if (onerror) onerror();
            removeRunDependency(dep);
          });
          handled = true;
        }
      });
      if (!handled) finish(byteArray);
    }
    addRunDependency(dep);
    if (typeof url == "string") {
      Browser.asyncLoad(
        url,
        function(byteArray) {
          processData(byteArray);
        },
        onerror
      );
    } else {
      processData(url);
    }
  },
  indexedDB: function() {
    return (
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB
    );
  },
  DB_NAME: function() {
    return "EM_FS_" + window.location.pathname;
  },
  DB_VERSION: 20,
  DB_STORE_NAME: "FILE_DATA",
  saveFilesToDB: function(paths, onload, onerror) {
    onload = onload || function() {};
    onerror = onerror || function() {};
    var indexedDB = FS.indexedDB();
    try {
      var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
    } catch (e) {
      return onerror(e);
    }
    openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
      console.log("creating db");
      var db = openRequest.result;
      db.createObjectStore(FS.DB_STORE_NAME);
    };
    openRequest.onsuccess = function openRequest_onsuccess() {
      var db = openRequest.result;
      var transaction = db.transaction([FS.DB_STORE_NAME], "readwrite");
      var files = transaction.objectStore(FS.DB_STORE_NAME);
      var ok = 0,
        fail = 0,
        total = paths.length;
      function finish() {
        if (fail == 0) onload();
        else onerror();
      }
      paths.forEach(function(path) {
        var putRequest = files.put(FS.analyzePath(path).object.contents, path);
        putRequest.onsuccess = function putRequest_onsuccess() {
          ok++;
          if (ok + fail == total) finish();
        };
        putRequest.onerror = function putRequest_onerror() {
          fail++;
          if (ok + fail == total) finish();
        };
      });
      transaction.onerror = onerror;
    };
    openRequest.onerror = onerror;
  },
  loadFilesFromDB: function(paths, onload, onerror) {
    onload = onload || function() {};
    onerror = onerror || function() {};
    var indexedDB = FS.indexedDB();
    try {
      var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
    } catch (e) {
      return onerror(e);
    }
    openRequest.onupgradeneeded = onerror;
    openRequest.onsuccess = function openRequest_onsuccess() {
      var db = openRequest.result;
      try {
        var transaction = db.transaction([FS.DB_STORE_NAME], "readonly");
      } catch (e) {
        onerror(e);
        return;
      }
      var files = transaction.objectStore(FS.DB_STORE_NAME);
      var ok = 0,
        fail = 0,
        total = paths.length;
      function finish() {
        if (fail == 0) onload();
        else onerror();
      }
      paths.forEach(function(path) {
        var getRequest = files.get(path);
        getRequest.onsuccess = function getRequest_onsuccess() {
          if (FS.analyzePath(path).exists) {
            FS.unlink(path);
          }
          FS.createDataFile(
            PATH.dirname(path),
            PATH.basename(path),
            getRequest.result,
            true,
            true,
            true
          );
          ok++;
          if (ok + fail == total) finish();
        };
        getRequest.onerror = function getRequest_onerror() {
          fail++;
          if (ok + fail == total) finish();
        };
      });
      transaction.onerror = onerror;
    };
    openRequest.onerror = onerror;
  }
};
var SYSCALLS = {
  DEFAULT_POLLMASK: 5,
  mappings: {},
  umask: 511,
  calculateAt: function(dirfd, path) {
    if (path[0] !== "/") {
      var dir;
      if (dirfd === -100) {
        dir = FS.cwd();
      } else {
        var dirstream = FS.getStream(dirfd);
        if (!dirstream) throw new FS.ErrnoError(8);
        dir = dirstream.path;
      }
      path = PATH.join2(dir, path);
    }
    return path;
  },
  doStat: function(func, path, buf) {
    try {
      var stat = func(path);
    } catch (e) {
      if (
        e &&
        e.node &&
        PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))
      ) {
        return -54;
      }
      throw e;
    }
    HEAP32[buf >> 2] = stat.dev;
    HEAP32[(buf + 4) >> 2] = 0;
    HEAP32[(buf + 8) >> 2] = stat.ino;
    HEAP32[(buf + 12) >> 2] = stat.mode;
    HEAP32[(buf + 16) >> 2] = stat.nlink;
    HEAP32[(buf + 20) >> 2] = stat.uid;
    HEAP32[(buf + 24) >> 2] = stat.gid;
    HEAP32[(buf + 28) >> 2] = stat.rdev;
    HEAP32[(buf + 32) >> 2] = 0;
    (tempI64 = [
      stat.size >>> 0,
      ((tempDouble = stat.size),
      +Math_abs(tempDouble) >= 1
        ? tempDouble > 0
          ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>>
            0
          : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>>
            0
        : 0)
    ]),
      (HEAP32[(buf + 40) >> 2] = tempI64[0]),
      (HEAP32[(buf + 44) >> 2] = tempI64[1]);
    HEAP32[(buf + 48) >> 2] = 4096;
    HEAP32[(buf + 52) >> 2] = stat.blocks;
    HEAP32[(buf + 56) >> 2] = (stat.atime.getTime() / 1e3) | 0;
    HEAP32[(buf + 60) >> 2] = 0;
    HEAP32[(buf + 64) >> 2] = (stat.mtime.getTime() / 1e3) | 0;
    HEAP32[(buf + 68) >> 2] = 0;
    HEAP32[(buf + 72) >> 2] = (stat.ctime.getTime() / 1e3) | 0;
    HEAP32[(buf + 76) >> 2] = 0;
    (tempI64 = [
      stat.ino >>> 0,
      ((tempDouble = stat.ino),
      +Math_abs(tempDouble) >= 1
        ? tempDouble > 0
          ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>>
            0
          : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>>
            0
        : 0)
    ]),
      (HEAP32[(buf + 80) >> 2] = tempI64[0]),
      (HEAP32[(buf + 84) >> 2] = tempI64[1]);
    return 0;
  },
  doMsync: function(addr, stream, len, flags) {
    var buffer = new Uint8Array(HEAPU8.subarray(addr, addr + len));
    FS.msync(stream, buffer, 0, len, flags);
  },
  doMkdir: function(path, mode) {
    path = PATH.normalize(path);
    if (path[path.length - 1] === "/") path = path.substr(0, path.length - 1);
    FS.mkdir(path, mode, 0);
    return 0;
  },
  doMknod: function(path, mode, dev) {
    switch (mode & 61440) {
      case 32768:
      case 8192:
      case 24576:
      case 4096:
      case 49152:
        break;
      default:
        return -28;
    }
    FS.mknod(path, mode, dev);
    return 0;
  },
  doReadlink: function(path, buf, bufsize) {
    if (bufsize <= 0) return -28;
    var ret = FS.readlink(path);
    var len = Math.min(bufsize, lengthBytesUTF8(ret));
    var endChar = HEAP8[buf + len];
    stringToUTF8(ret, buf, bufsize + 1);
    HEAP8[buf + len] = endChar;
    return len;
  },
  doAccess: function(path, amode) {
    if (amode & ~7) {
      return -28;
    }
    var node;
    var lookup = FS.lookupPath(path, { follow: true });
    node = lookup.node;
    if (!node) {
      return -44;
    }
    var perms = "";
    if (amode & 4) perms += "r";
    if (amode & 2) perms += "w";
    if (amode & 1) perms += "x";
    if (perms && FS.nodePermissions(node, perms)) {
      return -2;
    }
    return 0;
  },
  doDup: function(path, flags, suggestFD) {
    var suggest = FS.getStream(suggestFD);
    if (suggest) FS.close(suggest);
    return FS.open(path, flags, 0, suggestFD, suggestFD).fd;
  },
  doReadv: function(stream, iov, iovcnt, offset) {
    var ret = 0;
    for (var i = 0; i < iovcnt; i++) {
      var ptr = HEAP32[(iov + i * 8) >> 2];
      var len = HEAP32[(iov + (i * 8 + 4)) >> 2];
      var curr = FS.read(stream, HEAP8, ptr, len, offset);
      if (curr < 0) return -1;
      ret += curr;
      if (curr < len) break;
    }
    return ret;
  },
  doWritev: function(stream, iov, iovcnt, offset) {
    var ret = 0;
    for (var i = 0; i < iovcnt; i++) {
      var ptr = HEAP32[(iov + i * 8) >> 2];
      var len = HEAP32[(iov + (i * 8 + 4)) >> 2];
      var curr = FS.write(stream, HEAP8, ptr, len, offset);
      if (curr < 0) return -1;
      ret += curr;
    }
    return ret;
  },
  varargs: 0,
  get: function(varargs) {
    SYSCALLS.varargs += 4;
    var ret = HEAP32[(SYSCALLS.varargs - 4) >> 2];
    return ret;
  },
  getStr: function() {
    var ret = UTF8ToString(SYSCALLS.get());
    return ret;
  },
  getStreamFromFD: function(fd) {
    if (fd === undefined) fd = SYSCALLS.get();
    var stream = FS.getStream(fd);
    if (!stream) throw new FS.ErrnoError(8);
    return stream;
  },
  get64: function() {
    var low = SYSCALLS.get(),
      high = SYSCALLS.get();
    return low;
  },
  getZero: function() {
    SYSCALLS.get();
  }
};
function ___syscall10(which, varargs) {
  SYSCALLS.varargs = varargs;
  try {
    var path = SYSCALLS.getStr();
    FS.unlink(path);
    return 0;
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
}
function ___syscall15(which, varargs) {
  SYSCALLS.varargs = varargs;
  try {
    var path = SYSCALLS.getStr(),
      mode = SYSCALLS.get();
    FS.chmod(path, mode);
    return 0;
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
}
function ___syscall195(which, varargs) {
  SYSCALLS.varargs = varargs;
  try {
    var path = SYSCALLS.getStr(),
      buf = SYSCALLS.get();
    return SYSCALLS.doStat(FS.stat, path, buf);
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
}
function ___syscall197(which, varargs) {
  SYSCALLS.varargs = varargs;
  try {
    var stream = SYSCALLS.getStreamFromFD(),
      buf = SYSCALLS.get();
    return SYSCALLS.doStat(FS.stat, stream.path, buf);
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
}
function ___syscall221(which, varargs) {
  SYSCALLS.varargs = varargs;
  try {
    var stream = SYSCALLS.getStreamFromFD(),
      cmd = SYSCALLS.get();
    switch (cmd) {
      case 0: {
        var arg = SYSCALLS.get();
        if (arg < 0) {
          return -28;
        }
        var newStream;
        newStream = FS.open(stream.path, stream.flags, 0, arg);
        return newStream.fd;
      }
      case 1:
      case 2:
        return 0;
      case 3:
        return stream.flags;
      case 4: {
        var arg = SYSCALLS.get();
        stream.flags |= arg;
        return 0;
      }
      case 12: {
        var arg = SYSCALLS.get();
        var offset = 0;
        HEAP16[(arg + offset) >> 1] = 2;
        return 0;
      }
      case 13:
      case 14:
        return 0;
      case 16:
      case 8:
        return -28;
      case 9:
        ___setErrNo(28);
        return -1;
      default: {
        return -28;
      }
    }
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
}
function ___syscall3(which, varargs) {
  SYSCALLS.varargs = varargs;
  try {
    var stream = SYSCALLS.getStreamFromFD(),
      buf = SYSCALLS.get(),
      count = SYSCALLS.get();
    return FS.read(stream, HEAP8, buf, count);
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
}
function ___syscall38(which, varargs) {
  SYSCALLS.varargs = varargs;
  try {
    var old_path = SYSCALLS.getStr(),
      new_path = SYSCALLS.getStr();
    FS.rename(old_path, new_path);
    return 0;
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
}
function ___syscall40(which, varargs) {
  SYSCALLS.varargs = varargs;
  try {
    var path = SYSCALLS.getStr();
    FS.rmdir(path);
    return 0;
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
}
function ___syscall5(which, varargs) {
  SYSCALLS.varargs = varargs;
  try {
    var pathname = SYSCALLS.getStr(),
      flags = SYSCALLS.get(),
      mode = SYSCALLS.get();
    var stream = FS.open(pathname, flags, mode);
    return stream.fd;
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
}
function ___syscall54(which, varargs) {
  SYSCALLS.varargs = varargs;
  try {
    var stream = SYSCALLS.getStreamFromFD(),
      op = SYSCALLS.get();
    switch (op) {
      case 21509:
      case 21505: {
        if (!stream.tty) return -59;
        return 0;
      }
      case 21510:
      case 21511:
      case 21512:
      case 21506:
      case 21507:
      case 21508: {
        if (!stream.tty) return -59;
        return 0;
      }
      case 21519: {
        if (!stream.tty) return -59;
        var argp = SYSCALLS.get();
        HEAP32[argp >> 2] = 0;
        return 0;
      }
      case 21520: {
        if (!stream.tty) return -59;
        return -28;
      }
      case 21531: {
        var argp = SYSCALLS.get();
        return FS.ioctl(stream, op, argp);
      }
      case 21523: {
        if (!stream.tty) return -59;
        return 0;
      }
      case 21524: {
        if (!stream.tty) return -59;
        return 0;
      }
      default:
        abort("bad ioctl syscall " + op);
    }
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
}
function ___unlock() {}
function _emscripten_get_heap_size() {
  return HEAP8.length;
}
function _emscripten_memcpy_big(dest, src, num) {
  HEAPU8.set(HEAPU8.subarray(src, src + num), dest);
}
function emscripten_realloc_buffer(size) {
  try {
    wasmMemory.grow((size - buffer.byteLength + 65535) >> 16);
    updateGlobalBufferAndViews(wasmMemory.buffer);
    return 1;
  } catch (e) {}
}
function _emscripten_resize_heap(requestedSize) {
  var oldSize = _emscripten_get_heap_size();
  var PAGE_MULTIPLE = 65536;
  var LIMIT = 2147483648 - PAGE_MULTIPLE;
  if (requestedSize > LIMIT) {
    return false;
  }
  var MIN_TOTAL_MEMORY = 16777216;
  var newSize = Math.max(oldSize, MIN_TOTAL_MEMORY);
  while (newSize < requestedSize) {
    if (newSize <= 536870912) {
      newSize = alignUp(2 * newSize, PAGE_MULTIPLE);
    } else {
      newSize = Math.min(
        alignUp((3 * newSize + 2147483648) / 4, PAGE_MULTIPLE),
        LIMIT
      );
    }
  }
  var replacement = emscripten_realloc_buffer(newSize);
  if (!replacement) {
    return false;
  }
  return true;
}
function _fd_close(fd) {
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    FS.close(stream);
    return 0;
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
    return e.errno;
  }
}
function _fd_fdstat_get(fd, pbuf) {
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    var type = stream.tty
      ? 2
      : FS.isDir(stream.mode)
      ? 3
      : FS.isLink(stream.mode)
      ? 7
      : 4;
    HEAP8[pbuf >> 0] = type;
    return 0;
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
    return e.errno;
  }
}
function _fd_read(fd, iov, iovcnt, pnum) {
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    var num = SYSCALLS.doReadv(stream, iov, iovcnt);
    HEAP32[pnum >> 2] = num;
    return 0;
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
    return e.errno;
  }
}
function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    var HIGH_OFFSET = 4294967296;
    var offset = offset_high * HIGH_OFFSET + (offset_low >>> 0);
    var DOUBLE_LIMIT = 9007199254740992;
    if (offset <= -DOUBLE_LIMIT || offset >= DOUBLE_LIMIT) {
      return -61;
    }
    FS.llseek(stream, offset, whence);
    (tempI64 = [
      stream.position >>> 0,
      ((tempDouble = stream.position),
      +Math_abs(tempDouble) >= 1
        ? tempDouble > 0
          ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>>
            0
          : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>>
            0
        : 0)
    ]),
      (HEAP32[newOffset >> 2] = tempI64[0]),
      (HEAP32[(newOffset + 4) >> 2] = tempI64[1]);
    if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
    return 0;
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
    return e.errno;
  }
}
function _fd_write(fd, iov, iovcnt, pnum) {
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    var num = SYSCALLS.doWritev(stream, iov, iovcnt);
    HEAP32[pnum >> 2] = num;
    return 0;
  } catch (e) {
    if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
    return e.errno;
  }
}
var ___tm_current = 20656;
var ___tm_timezone = (stringToUTF8("GMT", 20704, 4), 20704);
function _gmtime_r(time, tmPtr) {
  var date = new Date(HEAP32[time >> 2] * 1e3);
  HEAP32[tmPtr >> 2] = date.getUTCSeconds();
  HEAP32[(tmPtr + 4) >> 2] = date.getUTCMinutes();
  HEAP32[(tmPtr + 8) >> 2] = date.getUTCHours();
  HEAP32[(tmPtr + 12) >> 2] = date.getUTCDate();
  HEAP32[(tmPtr + 16) >> 2] = date.getUTCMonth();
  HEAP32[(tmPtr + 20) >> 2] = date.getUTCFullYear() - 1900;
  HEAP32[(tmPtr + 24) >> 2] = date.getUTCDay();
  HEAP32[(tmPtr + 36) >> 2] = 0;
  HEAP32[(tmPtr + 32) >> 2] = 0;
  var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
  var yday = ((date.getTime() - start) / (1e3 * 60 * 60 * 24)) | 0;
  HEAP32[(tmPtr + 28) >> 2] = yday;
  HEAP32[(tmPtr + 40) >> 2] = ___tm_timezone;
  return tmPtr;
}
function _gmtime(time) {
  return _gmtime_r(time, ___tm_current);
}
function _setTempRet0($i) {
  setTempRet0($i | 0);
}
function _time(ptr) {
  var ret = (Date.now() / 1e3) | 0;
  if (ptr) {
    HEAP32[ptr >> 2] = ret;
  }
  return ret;
}
function _tzset() {
  if (_tzset.called) return;
  _tzset.called = true;
  HEAP32[__get_timezone() >> 2] = new Date().getTimezoneOffset() * 60;
  var currentYear = new Date().getFullYear();
  var winter = new Date(currentYear, 0, 1);
  var summer = new Date(currentYear, 6, 1);
  HEAP32[__get_daylight() >> 2] = Number(
    winter.getTimezoneOffset() != summer.getTimezoneOffset()
  );
  function extractZone(date) {
    var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/);
    return match ? match[1] : "GMT";
  }
  var winterName = extractZone(winter);
  var summerName = extractZone(summer);
  var winterNamePtr = allocate(
    intArrayFromString(winterName),
    "i8",
    ALLOC_NORMAL
  );
  var summerNamePtr = allocate(
    intArrayFromString(summerName),
    "i8",
    ALLOC_NORMAL
  );
  if (summer.getTimezoneOffset() < winter.getTimezoneOffset()) {
    HEAP32[__get_tzname() >> 2] = winterNamePtr;
    HEAP32[(__get_tzname() + 4) >> 2] = summerNamePtr;
  } else {
    HEAP32[__get_tzname() >> 2] = summerNamePtr;
    HEAP32[(__get_tzname() + 4) >> 2] = winterNamePtr;
  }
}
function _timegm(tmPtr) {
  _tzset();
  var time = Date.UTC(
    HEAP32[(tmPtr + 20) >> 2] + 1900,
    HEAP32[(tmPtr + 16) >> 2],
    HEAP32[(tmPtr + 12) >> 2],
    HEAP32[(tmPtr + 8) >> 2],
    HEAP32[(tmPtr + 4) >> 2],
    HEAP32[tmPtr >> 2],
    0
  );
  var date = new Date(time);
  HEAP32[(tmPtr + 24) >> 2] = date.getUTCDay();
  var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
  var yday = ((date.getTime() - start) / (1e3 * 60 * 60 * 24)) | 0;
  HEAP32[(tmPtr + 28) >> 2] = yday;
  return (date.getTime() / 1e3) | 0;
}
FS.staticInit();
if (ENVIRONMENT_HAS_NODE) {
  var fs = frozenFs;
  var NODEJS_PATH = __webpack_require__(7);
  NODEFS.staticInit();
}
if (ENVIRONMENT_IS_NODE) {
  var _wrapNodeError = function(func) {
    return function() {
      try {
        return func.apply(this, arguments);
      } catch (e) {
        if (!e.code) throw e;
        throw new FS.ErrnoError(ERRNO_CODES[e.code]);
      }
    };
  };
  var VFS = Object.assign({}, FS);
  for (var _key in NODERAWFS) FS[_key] = _wrapNodeError(NODERAWFS[_key]);
} else {
  throw new Error(
    "NODERAWFS is currently only supported on Node.js environment."
  );
}
function intArrayFromString(stringy, dontAddNull, length) {
  var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
  var u8array = new Array(len);
  var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
  if (dontAddNull) u8array.length = numBytesWritten;
  return u8array;
}
var decodeBase64 =
  typeof atob === "function"
    ? atob
    : function(input) {
        var keyStr =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        do {
          enc1 = keyStr.indexOf(input.charAt(i++));
          enc2 = keyStr.indexOf(input.charAt(i++));
          enc3 = keyStr.indexOf(input.charAt(i++));
          enc4 = keyStr.indexOf(input.charAt(i++));
          chr1 = (enc1 << 2) | (enc2 >> 4);
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          chr3 = ((enc3 & 3) << 6) | enc4;
          output = output + String.fromCharCode(chr1);
          if (enc3 !== 64) {
            output = output + String.fromCharCode(chr2);
          }
          if (enc4 !== 64) {
            output = output + String.fromCharCode(chr3);
          }
        } while (i < input.length);
        return output;
      };
function intArrayFromBase64(s) {
  if (typeof ENVIRONMENT_IS_NODE === "boolean" && ENVIRONMENT_IS_NODE) {
    var buf;
    try {
      buf = Buffer.from(s, "base64");
    } catch (_) {
      buf = new Buffer(s, "base64");
    }
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
  }
  try {
    var decoded = decodeBase64(s);
    var bytes = new Uint8Array(decoded.length);
    for (var i = 0; i < decoded.length; ++i) {
      bytes[i] = decoded.charCodeAt(i);
    }
    return bytes;
  } catch (_) {
    throw new Error("Converting base64 string to bytes failed.");
  }
}
function tryParseAsDataURI(filename) {
  if (!isDataURI(filename)) {
    return;
  }
  return intArrayFromBase64(filename.slice(dataURIPrefix.length));
}
var asmLibraryArg = {
  d: ___lock,
  t: ___syscall10,
  p: ___syscall15,
  f: ___syscall195,
  v: ___syscall197,
  e: ___syscall221,
  q: ___syscall3,
  u: ___syscall38,
  s: ___syscall40,
  r: ___syscall5,
  o: ___syscall54,
  a: ___unlock,
  j: _emscripten_memcpy_big,
  k: _emscripten_resize_heap,
  g: _fd_close,
  n: _fd_fdstat_get,
  m: _fd_read,
  l: _fd_seek,
  w: _fd_write,
  h: _gmtime,
  memory: wasmMemory,
  b: _setTempRet0,
  table: wasmTable,
  c: _time,
  i: _timegm
};
var asm = createWasm();
var ___wasm_call_ctors = (Module["___wasm_call_ctors"] = asm["x"]);
var _zipstruct_stat = (Module["_zipstruct_stat"] = asm["y"]);
var _zipstruct_statS = (Module["_zipstruct_statS"] = asm["z"]);
var _zipstruct_stat_name = (Module["_zipstruct_stat_name"] = asm["A"]);
var _zipstruct_stat_index = (Module["_zipstruct_stat_index"] = asm["B"]);
var _zipstruct_stat_size = (Module["_zipstruct_stat_size"] = asm["C"]);
var _zipstruct_stat_mtime = (Module["_zipstruct_stat_mtime"] = asm["D"]);
var _zipstruct_error = (Module["_zipstruct_error"] = asm["E"]);
var _zipstruct_errorS = (Module["_zipstruct_errorS"] = asm["F"]);
var _zip_close = (Module["_zip_close"] = asm["G"]);
var _zip_dir_add = (Module["_zip_dir_add"] = asm["H"]);
var _zip_discard = (Module["_zip_discard"] = asm["I"]);
var _zip_error_init_with_code = (Module["_zip_error_init_with_code"] =
  asm["J"]);
var _zip_get_error = (Module["_zip_get_error"] = asm["K"]);
var _zip_file_get_error = (Module["_zip_file_get_error"] = asm["L"]);
var _zip_error_strerror = (Module["_zip_error_strerror"] = asm["M"]);
var _zip_fclose = (Module["_zip_fclose"] = asm["N"]);
var _zip_file_add = (Module["_zip_file_add"] = asm["O"]);
var _zip_file_get_external_attributes = (Module[
  "_zip_file_get_external_attributes"
] = asm["P"]);
var _zip_file_set_external_attributes = (Module[
  "_zip_file_set_external_attributes"
] = asm["Q"]);
var _zip_file_set_mtime = (Module["_zip_file_set_mtime"] = asm["R"]);
var _zip_fopen = (Module["_zip_fopen"] = asm["S"]);
var _zip_fopen_index = (Module["_zip_fopen_index"] = asm["T"]);
var _zip_fread = (Module["_zip_fread"] = asm["U"]);
var _zip_get_name = (Module["_zip_get_name"] = asm["V"]);
var _zip_get_num_entries = (Module["_zip_get_num_entries"] = asm["W"]);
var _zip_name_locate = (Module["_zip_name_locate"] = asm["X"]);
var _zip_open = (Module["_zip_open"] = asm["Y"]);
var _zip_open_from_source = (Module["_zip_open_from_source"] = asm["Z"]);
var _zip_set_file_compression = (Module["_zip_set_file_compression"] =
  asm["_"]);
var _zip_source_buffer = (Module["_zip_source_buffer"] = asm["$"]);
var _zip_source_buffer_create = (Module["_zip_source_buffer_create"] =
  asm["aa"]);
var _zip_source_free = (Module["_zip_source_free"] = asm["ba"]);
var _zip_source_set_mtime = (Module["_zip_source_set_mtime"] = asm["ca"]);
var _zip_stat = (Module["_zip_stat"] = asm["da"]);
var _zip_stat_index = (Module["_zip_stat_index"] = asm["ea"]);
var ___errno_location = (Module["___errno_location"] = asm["fa"]);
var __get_tzname = (Module["__get_tzname"] = asm["ga"]);
var __get_daylight = (Module["__get_daylight"] = asm["ha"]);
var __get_timezone = (Module["__get_timezone"] = asm["ia"]);
var _malloc = (Module["_malloc"] = asm["ja"]);
var _free = (Module["_free"] = asm["ka"]);
var stackSave = (Module["stackSave"] = asm["la"]);
var stackAlloc = (Module["stackAlloc"] = asm["ma"]);
var stackRestore = (Module["stackRestore"] = asm["na"]);
var dynCall_vi = (Module["dynCall_vi"] = asm["oa"]);
Module["asm"] = asm;
Module["cwrap"] = cwrap;
Module["getValue"] = getValue;
var calledRun;
function ExitStatus(status) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + status + ")";
  this.status = status;
}
dependenciesFulfilled = function runCaller() {
  if (!calledRun) run();
  if (!calledRun) dependenciesFulfilled = runCaller;
};
function run(args) {
  args = args || arguments_;
  if (runDependencies > 0) {
    return;
  }
  preRun();
  if (runDependencies > 0) return;
  function doRun() {
    if (calledRun) return;
    calledRun = true;
    if (ABORT) return;
    initRuntime();
    preMain();
    if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
    postRun();
  }
  if (Module["setStatus"]) {
    Module["setStatus"]("Running...");
    setTimeout(function() {
      setTimeout(function() {
        Module["setStatus"]("");
      }, 1);
      doRun();
    }, 1);
  } else {
    doRun();
  }
}
Module["run"] = run;
if (Module["preInit"]) {
  if (typeof Module["preInit"] == "function")
    Module["preInit"] = [Module["preInit"]];
  while (Module["preInit"].length > 0) {
    Module["preInit"].pop()();
  }
}
noExitRuntime = true;
run();


/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("string_decoder");

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const fslib_1 = __webpack_require__(5);

const fs_1 = __importDefault(__webpack_require__(2));

const module_1 = __webpack_require__(6);

const url_1 = __webpack_require__(30);

const internalTools_1 = __webpack_require__(11);

function applyPatch(pnpapi, opts) {
  // @ts-ignore
  const builtinModules = new Set(module_1.Module.builtinModules || Object.keys(process.binding('natives')));
  /**
   * The cache that will be used for all accesses occuring outside of a PnP context.
   */

  const defaultCache = {};
  /**
   * Used to disable the resolution hooks (for when we want to fallback to the previous resolution - we then need
   * a way to "reset" the environment temporarily)
   */

  let enableNativeHooks = true; // @ts-ignore

  process.versions.pnp = String(pnpapi.VERSIONS.std); // @ts-ignore

  const moduleExports = __webpack_require__(6); // @ts-ignore


  moduleExports.findPnpApi = lookupSource => {
    const lookupPath = lookupSource instanceof url_1.URL ? url_1.fileURLToPath(lookupSource) : lookupSource;
    const apiPath = opts.manager.findApiPathFor(lookupPath);
    if (apiPath === null) return null;
    const apiEntry = opts.manager.getApiEntry(apiPath, true);
    return apiEntry.instance;
  };

  function getRequireStack(parent) {
    const requireStack = [];

    for (let cursor = parent; cursor; cursor = cursor.parent) requireStack.push(cursor.filename || cursor.id);

    return requireStack;
  } // A small note: we don't replace the cache here (and instead use the native one). This is an effort to not
  // break code similar to "delete require.cache[require.resolve(FOO)]", where FOO is a package located outside
  // of the Yarn dependency tree. In this case, we defer the load to the native loader. If we were to replace the
  // cache by our own, the native loader would populate its own cache, which wouldn't be exposed anymore, so the
  // delete call would be broken.


  const originalModuleLoad = module_1.Module._load;

  module_1.Module._load = function (request, parent, isMain) {
    if (!enableNativeHooks) return originalModuleLoad.call(module_1.Module, request, parent, isMain); // Builtins are managed by the regular Node loader

    if (builtinModules.has(request)) {
      try {
        enableNativeHooks = false;
        return originalModuleLoad.call(module_1.Module, request, parent, isMain);
      } finally {
        enableNativeHooks = true;
      }
    }

    const parentApiPath = opts.manager.getApiPathFromParent(parent);
    const parentApi = parentApiPath !== null ? opts.manager.getApiEntry(parentApiPath, true).instance : null; // Requests that aren't covered by the PnP runtime goes through the
    // parent `_load` implementation. This is required for VSCode, for example,
    // which override `_load` to provide additional builtins to its extensions.

    if (parentApi === null) return originalModuleLoad(request, parent, isMain); // The 'pnpapi' name is reserved to return the PnP api currently in use
    // by the program

    if (request === `pnpapi`) return parentApi; // Request `Module._resolveFilename` (ie. `resolveRequest`) to tell us
    // which file we should load

    const modulePath = module_1.Module._resolveFilename(request, parent, isMain); // We check whether the module is owned by the dependency tree of the
    // module that required it. If it isn't, then we need to create a new
    // store and possibly load its sandboxed PnP runtime.


    const isOwnedByRuntime = parentApi !== null ? parentApi.findPackageLocator(modulePath) !== null : false;
    const moduleApiPath = isOwnedByRuntime ? parentApiPath : opts.manager.findApiPathFor(fslib_1.npath.dirname(modulePath));
    const entry = moduleApiPath !== null ? opts.manager.getApiEntry(moduleApiPath) : {
      instance: null,
      cache: defaultCache
    }; // Check if the module has already been created for the given file

    const cacheEntry = entry.cache[modulePath];
    if (cacheEntry) return cacheEntry.exports; // Create a new module and store it into the cache
    // @ts-ignore

    const module = new module_1.Module(modulePath, parent);
    module.pnpApiPath = moduleApiPath;
    entry.cache[modulePath] = module; // The main module is exposed as global variable

    if (isMain) {
      // @ts-ignore
      process.mainModule = module;
      module.id = '.';
    } // Try to load the module, and remove it from the cache if it fails


    let hasThrown = true;

    try {
      module.load(modulePath);
      hasThrown = false;
    } finally {
      if (hasThrown) {
        delete module_1.Module._cache[modulePath];
      }
    }

    return module.exports;
  };

  const originalModuleResolveFilename = module_1.Module._resolveFilename;

  module_1.Module._resolveFilename = function (request, parent, isMain, options) {
    if (builtinModules.has(request)) return request;
    if (!enableNativeHooks) return originalModuleResolveFilename.call(module_1.Module, request, parent, isMain, options);

    if (options && options.plugnplay === false) {
      const {
        plugnplay
      } = options,
            rest = __rest(options, ["plugnplay"]); // Workaround a bug present in some version of Node (now fixed)
      // https://github.com/nodejs/node/pull/28078


      const forwardedOptions = Object.keys(rest).length > 0 ? rest : undefined;

      try {
        enableNativeHooks = false;
        return originalModuleResolveFilename.call(module_1.Module, request, parent, isMain, forwardedOptions);
      } finally {
        enableNativeHooks = true;
      }
    } // We check that all the options present here are supported; better
    // to fail fast than to introduce subtle bugs in the runtime.


    if (options) {
      const optionNames = new Set(Object.keys(options));
      optionNames.delete(`paths`);
      optionNames.delete(`plugnplay`);

      if (optionNames.size > 0) {
        throw internalTools_1.makeError(internalTools_1.ErrorCode.UNSUPPORTED, `Some options passed to require() aren't supported by PnP yet (${Array.from(optionNames).join(', ')})`);
      }
    }

    const getIssuerSpecsFromPaths = paths => {
      return paths.map(path => ({
        apiPath: opts.manager.findApiPathFor(path),
        path: fslib_1.npath.toPortablePath(path),
        module: null
      }));
    };

    const getIssuerSpecsFromModule = module => {
      const issuer = internalTools_1.getIssuerModule(module);
      const issuerPath = issuer !== null ? fslib_1.npath.dirname(issuer.filename) : process.cwd();
      return [{
        apiPath: opts.manager.getApiPathFromParent(issuer),
        path: fslib_1.npath.toPortablePath(issuerPath),
        module
      }];
    };

    const makeFakeParent = path => {
      const fakeParent = new module_1.Module(``);
      const fakeFilePath = fslib_1.ppath.join(path, `[file]`);
      fakeParent.paths = module_1.Module._nodeModulePaths(fslib_1.npath.fromPortablePath(fakeFilePath));
      return fakeParent;
    };

    const issuerSpecs = options && options.paths ? getIssuerSpecsFromPaths(options.paths) : getIssuerSpecsFromModule(parent);
    let firstError;

    for (const {
      apiPath,
      path,
      module
    } of issuerSpecs) {
      let resolution;
      const issuerApi = apiPath !== null ? opts.manager.getApiEntry(apiPath, true).instance : null;

      try {
        if (issuerApi !== null) {
          resolution = issuerApi.resolveRequest(request, `${path}/`);
        } else {
          resolution = originalModuleResolveFilename.call(module_1.Module, request, module || makeFakeParent(path), isMain);
        }
      } catch (error) {
        firstError = firstError || error;
        continue;
      }

      if (resolution !== null) {
        return resolution;
      }
    }

    const requireStack = getRequireStack(parent);
    Object.defineProperty(firstError, `requireStack`, {
      configurable: true,
      writable: true,
      enumerable: false,
      value: requireStack
    });
    if (requireStack.length > 0) firstError.message += `\nRequire stack:\n- ${requireStack.join(`\n- `)}`;
    throw firstError;
  };

  const originalFindPath = module_1.Module._findPath;

  module_1.Module._findPath = function (request, paths, isMain) {
    if (request === `pnpapi`) return false;
    if (!enableNativeHooks) return originalFindPath.call(module_1.Module, request, paths, isMain);

    for (const path of paths || []) {
      let resolution;

      try {
        const pnpApiPath = opts.manager.findApiPathFor(path);

        if (pnpApiPath !== null) {
          const api = opts.manager.getApiEntry(pnpApiPath, true).instance;
          resolution = api.resolveRequest(request, path) || false;
        } else {
          resolution = originalFindPath.call(module_1.Module, request, [path], isMain);
        }
      } catch (error) {
        continue;
      }

      if (resolution) {
        return resolution;
      }
    }

    return false;
  };

  fslib_1.patchFs(fs_1.default, new fslib_1.PosixFS(opts.fakeFs));
}

exports.applyPatch = applyPatch;
;

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const fslib_1 = __webpack_require__(5);

function hydrateRuntimeState(data, {
  basePath
}) {
  const portablePath = fslib_1.npath.toPortablePath(basePath);
  const ignorePattern = data.ignorePatternData !== null ? new RegExp(data.ignorePatternData) : null;
  const packageRegistry = new Map(data.packageRegistryData.map(([packageName, packageStoreData]) => {
    return [packageName, new Map(packageStoreData.map(([packageReference, packageInformationData]) => {
      return [packageReference, {
        packageLocation: fslib_1.ppath.resolve(portablePath, packageInformationData.packageLocation),
        packageDependencies: new Map(packageInformationData.packageDependencies),
        packagePeers: new Set(packageInformationData.packagePeers),
        linkType: packageInformationData.linkType,
        discardFromLookup: packageInformationData.discardFromLookup || false
      }];
    }))];
  }));
  const packageLocatorsByLocations = new Map();
  const packageLocationLengths = new Set();

  for (const [packageName, storeData] of data.packageRegistryData) {
    for (const [packageReference, packageInformationData] of storeData) {
      if (packageName === null !== (packageReference === null)) throw new Error(`Assertion failed: The name and reference should be null, or neither should`);
      if (packageInformationData.discardFromLookup) continue; // @ts-ignore: TypeScript isn't smart enough to understand the type assertion

      const packageLocator = {
        name: packageName,
        reference: packageReference
      };
      packageLocatorsByLocations.set(packageInformationData.packageLocation, packageLocator);
      packageLocationLengths.add(packageInformationData.packageLocation.length);
    }
  }

  for (const location of data.locationBlacklistData) packageLocatorsByLocations.set(location, null);

  const fallbackExclusionList = new Map(data.fallbackExclusionList.map(([packageName, packageReferences]) => {
    return [packageName, new Set(packageReferences)];
  }));
  const fallbackPool = new Map(data.fallbackPool);
  const dependencyTreeRoots = data.dependencyTreeRoots;
  const enableTopLevelFallback = data.enableTopLevelFallback;
  return {
    basePath: portablePath,
    dependencyTreeRoots,
    enableTopLevelFallback,
    fallbackExclusionList,
    fallbackPool,
    ignorePattern,
    packageLocationLengths: [...packageLocationLengths].sort((a, b) => b - a),
    packageLocatorsByLocations,
    packageRegistry
  };
}

exports.hydrateRuntimeState = hydrateRuntimeState;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const fslib_1 = __webpack_require__(5);

const fslib_2 = __webpack_require__(5);

const module_1 = __webpack_require__(6);

const internalTools_1 = __webpack_require__(11);

function makeApi(runtimeState, opts) {
  const alwaysWarnOnFallback = Number(process.env.PNP_ALWAYS_WARN_ON_FALLBACK) > 0;
  const debugLevel = Number(process.env.PNP_DEBUG_LEVEL); // @ts-ignore

  const builtinModules = new Set(module_1.Module.builtinModules || Object.keys(process.binding('natives'))); // Splits a require request into its components, or return null if the request is a file path

  const pathRegExp = /^(?![a-zA-Z]:[\\\/]|\\\\|\.{0,2}(?:\/|$))((?:@[^\/]+\/)?[^\/]+)\/*(.*|)$/; // Matches if the path starts with a valid path qualifier (./, ../, /)
  // eslint-disable-next-line no-unused-vars

  const isStrictRegExp = /^\.{0,2}\//; // Matches if the path must point to a directory (ie ends with /)

  const isDirRegExp = /\/$/; // We only instantiate one of those so that we can use strict-equal comparisons

  const topLevelLocator = {
    name: null,
    reference: null
  }; // Used for compatibility purposes - cf setupCompatibilityLayer

  const fallbackLocators = []; // To avoid emitting the same warning multiple times

  const emittedWarnings = new Set();
  if (runtimeState.enableTopLevelFallback === true) fallbackLocators.push(topLevelLocator);

  if (opts.compatibilityMode !== false) {
    // ESLint currently doesn't have any portable way for shared configs to
    // specify their own plugins that should be used (cf issue #10125). This
    // will likely get fixed at some point but it'll take time, so in the
    // meantime we'll just add additional fallback entries for common shared
    // configs.
    // Similarly, Gatsby generates files within the `public` folder located
    // within the project, but doesn't pre-resolve the `require` calls to use
    // its own dependencies. Meaning that when PnP see a file from the `public`
    // folder making a require, it thinks that your project forgot to list one
    // of your dependencies.
    for (const name of [`react-scripts`, `gatsby`]) {
      const packageStore = runtimeState.packageRegistry.get(name);

      if (packageStore) {
        for (const reference of packageStore.keys()) {
          if (reference === null) {
            throw new Error(`Assertion failed: This reference shouldn't be null`);
          } else {
            fallbackLocators.push({
              name,
              reference
            });
          }
        }
      }
    }
  }
  /**
   * The setup code will be injected here. The tables listed below are guaranteed to be filled after the call to
   * the $$DYNAMICALLY_GENERATED_CODE function.
   */


  const {
    ignorePattern,
    packageRegistry,
    packageLocatorsByLocations,
    packageLocationLengths
  } = runtimeState;
  /**
   * Allows to print useful logs just be setting a value in the environment
   */

  function makeLogEntry(name, args) {
    return {
      fn: name,
      args: args,
      error: null,
      result: null
    };
  }

  function maybeLog(name, fn) {
    if (opts.allowDebug === false) return fn;

    if (Number.isFinite(debugLevel)) {
      if (debugLevel >= 2) {
        return (...args) => {
          const logEntry = makeLogEntry(name, args);

          try {
            return logEntry.result = fn(...args);
          } catch (error) {
            throw logEntry.error = error;
          } finally {
            console.trace(logEntry);
          }
        };
      } else if (debugLevel >= 1) {
        return (...args) => {
          try {
            return fn(...args);
          } catch (error) {
            const logEntry = makeLogEntry(name, args);
            logEntry.error = error;
            console.trace(logEntry);
            throw error;
          }
        };
      }
    }

    return fn;
  }
  /**
   * Returns information about a package in a safe way (will throw if they cannot be retrieved)
   */


  function getPackageInformationSafe(packageLocator) {
    const packageInformation = getPackageInformation(packageLocator);

    if (!packageInformation) {
      throw internalTools_1.makeError(internalTools_1.ErrorCode.INTERNAL, `Couldn't find a matching entry in the dependency tree for the specified parent (this is probably an internal error)`);
    }

    return packageInformation;
  }
  /**
   * Returns whether the specified locator is a dependency tree root (in which case it's part of the project) or not
   */


  function isDependencyTreeRoot(packageLocator) {
    if (packageLocator.name === null) return true;

    for (const dependencyTreeRoot of runtimeState.dependencyTreeRoots) if (dependencyTreeRoot.name === packageLocator.name && dependencyTreeRoot.reference === packageLocator.reference) return true;

    return false;
  }
  /**
   * Implements the node resolution for folder access and extension selection
   */


  function applyNodeExtensionResolution(unqualifiedPath, candidates, {
    extensions
  }) {
    // We use this "infinite while" so that we can restart the process as long as we hit package folders
    while (true) {
      let stat;

      try {
        candidates.push(unqualifiedPath);
        stat = opts.fakeFs.statSync(unqualifiedPath);
      } catch (error) {} // If the file exists and is a file, we can stop right there


      if (stat && !stat.isDirectory()) return opts.fakeFs.realpathSync(unqualifiedPath); // If the file is a directory, we must check if it contains a package.json with a "main" entry

      if (stat && stat.isDirectory()) {
        let pkgJson;

        try {
          pkgJson = JSON.parse(opts.fakeFs.readFileSync(fslib_2.ppath.join(unqualifiedPath, fslib_2.toFilename(`package.json`)), `utf8`));
        } catch (error) {}

        let nextUnqualifiedPath;
        if (pkgJson && pkgJson.main) nextUnqualifiedPath = fslib_2.ppath.resolve(unqualifiedPath, pkgJson.main); // If the "main" field changed the path, we start again from this new location

        if (nextUnqualifiedPath && nextUnqualifiedPath !== unqualifiedPath) {
          const resolution = applyNodeExtensionResolution(nextUnqualifiedPath, candidates, {
            extensions
          });

          if (resolution !== null) {
            return resolution;
          }
        }
      } // Otherwise we check if we find a file that match one of the supported extensions


      const qualifiedPath = extensions.map(extension => {
        return `${unqualifiedPath}${extension}`;
      }).find(candidateFile => {
        candidates.push(candidateFile);
        return opts.fakeFs.existsSync(candidateFile);
      });
      if (qualifiedPath) return qualifiedPath; // Otherwise, we check if the path is a folder - in such a case, we try to use its index

      if (stat && stat.isDirectory()) {
        const indexPath = extensions.map(extension => {
          return fslib_2.ppath.format({
            dir: unqualifiedPath,
            name: fslib_2.toFilename(`index`),
            ext: extension
          });
        }).find(candidateFile => {
          candidates.push(candidateFile);
          return opts.fakeFs.existsSync(candidateFile);
        });

        if (indexPath) {
          return indexPath;
        }
      } // Otherwise there's nothing else we can do :(


      return null;
    }
  }
  /**
   * This function creates fake modules that can be used with the _resolveFilename function.
   * Ideally it would be nice to be able to avoid this, since it causes useless allocations
   * and cannot be cached efficiently (we recompute the nodeModulePaths every time).
   *
   * Fortunately, this should only affect the fallback, and there hopefully shouldn't have a
   * lot of them.
   */


  function makeFakeModule(path) {
    // @ts-ignore
    const fakeModule = new module_1.Module(path, null);
    fakeModule.filename = path;
    fakeModule.paths = module_1.Module._nodeModulePaths(path);
    return fakeModule;
  }
  /**
   * Normalize path to posix format.
   */


  function normalizePath(p) {
    return fslib_1.npath.toPortablePath(p);
  }
  /**
   * Forward the resolution to the next resolver (usually the native one)
   */


  function callNativeResolution(request, issuer) {
    if (issuer.endsWith(`/`)) issuer = fslib_2.ppath.join(issuer, fslib_2.toFilename(`internal.js`)); // Since we would need to create a fake module anyway (to call _resolveLookupPath that
    // would give us the paths to give to _resolveFilename), we can as well not use
    // the {paths} option at all, since it internally makes _resolveFilename create another
    // fake module anyway.

    return module_1.Module._resolveFilename(request, makeFakeModule(fslib_1.npath.fromPortablePath(issuer)), false, {
      plugnplay: false
    });
  }
  /**
   *
   */


  function isPathIgnored(path) {
    if (ignorePattern === null) return false;
    const subPath = fslib_2.ppath.contains(runtimeState.basePath, path);
    if (subPath === null) return false;

    if (ignorePattern.test(subPath.replace(/\/$/, ``))) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * This key indicates which version of the standard is implemented by this resolver. The `std` key is the
   * Plug'n'Play standard, and any other key are third-party extensions. Third-party extensions are not allowed
   * to override the standard, and can only offer new methods.
   *
   * If an new version of the Plug'n'Play standard is released and some extensions conflict with newly added
   * functions, they'll just have to fix the conflicts and bump their own version number.
   */


  const VERSIONS = {
    std: 3,
    resolveVirtual: 1
  };
  /**
   * We export a special symbol for easy access to the top level locator.
   */

  const topLevel = topLevelLocator;
  /**
   * Gets the package information for a given locator. Returns null if they cannot be retrieved.
   */

  function getPackageInformation({
    name,
    reference
  }) {
    const packageInformationStore = packageRegistry.get(name);
    if (!packageInformationStore) return null;
    const packageInformation = packageInformationStore.get(reference);
    if (!packageInformation) return null;
    return packageInformation;
  }
  /**
   * Finds the package locator that owns the specified path. If none is found, returns null instead.
   */


  function findPackageLocator(location) {
    let relativeLocation = normalizePath(fslib_2.ppath.relative(runtimeState.basePath, location));
    if (!relativeLocation.match(isStrictRegExp)) relativeLocation = `./${relativeLocation}`;
    if (location.match(isDirRegExp) && !relativeLocation.endsWith(`/`)) relativeLocation = `${relativeLocation}/`;
    let from = 0; // If someone wants to use a binary search to go from O(n) to O(log n), be my guest

    while (from < packageLocationLengths.length && packageLocationLengths[from] > relativeLocation.length) from += 1;

    for (let t = from; t < packageLocationLengths.length; ++t) {
      const locator = packageLocatorsByLocations.get(relativeLocation.substr(0, packageLocationLengths[t]));
      if (typeof locator === `undefined`) continue; // Ensures that the returned locator isn't a blacklisted one.
      //
      // Blacklisted packages are packages that cannot be used because their dependencies cannot be deduced. This only
      // happens with peer dependencies, which effectively have different sets of dependencies depending on their
      // parents.
      //
      // In order to deambiguate those different sets of dependencies, the Yarn implementation of PnP will generate a
      // symlink for each combination of <package name>/<package version>/<dependent package> it will find, and will
      // blacklist the target of those symlinks. By doing this, we ensure that files loaded through a specific path
      // will always have the same set of dependencies, provided the symlinks are correctly preserved.
      //
      // Unfortunately, some tools do not preserve them, and when it happens PnP isn't able anymore to deduce the set of
      // dependencies based on the path of the file that makes the require calls. But since we've blacklisted those
      // paths, we're able to print a more helpful error message that points out that a third-party package is doing
      // something incompatible!

      if (locator === null) {
        throw internalTools_1.makeError(internalTools_1.ErrorCode.BLACKLISTED, `A forbidden path has been used in the package resolution process - this is usually caused by one of your tools calling 'fs.realpath' on the return value of 'require.resolve'. Since we need to use symlinks to simultaneously provide valid filesystem paths and disambiguate peer dependencies, they must be passed untransformed to 'require'.\n\nForbidden path: ${location}`, {
          location
        });
      }

      return locator;
    }

    return null;
  }
  /**
   * Transforms a request (what's typically passed as argument to the require function) into an unqualified path.
   * This path is called "unqualified" because it only changes the package name to the package location on the disk,
   * which means that the end result still cannot be directly accessed (for example, it doesn't try to resolve the
   * file extension, or to resolve directories to their "index.js" content). Use the "resolveUnqualified" function
   * to convert them to fully-qualified paths, or just use "resolveRequest" that do both operations in one go.
   *
   * Note that it is extremely important that the `issuer` path ends with a forward slash if the issuer is to be
   * treated as a folder (ie. "/tmp/foo/" rather than "/tmp/foo" if "foo" is a directory). Otherwise relative
   * imports won't be computed correctly (they'll get resolved relative to "/tmp/" instead of "/tmp/foo/").
   */


  function resolveToUnqualified(request, issuer, {
    considerBuiltins = true
  } = {}) {
    // The 'pnpapi' request is reserved and will always return the path to the PnP file, from everywhere
    if (request === `pnpapi`) return fslib_1.npath.toPortablePath(opts.pnpapiResolution); // Bailout if the request is a native module

    if (considerBuiltins && builtinModules.has(request)) return null; // We allow disabling the pnp resolution for some subpaths.
    // This is because some projects, often legacy, contain multiple
    // levels of dependencies (ie. a yarn.lock inside a subfolder of
    // a yarn.lock). This is typically solved using workspaces, but
    // not all of them have been converted already.

    if (issuer && isPathIgnored(issuer)) {
      // Absolute paths that seem to belong to a PnP tree are still
      // handled by our runtime even if the issuer isn't. This is
      // because the native Node resolution uses a special version
      // of the `stat` syscall which would otherwise bypass the
      // filesystem layer we require to access the files.
      if (!fslib_2.ppath.isAbsolute(request) || findPackageLocator(request) === null) {
        const result = callNativeResolution(request, issuer);

        if (result === false) {
          throw internalTools_1.makeError(internalTools_1.ErrorCode.BUILTIN_NODE_RESOLUTION_FAILED, `The builtin node resolution algorithm was unable to resolve the requested module (it didn't go through the pnp resolver because the issuer was explicitely ignored by the regexp)\n\nRequire request: "${request}"\nRequired by: ${issuer}\n`, {
            request,
            issuer
          });
        }

        return fslib_1.npath.toPortablePath(result);
      }
    }

    let unqualifiedPath; // If the request is a relative or absolute path, we just return it normalized

    const dependencyNameMatch = request.match(pathRegExp);

    if (!dependencyNameMatch) {
      if (fslib_2.ppath.isAbsolute(request)) {
        unqualifiedPath = fslib_2.ppath.normalize(request);
      } else {
        if (!issuer) {
          throw internalTools_1.makeError(internalTools_1.ErrorCode.API_ERROR, `The resolveToUnqualified function must be called with a valid issuer when the path isn't a builtin nor absolute`, {
            request,
            issuer
          });
        }

        if (issuer.match(isDirRegExp)) {
          unqualifiedPath = fslib_2.ppath.normalize(fslib_2.ppath.resolve(issuer, request));
        } else {
          unqualifiedPath = fslib_2.ppath.normalize(fslib_2.ppath.resolve(fslib_2.ppath.dirname(issuer), request));
        }
      } // No need to use the return value; we just want to check the blacklist status


      findPackageLocator(unqualifiedPath);
    } // Things are more hairy if it's a package require - we then need to figure out which package is needed, and in
    // particular the exact version for the given location on the dependency tree
    else {
        if (!issuer) {
          throw internalTools_1.makeError(internalTools_1.ErrorCode.API_ERROR, `The resolveToUnqualified function must be called with a valid issuer when the path isn't a builtin nor absolute`, {
            request,
            issuer
          });
        }

        const [, dependencyName, subPath] = dependencyNameMatch;
        const issuerLocator = findPackageLocator(issuer); // If the issuer file doesn't seem to be owned by a package managed through pnp, then we resort to using the next
        // resolution algorithm in the chain, usually the native Node resolution one

        if (!issuerLocator) {
          const result = callNativeResolution(request, issuer);

          if (result === false) {
            throw internalTools_1.makeError(internalTools_1.ErrorCode.BUILTIN_NODE_RESOLUTION_FAILED, `The builtin node resolution algorithm was unable to resolve the requested module (it didn't go through the pnp resolver because the issuer doesn't seem to be part of the Yarn-managed dependency tree).\n\nRequire path: "${request}"\nRequired by: ${issuer}\n`, {
              request,
              issuer
            });
          }

          return fslib_1.npath.toPortablePath(result);
        }

        const issuerInformation = getPackageInformationSafe(issuerLocator); // We obtain the dependency reference in regard to the package that request it

        let dependencyReference = issuerInformation.packageDependencies.get(dependencyName);
        let fallbackReference = null; // If we can't find it, we check if we can potentially load it from the packages that have been defined as potential fallbacks.
        // It's a bit of a hack, but it improves compatibility with the existing Node ecosystem. Hopefully we should eventually be able
        // to kill this logic and become stricter once pnp gets enough traction and the affected packages fix themselves.

        if (dependencyReference == null) {
          if (issuerLocator.name !== null) {
            // To allow programs to become gradually stricter, starting from the v2 we enforce that workspaces cannot depend on fallbacks.
            // This works by having a list containing all their locators, and checking when a fallback is required whether it's one of them.
            const exclusionEntry = runtimeState.fallbackExclusionList.get(issuerLocator.name);
            const canUseFallbacks = !exclusionEntry || !exclusionEntry.has(issuerLocator.reference);

            if (canUseFallbacks) {
              for (let t = 0, T = fallbackLocators.length; t < T; ++t) {
                const fallbackInformation = getPackageInformationSafe(fallbackLocators[t]);
                const reference = fallbackInformation.packageDependencies.get(dependencyName);
                if (reference == null) continue;
                if (alwaysWarnOnFallback) fallbackReference = reference;else dependencyReference = reference;
                break;
              }

              if (dependencyReference == null && fallbackReference === null) {
                const reference = runtimeState.fallbackPool.get(dependencyName);

                if (reference != null) {
                  fallbackReference = reference;
                }
              }
            }
          }
        } // If we can't find the path, and if the package making the request is the top-level, we can offer nicer error messages


        let error = null;

        if (dependencyReference === null) {
          if (isDependencyTreeRoot(issuerLocator)) {
            error = internalTools_1.makeError(internalTools_1.ErrorCode.MISSING_PEER_DEPENDENCY, `Your application tried to access ${dependencyName} (a peer dependency); this isn't allowed as there is no ancestor to satisfy the requirement. Use a devDependency if needed.\n\nRequired package: ${dependencyName} (via "${request}")\nRequired by: ${issuer}\n`, {
              request,
              issuer,
              dependencyName
            });
          } else {
            error = internalTools_1.makeError(internalTools_1.ErrorCode.MISSING_PEER_DEPENDENCY, `${issuerLocator.name} tried to access ${dependencyName} (a peer dependency) but it isn't provided by its ancestors; this makes the require call ambiguous and unsound.\n\nRequired package: ${dependencyName} (via "${request}")\nRequired by: ${issuerLocator.name}@${issuerLocator.reference} (via ${issuer})\n`, {
              request,
              issuer,
              issuerLocator: Object.assign({}, issuerLocator),
              dependencyName
            });
          }
        } else if (dependencyReference === undefined) {
          if (isDependencyTreeRoot(issuerLocator)) {
            error = internalTools_1.makeError(internalTools_1.ErrorCode.UNDECLARED_DEPENDENCY, `Your application tried to access ${dependencyName}, but it isn't declared in your dependencies; this makes the require call ambiguous and unsound.\n\nRequired package: ${dependencyName} (via "${request}")\nRequired by: ${issuer}\n`, {
              request,
              issuer,
              dependencyName
            });
          } else {
            error = internalTools_1.makeError(internalTools_1.ErrorCode.UNDECLARED_DEPENDENCY, `${issuerLocator.name} tried to access ${dependencyName}, but it isn't declared in its dependencies; this makes the require call ambiguous and unsound.\n\nRequired package: ${dependencyName} (via "${request}")\nRequired by: ${issuerLocator.name}@${issuerLocator.reference} (via ${issuer})\n`, {
              request,
              issuer,
              issuerLocator: Object.assign({}, issuerLocator),
              dependencyName
            });
          }
        }

        if (dependencyReference == null) {
          if (fallbackReference === null || error === null) throw error || new Error(`Assertion failed: Expected an error to have been set`);
          dependencyReference = fallbackReference;
          const message = error.message.replace(/\n.*/g, ``);
          error.message = message;

          if (!emittedWarnings.has(message)) {
            emittedWarnings.add(message);
            process.emitWarning(error);
          }
        } // We need to check that the package exists on the filesystem, because it might not have been installed


        const dependencyLocator = Array.isArray(dependencyReference) ? {
          name: dependencyReference[0],
          reference: dependencyReference[1]
        } : {
          name: dependencyName,
          reference: dependencyReference
        };
        const dependencyInformation = getPackageInformationSafe(dependencyLocator);

        if (!dependencyInformation.packageLocation) {
          throw internalTools_1.makeError(internalTools_1.ErrorCode.MISSING_DEPENDENCY, `A dependency seems valid but didn't get installed for some reason. This might be caused by a partial install, such as dev vs prod.\n\nRequired package: ${dependencyLocator.name}@${dependencyLocator.reference} (via "${request}")\nRequired by: ${issuerLocator.name}@${issuerLocator.reference} (via ${issuer})\n`, {
            request,
            issuer,
            dependencyLocator: Object.assign({}, dependencyLocator)
          });
        } // Now that we know which package we should resolve to, we only have to find out the file location


        const dependencyLocation = fslib_2.ppath.resolve(runtimeState.basePath, dependencyInformation.packageLocation);

        if (subPath) {
          unqualifiedPath = fslib_2.ppath.resolve(dependencyLocation, subPath);
        } else {
          unqualifiedPath = dependencyLocation;
        }
      }

    return fslib_2.ppath.normalize(unqualifiedPath);
  }

  ;
  /**
   * Transforms an unqualified path into a qualified path by using the Node resolution algorithm (which automatically
   * appends ".js" / ".json", and transforms directory accesses into "index.js").
   */

  function resolveUnqualified(unqualifiedPath, {
    extensions = Object.keys(module_1.Module._extensions)
  } = {}) {
    const candidates = [];
    const qualifiedPath = applyNodeExtensionResolution(unqualifiedPath, candidates, {
      extensions
    });

    if (qualifiedPath) {
      return fslib_2.ppath.normalize(qualifiedPath);
    } else {
      throw internalTools_1.makeError(internalTools_1.ErrorCode.QUALIFIED_PATH_RESOLUTION_FAILED, `Qualified path resolution failed - none of the candidates can be found on the disk.\n\nSource path: ${unqualifiedPath}\n${candidates.map(candidate => `Rejected candidate: ${candidate}\n`).join(``)}`, {
        unqualifiedPath
      });
    }
  }

  ;
  /**
   * Transforms a request into a fully qualified path.
   *
   * Note that it is extremely important that the `issuer` path ends with a forward slash if the issuer is to be
   * treated as a folder (ie. "/tmp/foo/" rather than "/tmp/foo" if "foo" is a directory). Otherwise relative
   * imports won't be computed correctly (they'll get resolved relative to "/tmp/" instead of "/tmp/foo/").
   */

  function resolveRequest(request, issuer, {
    considerBuiltins,
    extensions
  } = {}) {
    let unqualifiedPath = resolveToUnqualified(request, issuer, {
      considerBuiltins
    });
    if (unqualifiedPath === null) return null;

    try {
      return resolveUnqualified(unqualifiedPath, {
        extensions
      });
    } catch (resolutionError) {
      if (resolutionError.pnpCode === 'QUALIFIED_PATH_RESOLUTION_FAILED') Object.assign(resolutionError.data, {
        request,
        issuer
      });
      throw resolutionError;
    }
  }

  ;

  function resolveVirtual(request) {
    const normalized = fslib_2.ppath.normalize(request);
    const resolved = fslib_1.VirtualFS.resolveVirtual(normalized);
    return resolved !== normalized ? resolved : null;
  }

  return {
    VERSIONS,
    topLevel,
    getLocator: (name, referencish) => {
      if (Array.isArray(referencish)) {
        return {
          name: referencish[0],
          reference: referencish[1]
        };
      } else {
        return {
          name,
          reference: referencish
        };
      }
    },
    getDependencyTreeRoots: () => {
      return [...runtimeState.dependencyTreeRoots];
    },
    getPackageInformation: locator => {
      const info = getPackageInformation(locator);
      if (info === null) return null;
      const packageLocation = fslib_1.npath.fromPortablePath(info.packageLocation);
      const nativeInfo = Object.assign(Object.assign({}, info), {
        packageLocation
      });
      return nativeInfo;
    },
    findPackageLocator: path => {
      return findPackageLocator(fslib_1.npath.toPortablePath(path));
    },
    resolveToUnqualified: maybeLog(`resolveToUnqualified`, (request, issuer, opts) => {
      const portableIssuer = issuer !== null ? fslib_1.npath.toPortablePath(issuer) : null;
      const resolution = resolveToUnqualified(fslib_1.npath.toPortablePath(request), portableIssuer, opts);
      if (resolution === null) return null;
      return fslib_1.npath.fromPortablePath(resolution);
    }),
    resolveUnqualified: maybeLog(`resolveUnqualified`, (unqualifiedPath, opts) => {
      return fslib_1.npath.fromPortablePath(resolveUnqualified(fslib_1.npath.toPortablePath(unqualifiedPath), opts));
    }),
    resolveRequest: maybeLog(`resolveRequest`, (request, issuer, opts) => {
      const portableIssuer = issuer !== null ? fslib_1.npath.toPortablePath(issuer) : null;
      const resolution = resolveRequest(fslib_1.npath.toPortablePath(request), portableIssuer, opts);
      if (resolution === null) return null;
      return fslib_1.npath.fromPortablePath(resolution);
    }),
    resolveVirtual: maybeLog(`resolveVirtual`, path => {
      const result = resolveVirtual(fslib_1.npath.toPortablePath(path));

      if (result !== null) {
        return fslib_1.npath.fromPortablePath(result);
      } else {
        return null;
      }
    })
  };
}

exports.makeApi = makeApi;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const fslib_1 = __webpack_require__(5);

const module_1 = __webpack_require__(6);

function makeManager(pnpapi, opts) {
  const initialApiPath = fslib_1.npath.toPortablePath(pnpapi.resolveToUnqualified(`pnpapi`, null));
  const initialApiStats = opts.fakeFs.statSync(fslib_1.npath.toPortablePath(initialApiPath));
  const apiMetadata = new Map([[initialApiPath, {
    cache: module_1.Module._cache,
    instance: pnpapi,
    stats: initialApiStats
  }]]);

  function loadApiInstance(pnpApiPath) {
    const nativePath = fslib_1.npath.fromPortablePath(pnpApiPath); // @ts-ignore

    const module = new module_1.Module(nativePath, null);
    module.load(nativePath);
    return module.exports;
  }

  function refreshApiEntry(pnpApiPath, apiEntry) {
    const stats = opts.fakeFs.statSync(pnpApiPath);

    if (stats.mtime > apiEntry.stats.mtime) {
      console.warn(`[Warning] The runtime detected new informations in a PnP file; reloading the API instance (${pnpApiPath})`);
      apiEntry.instance = loadApiInstance(pnpApiPath);
      apiEntry.stats = stats;
    }
  }

  function getApiEntry(pnpApiPath, refresh = false) {
    let apiEntry = apiMetadata.get(pnpApiPath);

    if (typeof apiEntry !== `undefined`) {
      if (refresh) {
        refreshApiEntry(pnpApiPath, apiEntry);
      }
    } else {
      apiMetadata.set(pnpApiPath, apiEntry = {
        cache: {},
        instance: loadApiInstance(pnpApiPath),
        stats: opts.fakeFs.statSync(pnpApiPath)
      });
    }

    return apiEntry;
  }

  function findApiPathFor(modulePath) {
    let curr;
    let next = fslib_1.npath.toPortablePath(modulePath);

    do {
      curr = next;
      const candidate = fslib_1.ppath.join(curr, `.pnp.js`);
      if (fslib_1.xfs.existsSync(candidate) && fslib_1.xfs.statSync(candidate).isFile()) return candidate;
      next = fslib_1.ppath.dirname(curr);
    } while (curr !== fslib_1.PortablePath.root);

    return null;
  }

  function getApiPathFromParent(parent) {
    if (parent == null) return initialApiPath;

    if (typeof parent.pnpApiPath === `undefined`) {
      if (parent.filename !== null) {
        return findApiPathFor(parent.filename);
      } else {
        return initialApiPath;
      }
    }

    if (parent.pnpApiPath !== null) return parent.pnpApiPath;
    return null;
  }

  return {
    getApiPathFromParent,
    findApiPathFor,
    getApiEntry
  };
}

exports.makeManager = makeManager;

/***/ })
/******/ ])["default"];
});