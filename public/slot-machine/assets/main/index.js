System.register("chunks:///_virtual/Column.ts",["cc"],(function(){var t;return{setters:[function(c){t=c.cclegacy}],execute:function(){t._RF.push({},"28c249tE7dG/rZAMo9zm0vK","Column",void 0),t._RF.pop()}}}));

System.register("chunks:///_virtual/main",["./Column.ts","./Reel.ts","./SlotMachine.ts"],(function(){return{setters:[null,null,null],execute:function(){}}}));

System.register("chunks:///_virtual/Reel.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(e){var t,i,r,n,o,s,a,l,u,p;return{setters:[function(e){t=e.applyDecoratedDescriptor,i=e.inheritsLoose,r=e.initializerDefineProperty,n=e.assertThisInitialized},function(e){o=e.cclegacy,s=e._decorator,a=e.Sprite,l=e.tween,u=e.easing,p=e.Component}],execute:function(){var c,b,m,h,y,g,d,f,S,_,v,I,P;o._RF.push({},"3b794PkBh5OyIkSTyZxSnWM","Reel",void 0);var w=s.ccclass,z=s.property;e("Reel",(c=w("Reel"),b=z([a]),m=z(Number),h=z(Number),y=z(Boolean),g=z([String]),c((S=t((f=function(e){function t(){for(var t,i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return t=e.call.apply(e,[this].concat(o))||this,r(t,"symbols",S,n(t)),t.degree=0,t._degreePerSymbol=0,t._radius=196,r(t,"targetSymbolId",_,n(t)),r(t,"spinTime",v,n(t)),r(t,"spinning",I,n(t)),r(t,"symbolNames",P,n(t)),t._currentSpinTime=0,t._speed=0,t._maxSpeed=720,t._brake=180,t._targetSymbolDegree=void 0,t}i(t,e);var o=t.prototype;return o.start=function(){this.symbols=this.node.getComponentsInChildren(a),this._degreePerSymbol=360/this.symbols.length,this._radius=196,this.spin(0)},o.spinToSymbolInTime=function(e,t){var i=this;this.targetSymbolId=this.symbolNames.indexOf(e),this.degree%=360;var r=this.targetSymbolId*this._degreePerSymbol+3600;l(this).to(t,{degree:r},{progress:function(e,t,r,n){var o=e+(t-e)*u.quartInOut(n);return i.spin(o),o}}).start()},o.spin=function(e){this.degree=e;for(var t=0;t<this.symbols.length;t++){var i=this.symbols[t],r=360-t*this._degreePerSymbol+e;r%=360;var n=-Math.sin(r*Math.PI/180)*this._radius;i.node.setPosition(i.node.position.x,n);var o=Math.cos(r*Math.PI/180);i.node.setScale(1,o),i.node.active=o>0}},o.stop=function(e){this.spinning=!1,this.spin(e*this._degreePerSymbol)},o.update=function(e){},t}(p)).prototype,"symbols",[b],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),_=t(f.prototype,"targetSymbolId",[m],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 3}}),v=t(f.prototype,"spinTime",[h],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 3}}),I=t(f.prototype,"spinning",[y],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!0}}),P=t(f.prototype,"symbolNames",[g],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),d=f))||d));o._RF.pop()}}}));

System.register("chunks:///_virtual/SlotMachine.ts",["./rollupPluginModLoBabelHelpers.js","cc","./Reel.ts"],(function(e){var t,l,n,o,i,r,a,c,u,s;return{setters:[function(e){t=e.applyDecoratedDescriptor,l=e.inheritsLoose,n=e.initializerDefineProperty,o=e.assertThisInitialized},function(e){i=e.cclegacy,r=e._decorator,a=e.Button,c=e.Label,u=e.Component},function(e){s=e.Reel}],execute:function(){var p,h,b,f,y,d,g,v,R;i._RF.push({},"8876aR1pQ5KTK7/Y1MQHpvt","SlotMachine",void 0);var m=r.ccclass,w=r.property;e("SlotMachine",(p=m("SlotMachine"),h=w(a),b=w(c),f=w(c),p((g=t((d=function(e){function t(){for(var t,l=arguments.length,i=new Array(l),r=0;r<l;r++)i[r]=arguments[r];return(t=e.call.apply(e,[this].concat(i))||this).AllReels=void 0,n(t,"ButtonRoll",g,o(t)),n(t,"LabelJackpot",v,o(t)),n(t,"LabelEnergy",R,o(t)),t}l(t,e);var i=t.prototype;return i.onLoad=function(){var e;this.AllReels=this.getComponentsInChildren(s),null!=(e=window.SlotMachine)&&e.onload&&window.SlotMachine.onload(this)},i.roll=function(e){for(var t=0;t<e.length;t++)this.AllReels[t].spinToSymbolInTime(e[t],2+.5*t)},t}(u)).prototype,"ButtonRoll",[h],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),v=t(d.prototype,"LabelJackpot",[b],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),R=t(d.prototype,"LabelEnergy",[f],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),y=d))||y));i._RF.pop()}}}));

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});