module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./functions/handler.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./functions/handler.ts":
/*!******************************!*\
  !*** ./functions/handler.ts ***!
  \******************************/
/*! exports provided: scrap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"scrap\", function() { return scrap; });\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var middy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! middy */ \"middy\");\n/* harmony import */ var middy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(middy__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! chrome-aws-lambda */ \"chrome-aws-lambda\");\n/* harmony import */ var chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var puppeteer_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! puppeteer-core */ \"puppeteer-core\");\n/* harmony import */ var puppeteer_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(puppeteer_core__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var middy_middlewares__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! middy/middlewares */ \"middy/middlewares\");\n/* harmony import */ var middy_middlewares__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(middy_middlewares__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n\n\n\nconst handler = async event => {\n  const executablePath = event.isOffline ? \"./node_modules/puppeteer/.local-chromium/linux-674921/chrome-linux/chrome\" : await chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_2___default.a.executablePath;\n  const browser = await puppeteer_core__WEBPACK_IMPORTED_MODULE_3___default.a.launch({\n    args: chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_2___default.a.args,\n    executablePath\n  });\n  /*\n    const page = await browser.newPage();\n  \n    await page.goto(\"https://www.google.com\", {\n      waitUntil: [\"networkidle0\", \"load\", \"domcontentloaded\"]\n    });\n  \n    const title = await page.title();\n  \n    return {\n      statusCode: 200,\n      body: JSON.stringify({title: title})\n    };\n  */\n\n  const hrstart = process.hrtime();\n  const result = await getResult(browser);\n  const hrend = process.hrtime(hrstart);\n  console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);\n  console.log(result); //ws.send(JSON.stringify({ result: enc.toString('hex') }))\n\n  return {\n    statusCode: 200,\n    headers: {\n      \"Content-type\": \"application/json\"\n    },\n    body: JSON.stringify(result)\n  };\n};\n\nconst separator = '|||';\n\nfunction removeDuplicates(coll) {\n  const result = new Map();\n\n  for (const i of coll) {\n    const temp = result.get(i.id);\n\n    if (temp) {\n      temp.amount = temp.amount + i.amount;\n    } else if (i.date && i.concept && i.amount) {\n      result.set(i.id, i);\n    }\n  }\n\n  const resultArr = [];\n\n  for (const j of result.values()) {\n    resultArr.push(j);\n  }\n\n  return resultArr;\n}\n\nfunction scrapLine(line) {\n  const parts = line.split(separator);\n\n  if (parts[2]) {\n    parts[2] = parts[2].replace(',', '.');\n  }\n\n  const result = {\n    id: crypto__WEBPACK_IMPORTED_MODULE_0___default.a.createHash('sha256').update(JSON.stringify(parts)).digest('hex'),\n    date: parts[0],\n    concept: parts[1],\n    amount: parseFloat(parts[2])\n  };\n  return result;\n}\n\nfunction waitForFrame(page, frameName) {\n  let fulfill;\n  const promise = new Promise(x => fulfill = x);\n  checkFrame();\n  return promise;\n\n  function checkFrame() {\n    const frame = page.frames().find(f => f.name() === frameName);\n\n    if (frame) {\n      fulfill(frame);\n    } else {\n      page.once('frameattached', checkFrame);\n    }\n  }\n}\n\nasync function getResult(browser) {\n  try {\n    const page = await browser.newPage();\n    await page.setRequestInterception(true);\n    page.on('request', req => {\n      if (req.resourceType() == 'font' || req.resourceType() == 'image') {\n        req.abort();\n      } else {\n        req.continue();\n      }\n    });\n    await page.goto('https://www.cajamar.es/es/comun/acceder-a-banca-electronica-reintentar/');\n    await page.setViewport({\n      width: 1920,\n      height: 1080\n    });\n    await page.type('#COD_NEW3', process.env.USER);\n    await page.type('#PASS_NEW3', process.env.PASS);\n    await page.click('.lnkAceptar');\n    await page.waitFor('#principaln1_cuentas'); //ws.send('10%')\n\n    await page.click('#principaln1_cuentas'); //ws.send('20%')\n\n    await page.click('a[data-id=n3_movimientos]');\n    page.on('console', msg => console.log('PAGE LOG:', msg.text()));\n    const frame = await waitForFrame(page, 'contenido'); //ws.send('30%')\n\n    await frame.waitForSelector('button');\n    await frame.evaluate(() => {\n      // document.querySelector(\".z-spinner-input\").textContent = \"0\"\n      document.querySelector('.z-spinner-input').value = '0';\n    });\n    await frame.type('.z-spinner-input', '180');\n    await frame.focus('button');\n    await frame.waitFor(1000);\n    await frame.click('button'); //ws.send('40%')\n\n    const frame2 = await waitForFrame(page, 'contenido');\n    await frame2.waitForSelector('.z-column-content');\n    await frame2.click('.z-column-content');\n    await frame2.waitFor('.z-icon-caret-up'); //ws.send('60%')\n\n    await frame2.click('.z-column-content');\n    await frame2.waitFor('.z-icon-caret-down'); //ws.send('70%')\n\n    const movements = await frame2.evaluate(() => {\n      let result = '';\n      const numberCols = 3;\n      const elements = Array.from(document.querySelectorAll(\".z-cell[data-title='Concepto'],.z-cell[data-title='Fecha'],.z-cell[data-title='Importe']\"));\n      elements.forEach((element, index) => {\n        const i = index + 1;\n\n        if (i % numberCols === 0) {\n          result += element.textContent + '\\n';\n        } else {\n          result += element.textContent + '|||';\n        }\n      });\n      return result;\n    }); //ws.send('80%')\n\n    const resFinal = movements.split('\\n').map(x => {\n      return scrapLine(x);\n    }); //ws.send('100%')\n\n    return removeDuplicates(resFinal);\n  } finally {\n    console.log('cerrando browser');\n    await browser.close();\n  }\n}\n\nconst scrap = middy__WEBPACK_IMPORTED_MODULE_1___default()(handler).use(Object(middy_middlewares__WEBPACK_IMPORTED_MODULE_4__[\"httpHeaderNormalizer\"])()).use(Object(middy_middlewares__WEBPACK_IMPORTED_MODULE_4__[\"cors\"])()).use(Object(middy_middlewares__WEBPACK_IMPORTED_MODULE_4__[\"doNotWaitForEmptyEventLoop\"])()).use(Object(middy_middlewares__WEBPACK_IMPORTED_MODULE_4__[\"httpErrorHandler\"])());\n\n//# sourceURL=webpack:///./functions/handler.ts?");

/***/ }),

/***/ "chrome-aws-lambda":
/*!************************************!*\
  !*** external "chrome-aws-lambda" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"chrome-aws-lambda\");\n\n//# sourceURL=webpack:///external_%22chrome-aws-lambda%22?");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"crypto\");\n\n//# sourceURL=webpack:///external_%22crypto%22?");

/***/ }),

/***/ "middy":
/*!************************!*\
  !*** external "middy" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"middy\");\n\n//# sourceURL=webpack:///external_%22middy%22?");

/***/ }),

/***/ "middy/middlewares":
/*!************************************!*\
  !*** external "middy/middlewares" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"middy/middlewares\");\n\n//# sourceURL=webpack:///external_%22middy/middlewares%22?");

/***/ }),

/***/ "puppeteer-core":
/*!*********************************!*\
  !*** external "puppeteer-core" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"puppeteer-core\");\n\n//# sourceURL=webpack:///external_%22puppeteer-core%22?");

/***/ })

/******/ });