(()=>{var a=Object.defineProperty;var s=(r,t)=>a(r,"name",{value:t,configurable:!0});var i=class{static{s(this,"Clicksign")}#t="camera;geolocation;fullscreen;gyroscope;accelerometer;magnetometer";#e="width: 100%; height: 100%;";constructor(t){this.key=t,this.origin=`${window.location.protocol}://${window.location.host}`,this.listen={},this.endpoint="https://app.clicksign.com"}eventsFor(t){let e=t.name||t.data?.name||t.data||t;return this.listen[e]||[]}eventHandler(t){this.eventsFor(t).forEach(e=>e(t.data))}mount(t){return this.target=document.getElementById(t),this.iframe=document.createElement("iframe"),this.iframe.setAttribute("src",this.source),this.iframe.setAttribute("style",this.#e),this.iframe.setAttribute("allow",this.#t),window.addEventListener("message",e=>this.eventHandler(e)),this.target.appendChild(this.iframe)}on(t,e){return this.listen[t]||(this.listen[t]=[]),this.listen[t].push(e)}unmount(){return this.iframe&&(this.target.removeChild(this.iframe),this.target=null,this.iframe=null,window.removeEventListener("message",this.eventHandler)),!0}get source(){return`${this.endpoint}${this.path}${this.params}`}get params(){return`?embedded=true&origin=${this.origin}`}get path(){return`/notarial/widget/signatures/${this.key}/redirect`}};globalThis.Clicksign=i;})();
//# sourceMappingURL=embedded.js.map
