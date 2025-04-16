"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/auth/login";
exports.ids = ["pages/api/auth/login"];
exports.modules = {

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "cookie":
/*!*************************!*\
  !*** external "cookie" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("cookie");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "knex":
/*!***********************!*\
  !*** external "knex" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("knex");

/***/ }),

/***/ "next/dist/compiled/next-server/pages-api.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages-api.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/pages-api.runtime.dev.js");

/***/ }),

/***/ "(api)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fauth%2Flogin&preferredRegion=&absolutePagePath=.%2Fsrc%2Fpages%2Fapi%2Fauth%2Flogin%2Findex.ts&middlewareConfigBase64=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fauth%2Flogin&preferredRegion=&absolutePagePath=.%2Fsrc%2Fpages%2Fapi%2Fauth%2Flogin%2Findex.ts&middlewareConfigBase64=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   routeModule: () => (/* binding */ routeModule)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/pages-api/module.compiled */ \"(api)/./node_modules/next/dist/server/future/route-modules/pages-api/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(api)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/build/templates/helpers */ \"(api)/./node_modules/next/dist/build/templates/helpers.js\");\n/* harmony import */ var _src_pages_api_auth_login_index_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/pages/api/auth/login/index.ts */ \"(api)/./src/pages/api/auth/login/index.ts\");\n\n\n\n// Import the userland code.\n\n// Re-export the handler (should be the default export).\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_src_pages_api_auth_login_index_ts__WEBPACK_IMPORTED_MODULE_3__, \"default\"));\n// Re-export config.\nconst config = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_src_pages_api_auth_login_index_ts__WEBPACK_IMPORTED_MODULE_3__, \"config\");\n// Create and export the route module that will be consumed.\nconst routeModule = new next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__.PagesAPIRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.PAGES_API,\n        page: \"/api/auth/login\",\n        pathname: \"/api/auth/login\",\n        // The following aren't used in production.\n        bundlePath: \"\",\n        filename: \"\"\n    },\n    userland: _src_pages_api_auth_login_index_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n\n//# sourceMappingURL=pages-api.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LXJvdXRlLWxvYWRlci9pbmRleC5qcz9raW5kPVBBR0VTX0FQSSZwYWdlPSUyRmFwaSUyRmF1dGglMkZsb2dpbiZwcmVmZXJyZWRSZWdpb249JmFic29sdXRlUGFnZVBhdGg9LiUyRnNyYyUyRnBhZ2VzJTJGYXBpJTJGYXV0aCUyRmxvZ2luJTJGaW5kZXgudHMmbWlkZGxld2FyZUNvbmZpZ0Jhc2U2ND1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ0w7QUFDMUQ7QUFDZ0U7QUFDaEU7QUFDQSxpRUFBZSx3RUFBSyxDQUFDLCtEQUFRLFlBQVksRUFBQztBQUMxQztBQUNPLGVBQWUsd0VBQUssQ0FBQywrREFBUTtBQUNwQztBQUNPLHdCQUF3QixnSEFBbUI7QUFDbEQ7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsWUFBWTtBQUNaLENBQUM7O0FBRUQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0LXRlbXBsYXRlLz8yZTZlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBhZ2VzQVBJUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9wYWdlcy1hcGkvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgaG9pc3QgfSBmcm9tIFwibmV4dC9kaXN0L2J1aWxkL3RlbXBsYXRlcy9oZWxwZXJzXCI7XG4vLyBJbXBvcnQgdGhlIHVzZXJsYW5kIGNvZGUuXG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiLi9zcmMvcGFnZXMvYXBpL2F1dGgvbG9naW4vaW5kZXgudHNcIjtcbi8vIFJlLWV4cG9ydCB0aGUgaGFuZGxlciAoc2hvdWxkIGJlIHRoZSBkZWZhdWx0IGV4cG9ydCkuXG5leHBvcnQgZGVmYXVsdCBob2lzdCh1c2VybGFuZCwgXCJkZWZhdWx0XCIpO1xuLy8gUmUtZXhwb3J0IGNvbmZpZy5cbmV4cG9ydCBjb25zdCBjb25maWcgPSBob2lzdCh1c2VybGFuZCwgXCJjb25maWdcIik7XG4vLyBDcmVhdGUgYW5kIGV4cG9ydCB0aGUgcm91dGUgbW9kdWxlIHRoYXQgd2lsbCBiZSBjb25zdW1lZC5cbmV4cG9ydCBjb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBQYWdlc0FQSVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5QQUdFU19BUEksXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hdXRoL2xvZ2luXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9sb2dpblwiLFxuICAgICAgICAvLyBUaGUgZm9sbG93aW5nIGFyZW4ndCB1c2VkIGluIHByb2R1Y3Rpb24uXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcIlwiXG4gICAgfSxcbiAgICB1c2VybGFuZFxufSk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhZ2VzLWFwaS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fauth%2Flogin&preferredRegion=&absolutePagePath=.%2Fsrc%2Fpages%2Fapi%2Fauth%2Flogin%2Findex.ts&middlewareConfigBase64=e30%3D!\n");

/***/ }),

/***/ "(api)/./knexfile.js":
/*!*********************!*\
  !*** ./knexfile.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// import dotenv from \"dotenv\";\n// dotenv.config();\n\nconst dotenv = __webpack_require__(/*! dotenv */ \"dotenv\");\ndotenv.config();\nconst knexConfig = {\n    development: {\n        client: \"pg\",\n        connection: {\n            host: \"localhost\",\n            port: 5432,\n            user: \"postgres\",\n            password: \"itsmine\",\n            database: \"SchoolGrid\"\n        },\n        migrations: {\n            tableName: \"knex_migrations\",\n            directory: \"./migrations\"\n        },\n        seeds: {\n            directory: \"./seeds\"\n        },\n        pool: {\n            min: 2,\n            max: 10\n        }\n    },\n    production: {\n        client: \"pg\",\n        connection: process.env.POSTGRES_URL,\n        ssl: {\n            rejectUnauthorized: false\n        },\n        migrations: {\n            tableName: \"knex_migrations\",\n            directory: \"./migrations\"\n        },\n        seeds: {\n            directory: \"./seeds\"\n        },\n        pool: {\n            min: 2,\n            max: 10\n        }\n    }\n};\nmodule.exports = knexConfig; //bun init -y\n //bun ./lib/db.ts\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9rbmV4ZmlsZS5qcyIsIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFDL0IsbUJBQW1COztBQUVuQixNQUFNQSxTQUFTQyxtQkFBT0EsQ0FBQztBQUN2QkQsT0FBT0UsTUFBTTtBQUdiLE1BQU1DLGFBQWE7SUFDakJDLGFBQWE7UUFDWEMsUUFBUTtRQUNSQyxZQUFZO1lBQ1ZDLE1BQU07WUFDTkMsTUFBTTtZQUNOQyxNQUFNO1lBQ05DLFVBQVU7WUFDVkMsVUFBVTtRQUNaO1FBQ0FDLFlBQVk7WUFDVkMsV0FBVztZQUNYQyxXQUFXO1FBQ2I7UUFDQUMsT0FBTztZQUNMRCxXQUFXO1FBQ2I7UUFDQUUsTUFBTTtZQUNKQyxLQUFLO1lBQ0xDLEtBQUs7UUFDUDtJQUNGO0lBQ0FDLFlBQVk7UUFDVmQsUUFBUTtRQUNSQyxZQUFZYyxRQUFRQyxHQUFHLENBQUNDLFlBQVk7UUFDcENDLEtBQUs7WUFDSEMsb0JBQW9CO1FBRXRCO1FBQ0FaLFlBQVk7WUFDVkMsV0FBVztZQUNYQyxXQUFXO1FBQ2I7UUFDQUMsT0FBTztZQUNMRCxXQUFXO1FBQ2I7UUFDQUUsTUFBTTtZQUNKQyxLQUFLO1lBQ0xDLEtBQUs7UUFDUDtJQUNGO0FBQ0Y7QUFDQU8sT0FBT0MsT0FBTyxHQUFHdkIsWUFFakIsYUFBYTtDQUNiLGlCQUFpQiIsInNvdXJjZXMiOlsid2VicGFjazovL25leHQtdGVtcGxhdGUvLi9rbmV4ZmlsZS5qcz8yMzMxIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCBkb3RlbnYgZnJvbSBcImRvdGVudlwiO1xuLy8gZG90ZW52LmNvbmZpZygpO1xuXG5jb25zdCBkb3RlbnYgPSByZXF1aXJlKCdkb3RlbnYnKTtcbmRvdGVudi5jb25maWcoKTtcblxuXG5jb25zdCBrbmV4Q29uZmlnID0ge1xuICBkZXZlbG9wbWVudDoge1xuICAgIGNsaWVudDogXCJwZ1wiLFxuICAgIGNvbm5lY3Rpb246IHtcbiAgICAgIGhvc3Q6IFwibG9jYWxob3N0XCIsXG4gICAgICBwb3J0OiA1NDMyLCBcbiAgICAgIHVzZXI6IFwicG9zdGdyZXNcIiwgXG4gICAgICBwYXNzd29yZDogXCJpdHNtaW5lXCIsIC8vIENoYW5nZSB0byB5b3VyIFBvc3RncmVTUUwgcGFzc3dvcmRcbiAgICAgIGRhdGFiYXNlOiBcIlNjaG9vbEdyaWRcIiwgLy8gQ2hhbmdlIHRvIHlvdXIgZGF0YWJhc2UgbmFtZVxuICAgIH0sXG4gICAgbWlncmF0aW9uczoge1xuICAgICAgdGFibGVOYW1lOiBcImtuZXhfbWlncmF0aW9uc1wiLFxuICAgICAgZGlyZWN0b3J5OiBcIi4vbWlncmF0aW9uc1wiLFxuICAgIH0sXG4gICAgc2VlZHM6IHtcbiAgICAgIGRpcmVjdG9yeTogXCIuL3NlZWRzXCIsXG4gICAgfSxcbiAgICBwb29sOiB7XG4gICAgICBtaW46IDIsXG4gICAgICBtYXg6IDEwLFxuICAgIH0sXG4gIH0sXG4gIHByb2R1Y3Rpb246IHtcbiAgICBjbGllbnQ6IFwicGdcIixcbiAgICBjb25uZWN0aW9uOiBwcm9jZXNzLmVudi5QT1NUR1JFU19VUkwsXG4gICAgc3NsOiB7XG4gICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IGZhbHNlLFxuICAgICAgLy8gc3NsbW9kZTogXCJyZXF1aXJlXCIsXG4gICAgfSxcbiAgICBtaWdyYXRpb25zOiB7XG4gICAgICB0YWJsZU5hbWU6IFwia25leF9taWdyYXRpb25zXCIsXG4gICAgICBkaXJlY3Rvcnk6IFwiLi9taWdyYXRpb25zXCIsXG4gICAgfSxcbiAgICBzZWVkczoge1xuICAgICAgZGlyZWN0b3J5OiBcIi4vc2VlZHNcIixcbiAgICB9LFxuICAgIHBvb2w6IHtcbiAgICAgIG1pbjogMixcbiAgICAgIG1heDogMTAsXG4gICAgfSxcbiAgfSxcbn07XG5tb2R1bGUuZXhwb3J0cyA9IGtuZXhDb25maWc7XG5cbi8vYnVuIGluaXQgLXlcbi8vYnVuIC4vbGliL2RiLnRzXG4iXSwibmFtZXMiOlsiZG90ZW52IiwicmVxdWlyZSIsImNvbmZpZyIsImtuZXhDb25maWciLCJkZXZlbG9wbWVudCIsImNsaWVudCIsImNvbm5lY3Rpb24iLCJob3N0IiwicG9ydCIsInVzZXIiLCJwYXNzd29yZCIsImRhdGFiYXNlIiwibWlncmF0aW9ucyIsInRhYmxlTmFtZSIsImRpcmVjdG9yeSIsInNlZWRzIiwicG9vbCIsIm1pbiIsIm1heCIsInByb2R1Y3Rpb24iLCJwcm9jZXNzIiwiZW52IiwiUE9TVEdSRVNfVVJMIiwic3NsIiwicmVqZWN0VW5hdXRob3JpemVkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./knexfile.js\n");

/***/ }),

/***/ "(api)/./src/lib/db.ts":
/*!***********************!*\
  !*** ./src/lib/db.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _knexfile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/knexfile */ \"(api)/./knexfile.js\");\n/* harmony import */ var _knexfile__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_knexfile__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var knex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! knex */ \"knex\");\n/* harmony import */ var knex__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(knex__WEBPACK_IMPORTED_MODULE_1__);\n\n\n// Determine the correct environment configuration\nconst environmentConfig =  false ? 0 : (_knexfile__WEBPACK_IMPORTED_MODULE_0___default().development);\n// Initialize knex with the appropriate environment configuration\nconst pg = knex__WEBPACK_IMPORTED_MODULE_1___default()(environmentConfig);\n// Test the database connection\npg.raw(\"SELECT 1\").then(()=>console.log(\"Database connected\")).catch((err)=>console.error(\"Database connection failed\", err));\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pg);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvbGliL2RiLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQW9DO0FBQ1o7QUFHeEIsa0RBQWtEO0FBQ2xELE1BQU1FLG9CQUFvQkMsTUFBcUMsR0FDM0RILENBQXFCLEdBQ3JCQSw4REFBc0I7QUFFMUIsaUVBQWlFO0FBQ2pFLE1BQU1NLEtBQUtMLDJDQUFJQSxDQUFDQztBQUNoQiwrQkFBK0I7QUFDL0JJLEdBQUdDLEdBQUcsQ0FBQyxZQUNKQyxJQUFJLENBQUMsSUFBTUMsUUFBUUMsR0FBRyxDQUFDLHVCQUN2QkMsS0FBSyxDQUFDLENBQUNDLE1BQVFILFFBQVFJLEtBQUssQ0FBQyw4QkFBOEJEO0FBRTlELGlFQUFlTixFQUFFQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dC10ZW1wbGF0ZS8uL3NyYy9saWIvZGIudHM/OWU0ZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQga25leENvbmZpZyBmcm9tIFwiQC9rbmV4ZmlsZVwiO1xuaW1wb3J0IGtuZXggZnJvbSBcImtuZXhcIjtcblxuXG4vLyBEZXRlcm1pbmUgdGhlIGNvcnJlY3QgZW52aXJvbm1lbnQgY29uZmlndXJhdGlvblxuY29uc3QgZW52aXJvbm1lbnRDb25maWcgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIgXG4gID8ga25leENvbmZpZy5wcm9kdWN0aW9uIFxuICA6IGtuZXhDb25maWcuZGV2ZWxvcG1lbnQ7XG5cbi8vIEluaXRpYWxpemUga25leCB3aXRoIHRoZSBhcHByb3ByaWF0ZSBlbnZpcm9ubWVudCBjb25maWd1cmF0aW9uXG5jb25zdCBwZyA9IGtuZXgoZW52aXJvbm1lbnRDb25maWcpO1xuLy8gVGVzdCB0aGUgZGF0YWJhc2UgY29ubmVjdGlvblxucGcucmF3KFwiU0VMRUNUIDFcIilcbiAgLnRoZW4oKCkgPT4gY29uc29sZS5sb2coXCJEYXRhYmFzZSBjb25uZWN0ZWRcIikpXG4gIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmVycm9yKFwiRGF0YWJhc2UgY29ubmVjdGlvbiBmYWlsZWRcIiwgZXJyKSk7XG5cbmV4cG9ydCBkZWZhdWx0IHBnO1xuIl0sIm5hbWVzIjpbImtuZXhDb25maWciLCJrbmV4IiwiZW52aXJvbm1lbnRDb25maWciLCJwcm9jZXNzIiwicHJvZHVjdGlvbiIsImRldmVsb3BtZW50IiwicGciLCJyYXciLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsImNhdGNoIiwiZXJyIiwiZXJyb3IiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/lib/db.ts\n");

/***/ }),

/***/ "(api)/./src/pages/api/auth/login/index.ts":
/*!*******************************************!*\
  !*** ./src/pages/api/auth/login/index.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _src_lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/src/lib/db */ \"(api)/./src/lib/db.ts\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cookie */ \"cookie\");\n/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cookie__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n // <-- ✅ Import cookie serializer\nasync function handler(req, res) {\n    if (req.method !== \"POST\") {\n        return res.status(405).json({\n            status: false,\n            error: \"Method not allowed\"\n        });\n    }\n    try {\n        const { email, password } = req.body;\n        const user = await (0,_src_lib_db__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"users\").where({\n            email\n        }).first();\n        if (!user) {\n            return res.status(400).json({\n                message: \"User not found\"\n            });\n        }\n        // if(user.role !== 'admin') {\n        //   return res.status(400).json({ message: \"Access denied\" });\n        // }\n        const isPasswordValid = await bcrypt__WEBPACK_IMPORTED_MODULE_1___default().compare(password, user.password);\n        if (!isPasswordValid) {\n            return res.status(400).json({\n                message: \"Invalid password\"\n            });\n        }\n        const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default().sign({\n            id: user.id,\n            email: user.email,\n            name: user.name,\n            role: user.role\n        }, process.env.JWT_SECRET, {\n            expiresIn: \"1h\"\n        });\n        // ✅ Set cookie manually\n        res.setHeader(\"Set-Cookie\", (0,cookie__WEBPACK_IMPORTED_MODULE_3__.serialize)(\"token\", token, {\n            httpOnly: true,\n            secure: \"development\" === \"production\",\n            maxAge: 60 * 60,\n            path: \"/\",\n            sameSite:  false ? 0 : \"lax\"\n        }));\n        return res.status(200).json({\n            status: true,\n            message: \"Login successful\"\n        });\n    } catch (error) {\n        return res.status(500).json({\n            status: false,\n            error: error.message || \"Internal server error\"\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2F1dGgvbG9naW4vaW5kZXgudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBOEI7QUFFRjtBQUNHO0FBQ0ksQ0FBQyxpQ0FBaUM7QUFFdEQsZUFBZUksUUFBUUMsR0FBbUIsRUFBRUMsR0FBb0I7SUFDN0UsSUFBSUQsSUFBSUUsTUFBTSxLQUFLLFFBQVE7UUFDekIsT0FBT0QsSUFBSUUsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztZQUFFRCxRQUFRO1lBQU9FLE9BQU87UUFBcUI7SUFDM0U7SUFFQSxJQUFJO1FBQ0YsTUFBTSxFQUFFQyxLQUFLLEVBQUVDLFFBQVEsRUFBRSxHQUFHUCxJQUFJUSxJQUFJO1FBRXBDLE1BQU1DLE9BQU8sTUFBTWQsdURBQUVBLENBQUMsU0FBU2UsS0FBSyxDQUFDO1lBQUVKO1FBQU0sR0FBR0ssS0FBSztRQUVyRCxJQUFJLENBQUNGLE1BQU07WUFDVCxPQUFPUixJQUFJRSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO2dCQUFFUSxTQUFTO1lBQWlCO1FBQzFEO1FBQ0EsOEJBQThCO1FBQzlCLCtEQUErRDtRQUMvRCxJQUFJO1FBRUosTUFBTUMsa0JBQWtCLE1BQU1qQixxREFBYyxDQUFDVyxVQUFVRSxLQUFLRixRQUFRO1FBQ3BFLElBQUksQ0FBQ00saUJBQWlCO1lBQ3BCLE9BQU9aLElBQUlFLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7Z0JBQUVRLFNBQVM7WUFBbUI7UUFDNUQ7UUFFQSxNQUFNRyxRQUFRbEIsd0RBQVEsQ0FDcEI7WUFBRW9CLElBQUlSLEtBQUtRLEVBQUU7WUFBRVgsT0FBT0csS0FBS0gsS0FBSztZQUFFWSxNQUFNVCxLQUFLUyxJQUFJO1lBQUVDLE1BQU1WLEtBQUtVLElBQUk7UUFBQyxHQUNuRUMsUUFBUUMsR0FBRyxDQUFDQyxVQUFVLEVBQ3RCO1lBQUVDLFdBQVc7UUFBSztRQUdwQix3QkFBd0I7UUFDeEJ0QixJQUFJdUIsU0FBUyxDQUNYLGNBQ0ExQixpREFBU0EsQ0FBQyxTQUFTaUIsT0FBTztZQUN4QlUsVUFBVTtZQUNWQyxRQUFRTixrQkFBeUI7WUFDakNPLFFBQVEsS0FBSztZQUNiQyxNQUFNO1lBQ05DLFVBQVVULE1BQXFDLEdBQUcsQ0FBTSxHQUFHO1FBQzdEO1FBR0YsT0FBT25CLElBQUlFLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7WUFBRUQsUUFBUTtZQUFNUyxTQUFTO1FBQW1CO0lBQzFFLEVBQUUsT0FBT1AsT0FBWTtRQUNuQixPQUFPSixJQUNKRSxNQUFNLENBQUMsS0FDUEMsSUFBSSxDQUFDO1lBQUVELFFBQVE7WUFBT0UsT0FBT0EsTUFBTU8sT0FBTyxJQUFJO1FBQXdCO0lBQzNFO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0LXRlbXBsYXRlLy4vc3JjL3BhZ2VzL2FwaS9hdXRoL2xvZ2luL2luZGV4LnRzPzRmMmQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBnIGZyb20gXCJAL3NyYy9saWIvZGJcIjtcbmltcG9ydCB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tIFwibmV4dFwiO1xuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0XCI7XG5pbXBvcnQgand0IGZyb20gXCJqc29ud2VidG9rZW5cIjtcbmltcG9ydCB7IHNlcmlhbGl6ZSB9IGZyb20gXCJjb29raWVcIjsgLy8gPC0tIOKchSBJbXBvcnQgY29va2llIHNlcmlhbGl6ZXJcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihyZXE6IE5leHRBcGlSZXF1ZXN0LCByZXM6IE5leHRBcGlSZXNwb25zZSkge1xuICBpZiAocmVxLm1ldGhvZCAhPT0gXCJQT1NUXCIpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDUpLmpzb24oeyBzdGF0dXM6IGZhbHNlLCBlcnJvcjogXCJNZXRob2Qgbm90IGFsbG93ZWRcIiB9KTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQgfSA9IHJlcS5ib2R5O1xuXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHBnKFwidXNlcnNcIikud2hlcmUoeyBlbWFpbCB9KS5maXJzdCgpO1xuXG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiBcIlVzZXIgbm90IGZvdW5kXCIgfSk7XG4gICAgfVxuICAgIC8vIGlmKHVzZXIucm9sZSAhPT0gJ2FkbWluJykge1xuICAgIC8vICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogXCJBY2Nlc3MgZGVuaWVkXCIgfSk7XG4gICAgLy8gfVxuXG4gICAgY29uc3QgaXNQYXNzd29yZFZhbGlkID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUocGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpO1xuICAgIGlmICghaXNQYXNzd29yZFZhbGlkKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiBcIkludmFsaWQgcGFzc3dvcmRcIiB9KTtcbiAgICB9XG5cbiAgICBjb25zdCB0b2tlbiA9IGp3dC5zaWduKFxuICAgICAgeyBpZDogdXNlci5pZCwgZW1haWw6IHVzZXIuZW1haWwsIG5hbWU6IHVzZXIubmFtZSwgcm9sZTogdXNlci5yb2xlIH0sXG4gICAgICBwcm9jZXNzLmVudi5KV1RfU0VDUkVUISxcbiAgICAgIHsgZXhwaXJlc0luOiBcIjFoXCIgfVxuICAgICk7XG5cbiAgICAvLyDinIUgU2V0IGNvb2tpZSBtYW51YWxseVxuICAgIHJlcy5zZXRIZWFkZXIoXG4gICAgICBcIlNldC1Db29raWVcIixcbiAgICAgIHNlcmlhbGl6ZShcInRva2VuXCIsIHRva2VuLCB7XG4gICAgICAgIGh0dHBPbmx5OiB0cnVlLFxuICAgICAgICBzZWN1cmU6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIixcbiAgICAgICAgbWF4QWdlOiA2MCAqIDYwLCAvLyAxIGhvdXJcbiAgICAgICAgcGF0aDogXCIvXCIsXG4gICAgICAgIHNhbWVTaXRlOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIgPyBcIm5vbmVcIiA6IFwibGF4XCIsXG4gICAgICB9KVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdGF0dXM6IHRydWUsIG1lc3NhZ2U6IFwiTG9naW4gc3VjY2Vzc2Z1bFwiIH0pO1xuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgcmV0dXJuIHJlc1xuICAgICAgLnN0YXR1cyg1MDApXG4gICAgICAuanNvbih7IHN0YXR1czogZmFsc2UsIGVycm9yOiBlcnJvci5tZXNzYWdlIHx8IFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCIgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJwZyIsImJjcnlwdCIsImp3dCIsInNlcmlhbGl6ZSIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJtZXRob2QiLCJzdGF0dXMiLCJqc29uIiwiZXJyb3IiLCJlbWFpbCIsInBhc3N3b3JkIiwiYm9keSIsInVzZXIiLCJ3aGVyZSIsImZpcnN0IiwibWVzc2FnZSIsImlzUGFzc3dvcmRWYWxpZCIsImNvbXBhcmUiLCJ0b2tlbiIsInNpZ24iLCJpZCIsIm5hbWUiLCJyb2xlIiwicHJvY2VzcyIsImVudiIsIkpXVF9TRUNSRVQiLCJleHBpcmVzSW4iLCJzZXRIZWFkZXIiLCJodHRwT25seSIsInNlY3VyZSIsIm1heEFnZSIsInBhdGgiLCJzYW1lU2l0ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/auth/login/index.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(api)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fauth%2Flogin&preferredRegion=&absolutePagePath=.%2Fsrc%2Fpages%2Fapi%2Fauth%2Flogin%2Findex.ts&middlewareConfigBase64=e30%3D!")));
module.exports = __webpack_exports__;

})();