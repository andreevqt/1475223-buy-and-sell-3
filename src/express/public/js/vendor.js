/* axios v0.20.0 | (c) 2020 by Matt Zabriskie */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.axios=t():e.axios=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";function r(e){var t=new s(e),n=i(s.prototype.request,t);return o.extend(n,s.prototype,t),o.extend(n,t),n}var o=n(2),i=n(3),s=n(4),a=n(22),u=n(10),c=r(u);c.Axios=s,c.create=function(e){return r(a(c.defaults,e))},c.Cancel=n(23),c.CancelToken=n(24),c.isCancel=n(9),c.all=function(e){return Promise.all(e)},c.spread=n(25),e.exports=c,e.exports.default=c},function(e,t,n){"use strict";function r(e){return"[object Array]"===R.call(e)}function o(e){return"undefined"==typeof e}function i(e){return null!==e&&!o(e)&&null!==e.constructor&&!o(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function s(e){return"[object ArrayBuffer]"===R.call(e)}function a(e){return"undefined"!=typeof FormData&&e instanceof FormData}function u(e){var t;return t="undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer}function c(e){return"string"==typeof e}function f(e){return"number"==typeof e}function p(e){return null!==e&&"object"==typeof e}function d(e){if("[object Object]"!==R.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function l(e){return"[object Date]"===R.call(e)}function h(e){return"[object File]"===R.call(e)}function m(e){return"[object Blob]"===R.call(e)}function y(e){return"[object Function]"===R.call(e)}function g(e){return p(e)&&y(e.pipe)}function v(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams}function x(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function w(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)}function b(e,t){if(null!==e&&"undefined"!=typeof e)if("object"!=typeof e&&(e=[e]),r(e))for(var n=0,o=e.length;n<o;n++)t.call(null,e[n],n,e);else for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.call(null,e[i],i,e)}function E(){function e(e,n){d(t[n])&&d(e)?t[n]=E(t[n],e):d(e)?t[n]=E({},e):r(e)?t[n]=e.slice():t[n]=e}for(var t={},n=0,o=arguments.length;n<o;n++)b(arguments[n],e);return t}function C(e,t,n){return b(t,function(t,r){n&&"function"==typeof t?e[r]=S(t,n):e[r]=t}),e}function j(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}var S=n(3),R=Object.prototype.toString;e.exports={isArray:r,isArrayBuffer:s,isBuffer:i,isFormData:a,isArrayBufferView:u,isString:c,isNumber:f,isObject:p,isPlainObject:d,isUndefined:o,isDate:l,isFile:h,isBlob:m,isFunction:y,isStream:g,isURLSearchParams:v,isStandardBrowserEnv:w,forEach:b,merge:E,extend:C,trim:x,stripBOM:j}},function(e,t){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},function(e,t,n){"use strict";function r(e){this.defaults=e,this.interceptors={request:new s,response:new s}}var o=n(2),i=n(5),s=n(6),a=n(7),u=n(22);r.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{},e.url=arguments[0]):e=e||{},e=u(this.defaults,e),e.method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[a,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},r.prototype.getUri=function(e){return e=u(this.defaults,e),i(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},o.forEach(["delete","get","head","options"],function(e){r.prototype[e]=function(t,n){return this.request(u(n||{},{method:e,url:t}))}}),o.forEach(["post","put","patch"],function(e){r.prototype[e]=function(t,n,r){return this.request(u(r||{},{method:e,url:t,data:n}))}}),e.exports=r},function(e,t,n){"use strict";function r(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var o=n(2);e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(o.isURLSearchParams(t))i=t.toString();else{var s=[];o.forEach(t,function(e,t){null!==e&&"undefined"!=typeof e&&(o.isArray(e)?t+="[]":e=[e],o.forEach(e,function(e){o.isDate(e)?e=e.toISOString():o.isObject(e)&&(e=JSON.stringify(e)),s.push(r(t)+"="+r(e))}))}),i=s.join("&")}if(i){var a=e.indexOf("#");a!==-1&&(e=e.slice(0,a)),e+=(e.indexOf("?")===-1?"?":"&")+i}return e}},function(e,t,n){"use strict";function r(){this.handlers=[]}var o=n(2);r.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},r.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},r.prototype.forEach=function(e){o.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=r},function(e,t,n){"use strict";function r(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var o=n(2),i=n(8),s=n(9),a=n(10);e.exports=function(e){r(e),e.headers=e.headers||{},e.data=i(e.data,e.headers,e.transformRequest),e.headers=o.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),o.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]});var t=e.adapter||a.adapter;return t(e).then(function(t){return r(e),t.data=i(t.data,t.headers,e.transformResponse),t},function(t){return s(t)||(r(e),t&&t.response&&(t.response.data=i(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},function(e,t,n){"use strict";var r=n(2);e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t)}),e}},function(e,t){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t,n){"use strict";function r(e,t){!i.isUndefined(e)&&i.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}function o(){var e;return"undefined"!=typeof XMLHttpRequest?e=n(12):"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process)&&(e=n(12)),e}var i=n(2),s=n(11),a={"Content-Type":"application/x-www-form-urlencoded"},u={adapter:o(),transformRequest:[function(e,t){return s(t,"Accept"),s(t,"Content-Type"),i.isFormData(e)||i.isArrayBuffer(e)||i.isBuffer(e)||i.isStream(e)||i.isFile(e)||i.isBlob(e)?e:i.isArrayBufferView(e)?e.buffer:i.isURLSearchParams(e)?(r(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):i.isObject(e)?(r(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300}};u.headers={common:{Accept:"application/json, text/plain, */*"}},i.forEach(["delete","get","head"],function(e){u.headers[e]={}}),i.forEach(["post","put","patch"],function(e){u.headers[e]=i.merge(a)}),e.exports=u},function(e,t,n){"use strict";var r=n(2);e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])})}},function(e,t,n){"use strict";var r=n(2),o=n(13),i=n(16),s=n(5),a=n(17),u=n(20),c=n(21),f=n(14);e.exports=function(e){return new Promise(function(t,n){var p=e.data,d=e.headers;r.isFormData(p)&&delete d["Content-Type"],(r.isBlob(p)||r.isFile(p))&&p.type&&delete d["Content-Type"];var l=new XMLHttpRequest;if(e.auth){var h=e.auth.username||"",m=unescape(encodeURIComponent(e.auth.password))||"";d.Authorization="Basic "+btoa(h+":"+m)}var y=a(e.baseURL,e.url);if(l.open(e.method.toUpperCase(),s(y,e.params,e.paramsSerializer),!0),l.timeout=e.timeout,l.onreadystatechange=function(){if(l&&4===l.readyState&&(0!==l.status||l.responseURL&&0===l.responseURL.indexOf("file:"))){var r="getAllResponseHeaders"in l?u(l.getAllResponseHeaders()):null,i=e.responseType&&"text"!==e.responseType?l.response:l.responseText,s={data:i,status:l.status,statusText:l.statusText,headers:r,config:e,request:l};o(t,n,s),l=null}},l.onabort=function(){l&&(n(f("Request aborted",e,"ECONNABORTED",l)),l=null)},l.onerror=function(){n(f("Network Error",e,null,l)),l=null},l.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(f(t,e,"ECONNABORTED",l)),l=null},r.isStandardBrowserEnv()){var g=(e.withCredentials||c(y))&&e.xsrfCookieName?i.read(e.xsrfCookieName):void 0;g&&(d[e.xsrfHeaderName]=g)}if("setRequestHeader"in l&&r.forEach(d,function(e,t){"undefined"==typeof p&&"content-type"===t.toLowerCase()?delete d[t]:l.setRequestHeader(t,e)}),r.isUndefined(e.withCredentials)||(l.withCredentials=!!e.withCredentials),e.responseType)try{l.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&l.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&l.upload&&l.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){l&&(l.abort(),n(e),l=null)}),p||(p=null),l.send(p)})}},function(e,t,n){"use strict";var r=n(14);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},function(e,t,n){"use strict";var r=n(15);e.exports=function(e,t,n,o,i){var s=new Error(e);return r(s,t,n,o,i)}},function(e,t){"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},function(e,t,n){"use strict";var r=n(2);e.exports=r.isStandardBrowserEnv()?function(){return{write:function(e,t,n,o,i,s){var a=[];a.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),r.isString(o)&&a.push("path="+o),r.isString(i)&&a.push("domain="+i),s===!0&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},function(e,t,n){"use strict";var r=n(18),o=n(19);e.exports=function(e,t){return e&&!r(t)?o(e,t):t}},function(e,t){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t,n){"use strict";var r=n(2),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,i,s={};return e?(r.forEach(e.split("\n"),function(e){if(i=e.indexOf(":"),t=r.trim(e.substr(0,i)).toLowerCase(),n=r.trim(e.substr(i+1)),t){if(s[t]&&o.indexOf(t)>=0)return;"set-cookie"===t?s[t]=(s[t]?s[t]:[]).concat([n]):s[t]=s[t]?s[t]+", "+n:n}}),s):s}},function(e,t,n){"use strict";var r=n(2);e.exports=r.isStandardBrowserEnv()?function(){function e(e){var t=e;return n&&(o.setAttribute("href",t),t=o.href),o.setAttribute("href",t),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}var t,n=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");return t=e(window.location.href),function(n){var o=r.isString(n)?e(n):n;return o.protocol===t.protocol&&o.host===t.host}}():function(){return function(){return!0}}()},function(e,t,n){"use strict";var r=n(2);e.exports=function(e,t){function n(e,t){return r.isPlainObject(e)&&r.isPlainObject(t)?r.merge(e,t):r.isPlainObject(t)?r.merge({},t):r.isArray(t)?t.slice():t}function o(o){r.isUndefined(t[o])?r.isUndefined(e[o])||(i[o]=n(void 0,e[o])):i[o]=n(e[o],t[o])}t=t||{};var i={},s=["url","method","data"],a=["headers","auth","proxy","params"],u=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],c=["validateStatus"];r.forEach(s,function(e){r.isUndefined(t[e])||(i[e]=n(void 0,t[e]))}),r.forEach(a,o),r.forEach(u,function(o){r.isUndefined(t[o])?r.isUndefined(e[o])||(i[o]=n(void 0,e[o])):i[o]=n(void 0,t[o])}),r.forEach(c,function(r){r in t?i[r]=n(e[r],t[r]):r in e&&(i[r]=n(void 0,e[r]))});var f=s.concat(a).concat(u).concat(c),p=Object.keys(e).concat(Object.keys(t)).filter(function(e){return f.indexOf(e)===-1});return r.forEach(p,o),i}},function(e,t){"use strict";function n(e){this.message=e}n.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},n.prototype.__CANCEL__=!0,e.exports=n},function(e,t,n){"use strict";function r(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new o(e),t(n.reason))})}var o=n(23);r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.source=function(){var e,t=new r(function(t){e=t});return{token:t,cancel:e}},e.exports=r},function(e,t){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}}])});

/*! picturefill - v3.0.2 - 2016-02-12
 * https://scottjehl.github.io/picturefill/
 * Copyright (c) 2016 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
 */
!function(a){var b=navigator.userAgent;a.HTMLPictureElement&&/ecko/.test(b)&&b.match(/rv\:(\d+)/)&&RegExp.$1<45&&addEventListener("resize",function(){var b,c=document.createElement("source"),d=function(a){var b,d,e=a.parentNode;"PICTURE"===e.nodeName.toUpperCase()?(b=c.cloneNode(),e.insertBefore(b,e.firstElementChild),setTimeout(function(){e.removeChild(b)})):(!a._pfLastSize||a.offsetWidth>a._pfLastSize)&&(a._pfLastSize=a.offsetWidth,d=a.sizes,a.sizes+=",100vw",setTimeout(function(){a.sizes=d}))},e=function(){var a,b=document.querySelectorAll("picture > img, img[srcset][sizes]");for(a=0;a<b.length;a++)d(b[a])},f=function(){clearTimeout(b),b=setTimeout(e,99)},g=a.matchMedia&&matchMedia("(orientation: landscape)"),h=function(){f(),g&&g.addListener&&g.addListener(f)};return c.srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",/^[c|i]|d$/.test(document.readyState||"")?h():document.addEventListener("DOMContentLoaded",h),f}())}(window),function(a,b,c){"use strict";function d(a){return" "===a||"	"===a||"\n"===a||"\f"===a||"\r"===a}function e(b,c){var d=new a.Image;return d.onerror=function(){A[b]=!1,ba()},d.onload=function(){A[b]=1===d.width,ba()},d.src=c,"pending"}function f(){M=!1,P=a.devicePixelRatio,N={},O={},s.DPR=P||1,Q.width=Math.max(a.innerWidth||0,z.clientWidth),Q.height=Math.max(a.innerHeight||0,z.clientHeight),Q.vw=Q.width/100,Q.vh=Q.height/100,r=[Q.height,Q.width,P].join("-"),Q.em=s.getEmValue(),Q.rem=Q.em}function g(a,b,c,d){var e,f,g,h;return"saveData"===B.algorithm?a>2.7?h=c+1:(f=b-c,e=Math.pow(a-.6,1.5),g=f*e,d&&(g+=.1*e),h=a+g):h=c>1?Math.sqrt(a*b):a,h>c}function h(a){var b,c=s.getSet(a),d=!1;"pending"!==c&&(d=r,c&&(b=s.setRes(c),s.applySetCandidate(b,a))),a[s.ns].evaled=d}function i(a,b){return a.res-b.res}function j(a,b,c){var d;return!c&&b&&(c=a[s.ns].sets,c=c&&c[c.length-1]),d=k(b,c),d&&(b=s.makeUrl(b),a[s.ns].curSrc=b,a[s.ns].curCan=d,d.res||aa(d,d.set.sizes)),d}function k(a,b){var c,d,e;if(a&&b)for(e=s.parseSet(b),a=s.makeUrl(a),c=0;c<e.length;c++)if(a===s.makeUrl(e[c].url)){d=e[c];break}return d}function l(a,b){var c,d,e,f,g=a.getElementsByTagName("source");for(c=0,d=g.length;d>c;c++)e=g[c],e[s.ns]=!0,f=e.getAttribute("srcset"),f&&b.push({srcset:f,media:e.getAttribute("media"),type:e.getAttribute("type"),sizes:e.getAttribute("sizes")})}function m(a,b){function c(b){var c,d=b.exec(a.substring(m));return d?(c=d[0],m+=c.length,c):void 0}function e(){var a,c,d,e,f,i,j,k,l,m=!1,o={};for(e=0;e<h.length;e++)f=h[e],i=f[f.length-1],j=f.substring(0,f.length-1),k=parseInt(j,10),l=parseFloat(j),X.test(j)&&"w"===i?((a||c)&&(m=!0),0===k?m=!0:a=k):Y.test(j)&&"x"===i?((a||c||d)&&(m=!0),0>l?m=!0:c=l):X.test(j)&&"h"===i?((d||c)&&(m=!0),0===k?m=!0:d=k):m=!0;m||(o.url=g,a&&(o.w=a),c&&(o.d=c),d&&(o.h=d),d||c||a||(o.d=1),1===o.d&&(b.has1x=!0),o.set=b,n.push(o))}function f(){for(c(T),i="",j="in descriptor";;){if(k=a.charAt(m),"in descriptor"===j)if(d(k))i&&(h.push(i),i="",j="after descriptor");else{if(","===k)return m+=1,i&&h.push(i),void e();if("("===k)i+=k,j="in parens";else{if(""===k)return i&&h.push(i),void e();i+=k}}else if("in parens"===j)if(")"===k)i+=k,j="in descriptor";else{if(""===k)return h.push(i),void e();i+=k}else if("after descriptor"===j)if(d(k));else{if(""===k)return void e();j="in descriptor",m-=1}m+=1}}for(var g,h,i,j,k,l=a.length,m=0,n=[];;){if(c(U),m>=l)return n;g=c(V),h=[],","===g.slice(-1)?(g=g.replace(W,""),e()):f()}}function n(a){function b(a){function b(){f&&(g.push(f),f="")}function c(){g[0]&&(h.push(g),g=[])}for(var e,f="",g=[],h=[],i=0,j=0,k=!1;;){if(e=a.charAt(j),""===e)return b(),c(),h;if(k){if("*"===e&&"/"===a[j+1]){k=!1,j+=2,b();continue}j+=1}else{if(d(e)){if(a.charAt(j-1)&&d(a.charAt(j-1))||!f){j+=1;continue}if(0===i){b(),j+=1;continue}e=" "}else if("("===e)i+=1;else if(")"===e)i-=1;else{if(","===e){b(),c(),j+=1;continue}if("/"===e&&"*"===a.charAt(j+1)){k=!0,j+=2;continue}}f+=e,j+=1}}}function c(a){return k.test(a)&&parseFloat(a)>=0?!0:l.test(a)?!0:"0"===a||"-0"===a||"+0"===a?!0:!1}var e,f,g,h,i,j,k=/^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,l=/^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;for(f=b(a),g=f.length,e=0;g>e;e++)if(h=f[e],i=h[h.length-1],c(i)){if(j=i,h.pop(),0===h.length)return j;if(h=h.join(" "),s.matchesMedia(h))return j}return"100vw"}b.createElement("picture");var o,p,q,r,s={},t=!1,u=function(){},v=b.createElement("img"),w=v.getAttribute,x=v.setAttribute,y=v.removeAttribute,z=b.documentElement,A={},B={algorithm:""},C="data-pfsrc",D=C+"set",E=navigator.userAgent,F=/rident/.test(E)||/ecko/.test(E)&&E.match(/rv\:(\d+)/)&&RegExp.$1>35,G="currentSrc",H=/\s+\+?\d+(e\d+)?w/,I=/(\([^)]+\))?\s*(.+)/,J=a.picturefillCFG,K="position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",L="font-size:100%!important;",M=!0,N={},O={},P=a.devicePixelRatio,Q={px:1,"in":96},R=b.createElement("a"),S=!1,T=/^[ \t\n\r\u000c]+/,U=/^[, \t\n\r\u000c]+/,V=/^[^ \t\n\r\u000c]+/,W=/[,]+$/,X=/^\d+$/,Y=/^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,Z=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d||!1):a.attachEvent&&a.attachEvent("on"+b,c)},$=function(a){var b={};return function(c){return c in b||(b[c]=a(c)),b[c]}},_=function(){var a=/^([\d\.]+)(em|vw|px)$/,b=function(){for(var a=arguments,b=0,c=a[0];++b in a;)c=c.replace(a[b],a[++b]);return c},c=$(function(a){return"return "+b((a||"").toLowerCase(),/\band\b/g,"&&",/,/g,"||",/min-([a-z-\s]+):/g,"e.$1>=",/max-([a-z-\s]+):/g,"e.$1<=",/calc([^)]+)/g,"($1)",/(\d+[\.]*[\d]*)([a-z]+)/g,"($1 * e.$2)",/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi,"")+";"});return function(b,d){var e;if(!(b in N))if(N[b]=!1,d&&(e=b.match(a)))N[b]=e[1]*Q[e[2]];else try{N[b]=new Function("e",c(b))(Q)}catch(f){}return N[b]}}(),aa=function(a,b){return a.w?(a.cWidth=s.calcListLength(b||"100vw"),a.res=a.w/a.cWidth):a.res=a.d,a},ba=function(a){if(t){var c,d,e,f=a||{};if(f.elements&&1===f.elements.nodeType&&("IMG"===f.elements.nodeName.toUpperCase()?f.elements=[f.elements]:(f.context=f.elements,f.elements=null)),c=f.elements||s.qsa(f.context||b,f.reevaluate||f.reselect?s.sel:s.selShort),e=c.length){for(s.setupRun(f),S=!0,d=0;e>d;d++)s.fillImg(c[d],f);s.teardownRun(f)}}};o=a.console&&console.warn?function(a){console.warn(a)}:u,G in v||(G="src"),A["image/jpeg"]=!0,A["image/gif"]=!0,A["image/png"]=!0,A["image/svg+xml"]=b.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),s.ns=("pf"+(new Date).getTime()).substr(0,9),s.supSrcset="srcset"in v,s.supSizes="sizes"in v,s.supPicture=!!a.HTMLPictureElement,s.supSrcset&&s.supPicture&&!s.supSizes&&!function(a){v.srcset="data:,a",a.src="data:,a",s.supSrcset=v.complete===a.complete,s.supPicture=s.supSrcset&&s.supPicture}(b.createElement("img")),s.supSrcset&&!s.supSizes?!function(){var a="data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==",c="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",d=b.createElement("img"),e=function(){var a=d.width;2===a&&(s.supSizes=!0),q=s.supSrcset&&!s.supSizes,t=!0,setTimeout(ba)};d.onload=e,d.onerror=e,d.setAttribute("sizes","9px"),d.srcset=c+" 1w,"+a+" 9w",d.src=c}():t=!0,s.selShort="picture>img,img[srcset]",s.sel=s.selShort,s.cfg=B,s.DPR=P||1,s.u=Q,s.types=A,s.setSize=u,s.makeUrl=$(function(a){return R.href=a,R.href}),s.qsa=function(a,b){return"querySelector"in a?a.querySelectorAll(b):[]},s.matchesMedia=function(){return a.matchMedia&&(matchMedia("(min-width: 0.1em)")||{}).matches?s.matchesMedia=function(a){return!a||matchMedia(a).matches}:s.matchesMedia=s.mMQ,s.matchesMedia.apply(this,arguments)},s.mMQ=function(a){return a?_(a):!0},s.calcLength=function(a){var b=_(a,!0)||!1;return 0>b&&(b=!1),b},s.supportsType=function(a){return a?A[a]:!0},s.parseSize=$(function(a){var b=(a||"").match(I);return{media:b&&b[1],length:b&&b[2]}}),s.parseSet=function(a){return a.cands||(a.cands=m(a.srcset,a)),a.cands},s.getEmValue=function(){var a;if(!p&&(a=b.body)){var c=b.createElement("div"),d=z.style.cssText,e=a.style.cssText;c.style.cssText=K,z.style.cssText=L,a.style.cssText=L,a.appendChild(c),p=c.offsetWidth,a.removeChild(c),p=parseFloat(p,10),z.style.cssText=d,a.style.cssText=e}return p||16},s.calcListLength=function(a){if(!(a in O)||B.uT){var b=s.calcLength(n(a));O[a]=b?b:Q.width}return O[a]},s.setRes=function(a){var b;if(a){b=s.parseSet(a);for(var c=0,d=b.length;d>c;c++)aa(b[c],a.sizes)}return b},s.setRes.res=aa,s.applySetCandidate=function(a,b){if(a.length){var c,d,e,f,h,k,l,m,n,o=b[s.ns],p=s.DPR;if(k=o.curSrc||b[G],l=o.curCan||j(b,k,a[0].set),l&&l.set===a[0].set&&(n=F&&!b.complete&&l.res-.1>p,n||(l.cached=!0,l.res>=p&&(h=l))),!h)for(a.sort(i),f=a.length,h=a[f-1],d=0;f>d;d++)if(c=a[d],c.res>=p){e=d-1,h=a[e]&&(n||k!==s.makeUrl(c.url))&&g(a[e].res,c.res,p,a[e].cached)?a[e]:c;break}h&&(m=s.makeUrl(h.url),o.curSrc=m,o.curCan=h,m!==k&&s.setSrc(b,h),s.setSize(b))}},s.setSrc=function(a,b){var c;a.src=b.url,"image/svg+xml"===b.set.type&&(c=a.style.width,a.style.width=a.offsetWidth+1+"px",a.offsetWidth+1&&(a.style.width=c))},s.getSet=function(a){var b,c,d,e=!1,f=a[s.ns].sets;for(b=0;b<f.length&&!e;b++)if(c=f[b],c.srcset&&s.matchesMedia(c.media)&&(d=s.supportsType(c.type))){"pending"===d&&(c=d),e=c;break}return e},s.parseSets=function(a,b,d){var e,f,g,h,i=b&&"PICTURE"===b.nodeName.toUpperCase(),j=a[s.ns];(j.src===c||d.src)&&(j.src=w.call(a,"src"),j.src?x.call(a,C,j.src):y.call(a,C)),(j.srcset===c||d.srcset||!s.supSrcset||a.srcset)&&(e=w.call(a,"srcset"),j.srcset=e,h=!0),j.sets=[],i&&(j.pic=!0,l(b,j.sets)),j.srcset?(f={srcset:j.srcset,sizes:w.call(a,"sizes")},j.sets.push(f),g=(q||j.src)&&H.test(j.srcset||""),g||!j.src||k(j.src,f)||f.has1x||(f.srcset+=", "+j.src,f.cands.push({url:j.src,d:1,set:f}))):j.src&&j.sets.push({srcset:j.src,sizes:null}),j.curCan=null,j.curSrc=c,j.supported=!(i||f&&!s.supSrcset||g&&!s.supSizes),h&&s.supSrcset&&!j.supported&&(e?(x.call(a,D,e),a.srcset=""):y.call(a,D)),j.supported&&!j.srcset&&(!j.src&&a.src||a.src!==s.makeUrl(j.src))&&(null===j.src?a.removeAttribute("src"):a.src=j.src),j.parsed=!0},s.fillImg=function(a,b){var c,d=b.reselect||b.reevaluate;a[s.ns]||(a[s.ns]={}),c=a[s.ns],(d||c.evaled!==r)&&((!c.parsed||b.reevaluate)&&s.parseSets(a,a.parentNode,b),c.supported?c.evaled=r:h(a))},s.setupRun=function(){(!S||M||P!==a.devicePixelRatio)&&f()},s.supPicture?(ba=u,s.fillImg=u):!function(){var c,d=a.attachEvent?/d$|^c/:/d$|^c|^i/,e=function(){var a=b.readyState||"";f=setTimeout(e,"loading"===a?200:999),b.body&&(s.fillImgs(),c=c||d.test(a),c&&clearTimeout(f))},f=setTimeout(e,b.body?9:99),g=function(a,b){var c,d,e=function(){var f=new Date-d;b>f?c=setTimeout(e,b-f):(c=null,a())};return function(){d=new Date,c||(c=setTimeout(e,b))}},h=z.clientHeight,i=function(){M=Math.max(a.innerWidth||0,z.clientWidth)!==Q.width||z.clientHeight!==h,h=z.clientHeight,M&&s.fillImgs()};Z(a,"resize",g(i,99)),Z(b,"readystatechange",e)}(),s.picturefill=ba,s.fillImgs=ba,s.teardownRun=u,ba._=s,a.picturefillCFG={pf:s,push:function(a){var b=a.shift();"function"==typeof s[b]?s[b].apply(s,a):(B[b]=a[0],S&&s.fillImgs({reselect:!0}))}};for(;J&&J.length;)a.picturefillCFG.push(J.shift());a.picturefill=ba,"object"==typeof module&&"object"==typeof module.exports?module.exports=ba:"function"==typeof define&&define.amd&&define("picturefill",function(){return ba}),s.supPicture||(A["image/webp"]=e("image/webp","data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))}(window,document);

/*
 Selectr 2.4.13
 http://mobius.ovh/docs/selectr

 Released under the MIT license
*/
(function (g, k) {
  "function" === typeof define && define.amd ? define([], k) : "object" === typeof exports ? module.exports = k("Selectr") : g.Selectr = k("Selectr")
})(this, function (g) {
  function k(a, c) {
    return a.hasOwnProperty(c) && (!0 === a[c] || a[c].length)
  }

  function n(a, c, e) {
    a.parentNode ? a.parentNode.parentNode || c.appendChild(a.parentNode) : c.appendChild(a);
    b.removeClass(a, "excluded");
    e || (a.innerHTML = a.textContent)
  }

  var l = function () {
  };
  l.prototype = {
    on: function (a, c) {
      this._events = this._events || {};
      this._events[a] = this._events[a] ||
        [];
      this._events[a].push(c)
    }, off: function (a, c) {
      this._events = this._events || {};
      !1 !== a in this._events && this._events[a].splice(this._events[a].indexOf(c), 1)
    }, emit: function (a) {
      this._events = this._events || {};
      if (!1 !== a in this._events) for (var c = 0; c < this._events[a].length; c++) this._events[a][c].apply(this, Array.prototype.slice.call(arguments, 1))
    }
  };
  l.mixin = function (a) {
    for (var c = ["on", "off", "emit"], b = 0; b < c.length; b++) "function" === typeof a ? a.prototype[c[b]] = l.prototype[c[b]] : a[c[b]] = l.prototype[c[b]];
    return a
  };
  var b = {
    extend: function (a, c) {
      for (var e in c) if (c.hasOwnProperty(e)) {
        var d = c[e];
        d && "[object Object]" === Object.prototype.toString.call(d) ? (a[e] = a[e] || {}, b.extend(a[e], d)) : a[e] = d
      }
      return a
    }, each: function (a, c, b) {
      if ("[object Object]" === Object.prototype.toString.call(a)) for (var d in a) Object.prototype.hasOwnProperty.call(a, d) && c.call(b, d, a[d], a); else {
        d = 0;
        for (var e = a.length; d < e; d++) c.call(b, d, a[d], a)
      }
    }, createElement: function (a, c) {
      var b = document, d = b.createElement(a);
      if (c && "[object Object]" === Object.prototype.toString.call(c)) for (var f in c) if (f in
        d) d[f] = c[f]; else if ("html" === f) d.innerHTML = c[f]; else if ("text" === f) {
        var h = b.createTextNode(c[f]);
        d.appendChild(h)
      } else d.setAttribute(f, c[f]);
      return d
    }, hasClass: function (a, b) {
      if (a) return a.classList ? a.classList.contains(b) : !!a.className && !!a.className.match(new RegExp("(\\s|^)" + b + "(\\s|$)"))
    }, addClass: function (a, c) {
      b.hasClass(a, c) || (a.classList ? a.classList.add(c) : a.className = a.className.trim() + " " + c)
    }, removeClass: function (a, c) {
      b.hasClass(a, c) && (a.classList ? a.classList.remove(c) : a.className = a.className.replace(new RegExp("(^|\\s)" +
        c.split(" ").join("|") + "(\\s|$)", "gi"), " "))
    }, closest: function (a, c) {
      return a && a !== document.body && (c(a) ? a : b.closest(a.parentNode, c))
    }, isInt: function (a) {
      return "number" === typeof a && isFinite(a) && Math.floor(a) === a
    }, debounce: function (a, b, e) {
      var d;
      return function () {
        var c = this, h = arguments, g = e && !d;
        clearTimeout(d);
        d = setTimeout(function () {
          d = null;
          e || a.apply(c, h)
        }, b);
        g && a.apply(c, h)
      }
    }, rect: function (a, b) {
      var c = window, d = a.getBoundingClientRect(), f = b ? c.pageXOffset : 0;
      c = b ? c.pageYOffset : 0;
      return {
        bottom: d.bottom + c, height: d.height,
        left: d.left + f, right: d.right + f, top: d.top + c, width: d.width
      }
    }, includes: function (a, b) {
      return -1 < a.indexOf(b)
    }, startsWith: function (a, b) {
      return a.substr(0, b.length) === b
    }, truncate: function (a) {
      for (; a.firstChild;) a.removeChild(a.firstChild)
    }
  }, p = function () {
    if (this.items.length) {
      var a = document.createDocumentFragment();
      if (this.config.pagination) {
        var c = this.pages.slice(0, this.pageIndex);
        b.each(c, function (c, d) {
          b.each(d, function (d, b) {
            n(b, a, this.customOption)
          }, this)
        }, this)
      } else b.each(this.items, function (b, d) {
        n(d,
          a, this.customOption)
      }, this);
      a.childElementCount && (b.removeClass(this.items[this.navIndex], "active"), this.navIndex = (a.querySelector(".selectr-option.selected") || a.querySelector(".selectr-option")).idx, b.addClass(this.items[this.navIndex], "active"));
      this.tree.appendChild(a)
    }
  }, t = function (a) {
    this.container.contains(a.target) || !this.opened && !b.hasClass(this.container, "notice") || this.close()
  }, m = function (a, c) {
    var e = this.customOption ? this.config.renderOption(c || a) : a.textContent;
    e = b.createElement("li", {
      "class": "selectr-option",
      html: e, role: "treeitem", "aria-selected": !1
    });
    e.idx = a.idx;
    this.items.push(e);
    a.defaultSelected && this.defaultSelected.push(a.idx);
    a.disabled && (e.disabled = !0, b.addClass(e, "disabled"));
    return e
  }, u = function () {
    this.requiresPagination = this.config.pagination && 0 < this.config.pagination;
    k(this.config, "width") && (b.isInt(this.config.width) ? this.width = this.config.width + "px" : "auto" === this.config.width ? this.width = "100%" : b.includes(this.config.width, "%") && (this.width = this.config.width));
    this.container = b.createElement("div",
      {"class": "selectr-container"});
    this.config.customClass && b.addClass(this.container, this.config.customClass);
    this.mobileDevice ? b.addClass(this.container, "selectr-mobile") : b.addClass(this.container, "selectr-desktop");
    this.el.tabIndex = -1;
    this.config.nativeDropdown || this.mobileDevice ? b.addClass(this.el, "selectr-visible") : b.addClass(this.el, "selectr-hidden");
    this.selected = b.createElement("div", {
      "class": "selectr-selected",
      disabled: this.disabled,
      tabIndex: 0,
      "aria-expanded": !1
    });
    this.label = b.createElement(this.el.multiple ?
      "ul" : "span", {"class": "selectr-label"});
    var a = b.createElement("div", {"class": "selectr-options-container"});
    this.tree = b.createElement("ul", {
      "class": "selectr-options",
      role: "tree",
      "aria-hidden": !0,
      "aria-expanded": !1
    });
    this.notice = b.createElement("div", {"class": "selectr-notice"});
    this.el.setAttribute("aria-hidden", !0);
    this.disabled && (this.el.disabled = !0);
    this.el.multiple && (b.addClass(this.label, "selectr-tags"), b.addClass(this.container, "multiple"), this.tags = [], this.selectedValues = this.getSelectedProperties("value"),
      this.selectedIndexes = this.getSelectedProperties("idx"));
    this.selected.appendChild(this.label);
    this.config.clearable && (this.selectClear = b.createElement("button", {
      "class": "selectr-clear",
      type: "button"
    }), this.container.appendChild(this.selectClear), b.addClass(this.container, "clearable"));
    if (this.config.taggable) {
      var c = b.createElement("li", {"class": "input-tag"});
      this.input = b.createElement("input", {
        "class": "selectr-tag-input",
        placeholder: this.config.tagPlaceholder,
        tagIndex: 0,
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        spellcheck: "false",
        role: "textbox",
        type: "search"
      });
      c.appendChild(this.input);
      this.label.appendChild(c);
      b.addClass(this.container, "taggable");
      this.tagSeperators = [","];
      this.config.tagSeperators && (this.tagSeperators = this.tagSeperators.concat(this.config.tagSeperators))
    }
    this.config.searchable && (this.input = b.createElement("input", {
      "class": "selectr-input",
      tagIndex: -1,
      autocomplete: "off",
      autocorrect: "off",
      autocapitalize: "off",
      spellcheck: "false",
      role: "textbox",
      type: "search"
    }), this.inputClear =
      b.createElement("button", {
        "class": "selectr-input-clear",
        type: "button"
      }), this.inputContainer = b.createElement("div", {"class": "selectr-input-container"}), this.inputContainer.appendChild(this.input), this.inputContainer.appendChild(this.inputClear), a.appendChild(this.inputContainer));
    a.appendChild(this.notice);
    a.appendChild(this.tree);
    this.items = [];
    this.options = [];
    this.el.options.length && (this.options = [].slice.call(this.el.options));
    var e = !1, d = 0;
    this.el.children.length && b.each(this.el.children, function (a,
                                                                  c) {
      "OPTGROUP" === c.nodeName ? (e = b.createElement("ul", {
        "class": "selectr-optgroup",
        role: "group",
        html: "<li class='selectr-optgroup--label'>" + c.label + "</li>"
      }), b.each(c.children, function (a, b) {
        b.idx = d;
        e.appendChild(m.call(this, b, e));
        d++
      }, this)) : (c.idx = d, m.call(this, c), d++)
    }, this);
    if (this.config.data && Array.isArray(this.config.data)) {
      this.data = [];
      var f = !1, h;
      e = !1;
      d = 0;
      b.each(this.config.data, function (a, c) {
        k(c, "children") ? (f = b.createElement("optgroup", {label: c.text}), e = b.createElement("ul", {
          "class": "selectr-optgroup",
          role: "group", html: "<li class='selectr-optgroup--label'>" + c.text + "</li>"
        }), b.each(c.children, function (a, b) {
          h = new Option(b.text, b.value, !1, b.hasOwnProperty("selected") && !0 === b.selected);
          h.disabled = k(b, "disabled");
          this.options.push(h);
          f.appendChild(h);
          h.idx = d;
          e.appendChild(m.call(this, h, b));
          this.data[d] = b;
          d++
        }, this), this.el.appendChild(f)) : (h = new Option(c.text, c.value, !1, c.hasOwnProperty("selected") && !0 === c.selected), h.disabled = k(c, "disabled"), this.options.push(h), h.idx = d, m.call(this, h, c), this.data[d] =
          c, d++)
      }, this)
    }
    this.setSelected(!0);
    for (var g = this.navIndex = 0; g < this.items.length; g++) if (c = this.items[g], !b.hasClass(c, "disabled")) {
      b.addClass(c, "active");
      this.navIndex = g;
      break
    }
    this.requiresPagination && (this.pageIndex = 1, this.paginate());
    this.container.appendChild(this.selected);
    this.container.appendChild(a);
    this.placeEl = b.createElement("div", {"class": "selectr-placeholder"});
    this.setPlaceholder();
    this.selected.appendChild(this.placeEl);
    this.disabled && this.disable();
    this.el.parentNode.insertBefore(this.container,
      this.el);
    this.container.appendChild(this.el)
  }, v = function (a) {
    a = a || window.event;
    if (this.items.length && this.opened && b.includes([13, 38, 40], a.which)) {
      a.preventDefault();
      if (13 === a.which) return this.noResults || this.config.taggable && 0 < this.input.value.length ? !1 : this.change(this.navIndex);
      var c = this.items[this.navIndex], e = this.navIndex;
      switch (a.which) {
        case 38:
          var d = 0;
          0 < this.navIndex && this.navIndex--;
          break;
        case 40:
          d = 1, this.navIndex < this.items.length - 1 && this.navIndex++
      }
      for (this.navigating = !0; b.hasClass(this.items[this.navIndex],
        "disabled") || b.hasClass(this.items[this.navIndex], "excluded");) {
        if (0 < this.navIndex && this.navIndex < this.items.length - 1) d ? this.navIndex++ : this.navIndex--; else {
          this.navIndex = e;
          break
        }
        if (this.searching) if (this.navIndex > this.tree.lastElementChild.idx) {
          this.navIndex = this.tree.lastElementChild.idx;
          break
        } else if (this.navIndex < this.tree.firstElementChild.idx) {
          this.navIndex = this.tree.firstElementChild.idx;
          break
        }
      }
      a = b.rect(this.items[this.navIndex]);
      d ? (0 === this.navIndex ? this.tree.scrollTop = 0 : a.top + a.height > this.optsRect.top +
        this.optsRect.height && (this.tree.scrollTop += a.top + a.height - (this.optsRect.top + this.optsRect.height)), this.navIndex === this.tree.childElementCount - 1 && this.requiresPagination && r.call(this)) : 0 === this.navIndex ? this.tree.scrollTop = 0 : 0 > a.top - this.optsRect.top && (this.tree.scrollTop += a.top - this.optsRect.top);
      c && b.removeClass(c, "active");
      b.addClass(this.items[this.navIndex], "active")
    } else this.navigating = !1
  }, w = function (a) {
    var c = this, e = document.createDocumentFragment(), d = this.options[a.idx], f = this.data ? this.data[a.idx] :
      d;
    f = this.customSelected ? this.config.renderSelection(f) : d.textContent;
    f = b.createElement("li", {"class": "selectr-tag", html: f});
    var h = b.createElement("button", {"class": "selectr-tag-remove", type: "button"});
    f.appendChild(h);
    f.idx = a.idx;
    f.tag = d.value;
    this.tags.push(f);
    if (this.config.sortSelected) {
      a = this.tags.slice();
      var g = function (a, b) {
        a.replace(/(\d+)|(\D+)/g, function (a, d, c) {
          b.push([d || Infinity, c || ""])
        })
      };
      a.sort(function (a, b) {
        var d = [], e = [];
        if (!0 === c.config.sortSelected) {
          var f = a.tag;
          var h = b.tag
        } else "text" ===
        c.config.sortSelected && (f = a.textContent, h = b.textContent);
        g(f, d);
        for (g(h, e); d.length && e.length;) if (f = d.shift(), h = e.shift(), f = f[0] - h[0] || f[1].localeCompare(h[1])) return f;
        return d.length - e.length
      });
      b.each(a, function (a, b) {
        e.appendChild(b)
      });
      this.label.innerHTML = ""
    } else e.appendChild(f);
    this.config.taggable ? this.label.insertBefore(e, this.input.parentNode) : this.label.appendChild(e)
  }, x = function (a) {
    var c = !1;
    b.each(this.tags, function (b, d) {
      d.idx === a.idx && (c = d)
    }, this);
    c && (this.label.removeChild(c), this.tags.splice(this.tags.indexOf(c),
      1))
  }, r = function () {
    var a = this.tree;
    if (a.scrollTop >= a.scrollHeight - a.offsetHeight && this.pageIndex < this.pages.length) {
      var c = document.createDocumentFragment();
      b.each(this.pages[this.pageIndex], function (a, b) {
        n(b, c, this.customOption)
      }, this);
      a.appendChild(c);
      this.pageIndex++;
      this.emit("selectr.paginate", {
        items: this.items.length,
        total: this.data.length,
        page: this.pageIndex,
        pages: this.pages.length
      })
    }
  }, q = function () {
    if (this.config.searchable || this.config.taggable) this.input.value = null, this.searching = !1, this.config.searchable &&
    b.removeClass(this.inputContainer, "active"), b.hasClass(this.container, "notice") && (b.removeClass(this.container, "notice"), b.addClass(this.container, "open"), this.input.focus()), b.each(this.items, function (a, c) {
      b.removeClass(c, "excluded");
      this.customOption || (c.innerHTML = c.textContent)
    }, this)
  };
  g = function (a, b) {
    this.defaultConfig = {
      defaultSelected: !0,
      width: "auto",
      disabled: !1,
      searchable: !0,
      clearable: !1,
      sortSelected: !1,
      allowDeselect: !1,
      closeOnScroll: !1,
      nativeDropdown: !1,
      nativeKeyboard: !1,
      placeholder: "Select an option...",
      taggable: !1,
      tagPlaceholder: "Enter a tag...",
      messages: {
        noResults: "No results.",
        noOptions: "No options available.",
        maxSelections: "A maximum of {max} items can be selected.",
        tagDuplicate: "That tag is already in use."
      }
    };
    if (!a) throw Error("You must supply either a HTMLSelectElement or a CSS3 selector string.");
    this.el = a;
    "string" === typeof a && (this.el = document.querySelector(a));
    if (null === this.el) throw Error("The element you passed to Selectr can not be found.");
    if ("select" !== this.el.nodeName.toLowerCase()) throw Error("The element you passed to Selectr is not a HTMLSelectElement.");
    this.render(b)
  };
  g.prototype.render = function (a) {
    if (!this.rendered) {
      this.el.selectr = this;
      this.config = b.extend(this.defaultConfig, a);
      this.originalType = this.el.type;
      this.originalIndex = this.el.tabIndex;
      this.defaultSelected = [];
      this.originalOptionCount = this.el.options.length;
      if (this.config.multiple || this.config.taggable) this.el.multiple = !0;
      this.disabled = k(this.config, "disabled");
      this.opened = !1;
      this.config.taggable && (this.config.searchable = !1);
      this.mobileDevice = this.navigating = !1;
      /Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent) &&
      (this.mobileDevice = !0);
      this.customOption = this.config.hasOwnProperty("renderOption") && "function" === typeof this.config.renderOption;
      this.customSelected = this.config.hasOwnProperty("renderSelection") && "function" === typeof this.config.renderSelection;
      this.supportsEventPassiveOption = this.detectEventPassiveOption();
      l.mixin(this);
      u.call(this);
      this.bindEvents();
      this.update();
      this.optsRect = b.rect(this.tree);
      this.rendered = !0;
      this.el.multiple || (this.el.selectedIndex = this.selectedIndex);
      var c = this;
      setTimeout(function () {
          c.emit("selectr.init")
        },
        20)
    }
  };
  g.prototype.getSelected = function () {
    return this.el.querySelectorAll("option:checked")
  };
  g.prototype.getSelectedProperties = function (a) {
    var b = this.getSelected();
    return [].slice.call(b).map(function (b) {
      return b[a]
    }).filter(function (a) {
      return null !== a && void 0 !== a
    })
  };
  g.prototype.detectEventPassiveOption = function () {
    var a = !1;
    try {
      var b = Object.defineProperty({}, "passive", {
        get: function () {
          a = !0
        }
      });
      window.addEventListener("test", null, b)
    } catch (e) {
    }
    return a
  };
  g.prototype.bindEvents = function () {
    var a = this;
    this.events =
      {};
    this.events.dismiss = t.bind(this);
    this.events.navigate = v.bind(this);
    this.events.reset = this.reset.bind(this);
    if (this.config.nativeDropdown || this.mobileDevice) {
      this.container.addEventListener("touchstart", function (b) {
        b.changedTouches[0].target === a.el && a.toggle()
      }, this.supportsEventPassiveOption ? {passive: !0} : !1);
      this.container.addEventListener("click", function (b) {
        b.target === a.el && a.toggle()
      });
      var c = function (a, b) {
        for (var d = [], c = a.slice(0), e, f = 0; f < b.length; f++) e = c.indexOf(b[f]), -1 < e ? c.splice(e, 1) : d.push(b[f]);
        return [d, c]
      };
      this.el.addEventListener("change", function (d) {
        a.el.multiple ? (d = a.getSelectedProperties("idx"), d = c(a.selectedIndexes, d), b.each(d[0], function (b, d) {
          a.select(d)
        }, a), b.each(d[1], function (b, d) {
          a.deselect(d)
        }, a)) : -1 < a.el.selectedIndex && a.select(a.el.selectedIndex)
      })
    }
    this.container.addEventListener("keydown", function (b) {
      "Escape" === b.key && a.close();
      "Enter" === b.key && a.selected === document.activeElement && "undefined" !== typeof a.el.form.submit && a.el.form.submit();
      " " !== b.key && "ArrowUp" !== b.key && "ArrowDown" !==
      b.key || a.selected !== document.activeElement || (setTimeout(function () {
        a.toggle()
      }, 200), a.config.nativeDropdown && setTimeout(function () {
        a.el.focus()
      }, 200))
    });
    this.selected.addEventListener("click", function (b) {
      a.disabled || a.toggle();
      b.preventDefault()
    });
    if (this.config.nativeKeyboard) {
      var e = "";
      this.selected.addEventListener("keydown", function (b) {
        if (!(a.disabled || a.selected !== document.activeElement || b.altKey || b.ctrlKey || b.metaKey)) if (" " === b.key || !a.opened && -1 < ["Enter", "ArrowUp", "ArrowDown"].indexOf(b.key)) a.toggle(),
          b.preventDefault(), b.stopPropagation(); else if (2 >= b.key.length && String[String.fromCodePoint ? "fromCodePoint" : "fromCharCode"](b.key[String.codePointAt ? "codePointAt" : "charCodeAt"](0)) === b.key) {
          if (a.config.multiple) a.open(), a.config.searchable && (a.input.value = b.key, a.input.focus(), a.search(null, !0)); else {
            e += b.key;
            var c = a.search(e, !0);
            c && c.length && (a.clear(), a.setValue(c[0].value));
            setTimeout(function () {
              e = ""
            }, 1E3)
          }
          b.preventDefault();
          b.stopPropagation()
        }
      });
      this.container.addEventListener("keyup", function (b) {
        a.opened &&
        "Escape" === b.key && (a.close(), b.stopPropagation(), a.selected.focus())
      })
    }
    this.label.addEventListener("click", function (c) {
      b.hasClass(c.target, "selectr-tag-remove") && a.deselect(c.target.parentNode.idx)
    });
    this.selectClear && this.selectClear.addEventListener("click", this.clear.bind(this));
    this.tree.addEventListener("mousedown", function (a) {
      a.preventDefault()
    });
    this.tree.addEventListener("click", function (c) {
      var d = b.closest(c.target, function (a) {
        return a && b.hasClass(a, "selectr-option")
      });
      d && !b.hasClass(d, "disabled") &&
      (b.hasClass(d, "selected") ? (a.el.multiple || !a.el.multiple && a.config.allowDeselect) && a.deselect(d.idx) : a.select(d.idx), a.opened && !a.el.multiple && a.close());
      c.preventDefault();
      c.stopPropagation()
    });
    this.tree.addEventListener("mouseover", function (c) {
      b.hasClass(c.target, "selectr-option") && !b.hasClass(c.target, "disabled") && (b.removeClass(a.items[a.navIndex], "active"), b.addClass(c.target, "active"), a.navIndex = [].slice.call(a.items).indexOf(c.target))
    });
    this.config.searchable && (this.input.addEventListener("focus",
      function (b) {
        a.searching = !0
      }), this.input.addEventListener("blur", function (b) {
      a.searching = !1
    }), this.input.addEventListener("keyup", function (c) {
      a.search();
      a.config.taggable || (this.value.length ? b.addClass(this.parentNode, "active") : b.removeClass(this.parentNode, "active"))
    }), this.inputClear.addEventListener("click", function (b) {
      a.input.value = null;
      q.call(a);
      a.tree.childElementCount || p.call(a)
    }));
    this.config.taggable && this.input.addEventListener("keyup", function (c) {
      a.search();
      if (a.config.taggable && this.value.length) {
        var d =
          this.value.trim();
        if (13 === c.which || b.includes(a.tagSeperators, c.key)) b.each(a.tagSeperators, function (a, b) {
          d = d.replace(b, "")
        }), a.add({
          value: d,
          text: d,
          selected: !0
        }, !0) ? (a.close(), q.call(a)) : (this.value = "", a.setMessage(a.config.messages.tagDuplicate))
      }
    });
    this.update = b.debounce(function () {
      a.opened && a.config.closeOnScroll && a.close();
      a.width && (a.container.style.width = a.width);
      a.invert()
    }, 50);
    this.requiresPagination && (this.paginateItems = b.debounce(function () {
      r.call(this)
    }, 50), this.tree.addEventListener("scroll",
      this.paginateItems.bind(this)));
    document.addEventListener("click", this.events.dismiss);
    window.addEventListener("keydown", this.events.navigate);
    window.addEventListener("resize", this.update);
    window.addEventListener("scroll", this.update);
    this.on("selectr.destroy", function () {
      document.removeEventListener("click", this.events.dismiss);
      window.removeEventListener("keydown", this.events.navigate);
      window.removeEventListener("resize", this.update);
      window.removeEventListener("scroll", this.update)
    });
    this.el.form &&
    (this.el.form.addEventListener("reset", this.events.reset), this.on("selectr.destroy", function () {
      this.el.form.removeEventListener("reset", this.events.reset)
    }))
  };
  g.prototype.setSelected = function (a) {
    this.config.data || this.el.multiple || !this.el.options.length || (0 !== this.el.selectedIndex || this.el.options[0].defaultSelected || this.config.defaultSelected || (this.el.selectedIndex = -1), this.selectedIndex = this.el.selectedIndex, -1 < this.selectedIndex && this.select(this.selectedIndex));
    this.config.multiple && "select-one" ===
    this.originalType && !this.config.data && this.el.options[0].selected && !this.el.options[0].defaultSelected && (this.el.options[0].selected = !1);
    b.each(this.options, function (a, b) {
      b.selected && b.defaultSelected && this.select(b.idx)
    }, this);
    this.config.selectedValue && this.setValue(this.config.selectedValue);
    if (this.config.data) {
      !this.el.multiple && this.config.defaultSelected && 0 > this.el.selectedIndex && this.select(0);
      var c = 0;
      b.each(this.config.data, function (a, d) {
        k(d, "children") ? b.each(d.children, function (a, b) {
          b.hasOwnProperty("selected") &&
          !0 === b.selected && this.select(c);
          c++
        }, this) : (d.hasOwnProperty("selected") && !0 === d.selected && this.select(c), c++)
      }, this)
    }
  };
  g.prototype.destroy = function () {
    this.rendered && (this.emit("selectr.destroy"), "select-one" === this.originalType && (this.el.multiple = !1), this.config.data && (this.el.innerHTML = ""), b.removeClass(this.el, "selectr-hidden"), this.container.parentNode.replaceChild(this.el, this.container), this.rendered = !1, delete this.el.selectr)
  };
  g.prototype.change = function (a) {
    var c = this.items[a], e = this.options[a];
    e.disabled || (e.selected && b.hasClass(c, "selected") ? this.deselect(a) : this.select(a), this.opened && !this.el.multiple && this.close())
  };
  g.prototype.select = function (a) {
    var c = this.items[a], e = [].slice.call(this.el.options), d = this.options[a];
    if (this.el.multiple) {
      if (b.includes(this.selectedIndexes, a)) return !1;
      if (this.config.maxSelections && this.tags.length === this.config.maxSelections) return this.setMessage(this.config.messages.maxSelections.replace("{max}", this.config.maxSelections), !0), !1;
      this.selectedValues.push(d.value);
      this.selectedIndexes.push(a);
      w.call(this, c)
    } else {
      var f = this.data ? this.data[a] : d;
      this.label.innerHTML = this.customSelected ? this.config.renderSelection(f) : d.textContent;
      this.selectedValue = d.value;
      this.selectedIndex = a;
      b.each(this.options, function (c, d) {
        var e = this.items[c];
        c !== a && (e && b.removeClass(e, "selected"), d.selected = !1, d.removeAttribute("selected"))
      }, this)
    }
    b.includes(e, d) || this.el.add(d);
    c.setAttribute("aria-selected", !0);
    b.addClass(c, "selected");
    b.addClass(this.container, "has-selected");
    d.selected =
      !0;
    d.setAttribute("selected", "");
    this.emit("selectr.change", d);
    this.emit("selectr.select", d);
    "createEvent" in document ? (c = document.createEvent("HTMLEvents"), c.initEvent("change", !0, !0), this.el.dispatchEvent(c)) : this.el.fireEvent("onchange")
  };
  g.prototype.deselect = function (a, c) {

    var e = this.items[a], d = this.options[a];
    if (this.el.multiple) {
      var f = this.selectedIndexes.indexOf(a);
      this.selectedIndexes.splice(f, 1);
      f = this.selectedValues.indexOf(d.value);
      this.selectedValues.splice(f, 1);
      x.call(this, e);
      this.tags.length ||
      b.removeClass(this.container, "has-selected")
    } else {
      if (!c && !this.config.clearable && !this.config.allowDeselect) return !1;
      this.label.innerHTML = "";
      this.selectedValue = null;
      this.el.selectedIndex = this.selectedIndex = -1;
      b.removeClass(this.container, "has-selected")
    }
    this.items[a].setAttribute("aria-selected", !1);
    b.removeClass(this.items[a], "selected");
    d.selected = !1;
    d.removeAttribute("selected");
    this.emit("selectr.change", null);
    this.emit("selectr.deselect", d);
    "createEvent" in document ? (e = document.createEvent("HTMLEvents"),
      e.initEvent("change", !0, !0), this.el.dispatchEvent(e)) : this.el.fireEvent("onchange")
  };
  g.prototype.setValue = function (a) {
    var c = Array.isArray(a);
    c || (a = a.toString().trim());
    if (!this.el.multiple && c) return !1;
    b.each(this.options, function (b, d) {
      (c && -1 < a.indexOf(d.value) || d.value === a) && this.change(d.idx)
    }, this)
  };
  g.prototype.getValue = function (a, c) {
    if (this.el.multiple) if (a) {
      if (this.selectedIndexes.length) {
        var e = {values: []};
        b.each(this.selectedIndexes, function (a, b) {
          var c = this.options[b];
          e.values[a] = {
            value: c.value,
            text: c.textContent
          }
        }, this)
      }
    } else e = this.selectedValues.slice(); else if (a) {
      var d = this.options[this.selectedIndex];
      e = {value: d.value, text: d.textContent}
    } else e = this.selectedValue;
    a && c && (e = JSON.stringify(e));
    return e
  };

  g.prototype.add = function (a, c) {
    if (a) {
      this.data = this.data || [];
      this.items = this.items || [];
      this.options = this.options || [];
      if (Array.isArray(a)) b.each(a, function (a, b) {
        this.add(b, c)
      }, this); else if ("[object Object]" === Object.prototype.toString.call(a)) {
        if (c) {
          var e = !1;
          b.each(this.options, function (b,
                                         c) {
            c.value.toLowerCase() === a.value.toLowerCase() && (e = !0)
          });
          if (e) return !1
        }
        var d = b.createElement("option", a);
        this.data.push(a);
        this.options.push(d);
        d.idx = 0 < this.options.length ? this.options.length - 1 : 0;
        m.call(this, d);
        a.selected && this.select(d.idx);
        this.setPlaceholder();
        return d
      }
      this.config.pagination && this.paginate();
      return !0
    }
  };
  g.prototype.remove = function (a) {
    var c = [];
    Array.isArray(a) ? b.each(a, function (a, e) {
        b.isInt(e) ? c.push(this.getOptionByIndex(e)) : "string" === typeof e && c.push(this.getOptionByValue(e))
      },
      this) : b.isInt(a) ? c.push(this.getOptionByIndex(a)) : "string" === typeof a && c.push(this.getOptionByValue(a));
    if (c.length) {
      var e;
      b.each(c, function (a, c) {
        e = c.idx;
        this.el.remove(c);
        this.options.splice(e, 1);
        var d = this.items[e].parentNode;
        d && d.removeChild(this.items[e]);
        this.items.splice(e, 1);
        b.each(this.options, function (a, b) {
          b.idx = a;
          this.items[a].idx = a
        }, this)
      }, this);
      this.setPlaceholder();
      this.config.pagination && this.paginate()
    }
  };
  g.prototype.removeAll = function () {
    this.clear(!0);
    b.each(this.el.options, function (a,
                                      b) {
      this.el.remove(b)
    }, this);
    b.truncate(this.tree);
    this.items = [];
    this.options = [];
    this.data = [];
    this.navIndex = 0;
    this.requiresPagination && (this.requiresPagination = !1, this.pageIndex = 1, this.pages = []);
    this.setPlaceholder()
  };
  g.prototype.search = function (a, c) {
    if (!this.navigating) {
      var e = !1;
      a || (a = this.input.value, e = !0, this.removeMessage(), b.truncate(this.tree));
      var d = [], f = document.createDocumentFragment();
      a = a.trim().toLowerCase();
      if (0 < a.length) {
        var g = c ? b.startsWith : b.includes;
        b.each(this.options, function (c, h) {
          var k =
            this.items[h.idx];
          if (g(h.textContent.trim().toLowerCase(), a) && !h.disabled) {
            if (d.push({
              text: h.textContent,
              value: h.value
            }), e && (n(k, f, this.customOption), b.removeClass(k, "excluded"), !this.customOption)) {
              var l = (l = (new RegExp(a, "i")).exec(h.textContent)) ? h.textContent.replace(l[0], "<span class='selectr-match'>" + l[0] + "</span>") : !1;
              k.innerHTML = l
            }
          } else e && b.addClass(k, "excluded")
        }, this);
        if (e) {
          if (f.childElementCount) {
            var k = this.items[this.navIndex], l = f.querySelector(".selectr-option:not(.excluded)");
            this.noResults =
              !1;
            b.removeClass(k, "active");
            this.navIndex = l.idx;
            b.addClass(l, "active")
          } else this.config.taggable || (this.noResults = !0, this.setMessage(this.config.messages.noResults));
          this.tree.appendChild(f)
        }
      } else p.call(this);
      return d
    }
  };
  g.prototype.toggle = function () {
    this.disabled || (this.opened ? this.close() : this.open())
  };
  g.prototype.open = function () {
    var a = this;
    if (!this.options.length) return !1;
    this.opened || this.emit("selectr.open");
    this.opened = !0;
    this.mobileDevice || this.config.nativeDropdown ? (b.addClass(this.container,
      "native-open"), this.config.data && b.each(this.options, function (a, b) {
      this.el.add(b)
    }, this)) : (b.addClass(this.container, "open"), p.call(this), this.invert(), this.tree.scrollTop = 0, b.removeClass(this.container, "notice"), this.selected.setAttribute("aria-expanded", !0), this.tree.setAttribute("aria-hidden", !1), this.tree.setAttribute("aria-expanded", !0), this.config.searchable && !this.config.taggable && setTimeout(function () {
      a.input.focus();
      a.input.tabIndex = 0
    }, 10))
  };
  g.prototype.close = function () {
    this.opened && this.emit("selectr.close");
    this.navigating = this.opened = !1;
    if (this.mobileDevice || this.config.nativeDropdown) b.removeClass(this.container, "native-open"); else {
      var a = b.hasClass(this.container, "notice");
      this.config.searchable && !a && (this.input.blur(), this.input.tabIndex = -1, this.searching = !1);
      a && (b.removeClass(this.container, "notice"), this.notice.textContent = "");
      b.removeClass(this.container, "open");
      b.removeClass(this.container, "native-open");
      this.selected.setAttribute("aria-expanded", !1);
      this.tree.setAttribute("aria-hidden", !0);
      this.tree.setAttribute("aria-expanded",
        !1);
      b.truncate(this.tree);
      q.call(this)
    }
  };
  g.prototype.enable = function () {
    this.disabled = !1;
    this.el.disabled = !1;
    this.selected.tabIndex = this.originalIndex;
    this.el.multiple && b.each(this.tags, function (a, b) {
      b.lastElementChild.tabIndex = 0
    });
    b.removeClass(this.container, "selectr-disabled")
  };
  g.prototype.disable = function (a) {
    a || (this.el.disabled = !0);
    this.selected.tabIndex = -1;
    this.el.multiple && b.each(this.tags, function (a, b) {
      b.lastElementChild.tabIndex = -1
    });
    this.disabled = !0;
    b.addClass(this.container,
      "selectr-disabled")
  };
  g.prototype.reset = function () {
    this.disabled || (this.clear(), this.setSelected(!0), b.each(this.defaultSelected, function (a, b) {
      this.select(b)
    }, this), this.emit("selectr.reset"))
  };
  g.prototype.clear = function (a) {
    this.el.multiple ? this.selectedIndexes.length && (a = this.selectedIndexes.slice(), b.each(a, function (a, b) {
      this.deselect(b)
    }, this)) : -1 < this.selectedIndex && this.deselect(this.selectedIndex, a);
    this.emit("selectr.clear")
  };
  g.prototype.serialise = function (a) {
    var c = [];
    b.each(this.options, function (a,
                                   b) {
      var d = {value: b.value, text: b.textContent};
      b.selected && (d.selected = !0);
      b.disabled && (d.disabled = !0);
      c[a] = d
    });
    return a ? JSON.stringify(c) : c
  };
  g.prototype.serialize = function (a) {
    return this.serialise(a)
  };
  g.prototype.setPlaceholder = function (a) {
    a = a || this.config.placeholder || this.el.getAttribute("placeholder");
    this.options.length || (a = this.config.messages.noOptions);
    this.placeEl.innerHTML = a
  };
  g.prototype.paginate = function () {
    if (this.items.length) {
      var a = this;
      return this.pages = this.items.map(function (b, e) {
        return 0 ===
        e % a.config.pagination ? a.items.slice(e, e + a.config.pagination) : null
      }).filter(function (a) {
        return a
      })
    }
  };
  g.prototype.setMessage = function (a, c) {
    c && this.close();
    b.addClass(this.container, "notice");
    this.notice.textContent = a
  };
  g.prototype.removeMessage = function () {
    b.removeClass(this.container, "notice");
    this.notice.innerHTML = ""
  };
  g.prototype.invert = function () {
    var a = b.rect(this.selected);
    a.top + a.height + this.tree.parentNode.offsetHeight > window.innerHeight ? (b.addClass(this.container, "inverted"), this.isInverted = !0) :
      (b.removeClass(this.container, "inverted"), this.isInverted = !1);
    this.optsRect = b.rect(this.tree)
  };
  g.prototype.getOptionByIndex = function (a) {
    return this.options[a]
  };
  g.prototype.getOptionByValue = function (a) {
    for (var b = !1, e = 0, d = this.options.length; e < d; e++) if (this.options[e].value.trim() === a.toString().trim()) {
      b = this.options[e];
      break
    }
    return b
  };
  return g
});

!function(a,b){"function"==typeof define&&define.amd?define([],function(){return a.svg4everybody=b()}):"object"==typeof module&&module.exports?module.exports=b():a.svg4everybody=b()}(this,function(){function a(a,b,c){if(c){var d=document.createDocumentFragment(),e=!b.hasAttribute("viewBox")&&c.getAttribute("viewBox");e&&b.setAttribute("viewBox",e);for(var f=c.cloneNode(!0);f.childNodes.length;)d.appendChild(f.firstChild);a.appendChild(d)}}function b(b){b.onreadystatechange=function(){if(4===b.readyState){var c=b._cachedDocument;c||(c=b._cachedDocument=document.implementation.createHTMLDocument(""),c.body.innerHTML=b.responseText,b._cachedTarget={}),b._embeds.splice(0).map(function(d){var e=b._cachedTarget[d.id];e||(e=b._cachedTarget[d.id]=c.getElementById(d.id)),a(d.parent,d.svg,e)})}},b.onreadystatechange()}function c(c){function e(){for(var c=0;c<o.length;){var h=o[c],i=h.parentNode,j=d(i),k=h.getAttribute("xlink:href")||h.getAttribute("href");if(!k&&g.attributeName&&(k=h.getAttribute(g.attributeName)),j&&k){if(f)if(!g.validate||g.validate(k,j,h)){i.removeChild(h);var l=k.split("#"),q=l.shift(),r=l.join("#");if(q.length){var s=m[q];s||(s=m[q]=new XMLHttpRequest,s.open("GET",q),s.send(),s._embeds=[]),s._embeds.push({parent:i,svg:j,id:r}),b(s)}else a(i,j,document.getElementById(r))}else++c,++p}else++c}(!o.length||o.length-p>0)&&n(e,67)}var f,g=Object(c),h=/\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,i=/\bAppleWebKit\/(\d+)\b/,j=/\bEdge\/12\.(\d+)\b/,k=/\bEdge\/.(\d+)\b/,l=window.top!==window.self;f="polyfill"in g?g.polyfill:h.test(navigator.userAgent)||(navigator.userAgent.match(j)||[])[1]<10547||(navigator.userAgent.match(i)||[])[1]<537||k.test(navigator.userAgent)&&l;var m={},n=window.requestAnimationFrame||setTimeout,o=document.getElementsByTagName("use"),p=0;f&&e()}function d(a){for(var b=a;"svg"!==b.nodeName.toLowerCase()&&(b=b.parentNode););return b}return c});
