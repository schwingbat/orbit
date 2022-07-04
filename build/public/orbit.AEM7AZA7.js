(() => {
  // node_modules/@woofjs/client/dist/woof.client.m.js
  var Yr = Object.create;
  var ee = Object.defineProperty;
  var Qr = Object.defineProperties;
  var Zr = Object.getOwnPropertyDescriptor;
  var tn = Object.getOwnPropertyDescriptors;
  var en = Object.getOwnPropertyNames;
  var Ye = Object.getOwnPropertySymbols;
  var rn = Object.getPrototypeOf;
  var Qe = Object.prototype.hasOwnProperty;
  var nn = Object.prototype.propertyIsEnumerable;
  var be = (e, t, r) => t in e ? ee(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r;
  var vt = (e, t) => {
    for (var r in t || (t = {}))
      Qe.call(t, r) && be(e, r, t[r]);
    if (Ye)
      for (var r of Ye(t))
        nn.call(t, r) && be(e, r, t[r]);
    return e;
  };
  var kt = (e, t) => Qr(e, tn(t));
  var on = (e) => ee(e, "__esModule", { value: true });
  var Nt = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
  var an = (e, t, r, n) => {
    if (t && typeof t == "object" || typeof t == "function")
      for (let i of en(t))
        !Qe.call(e, i) && (r || i !== "default") && ee(e, i, { get: () => t[i], enumerable: !(n = Zr(t, i)) || n.enumerable });
    return e;
  };
  var Ze = (e, t) => an(on(ee(e != null ? Yr(rn(e)) : {}, "default", !t && e && e.__esModule ? { get: () => e.default, enumerable: true } : { value: e, enumerable: true })), e);
  var Pt = (e, t, r) => (be(e, typeof t != "symbol" ? t + "" : t, r), r);
  var xe = (e, t, r) => {
    if (!t.has(e))
      throw TypeError("Cannot " + r);
  };
  var k = (e, t, r) => (xe(e, t, "read from private field"), r ? r.call(e) : t.get(e));
  var U = (e, t, r) => {
    if (t.has(e))
      throw TypeError("Cannot add the same private member more than once");
    t instanceof WeakSet ? t.add(e) : t.set(e, r);
  };
  var W = (e, t, r, n) => (xe(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r);
  var re = (e, t, r) => (xe(e, t, "access private method"), r);
  var tr = Nt((ht) => {
    "use strict";
    var sn = ht && ht.__extends || function() {
      var e = function(t, r) {
        return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, i) {
          n.__proto__ = i;
        } || function(n, i) {
          for (var o in i)
            Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]);
        }, e(t, r);
      };
      return function(t, r) {
        if (typeof r != "function" && r !== null)
          throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
        e(t, r);
        function n() {
          this.constructor = t;
        }
        t.prototype = r === null ? Object.create(r) : (n.prototype = r.prototype, new n());
      };
    }(), x = ht && ht.__classPrivateFieldSet || function(e, t, r) {
      if (!t.has(e))
        throw new TypeError("attempted to set private field on non-instance");
      return t.set(e, r), r;
    }, m = ht && ht.__classPrivateFieldGet || function(e, t) {
      if (!t.has(e))
        throw new TypeError("attempted to get private field on non-instance");
      return t.get(e);
    }, wt, At, Q, Dt, Gt, nt, it, ot, at, st, ct, ut, ft, $t, Tt, bt, ie, xt, qt, oe, ae, se;
    ht.__esModule = true;
    ht.default = void 0;
    var cn = function(e) {
      var t = 131, r = 137, n = 0;
      e += "x";
      for (var i = Math.floor(9007199254740991 / r), o = 0; o < e.length; o++)
        n > i && (n = Math.floor(n / r)), n = n * t + e.charCodeAt(o);
      return n;
    }, y = "0123456789abcdef".split(""), un = [-2147483648, 8388608, 32768, 128], Y = [24, 16, 8, 0], ne = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298], R = [], Se = function() {
      function e(t, r) {
        t === void 0 && (t = false), r === void 0 && (r = false), wt.set(this, void 0), At.set(this, void 0), Q.set(this, void 0), Dt.set(this, void 0), Gt.set(this, void 0), nt.set(this, void 0), it.set(this, void 0), ot.set(this, void 0), at.set(this, void 0), st.set(this, void 0), ct.set(this, void 0), ut.set(this, void 0), ft.set(this, void 0), $t.set(this, void 0), Tt.set(this, void 0), bt.set(this, void 0), ie.set(this, 0), xt.set(this, void 0), this.init(t, r);
      }
      return e.prototype.init = function(t, r) {
        r ? (R[0] = R[16] = R[1] = R[2] = R[3] = R[4] = R[5] = R[6] = R[7] = R[8] = R[9] = R[10] = R[11] = R[12] = R[13] = R[14] = R[15] = 0, x(this, At, R)) : x(this, At, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), t ? (x(this, nt, 3238371032), x(this, it, 914150663), x(this, ot, 812702999), x(this, at, 4144912697), x(this, st, 4290775857), x(this, ct, 1750603025), x(this, ut, 1694076839), x(this, ft, 3204075428)) : (x(this, nt, 1779033703), x(this, it, 3144134277), x(this, ot, 1013904242), x(this, at, 2773480762), x(this, st, 1359893119), x(this, ct, 2600822924), x(this, ut, 528734635), x(this, ft, 1541459225)), x(this, wt, x(this, xt, x(this, Q, x(this, Tt, 0)))), x(this, Dt, x(this, $t, false)), x(this, Gt, true), x(this, bt, t);
      }, e.prototype.update = function(t) {
        if (m(this, Dt))
          return this;
        var r;
        t instanceof ArrayBuffer ? r = new Uint8Array(t) : r = t;
        for (var n = 0, i = r.length, o = m(this, At); n < i; ) {
          var a = void 0;
          if (m(this, $t) && (x(this, $t, false), o[0] = m(this, wt), o[16] = o[1] = o[2] = o[3] = o[4] = o[5] = o[6] = o[7] = o[8] = o[9] = o[10] = o[11] = o[12] = o[13] = o[14] = o[15] = 0), typeof r != "string")
            for (a = m(this, xt); n < i && a < 64; ++n)
              o[a >> 2] |= r[n] << Y[a++ & 3];
          else
            for (a = m(this, xt); n < i && a < 64; ++n) {
              var s = r.charCodeAt(n);
              s < 128 ? o[a >> 2] |= s << Y[a++ & 3] : s < 2048 ? (o[a >> 2] |= (192 | s >> 6) << Y[a++ & 3], o[a >> 2] |= (128 | s & 63) << Y[a++ & 3]) : s < 55296 || s >= 57344 ? (o[a >> 2] |= (224 | s >> 12) << Y[a++ & 3], o[a >> 2] |= (128 | s >> 6 & 63) << Y[a++ & 3], o[a >> 2] |= (128 | s & 63) << Y[a++ & 3]) : (s = 65536 + ((s & 1023) << 10 | r.charCodeAt(++n) & 1023), o[a >> 2] |= (240 | s >> 18) << Y[a++ & 3], o[a >> 2] |= (128 | s >> 12 & 63) << Y[a++ & 3], o[a >> 2] |= (128 | s >> 6 & 63) << Y[a++ & 3], o[a >> 2] |= (128 | s & 63) << Y[a++ & 3]);
            }
          x(this, ie, a), x(this, Q, m(this, Q) + (a - m(this, xt))), a >= 64 ? (x(this, wt, o[16]), x(this, xt, a - 64), this.hash(), x(this, $t, true)) : x(this, xt, a);
        }
        return m(this, Q) > 4294967295 && (x(this, Tt, m(this, Tt) + (m(this, Q) / 4294967296 << 0)), x(this, Q, m(this, Q) % 4294967296)), this;
      }, e.prototype.finalize = function() {
        if (!m(this, Dt)) {
          x(this, Dt, true);
          var t = m(this, At), r = m(this, ie);
          t[16] = m(this, wt), t[r >> 2] |= un[r & 3], x(this, wt, t[16]), r >= 56 && (m(this, $t) || this.hash(), t[0] = m(this, wt), t[16] = t[1] = t[2] = t[3] = t[4] = t[5] = t[6] = t[7] = t[8] = t[9] = t[10] = t[11] = t[12] = t[13] = t[14] = t[15] = 0), t[14] = m(this, Tt) << 3 | m(this, Q) >>> 29, t[15] = m(this, Q) << 3, this.hash();
        }
      }, e.prototype.hash = function() {
        for (var t = m(this, nt), r = m(this, it), n = m(this, ot), i = m(this, at), o = m(this, st), a = m(this, ct), s = m(this, ut), c = m(this, ft), h = m(this, At), f, p, l, u, g, w, $, S, j, v, P = 16; P < 64; ++P)
          u = h[P - 15], f = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ u >>> 3, u = h[P - 2], p = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ u >>> 10, h[P] = h[P - 16] + f + h[P - 7] + p << 0;
        v = r & n;
        for (var E = 0; E < 64; E += 4)
          m(this, Gt) ? (m(this, bt) ? ($ = 300032, u = h[0] - 1413257819, c = u - 150054599 << 0, i = u + 24177077 << 0) : ($ = 704751109, u = h[0] - 210244248, c = u - 1521486534 << 0, i = u + 143694565 << 0), x(this, Gt, false)) : (f = (t >>> 2 | t << 30) ^ (t >>> 13 | t << 19) ^ (t >>> 22 | t << 10), p = (o >>> 6 | o << 26) ^ (o >>> 11 | o << 21) ^ (o >>> 25 | o << 7), $ = t & r, l = $ ^ t & n ^ v, w = o & a ^ ~o & s, u = c + p + w + ne[E] + h[E], g = f + l, c = i + u << 0, i = u + g << 0), f = (i >>> 2 | i << 30) ^ (i >>> 13 | i << 19) ^ (i >>> 22 | i << 10), p = (c >>> 6 | c << 26) ^ (c >>> 11 | c << 21) ^ (c >>> 25 | c << 7), S = i & t, l = S ^ i & r ^ $, w = c & o ^ ~c & a, u = s + p + w + ne[E + 1] + h[E + 1], g = f + l, s = n + u << 0, n = u + g << 0, f = (n >>> 2 | n << 30) ^ (n >>> 13 | n << 19) ^ (n >>> 22 | n << 10), p = (s >>> 6 | s << 26) ^ (s >>> 11 | s << 21) ^ (s >>> 25 | s << 7), j = n & i, l = j ^ n & t ^ S, w = s & c ^ ~s & o, u = a + p + w + ne[E + 2] + h[E + 2], g = f + l, a = r + u << 0, r = u + g << 0, f = (r >>> 2 | r << 30) ^ (r >>> 13 | r << 19) ^ (r >>> 22 | r << 10), p = (a >>> 6 | a << 26) ^ (a >>> 11 | a << 21) ^ (a >>> 25 | a << 7), v = r & n, l = v ^ r & i ^ j, w = a & s ^ ~a & c, u = o + p + w + ne[E + 3] + h[E + 3], g = f + l, o = t + u << 0, t = u + g << 0;
        x(this, nt, m(this, nt) + t << 0), x(this, it, m(this, it) + r << 0), x(this, ot, m(this, ot) + n << 0), x(this, at, m(this, at) + i << 0), x(this, st, m(this, st) + o << 0), x(this, ct, m(this, ct) + a << 0), x(this, ut, m(this, ut) + s << 0), x(this, ft, m(this, ft) + c << 0);
      }, e.prototype.hex = function() {
        this.finalize();
        var t = m(this, nt), r = m(this, it), n = m(this, ot), i = m(this, at), o = m(this, st), a = m(this, ct), s = m(this, ut), c = m(this, ft), h = y[t >> 28 & 15] + y[t >> 24 & 15] + y[t >> 20 & 15] + y[t >> 16 & 15] + y[t >> 12 & 15] + y[t >> 8 & 15] + y[t >> 4 & 15] + y[t & 15] + y[r >> 28 & 15] + y[r >> 24 & 15] + y[r >> 20 & 15] + y[r >> 16 & 15] + y[r >> 12 & 15] + y[r >> 8 & 15] + y[r >> 4 & 15] + y[r & 15] + y[n >> 28 & 15] + y[n >> 24 & 15] + y[n >> 20 & 15] + y[n >> 16 & 15] + y[n >> 12 & 15] + y[n >> 8 & 15] + y[n >> 4 & 15] + y[n & 15] + y[i >> 28 & 15] + y[i >> 24 & 15] + y[i >> 20 & 15] + y[i >> 16 & 15] + y[i >> 12 & 15] + y[i >> 8 & 15] + y[i >> 4 & 15] + y[i & 15] + y[o >> 28 & 15] + y[o >> 24 & 15] + y[o >> 20 & 15] + y[o >> 16 & 15] + y[o >> 12 & 15] + y[o >> 8 & 15] + y[o >> 4 & 15] + y[o & 15] + y[a >> 28 & 15] + y[a >> 24 & 15] + y[a >> 20 & 15] + y[a >> 16 & 15] + y[a >> 12 & 15] + y[a >> 8 & 15] + y[a >> 4 & 15] + y[a & 15] + y[s >> 28 & 15] + y[s >> 24 & 15] + y[s >> 20 & 15] + y[s >> 16 & 15] + y[s >> 12 & 15] + y[s >> 8 & 15] + y[s >> 4 & 15] + y[s & 15];
        return m(this, bt) || (h += y[c >> 28 & 15] + y[c >> 24 & 15] + y[c >> 20 & 15] + y[c >> 16 & 15] + y[c >> 12 & 15] + y[c >> 8 & 15] + y[c >> 4 & 15] + y[c & 15]), h;
      }, e.prototype.toString = function() {
        return this.hex();
      }, e.prototype.digest = function() {
        this.finalize();
        var t = m(this, nt), r = m(this, it), n = m(this, ot), i = m(this, at), o = m(this, st), a = m(this, ct), s = m(this, ut), c = m(this, ft), h = [t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, t & 255, r >> 24 & 255, r >> 16 & 255, r >> 8 & 255, r & 255, n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, n & 255, i >> 24 & 255, i >> 16 & 255, i >> 8 & 255, i & 255, o >> 24 & 255, o >> 16 & 255, o >> 8 & 255, o & 255, a >> 24 & 255, a >> 16 & 255, a >> 8 & 255, a & 255, s >> 24 & 255, s >> 16 & 255, s >> 8 & 255, s & 255];
        return m(this, bt) || h.push(c >> 24 & 255, c >> 16 & 255, c >> 8 & 255, c & 255), h;
      }, e.prototype.array = function() {
        return this.digest();
      }, e.prototype.arrayBuffer = function() {
        this.finalize();
        var t = new ArrayBuffer(m(this, bt) ? 28 : 32), r = new DataView(t);
        return r.setUint32(0, m(this, nt)), r.setUint32(4, m(this, it)), r.setUint32(8, m(this, ot)), r.setUint32(12, m(this, at)), r.setUint32(16, m(this, st)), r.setUint32(20, m(this, ct)), r.setUint32(24, m(this, ut)), m(this, bt) || r.setUint32(28, m(this, ft)), t;
      }, e;
    }();
    wt = /* @__PURE__ */ new WeakMap(), At = /* @__PURE__ */ new WeakMap(), Q = /* @__PURE__ */ new WeakMap(), Dt = /* @__PURE__ */ new WeakMap(), Gt = /* @__PURE__ */ new WeakMap(), nt = /* @__PURE__ */ new WeakMap(), it = /* @__PURE__ */ new WeakMap(), ot = /* @__PURE__ */ new WeakMap(), at = /* @__PURE__ */ new WeakMap(), st = /* @__PURE__ */ new WeakMap(), ct = /* @__PURE__ */ new WeakMap(), ut = /* @__PURE__ */ new WeakMap(), ft = /* @__PURE__ */ new WeakMap(), $t = /* @__PURE__ */ new WeakMap(), Tt = /* @__PURE__ */ new WeakMap(), bt = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakMap(), xt = /* @__PURE__ */ new WeakMap();
    var Qn = function(e) {
      sn(t, e);
      function t(r, n, i) {
        n === void 0 && (n = false), i === void 0 && (i = false);
        var o = e.call(this, n, i) || this;
        qt.set(o, void 0), oe.set(o, void 0), ae.set(o, void 0), se.set(o, void 0);
        var a;
        if (typeof r == "string") {
          for (var s = [], c = r.length, h = 0, f = 0; f < c; ++f) {
            var p = r.charCodeAt(f);
            p < 128 ? s[h++] = p : p < 2048 ? (s[h++] = 192 | p >> 6, s[h++] = 128 | p & 63) : p < 55296 || p >= 57344 ? (s[h++] = 224 | p >> 12, s[h++] = 128 | p >> 6 & 63, s[h++] = 128 | p & 63) : (p = 65536 + ((p & 1023) << 10 | r.charCodeAt(++f) & 1023), s[h++] = 240 | p >> 18, s[h++] = 128 | p >> 12 & 63, s[h++] = 128 | p >> 6 & 63, s[h++] = 128 | p & 63);
          }
          a = s;
        } else
          r instanceof ArrayBuffer ? a = new Uint8Array(r) : a = r;
        a.length > 64 && (a = new Se(n, true).update(a).array());
        for (var l = [], u = [], f = 0; f < 64; ++f) {
          var g = a[f] || 0;
          l[f] = 92 ^ g, u[f] = 54 ^ g;
        }
        return o.update(u), x(o, ae, l), x(o, qt, true), x(o, oe, n), x(o, se, i), o;
      }
      return t.prototype.finalize = function() {
        if (e.prototype.finalize.call(this), m(this, qt)) {
          x(this, qt, false);
          var r = this.array();
          e.prototype.init.call(this, m(this, oe), m(this, se)), this.update(m(this, ae)), this.update(r), e.prototype.finalize.call(this);
        }
      }, t;
    }(Se);
    qt = /* @__PURE__ */ new WeakMap(), oe = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), se = /* @__PURE__ */ new WeakMap();
    function fn(e) {
      var t = new Se();
      return t.update(e), parseInt(t.hex().substring(0, 8), 16);
    }
    var hn = function(e) {
      var t = "#";
      return e.forEach(function(r) {
        r < 16 && (t += 0), t += r.toString(16);
      }), t;
    }, ln = function(e, t, r) {
      e /= 360;
      var n = r < 0.5 ? r * (1 + t) : r + t - r * t, i = 2 * r - n;
      return [e + 1 / 3, e, e - 1 / 3].map(function(o) {
        return o < 0 && o++, o > 1 && o--, o < 1 / 6 ? o = i + (n - i) * 6 * o : o < 0.5 ? o = n : o < 2 / 3 ? o = i + (n - i) * 6 * (2 / 3 - o) : o = i, Math.round(o * 255);
      });
    }, pn = function() {
      function e(t) {
        t === void 0 && (t = {});
        var r = [t.lightness, t.saturation].map(function(o) {
          return o = o !== void 0 ? o : [0.35, 0.5, 0.65], Array.isArray(o) ? o.concat() : [o];
        }), n = r[0], i = r[1];
        this.L = n, this.S = i, typeof t.hue == "number" && (t.hue = { min: t.hue, max: t.hue }), typeof t.hue == "object" && !Array.isArray(t.hue) && (t.hue = [t.hue]), typeof t.hue == "undefined" && (t.hue = []), this.hueRanges = t.hue.map(function(o) {
          return { min: typeof o.min == "undefined" ? 0 : o.min, max: typeof o.max == "undefined" ? 360 : o.max };
        }), this.hash = fn, typeof t.hash == "function" && (this.hash = t.hash), t.hash === "bkdr" && (this.hash = cn);
      }
      return e.prototype.hsl = function(t) {
        var r, n, i, o = this.hash(t), a = 727;
        if (this.hueRanges.length) {
          var s = this.hueRanges[o % this.hueRanges.length];
          r = o / this.hueRanges.length % a * (s.max - s.min) / a + s.min;
        } else
          r = o % 359;
        return o = Math.ceil(o / 360), n = this.S[o % this.S.length], o = Math.ceil(o / this.S.length), i = this.L[o % this.L.length], [r, n, i];
      }, e.prototype.rgb = function(t) {
        var r = this.hsl(t);
        return ln.apply(this, r);
      }, e.prototype.hex = function(t) {
        var r = this.rgb(t);
        return hn(r);
      }, e;
    }();
    ht.default = pn;
  });
  var br = Nt((ji, wr) => {
    "use strict";
    wr.exports = (e) => encodeURIComponent(e).replace(/[!'()*]/g, (t) => `%${t.charCodeAt(0).toString(16).toUpperCase()}`);
  });
  var kr = Nt((Fi, Or) => {
    "use strict";
    var Er = "%[a-f0-9]{2}", xr = new RegExp(Er, "gi"), Sr = new RegExp("(" + Er + ")+", "gi");
    function Be(e, t) {
      try {
        return decodeURIComponent(e.join(""));
      } catch (i) {
      }
      if (e.length === 1)
        return e;
      t = t || 1;
      var r = e.slice(0, t), n = e.slice(t);
      return Array.prototype.concat.call([], Be(r), Be(n));
    }
    function $n(e) {
      try {
        return decodeURIComponent(e);
      } catch (n) {
        for (var t = e.match(xr), r = 1; r < t.length; r++)
          e = Be(t, r).join(""), t = e.match(xr);
        return e;
      }
    }
    function _n(e) {
      for (var t = { "%FE%FF": "\uFFFD\uFFFD", "%FF%FE": "\uFFFD\uFFFD" }, r = Sr.exec(e); r; ) {
        try {
          t[r[0]] = decodeURIComponent(r[0]);
        } catch (s) {
          var n = $n(r[0]);
          n !== r[0] && (t[r[0]] = n);
        }
        r = Sr.exec(e);
      }
      t["%C2"] = "\uFFFD";
      for (var i = Object.keys(t), o = 0; o < i.length; o++) {
        var a = i[o];
        e = e.replace(new RegExp(a, "g"), t[a]);
      }
      return e;
    }
    Or.exports = function(e) {
      if (typeof e != "string")
        throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof e + "`");
      try {
        return e = e.replace(/\+/g, " "), decodeURIComponent(e);
      } catch (t) {
        return _n(e);
      }
    };
  });
  var Ar = Nt((Ni, Pr) => {
    "use strict";
    Pr.exports = (e, t) => {
      if (!(typeof e == "string" && typeof t == "string"))
        throw new TypeError("Expected the arguments to be of type `string`");
      if (t === "")
        return [e];
      let r = e.indexOf(t);
      return r === -1 ? [e] : [e.slice(0, r), e.slice(r + t.length)];
    };
  });
  var _r = Nt((Di, $r) => {
    "use strict";
    $r.exports = function(e, t) {
      for (var r = {}, n = Object.keys(e), i = Array.isArray(t), o = 0; o < n.length; o++) {
        var a = n[o], s = e[a];
        (i ? t.indexOf(a) !== -1 : t(a, s, e)) && (r[a] = s);
      }
      return r;
    };
  });
  var Mr = Nt((H) => {
    "use strict";
    var Cn = br(), jn = kr(), jr = Ar(), Fn = _r(), Nn = (e) => e == null, Ge = Symbol("encodeFragmentIdentifier");
    function Dn(e) {
      switch (e.arrayFormat) {
        case "index":
          return (t) => (r, n) => {
            let i = r.length;
            return n === void 0 || e.skipNull && n === null || e.skipEmptyString && n === "" ? r : n === null ? [...r, [D(t, e), "[", i, "]"].join("")] : [...r, [D(t, e), "[", D(i, e), "]=", D(n, e)].join("")];
          };
        case "bracket":
          return (t) => (r, n) => n === void 0 || e.skipNull && n === null || e.skipEmptyString && n === "" ? r : n === null ? [...r, [D(t, e), "[]"].join("")] : [...r, [D(t, e), "[]=", D(n, e)].join("")];
        case "colon-list-separator":
          return (t) => (r, n) => n === void 0 || e.skipNull && n === null || e.skipEmptyString && n === "" ? r : n === null ? [...r, [D(t, e), ":list="].join("")] : [...r, [D(t, e), ":list=", D(n, e)].join("")];
        case "comma":
        case "separator":
        case "bracket-separator": {
          let t = e.arrayFormat === "bracket-separator" ? "[]=" : "=";
          return (r) => (n, i) => i === void 0 || e.skipNull && i === null || e.skipEmptyString && i === "" ? n : (i = i === null ? "" : i, n.length === 0 ? [[D(r, e), t, D(i, e)].join("")] : [[n, D(i, e)].join(e.arrayFormatSeparator)]);
        }
        default:
          return (t) => (r, n) => n === void 0 || e.skipNull && n === null || e.skipEmptyString && n === "" ? r : n === null ? [...r, D(t, e)] : [...r, [D(t, e), "=", D(n, e)].join("")];
      }
    }
    function Tn(e) {
      let t;
      switch (e.arrayFormat) {
        case "index":
          return (r, n, i) => {
            if (t = /\[(\d*)\]$/.exec(r), r = r.replace(/\[\d*\]$/, ""), !t) {
              i[r] = n;
              return;
            }
            i[r] === void 0 && (i[r] = {}), i[r][t[1]] = n;
          };
        case "bracket":
          return (r, n, i) => {
            if (t = /(\[\])$/.exec(r), r = r.replace(/\[\]$/, ""), !t) {
              i[r] = n;
              return;
            }
            if (i[r] === void 0) {
              i[r] = [n];
              return;
            }
            i[r] = [].concat(i[r], n);
          };
        case "colon-list-separator":
          return (r, n, i) => {
            if (t = /(:list)$/.exec(r), r = r.replace(/:list$/, ""), !t) {
              i[r] = n;
              return;
            }
            if (i[r] === void 0) {
              i[r] = [n];
              return;
            }
            i[r] = [].concat(i[r], n);
          };
        case "comma":
        case "separator":
          return (r, n, i) => {
            let o = typeof n == "string" && n.includes(e.arrayFormatSeparator), a = typeof n == "string" && !o && gt(n, e).includes(e.arrayFormatSeparator);
            n = a ? gt(n, e) : n;
            let s = o || a ? n.split(e.arrayFormatSeparator).map((c) => gt(c, e)) : n === null ? n : gt(n, e);
            i[r] = s;
          };
        case "bracket-separator":
          return (r, n, i) => {
            let o = /(\[\])$/.test(r);
            if (r = r.replace(/\[\]$/, ""), !o) {
              i[r] = n && gt(n, e);
              return;
            }
            let a = n === null ? [] : n.split(e.arrayFormatSeparator).map((s) => gt(s, e));
            if (i[r] === void 0) {
              i[r] = a;
              return;
            }
            i[r] = [].concat(i[r], a);
          };
        default:
          return (r, n, i) => {
            if (i[r] === void 0) {
              i[r] = n;
              return;
            }
            i[r] = [].concat(i[r], n);
          };
      }
    }
    function Fr(e) {
      if (typeof e != "string" || e.length !== 1)
        throw new TypeError("arrayFormatSeparator must be single character string");
    }
    function D(e, t) {
      return t.encode ? t.strict ? Cn(e) : encodeURIComponent(e) : e;
    }
    function gt(e, t) {
      return t.decode ? jn(e) : e;
    }
    function Nr(e) {
      return Array.isArray(e) ? e.sort() : typeof e == "object" ? Nr(Object.keys(e)).sort((t, r) => Number(t) - Number(r)).map((t) => e[t]) : e;
    }
    function Dr(e) {
      let t = e.indexOf("#");
      return t !== -1 && (e = e.slice(0, t)), e;
    }
    function Rn(e) {
      let t = "", r = e.indexOf("#");
      return r !== -1 && (t = e.slice(r)), t;
    }
    function Tr(e) {
      e = Dr(e);
      let t = e.indexOf("?");
      return t === -1 ? "" : e.slice(t + 1);
    }
    function Cr(e, t) {
      return t.parseNumbers && !Number.isNaN(Number(e)) && typeof e == "string" && e.trim() !== "" ? e = Number(e) : t.parseBooleans && e !== null && (e.toLowerCase() === "true" || e.toLowerCase() === "false") && (e = e.toLowerCase() === "true"), e;
    }
    function Rr(e, t) {
      t = Object.assign({ decode: true, sort: true, arrayFormat: "none", arrayFormatSeparator: ",", parseNumbers: false, parseBooleans: false }, t), Fr(t.arrayFormatSeparator);
      let r = Tn(t), n = /* @__PURE__ */ Object.create(null);
      if (typeof e != "string" || (e = e.trim().replace(/^[?#&]/, ""), !e))
        return n;
      for (let i of e.split("&")) {
        if (i === "")
          continue;
        let [o, a] = jr(t.decode ? i.replace(/\+/g, " ") : i, "=");
        a = a === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(t.arrayFormat) ? a : gt(a, t), r(gt(o, t), a, n);
      }
      for (let i of Object.keys(n)) {
        let o = n[i];
        if (typeof o == "object" && o !== null)
          for (let a of Object.keys(o))
            o[a] = Cr(o[a], t);
        else
          n[i] = Cr(o, t);
      }
      return t.sort === false ? n : (t.sort === true ? Object.keys(n).sort() : Object.keys(n).sort(t.sort)).reduce((i, o) => {
        let a = n[o];
        return Boolean(a) && typeof a == "object" && !Array.isArray(a) ? i[o] = Nr(a) : i[o] = a, i;
      }, /* @__PURE__ */ Object.create(null));
    }
    H.extract = Tr;
    H.parse = Rr;
    H.stringify = (e, t) => {
      if (!e)
        return "";
      t = Object.assign({ encode: true, strict: true, arrayFormat: "none", arrayFormatSeparator: "," }, t), Fr(t.arrayFormatSeparator);
      let r = (a) => t.skipNull && Nn(e[a]) || t.skipEmptyString && e[a] === "", n = Dn(t), i = {};
      for (let a of Object.keys(e))
        r(a) || (i[a] = e[a]);
      let o = Object.keys(i);
      return t.sort !== false && o.sort(t.sort), o.map((a) => {
        let s = e[a];
        return s === void 0 ? "" : s === null ? D(a, t) : Array.isArray(s) ? s.length === 0 && t.arrayFormat === "bracket-separator" ? D(a, t) + "[]" : s.reduce(n(a), []).join("&") : D(a, t) + "=" + D(s, t);
      }).filter((a) => a.length > 0).join("&");
    };
    H.parseUrl = (e, t) => {
      t = Object.assign({ decode: true }, t);
      let [r, n] = jr(e, "#");
      return Object.assign({ url: r.split("?")[0] || "", query: Rr(Tr(e), t) }, t && t.parseFragmentIdentifier && n ? { fragmentIdentifier: gt(n, t) } : {});
    };
    H.stringifyUrl = (e, t) => {
      t = Object.assign({ encode: true, strict: true, [Ge]: true }, t);
      let r = Dr(e.url).split("?")[0] || "", n = H.extract(e.url), i = H.parse(n, { sort: false }), o = Object.assign(i, e.query), a = H.stringify(o, t);
      a && (a = `?${a}`);
      let s = Rn(e.url);
      return e.fragmentIdentifier && (s = `#${t[Ge] ? D(e.fragmentIdentifier, t) : e.fragmentIdentifier}`), `${r}${a}${s}`;
    };
    H.pick = (e, t, r) => {
      r = Object.assign({ parseFragmentIdentifier: true, [Ge]: false }, r);
      let { url: n, query: i, fragmentIdentifier: o } = H.parseUrl(e, r);
      return H.stringifyUrl({ url: n, query: Fn(i, t), fragmentIdentifier: o }, r);
    };
    H.exclude = (e, t, r) => {
      let n = Array.isArray(t) ? (i) => !t.includes(i) : (i, o) => !t(i, o);
      return H.pick(e, n, r);
    };
  });
  var pr = Ze(tr());
  function Z(e) {
    for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
      r[n - 1] = arguments[n];
    if (false)
      var i, o;
    throw Error("[Immer] minified error nr: " + e + (r.length ? " " + r.map(function(a) {
      return "'" + a + "'";
    }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
  }
  function Rt(e) {
    return !!e && !!e[B];
  }
  function Ct(e) {
    return !!e && (function(t) {
      if (!t || typeof t != "object")
        return false;
      var r = Object.getPrototypeOf(t);
      if (r === null)
        return true;
      var n = Object.hasOwnProperty.call(r, "constructor") && r.constructor;
      return n === Object || typeof n == "function" && Function.toString.call(n) === xn;
    }(e) || Array.isArray(e) || !!e[cr] || !!e.constructor[cr] || Fe(e) || Ne(e));
  }
  function Kt(e, t, r) {
    r === void 0 && (r = false), Mt(e) === 0 ? (r ? Object.keys : We)(e).forEach(function(n) {
      r && typeof n == "symbol" || t(n, e[n], e);
    }) : e.forEach(function(n, i) {
      return t(i, n, e);
    });
  }
  function Mt(e) {
    var t = e[B];
    return t ? t.i > 3 ? t.i - 4 : t.i : Array.isArray(e) ? 1 : Fe(e) ? 2 : Ne(e) ? 3 : 0;
  }
  function Ae(e, t) {
    return Mt(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
  }
  function dn(e, t) {
    return Mt(e) === 2 ? e.get(t) : e[t];
  }
  function ur(e, t, r) {
    var n = Mt(e);
    n === 2 ? e.set(t, r) : n === 3 ? (e.delete(t), e.add(r)) : e[t] = r;
  }
  function mn(e, t) {
    return e === t ? e !== 0 || 1 / e == 1 / t : e != e && t != t;
  }
  function Fe(e) {
    return wn && e instanceof Map;
  }
  function Ne(e) {
    return bn && e instanceof Set;
  }
  function _t(e) {
    return e.o || e.t;
  }
  function De(e) {
    if (Array.isArray(e))
      return Array.prototype.slice.call(e);
    var t = Sn(e);
    delete t[B];
    for (var r = We(t), n = 0; n < r.length; n++) {
      var i = r[n], o = t[i];
      o.writable === false && (o.writable = true, o.configurable = true), (o.get || o.set) && (t[i] = { configurable: true, writable: true, enumerable: o.enumerable, value: e[i] });
    }
    return Object.create(Object.getPrototypeOf(e), t);
  }
  function Te(e, t) {
    return t === void 0 && (t = false), Re(e) || Rt(e) || !Ct(e) || (Mt(e) > 1 && (e.set = e.add = e.clear = e.delete = vn), Object.freeze(e), t && Kt(e, function(r, n) {
      return Te(n, true);
    }, true)), e;
  }
  function vn() {
    Z(2);
  }
  function Re(e) {
    return e == null || typeof e != "object" || Object.isFrozen(e);
  }
  function lt(e) {
    var t = En[e];
    return t || Z(18, e), t;
  }
  function er() {
    return Jt;
  }
  function Ee(e, t) {
    t && (lt("Patches"), e.u = [], e.s = [], e.v = t);
  }
  function ce(e) {
    $e(e), e.p.forEach(yn), e.p = null;
  }
  function $e(e) {
    e === Jt && (Jt = e.l);
  }
  function rr(e) {
    return Jt = { p: [], l: Jt, h: e, m: true, _: 0 };
  }
  function yn(e) {
    var t = e[B];
    t.i === 0 || t.i === 1 ? t.j() : t.O = true;
  }
  function Oe(e, t) {
    t._ = t.p.length;
    var r = t.p[0], n = e !== void 0 && e !== r;
    return t.h.g || lt("ES5").S(t, e, n), n ? (r[B].P && (ce(t), Z(4)), Ct(e) && (e = ue(t, e), t.l || fe(t, e)), t.u && lt("Patches").M(r[B].t, e, t.u, t.s)) : e = ue(t, r, []), ce(t), t.u && t.v(t.u, t.s), e !== fr ? e : void 0;
  }
  function ue(e, t, r) {
    if (Re(t))
      return t;
    var n = t[B];
    if (!n)
      return Kt(t, function(o, a) {
        return nr(e, n, t, o, a, r);
      }, true), t;
    if (n.A !== e)
      return t;
    if (!n.P)
      return fe(e, n.t, true), n.t;
    if (!n.I) {
      n.I = true, n.A._--;
      var i = n.i === 4 || n.i === 5 ? n.o = De(n.k) : n.o;
      Kt(n.i === 3 ? new Set(i) : i, function(o, a) {
        return nr(e, n, i, o, a, r);
      }), fe(e, i, false), r && e.u && lt("Patches").R(n, r, e.u, e.s);
    }
    return n.o;
  }
  function nr(e, t, r, n, i, o) {
    if (Rt(i)) {
      var a = ue(e, i, o && t && t.i !== 3 && !Ae(t.D, n) ? o.concat(n) : void 0);
      if (ur(r, n, a), !Rt(a))
        return;
      e.m = false;
    }
    if (Ct(i) && !Re(i)) {
      if (!e.h.F && e._ < 1)
        return;
      ue(e, i), t && t.A.l || fe(e, i);
    }
  }
  function fe(e, t, r) {
    r === void 0 && (r = false), e.h.F && e.m && Te(t, r);
  }
  function ke(e, t) {
    var r = e[B];
    return (r ? _t(r) : e)[t];
  }
  function ir(e, t) {
    if (t in e)
      for (var r = Object.getPrototypeOf(e); r; ) {
        var n = Object.getOwnPropertyDescriptor(r, t);
        if (n)
          return n;
        r = Object.getPrototypeOf(r);
      }
  }
  function _e(e) {
    e.P || (e.P = true, e.l && _e(e.l));
  }
  function Pe(e) {
    e.o || (e.o = De(e.t));
  }
  function Ce(e, t, r) {
    var n = Fe(t) ? lt("MapSet").N(t, r) : Ne(t) ? lt("MapSet").T(t, r) : e.g ? function(i, o) {
      var a = Array.isArray(i), s = { i: a ? 1 : 0, A: o ? o.A : er(), P: false, I: false, D: {}, l: o, t: i, k: null, o: null, j: null, C: false }, c = s, h = je;
      a && (c = [s], h = Vt);
      var f = Proxy.revocable(c, h), p = f.revoke, l = f.proxy;
      return s.k = l, s.j = p, l;
    }(t, r) : lt("ES5").J(t, r);
    return (r ? r.A : er()).p.push(n), n;
  }
  function gn(e) {
    return Rt(e) || Z(22, e), function t(r) {
      if (!Ct(r))
        return r;
      var n, i = r[B], o = Mt(r);
      if (i) {
        if (!i.P && (i.i < 4 || !lt("ES5").K(i)))
          return i.t;
        i.I = true, n = or(r, o), i.I = false;
      } else
        n = or(r, o);
      return Kt(n, function(a, s) {
        i && dn(i.t, a) === s || ur(n, a, t(s));
      }), o === 3 ? new Set(n) : n;
    }(e);
  }
  function or(e, t) {
    switch (t) {
      case 2:
        return new Map(e);
      case 3:
        return Array.from(e);
    }
    return De(e);
  }
  var ar;
  var Jt;
  var Me = typeof Symbol != "undefined" && typeof Symbol("x") == "symbol";
  var wn = typeof Map != "undefined";
  var bn = typeof Set != "undefined";
  var sr = typeof Proxy != "undefined" && Proxy.revocable !== void 0 && typeof Reflect != "undefined";
  var fr = Me ? Symbol.for("immer-nothing") : ((ar = {})["immer-nothing"] = true, ar);
  var cr = Me ? Symbol.for("immer-draftable") : "__$immer_draftable";
  var B = Me ? Symbol.for("immer-state") : "__$immer_state";
  var xn = "" + Object.prototype.constructor;
  var We = typeof Reflect != "undefined" && Reflect.ownKeys ? Reflect.ownKeys : Object.getOwnPropertySymbols !== void 0 ? function(e) {
    return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
  } : Object.getOwnPropertyNames;
  var Sn = Object.getOwnPropertyDescriptors || function(e) {
    var t = {};
    return We(e).forEach(function(r) {
      t[r] = Object.getOwnPropertyDescriptor(e, r);
    }), t;
  };
  var En = {};
  var je = { get: function(e, t) {
    if (t === B)
      return e;
    var r = _t(e);
    if (!Ae(r, t))
      return function(i, o, a) {
        var s, c = ir(o, a);
        return c ? "value" in c ? c.value : (s = c.get) === null || s === void 0 ? void 0 : s.call(i.k) : void 0;
      }(e, r, t);
    var n = r[t];
    return e.I || !Ct(n) ? n : n === ke(e.t, t) ? (Pe(e), e.o[t] = Ce(e.A.h, n, e)) : n;
  }, has: function(e, t) {
    return t in _t(e);
  }, ownKeys: function(e) {
    return Reflect.ownKeys(_t(e));
  }, set: function(e, t, r) {
    var n = ir(_t(e), t);
    if (n != null && n.set)
      return n.set.call(e.k, r), true;
    if (!e.P) {
      var i = ke(_t(e), t), o = i == null ? void 0 : i[B];
      if (o && o.t === r)
        return e.o[t] = r, e.D[t] = false, true;
      if (mn(r, i) && (r !== void 0 || Ae(e.t, t)))
        return true;
      Pe(e), _e(e);
    }
    return e.o[t] === r && typeof r != "number" && (r !== void 0 || t in e.o) || (e.o[t] = r, e.D[t] = true, true);
  }, deleteProperty: function(e, t) {
    return ke(e.t, t) !== void 0 || t in e.t ? (e.D[t] = false, Pe(e), _e(e)) : delete e.D[t], e.o && delete e.o[t], true;
  }, getOwnPropertyDescriptor: function(e, t) {
    var r = _t(e), n = Reflect.getOwnPropertyDescriptor(r, t);
    return n && { writable: true, configurable: e.i !== 1 || t !== "length", enumerable: n.enumerable, value: r[t] };
  }, defineProperty: function() {
    Z(11);
  }, getPrototypeOf: function(e) {
    return Object.getPrototypeOf(e.t);
  }, setPrototypeOf: function() {
    Z(12);
  } };
  var Vt = {};
  Kt(je, function(e, t) {
    Vt[e] = function() {
      return arguments[0] = arguments[0][0], t.apply(this, arguments);
    };
  }), Vt.deleteProperty = function(e, t) {
    return Vt.set.call(this, e, t, void 0);
  }, Vt.set = function(e, t, r) {
    return je.set.call(this, e[0], t, r, e[0]);
  };
  var On = function() {
    function e(r) {
      var n = this;
      this.g = sr, this.F = true, this.produce = function(i, o, a) {
        if (typeof i == "function" && typeof o != "function") {
          var s = o;
          o = i;
          var c = n;
          return function(w) {
            var $ = this;
            w === void 0 && (w = s);
            for (var S = arguments.length, j = Array(S > 1 ? S - 1 : 0), v = 1; v < S; v++)
              j[v - 1] = arguments[v];
            return c.produce(w, function(P) {
              var E;
              return (E = o).call.apply(E, [$, P].concat(j));
            });
          };
        }
        var h;
        if (typeof o != "function" && Z(6), a !== void 0 && typeof a != "function" && Z(7), Ct(i)) {
          var f = rr(n), p = Ce(n, i, void 0), l = true;
          try {
            h = o(p), l = false;
          } finally {
            l ? ce(f) : $e(f);
          }
          return typeof Promise != "undefined" && h instanceof Promise ? h.then(function(w) {
            return Ee(f, a), Oe(w, f);
          }, function(w) {
            throw ce(f), w;
          }) : (Ee(f, a), Oe(h, f));
        }
        if (!i || typeof i != "object") {
          if ((h = o(i)) === void 0 && (h = i), h === fr && (h = void 0), n.F && Te(h, true), a) {
            var u = [], g = [];
            lt("Patches").M(i, h, u, g), a(u, g);
          }
          return h;
        }
        Z(21, i);
      }, this.produceWithPatches = function(i, o) {
        if (typeof i == "function")
          return function(h) {
            for (var f = arguments.length, p = Array(f > 1 ? f - 1 : 0), l = 1; l < f; l++)
              p[l - 1] = arguments[l];
            return n.produceWithPatches(h, function(u) {
              return i.apply(void 0, [u].concat(p));
            });
          };
        var a, s, c = n.produce(i, o, function(h, f) {
          a = h, s = f;
        });
        return typeof Promise != "undefined" && c instanceof Promise ? c.then(function(h) {
          return [h, a, s];
        }) : [c, a, s];
      }, typeof (r == null ? void 0 : r.useProxies) == "boolean" && this.setUseProxies(r.useProxies), typeof (r == null ? void 0 : r.autoFreeze) == "boolean" && this.setAutoFreeze(r.autoFreeze);
    }
    var t = e.prototype;
    return t.createDraft = function(r) {
      Ct(r) || Z(8), Rt(r) && (r = gn(r));
      var n = rr(this), i = Ce(this, r, void 0);
      return i[B].C = true, $e(n), i;
    }, t.finishDraft = function(r, n) {
      var i = r && r[B], o = i.A;
      return Ee(o, n), Oe(void 0, o);
    }, t.setAutoFreeze = function(r) {
      this.F = r;
    }, t.setUseProxies = function(r) {
      r && !sr && Z(20), this.g = r;
    }, t.applyPatches = function(r, n) {
      var i;
      for (i = n.length - 1; i >= 0; i--) {
        var o = n[i];
        if (o.path.length === 0 && o.op === "replace") {
          r = o.value;
          break;
        }
      }
      i > -1 && (n = n.slice(i + 1));
      var a = lt("Patches").$;
      return Rt(r) ? a(r, n) : this.produce(r, function(s) {
        return a(s, n);
      });
    }, e;
  }();
  var G = new On();
  var Le = G.produce;
  var ei = G.produceWithPatches.bind(G);
  var ri = G.setAutoFreeze.bind(G);
  var ni = G.setUseProxies.bind(G);
  var ii = G.applyPatches.bind(G);
  var oi = G.createDraft.bind(G);
  var ai = G.finishDraft.bind(G);
  var hr = Le;
  var A = (e) => typeof e == "function";
  var C = (e) => typeof e == "string";
  var he = (e) => typeof e == "number";
  var St = (e) => Array.isArray(e);
  var N = (e) => e != null && typeof e == "object" && !St(e);
  var Xt = (e) => e != null && (e instanceof Node || e.isDOM === true);
  var lr = (e) => e && e.isBinding === true;
  var Wt = (e) => e && e.isComponent === true;
  var yt = (e) => e && e.isTemplate === true;
  var L = (e) => e && e.isState === true;
  function V(e, t) {
    if (t == null)
      return e;
    if (A(t))
      return t(e);
    if (e != null) {
      let r = kn(t), n = e;
      for (; r.length > 0; ) {
        let i = r.shift();
        if (i === "*") {
          if (Array.isArray(n))
            return n.map((o) => V(o, r.join(".")));
          n = void 0;
        } else
          n != null ? n = n[i] : n = void 0;
      }
      return n;
    }
  }
  function kn(e) {
    return String(e).split(/[\.\[\]]/).filter((t) => t.trim() !== "");
  }
  function K(e, t) {
    if (e === t)
      return true;
    if (N(e) && N(t)) {
      let r = Object.keys(e), n = Object.keys(t);
      if (r.length !== n.length)
        return false;
      for (let i in e)
        if (!K(e[i], t[i]))
          return false;
      return true;
    }
    if (St(e) && St(t)) {
      if (e.length !== t.length)
        return false;
      for (let r in e)
        if (!K(e[r], t[r]))
          return false;
      return true;
    }
    return e === t;
  }
  function J(e) {
    let t = e, r = [];
    return { get(...n) {
      let i = t;
      for (let o of n)
        i = V(i, o);
      return i;
    }, set(n) {
      if (A(n) && (n = hr(t, (i) => n(i))), !K(t, n)) {
        t = n;
        for (let i of r)
          i(t);
      }
    }, watch(...n) {
      let i, o, a = {};
      if (C(n[0]) && (i = n.shift()), A(n[0]) && (o = n.shift()), N(n[0]) && (a = n.shift()), !A(o))
        throw new TypeError(`Expected a watcher function but none was passed. Received: ${n}`);
      if (i) {
        let s, c = o;
        o = (h) => {
          if (h = V(h, i), !K(h, s))
            return s = h, c(h);
        };
      }
      return a.immediate && o(t), r.push(o), function() {
        r.splice(r.indexOf(o), 1);
      };
    }, map(...n) {
      let i, o = (a) => a;
      if (C(n[0]) && (i = n.shift()), A(n[0]) && (o = n.shift()), i) {
        let a = o;
        o = (s) => a(V(s, i));
      }
      return Lt(this, o);
    }, toString() {
      return String(t);
    }, get isState() {
      return true;
    } };
  }
  function Lt(e, t) {
    return { get(...r) {
      let n = t(e.get());
      for (let i of r)
        n = V(n, i);
      return n;
    }, watch(...r) {
      let n, i, o = {};
      if (C(r[0]) && (n = r.shift()), A(r[0]) && (i = r.shift()), N(r[0]) && (o = r.shift()), !A(i))
        throw new TypeError(`Expected a watcher function. Received: ${i}`);
      if (n) {
        let s = i;
        i = (c) => s(V(c, n));
      }
      let a;
      return e.watch((s) => {
        s = t(s), K(s, a) || (a = s, i(s));
      }, o);
    }, map(...r) {
      let n, i = (o) => o;
      if (C(r[0]) && (n = r.shift()), A(r[0]) && (i = r.shift()), n) {
        let o = i;
        i = (a) => o(V(a, n));
      }
      return Lt(this, i);
    }, toString() {
      return e.toString();
    }, get isState() {
      return true;
    } };
  }
  function dr(e = {}, t = window.console) {
    let r = J(e.filter || "*,-woof:*"), n = new pr.default({ lightness: [0.6, 0.7], saturation: [0.6, 0.7] }), i;
    return r.watch((o) => {
      i = Pn(o);
    }, { immediate: true }), { $filter: r, makeChannel(o) {
      if (o.includes(","))
        throw new Error(`Channel names cannot contain commas. Got: ${o}`);
      return { get name() {
        return o;
      }, set name(a) {
        if (a.includes(","))
          throw new Error(`Channel names cannot contain commas. Got: ${a}`);
        o = a;
      }, get log() {
        return e.log === false || !i(o) ? () => {
        } : t.log.bind(window.console, `%c[${o}]`, `color:${n.hex(o)};font-weight:bold`);
      }, get warn() {
        return e.warn === false || !i(o) ? () => {
        } : t.warn.bind(window.console, `%c[${o}]`, `color:${n.hex(o)};font-weight:bold`);
      }, get error() {
        return e.error === false || !i(o) ? () => {
        } : t.error.bind(window.console, `%c[${o}]`, `color:${n.hex(o)};font-weight:bold`);
      } };
    } };
  }
  function Pn(e) {
    if (e instanceof RegExp)
      return (n) => e.test(n);
    let t = { positive: [], negative: [] }, r = e.split(",").map((n) => n.trim()).filter((n) => n !== "");
    for (let n of r) {
      let i = "positive";
      n.startsWith("-") && (i = "negative", n = n.slice(1)), n === "*" ? t[i].push(function(o) {
        return true;
      }) : n.endsWith("*") ? t[i].push(function(o) {
        return o.startsWith(n.slice(0, n.length - 1));
      }) : t[i].push(function(o) {
        return o === n;
      });
    }
    return function(n) {
      let { positive: i, negative: o } = t;
      return !(o.some((a) => a(n)) || i.length > 0 && !i.some((a) => a(n)));
    };
  }
  function mr(e, t, r, n) {
    let i = e.makeGetService({ identifier: n.name, type: "service" }), o = [], a = [], s = [], c = { debug: r, options: n.options || {}, getService: i, beforeConnect(p) {
      o.push(p);
    }, afterConnect(p) {
      a.push(p);
    }, watchState(p, ...l) {
      s.push(p.watch(...l));
    } }, h = t.call(c, c);
    if (!N(h))
      throw new TypeError(`A service must return an object. Got: ${h}`);
    let f = { exports: h, beforeConnect() {
      for (let p of o)
        p();
    }, afterConnect() {
      for (let p of a)
        p();
    } };
    return Object.defineProperty(f, "isService", { value: true, writable: false }), f;
  }
  var tt = { Literal: 1, Param: 2, Wildcard: 3 };
  function le(e) {
    return e.split("/").map((t) => t.trim()).filter((t) => t !== "");
  }
  function vr(e) {
    let t = le(e), r = [];
    for (let n = 0; n < t.length; n++) {
      let i = t[n];
      if (i === "*") {
        if (n !== t.length - 1)
          throw new Error(`Wildcard must be at the end of a route. Received: ${e}`);
        r.push({ type: tt.Wildcard, name: "*", value: null });
      } else
        i[0] === ":" ? r.push({ type: tt.Param, name: i.slice(1), value: null }) : r.push({ type: tt.Literal, name: i, value: i });
    }
    return { fragments: r };
  }
  function Ie(e, t, r = {}) {
    var i;
    let n = le(t);
    t:
      for (let o of e) {
        let { fragments: a } = o;
        if (!(((i = a[a.length - 1]) == null ? void 0 : i.type) === tt.Wildcard) && a.length !== n.length || r.willMatch && !r.willMatch(o))
          continue t;
        let c = [];
        e:
          for (let f = 0; f < a.length; f++) {
            let p = n[f], l = a[f];
            if (p == null && l.type !== tt.Wildcard)
              continue t;
            switch (l.type) {
              case tt.Literal:
                if (l.value.toLowerCase() === p.toLowerCase()) {
                  c.push(l);
                  break;
                } else
                  continue t;
              case tt.Param:
                c.push(kt(vt({}, l), { value: p }));
                break;
              case tt.Wildcard:
                c.push(kt(vt({}, l), { value: n.slice(f).join("/") }));
                break e;
              default:
                throw new Error(`Unknown fragment type: ${l.type}`);
            }
          }
        let h = /* @__PURE__ */ Object.create(null);
        for (let f of c)
          f.type === tt.Param && (h[f.name] = decodeURIComponent(f.value)), f.type === tt.Wildcard && (h.wildcard = "/" + decodeURIComponent(f.value));
        return { path: "/" + c.map((f) => f.value).join("/"), route: "/" + a.map((f) => f.type === tt.Param ? ":" + f.name : f.name).join("/"), params: h, data: o };
      }
  }
  function pt(...e) {
    e = e.filter((r) => r).map(String);
    let t = e.shift();
    if (t) {
      for (let r of e)
        r.startsWith(".") ? t = An(t, r) : t[t.length - 1] !== "/" ? r[0] !== "/" ? t += "/" + r : t += r : r[0] === "/" ? t += r.slice(1) : t += r;
      t !== "/" && t.endsWith("/") && (t = t.slice(0, t.length - 1));
    }
    return t != null ? t : "";
  }
  function An(e, t) {
    let r = e;
    for (; ; )
      if (t.startsWith("..")) {
        for (let n = r.length; n > 0; --n)
          if (r[n] === "/" || n === 0) {
            r = r.slice(0, n), t = t.replace(/^\.\.\/?/, "");
            break;
          }
      } else if (t.startsWith("."))
        t = t.replace(/^\.\/?/, "");
      else
        break;
    return pt(r, t);
  }
  function pe(e, t) {
    if (t.startsWith("/"))
      return t;
    let r = e;
    for (; ; )
      if (t.startsWith("..")) {
        for (let n = r.length; n > 0; --n)
          if (r[n] === "/" || n === 0) {
            r = r.slice(0, n), t = t.replace(/^\.\.\/?/, "");
            break;
          }
      } else if (t.startsWith("."))
        t = t.replace(/^\.\/?/, "");
      else
        break;
    return pt(r, t);
  }
  function He({ debug: e, options: t }) {
    e.name = "woof:@http";
    let r = [], n = t.fetch || window.fetch.bind(window), i = 0;
    function o(a, s) {
      return new yr({ id: ++i, method: a, url: s, fetch: n, debug: e, middleware: r });
    }
    return { request: o, addMiddleware(...a) {
      return r.push(...a), this;
    }, get(a) {
      return o("get", a);
    }, put(a) {
      return o("put", a);
    }, patch(a) {
      return o("patch", a);
    }, post(a) {
      return o("post", a);
    }, delete(a) {
      return o("delete", a);
    }, head(a) {
      return o("head", a);
    } };
  }
  var It;
  var Ut;
  var q;
  var Et;
  var I;
  var Yt;
  var jt;
  var Qt;
  var Zt;
  var X;
  var Ht;
  var zt;
  var Bt;
  var Ue;
  var yr = class {
    constructor({ id: t, debug: r, method: n, url: i, middleware: o, fetch: a }) {
      U(this, Bt);
      U(this, It, void 0);
      U(this, Ut, void 0);
      U(this, q, void 0);
      U(this, Et, void 0);
      U(this, I, void 0);
      U(this, Yt, void 0);
      U(this, jt, void 0);
      U(this, Qt, void 0);
      U(this, Zt, void 0);
      U(this, X, void 0);
      U(this, Ht, void 0);
      U(this, zt, true);
      let [s, c] = i.split("?");
      W(this, It, t), W(this, Ut, r), W(this, q, s), W(this, jt, o), W(this, Qt, a), W(this, Et, new URLSearchParams(c || "")), W(this, I, { method: n, headers: new Headers(), body: void 0 }), W(this, Ht, (h) => h >= 200 && h < 300);
    }
    get isRelative() {
      return !/^https?\:\/\//.test(k(this, q));
    }
    url(t) {
      if (t === void 0)
        return k(this, q);
      if (C(t))
        W(this, q, t);
      else
        throw new TypeError(`Expected a string. Received: ${t}`);
    }
    header(t, r) {
      if (C(t))
        return r === void 0 ? k(this, I).headers.get(t) : (t.toLowerCase() === "content-type" && W(this, zt, false), r === null ? (k(this, I).headers.delete(t), this) : (k(this, I).headers.set(t, r.toString()), this));
      if (N(t) && r == null) {
        for (let n in t)
          this.header(n, t[n]);
        return this;
      }
      throw new Error(`Expected a key and value, an object, or a header name only. Received: ${t} and ${r}`);
    }
    headers(t, r) {
      return this.header(t, r), this;
    }
    query(t, r) {
      if (C(t))
        return r === void 0 ? k(this, Et).get(t) : r === null ? (k(this, Et).delete(t), this) : (k(this, Et).set(t, r.toString()), this);
      if (N(t) && r == null) {
        for (let n in t)
          this.query(n, t[n]);
        return this;
      }
      throw new Error(`Expected a key and value, an object, or a parameter name only. Received: ${t} and ${r}`);
    }
    body(t) {
      return t instanceof FormData ? (k(this, zt) && this.header("content-type", "application/x-www-form-urlencoded"), k(this, I).body = t) : N(t) ? (k(this, zt) && this.header("content-type", "application/json"), k(this, I).body = JSON.stringify(t)) : k(this, I).body = t, this;
    }
    ok(t) {
      W(this, Ht, t);
    }
    response() {
      return k(this, Yt);
    }
    then(...t) {
      return k(this, X) || W(this, X, re(this, Bt, Ue).call(this)), k(this, X).then(...t);
    }
    catch(...t) {
      return k(this, X) || W(this, X, re(this, Bt, Ue).call(this)), k(this, X).catch(...t);
    }
    finally(...t) {
      return k(this, X) || W(this, X, re(this, Bt, Ue).call(this)), k(this, X).finally(...t);
    }
  };
  It = /* @__PURE__ */ new WeakMap(), Ut = /* @__PURE__ */ new WeakMap(), q = /* @__PURE__ */ new WeakMap(), Et = /* @__PURE__ */ new WeakMap(), I = /* @__PURE__ */ new WeakMap(), Yt = /* @__PURE__ */ new WeakMap(), jt = /* @__PURE__ */ new WeakMap(), Qt = /* @__PURE__ */ new WeakMap(), Zt = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakMap(), Ht = /* @__PURE__ */ new WeakMap(), zt = /* @__PURE__ */ new WeakMap(), Bt = /* @__PURE__ */ new WeakSet(), Ue = async function() {
    let t = { status: 200, statusText: "OK", headers: {}, body: void 0 };
    W(this, Yt, t);
    let r = async () => {
      k(this, Ut).log(`[#${k(this, It)}] sent ${k(this, I).method.toUpperCase()} request to '${k(this, q)}'`);
      let i = Date.now(), o = k(this, Et).toString(), a = o.length > 0 ? k(this, q) + "?" + o : k(this, q), s = await k(this, Qt).call(this, a, k(this, I));
      t.status = s.status, t.statusText = s.statusText, s.headers.forEach((h, f) => {
        t.headers[f] = h;
      });
      let c = t.headers["content-type"];
      A(k(this, Zt)) ? t.body = await k(this, Zt).call(this, s) : c != null && c.includes("application/json") ? t.body = await s.json() : c != null && c.includes("application/x-www-form-urlencoded") ? t.body = await s.formData() : t.body = await s.text(), k(this, Ut).log(`[#${k(this, It)}] got response from ${k(this, I).method.toUpperCase()} '${k(this, q)}'`, `(took ${Math.round(Date.now() - i)}ms)`, t);
    }, n = (i = 0) => {
      let o = k(this, jt)[i], a = k(this, jt)[i + 1] ? n(i + 1) : r;
      return async () => o(this, a);
    };
    if (k(this, jt).length > 0 ? await n()() : await r(), k(this, Ht).call(this, t.status) == false) {
      let i = new gr(`${t.status} ${t.statusText}: Request failed (${k(this, I).method.toUpperCase()} ${k(this, q)})`);
      throw i.method = k(this, I).method, i.url = k(this, q), i.status = t.status, i.statusText = t.statusText, i.headers = t.headers, i.body = t.body, i;
    }
    return t;
  };
  var gr = class extends Error {
    constructor() {
      super(...arguments);
      Pt(this, "method");
      Pt(this, "url");
      Pt(this, "status");
      Pt(this, "statusText");
      Pt(this, "headers");
      Pt(this, "body");
    }
  };
  function ze(e) {
    e.debug.name = "woof:@page";
    let t = J(document == null ? void 0 : document.title);
    return e.afterConnect(() => {
      document && e.watchState(t, (r) => {
        C(r) && (document.title = r);
      }, { immediate: false });
    }), { $title: t };
  }
  var zr = Ze(Mr());
  function Ot() {
    return Ot = Object.assign || function(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var n in r)
          Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
      }
      return e;
    }, Ot.apply(this, arguments);
  }
  var dt;
  (function(e) {
    e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
  })(dt || (dt = {}));
  var me = function(e) {
    return e;
  };
  var ve = "beforeunload";
  var Mn = "hashchange";
  var Wr = "popstate";
  function Lr(e) {
    e === void 0 && (e = {});
    var t = e, r = t.window, n = r === void 0 ? document.defaultView : r, i = n.history;
    function o() {
      var O = n.location, d = O.pathname, b = O.search, _ = O.hash, F = i.state || {};
      return [F.idx, me({ pathname: d, search: b, hash: _, state: F.usr || null, key: F.key || "default" })];
    }
    var a = null;
    function s() {
      if (a)
        u.call(a), a = null;
      else {
        var O = dt.Pop, d = o(), b = d[0], _ = d[1];
        if (u.length) {
          if (b != null) {
            var F = f - b;
            F && (a = { action: O, location: _, retry: function() {
              E(F * -1);
            } }, E(F));
          }
        } else
          j(O);
      }
    }
    n.addEventListener(Wr, s);
    var c = dt.Pop, h = o(), f = h[0], p = h[1], l = ge(), u = ge();
    f == null && (f = 0, i.replaceState(Ot({}, i.state, { idx: f }), ""));
    function g(O) {
      return typeof O == "string" ? O : de(O);
    }
    function w(O, d) {
      return d === void 0 && (d = null), me(Ot({ pathname: p.pathname, hash: "", search: "" }, typeof O == "string" ? qe(O) : O, { state: d, key: Ur() }));
    }
    function $(O, d) {
      return [{ usr: O.state, key: O.key, idx: d }, g(O)];
    }
    function S(O, d, b) {
      return !u.length || (u.call({ action: O, location: d, retry: b }), false);
    }
    function j(O) {
      c = O;
      var d = o();
      f = d[0], p = d[1], l.call({ action: c, location: p });
    }
    function v(O, d) {
      var b = dt.Push, _ = w(O, d);
      function F() {
        v(O, d);
      }
      if (S(b, _, F)) {
        var M = $(_, f + 1), z = M[0], rt = M[1];
        try {
          i.pushState(z, "", rt);
        } catch (mt) {
          n.location.assign(rt);
        }
        j(b);
      }
    }
    function P(O, d) {
      var b = dt.Replace, _ = w(O, d);
      function F() {
        P(O, d);
      }
      if (S(b, _, F)) {
        var M = $(_, f), z = M[0], rt = M[1];
        i.replaceState(z, "", rt), j(b);
      }
    }
    function E(O) {
      i.go(O);
    }
    var T = { get action() {
      return c;
    }, get location() {
      return p;
    }, createHref: g, push: v, replace: P, go: E, back: function() {
      E(-1);
    }, forward: function() {
      E(1);
    }, listen: function(d) {
      return l.push(d);
    }, block: function(d) {
      var b = u.push(d);
      return u.length === 1 && n.addEventListener(ve, ye), function() {
        b(), u.length || n.removeEventListener(ve, ye);
      };
    } };
    return T;
  }
  function Ir(e) {
    e === void 0 && (e = {});
    var t = e, r = t.window, n = r === void 0 ? document.defaultView : r, i = n.history;
    function o() {
      var d = qe(n.location.hash.substr(1)), b = d.pathname, _ = b === void 0 ? "/" : b, F = d.search, M = F === void 0 ? "" : F, z = d.hash, rt = z === void 0 ? "" : z, mt = i.state || {};
      return [mt.idx, me({ pathname: _, search: M, hash: rt, state: mt.usr || null, key: mt.key || "default" })];
    }
    var a = null;
    function s() {
      if (a)
        u.call(a), a = null;
      else {
        var d = dt.Pop, b = o(), _ = b[0], F = b[1];
        if (u.length) {
          if (_ != null) {
            var M = f - _;
            M && (a = { action: d, location: F, retry: function() {
              T(M * -1);
            } }, T(M));
          }
        } else
          v(d);
      }
    }
    n.addEventListener(Wr, s), n.addEventListener(Mn, function() {
      var d = o(), b = d[1];
      de(b) !== de(p) && s();
    });
    var c = dt.Pop, h = o(), f = h[0], p = h[1], l = ge(), u = ge();
    f == null && (f = 0, i.replaceState(Ot({}, i.state, { idx: f }), ""));
    function g() {
      var d = document.querySelector("base"), b = "";
      if (d && d.getAttribute("href")) {
        var _ = n.location.href, F = _.indexOf("#");
        b = F === -1 ? _ : _.slice(0, F);
      }
      return b;
    }
    function w(d) {
      return g() + "#" + (typeof d == "string" ? d : de(d));
    }
    function $(d, b) {
      return b === void 0 && (b = null), me(Ot({ pathname: p.pathname, hash: "", search: "" }, typeof d == "string" ? qe(d) : d, { state: b, key: Ur() }));
    }
    function S(d, b) {
      return [{ usr: d.state, key: d.key, idx: b }, w(d)];
    }
    function j(d, b, _) {
      return !u.length || (u.call({ action: d, location: b, retry: _ }), false);
    }
    function v(d) {
      c = d;
      var b = o();
      f = b[0], p = b[1], l.call({ action: c, location: p });
    }
    function P(d, b) {
      var _ = dt.Push, F = $(d, b);
      function M() {
        P(d, b);
      }
      if (j(_, F, M)) {
        var z = S(F, f + 1), rt = z[0], mt = z[1];
        try {
          i.pushState(rt, "", mt);
        } catch (Xn) {
          n.location.assign(mt);
        }
        v(_);
      }
    }
    function E(d, b) {
      var _ = dt.Replace, F = $(d, b);
      function M() {
        E(d, b);
      }
      if (j(_, F, M)) {
        var z = S(F, f), rt = z[0], mt = z[1];
        i.replaceState(rt, "", mt), v(_);
      }
    }
    function T(d) {
      i.go(d);
    }
    var O = { get action() {
      return c;
    }, get location() {
      return p;
    }, createHref: w, push: P, replace: E, go: T, back: function() {
      T(-1);
    }, forward: function() {
      T(1);
    }, listen: function(b) {
      return l.push(b);
    }, block: function(b) {
      var _ = u.push(b);
      return u.length === 1 && n.addEventListener(ve, ye), function() {
        _(), u.length || n.removeEventListener(ve, ye);
      };
    } };
    return O;
  }
  function ye(e) {
    e.preventDefault(), e.returnValue = "";
  }
  function ge() {
    var e = [];
    return { get length() {
      return e.length;
    }, push: function(r) {
      return e.push(r), function() {
        e = e.filter(function(n) {
          return n !== r;
        });
      };
    }, call: function(r) {
      e.forEach(function(n) {
        return n && n(r);
      });
    } };
  }
  function Ur() {
    return Math.random().toString(36).substr(2, 8);
  }
  function de(e) {
    var t = e.pathname, r = t === void 0 ? "/" : t, n = e.search, i = n === void 0 ? "" : n, o = e.hash, a = o === void 0 ? "" : o;
    return i && i !== "?" && (r += i.charAt(0) === "?" ? i : "?" + i), a && a !== "#" && (r += a.charAt(0) === "#" ? a : "#" + a), r;
  }
  function qe(e) {
    var t = {};
    if (e) {
      var r = e.indexOf("#");
      r >= 0 && (t.hash = e.substr(r), e = e.substr(0, r));
      var n = e.indexOf("?");
      n >= 0 && (t.search = e.substr(n), e = e.substr(0, n)), e && (t.pathname = e);
    }
    return t;
  }
  var Wn = /(noopener|noreferrer) (noopener|noreferrer)/;
  var Ln = /^[\w-_]+:/;
  function Hr(e, t, r = window) {
    function n(o) {
      if (!(!o || o === e))
        return o.localName !== "a" || o.href === void 0 ? n(o.parentNode) : o;
    }
    function i(o) {
      if (o.button && o.button !== 0 || o.ctrlKey || o.metaKey || o.altKey || o.shiftKey || o.defaultPrevented)
        return;
      let a = n(o.target);
      !a || r.location.protocol !== a.protocol || r.location.hostname !== a.hostname || r.location.port !== a.port || a.hasAttribute("data-router-ignore") || a.hasAttribute("download") || a.getAttribute("target") === "_blank" && Wn.test(a.getAttribute("rel")) || Ln.test(a.getAttribute("href")) || (o.preventDefault(), t(a));
    }
    return e.addEventListener("click", i), function() {
      e.removeEventListener("click", i);
    };
  }
  function et(e, t, r, n) {
    let i = e.makeGetService({ identifier: "~", type: "component" });
    r = r || {}, n = n || [];
    let o = [], a = [], s = [], c = [], h = [], f, p = false, l = [], u = [];
    for (let v in r)
      if (L(r[v]))
        v.startsWith("$") ? l.push({ name: v, value: r[v] }) : u.push({ name: v, value: r[v] });
      else {
        if (v.startsWith("$"))
          throw new TypeError(`Attributes beginning with $ must be states. Got: ${typeof r[v]}`);
        l.push({ name: v, value: r[v] });
      }
    let g = {};
    u.forEach(({ name: v, value: P }) => {
      g[v] = P.get();
    }), l.forEach(({ name: v, value: P }) => {
      g[v] = P;
    });
    let w = J(g), $ = { getService: i, children: n, debug: i("@debug").makeChannel("~"), get isConnected() {
      return p;
    }, loadRoute(v) {
      f = v;
    }, beforeConnect(v) {
      o.push(v);
    }, afterConnect(v) {
      a.push(v);
    }, beforeDisconnect(v) {
      s.push(v);
    }, afterDisconnect(v) {
      c.push(v);
    }, watchState(v, P, E = {}) {
      if (a.push(() => {
        h.push(v.watch(P, vt({ immediate: true }, E)));
      }), p)
        throw new Error("Called self.watchState after component was already connected. This will cause memory leaks. This function should only be called in the body of the component.");
    } };
    u.forEach(({ name: v, value: P }) => {
      $.watchState(P, (E) => {
        w.set((T) => {
          T[v] = E;
        });
      });
    });
    let S = t.call($, w.map(), $);
    if (yt(S))
      S = S.init(i("@app"));
    else if (S !== null && !Xt(S)) {
      let v = `Components must return an h() element, a DOM node or null. Got: ${S}`;
      throw new TypeError(v);
    }
    let j = { $attrs: w, get node() {
      if (S) {
        if (Wt(S))
          return S.node;
        if (Xt(S))
          return S;
      }
      return null;
    }, get isConnected() {
      return p;
    }, get hasRoutePreload() {
      return A(f);
    }, async routePreload(v) {
      if (!!A(f))
        return new Promise(async (P, E) => {
          let T = (b) => {
            if (yt(b))
              b = b.init(i("@app"));
            else
              return E(new TypeError(`Expected an element to display. Got: ${b} (${typeof b})`));
            v(b);
          }, O = () => {
            P();
          }, d = f({ show: T, done: O });
          d && A(d.then) && (await d, O());
        });
    }, connect(v, P = null) {
      let E = j.isConnected;
      if (!E)
        for (let T of o)
          T();
      if (Wt(S) ? S.connect(v, P) : Xt(S) && v.insertBefore(S, P ? P.nextSibling : null), p = true, !E)
        for (let T of a)
          T();
    }, disconnect() {
      if (j.isConnected) {
        for (let v of s)
          v();
        Wt(S) ? S.disconnect() : Xt(S) && S.parentNode.removeChild(S), p = false;
        for (let v of c)
          v();
        for (let v of h)
          v();
        h = [];
      }
      p = false;
    } };
    return Object.defineProperty(j, "isComponent", { value: true, writable: false }), j;
  }
  function Ve(e, t) {
    let r = e.map("element"), n = document.createTextNode(""), i = null;
    function o(a) {
      i && (i.disconnect(), i = null), a && (yt(a) && (a = a.init(t.getService("@app"))), a.connect(n.parentNode, n), i = a);
    }
    return t.watchState(r, o), n;
  }
  function Ke(e) {
    e.debug.name = "woof:@router";
    let { options: t } = e, r;
    t.history ? r = t.history : t.hash ? r = Ir() : r = Lr();
    let n = [];
    for (let u of t.routes)
      n.push(kt(vt({}, u), { fragments: vr(u.path).fragments }));
    for (let u of n)
      if (u.redirect && !Ie(n.filter((w) => w !== u), u.redirect))
        throw new Error(`Found a redirect to an undefined URL. From '${u.path}' to '${u.redirect}'`);
    let i, o = [], a, s = J(), c = J(), h = J({}), f = J({}), p = false;
    e.watchState(f, (u) => {
      if (p) {
        p = false;
        return;
      }
      let g = new URLSearchParams();
      for (let w in u)
        g.set(w, u[w]);
      r.replace({ pathname: r.location.pathname, search: "?" + g.toString() });
    }, { immediate: false }), e.afterConnect(() => {
      let u = t.getRoot();
      i = et(e.getService("@app"), Ve), i.connect(u), r.listen(l), l(r), Hr(u, (g) => {
        let w = g.getAttribute("href");
        /^https?:\/\/|^\//.test(w) || (w = pt(r.location.pathname, w)), r.push(w), e.debug.log(`Intercepted link to '${w}'`);
      });
    });
    async function l({ location: u }) {
      let g = Ie(n, u.pathname);
      if (g) {
        if (g.data.redirect != null) {
          let w = g.data.redirect;
          for (let $ in g.params)
            w = w.replace(":" + $, g.params[$]);
          r.replace(w);
        } else if (c.set(g.path), h.set(g.params), g.route !== s.get()) {
          s.set(g.route);
          let { layers: w } = g.data;
          for (let $ = 0; $ < w.length; $++) {
            let S = w[$], j = o[$];
            if ((j == null ? void 0 : j.id) !== S.id) {
              j && j.component.disconnect(), o = o.slice(0, $);
              let v = e.getService("@app"), P = et(v, Ve), E = et(v, S.component, null, [P]), T = o[o.length - 1], O = (d) => {
                T ? T.outlet.$attrs.set({ element: d }) : i.$attrs.set({ element: d });
              };
              E.hasRoutePreload && await E.routePreload(O), O(E), o.push({ id: S.id, component: E, outlet: P });
            }
          }
        }
      } else
        e.debug.warn('No route was matched. Consider adding a wildcard ("*") route or redirect to catch this.');
      u.search !== a && (a = u.search, p = true, f.set(zr.default.parse(u.search, { parseBooleans: true, parseNumbers: true })));
    }
    return { $route: s.map(), $path: c.map(), $params: h.map(), $query: f, back(u = 1) {
      r.go(-u);
    }, forward(u = 1) {
      r.go(u);
    }, navigate(...u) {
      let g = "", w = {};
      N(u[u.length - 1]) && (w = u.pop()), g = pe(r.location.pathname, pt(...u)), w.replace ? r.replace(g) : r.push(g);
    } };
  }
  function In(e = {}) {
    let t = dr(e.debug), r = t.makeChannel("woof:app"), n = [], i = {}, o = async () => true, a = async () => true, s, c = 0;
    function h(l, u, g = null, w = []) {
      if (!A(u))
        throw new TypeError(`Route needs a path and a component function. Got: ${l} and ${u}`);
      let $ = [];
      if (g != null) {
        let S = le(l), j = { id: c++, component: u };
        S[S.length - 1] === "*" && S.pop();
        let v = { route(P, E, T) {
          let O = pt(...S, P);
          $.push(...h(O, E, T, [...w, j]));
        }, redirect(P, E) {
          P = pt(...S, P), E = pe(pt(...S), E), E.startsWith("/") || (E = "/" + E), $.push({ path: P, redirect: E });
        } };
        g.call(v, v);
      } else
        $.push({ path: l, layers: [...w, { id: c++, component: u }] });
      return $;
    }
    let f = { route(l, u, g = null) {
      return n.push(...h(l, u, g)), f;
    }, redirect(l, u) {
      if (C(u))
        n.push({ path: l, redirect: u });
      else
        throw new TypeError(`Expected a path. Got: ${u}`);
      return f;
    }, service(l, u, g = {}) {
      if (!A(u))
        throw new TypeError(`Expected a service function. Got: ${u} (${typeof u})`);
      return i[l] || (i[l] = { fn: u, instance: null, options: e }), i[l].fn = u, g.options !== void 0 && (i[l].options = g.options), f;
    }, beforeConnect(l) {
      return o = async () => l({ getService: p({ identifier: "app", type: "app" }), debug: r }), f;
    }, afterConnect(l) {
      return a = async () => l({ getService: p({ identifier: "app", type: "app" }), debug: r }), f;
    }, async connect(l) {
      if (C(l) && (l = document.querySelector(l)), !(l instanceof Node))
        throw new TypeError(`Expected a DOM node. Got: ${l}`);
      s = l;
      for (let u in i) {
        let g = i[u];
        g.instance = mr({ makeGetService: p }, g.fn, t.makeChannel(`service:${u}`), { name: u, options: g.options });
      }
      for (let u in i)
        i[u].instance.beforeConnect();
      return o().then(async () => {
        for (let u in i)
          i[u].instance.afterConnect();
        return a();
      });
    } };
    function p({ identifier: l, type: u }) {
      return function(w) {
        if (i[w]) {
          if (i[w].instance == null)
            throw new Error(`Service '${w}' was requested before it was initialized from ${u} '${l}'. Make sure '${w}' is registered before '${l}' on your app.`);
          return i[w].instance.exports;
        }
        throw new Error(`Service is not registered in this app. Got: ${w}`);
      };
    }
    return f.service("@app", () => ({ makeGetService: p })), f.service("@debug", () => t), f.service("@router", Ke, { options: kt(vt({}, e.router || {}), { routes: n, getRoot() {
      return s;
    } }) }), f.service("@page", ze), f.service("@http", He), f;
  }
  function Un(...e) {
    let t = e.pop(), r = e;
    if (!A(t))
      throw new TypeError(`Last argument should be a function. Got: ${t}`);
    return { get(n) {
      let i = t(...r.map((o) => o.get()));
      return n !== void 0 ? V(i, n) : i;
    }, watch(...n) {
      let i, o, a = {};
      if (C(n[0]) && (i = n.shift()), A(n[0]) && (o = n.shift()), N(n[0]) && (a = n.shift()), !A(o))
        throw new TypeError(`Expected a watcher function but none was passed. Received: ${n}`);
      if (i) {
        let c, h = o;
        o = (f) => {
          if (f = V(f, i), !K(f, c))
            return c = f, h(f);
        };
      }
      a.immediate && o(this.get(i));
      let s = [];
      for (let c of r)
        s.push(c.watch(() => {
          o(this.get());
        }));
      return function() {
        for (let h of s)
          h();
      };
    }, map(...n) {
      let i, o = (a) => a;
      if (C(n[0]) && (i = n.shift()), A(n[0]) && (o = n.shift()), i) {
        let a = o;
        o = (s) => a(V(s, i));
      }
      return Lt(this, o);
    }, toString() {
      return String(this.get());
    }, get isState() {
      return true;
    } };
  }
  function Je(e) {
    let t = [];
    for (let r of e)
      Array.isArray(r) ? t.push(...Je(r)) : t.push(r);
    return t;
  }
  function Br(e, t) {
    let r = document.createTextNode("");
    function n(i) {
      i.value != null ? r.textContent = String(i.value) : i.defaultValue != null ? r.textContent = String(i.defaultValue) : r.textContent = "";
    }
    return t.watchState(e, n), r;
  }
  function qr(e, t) {
    let { children: r } = t, n = e.get("tagname"), i = e.get("attrs") || {}, o = document.createElement(n);
    i.$ref && i.$ref.set(o), i.className && (i.class = i.className, delete i.className);
    let a = [];
    return t.beforeConnect(() => {
      for (let s of r)
        s.connect(o);
      zn(o, i, a), i.style && Vr(o, i.style, a), i.class && Kr(o, i.class, a);
    }), t.afterDisconnect(async () => {
      for (let s of r)
        s.disconnect();
      for (let s of a)
        s();
      a = [];
    }), o;
  }
  function Ft(e, t) {
    let r = e.watch((n) => {
      t(n);
    });
    return t(e.get()), r;
  }
  function zn(e, t, r) {
    for (let n in t) {
      let i = t[n];
      if (n === "value")
        if (L(i))
          r.push(Ft(i, (o) => {
            e.value = String(o);
          }));
        else if (lr(i)) {
          r.push(Ft(i.$value, (a) => {
            e.value = String(a);
          }));
          let o = (a) => {
            let s = Bn(i.$value.get(), a.target.value);
            i.$value.set(s);
          };
          e.addEventListener(i.event, o), r.push(() => {
            e.removeEventListener(i.event, o);
          });
        } else
          e.value = String(i);
      else if (Xe.events.includes(n)) {
        let o = n.slice(2).toLowerCase(), a = L(t[n]) ? (s) => t[n].get()(s) : t[n];
        e.addEventListener(o, a), r.push(() => {
          e.removeEventListener(o, a);
        });
      } else if (!Xe.private.includes(n)) {
        let o = Xe.boolean.includes(n);
        L(i) ? r.push(Ft(i, (a) => {
          a ? e.setAttribute(n, o ? "" : a.toString()) : e.removeAttribute(n);
        })) : i && e.setAttribute(n, o ? "" : String(i));
      }
    }
  }
  function Vr(e, t, r) {
    let n = [];
    if (L(t)) {
      let i, o = Ft(t, (a) => {
        A(i) && i(), e.style = null, i = Vr(e, a, r);
      });
      r.push(o), n.push(o);
    } else if (C(t))
      e.style = t;
    else if (N(t))
      for (let i in t) {
        let o = t[i], a = i.indexOf("-") > -1 ? (s, c) => e.style.setProperty(s, c) : (s, c) => e.style[s] = c;
        if (L(o)) {
          let s = Ft(o, (c) => {
            c ? a(i, c) : e.style.removeProperty(i);
          });
          r.push(s), n.push(s);
        } else if (C(o))
          a(i, o);
        else if (he(o))
          a(i, o + "px");
        else
          throw new TypeError(`Style properties should be strings, $states or numbers. Got (${i}: ${o})`);
      }
    else
      throw new TypeError(`Expected style property to be a string, $state, or object. Got: ${t}`);
    return function() {
      for (let o of n)
        o(), r.splice(r.indexOf(o), 1);
    };
  }
  function Kr(e, t, r) {
    let n = [];
    if (L(t)) {
      let i, o = Ft(t, (a) => {
        requestAnimationFrame(() => {
          A(i) && i(), e.removeAttribute("class"), i = Kr(e, a, r);
        });
      });
      r.push(o), n.push(o);
    } else {
      let i = Jr(t);
      for (let o in i) {
        let a = i[o];
        if (L(a)) {
          let s = Ft(a, (c) => {
            c ? e.classList.add(o) : e.classList.remove(o);
          });
          r.push(s), n.push(s);
        } else
          a && e.classList.add(o);
      }
    }
    return function() {
      for (let o of n)
        o(), r.splice(r.indexOf(o), 1);
    };
  }
  function Jr(e) {
    let t = {};
    if (C(e)) {
      let r = e.split(" ");
      for (let n of r)
        t[n] = true;
    } else
      N(e) ? Object.assign(t, e) : St(e) && Array.from(e).filter((r) => r != null).forEach((r) => {
        Object.assign(t, Jr(r));
      });
    return t;
  }
  function Bn(e, t) {
    let r = typeof e;
    return r === "string" ? String(t) : r === "number" ? Number(t) : r === "boolean" ? Boolean(t) : t;
  }
  var Xe = { private: ["$ref", "children", "class", "value", "style", "data"], boolean: ["disabled", "contenteditable", "draggable", "hidden", "spellcheck", "autocomplete", "autofocus", "translate"], events: ["onclick", "ondblclick", "onmousedown", "onmouseup", "onmouseover", "onmousemove", "onmouseout", "onmouseenter", "onmouseleave", "ontouchcancel", "ontouchend", "ontouchmove", "ontouchstart", "ondragstart", "ondrag", "ondragenter", "ondragleave", "ondragover", "ondrop", "ondragend", "onkeydown", "onkeypress", "onkeyup", "onunload", "onabort", "onerror", "onresize", "onscroll", "onselect", "onchange", "onsubmit", "onreset", "onfocus", "onblur", "oninput", "onanimationend", "onanimationiteration", "onanimationstart"] };
  function Xr(e, t) {
    let r = document.createTextNode("");
    return t.afterConnect(() => {
      let n = r;
      for (let i of t.children)
        i.connect(r.parentNode, n), n = i.node;
    }), t.afterDisconnect(() => {
      for (let n of t.children)
        n.disconnect();
    }), r;
  }
  function te(e, ...t) {
    let r = {};
    N(t[0]) && (r = t.shift());
    let n = { attrs: r, init(i) {
      let o = Je(t).filter((a) => a != null && a !== false).map((a) => {
        if (yt(a) ? a = a.init(i) : (C(a) || he(a) || L(a)) && (a = et(i, Br, { value: a })), !Wt(a))
          throw new TypeError(`Children must be components, strings, numbers or states. Got: ${a}`);
        return a;
      });
      if (C(e))
        return e === "" || e === "<>" ? et(i, Xr, null, o) : et(i, qr, { tagname: e, attrs: r }, o);
      if (A(e))
        return et(i, e, r, o);
      throw new TypeError(`Expected a tagname or component function. Got: ${e} (${typeof e})`);
    } };
    return Object.defineProperty(n, "isTemplate", { writable: false, value: true }), n;
  }
  function Jn(e, t = "input") {
    let r = { $value: e, event: t };
    return Object.defineProperty(r, "isBinding", { writable: false, value: true }), r;
  }

  // src/utils/convert.js
  function formatHex(hex, hashSymbol = false) {
    if (hex[0] === "#") {
      hex = hex.slice(1);
    }
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    return (hashSymbol ? "#" + hex : hex).toUpperCase();
  }
  function formatRGB(rgb, resolution = 0) {
    let str = "";
    str += (rgb.r * 255).toFixed(resolution || 0) + ", ";
    str += (rgb.g * 255).toFixed(resolution || 0) + ", ";
    str += (rgb.b * 255).toFixed(resolution || 0);
    return str;
  }
  function formatHSL(hsl, resolution = 0) {
    let str = "";
    str += (hsl.h * 360).toFixed(resolution || 0) + ", ";
    str += (hsl.s * 100).toFixed(resolution || 0) + "%, ";
    str += (hsl.l * 100).toFixed(resolution || 0) + "%";
    return str;
  }
  function rgbToHSL(color) {
    const { r, g, b } = color;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h;
    let s;
    const l = (max + min) / 2;
    if (max == min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return { h, s, l };
  }
  function hslToRGB(color) {
    const { h, s, l } = color;
    let r;
    let g;
    let b;
    if (s == 0) {
      r = g = b = l;
    } else {
      const hue2rgb = function hue2rgb2(p2, q3, t) {
        if (t < 0)
          t += 1;
        if (t > 1)
          t -= 1;
        if (t < 1 / 6)
          return p2 + (q3 - p2) * 6 * t;
        if (t < 1 / 2)
          return q3;
        if (t < 2 / 3)
          return p2 + (q3 - p2) * (2 / 3 - t) * 6;
        return p2;
      };
      const q2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q2;
      r = hue2rgb(p, q2, h + 1 / 3);
      g = hue2rgb(p, q2, h);
      b = hue2rgb(p, q2, h - 1 / 3);
    }
    return { r, g, b };
  }
  function hexToRGB(hex) {
    hex = formatHex(hex);
    return {
      r: parseInt(hex.slice(0, 2), 16) / 255,
      g: parseInt(hex.slice(2, 4), 16) / 255,
      b: parseInt(hex.slice(4, 6), 16) / 255
    };
  }
  function rgbToHex(color) {
    const r = pad2(decToHexString(color.r * 255));
    const g = pad2(decToHexString(color.g * 255));
    const b = pad2(decToHexString(color.b * 255));
    return ("#" + r + g + b).toUpperCase();
  }
  function decToHexString(number) {
    if (number < 0) {
      number = 4294967295 + number + 1;
    }
    number = Math.round(number).toString(16);
    return number === "100" ? "FF" : number;
  }
  function pad2(c) {
    return c.length == 1 ? "0" + c : "" + c;
  }

  // stylePlugin:/Users/tony/dev/orbit/src/orbit.module.css
  var orbit_module_default = {
    "container": "_container_190fa_1",
    "tools": "_tools_190fa_11",
    "controls": "_controls_190fa_21"
  };

  // src/services/color.js
  function ColorService(self) {
    const defaultColor = self.options.defaultColor || { h: 1, s: 0.5, l: 0.7 };
    const $hue = J(defaultColor.h);
    const $saturation = J(defaultColor.s);
    const $lightness = J(defaultColor.l);
    const $isDark = $lightness.map((l) => l < 0.5);
    return {
      $hue,
      $saturation,
      $lightness,
      $isDark
    };
  }

  // src/utils/swatchify.js
  var fontStack = '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif';
  function swatchify(color, scale = 1) {
    const canvas = document.createElement("canvas");
    const c = canvas.getContext("2d");
    const width = canvas.width = 640 * scale;
    const height = canvas.height = 200 * scale;
    c.fillStyle = "white";
    c.fillRect(0, 0, width, height);
    const swatchMargin = 45 * scale;
    const swatchSize = height - swatchMargin;
    c.fillStyle = color.hex;
    c.arc(height / 2, height / 2, swatchSize / 2, 0, 360, false);
    c.fill();
    const textMargin = height;
    c.fillStyle = "#222222";
    c.textBaseline = "middle";
    c.font = `bold ${42 * scale}px ${fontStack}`;
    c.fillText("HSL", textMargin, height / 4.5);
    c.fillText("HEX", textMargin, height / 2);
    c.fillText("RGB", textMargin, height / 4.5 * 3.5);
    const labelOffset = 110 * scale;
    c.font = `${42 * scale}px ${fontStack}`;
    c.fillText(color.hsl, textMargin + labelOffset, height / 4.5);
    c.fillText(color.hex, textMargin + labelOffset, height / 2);
    c.fillText(color.rgb, textMargin + labelOffset, height / 4.5 * 3.5);
    return canvas.toDataURL("image/png");
  }

  // stylePlugin:/Users/tony/dev/orbit/src/components/DownloadSwatch/DownloadSwatch.module.css
  var DownloadSwatch_module_default = {
    "button": "_button_isnxk_1"
  };

  // src/components/DownloadSwatch/DownloadSwatch.jsx
  function DownloadSwatch($attrs, self) {
    const { $hue, $saturation, $lightness, $isDark } = self.getService("color");
    function download() {
      const hsl = {
        h: $hue.get(),
        s: $saturation.get(),
        l: $lightness.get()
      };
      const rgb = hslToRGB(hsl);
      const hex = rgbToHex(rgb);
      const colors = {
        hsl: formatHSL(hsl),
        rgb: formatRGB(rgb),
        hex: formatHex(hex, true)
      };
      const swatch = swatchify(colors);
      const link = document.createElement("a");
      link.setAttribute("download", `swatch-${colors.hex.slice(1)}.png`);
      link.setAttribute("href", swatch);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    return /* @__PURE__ */ te("button", {
      class: DownloadSwatch_module_default.button,
      style: {
        "--button-color": $isDark.map((dark) => dark ? "#fff" : "#000"),
        "--button-hover-bg-color": $isDark.map((dark) => dark ? "#fff3" : "#0002")
      },
      onclick: download
    }, "Download Swatch");
  }

  // src/components/DownloadSwatch/index.js
  var DownloadSwatch_default = DownloadSwatch;

  // src/utils/validate.js
  function validateHex(hex) {
    if (hex[0] === "#")
      hex = hex.slice(1);
    if (hex.length !== 6 && hex.length !== 3)
      return false;
    const charList = "0123456789ABCDEF";
    for (let i = 0; i < hex.length; i++) {
      const c = hex[i];
      let match = false;
      for (let x = 0; x < charList.length; x++) {
        if (charList[x] === c.toUpperCase()) {
          match = true;
          break;
        }
      }
      if (!match)
        return false;
    }
    return true;
  }
  function validateHSL(hsl) {
    return hsl.h <= 1 && hsl.h >= 0 && hsl.s <= 1 && hsl.s >= 0 && hsl.l <= 1 && hsl.l >= 0;
  }
  function validateRGB(rgb) {
    return rgb.r <= 1 && rgb.r >= 0 && rgb.g <= 1 && rgb.g >= 0 && rgb.b <= 1 && rgb.b >= 0;
  }

  // stylePlugin:/Users/tony/dev/orbit/src/components/Formats/Formats.module.css
  var Formats_module_default = {
    "container": "_container_zj413_1",
    "format": "_format_zj413_6",
    "invalid": "_invalid_zj413_16",
    "focused": "_focused_zj413_20",
    "formatLabel": "_formatLabel_zj413_28",
    "formatInput": "_formatInput_zj413_35"
  };

  // src/components/Formats/Formats.jsx
  function Formats($attrs, self) {
    const { $hue, $saturation, $lightness, $isDark } = self.getService("color");
    const $hsl = Un($hue, $saturation, $lightness, (h, s, l) => {
      return { h, s, l };
    });
    const $rgb = $hsl.map(hslToRGB);
    const $hex = $rgb.map(rgbToHex);
    const $formattedHSL = $hsl.map(formatHSL);
    const $formattedRGB = $rgb.map(formatRGB);
    const $formattedHex = $hex.map((hex) => formatHex(hex, true));
    const $triggeredBy = J(null);
    return /* @__PURE__ */ te("div", {
      class: Formats_module_default.container,
      style: {
        "--selected-color": $hex,
        "--control-color": $isDark.map((dark) => dark ? "#fff" : "#000")
      }
    }, /* @__PURE__ */ te(FormatInput, {
      label: "HSL",
      value: $formattedHSL,
      ignoreValueUpdate: $triggeredBy.map((culprit) => culprit === "HSL"),
      parse: (value) => {
        value = value.replace("%", "").split(",").map((c) => parseInt(c));
        value = { h: value[0] / 360, s: value[1] / 100, l: value[2] / 100 };
        if (validateHSL(value)) {
          return value;
        } else {
          return false;
        }
      },
      onchange: (value) => {
        $triggeredBy.set("HSL");
        $hue.set(value.h);
        $saturation.set(value.s);
        $lightness.set(value.l);
      }
    }), /* @__PURE__ */ te(FormatInput, {
      label: "HEX",
      value: $formattedHex,
      ignoreValueUpdate: $triggeredBy.map((culprit) => culprit === "HEX"),
      parse: (value) => {
        if (validateHex(value)) {
          return rgbToHSL(hexToRGB(value));
        } else {
          return false;
        }
      },
      onchange: (value) => {
        $triggeredBy.set("HEX");
        $hue.set(value.h);
        $saturation.set(value.s);
        $lightness.set(value.l);
      }
    }), /* @__PURE__ */ te(FormatInput, {
      label: "RGB",
      value: $formattedRGB,
      ignoreValueUpdate: $triggeredBy.map((culprit) => culprit === "RGB"),
      parse: (value) => {
        value = value.split(",").map((c) => parseInt(c));
        value = { r: value[0] / 256, g: value[1] / 256, b: value[2] / 256 };
        if (validateRGB(value)) {
          return rgbToHSL(value);
        } else {
          return false;
        }
      },
      onchange: (value) => {
        $triggeredBy.set("RGB");
        $hue.set(value.h);
        $saturation.set(value.s);
        $lightness.set(value.l);
      }
    }));
  }
  function FormatInput($attrs, self) {
    const $value = $attrs.map("value");
    const $ignoreValueUpdate = $attrs.map("ignoreValueUpdate");
    const parse = $attrs.get("parse");
    const onchange = $attrs.get("onchange");
    const $focused = J(false);
    const $isValid = J(true);
    const $inputValue = J($value.get());
    const $label = Un($attrs, $isValid, (attrs, valid) => {
      if (valid) {
        return attrs.label;
      } else {
        return "\u{1F612}";
      }
    });
    let ignoreChange = false;
    self.watchState($inputValue, (value) => {
      const parsed = parse(value);
      if (parsed) {
        $isValid.set(true);
        if (ignoreChange) {
          ignoreChange = false;
          return;
        }
        onchange(parsed);
      } else {
        $isValid.set(false);
      }
    });
    self.watchState($value, (value) => {
      if ($ignoreValueUpdate.get()) {
        return;
      }
      ignoreChange = true;
      $inputValue.set(value);
    });
    return /* @__PURE__ */ te("div", {
      class: {
        [Formats_module_default.format]: true,
        [Formats_module_default.invalid]: $isValid.map((valid) => !valid),
        [Formats_module_default.focused]: $focused
      }
    }, /* @__PURE__ */ te("span", {
      class: Formats_module_default.formatLabel
    }, $label), /* @__PURE__ */ te("input", {
      class: Formats_module_default.formatInput,
      type: "text",
      value: Jn($inputValue),
      onfocus: () => {
        $focused.set(true);
      },
      onblur: () => {
        $focused.set(false);
      }
    }));
  }

  // src/components/Formats/index.js
  var Formats_default = Formats;

  // stylePlugin:/Users/tony/dev/orbit/src/components/Wheel/Wheel.module.css
  var Wheel_module_default = {
    "wheel": "_wheel_3dzec_1",
    "satAndLight": "_satAndLight_3dzec_12",
    "slider": "_slider_3dzec_25"
  };

  // stylePlugin:/Users/tony/dev/orbit/src/components/Wheel/FlatSlider/FlatSlider.module.css
  var FlatSlider_module_default = {
    "container": "_container_1eyf9_1",
    "label": "_label_1eyf9_10",
    "input": "_input_1eyf9_18",
    "active": "_active_1eyf9_27"
  };

  // src/components/Wheel/FlatSlider/FlatSlider.jsx
  function FlatSlider($attrs, self) {
    const { $isDark } = self.getService("color");
    const label = $attrs.get("label");
    const $value = $attrs.get("$value");
    const $activeKnobColor = $attrs.map("activeKnobColor");
    const $interacting = J(false);
    const $trackColor = $isDark.map((dark) => dark ? "#fff" : "#000");
    const $knobColor = Un($interacting, $trackColor, $activeKnobColor, (interacting, wheelColor, activeKnobColor) => {
      if (interacting) {
        return activeKnobColor;
      } else {
        return wheelColor;
      }
    });
    self.debug.name = `Slider:${label}`;
    function onInteractStart(e) {
      $interacting.set(true);
    }
    function onInteractEnd() {
      $interacting.set(false);
    }
    self.afterConnect(() => {
      window.addEventListener("mouseup", onInteractEnd);
      window.addEventListener("touchend", onInteractEnd);
    });
    self.afterDisconnect(() => {
      window.removeEventListener("mouseup", onInteractEnd);
      window.removeEventListener("touchend", onInteractEnd);
    });
    return /* @__PURE__ */ te("div", {
      class: FlatSlider_module_default.container,
      style: {
        "--track-color": $trackColor,
        "--knob-color": $knobColor
      }
    }, /* @__PURE__ */ te("span", {
      class: FlatSlider_module_default.label
    }, label), /* @__PURE__ */ te("input", {
      class: {
        [FlatSlider_module_default.input]: true,
        [FlatSlider_module_default.active]: $interacting
      },
      type: "range",
      min: 0,
      max: 1,
      step: 1e-4,
      value: $value,
      onmousedown: onInteractStart,
      ontouchstart: onInteractStart,
      oninput: (e) => {
        $value.set(Number(e.target.value));
      }
    }));
  }

  // src/components/Wheel/FlatSlider/index.js
  var FlatSlider_default = FlatSlider;

  // stylePlugin:/Users/tony/dev/orbit/src/components/Wheel/WheelSlider/WheelSlider.module.css
  var WheelSlider_module_default = {
    "container": "_container_1b4r7_1",
    "colors": "_colors_1b4r7_12",
    "visible": "_visible_1b4r7_27",
    "track": "_track_1b4r7_32",
    "knobRotator": "_knobRotator_1b4r7_43",
    "knob": "_knob_1b4r7_43",
    "active": "_active_1b4r7_65",
    "input": "_input_1b4r7_70"
  };

  // src/components/Wheel/WheelSlider/colors.png
  var colors_default = "./colors-IKLJG7ML.png";

  // src/components/Wheel/WheelSlider/WheelSlider.jsx
  function WheelSlider($attrs, self) {
    self.debug.name = "WheelSlider";
    const { $isDark } = self.getService("color");
    const $value = $attrs.get("$value");
    const $activeKnobColor = $attrs.map("activeKnobColor");
    const $interacting = J(false);
    const $wheelColor = $isDark.map((dark) => dark ? "#fff" : "#000");
    const $knobColor = Un($interacting, $wheelColor, $activeKnobColor, (interacting, wheelColor, activeKnobColor) => {
      if (interacting) {
        return activeKnobColor;
      } else {
        return wheelColor;
      }
    });
    const $trackRef = J();
    self.watchState($value, (value) => {
      self.debug.log("value", value);
    });
    self.watchState($interacting, (value) => {
      self.debug.log("interacting", value);
    });
    function onInteractStart(e) {
      e.preventDefault();
      $interacting.set(true);
      window.addEventListener("mousemove", onInteract);
      window.addEventListener("touchmove", onInteract);
    }
    function onInteract(e) {
      e.preventDefault();
      const rect = $trackRef.get().getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - centerX;
      const y = (e.touches ? e.touches[0].clientY : e.clientY) - centerY;
      let degs = Math.round(90 + Math.atan2(y, x) * (180 / Math.PI));
      if (degs < 0) {
        degs += 360;
      }
      $value.set(degs / 360);
    }
    function onInteractEnd(e) {
      $interacting.set(false);
      window.removeEventListener("mousemove", onInteract);
      window.removeEventListener("touchmove", onInteract);
    }
    self.afterConnect(() => {
      window.addEventListener("mouseup", onInteractEnd);
      window.addEventListener("touchend", onInteractEnd);
    });
    self.afterDisconnect(() => {
      window.removeEventListener("mouseup", onInteractEnd);
      window.removeEventListener("touchend", onInteractEnd);
    });
    return /* @__PURE__ */ te("div", {
      class: WheelSlider_module_default.container,
      style: {
        "--wheel-color": $wheelColor,
        "--knob-color": $knobColor
      }
    }, /* @__PURE__ */ te("img", {
      class: {
        [WheelSlider_module_default.colors]: true,
        [WheelSlider_module_default.visible]: $interacting
      },
      src: colors_default
    }), /* @__PURE__ */ te("div", {
      $ref: $trackRef,
      class: WheelSlider_module_default.track,
      style: {
        transform: $value.map((value) => `rotate(${value * 360}deg)`)
      }
    }, /* @__PURE__ */ te("div", {
      class: WheelSlider_module_default.knobRotator
    }, /* @__PURE__ */ te("div", {
      class: {
        [WheelSlider_module_default.knob]: true,
        [WheelSlider_module_default.active]: $interacting
      },
      onmousedown: onInteractStart,
      ontouchstart: onInteractStart
    }))));
  }

  // src/components/Wheel/WheelSlider/index.js
  var WheelSlider_default = WheelSlider;

  // src/components/Wheel/Wheel.jsx
  function Wheel($attrs, self) {
    const { $hue, $saturation, $lightness } = self.getService("color");
    return /* @__PURE__ */ te("div", {
      class: Wheel_module_default.wheel
    }, /* @__PURE__ */ te("div", {
      class: Wheel_module_default.hue
    }, /* @__PURE__ */ te(WheelSlider_default, {
      $value: $hue,
      activeKnobColor: $hue.map((h) => `hsl(${h * 360}, 100%, 50%)`)
    })), /* @__PURE__ */ te("div", {
      class: Wheel_module_default.satAndLight
    }, /* @__PURE__ */ te("div", {
      class: Wheel_module_default.slider
    }, /* @__PURE__ */ te(FlatSlider_default, {
      label: "Saturation",
      $value: $saturation,
      activeKnobColor: Un($hue, $saturation, (h, s) => `hsl(${h * 360}, ${s * 100}%, 50%)`)
    })), /* @__PURE__ */ te("div", {
      class: Wheel_module_default.slider
    }, /* @__PURE__ */ te(FlatSlider_default, {
      label: "Lightness",
      $value: $lightness,
      activeKnobColor: Un($hue, $lightness, (h, l) => `hsl(${h * 360}, 0%, ${l * 100}%)`)
    }))));
  }

  // src/components/Wheel/index.js
  var Wheel_default = Wheel;

  // src/orbit.jsx
  var app = In();
  app.service("color", ColorService);
  app.route("*", ($attrs, self) => {
    let ignoreHashChange = false;
    const { $hue, $saturation, $lightness } = self.getService("color");
    const $hex = Un($hue, $saturation, $lightness, (h, s, l) => {
      return rgbToHex(hslToRGB({ h, s, l }));
    });
    self.watchState($hex, (hex) => {
      ignoreHashChange = true;
      window.location.hash = hex;
    });
    function onHashChange() {
      if (ignoreHashChange) {
        ignoreHashChange = false;
        return;
      }
      if (validateHex(window.location.hash)) {
        const hsl = rgbToHSL(hexToRGB(window.location.hash));
        $hue.set(hsl.h);
        $saturation.set(hsl.s);
        $lightness.set(hsl.l);
      }
    }
    self.beforeConnect(() => {
      onHashChange();
      window.addEventListener("hashchange", onHashChange);
    });
    self.beforeDisconnect(() => {
      window.removeEventListener("hashchange", onHashChange);
    });
    return /* @__PURE__ */ te("div", {
      class: orbit_module_default.container,
      style: { backgroundColor: $hex }
    }, /* @__PURE__ */ te("aside", {
      class: orbit_module_default.tools
    }, /* @__PURE__ */ te(DownloadSwatch_default, null)), /* @__PURE__ */ te("main", {
      class: orbit_module_default.controls
    }, /* @__PURE__ */ te(Wheel_default, null), /* @__PURE__ */ te(Formats_default, null)));
  });
  app.connect("#app");
})();
//# sourceMappingURL=orbit.AEM7AZA7.js.map
