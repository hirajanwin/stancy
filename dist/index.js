"use strict";function e(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var r=e(require("http")),t=e(require("express")),s=e(require("cors")),n=e(require("smarkt")),o=e(require("yaml")),i=e(require("json5")),c=e(require("node-fetch")),u=e(require("chokidar"));const a=process.browser?void 0:require("fs"),l=process.browser?void 0:require("path"),p=require("front-matter");function f(e){if(e.match(/\.([0-9a-z]+)(?:[?#]|$)/i))return e.match(/\.([0-9a-z]+)(?:[?#]|$)/i)[1]}function d(e,r){return function(e,r){if(!process.browser&&"json"===f(r)){let t=a.readFileSync(l.join(e,r),"utf8");return JSON.parse(t)}}(e,r)||function(e,r){if(!process.browser&&"md"===f(r)){var t=a.readFileSync(l.join(e,r),"utf8");const{attributes:s,body:n}=p(t);return{...s,content:n}}}(e,r)||function(e,r){if(!process.browser&&"txt"===f(r)){return n.parse(a.readFileSync(l.join(e,r),"utf8"))}}(e,r)||function(e,r){if(!process.browser&&("yml"===f(r)||"yaml"===f(r))){return o.parse(a.readFileSync(l.join(e,r),"utf8"))}}(e,r)||function(e,r){if(!process.browser&&"json5"===f(r)){let t=a.readFileSync(l.join(e,r),"utf8");return i.parse(t)}}(e,r)}const h=require("fs"),y=require("path"),m=require("pluralize"),j={is:{file:function(e){return!!/\..+$/.test(e)&&e.split(".")[0]},folder:function(e){return!/\..+$/.test(e)&&e},singular:function(e){return m.isSingular(e)},plural:function(e){return m.isPlural(e)},index:function(e){return/^index..+$/.test(e)},collection:function(e,r){let t=!1;return j.is.folder(r)&&(t=!0),t},item:function(e,r){let t=!1;return(j.is.file(r)||j.has.index(e,r))&&(t=!0),t},hidden:function(e){return/^_/.test(e)}},has:{index:function(e,r){let t=!1;return j.is.folder(r)&&h.readdirSync(y.join(e+r)).map(e=>{j.is.index(e)&&(t=!0)}),t},children:function(e,r){let t=!1;return j.is.folder(r)&&h.readdirSync(y.join(e+r)).map(()=>{t=!0}),t}}};function _(e){let r=e;return h.readdirSync(e).map((t,s)=>function e(r,t,s,n,o){if(j.is.hidden(t))return;let i={_index:s,_name:t.split(".")[0]},c=t.split(".")[0];"home"===t&&(c="");let u=r.replace(o.replace(y.sep,""),"");if(i.url=y.join(u+c),i._source=y.join(r+c),j.is.singular(t),j.is.folder(t)&&j.has.index(r,t),j.is.item(r,t)&&(i._collection=n,i._type=n||t.split(".")[0]),j.is.folder(t)){let s=y.join(r+t+"/"),n=t;h.readdirSync(s).map((r,t)=>{e(s,r,t,n,o)})}if(j.is.file(t)&&Object.assign(i,d(r,t)),j.is.folder(t)&&!j.is.item(r,t)){let e="";h.readdirSync(r).map(t=>{/index..+$/.test(t)&&(e=d(r,t))}),Object.assign(i,e)}if(j.is.folder(t)){let s=y.join(r+t+"/"),n=t;i[n]=[],h.readdirSync(y.join(r+t)).map((r,t)=>{j.is.index(r)||i[n].push(e(s,r,t,n,o))})}return i}(e,t,s,null,r))}const v=require("jsonata");async function S(e,{resource1:r,resource2:t,query:s}){var n,o=v(`**[_type="${r}"]`);if(r&&!t){if(s){let e=[];for(let[r,t]of Object.entries(s)){let s=`[${r}=${t}]`;e.push(s)}o=v(`**[_type="${r}"]${e.toString()}`)}return o.evaluate(e)}if(r&&t){if(s){let e=[];for(let[r,t]of Object.entries(s)){let s=`[${r}=${t}]`;e.push(s)}o=v(`**[_type="${r}"][_name="${t}"]${e.toString()}`)}return o.evaluate(e)}if((!r||!t)&&s){if(n=s,0===Object.keys(n).length&&n.constructor===Object)return e;let r=[];for(let[e,t]of Object.entries(s)){let s=`[${e}=${t}]`;r.push(s)}return(o=v("**"+r.toString())).evaluate(e)}}class b{constructor(e,r,t){t&&(this._source=t),this._options={production:e},r&&Object.assign(this._options,{preview:r})}_process(e,r){return e=JSON.parse(e),r.preprocess?("content"===r.preprocess[0]&&(Array.isArray(e)?e.map(e=>{e.content&&(e.content=r.preprocess[1](e.content))}):e.content&&(e.content=r.preprocess[1](e.content))),"item"===r.preprocess[0]&&(Array.isArray(e)?e.map(e=>r.preprocess[1](e)):e=r.preprocess[1](e)),"collection"===r.preprocess[0]&&Array.isArray(e)&&(e=r.preprocess[1](e)),e):e}get(e){var r=this._options;return(process.browser?window.fetch:c)(`${"development"===process.env.NODE_ENV&&r.preview&&"undefined"!==this._source&&!process.browser?r.preview:r.production}${e}`).then(e=>e.text()).then(e=>{try{return this._process(e,r)}catch(r){return e}})}preprocess(e,r){Object.assign(this._options,{preprocess:[e,r]})}}module.exports=function(e){return new class{constructor(e){"undefined"!==e&&(this._source=e)}server(e,n){if(!this._source)return console.log("[Stancy] No source provided");e=e||4e3,n=n||"/",this._local=`http://localhost:${e}${n}`;var o,i,c=this._source;function a(){(o=r.createServer(function(e){var r=t();return i=_(c),r.use(s({origin:"*",methods:"GET,HEAD,PUT,PATCH,POST,DELETE",preflightContinue:!1,optionsSuccessStatus:204})),r.set("json spaces",4),r.get(e,(e,r)=>{S(i,{resource1:null,resource2:null,query:e.query}).then(t=>{t?r.json(t):r.send("[Stancy] No value that matches query \n "+e.url)})}),r.get(e+":resource1",(e,r)=>{S(i,{resource1:e.params.resource1,resource2:null,query:e.query}).then(t=>{t?r.json(t):r.send("[Stancy] No value that matches query \n "+e.url)})}),r.get(e+":resource1/:resource2",(e,r)=>{S(i,{resource1:e.params.resource1,resource2:e.params.resource2,query:e.query}).then(t=>{t?r.json(t):r.send("[Stancy] No value that matches query \n "+e.url)})}),r}(n))).listen(e,()=>{console.log(`[Stancy] Content server available at http://localhost:${e}${n}`)})}a(),process.browser||u.watch(c,{ignored:/(^|[/\\])\../,persistent:!0}).on("change",()=>{o.close(),console.log("API server restarting"),a()})}client(e){return this._local||process.browser||this.server(),new b(e,this._local,this._source)}database(){return _(this._source)}}(e)};
