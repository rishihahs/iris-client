/*! iris-chat 2013-11-03 */
var io="undefined"==typeof module?{}:module.exports;!function(){!function(a,b){var c=a;c.version="0.9.16",c.protocol=1,c.transports=[],c.j=[],c.sockets={},c.connect=function(a,d){var e,f,g=c.util.parseUri(a);b&&b.location&&(g.protocol=g.protocol||b.location.protocol.slice(0,-1),g.host=g.host||(b.document?b.document.domain:b.location.hostname),g.port=g.port||b.location.port),e=c.util.uniqueUri(g);var h={host:g.host,secure:"https"==g.protocol,port:g.port||("https"==g.protocol?443:80),query:g.query||""};return c.util.merge(h,d),(h["force new connection"]||!c.sockets[e])&&(f=new c.Socket(h)),!h["force new connection"]&&f&&(c.sockets[e]=f),f=f||c.sockets[e],f.of(g.path.length>1?g.path:"")}}("object"==typeof module?module.exports:this.io={},this),function(a,b){var c=a.util={},d=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,e=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];c.parseUri=function(a){for(var b=d.exec(a||""),c={},f=14;f--;)c[e[f]]=b[f]||"";return c},c.uniqueUri=function(a){var c=a.protocol,d=a.host,e=a.port;return"document"in b?(d=d||document.domain,e=e||("https"==c&&"https:"!==document.location.protocol?443:document.location.port)):(d=d||"localhost",e||"https"!=c||(e=443)),(c||"http")+"://"+d+":"+(e||80)},c.query=function(a,b){var d=c.chunkQuery(a||""),e=[];c.merge(d,c.chunkQuery(b||""));for(var f in d)d.hasOwnProperty(f)&&e.push(f+"="+d[f]);return e.length?"?"+e.join("&"):""},c.chunkQuery=function(a){for(var b,c={},d=a.split("&"),e=0,f=d.length;f>e;++e)b=d[e].split("="),b[0]&&(c[b[0]]=b[1]);return c};var f=!1;c.load=function(a){return"document"in b&&"complete"===document.readyState||f?a():(c.on(b,"load",a,!1),void 0)},c.on=function(a,b,c,d){a.attachEvent?a.attachEvent("on"+b,c):a.addEventListener&&a.addEventListener(b,c,d)},c.request=function(a){if(a&&"undefined"!=typeof XDomainRequest&&!c.ua.hasCORS)return new XDomainRequest;if("undefined"!=typeof XMLHttpRequest&&(!a||c.ua.hasCORS))return new XMLHttpRequest;if(!a)try{return new(window[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")}catch(b){}return null},"undefined"!=typeof window&&c.load(function(){f=!0}),c.defer=function(a){return c.ua.webkit&&"undefined"==typeof importScripts?(c.load(function(){setTimeout(a,100)}),void 0):a()},c.merge=function(a,b,d,e){var f,g=e||[],h="undefined"==typeof d?2:d;for(f in b)b.hasOwnProperty(f)&&c.indexOf(g,f)<0&&("object"==typeof a[f]&&h?c.merge(a[f],b[f],h-1,g):(a[f]=b[f],g.push(b[f])));return a},c.mixin=function(a,b){c.merge(a.prototype,b.prototype)},c.inherit=function(a,b){function c(){}c.prototype=b.prototype,a.prototype=new c},c.isArray=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},c.intersect=function(a,b){for(var d=[],e=a.length>b.length?a:b,f=a.length>b.length?b:a,g=0,h=f.length;h>g;g++)~c.indexOf(e,f[g])&&d.push(f[g]);return d},c.indexOf=function(a,b,c){for(var d=a.length,c=0>c?0>c+d?0:c+d:c||0;d>c&&a[c]!==b;c++);return c>=d?-1:c},c.toArray=function(a){for(var b=[],c=0,d=a.length;d>c;c++)b.push(a[c]);return b},c.ua={},c.ua.hasCORS="undefined"!=typeof XMLHttpRequest&&function(){try{var a=new XMLHttpRequest}catch(b){return!1}return void 0!=a.withCredentials}(),c.ua.webkit="undefined"!=typeof navigator&&/webkit/i.test(navigator.userAgent),c.ua.iDevice="undefined"!=typeof navigator&&/iPad|iPhone|iPod/i.test(navigator.userAgent)}("undefined"!=typeof io?io:module.exports,this),function(a,b){function c(){}a.EventEmitter=c,c.prototype.on=function(a,c){return this.$events||(this.$events={}),this.$events[a]?b.util.isArray(this.$events[a])?this.$events[a].push(c):this.$events[a]=[this.$events[a],c]:this.$events[a]=c,this},c.prototype.addListener=c.prototype.on,c.prototype.once=function(a,b){function c(){d.removeListener(a,c),b.apply(this,arguments)}var d=this;return c.listener=b,this.on(a,c),this},c.prototype.removeListener=function(a,c){if(this.$events&&this.$events[a]){var d=this.$events[a];if(b.util.isArray(d)){for(var e=-1,f=0,g=d.length;g>f;f++)if(d[f]===c||d[f].listener&&d[f].listener===c){e=f;break}if(0>e)return this;d.splice(e,1),d.length||delete this.$events[a]}else(d===c||d.listener&&d.listener===c)&&delete this.$events[a]}return this},c.prototype.removeAllListeners=function(a){return void 0===a?(this.$events={},this):(this.$events&&this.$events[a]&&(this.$events[a]=null),this)},c.prototype.listeners=function(a){return this.$events||(this.$events={}),this.$events[a]||(this.$events[a]=[]),b.util.isArray(this.$events[a])||(this.$events[a]=[this.$events[a]]),this.$events[a]},c.prototype.emit=function(a){if(!this.$events)return!1;var c=this.$events[a];if(!c)return!1;var d=Array.prototype.slice.call(arguments,1);if("function"==typeof c)c.apply(this,d);else{if(!b.util.isArray(c))return!1;for(var e=c.slice(),f=0,g=e.length;g>f;f++)e[f].apply(this,d)}return!0}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports),function(exports,nativeJSON){function f(a){return 10>a?"0"+a:a}function date(a){return isFinite(a.valueOf())?a.getUTCFullYear()+"-"+f(a.getUTCMonth()+1)+"-"+f(a.getUTCDate())+"T"+f(a.getUTCHours())+":"+f(a.getUTCMinutes())+":"+f(a.getUTCSeconds())+"Z":null}function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return"string"==typeof b?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,g,h=gap,i=b[a];switch(i instanceof Date&&(i=date(a)),"function"==typeof rep&&(i=rep.call(b,a,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,g=[],"[object Array]"===Object.prototype.toString.apply(i)){for(f=i.length,c=0;f>c;c+=1)g[c]=str(c,i)||"null";return e=0===g.length?"[]":gap?"[\n"+gap+g.join(",\n"+gap)+"\n"+h+"]":"["+g.join(",")+"]",gap=h,e}if(rep&&"object"==typeof rep)for(f=rep.length,c=0;f>c;c+=1)"string"==typeof rep[c]&&(d=rep[c],e=str(d,i),e&&g.push(quote(d)+(gap?": ":":")+e));else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&g.push(quote(d)+(gap?": ":":")+e));return e=0===g.length?"{}":gap?"{\n"+gap+g.join(",\n"+gap)+"\n"+h+"}":"{"+g.join(",")+"}",gap=h,e}}if(nativeJSON&&nativeJSON.parse)return exports.JSON={parse:nativeJSON.parse,stringify:nativeJSON.stringify};var JSON=exports.JSON={},cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;JSON.stringify=function(a,b,c){var d;if(gap="",indent="","number"==typeof c)for(d=0;c>d;d+=1)indent+=" ";else"string"==typeof c&&(indent=c);if(rep=b,b&&"function"!=typeof b&&("object"!=typeof b||"number"!=typeof b.length))throw new Error("JSON.stringify");return str("",{"":a})},JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&"object"==typeof e)for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),void 0!==d?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof JSON?JSON:void 0),function(a,b){var c=a.parser={},d=c.packets=["disconnect","connect","heartbeat","message","json","event","ack","error","noop"],e=c.reasons=["transport not supported","client not handshaken","unauthorized"],f=c.advice=["reconnect"],g=b.JSON,h=b.util.indexOf;c.encodePacket=function(a){var b=h(d,a.type),c=a.id||"",i=a.endpoint||"",j=a.ack,k=null;switch(a.type){case"error":var l=a.reason?h(e,a.reason):"",m=a.advice?h(f,a.advice):"";(""!==l||""!==m)&&(k=l+(""!==m?"+"+m:""));break;case"message":""!==a.data&&(k=a.data);break;case"event":var n={name:a.name};a.args&&a.args.length&&(n.args=a.args),k=g.stringify(n);break;case"json":k=g.stringify(a.data);break;case"connect":a.qs&&(k=a.qs);break;case"ack":k=a.ackId+(a.args&&a.args.length?"+"+g.stringify(a.args):"")}var o=[b,c+("data"==j?"+":""),i];return null!==k&&void 0!==k&&o.push(k),o.join(":")},c.encodePayload=function(a){var b="";if(1==a.length)return a[0];for(var c=0,d=a.length;d>c;c++){var e=a[c];b+="�"+e.length+"�"+a[c]}return b};var i=/([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;c.decodePacket=function(a){var b=a.match(i);if(!b)return{};var c=b[2]||"",a=b[5]||"",h={type:d[b[1]],endpoint:b[4]||""};switch(c&&(h.id=c,h.ack=b[3]?"data":!0),h.type){case"error":var b=a.split("+");h.reason=e[b[0]]||"",h.advice=f[b[1]]||"";break;case"message":h.data=a||"";break;case"event":try{var j=g.parse(a);h.name=j.name,h.args=j.args}catch(k){}h.args=h.args||[];break;case"json":try{h.data=g.parse(a)}catch(k){}break;case"connect":h.qs=a||"";break;case"ack":var b=a.match(/^([0-9]+)(\+)?(.*)/);if(b&&(h.ackId=b[1],h.args=[],b[3]))try{h.args=b[3]?g.parse(b[3]):[]}catch(k){}break;case"disconnect":case"heartbeat":}return h},c.decodePayload=function(a){if("�"==a.charAt(0)){for(var b=[],d=1,e="";d<a.length;d++)"�"==a.charAt(d)?(b.push(c.decodePacket(a.substr(d+1).substr(0,e))),d+=Number(e)+1,e=""):e+=a.charAt(d);return b}return[c.decodePacket(a)]}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports),function(a,b){function c(a,b){this.socket=a,this.sessid=b}a.Transport=c,b.util.mixin(c,b.EventEmitter),c.prototype.heartbeats=function(){return!0},c.prototype.onData=function(a){if(this.clearCloseTimeout(),(this.socket.connected||this.socket.connecting||this.socket.reconnecting)&&this.setCloseTimeout(),""!==a){var c=b.parser.decodePayload(a);if(c&&c.length)for(var d=0,e=c.length;e>d;d++)this.onPacket(c[d])}return this},c.prototype.onPacket=function(a){return this.socket.setHeartbeatTimeout(),"heartbeat"==a.type?this.onHeartbeat():("connect"==a.type&&""==a.endpoint&&this.onConnect(),"error"==a.type&&"reconnect"==a.advice&&(this.isOpen=!1),this.socket.onPacket(a),this)},c.prototype.setCloseTimeout=function(){if(!this.closeTimeout){var a=this;this.closeTimeout=setTimeout(function(){a.onDisconnect()},this.socket.closeTimeout)}},c.prototype.onDisconnect=function(){return this.isOpen&&this.close(),this.clearTimeouts(),this.socket.onDisconnect(),this},c.prototype.onConnect=function(){return this.socket.onConnect(),this},c.prototype.clearCloseTimeout=function(){this.closeTimeout&&(clearTimeout(this.closeTimeout),this.closeTimeout=null)},c.prototype.clearTimeouts=function(){this.clearCloseTimeout(),this.reopenTimeout&&clearTimeout(this.reopenTimeout)},c.prototype.packet=function(a){this.send(b.parser.encodePacket(a))},c.prototype.onHeartbeat=function(){this.packet({type:"heartbeat"})},c.prototype.onOpen=function(){this.isOpen=!0,this.clearCloseTimeout(),this.socket.onOpen()},c.prototype.onClose=function(){this.isOpen=!1,this.socket.onClose(),this.onDisconnect()},c.prototype.prepareUrl=function(){var a=this.socket.options;return this.scheme()+"://"+a.host+":"+a.port+"/"+a.resource+"/"+b.protocol+"/"+this.name+"/"+this.sessid},c.prototype.ready=function(a,b){b.call(this)}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports),function(a,b,c){function d(a){if(this.options={port:80,secure:!1,document:"document"in c?document:!1,resource:"socket.io",transports:b.transports,"connect timeout":1e4,"try multiple transports":!0,reconnect:!0,"reconnection delay":500,"reconnection limit":1/0,"reopen delay":3e3,"max reconnection attempts":10,"sync disconnect on unload":!1,"auto connect":!0,"flash policy port":10843,manualFlush:!1},b.util.merge(this.options,a),this.connected=!1,this.open=!1,this.connecting=!1,this.reconnecting=!1,this.namespaces={},this.buffer=[],this.doBuffer=!1,this.options["sync disconnect on unload"]&&(!this.isXDomain()||b.util.ua.hasCORS)){var d=this;b.util.on(c,"beforeunload",function(){d.disconnectSync()},!1)}this.options["auto connect"]&&this.connect()}function e(){}a.Socket=d,b.util.mixin(d,b.EventEmitter),d.prototype.of=function(a){return this.namespaces[a]||(this.namespaces[a]=new b.SocketNamespace(this,a),""!==a&&this.namespaces[a].packet({type:"connect"})),this.namespaces[a]},d.prototype.publish=function(){this.emit.apply(this,arguments);var a;for(var b in this.namespaces)this.namespaces.hasOwnProperty(b)&&(a=this.of(b),a.$emit.apply(a,arguments))},d.prototype.handshake=function(a){function c(b){b instanceof Error?(d.connecting=!1,d.onError(b.message)):a.apply(null,b.split(":"))}var d=this,f=this.options,g=["http"+(f.secure?"s":"")+":/",f.host+":"+f.port,f.resource,b.protocol,b.util.query(this.options.query,"t="+ +new Date)].join("/");if(this.isXDomain()&&!b.util.ua.hasCORS){var h=document.getElementsByTagName("script")[0],i=document.createElement("script");i.src=g+"&jsonp="+b.j.length,h.parentNode.insertBefore(i,h),b.j.push(function(a){c(a),i.parentNode.removeChild(i)})}else{var j=b.util.request();j.open("GET",g,!0),this.isXDomain()&&(j.withCredentials=!0),j.onreadystatechange=function(){4==j.readyState&&(j.onreadystatechange=e,200==j.status?c(j.responseText):403==j.status?d.onError(j.responseText):(d.connecting=!1,!d.reconnecting&&d.onError(j.responseText)))},j.send(null)}},d.prototype.getTransport=function(a){for(var c,d=a||this.transports,e=0;c=d[e];e++)if(b.Transport[c]&&b.Transport[c].check(this)&&(!this.isXDomain()||b.Transport[c].xdomainCheck(this)))return new b.Transport[c](this,this.sessionid);return null},d.prototype.connect=function(a){if(this.connecting)return this;var c=this;return c.connecting=!0,this.handshake(function(d,e,f,g){function h(a){return c.transport&&c.transport.clearTimeouts(),c.transport=c.getTransport(a),c.transport?(c.transport.ready(c,function(){c.connecting=!0,c.publish("connecting",c.transport.name),c.transport.open(),c.options["connect timeout"]&&(c.connectTimeoutTimer=setTimeout(function(){if(!c.connected&&(c.connecting=!1,c.options["try multiple transports"])){for(var a=c.transports;a.length>0&&a.splice(0,1)[0]!=c.transport.name;);a.length?h(a):c.publish("connect_failed")}},c.options["connect timeout"]))}),void 0):c.publish("connect_failed")}c.sessionid=d,c.closeTimeout=1e3*f,c.heartbeatTimeout=1e3*e,c.transports||(c.transports=c.origTransports=g?b.util.intersect(g.split(","),c.options.transports):c.options.transports),c.setHeartbeatTimeout(),h(c.transports),c.once("connect",function(){clearTimeout(c.connectTimeoutTimer),a&&"function"==typeof a&&a()})}),this},d.prototype.setHeartbeatTimeout=function(){if(clearTimeout(this.heartbeatTimeoutTimer),!this.transport||this.transport.heartbeats()){var a=this;this.heartbeatTimeoutTimer=setTimeout(function(){a.transport.onClose()},this.heartbeatTimeout)}},d.prototype.packet=function(a){return this.connected&&!this.doBuffer?this.transport.packet(a):this.buffer.push(a),this},d.prototype.setBuffer=function(a){this.doBuffer=a,!a&&this.connected&&this.buffer.length&&(this.options.manualFlush||this.flushBuffer())},d.prototype.flushBuffer=function(){this.transport.payload(this.buffer),this.buffer=[]},d.prototype.disconnect=function(){return(this.connected||this.connecting)&&(this.open&&this.of("").packet({type:"disconnect"}),this.onDisconnect("booted")),this},d.prototype.disconnectSync=function(){var a=b.util.request(),c=["http"+(this.options.secure?"s":"")+":/",this.options.host+":"+this.options.port,this.options.resource,b.protocol,"",this.sessionid].join("/")+"/?disconnect=1";a.open("GET",c,!1),a.send(null),this.onDisconnect("booted")},d.prototype.isXDomain=function(){var a=c.location.port||("https:"==c.location.protocol?443:80);return this.options.host!==c.location.hostname||this.options.port!=a},d.prototype.onConnect=function(){this.connected||(this.connected=!0,this.connecting=!1,this.doBuffer||this.setBuffer(!1),this.emit("connect"))},d.prototype.onOpen=function(){this.open=!0},d.prototype.onClose=function(){this.open=!1,clearTimeout(this.heartbeatTimeoutTimer)},d.prototype.onPacket=function(a){this.of(a.endpoint).onPacket(a)},d.prototype.onError=function(a){a&&a.advice&&"reconnect"===a.advice&&(this.connected||this.connecting)&&(this.disconnect(),this.options.reconnect&&this.reconnect()),this.publish("error",a&&a.reason?a.reason:a)},d.prototype.onDisconnect=function(a){var b=this.connected,c=this.connecting;this.connected=!1,this.connecting=!1,this.open=!1,(b||c)&&(this.transport.close(),this.transport.clearTimeouts(),b&&(this.publish("disconnect",a),"booted"!=a&&this.options.reconnect&&!this.reconnecting&&this.reconnect()))},d.prototype.reconnect=function(){function a(){if(c.connected){for(var a in c.namespaces)c.namespaces.hasOwnProperty(a)&&""!==a&&c.namespaces[a].packet({type:"connect"});c.publish("reconnect",c.transport.name,c.reconnectionAttempts)}clearTimeout(c.reconnectionTimer),c.removeListener("connect_failed",b),c.removeListener("connect",b),c.reconnecting=!1,delete c.reconnectionAttempts,delete c.reconnectionDelay,delete c.reconnectionTimer,delete c.redoTransports,c.options["try multiple transports"]=e}function b(){return c.reconnecting?c.connected?a():c.connecting&&c.reconnecting?c.reconnectionTimer=setTimeout(b,1e3):(c.reconnectionAttempts++>=d?c.redoTransports?(c.publish("reconnect_failed"),a()):(c.on("connect_failed",b),c.options["try multiple transports"]=!0,c.transports=c.origTransports,c.transport=c.getTransport(),c.redoTransports=!0,c.connect()):(c.reconnectionDelay<f&&(c.reconnectionDelay*=2),c.connect(),c.publish("reconnecting",c.reconnectionDelay,c.reconnectionAttempts),c.reconnectionTimer=setTimeout(b,c.reconnectionDelay)),void 0):void 0}this.reconnecting=!0,this.reconnectionAttempts=0,this.reconnectionDelay=this.options["reconnection delay"];var c=this,d=this.options["max reconnection attempts"],e=this.options["try multiple transports"],f=this.options["reconnection limit"];this.options["try multiple transports"]=!1,this.reconnectionTimer=setTimeout(b,this.reconnectionDelay),this.on("connect",b)}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports,this),function(a,b){function c(a,b){this.socket=a,this.name=b||"",this.flags={},this.json=new d(this,"json"),this.ackPackets=0,this.acks={}}function d(a,b){this.namespace=a,this.name=b}a.SocketNamespace=c,b.util.mixin(c,b.EventEmitter),c.prototype.$emit=b.EventEmitter.prototype.emit,c.prototype.of=function(){return this.socket.of.apply(this.socket,arguments)},c.prototype.packet=function(a){return a.endpoint=this.name,this.socket.packet(a),this.flags={},this},c.prototype.send=function(a,b){var c={type:this.flags.json?"json":"message",data:a};return"function"==typeof b&&(c.id=++this.ackPackets,c.ack=!0,this.acks[c.id]=b),this.packet(c)},c.prototype.emit=function(a){var b=Array.prototype.slice.call(arguments,1),c=b[b.length-1],d={type:"event",name:a};return"function"==typeof c&&(d.id=++this.ackPackets,d.ack="data",this.acks[d.id]=c,b=b.slice(0,b.length-1)),d.args=b,this.packet(d)},c.prototype.disconnect=function(){return""===this.name?this.socket.disconnect():(this.packet({type:"disconnect"}),this.$emit("disconnect")),this},c.prototype.onPacket=function(a){function c(){d.packet({type:"ack",args:b.util.toArray(arguments),ackId:a.id})}var d=this;switch(a.type){case"connect":this.$emit("connect");break;case"disconnect":""===this.name?this.socket.onDisconnect(a.reason||"booted"):this.$emit("disconnect",a.reason);break;case"message":case"json":var e=["message",a.data];"data"==a.ack?e.push(c):a.ack&&this.packet({type:"ack",ackId:a.id}),this.$emit.apply(this,e);break;case"event":var e=[a.name].concat(a.args);"data"==a.ack&&e.push(c),this.$emit.apply(this,e);break;case"ack":this.acks[a.ackId]&&(this.acks[a.ackId].apply(this,a.args),delete this.acks[a.ackId]);break;case"error":a.advice?this.socket.onError(a):"unauthorized"==a.reason?this.$emit("connect_failed",a.reason):this.$emit("error",a.reason)}},d.prototype.send=function(){this.namespace.flags[this.name]=!0,this.namespace.send.apply(this.namespace,arguments)},d.prototype.emit=function(){this.namespace.flags[this.name]=!0,this.namespace.emit.apply(this.namespace,arguments)}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports),function(a,b,c){function d(){b.Transport.apply(this,arguments)}a.websocket=d,b.util.inherit(d,b.Transport),d.prototype.name="websocket",d.prototype.open=function(){var a,d=b.util.query(this.socket.options.query),e=this;return a||(a=c.MozWebSocket||c.WebSocket),this.websocket=new a(this.prepareUrl()+d),this.websocket.onopen=function(){e.onOpen(),e.socket.setBuffer(!1)},this.websocket.onmessage=function(a){e.onData(a.data)},this.websocket.onclose=function(){e.onClose(),e.socket.setBuffer(!0)},this.websocket.onerror=function(a){e.onError(a)},this},d.prototype.send=b.util.ua.iDevice?function(a){var b=this;return setTimeout(function(){b.websocket.send(a)},0),this}:function(a){return this.websocket.send(a),this},d.prototype.payload=function(a){for(var b=0,c=a.length;c>b;b++)this.packet(a[b]);return this},d.prototype.close=function(){return this.websocket.close(),this},d.prototype.onError=function(a){this.socket.onError(a)},d.prototype.scheme=function(){return this.socket.options.secure?"wss":"ws"},d.check=function(){return"WebSocket"in c&&!("__addTask"in WebSocket)||"MozWebSocket"in c},d.xdomainCheck=function(){return!0},b.transports.push("websocket")}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this),function(a,b,c){function d(a){a&&(b.Transport.apply(this,arguments),this.sendBuffer=[])}function e(){}a.XHR=d,b.util.inherit(d,b.Transport),d.prototype.open=function(){return this.socket.setBuffer(!1),this.onOpen(),this.get(),this.setCloseTimeout(),this},d.prototype.payload=function(a){for(var c=[],d=0,e=a.length;e>d;d++)c.push(b.parser.encodePacket(a[d]));this.send(b.parser.encodePayload(c))},d.prototype.send=function(a){return this.post(a),this},d.prototype.post=function(a){function b(){4==this.readyState&&(this.onreadystatechange=e,f.posting=!1,200==this.status?f.socket.setBuffer(!1):f.onClose())}function d(){this.onload=e,f.socket.setBuffer(!1)}var f=this;this.socket.setBuffer(!0),this.sendXHR=this.request("POST"),c.XDomainRequest&&this.sendXHR instanceof XDomainRequest?this.sendXHR.onload=this.sendXHR.onerror=d:this.sendXHR.onreadystatechange=b,this.sendXHR.send(a)},d.prototype.close=function(){return this.onClose(),this},d.prototype.request=function(a){var c=b.util.request(this.socket.isXDomain()),d=b.util.query(this.socket.options.query,"t="+ +new Date);if(c.open(a||"GET",this.prepareUrl()+d,!0),"POST"==a)try{c.setRequestHeader?c.setRequestHeader("Content-type","text/plain;charset=UTF-8"):c.contentType="text/plain"}catch(e){}return c},d.prototype.scheme=function(){return this.socket.options.secure?"https":"http"},d.check=function(a,d){try{var e=b.util.request(d),f=c.XDomainRequest&&e instanceof XDomainRequest,g=a&&a.options&&a.options.secure?"https:":"http:",h=c.location&&g!=c.location.protocol;if(e&&(!f||!h))return!0}catch(i){}return!1},d.xdomainCheck=function(a){return d.check(a,!0)}}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this),function(a,b){function c(){b.Transport.XHR.apply(this,arguments)}a.htmlfile=c,b.util.inherit(c,b.Transport.XHR),c.prototype.name="htmlfile",c.prototype.get=function(){this.doc=new(window[["Active"].concat("Object").join("X")])("htmlfile"),this.doc.open(),this.doc.write("<html></html>"),this.doc.close(),this.doc.parentWindow.s=this;var a=this.doc.createElement("div");a.className="socketio",this.doc.body.appendChild(a),this.iframe=this.doc.createElement("iframe"),a.appendChild(this.iframe);var c=this,d=b.util.query(this.socket.options.query,"t="+ +new Date);this.iframe.src=this.prepareUrl()+d,b.util.on(window,"unload",function(){c.destroy()})},c.prototype._=function(a,b){a=a.replace(/\\\//g,"/"),this.onData(a);try{var c=b.getElementsByTagName("script")[0];c.parentNode.removeChild(c)}catch(d){}},c.prototype.destroy=function(){if(this.iframe){try{this.iframe.src="about:blank"}catch(a){}this.doc=null,this.iframe.parentNode.removeChild(this.iframe),this.iframe=null,CollectGarbage()}},c.prototype.close=function(){return this.destroy(),b.Transport.XHR.prototype.close.call(this)},c.check=function(a){if("undefined"!=typeof window&&["Active"].concat("Object").join("X")in window)try{var c=new(window[["Active"].concat("Object").join("X")])("htmlfile");return c&&b.Transport.XHR.check(a)}catch(d){}return!1},c.xdomainCheck=function(){return!1},b.transports.push("htmlfile")}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports),function(a,b,c){function d(){b.Transport.XHR.apply(this,arguments)}function e(){}a["xhr-polling"]=d,b.util.inherit(d,b.Transport.XHR),b.util.merge(d,b.Transport.XHR),d.prototype.name="xhr-polling",d.prototype.heartbeats=function(){return!1},d.prototype.open=function(){var a=this;return b.Transport.XHR.prototype.open.call(a),!1},d.prototype.get=function(){function a(){4==this.readyState&&(this.onreadystatechange=e,200==this.status?(f.onData(this.responseText),f.get()):f.onClose())}function b(){this.onload=e,this.onerror=e,f.retryCounter=1,f.onData(this.responseText),f.get()}function d(){f.retryCounter++,!f.retryCounter||f.retryCounter>3?f.onClose():f.get()}if(this.isOpen){var f=this;this.xhr=this.request(),c.XDomainRequest&&this.xhr instanceof XDomainRequest?(this.xhr.onload=b,this.xhr.onerror=d):this.xhr.onreadystatechange=a,this.xhr.send(null)}},d.prototype.onClose=function(){if(b.Transport.XHR.prototype.onClose.call(this),this.xhr){this.xhr.onreadystatechange=this.xhr.onload=this.xhr.onerror=e;try{this.xhr.abort()}catch(a){}this.xhr=null}},d.prototype.ready=function(a,c){var d=this;b.util.defer(function(){c.call(d)})},b.transports.push("xhr-polling")}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this),function(a,b,c){function d(){b.Transport["xhr-polling"].apply(this,arguments),this.index=b.j.length;var a=this;b.j.push(function(b){a._(b)})}var e=c.document&&"MozAppearance"in c.document.documentElement.style;a["jsonp-polling"]=d,b.util.inherit(d,b.Transport["xhr-polling"]),d.prototype.name="jsonp-polling",d.prototype.post=function(a){function c(){d(),e.socket.setBuffer(!1)}function d(){e.iframe&&e.form.removeChild(e.iframe);try{g=document.createElement('<iframe name="'+e.iframeId+'">')}catch(a){g=document.createElement("iframe"),g.name=e.iframeId}g.id=e.iframeId,e.form.appendChild(g),e.iframe=g}var e=this,f=b.util.query(this.socket.options.query,"t="+ +new Date+"&i="+this.index);if(!this.form){var g,h=document.createElement("form"),i=document.createElement("textarea"),j=this.iframeId="socketio_iframe_"+this.index;h.className="socketio",h.style.position="absolute",h.style.top="0px",h.style.left="0px",h.style.display="none",h.target=j,h.method="POST",h.setAttribute("accept-charset","utf-8"),i.name="d",h.appendChild(i),document.body.appendChild(h),this.form=h,this.area=i}this.form.action=this.prepareUrl()+f,d(),this.area.value=b.JSON.stringify(a);try{this.form.submit()}catch(k){}this.iframe.attachEvent?g.onreadystatechange=function(){"complete"==e.iframe.readyState&&c()}:this.iframe.onload=c,this.socket.setBuffer(!0)},d.prototype.get=function(){var a=this,c=document.createElement("script"),d=b.util.query(this.socket.options.query,"t="+ +new Date+"&i="+this.index);this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),c.async=!0,c.src=this.prepareUrl()+d,c.onerror=function(){a.onClose()};var f=document.getElementsByTagName("script")[0];f.parentNode.insertBefore(c,f),this.script=c,e&&setTimeout(function(){var a=document.createElement("iframe");document.body.appendChild(a),document.body.removeChild(a)},100)},d.prototype._=function(a){return this.onData(a),this.isOpen&&this.get(),this},d.prototype.ready=function(a,c){var d=this;return e?(b.util.load(function(){c.call(d)}),void 0):c.call(this)},d.check=function(){return"document"in c},d.xdomainCheck=function(){return!0},b.transports.push("jsonp-polling")}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this),"function"==typeof define&&define.amd&&define("socketio",[],function(){return io})}(),define("representative/iris-chat-representative",["socketio"],function(){});