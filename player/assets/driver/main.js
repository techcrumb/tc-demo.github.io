!function e(t,i,r){function n(s,a){if(!i[s]){if(!t[s]){var u="function"==typeof require&&require;if(!a&&u)return u(s,!0);if(o)return o(s,!0);var h=new Error("Cannot find module '"+s+"'");throw h.code="MODULE_NOT_FOUND",h}var f=i[s]={exports:{}};t[s][0].call(f.exports,function(e){var i=t[s][1][e];return n(i||e)},f,f.exports,e,t,i,r)}return i[s].exports}for(var o="function"==typeof require&&require,s=0;s<r.length;s++)n(r[s]);return n}({1:[function(e,t,i){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var n=function(){function e(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,i,r){return i&&e(t.prototype,i),r&&e(t,r),t}}(),o=function(){function e(t,i,n){var o=this;if(r(this,e),!t||!n||!i)throw TypeError();this.id=t,this.height=n,this.width=i,this.queue=[],window.addEventListener("message",function(e){var t=e.data;if(-1!=t.indexOf('{"tc":true')){var i=JSON.parse(t);i.pong&&(o.ready=!0,o.stopTimer(),o.processQueue()),i.dispose&&o.ifrm.parentNode.removeChild(o.ifrm)}})}return n(e,[{key:"init",value:function(){var e=document.createElement("iframe");e.setAttribute("src","player/player.html"),e.setAttribute("scrolling","no"),e.setAttribute("frameBorder","0"),e.style.width=this.width+"px",e.style.height=this.height+"px",document.getElementById(this.id).appendChild(e),this.ifrm=e,this.sendMessage()}},{key:"processQueue",value:function(){var e=this;this.queue.forEach(function(t){t.fn.call(e,t.params)}),this.queue=[]}},{key:"enrich",value:function(e){e.height=this.height,e.width=this.width}},{key:"load",value:function(e){this.ready?(this.enrich(e),this.ifrm.contentWindow.postMessage(JSON.stringify({tc:!0,method:"load",params:e}),"*")):this.queue.push({fn:this.load,params:e})}},{key:"sendMessage",value:function(){var e=this;this.timerID=setInterval(function(){e.ifrm.contentWindow.postMessage(JSON.stringify({tc:!0,ping:!0}),"*")},500)}},{key:"stopTimer",value:function(){clearInterval(this.timerID)}}]),e}();window.TC={},window.TC.Player=o},{}]},{},[1]);