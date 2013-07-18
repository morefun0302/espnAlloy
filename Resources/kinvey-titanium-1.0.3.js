(function(define, module) {
    var window = this;
    var setTimeout = function(fn) {
        return window.setTimeout(fn, 0);
    };
    var exports = window.__KinveySocialAdapter = window;
    var originalRequire = require;
    require = function(module) {
        if (0 === module.indexOf("jsOAuth")) return exports;
        if (null != originalRequire) return originalRequire.apply(this, arguments);
    };
    var File = function() {};
    !function() {
        function e() {
            var c = function(u, f, i) {
                if (u !== c) {
                    var v = e();
                    return c.c.push({
                        d: v,
                        resolve: u,
                        reject: f
                    }), v.promise;
                }
                for (var s = f ? "resolve" : "reject", a = 0, p = c.c.length; p > a; a++) {
                    var h = c.c[a], l = h.d, j = h[s];
                    typeof j !== t ? l[s](i) : n(j, i, l);
                }
                c = r(o, i, f);
            }, o = {
                then: function(e, r) {
                    return c(e, r);
                }
            };
            return c.c = [], {
                promise: o,
                resolve: function(e) {
                    c.c && c(c, !0, e);
                },
                reject: function(e) {
                    c.c && c(c, !1, e);
                }
            };
        }
        function r(r, c, o) {
            return function(u, f) {
                var i, v = o ? u : f;
                return typeof v !== t ? r : (n(v, c, i = e()), i.promise);
            };
        }
        function n(e, r, n) {
            setTimeout(function() {
                try {
                    var c = e(r);
                    c && typeof c.then === t ? c.then(n.resolve, n.reject) : n.resolve(c);
                } catch (o) {
                    n.reject(o);
                }
            });
        }
        var t = "function";
        window.promiscuous = {
            resolve: function(e) {
                var n = {};
                return n.then = r(n, e, !0), n;
            },
            reject: function(e) {
                var n = {};
                return n.then = r(n, e, !1), n;
            },
            deferred: e
        };
    }();
    (function() {
        var l = new function() {
            function d(a) {
                return a ? 0 : -1;
            }
            var f = this.priority = function(a, b) {
                for (var c = a.exprs, e = 0, f = 0, d = c.length; d > f; f++) {
                    var g = c[f];
                    if (!~(g = g.e(g.v, b instanceof Date ? b.getTime() : b, b))) return -1;
                    e += g;
                }
                return e;
            }, e = this.parse = function(a, b) {
                a || (a = {
                    $eq: a
                });
                var c = [];
                if (a.constructor == Object) for (var d in a) {
                    var m = k[d] ? d : "$trav", j = a[d], g = j;
                    if (h[m]) {
                        if (~d.indexOf(".")) {
                            g = d.split(".");
                            d = g.shift();
                            for (var n = {}, l = n, p = 0, s = g.length - 1; s > p; p++) l = l[g[p]] = {};
                            l[g[p]] = j;
                            g = j = n;
                        }
                        if (j instanceof Array) {
                            g = [];
                            for (n = j.length; n--; ) g.push(e(j[n]));
                        } else g = e(j, d);
                    }
                    c.push(r(m, d, g));
                } else c.push(r("$eq", d, a));
                var q = {
                    exprs: c,
                    k: b,
                    test: function(a) {
                        return !!~q.priority(a);
                    },
                    priority: function(a) {
                        return f(q, a);
                    }
                };
                return q;
            }, h = this.traversable = {
                $and: !0,
                $or: !0,
                $nor: !0,
                $trav: !0,
                $not: !0
            }, k = this.testers = {
                $eq: function(a, b) {
                    return d(a.test(b));
                },
                $ne: function(a, b) {
                    return d(!a.test(b));
                },
                $lt: function(a, b) {
                    return a > b ? 0 : -1;
                },
                $gt: function(a, b) {
                    return b > a ? 0 : -1;
                },
                $lte: function(a, b) {
                    return a >= b ? 0 : -1;
                },
                $gte: function(a, b) {
                    return b >= a ? 0 : -1;
                },
                $exists: function(a, b) {
                    return a === (null != b) ? 0 : -1;
                },
                $in: function(a, b) {
                    if (!(b instanceof Array)) return d(~a.indexOf(b));
                    for (var c = b.length; c--; ) if (~a.indexOf(b[c])) return c;
                    return -1;
                },
                $not: function(a, b) {
                    if (!a.test) throw Error("$not test should include an expression, not a value. Use $ne instead.");
                    return d(!a.test(b));
                },
                $type: function(a, b, c) {
                    return c ? c instanceof a || c.constructor == a ? 0 : -1 : -1;
                },
                $nin: function(a, b) {
                    return ~k.$in(a, b) ? -1 : 0;
                },
                $mod: function(a, b) {
                    return b % a[0] == a[1] ? 0 : -1;
                },
                $all: function(a, b) {
                    for (var c = a.length; c--; ) if (-1 == b.indexOf(a[c])) return -1;
                    return 0;
                },
                $size: function(a, b) {
                    return b ? a == b.length ? 0 : -1 : -1;
                },
                $or: function(a, b) {
                    for (var c = a.length, d = c; c--; ) if (~f(a[c], b)) return c;
                    return 0 == d ? 0 : -1;
                },
                $nor: function(a, b) {
                    for (var c = a.length; c--; ) if (~f(a[c], b)) return -1;
                    return 0;
                },
                $and: function(a, b) {
                    for (var c = a.length; c--; ) if (!~f(a[c], b)) return -1;
                    return 0;
                },
                $trav: function(a, b) {
                    if (b instanceof Array) {
                        for (var c = b.length; c--; ) {
                            var d = b[c];
                            if (d[a.k] && ~f(a, d[a.k])) return c;
                        }
                        return -1;
                    }
                    return f(a, b ? b[a.k] : void 0);
                }
            }, m = {
                $eq: function(a) {
                    return a instanceof RegExp ? a : {
                        test: a instanceof Function ? a : function(b) {
                            return b instanceof Array ? ~b.indexOf(a) : a == b;
                        }
                    };
                },
                $ne: function(a) {
                    return m.$eq(a);
                }
            }, r = function(a, b, c) {
                c = c instanceof Date ? c.getTime() : c;
                return {
                    k: b,
                    v: m[a] ? m[a](c) : c,
                    e: k[a]
                };
            };
        }(), h = function(d, f, e) {
            "object" != typeof f && (e = f, f = void 0);
            if (e) {
                if ("function" != typeof e) throw Error("Unknown sift selector " + e);
            } else e = function(d) {
                return d;
            };
            var h = e, k = l.parse(d);
            e = function(d) {
                for (var a, b, e = [], c = 0, f = d.length; f > c; c++) a = h(d[c]), ~(b = k.priority(a)) && e.push({
                    value: a,
                    priority: b
                });
                e.sort(function(a, b) {
                    return a.priority > b.priority ? -1 : 1;
                });
                d = Array(e.length);
                for (c = e.length; c--; ) d[c] = e[c].value;
                return d;
            };
            e.test = k.test;
            e.score = k.priority;
            e.query = d;
            return f ? e(f) : e;
        };
        h.use = function(d) {
            d.operators && h.useOperators(d.operators);
        };
        h.useOperators = function(d) {
            for (var f in d) h.useOperator(f, d[f]);
        };
        h.useOperator = function(d, f) {
            var e = {}, e = "object" == typeof f ? f : {
                test: f
            }, h = "$" + d;
            l.testers[h] = e.test;
            (e.traversable || e.traverse) && (l.traversable[h] = !0);
        };
        "undefined" != typeof module && "undefined" != typeof module.exports ? module.exports = h : "undefined" != typeof window && (window.sift = h);
    })();
    var exports = exports || this;
    exports.OAuth = function(a) {
        function b(a) {
            var e, b = arguments, c = b.callee, f = (b.length, this);
            if (!(this instanceof c)) return new c(a);
            for (e in a) a.hasOwnProperty(e) && (f[e] = a[e]);
            return f;
        }
        function c() {}
        function d(a) {
            var d, f, g, h, i, j, k, b = arguments, c = b.callee, l = /^([^:\/?#]+?:\/\/)*([^\/:?#]*)?(:[^\/?#]*)*([^?#]*)(\?[^#]*)?(#(.*))*/, m = this;
            return this instanceof c ? (m.scheme = "", m.host = "", m.port = "", m.path = "", 
            m.query = new e(), m.anchor = "", null !== a && (d = a.match(l), f = d[1], g = d[2], 
            h = d[3], i = d[4], j = d[5], k = d[6], f = void 0 !== f ? f.replace("://", "").toLowerCase() : "http", 
            h = h ? h.replace(":", "") : "https" === f ? "443" : "80", f = "http" == f && "443" === h ? "https" : f, 
            j = j ? j.replace("?", "") : "", k = k ? k.replace("#", "") : "", ("https" === f && "443" !== h || "http" === f && "80" !== h) && (g = g + ":" + h), 
            m.scheme = f, m.host = g, m.port = h, m.path = i || "/", m.query.setQueryParams(j), 
            m.anchor = k || ""), void 0) : new c(a);
        }
        function e(a) {
            var e, b = arguments, c = b.callee, f = (b.length, this);
            if (g.urlDecode, !(this instanceof c)) return new c(a);
            if (void 0 != a) for (e in a) a.hasOwnProperty(e) && (f[e] = a[e]);
            return f;
        }
        function g(a) {
            return this instanceof g ? this.init(a) : new g(a);
        }
        function h(a) {
            var c, d, b = [];
            for (c in a) a[c] && void 0 !== a[c] && "" !== a[c] && ("realm" === c ? d = c + '="' + a[c] + '"' : b.push(c + '="' + g.urlEncode(a[c] + "") + '"'));
            return b.sort(), d && b.unshift(d), b.join(", ");
        }
        function i(a, b, c, d) {
            var f, e = [], h = g.urlEncode;
            for (f in c) void 0 !== c[f] && "" !== c[f] && e.push([ g.urlEncode(f), g.urlEncode(c[f] + "") ]);
            for (f in d) void 0 !== d[f] && "" !== d[f] && (c[f] || e.push([ h(f), h(d[f] + "") ]));
            return e = e.sort(function(a, b) {
                return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0;
            }).map(function(a) {
                return a.join("=");
            }), [ a, h(b), h(e.join("&")) ].join("&");
        }
        function j() {
            return parseInt(+new Date() / 1e3, 10);
        }
        function k(a) {
            function b() {
                return Math.floor(Math.random() * h.length);
            }
            a = a || 64;
            var g, c = a / 8, d = "", e = c / 4, f = c % 4, h = [ "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2A", "2B", "2C", "2D", "2E", "2F", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3A", "3B", "3C", "3D", "3E", "3F", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4A", "4B", "4C", "4D", "4E", "4F", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5A", "5B", "5C", "5D", "5E", "5F", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6A", "6B", "6C", "6D", "6E", "6F", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7A", "7B", "7C", "7D", "7E" ];
            for (g = 0; e > g; g++) d += h[b()] + h[b()] + h[b()] + h[b()];
            for (g = 0; f > g; g++) d += h[b()];
            return d;
        }
        function l() {
            var b;
            if ("undefined" != typeof a.Titanium && "undefined" != typeof a.Titanium.Network.createHTTPClient) b = a.Titanium.Network.createHTTPClient(); else if ("undefined" != typeof require) try {
                b = new require("xhr").XMLHttpRequest();
            } catch (c) {
                if ("undefined" == typeof a.XMLHttpRequest) throw "No valid request transport found.";
                b = new a.XMLHttpRequest();
            } else {
                if ("undefined" == typeof a.XMLHttpRequest) throw "No valid request transport found.";
                b = new a.XMLHttpRequest();
            }
            return b;
        }
        function m(a) {
            var b = new Array(++a);
            return b.join(0).split("");
        }
        function n(a) {
            var c, d, b = [];
            for (d = 0; a.length > d; d++) c = a.charCodeAt(d), 128 > c ? b.push(c) : 2048 > c ? b.push(192 + (c >> 6), 128 + (63 & c)) : 65536 > c ? b.push(224 + (c >> 12), 128 + (63 & c >> 6), 128 + (63 & c)) : 2097152 > c && b.push(240 + (c >> 18), 128 + (63 & c >> 12), 128 + (63 & c >> 6), 128 + (63 & c));
            return b;
        }
        function o(a) {
            var c, b = [];
            for (c = 0; 32 * a.length > c; c += 8) b.push(255 & a[c >>> 5] >>> 24 - c % 32);
            return b;
        }
        function p(a) {
            var d, b = [], c = a.length;
            for (d = 0; c > d; d++) b.push((a[d] >>> 4).toString(16)), b.push((15 & a[d]).toString(16));
            return b.join("");
        }
        function q(a) {
            var d, b = "", c = a.length;
            for (d = 0; c > d; d++) b += String.fromCharCode(a[d]);
            return b;
        }
        function r(a, b) {
            return a << b | a >>> 32 - b;
        }
        function s(a) {
            if (void 0 !== a) {
                var c, d, b = a;
                return b.constructor === String && (b = n(b)), c = this instanceof s ? this : new s(a), 
                d = c.hash(b), p(d);
            }
            return this instanceof s ? this : new s();
        }
        function t(a, b, c, d) {
            var h, i, j, k, e = n(b), f = n(c), g = e.length;
            for (g > a.blocksize && (e = a.hash(e), g = e.length), e = e.concat(m(a.blocksize - g)), 
            i = e.slice(0), j = e.slice(0), k = 0; a.blocksize > k; k++) i[k] ^= 92, j[k] ^= 54;
            return h = a.hash(i.concat(a.hash(j.concat(f)))), d ? p(h) : q(h);
        }
        c.prototype = {
            join: function(a) {
                return a = a || "", this.values().join(a);
            },
            keys: function() {
                var a, b = [], c = this;
                for (a in c) c.hasOwnProperty(a) && b.push(a);
                return b;
            },
            values: function() {
                var a, b = [], c = this;
                for (a in c) c.hasOwnProperty(a) && b.push(c[a]);
                return b;
            },
            shift: function() {
                throw "not implimented";
            },
            unshift: function() {
                throw "not implimented";
            },
            push: function() {
                throw "not implimented";
            },
            pop: function() {
                throw "not implimented";
            },
            sort: function() {
                throw "not implimented";
            },
            ksort: function(a) {
                var d, e, f, b = this, c = b.keys();
                for (void 0 == a ? c.sort() : c.sort(a), d = 0; c.length > d; d++) f = c[d], e = b[f], 
                delete b[f], b[f] = e;
                return b;
            },
            toObject: function() {
                var b, a = {}, c = this;
                for (b in c) c.hasOwnProperty(b) && (a[b] = c[b]);
                return a;
            }
        }, b.prototype = new c(), d.prototype = {
            scheme: "",
            host: "",
            port: "",
            path: "",
            query: "",
            anchor: "",
            toString: function() {
                var a = this, b = a.query + "";
                return a.scheme + "://" + a.host + a.path + ("" != b ? "?" + b : "") + ("" !== a.anchor ? "#" + a.anchor : "");
            }
        }, e.prototype = new b(), e.prototype.toString = function() {
            var a, b = this, c = [], d = "", e = "", f = g.urlEncode;
            b.ksort();
            for (a in b) b.hasOwnProperty(a) && void 0 != a && void 0 != b[a] && (e = f(a) + "=" + f(b[a]), 
            c.push(e));
            return c.length > 0 && (d = c.join("&")), d;
        }, e.prototype.setQueryParams = function(a) {
            var d, e, f, i, b = arguments, c = b.length, h = this, j = g.urlDecode;
            if (1 == c) {
                if ("object" == typeof a) for (d in a) a.hasOwnProperty(d) && (h[d] = j(a[d])); else if ("string" == typeof a) for (e = a.split("&"), 
                d = 0, f = e.length; f > d; d++) i = e[d].split("="), "" != i[0] && (h[i[0]] = j(i[1]));
            } else for (d = 0; c > d; d += 2) h[b[d]] = j(b[d + 1]);
        };
        var f = "1.0";
        return g.prototype = {
            realm: "",
            requestTokenUrl: "",
            authorizationUrl: "",
            accessTokenUrl: "",
            init: function(a) {
                var b = "", c = {
                    enablePrivilege: a.enablePrivilege || !1,
                    proxyUrl: a.proxyUrl,
                    callbackUrl: a.callbackUrl || "oob",
                    consumerKey: a.consumerKey,
                    consumerSecret: a.consumerSecret,
                    accessTokenKey: a.accessTokenKey || b,
                    accessTokenSecret: a.accessTokenSecret || b,
                    verifier: b,
                    signatureMethod: a.signatureMethod || "HMAC-SHA1"
                };
                return this.realm = a.realm || b, this.requestTokenUrl = a.requestTokenUrl || b, 
                this.authorizationUrl = a.authorizationUrl || b, this.accessTokenUrl = a.accessTokenUrl || b, 
                this.getAccessToken = function() {
                    return [ c.accessTokenKey, c.accessTokenSecret ];
                }, this.getAccessTokenKey = function() {
                    return c.accessTokenKey;
                }, this.getAccessTokenSecret = function() {
                    return c.accessTokenSecret;
                }, this.setAccessToken = function(a, b) {
                    b && (a = [ a, b ]), c.accessTokenKey = a[0], c.accessTokenSecret = a[1];
                }, this.getVerifier = function() {
                    return c.verifier;
                }, this.setVerifier = function(a) {
                    c.verifier = a;
                }, this.setCallbackUrl = function(a) {
                    c.callbackUrl = a;
                }, this.request = function(a) {
                    var b, e, m, n, o, p, q, r, s, t, u, v, x, z, A, B, w = [], y = {};
                    b = a.method || "GET", e = d(a.url), m = a.data || {}, n = a.headers || {}, o = a.success || function() {}, 
                    p = a.failure || function() {}, A = function() {
                        var a = !1;
                        for (var b in m) (m[b] instanceof File || "undefined" != typeof m[b].fileName) && (a = !0);
                        return a;
                    }(), x = a.appendQueryString ? a.appendQueryString : !1, c.enablePrivilege && netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead UniversalBrowserWrite"), 
                    q = l(), q.onreadystatechange = function() {
                        if (4 === q.readyState) {
                            var e, a = /^(.*?):\s*(.*?)\r?$/gm, b = n, c = {}, d = "";
                            if (q.getAllResponseHeaders) for (d = q.getAllResponseHeaders(); e = a.exec(d); ) c[e[1]] = e[2]; else if (q.getResponseHeaders) {
                                d = q.getResponseHeaders();
                                for (var f = 0, g = d.length; g > f; ++f) c[d[f][0]] = d[f][1];
                            }
                            var h = !1;
                            "Content-Type" in c && "text/xml" == c["Content-Type"] && (h = !0);
                            var i = {
                                text: q.responseText,
                                xml: h ? q.responseXML : "",
                                requestHeaders: b,
                                responseHeaders: c
                            };
                            q.status >= 200 && 226 >= q.status || 304 == q.status || 0 === q.status ? o(i) : q.status >= 400 && 0 !== q.status && p(i);
                        }
                    }, s = {
                        oauth_callback: c.callbackUrl,
                        oauth_consumer_key: c.consumerKey,
                        oauth_token: c.accessTokenKey,
                        oauth_signature_method: c.signatureMethod,
                        oauth_timestamp: j(),
                        oauth_nonce: k(),
                        oauth_verifier: c.verifier,
                        oauth_version: f
                    }, t = c.signatureMethod, z = e.query.toObject();
                    for (r in z) y[r] = z[r];
                    if (!("Content-Type" in n && "application/x-www-form-urlencoded" != n["Content-Type"] || A)) for (r in m) y[r] = m[r];
                    if (B = e.scheme + "://" + e.host + e.path, u = i(b, B, s, y), v = g.signatureMethod[t](c.consumerSecret, c.accessTokenSecret, u), 
                    s.oauth_signature = v, this.realm && (s.realm = this.realm), c.proxyUrl && (e = d(c.proxyUrl + e.path)), 
                    x || "GET" == b) e.query.setQueryParams(m), w = null; else if (A) {
                        if (A) {
                            w = new FormData();
                            for (r in m) w.append(r, m[r]);
                        }
                    } else if ("string" == typeof m) w = m, "Content-Type" in n || (n["Content-Type"] = "text/plain"); else {
                        for (r in m) w.push(g.urlEncode(r) + "=" + g.urlEncode(m[r] + ""));
                        w = w.sort().join("&"), "Content-Type" in n || (n["Content-Type"] = "application/x-www-form-urlencoded");
                    }
                    q.open(b, e + "", !0), q.setRequestHeader("Authorization", "OAuth " + h(s)), q.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                    for (r in n) q.setRequestHeader(r, n[r]);
                    q.send(w);
                }, this;
            },
            get: function(a, b, c) {
                this.request({
                    url: a,
                    success: b,
                    failure: c
                });
            },
            post: function(a, b, c, d) {
                this.request({
                    method: "POST",
                    url: a,
                    data: b,
                    success: c,
                    failure: d
                });
            },
            getJSON: function(a, b, c) {
                this.get(a, function(a) {
                    b(JSON.parse(a.text));
                }, c);
            },
            postJSON: function(a, b, c, d) {
                this.request({
                    method: "POST",
                    url: a,
                    data: JSON.stringify(b),
                    success: function(a) {
                        c(JSON.parse(a.text));
                    },
                    failure: d,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            },
            parseTokenRequest: function(a, b) {
                switch (b) {
                  case "text/xml":
                    var c = a.xml.getElementsByTagName("token"), d = a.xml.getElementsByTagName("secret");
                    i[g.urlDecode(c[0])] = g.urlDecode(d[0]);
                    break;

                  default:
                    for (var e = 0, f = a.text.split("&"), h = f.length, i = {}; h > e; ++e) {
                        var j = f[e].split("=");
                        i[g.urlDecode(j[0])] = g.urlDecode(j[1]);
                    }
                }
                return i;
            },
            fetchRequestToken: function(a, b) {
                var c = this;
                c.setAccessToken("", "");
                var d = c.authorizationUrl;
                this.get(this.requestTokenUrl, function(b) {
                    var e = c.parseTokenRequest(b, b.responseHeaders["Content-Type"] || void 0);
                    c.setAccessToken([ e.oauth_token, e.oauth_token_secret ]), a(d + "?" + b.text);
                }, b);
            },
            fetchAccessToken: function(a, b) {
                var c = this;
                this.get(this.accessTokenUrl, function(b) {
                    var d = c.parseTokenRequest(b, b.responseHeaders["Content-Type"] || void 0);
                    c.setAccessToken([ d.oauth_token, d.oauth_token_secret ]), c.setVerifier(""), a(b);
                }, b);
            }
        }, g.signatureMethod = {
            "HMAC-SHA1": function(b, c, d) {
                var e, f, h = g.urlEncode;
                return b = h(b), c = h(c || ""), e = b + "&" + c, f = t(s.prototype, e, d), a.btoa(f);
            }
        }, g.urlEncode = function(a) {
            function b(a) {
                var b = a.toString(16).toUpperCase();
                return 2 > b.length && (b = 0 + b), "%" + b;
            }
            if (!a) return "";
            a += "";
            var e, g, c = /[ \t\r\n!*"'();:@&=+$,\/?%#\[\]<>{}|`^\\\u0080-\uffff]/, d = a.length, f = a.split("");
            for (e = 0; d > e; e++) (g = f[e].match(c)) && (g = g[0].charCodeAt(0), 128 > g ? f[e] = b(g) : 2048 > g ? f[e] = b(192 + (g >> 6)) + b(128 + (63 & g)) : 65536 > g ? f[e] = b(224 + (g >> 12)) + b(128 + (63 & g >> 6)) + b(128 + (63 & g)) : 2097152 > g && (f[e] = b(240 + (g >> 18)) + b(128 + (63 & g >> 12)) + b(128 + (63 & g >> 6)) + b(128 + (63 & g))));
            return f.join("");
        }, g.urlDecode = function(a) {
            return a ? a.replace(/%[a-fA-F0-9]{2}/gi, function(a) {
                return String.fromCharCode(parseInt(a.replace("%", ""), 16));
            }) : "";
        }, s.prototype = new s(), s.prototype.blocksize = 64, s.prototype.hash = function(a) {
            function A(a, b, c, d) {
                switch (a) {
                  case 0:
                    return b & c | ~b & d;

                  case 1:
                  case 3:
                    return b ^ c ^ d;

                  case 2:
                    return b & c | b & d | c & d;
                }
                return -1;
            }
            var d, e, f, g, h, i, j, k, l, p, q, s, t, u, v, w, x, y, z, b = [ 1732584193, 4023233417, 2562383102, 271733878, 3285377520 ], c = [ 1518500249, 1859775393, 2400959708, 3395469782 ];
            for (a.constructor === String && (a = n(a.encodeUTF8())), f = a.length, g = Math.ceil((f + 9) / this.blocksize) * this.blocksize - (f + 9), 
            e = Math.floor(f / 4294967296), d = Math.floor(f % 4294967296), h = [ 255 & 8 * e >> 24, 255 & 8 * e >> 16, 255 & 8 * e >> 8, 255 & 8 * e, 255 & 8 * d >> 24, 255 & 8 * d >> 16, 255 & 8 * d >> 8, 255 & 8 * d ], 
            a = a.concat([ 128 ], m(g), h), i = Math.ceil(a.length / this.blocksize), j = 0; i > j; j++) {
                for (k = a.slice(j * this.blocksize, (j + 1) * this.blocksize), l = k.length, p = [], 
                q = 0; l > q; q++) p[q >>> 2] |= k[q] << 24 - 8 * (q - 4 * (q >> 2));
                for (s = b[0], t = b[1], u = b[2], v = b[3], w = b[4], x = 0; 80 > x; x++) x >= 16 && (p[x] = r(p[x - 3] ^ p[x - 8] ^ p[x - 14] ^ p[x - 16], 1)), 
                y = Math.floor(x / 20), z = r(s, 5) + A(y, t, u, v) + w + c[y] + p[x], w = v, v = u, 
                u = r(t, 30), t = s, s = z;
                b[0] += s, b[1] += t, b[2] += u, b[3] += v, b[4] += w;
            }
            return o(b);
        }, g;
    }(exports);
    var exports = exports || this;
    !function(a) {
        var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        a.btoa = a.btoa || function(a) {
            for (var e, f, c = 0, d = a.length, g = ""; d > c; c += 3) e = [ a.charCodeAt(c), a.charCodeAt(c + 1), a.charCodeAt(c + 2) ], 
            f = [ e[0] >> 2, (3 & e[0]) << 4 | e[1] >> 4, (15 & e[1]) << 2 | e[2] >> 6, 63 & e[2] ], 
            isNaN(e[1]) && (f[2] = 64), isNaN(e[2]) && (f[3] = 64), g += b.charAt(f[0]) + b.charAt(f[1]) + b.charAt(f[2]) + b.charAt(f[3]);
            return g;
        };
    }(exports);
    var exports = exports || this;
    exports.Google = function() {
        function e() {
            var e = this, t = this.oauthClient, o = Ti.UI.createWindow({
                title: this.windowTitle
            }), n = Ti.UI.createWebView(), i = Ti.UI.createView({
                backgroundColor: "black",
                opacity: .7,
                zIndex: 1
            }), r = Titanium.UI.createActivityIndicator({
                height: 50,
                width: 10,
                message: "Loading...",
                color: "white"
            }), c = Ti.UI.createButton({
                title: this.windowClose
            }), a = Ti.UI.createButton({
                title: this.windowBack
            });
            this.webView = n, o.leftNavButton = c, r.show(), i.add(r), o.add(i), o.open({
                modal: !0
            }), o.add(n), c.addEventListener("click", function() {
                o.close(), e.fireEvent("cancel", {
                    success: !1,
                    error: "The user cancelled.",
                    result: null
                });
            }), a.addEventListener("click", function() {
                n.goBack();
            }), n.addEventListener("beforeload", function() {
                s || o.add(i), r.show();
            }), n.addEventListener("load", function(n) {
                if (-1 !== n.url.indexOf("https://accounts.google.com/o/oauth2/approval")) {
                    o.remove(i), r.hide(), o.leftNavButton !== a && (o.leftNavButton = a), s || o.close();
                    var u = n.source.evalJS("document.getElementsByTagName('title')[0].innerText").split("=")[1];
                    t.post("https://accounts.google.com/o/oauth2/token", {
                        grant_type: "authorization_code",
                        client_id: e.consumerKey,
                        client_secret: e.consumerSecret,
                        code: u,
                        redirect_uri: e.callbackUrl
                    }, function(n) {
                        var i = JSON.parse(n.text);
                        t.setAccessToken([ i.access_token ]), e.accessTokenKey = i.access_token, e.refreshTokenKey = i.refresh_token, 
                        e.fireEvent("login", {
                            success: !0,
                            error: !1,
                            accessTokenKey: t.getAccessTokenKey(),
                            refreshTokenKey: e.refreshTokenKey,
                            expiresIn: i.expires_in
                        }), e.authorized = !0, s && o.close();
                    });
                } else o.remove(i), r.hide(), o.leftNavButton !== c && (o.leftNavButton = c);
            });
        }
        var t = function() {}, s = "android" === Ti.Platform.osname, o = require("jsOAuth-1.3.3"), n = function(e) {
            var s;
            return s = this instanceof n ? this : new t(), e || (e = {}), s.windowTitle = e.windowTitle || "Google Authorization", 
            s.windowClose = e.windowClose || "Close", s.windowBack = e.windowBack || "Back", 
            s.consumerKey = e.consumerKey, s.consumerSecret = e.consumerSecret, s.accessTokenKey = e.accessTokenKey, 
            s.refreshTokenKey = e.refreshTokenKey, s.scope = e.scope, s.authorized = !1, s.listeners = {}, 
            s.accessTokenKey && s.refreshTokenKey && (s.authorized = !0), s.callbackUrl = e.callbackUrl || "urn:ietf:wg:oauth:2.0:oob", 
            e.requestTokenUrl = e.requestTokenUrl || "https://accounts.google.com/o/oauth2/auth", 
            s.oauthClient = o.OAuth(e), s;
        };
        return t.prototype = n.prototype, n.prototype.authorize = function() {
            var t = this;
            this.authorized ? this.oauthClient.post("https://accounts.google.com/o/oauth2/token", {
                grant_type: "refresh_token",
                client_id: this.consumerKey,
                client_secret: this.consumerSecret,
                refresh_token: this.refreshTokenKey
            }, function(e) {
                var s = JSON.parse(e.text);
                t.oauthClient.setAccessToken([ s.access_token ]), t.accessTokenKey = s.access_token, 
                t.refreshTokenKey = s.refresh_token, t.fireEvent("login", {
                    success: !0,
                    error: !1,
                    accessTokenKey: t.oauthClient.getAccessTokenKey(),
                    refreshTokenKey: t.refreshTokenKey,
                    expiresIn: s.expires_in
                });
            }, function() {
                t.oauthClient.setAccessToken([ null ]), t.accessTokenKey = null, t.refreshTokenKey = null, 
                t.fireEvent("login", {
                    success: !1,
                    error: !0
                });
            }) : (e.call(this), this.oauthClient.setAccessToken("", ""), t.webView.url = this.oauthClient.requestTokenUrl + "?client_id=" + this.consumerKey + "&redirect_uri=" + this.callbackUrl + "&scope=" + this.scope + "&response_type=code");
        }, n.prototype.request = function(e, t, s, o, n) {
            var i = this, r = this.oauthClient, c = e;
            s.Authorization = "OAuth " + r.getAccessTokenKey(), r.request({
                method: o,
                url: c,
                data: t,
                headers: s,
                success: function(e) {
                    n.call(i, {
                        success: !0,
                        error: !1,
                        result: e
                    });
                },
                failure: function(e) {
                    n.call(i, {
                        success: !1,
                        error: "Request failed",
                        result: e
                    });
                }
            });
        }, n.prototype.logout = function(e) {
            this.oauthClient.setAccessToken("", ""), this.accessTokenKey = null, this.refreshTokenKey = null, 
            this.authorized = !1, e();
        }, n.prototype.addEventListener = function(e, t) {
            this.listeners = this.listeners || {}, this.listeners[e] = this.listeners[e] || [], 
            this.listeners[e].push(t);
        }, n.prototype.fireEvent = function(e, t) {
            for (var s = this.listeners[e] || [], o = 0; s.length > o; o++) s[o].call(this, t);
        }, n.prototype.refreshAccessToken = function() {
            var e = this;
            e.oauthClient.post("https://accounts.google.com/o/oauth2/token", {
                grant_type: "refresh_token",
                client_id: e.consumerKey,
                client_secret: e.consumerSecret,
                refresh_token: e.refreshTokenKey
            }, function(t) {
                var s = JSON.parse(t.text);
                e.oauthClient.setAccessToken([ s.access_token ]), e.accessTokenKey = s.access_token, 
                e.refreshTokenKey = s.refresh_token, e.fireEvent("refresh", {
                    success: !0,
                    error: !1,
                    accessTokenKey: e.oauthClient.getAccessTokenKey(),
                    refreshTokenKey: e.refreshTokenKey,
                    expiresIn: s.expires_in
                });
            }, function() {
                e.fireEvent("refresh", {
                    success: !1,
                    error: !0
                });
            });
        }, n;
    }(this);
    var exports = exports || this;
    exports.Linkedin = function() {
        function e() {
            var e = this, t = this.oauthClient, o = Ti.UI.createWindow({
                title: this.windowTitle
            }), n = Ti.UI.createWebView(), i = Ti.UI.createView({
                backgroundColor: "black",
                opacity: .7,
                zIndex: 1
            }), r = Titanium.UI.createActivityIndicator({
                height: 50,
                width: 10,
                message: "Loading...",
                color: "white"
            }), c = Ti.UI.createButton({
                title: this.windowClose
            }), a = Ti.UI.createButton({
                title: this.windowBack
            });
            this.webView = n, o.leftNavButton = c, r.show(), i.add(r), o.add(i), o.open({
                modal: !0
            }), o.add(n), c.addEventListener("click", function() {
                o.close(), e.fireEvent("cancel", {
                    success: !1,
                    error: "The user cancelled.",
                    result: null
                });
            }), a.addEventListener("click", function() {
                n.goBack();
            }), n.addEventListener("beforeload", function() {
                s || o.add(i), r.show();
            }), n.addEventListener("load", function(n) {
                if (-1 === n.url.indexOf(e.authorizeUrl)) o.remove(i), r.hide(), o.leftNavButton !== a && (o.leftNavButton = a); else {
                    o.leftNavButton !== c && (o.leftNavButton = c);
                    var u = n.source.evalJS("document.getElementsByClassName('access-code')[0].innerText");
                    u ? (s || o.close(), t.accessTokenUrl = "https://api.linkedin.com/uas/oauth/accessToken?oauth_verifier=" + u, 
                    t.fetchAccessToken(function() {
                        e.fireEvent("login", {
                            success: !0,
                            error: !1,
                            accessTokenKey: t.getAccessTokenKey(),
                            accessTokenSecret: t.getAccessTokenSecret()
                        }), e.authorized = !0, s && o.close();
                    }, function(t) {
                        e.fireEvent("login", {
                            success: !1,
                            error: "Failure to fetch access token, please try again.",
                            result: t
                        });
                    })) : (o.remove(i), r.hide());
                }
            });
        }
        var t = function() {}, s = "android" === Ti.Platform.osname, o = require("jsOAuth-1.3.3"), n = function(e) {
            var s;
            return s = this instanceof n ? this : new t(), e || (e = {}), s.windowTitle = e.windowTitle || "Linkedin Authorization", 
            s.windowClose = e.windowClose || "Close", s.windowBack = e.windowBack || "Back", 
            s.consumerKey = e.consumerKey, s.consumerSecret = e.consumerSecret, s.authorizeUrl = "https://www.linkedin.com/uas/oauth/authorize", 
            s.accessTokenKey = e.accessTokenKey, s.accessTokenSecret = e.accessTokenSecret, 
            s.scope = e.scope, s.authorized = !1, s.listeners = {}, s.accessTokenKey && (s.authorized = !0), 
            s.callbackUrl = e.callbackUrl || "oob", e.requestTokenUrl = e.requestTokenUrl || "https://api.linkedin.com/uas/oauth/requestToken", 
            s.oauthClient = o.OAuth(e), s;
        };
        return t.prototype = n.prototype, n.prototype.authorize = function() {
            var t = this;
            this.authorized ? setTimeout(function() {
                t.fireEvent("login", {
                    success: !0,
                    error: !1,
                    accessTokenKey: t.accessTokenKey,
                    accessTokenSecret: t.accessTokenSecret
                });
            }, 1) : (e.call(this), this.oauthClient.fetchRequestToken(function(e) {
                var s = t.authorizeUrl + e;
                t.webView.url = s;
            }, function(e) {
                t.fireEvent("login", {
                    success: !1,
                    error: "Failure to fetch access token, please try again.",
                    result: e
                });
            }));
        }, n.prototype.request = function(e, t, s, o, n) {
            var i, r = this, c = this.oauthClient;
            i = e.match(/^https?:\/\/.+/i) ? e : "https://api.linkedin.com/" + e, t.access_token = this.accessTokenKey, 
            c.request({
                method: o,
                url: i,
                data: t,
                headers: s,
                success: function(e) {
                    n.call(r, {
                        success: !0,
                        error: !1,
                        result: e
                    });
                },
                failure: function(e) {
                    n.call(r, {
                        success: !1,
                        error: "Request failed",
                        result: e
                    });
                }
            });
        }, n.prototype.logout = function(e) {
            this.oauthClient.setAccessToken("", ""), this.accessTokenKey = null, this.accessTokenSecret = null, 
            this.authorized = !1, e();
        }, n.prototype.addEventListener = function(e, t) {
            this.listeners = this.listeners || {}, this.listeners[e] = this.listeners[e] || [], 
            this.listeners[e].push(t);
        }, n.prototype.fireEvent = function(e, t) {
            for (var s = this.listeners[e] || [], o = 0; s.length > o; o++) s[o].call(this, t);
        }, n;
    }(this);
    var exports = exports || this;
    exports.Twitter = function() {
        function e() {
            var e = this, t = this.oauthClient, o = Ti.UI.createWindow({
                title: this.windowTitle
            }), n = Ti.UI.createWebView(), i = Ti.UI.createView({
                backgroundColor: "black",
                opacity: .7,
                zIndex: 1
            }), r = Titanium.UI.createActivityIndicator({
                height: 50,
                width: 10,
                message: "Loading...",
                color: "white"
            }), c = Ti.UI.createButton({
                title: this.windowClose
            }), a = Ti.UI.createButton({
                title: this.windowBack
            });
            this.webView = n, o.leftNavButton = c, r.show(), i.add(r), o.add(i), o.open({
                modal: !0
            }), o.add(n), c.addEventListener("click", function() {
                o.close(), e.fireEvent("cancel", {
                    success: !1,
                    error: "The user cancelled.",
                    result: null
                });
            }), a.addEventListener("click", function() {
                n.goBack();
            }), n.addEventListener("beforeload", function() {
                s || o.add(i), r.show();
            }), n.addEventListener("load", function(n) {
                if (-1 === n.url.indexOf(e.authorizeUrl)) o.remove(i), r.hide(), o.leftNavButton !== a && (o.leftNavButton = a); else {
                    o.leftNavButton !== c && (o.leftNavButton = c);
                    var u = n.source.evalJS("document.getElementById('oauth_pin').getElementsByTagName('code')[0].innerText");
                    u ? (s || o.close(), t.accessTokenUrl = "https://api.twitter.com/oauth/access_token?oauth_verifier=" + u, 
                    t.fetchAccessToken(function() {
                        e.fireEvent("login", {
                            success: !0,
                            error: !1,
                            accessTokenKey: t.getAccessTokenKey(),
                            accessTokenSecret: t.getAccessTokenSecret()
                        }), e.authorized = !0, s && o.close();
                    }, function(t) {
                        e.fireEvent("login", {
                            success: !1,
                            error: "Failure to fetch access token, please try again.",
                            result: t
                        });
                    })) : (o.remove(i), r.hide());
                }
            });
        }
        var t = function() {}, s = "android" === Ti.Platform.osname, o = require("jsOAuth-1.3.3"), n = function(e) {
            var s;
            return s = this instanceof n ? this : new t(), e || (e = {}), s.windowTitle = e.windowTitle || "Twitter Authorization", 
            s.windowClose = e.windowClose || "Close", s.windowBack = e.windowBack || "Back", 
            s.consumerKey = e.consumerKey, s.consumerSecret = e.consumerSecret, s.authorizeUrl = "https://api.twitter.com/oauth/authorize", 
            s.accessTokenKey = e.accessTokenKey, s.accessTokenSecret = e.accessTokenSecret, 
            s.authorized = !1, s.listeners = {}, s.accessTokenKey && s.accessTokenSecret && (s.authorized = !0), 
            e.requestTokenUrl = e.requestTokenUrl || "https://api.twitter.com/oauth/request_token", 
            s.oauthClient = o.OAuth(e), s;
        };
        return t.prototype = n.prototype, n.prototype.authorize = function() {
            var t = this;
            this.authorized ? setTimeout(function() {
                t.fireEvent("login", {
                    success: !0,
                    error: !1,
                    accessTokenKey: t.accessTokenKey,
                    accessTokenSecret: t.accessTokenSecret
                });
            }, 1) : (e.call(this), this.oauthClient.fetchRequestToken(function(e) {
                var s = t.authorizeUrl + e;
                t.webView.url = s;
            }, function(e) {
                t.fireEvent("login", {
                    success: !1,
                    error: "Failure to fetch access token, please try again.",
                    result: e
                });
            }));
        }, n.prototype.request = function(e, t, s, o, n) {
            var i, r = this, c = this.oauthClient;
            i = e.match(/^https?:\/\/.+/i) ? e : "https://api.twitter.com/" + e, c.request({
                method: o,
                url: i,
                data: t,
                headers: s,
                success: function(e) {
                    n.call(r, {
                        success: !0,
                        error: !1,
                        result: e
                    });
                },
                failure: function(e) {
                    n.call(r, {
                        success: !1,
                        error: "Request failed",
                        result: e
                    });
                }
            });
        }, n.prototype.logout = function(e) {
            this.oauthClient.setAccessToken("", ""), this.accessTokenKey = null, this.accessTokenSecret = null, 
            this.authorized = !1, e();
        }, n.prototype.addEventListener = function(e, t) {
            this.listeners = this.listeners || {}, this.listeners[e] = this.listeners[e] || [], 
            this.listeners[e].push(t);
        }, n.prototype.fireEvent = function(e, t) {
            for (var s = this.listeners[e] || [], o = 0; s.length > o; o++) s[o].call(this, t);
        }, n;
    }(this);
}).call(this);

(function() {
    var root = this;
    "undefined" == typeof KINVEY_DEBUG && (KINVEY_DEBUG = false);
    var log = function() {
        log.history = log.history || [];
        log.history.push(arguments);
        root.console && root.console.log.call(root.console, Array.prototype.slice.call(arguments));
    };
    var kinveyFn = function() {
        var Kinvey = function(options) {
            KINVEY_DEBUG && log("Obtaining a fresh copy of the library.", arguments);
            var Kinvey = kinveyFn();
            null != options && Kinvey.init(options);
            return Kinvey;
        };
        Kinvey.API_ENDPOINT = "https://baas.kinvey.com";
        Kinvey.API_VERSION = "3";
        Kinvey.SDK_VERSION = "1.0.3";
        Kinvey.appKey = null;
        Kinvey.appSecret = null;
        Kinvey.masterSecret = null;
        var DATA_STORE = "appdata";
        var FILES = "blob";
        var RPC = "rpc";
        var USERS = "user";
        var activeUser = null;
        var activeUserReady = false;
        var restoreActiveUser = function() {
            var promise = Storage.get("activeUser");
            return promise.then(function(user) {
                if (null == user) return Kinvey.setActiveUser(null);
                KINVEY_DEBUG && log("Restoring the active user.");
                var previous = Kinvey.setActiveUser({
                    _id: user[0],
                    _kmd: {
                        authtoken: user[1]
                    }
                });
                return Kinvey.User.me().then(null, function(error) {
                    KINVEY_DEBUG && log("Failed to restore the active user.", error);
                    Kinvey.Error.INVALID_CREDENTIALS === error.name && Kinvey.setActiveUser(previous);
                    return Kinvey.Defer.reject(error);
                });
            });
        };
        Kinvey.getActiveUser = function() {
            if (false === activeUserReady) throw new Kinvey.Error("Kinvey.getActiveUser can only be called after the promise returned by Kinvey.init fulfills or rejects.");
            return activeUser;
        };
        Kinvey.setActiveUser = function(user) {
            KINVEY_DEBUG && log("Setting the active user.", arguments);
            if (null != user && !(null != user._id && null != user._kmd && null != user._kmd.authtoken)) throw new Kinvey.Error("user argument must contain: _id, _kmd.authtoken.");
            false === activeUserReady && (activeUserReady = true);
            var result = Kinvey.getActiveUser();
            activeUser = user;
            null != user ? Storage.save("activeUser", [ user._id, user._kmd.authtoken ]) : Storage.destroy("activeUser");
            return result;
        };
        Kinvey.init = function(options) {
            KINVEY_DEBUG && log("Initializing the copy of the library.", arguments);
            options = options || {};
            if (null == options.appKey) throw new Kinvey.Error("options argument must contain: appKey.");
            if (null == options.appSecret && null == options.masterSecret) throw new Kinvey.Error("options argument must contain: appSecret and/or masterSecret.");
            activeUserReady = false;
            Kinvey.appKey = options.appKey;
            Kinvey.appSecret = null != options.appSecret ? options.appSecret : null;
            Kinvey.masterSecret = null != options.masterSecret ? options.masterSecret : null;
            var promise = Kinvey.Sync.init(options.sync).then(restoreActiveUser);
            return wrapCallbacks(promise, options);
        };
        Kinvey.ping = function(options) {
            KINVEY_DEBUG && log("Pinging the Kinvey service.", arguments);
            options = options || {};
            options.nocache = null == Kinvey.appKey ? false : options.nocache;
            var promise = Kinvey.Persistence.read({
                namespace: DATA_STORE,
                auth: null != Kinvey.appKey ? Auth.All : Auth.None
            }, options);
            KINVEY_DEBUG && promise.then(function(response) {
                log("Pinged the Kinvey service.", response);
            }, function(error) {
                log("Failed to ping the Kinvey service.", error);
            });
            return wrapCallbacks(promise, options);
        };
        Kinvey.Error = function(msg) {
            this.name = "Kinvey.Error";
            this.message = msg;
            this.stack = new Error().stack;
            KINVEY_DEBUG && log("A Kinvey.Error was thrown.", this.message, this.stack);
        };
        Kinvey.Error.prototype = new Error();
        Kinvey.Error.prototype.constructor = Kinvey.Error;
        Kinvey.Error.ENTITY_NOT_FOUND = "EntityNotFound";
        Kinvey.Error.COLLECTION_NOT_FOUND = "CollectionNotFound";
        Kinvey.Error.APP_NOT_FOUND = "AppNotFound";
        Kinvey.Error.USER_NOT_FOUND = "UserNotFound";
        Kinvey.Error.BLOB_NOT_FOUND = "BlobNotFound";
        Kinvey.Error.INVALID_CREDENTIALS = "InvalidCredentials";
        Kinvey.Error.KINVEY_INTERNAL_ERROR_RETRY = "KinveyInternalErrorRetry";
        Kinvey.Error.KINVEY_INTERNAL_ERROR_STOP = "KinveyInternalErrorStop";
        Kinvey.Error.USER_ALREADY_EXISTS = "UserAlreadyExists";
        Kinvey.Error.USER_UNAVAILABLE = "UserUnavailable";
        Kinvey.Error.DUPLICATE_END_USERS = "DuplicateEndUsers";
        Kinvey.Error.INSUFFICIENT_CREDENTIALS = "InsufficientCredentials";
        Kinvey.Error.WRITES_TO_COLLECTION_DISALLOWED = "WritesToCollectionDisallowed";
        Kinvey.Error.INDIRECT_COLLECTION_ACCESS_DISALLOWED = "IndirectCollectionAccessDisallowed";
        Kinvey.Error.APP_PROBLEM = "AppProblem";
        Kinvey.Error.PARAMETER_VALUE_OUT_OF_RANGE = "ParameterValueOutOfRange";
        Kinvey.Error.CORS_DISABLED = "CORSDisabled";
        Kinvey.Error.INVALID_QUERY_SYNTAX = "InvalidQuerySyntax";
        Kinvey.Error.MISSING_QUERY = "MissingQuery";
        Kinvey.Error.JSON_PARSE_ERROR = "JSONParseError";
        Kinvey.Error.MISSING_REQUEST_HEADER = "MissingRequestHeader";
        Kinvey.Error.INCOMPLETE_REQUEST_BODY = "IncompleteRequestBody";
        Kinvey.Error.MISSING_REQUEST_PARAMETER = "MissingRequestParameter";
        Kinvey.Error.INVALID_IDENTIFIER = "InvalidIdentifier";
        Kinvey.Error.BAD_REQUEST = "BadRequest";
        Kinvey.Error.FEATURE_UNAVAILABLE = "FeatureUnavailable";
        Kinvey.Error.API_VERSION_NOT_IMPLEMENTED = "APIVersionNotImplemented";
        Kinvey.Error.API_VERSION_NOT_AVAILABLE = "APIVersionNotAvailable";
        Kinvey.Error.INPUT_VALIDATION_FAILED = "InputValidationFailed";
        Kinvey.Error.BL_RUNTIME_ERROR = "BLRuntimeError";
        Kinvey.Error.BL_SYNTAX_ERROR = "BLSyntaxError";
        Kinvey.Error.BL_TIMEOUT_ERROR = "BLTimeoutError";
        Kinvey.Error.OAUTH_TOKEN_REFRESH_ERROR = "OAuthTokenRefreshError";
        Kinvey.Error.BL_VIOLATION_ERROR = "BLViolationError";
        Kinvey.Error.BL_INTERNAL_ERROR = "BLInternalError";
        Kinvey.Error.THIRD_PARTY_TOS_UNACKED = "ThirdPartyTOSUnacked";
        Kinvey.Error.STALE_REQUEST = "StaleRequest";
        Kinvey.Error.DATA_LINK_PARSE_ERROR = "DataLinkParseError";
        Kinvey.Error.NOT_IMPLEMENTED_ERROR = "NotImplementedError";
        Kinvey.Error.DATABASE_ERROR = "DatabaseError";
        Kinvey.Error.MISSING_APP_CREDENTIALS = "MissingAppCredentials";
        Kinvey.Error.MISSING_MASTER_CREDENTIALS = "MissingMasterCredentials";
        Kinvey.Error.NO_ACTIVE_USER = "NoActiveUser";
        Kinvey.Error.REQUEST_ABORT_ERROR = "RequestAbortError";
        Kinvey.Error.REQUEST_ERROR = "RequestError";
        Kinvey.Error.REQUEST_TIMEOUT_ERROR = "RequestTimeoutError";
        Kinvey.Error.SOCIAL_ERROR = "SocialError";
        Kinvey.Error.SYNC_ERROR = "SyncError";
        var ClientError = {};
        ClientError[Kinvey.Error.DATABASE_ERROR] = {
            name: Kinvey.Error.DATABASE_ERROR,
            description: "The database used for local persistence encountered an error.",
            debug: ""
        };
        ClientError[Kinvey.Error.MISSING_APP_CREDENTIALS] = {
            name: Kinvey.Error.MISSING_APP_CREDENTIALS,
            description: "Missing credentials: `Kinvey.appKey` and/or `Kinvey.appSecret`.",
            debug: "Did you forget to call `Kinvey.init`?"
        };
        ClientError[Kinvey.Error.MISSING_MASTER_CREDENTIALS] = {
            name: Kinvey.Error.MISSING_MASTER_CREDENTIALS,
            description: "Missing credentials: `Kinvey.appKey` and/or `Kinvey.masterSecret`.",
            debug: "Did you forget to call `Kinvey.init` with your Master Secret?"
        };
        ClientError[Kinvey.Error.NO_ACTIVE_USER] = {
            name: Kinvey.Error.NO_ACTIVE_USER,
            description: "No active user.",
            debug: "Try creating a user or logging in first."
        };
        ClientError[Kinvey.Error.REQUEST_ABORT_ERROR] = {
            name: Kinvey.Error.REQUEST_TIMEOUT_ERROR,
            description: "The request was aborted.",
            debug: ""
        };
        ClientError[Kinvey.Error.REQUEST_ERROR] = {
            name: Kinvey.Error.REQUEST_ERROR,
            description: "The request failed.",
            debug: ""
        };
        ClientError[Kinvey.Error.REQUEST_TIMEOUT_ERROR] = {
            name: Kinvey.Error.REQUEST_TIMEOUT_ERROR,
            description: "The request timed out.",
            debug: ""
        };
        ClientError[Kinvey.Error.SOCIAL_ERROR] = {
            name: Kinvey.Error.SOCIAL_ERROR,
            description: "The social identity cannot be obtained.",
            debug: ""
        };
        ClientError[Kinvey.Error.SYNC_ERROR] = {
            name: Kinvey.Error.SYNC_ERROR,
            description: "The synchronization operation cannot be completed.",
            debug: ""
        };
        var clientError = function(name, dict) {
            var error = ClientError[name] || {
                name: name
            };
            dict = dict || {};
            return {
                name: error.name,
                description: dict.description || error.description || "",
                debug: dict.debug || error.debug || ""
            };
        };
        var nextTick;
        nextTick = "function" == typeof root.setImmediate ? root.setImmediate : "undefined" != typeof process && process.nextTick ? process.nextTick : function(fn) {
            root.setTimeout(fn, 0);
        };
        var wrapCallbacks = function(promise, options) {
            promise.then(function(value) {
                options.success && options.success(value);
            }, function(reason) {
                options.error && options.error(reason);
            }).then(null, function(err) {
                nextTick(function() {
                    throw err;
                });
            });
            return promise;
        };
        var isArray = Array.isArray || function(arg) {
            return "[object Array]" === Object.prototype.toString.call(arg);
        };
        var isFunction = function(fn) {
            return "function" == typeof fn;
        };
        var isNumber = function(number) {
            return "[object Number]" === Object.prototype.toString.call(number) && !isNaN(number);
        };
        var isObject = function(obj) {
            return Object(obj) === obj;
        };
        var isRegExp = function(regExp) {
            return "[object RegExp]" === Object.prototype.toString.call(regExp);
        };
        var isString = function(str) {
            return "[object String]" === Object.prototype.toString.call(str);
        };
        var isEmpty = function(obj) {
            if (null == obj) return true;
            if (isArray(obj) || isString(obj)) return 0 === obj.length;
            for (var key in obj) if (obj.hasOwnProperty(key)) return false;
            return true;
        };
        var methodNotImplemented = function(methodName) {
            return function() {
                throw new Kinvey.Error("Method not implemented: " + methodName);
            };
        };
        var use = function(nsInterface) {
            return function(adapter) {
                var namespace = this;
                KINVEY_DEBUG && log("Applying an adapter.", namespace, adapter);
                adapter = adapter || {};
                nsInterface.forEach(function(methodName) {
                    if ("function" != typeof adapter[methodName]) throw new Kinvey.Error("Adapter must implement method: " + methodName);
                });
                nsInterface.forEach(function(methodName) {
                    namespace[methodName] = function() {
                        return adapter[methodName].apply(adapter, arguments);
                    };
                });
            };
        };
        var Storage = {
            destroy: function(key) {
                return Storage._destroy(Storage._key(key));
            },
            get: function(key) {
                return Storage._get(Storage._key(key));
            },
            save: function(key, value) {
                return Storage._save(Storage._key(key), value);
            },
            _destroy: methodNotImplemented("Storage.destroy"),
            _get: methodNotImplemented("Storage.get"),
            _key: function(key) {
                return [ "Kinvey", Kinvey.appKey, key ].join(".");
            },
            _save: methodNotImplemented("Storage.set"),
            use: use([ "_destroy", "_get", "_save" ])
        };
        Kinvey.Defer = {
            all: function(promises) {
                if (!isArray(promises)) throw new Kinvey.Error("promises argument must be of type: Array.");
                var pending = promises.length;
                if (0 === pending) return Kinvey.Defer.resolve([]);
                var deferred = Kinvey.Defer.deferred();
                var response = [];
                promises.forEach(function(promise, index) {
                    promise.then(function(value) {
                        pending -= 1;
                        response[index] = value;
                        0 === pending && deferred.resolve(response);
                    }, function(error) {
                        deferred.reject(error);
                    });
                });
                return deferred.promise;
            },
            resolve: function(value) {
                var deferred = Kinvey.Defer.deferred();
                deferred.resolve(value);
                return deferred.promise;
            },
            reject: function(reason) {
                var deferred = Kinvey.Defer.deferred();
                deferred.reject(reason);
                return deferred.promise;
            },
            deferred: methodNotImplemented("Kinvey.Defer.deferred"),
            use: use([ "deferred" ])
        };
        var implicitUserPromise = null;
        var Auth = {
            All: function() {
                return Auth.Session().then(null, Auth.Basic);
            },
            App: function() {
                if (null == Kinvey.appKey || null == Kinvey.appSecret) {
                    var error = clientError(Kinvey.Error.MISSING_APP_CREDENTIALS);
                    return Kinvey.Defer.reject(error);
                }
                var promise = Kinvey.Defer.resolve({
                    scheme: "Basic",
                    username: Kinvey.appKey,
                    password: Kinvey.appSecret
                });
                KINVEY_DEBUG && promise.then(function(response) {
                    log("Authenticating through App Secret.", response);
                });
                return promise;
            },
            Basic: function() {
                return Auth.Master().then(null, Auth.App);
            },
            Default: function() {
                return Auth.UserDefault().then(null, function() {
                    KINVEY_DEBUG && log("Creating an implicit user.");
                    KINVEY_DEBUG && null !== implicitUserPromise && log("An implicit user is already being created by another process, waiting.");
                    null === implicitUserPromise && (implicitUserPromise = Kinvey.User.create().then(function(user) {
                        KINVEY_DEBUG && log("Created the implicit user.", user);
                        implicitUserPromise = null;
                        return user;
                    }, function(error) {
                        implicitUserPromise = null;
                        return Kinvey.Defer.reject(error);
                    }));
                    return implicitUserPromise.then(Auth.Session);
                });
            },
            Master: function() {
                if (null == Kinvey.appKey || null == Kinvey.masterSecret) {
                    var error = clientError(Kinvey.Error.MISSING_MASTER_CREDENTIALS);
                    return Kinvey.Defer.reject(error);
                }
                var promise = Kinvey.Defer.resolve({
                    scheme: "Basic",
                    username: Kinvey.appKey,
                    password: Kinvey.masterSecret
                });
                KINVEY_DEBUG && promise.then(function(response) {
                    log("Authenticating through Master Secret.", response);
                });
                return promise;
            },
            None: function() {
                return Kinvey.Defer.resolve(null);
            },
            Session: function() {
                var user = Kinvey.getActiveUser();
                if (null === user) {
                    var error = clientError(Kinvey.Error.NO_ACTIVE_USER);
                    return Kinvey.Defer.reject(error);
                }
                var promise = Kinvey.Defer.resolve({
                    scheme: "Kinvey",
                    credentials: user._kmd.authtoken
                });
                KINVEY_DEBUG && promise.then(function(response) {
                    log("Authenticating through user credentials.", response);
                });
                return promise;
            },
            UserDefault: function() {
                return Auth.Session().then(null, Auth.Master);
            }
        };
        var deviceInformation = function() {
            var browser, platform, version, manufacturer, id, libraries = [];
            var browserDetect = function(ua) {
                ua = ua.toLowerCase();
                var rChrome = /(chrome)\/([\w]+)/;
                var rFirefox = /(firefox)\/([\w.]+)/;
                var rIE = /(msie) ([\w.]+)/i;
                var rOpera = /(opera)(?:.*version)?[ \/]([\w.]+)/;
                var rSafari = /(safari)\/([\w.]+)/;
                return rChrome.exec(ua) || rFirefox.exec(ua) || rIE.exec(ua) || rOpera.exec(ua) || rSafari.exec(ua) || [];
            };
            if ("undefined" != typeof root.cordova && "undefined" != typeof root.device) {
                var device = root.device;
                libraries.push("phonegap/" + device.cordova);
                platform = device.platform;
                version = device.version;
                manufacturer = device.model;
                id = device.uuid;
            } else if ("undefined" != typeof Titanium) {
                libraries.push("titanium/" + Titanium.getVersion());
                if ("mobileweb" === Titanium.Platform.getName()) {
                    browser = browserDetect(Titanium.Platform.getModel());
                    platform = browser[1];
                    version = browser[2];
                    manufacturer = Titanium.Platform.getOstype();
                } else {
                    platform = Titanium.Platform.getOsname();
                    version = Titanium.Platform.getVersion();
                    manufacturer = Titanium.Platform.getManufacturer();
                }
                id = Titanium.Platform.getId();
            } else if ("undefined" != typeof process) {
                platform = process.title;
                version = process.version;
                manufacturer = process.platform;
            }
            "undefined" != typeof angular && libraries.push("angularjs/" + angular.version.full);
            "undefined" != typeof Backbone && libraries.push("backbonejs/" + Backbone.VERSION);
            "undefined" != typeof Ember && libraries.push("emberjs/" + Ember.VERSION);
            "undefined" != typeof jQuery && libraries.push("jquery/" + jQuery.fn.jquery);
            "undefined" != typeof ko && libraries.push("knockout/" + ko.version);
            "undefined" != typeof Zepto && libraries.push("zeptojs");
            if (null == platform && root.navigator) {
                browser = browserDetect(root.navigator.userAgent);
                platform = browser[1];
                version = browser[2];
                manufacturer = root.navigator.platform;
            }
            var parts = [ "js-titanium/1.0.3" ];
            0 !== libraries.length && parts.push("(" + libraries.sort().join(", ") + ")");
            return parts.concat([ platform, version, manufacturer, id ].map(function(part) {
                return null != part ? part.toString().replace(/\s/g, "_").toLowerCase() : "unknown";
            })).join(" ");
        };
        Kinvey.Acl = function(document) {
            if (null != document && !isObject(document)) throw new Kinvey.Error("document argument must be of type: Object.");
            document = document || {};
            document._acl = document._acl || {};
            this._acl = document._acl;
        };
        Kinvey.Acl.prototype = {
            addReader: function(user) {
                this._acl.r = this._acl.r || [];
                -1 === this._acl.r.indexOf(user) && this._acl.r.push(user);
                return this;
            },
            addReaderGroup: function(group) {
                this._acl.groups = this._acl.groups || {};
                this._acl.groups.r = this._acl.groups.r || [];
                -1 === this._acl.groups.r.indexOf(group) && this._acl.groups.r.push(group);
                return this;
            },
            addWriterGroup: function(group) {
                this._acl.groups = this._acl.groups || {};
                this._acl.groups.w = this._acl.groups.w || [];
                -1 === this._acl.groups.w.indexOf(group) && this._acl.groups.w.push(group);
                return this;
            },
            addWriter: function(user) {
                this._acl.w = this._acl.w || [];
                -1 === this._acl.w.indexOf(user) && this._acl.w.push(user);
                return this;
            },
            getCreator: function() {
                return this._acl.creator || null;
            },
            getReaders: function() {
                return this._acl.r || [];
            },
            getReaderGroups: function() {
                return this._acl.groups ? this._acl.groups.r : [];
            },
            getWriterGroups: function() {
                return this._acl.groups ? this._acl.groups.w : [];
            },
            getWriters: function() {
                return this._acl.w || [];
            },
            isGloballyReadable: function() {
                return this._acl.gr || false;
            },
            isGloballyWritable: function() {
                return this._acl.gw || false;
            },
            removeReader: function(user) {
                var pos;
                this._acl.r && -1 !== (pos = this._acl.r.indexOf(user)) && this._acl.r.splice(pos, 1);
                return this;
            },
            removeReaderGroup: function(group) {
                var pos;
                this._acl.groups && this._acl.groups.r && -1 !== (pos = this._acl.groups.r.indexOf(group)) && this._acl.groups.r.splice(pos, 1);
                return this;
            },
            removeWriterGroup: function(group) {
                var pos;
                this._acl.groups && this._acl.groups.w && -1 !== (pos = this._acl.groups.w.indexOf(group)) && this._acl.groups.w.splice(pos, 1);
                return this;
            },
            removeWriter: function(user) {
                var pos;
                this._acl.w && -1 !== (pos = this._acl.w.indexOf(user)) && this._acl.w.splice(pos, 1);
                return this;
            },
            setGloballyReadable: function(gr) {
                this._acl.gr = gr || false;
                return this;
            },
            setGloballyWritable: function(gw) {
                this._acl.gw = gw || false;
                return this;
            },
            toJSON: function() {
                return this._acl;
            }
        };
        Kinvey.Group = function() {
            this._query = null;
            this._initial = {};
            this._key = {};
            this._reduce = function() {}.toString();
        };
        Kinvey.Group.prototype = {
            by: function(field) {
                this._key[field] = true;
                return this;
            },
            initial: function(objectOrKey, value) {
                if ("undefined" == typeof value && !isObject(objectOrKey)) throw new Kinvey.Error("objectOrKey argument must be of type: Object.");
                isObject(objectOrKey) ? this._initial = objectOrKey : this._initial[objectOrKey] = value;
                return this;
            },
            postProcess: function(response) {
                if (null === this._query) return response;
                return this._query._postProcess(response);
            },
            query: function(query) {
                if (!(query instanceof Kinvey.Query)) throw new Kinvey.Error("query argument must be of type: Kinvey.Query.");
                this._query = query;
                return this;
            },
            reduce: function(fn) {
                isFunction(fn) && (fn = fn.toString());
                if (!isString(fn)) throw new Kinvey.Error("fn argument must be of type: function or string.");
                this._reduce = fn;
                return this;
            },
            toJSON: function() {
                return {
                    key: this._key,
                    initial: this._initial,
                    reduce: this._reduce,
                    condition: null !== this._query ? this._query.toJSON().filter : {}
                };
            }
        };
        Kinvey.Group.count = function(field) {
            var agg = new Kinvey.Group();
            null != field && agg.by(field);
            agg.initial({
                result: 0
            });
            agg.reduce(function(doc, out) {
                out.result += 1;
            });
            return agg;
        };
        Kinvey.Group.sum = function(field) {
            field = field.replace("'", "\\'");
            var agg = new Kinvey.Group();
            agg.initial({
                result: 0
            });
            agg.reduce('function(doc, out) { out.result += doc["' + field + '"]; }');
            return agg;
        };
        Kinvey.Group.min = function(field) {
            field = field.replace("'", "\\'");
            var agg = new Kinvey.Group();
            agg.initial({
                result: "Infinity"
            });
            agg.reduce('function(doc, out) { out.result = Math.min(out.result, doc["' + field + '"]); }');
            return agg;
        };
        Kinvey.Group.max = function(field) {
            field = field.replace("'", "\\'");
            var agg = new Kinvey.Group();
            agg.initial({
                result: "-Infinity"
            });
            agg.reduce('function(doc, out) { out.result = Math.max(out.result, doc["' + field + '"]); }');
            return agg;
        };
        Kinvey.Group.average = function(field) {
            field = field.replace("'", "\\'");
            var agg = new Kinvey.Group();
            agg.initial({
                count: 0,
                result: 0
            });
            agg.reduce('function(doc, out) {  out.result = (out.result * out.count + doc["' + field + '"]) / (out.count + 1);' + "  out.count += 1;" + "}");
            return agg;
        };
        Kinvey.execute = function(id, args, options) {
            KINVEY_DEBUG && log("Executing custom command.", arguments);
            options = options || {};
            var promise = Kinvey.Persistence.create({
                namespace: RPC,
                collection: "custom",
                id: id,
                data: args,
                auth: Auth.Default
            }, options).then(null, function(error) {
                if (Kinvey.Error.REQUEST_ERROR === error.name && isObject(error.debug)) return Kinvey.Defer.reject(error.debug);
                return Kinvey.Defer.reject(error);
            });
            KINVEY_DEBUG && promise.then(function(response) {
                log("Executed the custom command.", response);
            }, function(error) {
                log("Failed to execute the custom command.", error);
            });
            return wrapCallbacks(promise, options);
        };
        Kinvey.DataStore = {
            find: function(collection, query, options) {
                KINVEY_DEBUG && log("Retrieving documents by query.", arguments);
                if (null != query && !(query instanceof Kinvey.Query)) throw new Kinvey.Error("query argument must be of type: Kinvey.Query.");
                options = options || {};
                var promise = Kinvey.Persistence.read({
                    namespace: DATA_STORE,
                    collection: collection,
                    query: query,
                    auth: Auth.Default,
                    local: {
                        req: true,
                        res: true
                    }
                }, options);
                KINVEY_DEBUG && promise.then(function(response) {
                    log("Retrieved the documents by query.", response);
                }, function(error) {
                    log("Failed to retrieve the documents by query.", error);
                });
                return wrapCallbacks(promise, options);
            },
            get: function(collection, id, options) {
                KINVEY_DEBUG && log("Retrieving a document.", arguments);
                options = options || {};
                var promise = Kinvey.Persistence.read({
                    namespace: DATA_STORE,
                    collection: collection,
                    id: id,
                    auth: Auth.Default,
                    local: {
                        req: true,
                        res: true
                    }
                }, options);
                KINVEY_DEBUG && promise.then(function(response) {
                    log("Retrieved the document.", response);
                }, function(error) {
                    log("Failed to retrieve the document.", error);
                });
                return wrapCallbacks(promise, options);
            },
            save: function(collection, document, options) {
                KINVEY_DEBUG && log("Saving a (new) document.", arguments);
                options = options || {};
                if (null != document._id) {
                    KINVEY_DEBUG && log("The document has an _id, updating instead.", arguments);
                    return Kinvey.DataStore.update(collection, document, options);
                }
                var promise = Kinvey.Persistence.create({
                    namespace: DATA_STORE,
                    collection: collection,
                    data: document,
                    auth: Auth.Default,
                    local: {
                        req: true,
                        res: true
                    }
                }, options);
                KINVEY_DEBUG && promise.then(function(response) {
                    log("Saved the new document.", response);
                }, function(error) {
                    log("Failed to save the new document.", error);
                });
                return wrapCallbacks(promise, options);
            },
            update: function(collection, document, options) {
                KINVEY_DEBUG && log("Updating a document.", arguments);
                if (null == document._id) throw new Kinvey.Error("document argument must contain: _id");
                options = options || {};
                var promise = Kinvey.Persistence.update({
                    namespace: DATA_STORE,
                    collection: collection,
                    id: document._id,
                    data: document,
                    auth: Auth.Default,
                    local: {
                        req: true,
                        res: true
                    }
                }, options);
                KINVEY_DEBUG && promise.then(function(response) {
                    log("Updated the document.", response);
                }, function(error) {
                    log("Failed to update the document.", error);
                });
                return wrapCallbacks(promise, options);
            },
            clean: function(collection, query, options) {
                KINVEY_DEBUG && log("Deleting documents by query.", arguments);
                options = options || {};
                query = query || new Kinvey.Query();
                if (!(query instanceof Kinvey.Query)) throw new Kinvey.Error("query argument must be of type: Kinvey.Query.");
                var promise = Kinvey.Persistence.destroy({
                    namespace: DATA_STORE,
                    collection: collection,
                    query: query,
                    auth: Auth.Default,
                    local: {
                        req: true,
                        res: true
                    }
                }, options);
                KINVEY_DEBUG && promise.then(function(response) {
                    log("Deleted the documents.", response);
                }, function(error) {
                    log("Failed to delete the documents.", error);
                });
                return wrapCallbacks(promise, options);
            },
            destroy: function(collection, id, options) {
                KINVEY_DEBUG && log("Deleting a document.", arguments);
                options = options || {};
                var promise = Kinvey.Persistence.destroy({
                    namespace: DATA_STORE,
                    collection: collection,
                    id: id,
                    auth: Auth.Default,
                    local: {
                        req: true,
                        res: true
                    }
                }, options).then(null, function(error) {
                    if (options.silent && Kinvey.Error.ENTITY_NOT_FOUND === error.name) {
                        KINVEY_DEBUG && log("The document does not exist. Returning success because of the silent flag.");
                        return {
                            count: 0
                        };
                    }
                    return Kinvey.Defer.reject(error);
                });
                KINVEY_DEBUG && promise.then(function(response) {
                    log("Deleted the document.", response);
                }, function(error) {
                    log("Failed to delete the document.", error);
                });
                return wrapCallbacks(promise, options);
            },
            count: function(collection, query, options) {
                KINVEY_DEBUG && log("Counting the number of documents.", arguments);
                if (null != query && !(query instanceof Kinvey.Query)) throw new Kinvey.Error("query argument must be of type: Kinvey.Query.");
                options = options || {};
                var promise = Kinvey.Persistence.read({
                    namespace: DATA_STORE,
                    collection: collection,
                    id: "_count",
                    query: query,
                    auth: Auth.Default,
                    local: {
                        req: true
                    }
                }, options).then(function(response) {
                    return response.count;
                });
                KINVEY_DEBUG && promise.then(function(response) {
                    log("Counted the number of documents.", response);
                }, function(error) {
                    log("Failed to count the number of documents.", error);
                });
                return wrapCallbacks(promise, options);
            },
            group: function(collection, aggregation, options) {
                KINVEY_DEBUG && log("Grouping documents", arguments);
                if (!(aggregation instanceof Kinvey.Group)) throw new Kinvey.Error("aggregation argument must be of type: Kinvey.Group.");
                options = options || {};
                var promise = Kinvey.Persistence.create({
                    namespace: DATA_STORE,
                    collection: collection,
                    id: "_group",
                    data: aggregation.toJSON(),
                    auth: Auth.Default,
                    local: {
                        req: true
                    }
                }, options).then(function(response) {
                    return aggregation.postProcess(response);
                });
                KINVEY_DEBUG && promise.then(function(response) {
                    log("Grouped the documents.", response);
                }, function(error) {
                    log("Failed to group the documents.", error);
                });
                return wrapCallbacks(promise, options);
            }
        };
        Kinvey.File = {
            destroy: function(id, options) {
                KINVEY_DEBUG && log("Deleting a file.", arguments);
                options = options || {};
                var promise = Kinvey.Persistence.destroy({
                    namespace: FILES,
                    id: id,
                    auth: Auth.Default
                }, options).then(null, function(error) {
                    if (options.silent && Kinvey.Error.BLOB_NOT_FOUND === error.name) {
                        KINVEY_DEBUG && log("The file does not exist. Returning success because of the silent flag.");
                        return {
                            count: 0
                        };
                    }
                    return Kinvey.Defer.reject(error);
                });
                KINVEY_DEBUG && promise.then(function(response) {
                    log("Deleted the file.", response);
                }, function(error) {
                    log("Failed to delete the file.", error);
                });
                return wrapCallbacks(promise, options);
            },
            download: function(id, options) {
                KINVEY_DEBUG && log("Downloading a file.", arguments);
                options = options || {};
                var flags = {};
                false !== options.tls && (flags.tls = true);
                options.ttl && (flags.ttl_in_seconds = options.ttl);
                var promise = Kinvey.Persistence.read({
                    namespace: FILES,
                    id: id,
                    flags: flags,
                    auth: Auth.Default
                }, options).then(function(response) {
                    if (options.stream) {
                        KINVEY_DEBUG && log("Returning the file metadata only because of the stream flag.");
                        return response;
                    }
                    var success = options.success;
                    var error = options.error;
                    delete options.success;
                    delete options.error;
                    return Kinvey.File.downloadByUrl(response, options).then(function(response) {
                        options.success = success;
                        options.error = error;
                        return response;
                    }, function(reason) {
                        options.success = success;
                        options.error = error;
                        return Kinvey.Defer.reject(reason);
                    });
                });
                KINVEY_DEBUG && promise.then(function(response) {
                    log("Downloaded the file.", response);
                }, function(error) {
                    log("Failed to download the file.", error);
                });
                return wrapCallbacks(promise, options);
            },
            downloadByUrl: function(metadataOrUrl, options) {
                KINVEY_DEBUG && log("Downloading a file by URL.", arguments);
                var metadata = isObject(metadataOrUrl) ? metadataOrUrl : {
                    _downloadURL: metadataOrUrl
                };
                options = options || {};
                options.file = metadata.mimeType || "application-octet-stream";
                options.headers = options.headers || {};
                delete options.headers["Content-Type"];
                var url = metadata._downloadURL;
                var download = Kinvey.Persistence.Net.request("GET", url, null, options.headers, options);
                download = download.then(function(data) {
                    metadata._data = data;
                    return metadata;
                }, function(reason) {
                    var error = clientError(Kinvey.Error.REQUEST_ERROR, {
                        description: "This file could not be downloaded from the provided URL.",
                        debug: reason
                    });
                    return Kinvey.Defer.reject(error);
                });
                KINVEY_DEBUG && download.then(function(response) {
                    log("Downloaded the file by URL.", response);
                }, function(error) {
                    log("Failed to download a file by URL.", error);
                });
                return wrapCallbacks(download, options);
            },
            find: function(query, options) {
                KINVEY_DEBUG && log("Retrieving files by query.", arguments);
                if (null != query && !(query instanceof Kinvey.Query)) throw new Kinvey.Error("query argument must be of type: Kinvey.Query.");
                options = options || {};
                var flags = {};
                false !== options.tls && (flags.tls = true);
                options.ttl && (flags.ttl_in_seconds = options.ttl);
                var promise = Kinvey.Persistence.read({
                    namespace: FILES,
                    query: query,
                    flags: flags,
                    auth: Auth.Default
                }, options).then(function(response) {
                    if (options.download) {
                        KINVEY_DEBUG && log("Obtaining the file resources.", response);
                        var success = options.success;
                        var error = options.error;
                        delete options.success;
                        delete options.error;
                        var promises = response.map(function(file) {
                            return Kinvey.File.downloadByUrl(file, options);
                        });
                        return Kinvey.Defer.all(promises).then(function(response) {
                            options.success = success;
                            options.error = error;
                            return response;
                        }, function(reason) {
                            options.success = success;
                            options.error = error;
                            return Kinvey.Defer.reject(reason);
                        });
                    }
                    return response;
                });
                KINVEY_DEBUG && promise.then(function(response) {
                    log("Retrieved the files by query.", response);
                }, function(error) {
                    log("Failed to retrieve the files by query.", error);
                });
                return wrapCallbacks(promise, options);
            },
            stream: function(name, options) {
                KINVEY_DEBUG && log("Streaming a file.", arguments);
                options = options || {};
                options.stream = true;
                return Kinvey.File.download(name, options);
            },
            upload: function(file, data, options) {
                KINVEY_DEBUG && log("Uploading a file.", arguments);
                file = file || {};
                data = data || {};
                options = options || {};
                null != data._filename || null == file._filename && null == file.name || (data._filename = file._filename || file.name);
                null != data.size || null == file.size && null == file.length || (data.size = file.size || file.length);
                data.mimeType = data.mimeType || file.mimeType || file.type || "application/octet-stream";
                options.public && (data._public = true);
                options.contentType = data.mimeType;
                var promise = null != data._id ? Kinvey.Persistence.update({
                    namespace: FILES,
                    id: data._id,
                    data: data,
                    flags: false !== options.tls ? {
                        tls: true
                    } : null,
                    auth: Auth.Default
                }, options) : Kinvey.Persistence.create({
                    namespace: FILES,
                    data: data,
                    flags: false !== options.tls ? {
                        tls: true
                    } : null,
                    auth: Auth.Default
                }, options);
                promise = promise.then(function(response) {
                    var url = response._uploadURL;
                    var headers = response._requiredHeaders || {};
                    headers["Content-Type"] = options.contentType;
                    delete response._expiresAt;
                    delete response._requiredHeaders;
                    delete response._uploadURL;
                    var upload = Kinvey.Persistence.Net.request("PUT", url, file, headers, options);
                    return upload.then(function() {
                        response._data = file;
                        return response;
                    });
                });
                KINVEY_DEBUG && promise.then(function(response) {
                    log("Uploaded the file.", response);
                }, function(error) {
                    log("Failed to upload the file.", error);
                });
                return wrapCallbacks(promise, options);
            }
        };
        Kinvey.Metadata = function(document) {
            if (!isObject(document)) throw new Kinvey.Error("document argument must be of type: Object.");
            this._acl = null;
            this._document = document;
        };
        Kinvey.Metadata.prototype = {
            getAcl: function() {
                null === this._acl && (this._acl = new Kinvey.Acl(this._document));
                return this._acl;
            },
            getCreatedAt: function() {
                if (null != this._document._kmd && null != this._document._kmd.ect) return new Date(this._document._kmd.ect);
                return null;
            },
            getEmailVerification: function() {
                if (null != this._document._kmd && null != this._document._kmd.emailVerification) return this._document._kmd.emailVerification.status;
                return null;
            },
            getLastModified: function() {
                if (null != this._document._kmd && null != this._document._kmd.lmt) return new Date(this._document._kmd.lmt);
                return null;
            },
            setAcl: function(acl) {
                if (!(acl instanceof Kinvey.Acl)) throw new Kinvey.Error("acl argument must be of type: Kinvey.Acl.");
                this._acl = null;
                this._document._acl = acl.toJSON();
                return this;
            },
            toJSON: function() {
                return this._document;
            }
        };
        var supportedProviders = [ "facebook", "google", "linkedIn", "twitter" ];
        var Social = {
            use: use(supportedProviders)
        };
        supportedProviders.forEach(function(provider) {
            Social[provider] = methodNotImplemented("Social." + provider);
        });
        Kinvey.Social = {
            connect: function(user, provider, options) {
                KINVEY_DEBUG && log("Linking a social identity to a Kinvey user.", arguments);
                options = options || {};
                options.create = "undefined" != typeof options.create ? options.create : true;
                if (!Kinvey.Social.isSupported(provider)) throw new Kinvey.Error("provider argument is not supported.");
                var success = options.success;
                var error = options.error;
                delete options.success;
                delete options.error;
                var promise = Social[provider](options).then(function(tokens) {
                    user = user || {};
                    var activeUser = Kinvey.getActiveUser();
                    user._socialIdentity = user._socialIdentity || {};
                    user._socialIdentity[provider] = tokens;
                    if (null !== activeUser && activeUser._id === user._id) {
                        options._provider = provider;
                        return Kinvey.User.update(user, options);
                    }
                    user._socialIdentity = {};
                    user._socialIdentity[provider] = tokens;
                    return Kinvey.User.login(user, null, options).then(null, function(error) {
                        if (options.create && Kinvey.Error.USER_NOT_FOUND === error.name) return Kinvey.User.signup(user, options);
                        return Kinvey.Defer.reject(error);
                    });
                });
                promise = promise.then(function(response) {
                    options.success = success;
                    options.error = error;
                    return response;
                });
                KINVEY_DEBUG && promise.then(function(response) {
                    log("Linked the social identity to the Kinvey user.", response);
                }, function(error) {
                    log("Failed to link a social identity to a Kinvey user.", error);
                });
                return wrapCallbacks(promise, options);
            },
            disconnect: function(user, provider, options) {
                KINVEY_DEBUG && log("Unlinking a social identity from a Kinvey user.", arguments);
                if (!Kinvey.Social.isSupported(provider)) throw new Kinvey.Error("provider argument is not supported.");
                user._socialIdentity = user._socialIdentity || {};
                user._socialIdentity[provider] = null;
                if (null == user._id) {
                    var promise = Kinvey.Defer.resolve(user);
                    return wrapCallbacks(promise, options);
                }
                return Kinvey.User.update(user, options);
            },
            facebook: function(user, options) {
                KINVEY_DEBUG && log("Linking a Facebook identity to a Kinvey user.", arguments);
                return Kinvey.Social.connect(user, "facebook", options);
            },
            google: function(user, options) {
                KINVEY_DEBUG && log("Linking a Google+ identity to a Kinvey user.", arguments);
                return Kinvey.Social.connect(user, "google", options);
            },
            isSupported: function(provider) {
                return -1 !== supportedProviders.indexOf(provider);
            },
            linkedIn: function(user, options) {
                KINVEY_DEBUG && log("Linking a LinkedIn identity to a Kinvey user.", arguments);
                return Kinvey.Social.connect(user, "linkedIn", options);
            },
            twitter: function(user, options) {
                KINVEY_DEBUG && log("Linking a Twitter identity to a Kinvey user.", arguments);
                return Kinvey.Social.connect(user, "twitter", options);
            }
        };
        Kinvey.User = {
            signup: function(data, options) {
                KINVEY_DEBUG && log("Signing up a new user.", arguments);
                options = options || {};
                options.state = true;
                return Kinvey.User.create(data, options);
            },
            login: function(usernameOrData, password, options) {
                KINVEY_DEBUG && log("Logging in an existing user.", arguments);
                isObject(usernameOrData) ? options = "undefined" != typeof options ? options : password : usernameOrData = {
                    username: usernameOrData,
                    password: password
                };
                options = options || {};
                return Kinvey.User.logout({
                    force: true,
                    silent: true
                }).then(function() {
                    var promise = Kinvey.Persistence.create({
                        namespace: USERS,
                        collection: options._provider ? null : "login",
                        data: usernameOrData,
                        flags: options._provider ? {
                            provider: options._provider
                        } : {},
                        auth: Auth.App,
                        local: {
                            res: true
                        }
                    }, options).then(function(user) {
                        Kinvey.setActiveUser(user);
                        return user;
                    });
                    KINVEY_DEBUG && promise.then(function(response) {
                        log("Logged in the user.", response);
                    }, function(error) {
                        log("Failed to login the user.", error);
                    });
                    return wrapCallbacks(promise, options);
                });
            },
            logout: function(options) {
                options = options || {};
                var promise;
                if (options.silent && null === Kinvey.getActiveUser()) promise = Kinvey.Defer.resolve(null); else {
                    KINVEY_DEBUG && log("Logging out the active user.", arguments);
                    promise = Kinvey.Persistence.create({
                        namespace: USERS,
                        collection: "_logout",
                        auth: Auth.Session
                    }, options).then(null, function(error) {
                        if (options.force && Kinvey.Error.INVALID_CREDENTIALS === error.name) {
                            KINVEY_DEBUG && log("The user credentials are invalid. Returning success because of the force flag.");
                            return null;
                        }
                        return Kinvey.Defer.reject(error);
                    }).then(function() {
                        var previous = Kinvey.setActiveUser(null);
                        null !== previous && delete previous._kmd.authtoken;
                        return previous;
                    });
                    KINVEY_DEBUG && promise.then(function(response) {
                        log("Logged out the active user.", response);
                    }, function(error) {
                        log("Failed to logout the active user.", error);
                    });
                }
                return wrapCallbacks(promise, options);
            },
            me: function(options) {
                KINVEY_DEBUG && log("Retrieving information on the active user.", arguments);
                options = options || {};
                var promise = Kinvey.Persistence.read({
                    namespace: USERS,
                    collection: "_me",
                    auth: Auth.Session,
                    local: {
                        req: true,
                        res: true
                    }
                }, options).then(function(user) {
                    user._kmd = user._kmd || {};
                    user._kmd.authtoken = Kinvey.getActiveUser()._kmd.authtoken;
                    Kinvey.setActiveUser(user);
                    return user;
                });
                KINVEY_DEBUG && promise.then(function(response) {
                    log("Retrieved information on the active user.", response);
                }, function(error) {
                    log("Failed to retrieve information on the active user.", error);
                });
                return wrapCallbacks(promise, options);
            },
            verifyEmail: function(username, options) {
                KINVEY_DEBUG && log("Requesting e-mail verification.", arguments);
                options = options || {};
                var promise = Kinvey.Persistence.create({
                    namespace: RPC,
                    collection: username,
                    id: "user-email-verification-initiate",
                    auth: Auth.App
                }, options);
                KINVEY_DEBUG && promise.then(function(response) {
                    log("Requested e-mail verification.", response);
                }, function(error) {
                    log("Failed to request e-mail verification.", error);
                });
                return wrapCallbacks(promise, options);
            },
            forgotUsername: function(email, options) {
                KINVEY_DEBUG && log("Requesting a username reminder.", arguments);
                options = options || {};
                var promise = Kinvey.Persistence.create({
                    namespace: RPC,
                    id: "user-forgot-username",
                    data: {
                        email: email
                    },
                    auth: Auth.App
                }, options);
                KINVEY_DEBUG && promise.then(function(response) {
                    log("Requested a username reminder.", response);
                }, function(error) {
                    log("Failed to request a username reminder.", error);
                });
                return wrapCallbacks(promise, options);
            },
            resetPassword: function(username, options) {
                KINVEY_DEBUG && log("Requesting a password reset.", arguments);
                options = options || {};
                var promise = Kinvey.Persistence.create({
                    namespace: RPC,
                    collection: username,
                    id: "user-password-reset-initiate",
                    auth: Auth.App
                }, options);
                KINVEY_DEBUG && promise.then(function(response) {
                    log("Requested a password reset.", response);
                }, function(error) {
                    log("Failed to request a password reset.", error);
                });
                return wrapCallbacks(promise, options);
            },
            exists: function(username, options) {
                KINVEY_DEBUG && log("Checking whether a username exists.", arguments);
                options = options || {};
                var promise = Kinvey.Persistence.create({
                    namespace: RPC,
                    id: "check-username-exists",
                    data: {
                        username: username
                    },
                    auth: Auth.App
                }, options).then(function(response) {
                    return response.usernameExists;
                });
                KINVEY_DEBUG && promise.then(function(response) {
                    log("Checked whether the username exists.", response);
                }, function(error) {
                    log("Failed to check whether the username exists.", error);
                });
                return wrapCallbacks(promise, options);
            },
            create: function(data, options) {
                KINVEY_DEBUG && log("Creating a new user.", arguments);
                options = options || {};
                var promise;
                promise = false !== options.state ? Kinvey.User.logout({
                    force: true,
                    silent: true
                }) : Kinvey.Defer.resolve(null);
                return promise.then(function() {
                    var promise = Kinvey.Persistence.create({
                        namespace: USERS,
                        data: data || {},
                        auth: Auth.App
                    }, options).then(function(user) {
                        false !== options.state && Kinvey.setActiveUser(user);
                        return user;
                    });
                    KINVEY_DEBUG && promise.then(function(response) {
                        log("Created the new user.", response);
                    }, function(error) {
                        log("Failed to create the new user.", error);
                    });
                    return wrapCallbacks(promise, options);
                });
            },
            update: function(data, options) {
                KINVEY_DEBUG && log("Updating a user.", arguments);
                if (null == data._id) throw new Kinvey.Error("data argument must contain: _id");
                options = options || {};
                var tokens = [];
                if (null != data._socialIdentity) for (var identity in data._socialIdentity) if (data._socialIdentity.hasOwnProperty(identity) && null != data._socialIdentity[identity] && identity !== options._provider) {
                    tokens.push({
                        provider: identity,
                        access_token: data._socialIdentity[identity].access_token,
                        access_token_secret: data._socialIdentity[identity].access_token_secret
                    });
                    delete data._socialIdentity[identity].access_token;
                    delete data._socialIdentity[identity].access_token_secret;
                }
                var promise = Kinvey.Persistence.update({
                    namespace: USERS,
                    id: data._id,
                    data: data,
                    auth: Auth.UserDefault,
                    local: {
                        res: true
                    }
                }, options).then(function(user) {
                    tokens.forEach(function(identity) {
                        var provider = identity.provider;
                        null != user._socialIdentity && null != user._socialIdentity[provider] && [ "access_token", "access_token_secret" ].forEach(function(field) {
                            null != identity[field] && (user._socialIdentity[provider][field] = identity[field]);
                        });
                    });
                    var activeUser = Kinvey.getActiveUser();
                    if (null !== activeUser && activeUser._id === user._id) {
                        KINVEY_DEBUG && log("Updating the active user because the updated user was the active user.");
                        Kinvey.setActiveUser(user);
                    }
                    return user;
                });
                KINVEY_DEBUG && promise.then(function(response) {
                    log("Updated the user.", response);
                }, function(error) {
                    log("Failed to update the user.", error);
                });
                return wrapCallbacks(promise, options);
            },
            find: function(query, options) {
                KINVEY_DEBUG && log("Retrieving users by query.", arguments);
                if (null != query && !(query instanceof Kinvey.Query)) throw new Kinvey.Error("query argument must be of type: Kinvey.Query.");
                options = options || {};
                var promise;
                if (options.discover) {
                    KINVEY_DEBUG && log("Using User Discovery because of the discover flag.");
                    promise = Kinvey.Persistence.create({
                        namespace: USERS,
                        collection: "_lookup",
                        data: null != query ? query.toJSON().filter : null,
                        auth: Auth.Default,
                        local: {
                            req: true,
                            res: true
                        }
                    }, options);
                } else promise = Kinvey.Persistence.read({
                    namespace: USERS,
                    query: query,
                    auth: Auth.Default,
                    local: {
                        req: true,
                        res: true
                    }
                }, options);
                KINVEY_DEBUG && promise.then(function(response) {
                    log("Retrieved the users by query.", response);
                }, function(error) {
                    log("Failed to retrieve the users by query.", error);
                });
                return wrapCallbacks(promise, options);
            },
            get: function(id, options) {
                KINVEY_DEBUG && log("Retrieving a user.", arguments);
                options = options || {};
                var promise = Kinvey.Persistence.read({
                    namespace: USERS,
                    id: id,
                    auth: Auth.Default,
                    local: {
                        req: true,
                        res: true
                    }
                }, options);
                KINVEY_DEBUG && promise.then(function(response) {
                    log("Retrieved the user.", response);
                }, function(error) {
                    log("Failed to return the user.", error);
                });
                return wrapCallbacks(promise, options);
            },
            destroy: function(id, options) {
                KINVEY_DEBUG && log("Deleting a user.", arguments);
                options = options || {};
                var promise = Kinvey.Persistence.destroy({
                    namespace: USERS,
                    id: id,
                    flags: options.hard ? {
                        hard: true
                    } : {},
                    auth: Auth.UserDefault,
                    local: {
                        res: true
                    }
                }, options).then(function(response) {
                    var activeUser = Kinvey.getActiveUser();
                    if (null !== activeUser && activeUser._id === id) {
                        KINVEY_DEBUG && log("Deleting the active user because the deleted user was the active user.");
                        Kinvey.setActiveUser(null);
                    }
                    return response;
                }, function(error) {
                    if (options.silent && Kinvey.Error.USER_NOT_FOUND === error.name) {
                        KINVEY_DEBUG && log("The user does not exist. Returning success because of the silent flag.");
                        return null;
                    }
                    return Kinvey.Defer.reject(error);
                });
                KINVEY_DEBUG && promise.then(function(response) {
                    log("Deleted the user.", response);
                }, function(error) {
                    log("Failed to delete the user.", error);
                });
                return wrapCallbacks(promise, options);
            },
            restore: function(id, options) {
                KINVEY_DEBUG && log("Restoring a previously disabled user.", arguments);
                options = options || {};
                var promise = Kinvey.Persistence.create({
                    namespace: USERS,
                    collection: id,
                    id: "_restore",
                    auth: Auth.Master
                }, options);
                KINVEY_DEBUG && promise.then(function(response) {
                    log("Restored the previously disabled user.", response);
                }, function(error) {
                    log("Failed to restore the previously disabled user.", error);
                });
                return wrapCallbacks(promise, options);
            },
            count: function(query, options) {
                KINVEY_DEBUG && log("Counting the number of users.", arguments);
                if (null != query && !(query instanceof Kinvey.Query)) throw new Kinvey.Error("query argument must be of type: Kinvey.Query.");
                options = options || {};
                var promise = Kinvey.Persistence.read({
                    namespace: USERS,
                    id: "_count",
                    query: query,
                    auth: Auth.Default,
                    local: {
                        req: true
                    }
                }, options).then(function(response) {
                    return response.count;
                });
                KINVEY_DEBUG && promise.then(function(response) {
                    log("Counted the number of users.", response);
                }, function(error) {
                    log("Failed to count the number of users.", error);
                });
                return wrapCallbacks(promise, options);
            },
            group: function(aggregation, options) {
                KINVEY_DEBUG && log("Grouping users.", arguments);
                if (!(aggregation instanceof Kinvey.Group)) throw new Kinvey.Error("aggregation argument must be of type: Kinvey.Group.");
                options = options || {};
                var promise = Kinvey.Persistence.create({
                    namespace: USERS,
                    id: "_group",
                    data: aggregation.toJSON(),
                    auth: Auth.Default,
                    local: {
                        req: true
                    }
                }, options).then(function(response) {
                    return aggregation.postProcess(response);
                });
                KINVEY_DEBUG && promise.then(function(response) {
                    log("Grouped the users.", response);
                }, function(error) {
                    log("Failed to group the users.", error);
                });
                return wrapCallbacks(promise, options);
            }
        };
        Kinvey.Query = function(options) {
            options = options || {};
            this._filter = options.filter || {};
            this._sort = options.sort || {};
            this._limit = options.limit || null;
            this._skip = options.skip || 0;
            this._parent = null;
        };
        Kinvey.Query.prototype = {
            equalTo: function(field, value) {
                this._filter[field] = value;
                return this;
            },
            contains: function(field, values) {
                if (!isArray(values)) throw new Kinvey.Error("values argument must be of type: Array.");
                return this._addFilter(field, "$in", values);
            },
            containsAll: function(field, values) {
                if (!isArray(values)) throw new Kinvey.Error("values argument must be of type: Array.");
                return this._addFilter(field, "$all", values);
            },
            greaterThan: function(field, value) {
                if (!(isNumber(value) || isString(value))) throw new Kinvey.Error("value argument must be of type: number or string.");
                return this._addFilter(field, "$gt", value);
            },
            greaterThanOrEqualTo: function(field, value) {
                if (!(isNumber(value) || isString(value))) throw new Kinvey.Error("value argument must be of type: number or string.");
                return this._addFilter(field, "$gte", value);
            },
            lessThan: function(field, value) {
                if (!(isNumber(value) || isString(value))) throw new Kinvey.Error("value argument must be of type: number or string.");
                return this._addFilter(field, "$lt", value);
            },
            lessThanOrEqualTo: function(field, value) {
                if (!(isNumber(value) || isString(value))) throw new Kinvey.Error("value argument must be of type: number or string.");
                return this._addFilter(field, "$lte", value);
            },
            notEqualTo: function(field, value) {
                return this._addFilter(field, "$ne", value);
            },
            notContainedIn: function(field, values) {
                if (!isArray(values)) throw new Kinvey.Error("values argument must be of type: Array.");
                return this._addFilter(field, "$nin", values);
            },
            and: function() {
                return this._join("$and", Array.prototype.slice.call(arguments));
            },
            nor: function() {
                if (null !== this._parent && null != this._parent._filter.$and) return this._parent.nor.apply(this._parent, arguments);
                return this._join("$nor", Array.prototype.slice.call(arguments));
            },
            or: function() {
                if (null !== this._parent) return this._parent.or.apply(this._parent, arguments);
                return this._join("$or", Array.prototype.slice.call(arguments));
            },
            exists: function(field, flag) {
                flag = "undefined" == typeof flag ? true : flag || false;
                return this._addFilter(field, "$exists", flag);
            },
            mod: function(field, divisor, remainder) {
                isString(divisor) && (divisor = parseFloat(divisor));
                "undefined" == typeof remainder ? remainder = 0 : isString(remainder) && (remainder = parseFloat(remainder));
                if (!isNumber(divisor)) throw new Kinvey.Error("divisor arguments must be of type: number.");
                if (!isNumber(remainder)) throw new Kinvey.Error("remainder argument must be of type: number.");
                return this._addFilter(field, "$mod", [ divisor, remainder ]);
            },
            matches: function(field, regExp, options) {
                isRegExp(regExp) || (regExp = new RegExp(regExp));
                options = options || {};
                var flags = [];
                (regExp.ignoreCase || options.ignoreCase) && false !== options.ignoreCase && flags.push("i");
                (regExp.multiline || options.multiline) && false !== options.multiline && flags.push("m");
                options.extended && flags.push("x");
                options.dotMatchesAll && flags.push("s");
                var result = this._addFilter(field, "$regex", regExp.source);
                0 !== flags.length && this._addFilter(field, "$options", flags.join(""));
                return result;
            },
            near: function(field, coord, maxDistance) {
                if (!isArray(coord) || null == coord[0] || null == coord[1]) throw new Kinvey.Error("coord argument must be of type: Array.<number, number>.");
                coord[0] = parseFloat(coord[0]);
                coord[1] = parseFloat(coord[1]);
                var result = this._addFilter(field, "$near", [ coord[0], coord[1] ]);
                null != maxDistance && this._addFilter(field, "$maxDistance", maxDistance);
                return result;
            },
            withinBox: function(field, bottomLeftCoord, upperRightCoord) {
                if (!isArray(bottomLeftCoord) || null == bottomLeftCoord[0] || null == bottomLeftCoord[1]) throw new Kinvey.Error("bottomLeftCoord argument must be of type: Array.<number, number>.");
                if (!isArray(upperRightCoord) || null == upperRightCoord[0] || null == upperRightCoord[1]) throw new Kinvey.Error("upperRightCoord argument must be of type: Array.<number, number>.");
                bottomLeftCoord[0] = parseFloat(bottomLeftCoord[0]);
                bottomLeftCoord[1] = parseFloat(bottomLeftCoord[1]);
                upperRightCoord[0] = parseFloat(upperRightCoord[0]);
                upperRightCoord[1] = parseFloat(upperRightCoord[1]);
                var coords = [ [ bottomLeftCoord[0], bottomLeftCoord[1] ], [ upperRightCoord[0], upperRightCoord[1] ] ];
                return this._addFilter(field, "$within", {
                    $box: coords
                });
            },
            withinPolygon: function(field, coords) {
                if (!isArray(coords) || 3 > coords.length) throw new Kinvey.Error("coords argument must be of type: Array.Array.<number, number>.");
                coords = coords.map(function(coord) {
                    if (null == coord[0] || null == coord[1]) throw new Kinvey.Error("coords argument must be of type: Array.Array.<number, number>.");
                    return [ parseFloat(coord[0]), parseFloat(coord[1]) ];
                });
                return this._addFilter(field, "$within", {
                    $polygon: coords
                });
            },
            size: function(field, size) {
                isString(size) && (size = parseFloat(size));
                if (!isNumber(size)) throw new Kinvey.Error("size argument must be of type: number.");
                return this._addFilter(field, "$size", size);
            },
            limit: function(limit) {
                limit = limit || null;
                isString(limit) && (limit = parseFloat(limit));
                if (null != limit && !isNumber(limit)) throw new Kinvey.Error("limit argument must be of type: number.");
                null !== this._parent ? this._parent.limit(limit) : this._limit = limit;
                return this;
            },
            skip: function(skip) {
                isString(skip) && (skip = parseFloat(skip));
                if (!isNumber(skip)) throw new Kinvey.Error("skip argument must be of type: number.");
                null !== this._parent ? this._parent.skip(skip) : this._skip = skip;
                return this;
            },
            ascending: function(field) {
                null !== this._parent ? this._parent.ascending(field) : this._sort[field] = 1;
                return this;
            },
            descending: function(field) {
                null !== this._parent ? this._parent.descending(field) : this._sort[field] = -1;
                return this;
            },
            sort: function(sort) {
                if (null != sort && !isObject(sort)) throw new Kinvey.Error("sort argument must be of type: Object.");
                null !== this._parent ? this._parent.sort(sort) : this._sort = sort || {};
                return this;
            },
            toJSON: function() {
                if (null !== this._parent) return this._parent.toJSON();
                return {
                    filter: this._filter,
                    sort: this._sort,
                    skip: this._skip,
                    limit: this._limit
                };
            },
            _addFilter: function(field, condition, value) {
                isObject(this._filter[field]) || (this._filter[field] = {});
                this._filter[field][condition] = value;
                return this;
            },
            _join: function(operator, queries) {
                var result = this;
                queries = queries.map(function(query) {
                    if (!(query instanceof Kinvey.Query)) {
                        if (!isObject(query)) throw new Kinvey.Error("query argument must be of type: Kinvey.Query[] or Object[].");
                        query = new Kinvey.Query(query);
                    }
                    return query.toJSON().filter;
                });
                if (0 === queries.length) {
                    result = new Kinvey.Query();
                    queries = [ result.toJSON().filter ];
                    result._parent = this;
                }
                var currentQuery = {};
                for (var member in this._filter) if (this._filter.hasOwnProperty(member)) {
                    currentQuery[member] = this._filter[member];
                    delete this._filter[member];
                }
                this._filter[operator] = [ currentQuery ].concat(queries);
                return result;
            },
            _postProcess: function(response) {
                if (!isArray(response)) throw new Kinvey.Error("response argument must be of type: Array.");
                var _this = this;
                response = response.sort(function(a, b) {
                    for (var field in _this._sort) if (_this._sort.hasOwnProperty(field)) {
                        if ("undefined" != typeof a[field] && "undefined" == typeof b[field]) return -1;
                        if ("undefined" != typeof b[field] && "undefined" == typeof a[field]) return 1;
                        if (a[field] !== b[field]) {
                            var modifier = _this._sort[field];
                            return (a[field] < b[field] ? -1 : 1) * modifier;
                        }
                    }
                    return 0;
                });
                if (null !== this._limit) return response.slice(this._skip, this._skip + this._limit);
                return response.slice(this._skip);
            }
        };
        var nested = function(document, dotProperty, value) {
            if (!dotProperty) {
                document = "undefined" == typeof value ? document : value;
                return document;
            }
            var obj = document;
            var parts = dotProperty.split(".");
            var current;
            while ((current = parts.shift()) && null != obj && obj.hasOwnProperty(current)) {
                if (0 === parts.length) {
                    obj[current] = "undefined" == typeof value ? obj[current] : value;
                    return obj[current];
                }
                obj = obj[current];
            }
            return null;
        };
        var KinveyReference = {
            get: function(document, options) {
                KINVEY_DEBUG && log("Retrieving relations for a document.", document, options);
                if (isArray(document)) {
                    var promises = document.map(function(member) {
                        return KinveyReference.get(member, options);
                    });
                    return Kinvey.Defer.all(promises);
                }
                options = options || {};
                options.exclude = options.exclude || [];
                options.relations = options.relations || {};
                var error = options.error;
                var relations = options.relations;
                var success = options.success;
                delete options.error;
                delete options.relations;
                delete options.success;
                var properties = [];
                Object.keys(relations).forEach(function(relation) {
                    var index = relation.split(".").length;
                    properties[index] = (properties[index] || []).concat(relation);
                });
                var promise = Kinvey.Defer.resolve(null);
                properties.forEach(function(relationalLevel) {
                    promise = promise.then(function() {
                        var promises = relationalLevel.map(function(property) {
                            var reference = nested(document, property);
                            var isArrayRelation = isArray(reference);
                            var promises = (isArrayRelation ? reference : [ reference ]).map(function(member) {
                                if (null == member || "KinveyRef" !== member._type || -1 !== options.exclude.indexOf(property)) return Kinvey.Defer.resolve(member);
                                var promise;
                                promise = USERS === member._collection ? Kinvey.User.get(member._id, options) : Kinvey.DataStore.get(member._collection, member._id, options);
                                return promise.then(null, function() {
                                    return Kinvey.Defer.resolve(member);
                                });
                            });
                            return Kinvey.Defer.all(promises).then(function(responses) {
                                nested(document, property, isArrayRelation ? responses : responses[0]);
                            });
                        });
                        return Kinvey.Defer.all(promises);
                    });
                });
                return promise.then(function() {
                    KINVEY_DEBUG && log("Retrieved relations for the document.", document);
                    options.error = error;
                    options.relations = relations;
                    options.success = success;
                    return document;
                }, function(reason) {
                    KINVEY_DEBUG && log("Failed to retrieve relations for the document.", document);
                    options.error = error;
                    options.relations = relations;
                    options.success = success;
                    return Kinvey.Defer.reject(reason);
                });
            },
            save: function(collection, document, options) {
                KINVEY_DEBUG && log("Saving a document with relations.", collection, document, options);
                if (isArray(document)) {
                    var promises = document.map(function(member) {
                        return KinveyReference.save(collection, member, options);
                    });
                    return Kinvey.Defer.all(promises);
                }
                options = options || {};
                options.exclude = options.exclude || [];
                options.relations = options.relations || {};
                var error = options.error;
                var relations = options.relations;
                var success = options.success;
                delete options.error;
                delete options.relations;
                delete options.success;
                var properties = [];
                relations[""] = collection;
                Object.keys(relations).forEach(function(relation) {
                    var index = "" === relation ? 0 : relation.split(".").length;
                    properties[index] = (properties[index] || []).concat(relation);
                });
                var documents = {};
                var promise = Kinvey.Defer.resolve(null);
                properties.reverse().forEach(function(relationalLevel) {
                    promise = promise.then(function() {
                        var promises = relationalLevel.map(function(property) {
                            var collection = relations[property];
                            var obj = nested(document, property);
                            var isArrayRelation = isArray(obj);
                            var promises = (isArrayRelation ? obj : [ obj ]).map(function(member) {
                                if (null == member || "KinveyRef" === member._type || -1 !== options.exclude.indexOf(property)) return Kinvey.Defer.resolve(member);
                                var saveUsingDataStore = options.offline && false === options.track;
                                var promise;
                                if (USERS !== collection || saveUsingDataStore) promise = Kinvey.DataStore.save(collection, member, options); else {
                                    var isNew = null == member._id;
                                    options.state = isNew && "" !== property ? options.state || false : options.state;
                                    promise = Kinvey.User[isNew ? "create" : "update"](member, options);
                                }
                                return promise.then(null, function(error) {
                                    if (options.force && "" !== property) return member;
                                    return Kinvey.Defer.reject(error);
                                });
                            });
                            return Kinvey.Defer.all(promises).then(function(responses) {
                                var reference = responses.map(function(response) {
                                    if (null == response || null == response._id) return response;
                                    return {
                                        _type: "KinveyRef",
                                        _collection: collection,
                                        _id: response._id
                                    };
                                });
                                if (!isArrayRelation) {
                                    reference = reference[0];
                                    responses = responses[0];
                                }
                                nested(document, property, reference);
                                documents[property] = responses;
                            });
                        });
                        return Kinvey.Defer.all(promises);
                    });
                });
                return promise.then(function() {
                    var response = documents[""];
                    properties.reverse().forEach(function(relationalLevel) {
                        relationalLevel.forEach(function(property) {
                            nested(response, property, documents[property]);
                        });
                    });
                    KINVEY_DEBUG && log("Saved the document with relations.", response);
                    delete relations[""];
                    options.error = error;
                    options.relations = relations;
                    options.success = success;
                    return response;
                }, function(reason) {
                    KINVEY_DEBUG && log("Failed to save the document with relations.", error);
                    delete relations[""];
                    options.error = error;
                    options.relations = relations;
                    options.success = success;
                    return Kinvey.Defer.reject(reason);
                });
            }
        };
        var persistenceOptions = function(options) {
            var isEnabled = Kinvey.Sync.isEnabled();
            var isOnline = Kinvey.Sync.isOnline();
            options.fallback = isEnabled && isOnline && false !== options.fallback;
            options.offline = isEnabled && (!isOnline || options.offline);
            options.refresh = isEnabled && isOnline && false !== options.refresh;
            return options;
        };
        Kinvey.Persistence = {
            create: function(request, options) {
                if (options.relations) {
                    var collection = USERS === request.namespace ? USERS : request.collection;
                    return KinveyReference.save(collection, request.data, options);
                }
                request.local = request.local || {};
                options = persistenceOptions(options);
                if (request.local.req && options.offline) {
                    KINVEY_DEBUG && log("Using local persistence.");
                    return Kinvey.Persistence.Local.create(request, options).then(null, function(error) {
                        if (options.fallback && "_group" === request.id) {
                            KINVEY_DEBUG && log("Local persistence failed. Use net persistence because of the fallback flag.");
                            options.offline = false;
                            return Kinvey.Persistence.create(request, options);
                        }
                        return Kinvey.Defer.reject(error);
                    });
                }
                KINVEY_DEBUG && log("Using net persistence.");
                var promise = Kinvey.Persistence.Net.create(request, options);
                if (request.local.res && options.refresh) {
                    KINVEY_DEBUG && log("Persisting the response locally.");
                    return promise.then(function(response) {
                        request.data = response;
                        return Kinvey.Persistence.Local.create(request, options).then(function() {
                            return response;
                        });
                    });
                }
                return promise;
            },
            read: function(request, options) {
                request.local = request.local || {};
                options = persistenceOptions(options);
                if (request.local.req && options.offline) {
                    KINVEY_DEBUG && log("Using local persistence.");
                    return Kinvey.Persistence.Local.read(request, options).then(null, function(error) {
                        if (options.fallback) {
                            KINVEY_DEBUG && log("Local persistence failed. Use net persistence because of the fallback flag.");
                            options.offline = false;
                            return Kinvey.Persistence.read(request, options);
                        }
                        return Kinvey.Defer.reject(error);
                    });
                }
                KINVEY_DEBUG && log("Using net persistence.");
                var promise = Kinvey.Persistence.Net.read(request, options);
                if (request.local.res && options.refresh) return promise.then(function(response) {
                    KINVEY_DEBUG && log("Persisting the response locally.");
                    var promise;
                    if (options.relations) {
                        var offline = options.offline;
                        options.offline = true;
                        options.track = false;
                        var collection = USERS === request.namespace ? USERS : request.collection;
                        promise = KinveyReference.save(collection, response, options).then(function() {
                            options.offline = offline;
                            delete options.track;
                        });
                    } else {
                        request.data = response;
                        promise = Kinvey.Persistence.Local.create(request, options);
                    }
                    return promise.then(function() {
                        return response;
                    });
                }, function(error) {
                    if (Kinvey.Error.ENTITY_NOT_FOUND === error.name) return Kinvey.Persistence.Local.destroy(request, options).then(function() {
                        return Kinvey.Defer.reject(error);
                    });
                    return Kinvey.Defer.reject(error);
                });
                return promise;
            },
            update: function(request, options) {
                if (options.relations) {
                    var collection = USERS === request.namespace ? USERS : request.collection;
                    return KinveyReference.save(collection, request.data, options);
                }
                request.local = request.local || {};
                options = persistenceOptions(options);
                if (request.local.req && options.offline) {
                    KINVEY_DEBUG && log("Using local persistence.");
                    return Kinvey.Persistence.Local.update(request, options);
                }
                KINVEY_DEBUG && log("Using net persistence..");
                var promise = Kinvey.Persistence.Net.update(request, options);
                if (request.local.res && options.refresh) {
                    KINVEY_DEBUG && log("Persisting the response locally.");
                    return promise.then(function(response) {
                        request.data = response;
                        return Kinvey.Persistence.Local.update(request, options).then(function() {
                            return response;
                        });
                    });
                }
                return promise;
            },
            destroy: function(request, options) {
                request.local = request.local || {};
                options = persistenceOptions(options);
                if (request.local.req && options.offline) {
                    KINVEY_DEBUG && log("Using local persistence.");
                    return Kinvey.Persistence.Local.destroy(request, options);
                }
                KINVEY_DEBUG && log("Using net persistence.");
                var promise = Kinvey.Persistence.Net.destroy(request, options);
                if (request.local.res && options.refresh) {
                    KINVEY_DEBUG && log("Persisting the response locally.");
                    return promise.then(function(response) {
                        return Kinvey.Persistence.Local.destroy(request, options).then(function() {
                            return response;
                        }, function(error) {
                            if (Kinvey.Error.ENTITY_NOT_FOUND === error.name) return response;
                            return Kinvey.Defer.reject(error);
                        });
                    });
                }
                return promise;
            }
        };
        var Database = {
            batch: methodNotImplemented("Database.batch"),
            clean: methodNotImplemented("Database.clean"),
            count: methodNotImplemented("Database.count"),
            destroy: methodNotImplemented("Database.destroy"),
            destruct: methodNotImplemented("Database.destruct"),
            find: methodNotImplemented("Database.find"),
            findAndModify: methodNotImplemented("Database.findAndModify"),
            get: methodNotImplemented("Database.get"),
            group: methodNotImplemented("Database.group"),
            save: methodNotImplemented("Database.save"),
            update: methodNotImplemented("Database.update"),
            use: use([ "batch", "clean", "count", "destroy", "destruct", "find", "findAndModify", "get", "group", "save", "update" ])
        };
        Kinvey.Persistence.Local = {
            create: function(request, options) {
                KINVEY_DEBUG && log("Initiating a create request.", arguments);
                options = options || {};
                var collection = USERS === request.namespace ? USERS : request.collection;
                if ("_group" === request.id) return Database.group(collection, request.data, options);
                var method = isArray(request.data) ? "batch" : "save";
                var promise = Database[method](collection, request.data, options);
                return promise.then(function(response) {
                    if (options.offline && false !== options.track) {
                        KINVEY_DEBUG && log("Notifying the synchronization functionality.", collection, response);
                        return Sync.notify(collection, response, options).then(function() {
                            return response;
                        });
                    }
                    return response;
                });
            },
            read: function(request, options) {
                KINVEY_DEBUG && log("Initiating a read request.", arguments);
                options = options || {};
                var collection = USERS === request.namespace ? USERS : request.collection;
                if ("_count" === request.id) return Database.count(collection, request.query, options);
                if ("_me" === request.collection) {
                    var user = Kinvey.getActiveUser();
                    if (null !== user) return Database.get(collection, user._id, options).then(null, function(error) {
                        if (error.name === Kinvey.Error.ENTITY_NOT_FOUND) return user;
                        return Kinvey.Defer.reject(error);
                    });
                    var error = clientError(Kinvey.Error.NO_ACTIVE_USER);
                    return Kinvey.Defer.reject(error);
                }
                var promise;
                promise = null == request.id ? Database.find(collection, request.query, options) : Database.get(collection, request.id, options);
                return promise.then(function(response) {
                    if (options.relations) return KinveyReference.get(response, options);
                    return response;
                });
            },
            update: function(request, options) {
                KINVEY_DEBUG && log("Initiating an update request.", arguments);
                options = options || {};
                var collection = USERS === request.namespace ? USERS : request.collection;
                var promise = Database.update(collection, request.data, options);
                return promise.then(function(response) {
                    if (options.offline && false !== options.track) {
                        KINVEY_DEBUG && log("Notifying the synchronization functionality.", collection, response);
                        return Sync.notify(collection, response, options).then(function() {
                            return response;
                        });
                    }
                    return response;
                });
            },
            destroy: function(request, options) {
                KINVEY_DEBUG && log("Initiating a delete request.", arguments);
                options = options || {};
                var collection = USERS === request.namespace ? USERS : request.collection;
                var promise;
                promise = null == request.id ? Database.clean(collection, request.query, options) : Database.destroy(collection, request.id, options);
                return promise.then(function(response) {
                    if (options.offline && false !== options.track) {
                        KINVEY_DEBUG && log("Notifying the synchronization functionality.", collection, response);
                        return Sync.notify(collection, response.documents, options).then(function() {
                            return response;
                        });
                    }
                    return response;
                });
            }
        };
        var deviceInformationHeader = null;
        Kinvey.Persistence.Net = {
            create: function(request, options) {
                KINVEY_DEBUG && log("Initiating a create request.", arguments);
                request.method = "POST";
                return Kinvey.Persistence.Net._request(request, options);
            },
            read: function(request, options) {
                KINVEY_DEBUG && log("Initiating a read request.", arguments);
                request.flags = request.flags || {};
                options = options || {};
                if (null != request.collection) {
                    false !== options.fileTls && (request.flags.kinveyfile_tls = true);
                    options.fileTtl && (request.flags.kinveyfile_ttl = options.fileTtl);
                }
                if (options.relations) {
                    options.exclude = options.exclude || [];
                    var resolve = Object.keys(options.relations).filter(function(member) {
                        return -1 === options.exclude.indexOf(member);
                    });
                    if (0 !== resolve.length) {
                        request.flags.retainReferences = false;
                        request.flags.resolve = resolve.join(",");
                    }
                }
                request.method = "GET";
                return Kinvey.Persistence.Net._request(request, options);
            },
            update: function(request, options) {
                KINVEY_DEBUG && log("Initiating an update request.", arguments);
                request.method = "PUT";
                return Kinvey.Persistence.Net._request(request, options);
            },
            destroy: function(request, options) {
                KINVEY_DEBUG && log("Initiating a delete request.", arguments);
                request.method = "DELETE";
                return Kinvey.Persistence.Net._request(request, options);
            },
            _request: function(request, options) {
                if (null == request.method) throw new Kinvey.Error("request argument must contain: method.");
                if (null == request.namespace) throw new Kinvey.Error("request argument must contain: namespace.");
                if (null == request.auth) throw new Kinvey.Error("request argument must contain: auth.");
                var error;
                if (null == Kinvey.appKey && Auth.None !== request.auth) {
                    error = clientError(Kinvey.Error.MISSING_APP_CREDENTIALS);
                    return Kinvey.Defer.reject(error);
                }
                if (null == Kinvey.masterSecret && options.skipBL) {
                    error = clientError(Kinvey.Error.MISSING_MASTER_CREDENTIALS);
                    return Kinvey.Defer.reject(error);
                }
                options.trace = options.trace || KINVEY_DEBUG && false !== options.trace;
                var segments = [ request.namespace, Kinvey.appKey, request.collection, request.id ];
                segments = segments.filter(function(value) {
                    return null != value;
                }).map(Kinvey.Persistence.Net.encode);
                var url = [ Kinvey.API_ENDPOINT ].concat(segments).join("/") + "/";
                var flags = request.flags || {};
                if (request.query) {
                    var query = request.query.toJSON();
                    flags.query = query.filter;
                    null !== query.limit && (flags.limit = query.limit);
                    0 !== query.skip && (flags.skip = query.skip);
                    isEmpty(query.sort) || (flags.sort = query.sort);
                }
                options.nocache && (flags._ = Math.random().toString(36).substr(2));
                var params = [];
                for (var key in flags) if (flags.hasOwnProperty(key)) {
                    var value = isString(flags[key]) ? flags[key] : JSON.stringify(flags[key]);
                    params.push(Kinvey.Persistence.Net.encode(key) + "=" + Kinvey.Persistence.Net.encode(value));
                }
                params.length > 0 && (url += "?" + params.join("&"));
                null === deviceInformationHeader && (deviceInformationHeader = deviceInformation());
                var headers = {
                    Accept: "application/json",
                    "X-Kinvey-API-Version": Kinvey.API_VERSION,
                    "X-Kinvey-Device-Information": deviceInformationHeader
                };
                null != request.data && (headers["Content-Type"] = "application/json; charset=utf-8");
                options.contentType && (headers["X-Kinvey-Content-Type"] = options.contentType);
                options.skipBL && (headers["X-Kinvey-Skip-Business-Logic"] = true);
                if (options.trace) {
                    headers["X-Kinvey-Include-Headers-In-Response"] = "X-Kinvey-Request-Id";
                    headers["X-Kinvey-ResponseWrapper"] = true;
                }
                if (KINVEY_DEBUG) {
                    headers["X-Kinvey-Trace-Request"] = true;
                    headers["X-Kinvey-Force-Debug-Log-Credentials"] = true;
                }
                var promise = request.auth().then(function(auth) {
                    if (null !== auth) {
                        var credentials = auth.credentials;
                        null != auth.username && (credentials = Kinvey.Persistence.Net.base64(auth.username + ":" + auth.password));
                        headers.Authorization = auth.scheme + " " + credentials;
                    }
                });
                return promise.then(function() {
                    var response = Kinvey.Persistence.Net.request(request.method, url, request.data, headers, options).then(function(response) {
                        response = JSON.parse(response);
                        KINVEY_DEBUG && options.trace && isObject(response) && log("Obtained the request ID.", response.headers["X-Kinvey-Request-Id"]);
                        return options.trace && isObject(response) ? response.result : response;
                    }, function(response) {
                        var requestId = null;
                        try {
                            response = JSON.parse(response);
                            if (options.trace) {
                                requestId = response.headers["X-Kinvey-Request-Id"];
                                response = response.result;
                            }
                        } catch (e) {}
                        if (null != response && null != response.error) {
                            response = {
                                name: response.error,
                                description: response.description || "",
                                debug: response.debug || ""
                            };
                            if (options.trace) {
                                response.requestId = requestId;
                                KINVEY_DEBUG && log("Obtained the request ID.", requestId);
                            }
                        } else {
                            var dict = {
                                abort: Kinvey.Error.REQUEST_ABORT_ERROR,
                                error: Kinvey.Error.REQUEST_ERROR,
                                timeout: Kinvey.Error.REQUEST_TIMEOUT_ERROR
                            };
                            response = clientError(dict[response] || dict.error, {
                                debug: response
                            });
                        }
                        return Kinvey.Defer.reject(response);
                    });
                    return response.then(null, function(error) {
                        Kinvey.Error.INVALID_CREDENTIALS === error.name && (error.debug += " It is possible the tokens used to execute the request are expired. In that case, please run `Kinvey.User.logout({ force: true })`, and then log back in  using`Kinvey.User.login(username, password)` to solve this issue.");
                        return Kinvey.Defer.reject(error);
                    });
                });
            },
            base64: methodNotImplemented("Kinvey.Persistence.Net.base64"),
            encode: methodNotImplemented("Kinvey.Persistence.Net.encode"),
            request: methodNotImplemented("Kinvey.Persistence.Net.request"),
            use: use([ "base64", "encode", "request" ])
        };
        var Sync = {
            enabled: false,
            online: true,
            system: "system.sync",
            count: function(collection, options) {
                options = options || {};
                if (null != collection) return Database.get(Sync.system, collection, options).then(function(response) {
                    return response.size;
                }, function(error) {
                    if (Kinvey.Error.ENTITY_NOT_FOUND === error.name) return 0;
                    return Kinvey.Defer.reject(error);
                });
                var agg = Kinvey.Group.sum("size").toJSON();
                return Database.group(Sync.system, agg, options).then(function(response) {
                    return response[0] ? response[0].result : 0;
                });
            },
            execute: function(options) {
                var query = new Kinvey.Query().greaterThan("size", 0);
                return Database.find(Sync.system, query, options).then(function(response) {
                    var promises = response.map(function(collection) {
                        return Sync._collection(collection._id, collection.documents, options);
                    });
                    return Kinvey.Defer.all(promises);
                });
            },
            notify: function(collection, documents, options) {
                return Database.findAndModify(Sync.system, collection, function(metadata) {
                    documents = isArray(documents) ? documents : [ documents ];
                    metadata = metadata || {
                        _id: collection,
                        documents: {},
                        size: 0
                    };
                    documents.forEach(function(document) {
                        metadata.documents.hasOwnProperty(document._id) || (metadata.size += 1);
                        var timestamp = null != document._kmd ? document._kmd.lmt : null;
                        metadata.documents[document._id] = timestamp;
                    });
                    return metadata;
                }, options).then(function() {
                    return null;
                });
            },
            _collection: function(collection, documents, options) {
                var result = {
                    collection: collection,
                    success: [],
                    error: []
                };
                var identifiers = Object.keys(documents);
                var request = {
                    namespace: USERS === collection ? USERS : DATA_STORE,
                    collection: USERS === collection ? null : collection,
                    query: new Kinvey.Query().contains("_id", identifiers),
                    auth: Auth.Default
                };
                var promises = [ Kinvey.Persistence.Local.read(request, options), Kinvey.Persistence.Net.read(request, options) ];
                return Kinvey.Defer.all(promises).then(function(responses) {
                    var response = {
                        local: {},
                        net: {}
                    };
                    responses[0].forEach(function(document) {
                        response.local[document._id] = document;
                    });
                    responses[1].forEach(function(document) {
                        response.net[document._id] = document;
                    });
                    return response;
                }).then(function(response) {
                    var promises = identifiers.map(function(id) {
                        return Sync._document(collection, {
                            id: id,
                            timestamp: documents[id]
                        }, response.local[id] || null, response.net[id] || null, options).then(null, function(response) {
                            result.error.push(response.id);
                            return null;
                        });
                    });
                    return Kinvey.Defer.all(promises);
                }).then(function(responses) {
                    var created = responses.filter(function(response) {
                        return null != response && null !== response.document;
                    });
                    var destroyed = responses.filter(function(response) {
                        return null != response && null === response.document;
                    });
                    var promises = [ Sync._save(collection, created, options), Sync._destroy(collection, destroyed, options) ];
                    return Kinvey.Defer.all(promises);
                }).then(function(responses) {
                    result.success = result.success.concat(responses[0].success, responses[1].success);
                    result.error = result.error.concat(responses[0].error, responses[1].error);
                    return Database.findAndModify(Sync.system, collection, function(metadata) {
                        result.success.forEach(function(id) {
                            if (metadata.documents.hasOwnProperty(id)) {
                                metadata.size -= 1;
                                delete metadata.documents[id];
                            }
                        });
                        return metadata;
                    }, options);
                }).then(function() {
                    return result;
                });
            },
            _destroy: function(collection, documents, options) {
                documents = documents.map(function(composite) {
                    return composite.id;
                });
                if (0 === documents.length) return Kinvey.Defer.resolve({
                    success: [],
                    error: []
                });
                var request = {
                    namespace: USERS === collection ? USERS : DATA_STORE,
                    collection: USERS === collection ? null : collection,
                    query: new Kinvey.Query().contains("_id", documents),
                    auth: Auth.Default
                };
                var promises = [ Kinvey.Persistence.Local.destroy(request, options), Kinvey.Persistence.Net.destroy(request, options) ];
                return Kinvey.Defer.all(promises).then(function() {
                    return {
                        success: documents,
                        error: []
                    };
                }, function() {
                    return {
                        success: [],
                        error: documents
                    };
                });
            },
            _document: function(collection, metadata, local, net, options) {
                if (null === net || null != net._kmd && metadata.timestamp === net._kmd.lmt) return Kinvey.Defer.resolve({
                    id: metadata.id,
                    document: local
                });
                if (null != options.conflict) return options.conflict(collection, local, net).then(function(document) {
                    return {
                        id: metadata.id,
                        document: document
                    };
                }, function() {
                    return Kinvey.Defer.reject({
                        id: metadata.id,
                        document: [ local, net ]
                    });
                });
                return Kinvey.Defer.reject({
                    id: metadata.id,
                    document: [ local, net ]
                });
            },
            _save: function(collection, documents, options) {
                documents = documents.map(function(composite) {
                    return composite.document;
                });
                var request = {
                    namespace: USERS === collection ? USERS : DATA_STORE,
                    collection: USERS === collection ? null : collection,
                    auth: Auth.Default
                };
                var error = [];
                var promises = documents.map(function(document) {
                    request.id = document._id;
                    request.data = document;
                    return Kinvey.Persistence.Net.update(request, options).then(null, function() {
                        error.push(document._id);
                        return null;
                    });
                });
                return Kinvey.Defer.all(promises).then(function(responses) {
                    request.id = null;
                    request.data = responses;
                    return Kinvey.Persistence.Local.create(request, options);
                }).then(function(response) {
                    return {
                        success: response.map(function(document) {
                            return document._id;
                        }),
                        error: error
                    };
                }, function() {
                    return {
                        success: [],
                        error: documents.map(function(document) {
                            return document._id;
                        })
                    };
                });
            }
        };
        Kinvey.Sync = {
            count: function(collection, options) {
                KINVEY_DEBUG && log("Counting the number of documents pending synchronization.", arguments);
                if (!Kinvey.Sync.isOnline()) {
                    var error = clientError(Kinvey.Error.SYNC_ERROR, {
                        debug: "Sync is not enabled, or the application resides in offline mode."
                    });
                    return Kinvey.Defer.reject(error);
                }
                options = options || {};
                var promise = Sync.count(collection, options);
                KINVEY_DEBUG && promise.then(function(response) {
                    log("Counted the number of documents pending synchronization.", response);
                }, function(error) {
                    log("Failed to count the number of documents pending synchronization.", error);
                });
                return wrapCallbacks(promise, options);
            },
            destruct: function(options) {
                KINVEY_DEBUG && log("Deleting the local database.", arguments);
                options = options || {};
                var promise = Database.destruct(options);
                KINVEY_DEBUG && promise.then(function(response) {
                    log("Deleted the local database.", response);
                }, function(error) {
                    log("Failed to delete the local database.", error);
                });
                return wrapCallbacks(promise, options);
            },
            execute: function(options) {
                KINVEY_DEBUG && log("Synchronizing the application.", arguments);
                if (!Kinvey.Sync.isOnline()) {
                    var error = clientError(Kinvey.Error.SYNC_ERROR, {
                        debug: "Sync is not enabled, or the application resides in offline mode."
                    });
                    return Kinvey.Defer.reject(error);
                }
                options = options || {};
                var promise;
                if (null != options.user) {
                    KINVEY_DEBUG && log("Attempting to login with a user context.", options.user);
                    promise = Kinvey.User.login(options.user).then(function() {
                        delete options.user;
                        return Kinvey.Sync.execute(options);
                    });
                    KINVEY_DEBUG && promise.then(null, function(error) {
                        log("Failed to login with the user context.", error);
                    });
                    promise.then(null, options.error);
                    return promise;
                }
                promise = Sync.execute(options);
                KINVEY_DEBUG && promise.then(function(response) {
                    log("Synchonized the application.", response);
                }, function(error) {
                    log("Failed to synchronize the application.", error);
                });
                return wrapCallbacks(promise, options);
            },
            init: function(options) {
                KINVEY_DEBUG && log("Initializing the synchronization functionality.", arguments);
                options = options || {};
                Sync.enabled = null != options ? options.enable : false;
                Sync.online = "undefined" != typeof options.online ? options.online : Sync.online;
                return Kinvey.Defer.resolve(null);
            },
            isEnabled: function() {
                return Sync.enabled;
            },
            isOnline: function() {
                return Sync.online;
            },
            offline: function() {
                KINVEY_DEBUG && log("Switching the application state to offline.");
                if (!Kinvey.Sync.isEnabled()) {
                    var error = clientError(Kinvey.Error.SYNC_ERROR, {
                        debug: "Sync is not enabled."
                    });
                    return Kinvey.Defer.reject(error);
                }
                Sync.online = false;
                return Kinvey.Defer.resolve(null);
            },
            online: function(options) {
                KINVEY_DEBUG && log("Switching the application state to online.", arguments);
                if (!Kinvey.Sync.isEnabled()) {
                    var error = clientError(Kinvey.Error.SYNC_ERROR, {
                        debug: "Sync is not enabled."
                    });
                    return Kinvey.Defer.reject(error);
                }
                options = options || {};
                var previous = Sync.online;
                Sync.online = true;
                if (false !== options.sync && previous !== Sync.online) return Kinvey.Sync.execute(options);
                return Kinvey.Defer.resolve(null);
            },
            clientAlwaysWins: function(collection, local) {
                return Kinvey.Defer.resolve(local);
            },
            serverAlwaysWins: function(collection, local, net) {
                return Kinvey.Defer.resolve(net);
            }
        };
        "undefined" != typeof root.promiscuous && Kinvey.Defer.use(root.promiscuous);
        var WebSqlAdapter = {
            db: null,
            dbName: function() {
                if (null == Kinvey.appKey) throw new Kinvey.Error("Kinvey.appKey must not be null.");
                return "Kinvey." + Kinvey.appKey;
            },
            size: 5242880,
            transaction: function(collection, query, parameters, write) {
                var error;
                if (!isString(collection) || !/^[a-zA-Z0-9\-]{1,128}/.test(collection)) {
                    error = clientError(Kinvey.Error.INVALID_IDENTIFIER, {
                        description: "The collection name has an invalid format.",
                        debug: 'The collection name must be a string containing only alphanumeric characters and dashes, "' + collection + '" given.'
                    });
                    return Kinvey.Defer.reject(error);
                }
                var escapedCollection = '"' + collection + '"';
                var isMaster = "sqlite_master" === collection;
                var isMulti = isArray(query);
                query = isMulti ? query : [ [ query, parameters ] ];
                write = write || false;
                null === WebSqlAdapter.db && (WebSqlAdapter.db = root.openDatabase(WebSqlAdapter.dbName(), 1, "", WebSqlAdapter.size));
                var deferred = Kinvey.Defer.deferred();
                var writeTxn = write || !isFunction(WebSqlAdapter.db.readTransaction);
                WebSqlAdapter.db[writeTxn ? "transaction" : "readTransaction"](function(tx) {
                    write && !isMaster && tx.executeSql("CREATE TABLE IF NOT EXISTS " + escapedCollection + " " + "(key BLOB PRIMARY KEY NOT NULL, value BLOB NOT NULL)");
                    var pending = query.length;
                    var responses = [];
                    query.forEach(function(parts) {
                        var sql = parts[0].replace("#{collection}", escapedCollection);
                        KINVEY_DEBUG && log("Executing a query.", sql, parts[1]);
                        tx.executeSql(sql, parts[1], function(_, resultSet) {
                            var response = {
                                rowCount: resultSet.rowsAffected,
                                result: []
                            };
                            if (resultSet.rows.length) for (var i = 0; resultSet.rows.length > i; i += 1) {
                                var value = resultSet.rows.item(i).value;
                                var document = isMaster ? value : JSON.parse(value);
                                response.result.push(document);
                            }
                            responses.push(response);
                            KINVEY_DEBUG && log("Executed the query.", sql, parts[1], response);
                            pending -= 1;
                            0 === pending && deferred.resolve(isMulti ? responses : responses.shift());
                        });
                    });
                }, function(err) {
                    KINVEY_DEBUG && log("Failed to execute the query.", err);
                    err = isString(err) ? err : err.message;
                    error = -1 !== err.indexOf("no such table") ? clientError(Kinvey.Error.COLLECTION_NOT_FOUND, {
                        description: "This collection not found for this app backend",
                        debug: {
                            collection: collection
                        }
                    }) : clientError(Kinvey.Error.DATABASE_ERROR, {
                        debug: err
                    });
                    deferred.reject(error);
                });
                return deferred.promise;
            },
            objectID: function(length) {
                length = length || 24;
                var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
                var result = "";
                for (var i = 0, j = chars.length; length > i; i += 1) {
                    var pos = Math.floor(Math.random() * j);
                    result += chars.substring(pos, pos + 1);
                }
                return result;
            },
            batch: function(collection, documents, options) {
                if (0 === documents.length) return Kinvey.Defer.resolve(documents);
                var queries = [];
                documents = documents.map(function(document) {
                    document._id = document._id || WebSqlAdapter.objectID();
                    queries.push([ "REPLACE INTO #{collection} (key, value) VALUES (?, ?)", [ document._id, JSON.stringify(document) ] ]);
                    return document;
                });
                var promise = WebSqlAdapter.transaction(collection, queries, null, true, options);
                return promise.then(function() {
                    return documents;
                });
            },
            clean: function(collection, query, options) {
                null != query && query.sort(null).limit(null).skip(0);
                return WebSqlAdapter.find(collection, query, options).then(function(documents) {
                    if (0 === documents.length) return {
                        count: 0,
                        documents: []
                    };
                    var infix = [];
                    var parameters = documents.map(function(document) {
                        infix.push("?");
                        return document._id;
                    });
                    var sql = "DELETE FROM #{collection} WHERE key IN(" + infix.join(",") + ")";
                    var promise = WebSqlAdapter.transaction(collection, sql, parameters, true, options);
                    return promise.then(function(response) {
                        response.rowCount = null != response.rowCount ? response.rowCount : documents.length;
                        return {
                            count: response.rowCount,
                            documents: documents
                        };
                    });
                });
            },
            count: function(collection, query, options) {
                null != query && query.sort(null).limit(null).skip(0);
                return WebSqlAdapter.find(collection, query, options).then(function(response) {
                    return {
                        count: response.length
                    };
                });
            },
            destroy: function(collection, id, options) {
                var promise = WebSqlAdapter.transaction(collection, [ [ "SELECT value FROM #{collection} WHERE key = ?", [ id ] ], [ "DELETE       FROM #{collection} WHERE key = ?", [ id ] ] ], null, true, options);
                return promise.then(function(response) {
                    var count = response[1].rowCount;
                    var documents = response[0].result;
                    count = null != count ? count : response[0].result.length;
                    if (0 === count) {
                        var error = clientError(Kinvey.Error.ENTITY_NOT_FOUND, {
                            description: "This entity not found in the collection",
                            debug: {
                                collection: collection,
                                id: id
                            }
                        });
                        return Kinvey.Defer.reject(error);
                    }
                    return {
                        count: count,
                        documents: documents
                    };
                });
            },
            destruct: function(options) {
                var query = "SELECT name AS value FROM #{collection} WHERE type = ?";
                var parameters = [ "table" ];
                var promise = WebSqlAdapter.transaction("sqlite_master", query, parameters, false, options);
                return promise.then(function(response) {
                    var tables = response.result;
                    if (0 === tables.length) return null;
                    var queries = tables.filter(function(table) {
                        return /^[a-zA-Z0-9\-]{1,128}/.test(table);
                    }).map(function(table) {
                        return [ "DROP TABLE IF EXISTS '" + table + "'" ];
                    });
                    return WebSqlAdapter.transaction("sqlite_master", queries, null, true, options);
                }).then(function() {
                    return null;
                });
            },
            find: function(collection, query, options) {
                var sql = "SELECT value FROM #{collection}";
                var promise = WebSqlAdapter.transaction(collection, sql, [], false, options);
                return promise.then(function(response) {
                    response = response.result;
                    if (null == query) return response;
                    response = root.sift(query.toJSON().filter, response);
                    return query._postProcess(response);
                }, function(error) {
                    if (Kinvey.Error.COLLECTION_NOT_FOUND === error.name) return [];
                    return Kinvey.Defer.reject(error);
                });
            },
            findAndModify: function(collection, id, fn, options) {
                var promise = WebSqlAdapter.get(collection, id, options).then(null, function(error) {
                    if (Kinvey.Error.ENTITY_NOT_FOUND === error.name) return null;
                    return Kinvey.Defer.reject(error);
                });
                return promise.then(function(response) {
                    var document = fn(response);
                    return WebSqlAdapter.save(collection, document, options);
                });
            },
            get: function(collection, id, options) {
                var sql = "SELECT value FROM #{collection} WHERE key = ?";
                var promise = WebSqlAdapter.transaction(collection, sql, [ id ], false, options);
                return promise.then(function(response) {
                    var documents = response.result;
                    if (0 === documents.length) {
                        var error = clientError(Kinvey.Error.ENTITY_NOT_FOUND, {
                            description: "This entity not found in the collection",
                            debug: {
                                collection: collection,
                                id: id
                            }
                        });
                        return Kinvey.Defer.reject(error);
                    }
                    return documents[0];
                }, function(error) {
                    Kinvey.Error.COLLECTION_NOT_FOUND === error.name && (error = clientError(Kinvey.Error.ENTITY_NOT_FOUND, {
                        description: "This entity not found in the collection",
                        debug: {
                            collection: collection,
                            id: id
                        }
                    }));
                    return Kinvey.Defer.reject(error);
                });
            },
            group: function(collection, aggregation, options) {
                var reduce = aggregation.reduce.replace(/function[\s\S]*?\([\s\S]*?\)/, "");
                aggregation.reduce = new Function([ "doc", "out" ], reduce);
                var query = new Kinvey.Query({
                    filter: aggregation.condition
                });
                return WebSqlAdapter.find(collection, query, options).then(function(documents) {
                    var groups = {};
                    documents.forEach(function(document) {
                        var group = {};
                        for (var name in aggregation.key) aggregation.key.hasOwnProperty(name) && (group[name] = document[name]);
                        var key = JSON.stringify(group);
                        if (null == groups[key]) {
                            groups[key] = group;
                            for (var attr in aggregation.initial) aggregation.initial.hasOwnProperty(attr) && (groups[key][attr] = aggregation.initial[attr]);
                        }
                        aggregation.reduce(document, groups[key]);
                    });
                    var response = [];
                    for (var segment in groups) groups.hasOwnProperty(segment) && response.push(groups[segment]);
                    return response;
                });
            },
            save: function(collection, document, options) {
                document._id = document._id || WebSqlAdapter.objectID();
                var query = "REPLACE INTO #{collection} (key, value) VALUES (?, ?)";
                var parameters = [ document._id, JSON.stringify(document) ];
                var promise = WebSqlAdapter.transaction(collection, query, parameters, true, options);
                return promise.then(function() {
                    return document;
                });
            },
            update: function(collection, document, options) {
                return WebSqlAdapter.save(collection, document, options);
            }
        };
        if ("undefined" != typeof root.openDatabase && "undefined" != typeof root.sift) {
            Database.use(WebSqlAdapter);
            [ "near", "regex", "within" ].forEach(function(operator) {
                root.sift.useOperator(operator, function() {
                    throw new Kinvey.Error(operator + " query operator is not supported locally.");
                });
            });
        }
        var IDBAdapter = {
            db: null,
            dbName: function() {
                if (null == Kinvey.appKey) throw new Kinvey.Error("Kinvey.appKey must not be null.");
                return "Kinvey." + Kinvey.appKey;
            },
            impl: root.indexedDB || root.webkitIndexedDB || root.mozIndexedDB || root.oIndexedDB || root.msIndexedDB,
            inTransaction: false,
            objectID: function(length) {
                length = length || 24;
                var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
                var result = "";
                for (var i = 0, j = chars.length; length > i; i += 1) {
                    var pos = Math.floor(Math.random() * j);
                    result += chars.substring(pos, pos + 1);
                }
                return result;
            },
            pending: [],
            transaction: function(collection, write, success, error, force) {
                if (!isString(collection) || !/^[a-zA-Z0-9\-]{1,128}/.test(collection)) return error(clientError(Kinvey.Error.INVALID_IDENTIFIER, {
                    description: "The collection name has an invalid format.",
                    debug: 'The collection name must be a string containing only alphanumeric characters and dashes, "' + collection + '" given.'
                }));
                write = write || false;
                if (null !== IDBAdapter.db) {
                    if (IDBAdapter.db.objectStoreNames.contains(collection)) {
                        var mode = write ? "readwrite" : "readonly";
                        var txn = IDBAdapter.db.transaction([ collection ], mode);
                        var store = txn.objectStore(collection);
                        return success(store);
                    }
                    if (!write) return error(clientError(Kinvey.Error.COLLECTION_NOT_FOUND, {
                        description: "This collection not found for this app backend",
                        debug: {
                            collection: collection
                        }
                    }));
                }
                if (true !== force && IDBAdapter.inTransaction) return IDBAdapter.pending.push(function() {
                    IDBAdapter.transaction(collection, write, success, error);
                });
                IDBAdapter.inTransaction = true;
                var request;
                if (null !== IDBAdapter.db) {
                    var version = IDBAdapter.db.version + 1;
                    request = IDBAdapter.impl.open(IDBAdapter.db.name, version);
                } else {
                    if (null == Kinvey.appKey) {
                        IDBAdapter.inTransaction = false;
                        return error(clientError(Kinvey.Error.MISSING_APP_CREDENTIALS));
                    }
                    request = IDBAdapter.impl.open(IDBAdapter.dbName());
                }
                request.onupgradeneeded = function() {
                    IDBAdapter.db = request.result;
                    write && IDBAdapter.db.createObjectStore(collection, {
                        keyPath: "_id"
                    });
                };
                request.onsuccess = function() {
                    IDBAdapter.db = request.result;
                    IDBAdapter.db.onversionchange = function() {
                        IDBAdapter.db.close();
                        IDBAdapter.db = null;
                    };
                    var wrap = function(cb) {
                        return function(arg) {
                            var result = cb(arg);
                            IDBAdapter.inTransaction = false;
                            if (0 !== IDBAdapter.pending.length) {
                                var pending = IDBAdapter.pending;
                                IDBAdapter.pending = [];
                                pending.forEach(function(fn) {
                                    fn();
                                });
                            }
                            return result;
                        };
                    };
                    IDBAdapter.transaction(collection, write, wrap(success), wrap(error), true);
                };
                request.onerror = function(event) {
                    error(clientError(Kinvey.Error.DATABASE_ERROR, {
                        debug: event
                    }));
                };
            },
            batch: function(collection, documents) {
                if (0 === documents.length) return Kinvey.Defer.resolve(documents);
                var deferred = Kinvey.Defer.deferred();
                IDBAdapter.transaction(collection, true, function(store) {
                    var request = store.transaction;
                    documents.forEach(function(document) {
                        document._id = document._id || IDBAdapter.objectID();
                        store.put(document);
                    });
                    request.oncomplete = function() {
                        deferred.resolve(documents);
                    };
                    request.onerror = function(event) {
                        var error = clientError(Kinvey.Error.DATABASE_ERROR, {
                            debug: event
                        });
                        deferred.reject(error);
                    };
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            },
            clean: function(collection, query, options) {
                null != query && query.sort(null).limit(null).skip(0);
                return IDBAdapter.find(collection, query, options).then(function(documents) {
                    if (0 === documents.length) return {
                        count: 0,
                        documents: []
                    };
                    var deferred = Kinvey.Defer.deferred();
                    IDBAdapter.transaction(collection, true, function(store) {
                        var request = store.transaction;
                        documents.forEach(function(document) {
                            store["delete"](document._id);
                        });
                        request.oncomplete = function() {
                            deferred.resolve({
                                count: documents.length,
                                documents: documents
                            });
                        };
                        request.onerror = function(event) {
                            var error = clientError(Kinvey.Error.DATABASE_ERROR, {
                                debug: event
                            });
                            deferred.reject(error);
                        };
                    });
                    return deferred.promise;
                });
            },
            count: function(collection, query, options) {
                null != query && query.sort(null).limit(null).skip(0);
                return IDBAdapter.find(collection, query, options).then(function(response) {
                    return {
                        count: response.length
                    };
                });
            },
            destroy: function(collection, id) {
                var deferred = Kinvey.Defer.deferred();
                IDBAdapter.transaction(collection, true, function(store) {
                    var request = store.transaction;
                    var document = store.get(id);
                    store["delete"](id);
                    request.oncomplete = function() {
                        if (null == document.result) return deferred.reject(clientError(Kinvey.Error.ENTITY_NOT_FOUND, {
                            description: "This entity not found in the collection",
                            debug: {
                                collection: collection,
                                id: id
                            }
                        }));
                        deferred.resolve({
                            count: 1,
                            documents: [ document.result ]
                        });
                    };
                    request.onerror = function(event) {
                        var error = clientError(Kinvey.Error.DATABASE_ERROR, {
                            debug: event
                        });
                        deferred.reject(error);
                    };
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            },
            destruct: function() {
                if (null == Kinvey.appKey) {
                    var error = clientError(Kinvey.Error.MISSING_APP_CREDENTIALS);
                    return Kinvey.Defer.reject(error);
                }
                var deferred = Kinvey.Defer.deferred();
                var request = IDBAdapter.impl.deleteDatabase(IDBAdapter.dbName());
                request.onsuccess = function() {
                    deferred.resolve(null);
                };
                request.onerror = function(event) {
                    var error = clientError(Kinvey.Error.DATABASE_ERROR, {
                        debug: event
                    });
                    deferred.reject(error);
                };
                return deferred.promise;
            },
            find: function(collection, query) {
                var deferred = Kinvey.Defer.deferred();
                IDBAdapter.transaction(collection, false, function(store) {
                    var request = store.openCursor();
                    var response = [];
                    request.onsuccess = function() {
                        var cursor = request.result;
                        if (null != cursor) {
                            response.push(cursor.value);
                            cursor["continue"]();
                        } else deferred.resolve(response);
                    };
                    request.onerror = function(event) {
                        deferred.reject(clientError(Kinvey.DATABASE_ERROR, {
                            debug: event
                        }));
                    };
                }, function(error) {
                    if (Kinvey.Error.COLLECTION_NOT_FOUND === error.name) return deferred.resolve([]);
                    return deferred.reject(error);
                });
                return deferred.promise.then(function(response) {
                    if (null == query) return response;
                    response = root.sift(query.toJSON().filter, response);
                    return query._postProcess(response);
                });
            },
            findAndModify: function(collection, id, fn) {
                var deferred = Kinvey.Defer.deferred();
                IDBAdapter.transaction(collection, true, function(store) {
                    var document = null;
                    var request = store.get(id);
                    request.onsuccess = function() {
                        document = fn(request.result || null);
                        store.put(document);
                    };
                    var txn = store.transaction;
                    txn.oncomplete = function() {
                        deferred.resolve(document);
                    };
                    txn.onerror = function(event) {
                        var error = clientError(Kinvey.Error.DATABASE_ERROR, {
                            debug: event
                        });
                        deferred.reject(error);
                    };
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            },
            get: function(collection, id) {
                var deferred = Kinvey.Defer.deferred();
                IDBAdapter.transaction(collection, false, function(store) {
                    var request = store.get(id);
                    request.onsuccess = function() {
                        if (null != request.result) return deferred.resolve(request.result);
                        deferred.reject(clientError(Kinvey.Error.ENTITY_NOT_FOUND, {
                            description: "This entity not found in the collection",
                            debug: {
                                collection: collection,
                                id: id
                            }
                        }));
                    };
                    request.onerror = function(event) {
                        deferred.reject(clientError(Kinvey.Error.DATABASE_ERROR, {
                            debug: event
                        }));
                    };
                }, function(error) {
                    Kinvey.Error.COLLECTION_NOT_FOUND === error.name && (error = clientError(Kinvey.Error.ENTITY_NOT_FOUND, {
                        description: "This entity not found in the collection",
                        debug: {
                            collection: collection,
                            id: id
                        }
                    }));
                    deferred.reject(error);
                });
                return deferred.promise;
            },
            group: function(collection, aggregation, options) {
                var reduce = aggregation.reduce.replace(/function[\s\S]*?\([\s\S]*?\)/, "");
                aggregation.reduce = new Function([ "doc", "out" ], reduce);
                var query = new Kinvey.Query({
                    filter: aggregation.condition
                });
                return IDBAdapter.find(collection, query, options).then(function(documents) {
                    var groups = {};
                    documents.forEach(function(document) {
                        var group = {};
                        for (var name in aggregation.key) aggregation.key.hasOwnProperty(name) && (group[name] = document[name]);
                        var key = JSON.stringify(group);
                        if (null == groups[key]) {
                            groups[key] = group;
                            for (var attr in aggregation.initial) aggregation.initial.hasOwnProperty(attr) && (groups[key][attr] = aggregation.initial[attr]);
                        }
                        aggregation.reduce(document, groups[key]);
                    });
                    var response = [];
                    for (var segment in groups) groups.hasOwnProperty(segment) && response.push(groups[segment]);
                    return response;
                });
            },
            save: function(collection, document) {
                document._id = document._id || IDBAdapter.objectID();
                var deferred = Kinvey.Defer.deferred();
                IDBAdapter.transaction(collection, true, function(store) {
                    var request = store.put(document);
                    request.onsuccess = function() {
                        deferred.resolve(document);
                    };
                    request.onerror = function(event) {
                        var error = clientError(Kinvey.Error.DATABASE_ERROR, {
                            debug: event
                        });
                        deferred.reject(error);
                    };
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            },
            update: function(collection, document, options) {
                return IDBAdapter.save(collection, document, options);
            }
        };
        if ("undefined" != typeof IDBAdapter.impl && "undefined" != typeof root.sift) {
            Database.use(IDBAdapter);
            [ "near", "regex", "within" ].forEach(function(operator) {
                root.sift.useOperator(operator, function() {
                    throw new Kinvey.Error(operator + " query operator is not supported locally.");
                });
            });
        }
        var SocialAdapter = {
            facebook: function(options) {
                return SocialAdapter.oAuth2("facebook", options);
            },
            google: function(options) {
                return SocialAdapter.oAuth2("google", options);
            },
            linkedIn: function(options) {
                return SocialAdapter.oAuth1("linkedIn", options);
            },
            twitter: function(options) {
                return SocialAdapter.oAuth1("twitter", options);
            },
            oAuth1: function(provider, options) {
                KINVEY_DEBUG && log("Obtaining OAuth1.0a credentials for a provider.", arguments);
                return SocialAdapter.requestToken(provider, options).then(function(tokens) {
                    if (tokens.error || tokens.denied) {
                        var error = clientError(Kinvey.Error.SOCIAL_ERROR, {
                            debug: tokens
                        });
                        return Kinvey.Defer.reject(error);
                    }
                    return {
                        oauth_token: tokens.oauth_token,
                        oauth_token_secret: tokens.oauth_token_secret,
                        oauth_verifier: tokens.oauth_verifier
                    };
                }).then(function(tokens) {
                    return Kinvey.Persistence.Net.create({
                        namespace: USERS,
                        data: tokens,
                        flags: {
                            provider: provider,
                            step: "verifyToken"
                        },
                        auth: Auth.App
                    }, options);
                }).then(function(tokens) {
                    options._provider = provider;
                    return tokens;
                });
            },
            oAuth2: function(provider, options) {
                KINVEY_DEBUG && log("Obtaining OAuth2.0 credentials for a provider.", arguments);
                options.state = Math.random().toString(36).substr(2);
                return SocialAdapter.requestToken(provider, options).then(function(tokens) {
                    var error;
                    if (tokens.state !== options.state) {
                        error = clientError(Kinvey.Error.SOCIAL_ERROR, {
                            debug: "The state parameters did not match (CSRF attack?)."
                        });
                        return Kinvey.Defer.reject(error);
                    }
                    if (tokens.error) {
                        error = clientError(Kinvey.Error.SOCIAL_ERROR, {
                            debug: tokens
                        });
                        return Kinvey.Defer.reject(error);
                    }
                    return {
                        access_token: tokens.access_token,
                        expires_in: tokens.expires_in
                    };
                });
            },
            requestToken: function(provider, options) {
                var redirect = options.redirect || root.location.toString();
                return Kinvey.Persistence.Net.create({
                    namespace: USERS,
                    data: {
                        redirect: redirect,
                        state: options.state
                    },
                    flags: {
                        provider: provider,
                        step: "requestToken"
                    },
                    auth: Auth.App
                }, options).then(function(response) {
                    var deferred = Kinvey.Defer.deferred();
                    var popup = root.open(response.url, "KinveyOAuth2");
                    var elapsed = 0;
                    var interval = 100;
                    var timer = root.setInterval(function() {
                        var error;
                        if (null == popup.location) {
                            root.clearTimeout(timer);
                            error = clientError(Kinvey.Error.SOCIAL_ERROR, {
                                debug: "The popup was closed unexpectedly."
                            });
                            deferred.reject(error);
                        } else if (options.timeout && elapsed > options.timeout) {
                            root.clearTimeout(timer);
                            popup.close();
                            error = clientError(Kinvey.Error.SOCIAL_ERROR, {
                                debug: "The user waited too long to reply to the authorization request."
                            });
                            deferred.reject(error);
                        } else if (popup.location.host) {
                            root.clearTimeout(timer);
                            popup.close();
                            var location = popup.location;
                            var tokenString = location.search.substring(1) + "&" + location.hash.substring(1);
                            var tokens = SocialAdapter.tokenize(tokenString);
                            null != response.oauth_token_secret && (tokens.oauth_token_secret = response.oauth_token_secret);
                            deferred.resolve(tokens);
                        }
                        elapsed += interval;
                    }, interval);
                    return deferred.promise;
                });
            },
            tokenize: function(string) {
                var tokens = {};
                string.split("&").forEach(function(pair) {
                    var segments = pair.split("=", 2).map(root.decodeURIComponent);
                    segments[0] && (tokens[segments[0]] = segments[1]);
                });
                return tokens;
            }
        };
        Social.use(SocialAdapter);
        if ("undefined" != typeof Backbone) {
            Kinvey.Backbone = {
                getActiveUser: function() {
                    var user = Kinvey.getActiveUser();
                    return null !== user ? new Kinvey.Backbone.User(user) : null;
                }
            };
            Kinvey.Error.NOT_LOGGED_IN = "NotLoggedIn";
            ClientError[Kinvey.Error.NOT_LOGGED_IN] = {
                name: Kinvey.Error.NOT_LOGGED_IN,
                description: "This user is not logged in.",
                debug: ""
            };
            var SyncMixin = {
                sync: function() {
                    return Kinvey.Backbone.Sync.apply(this, arguments);
                }
            };
            var backboneWrapCallbacks = function(model, options, mutate) {
                mutate = "undefined" == typeof mutate ? true : mutate;
                var success = options.success;
                options.success = function(response) {
                    if (mutate) if (model instanceof Backbone.Model) {
                        if (!model.set(model.parse(response, options), options)) return false;
                    } else {
                        var method = options.reset ? "reset" : "set";
                        model[method] || (method = isFunction(model.update) ? "update" : "reset");
                        model[method](response, options);
                    }
                    success && success(model, response, options);
                    mutate && model.trigger("sync", model, response, options);
                };
                var error = options.error;
                options.error = function(response) {
                    error && error(model, response, options);
                    mutate && model.trigger("error", model, response, options);
                };
            };
            var kinveyToBackbonePromise = function(kinveyPromise, options) {
                var promise = kinveyPromise.then(function(value) {
                    var args = options.xhr ? [ options.xhr.statusText, options.xhr ] : [];
                    return [ value ].concat(args);
                }, function(reason) {
                    var args = options.xhr ? [ options.xhr.statusText, options.xhr ] : [ null, null ];
                    return Kinvey.Defer.reject(args.concat([ reason ]));
                });
                if ("undefined" == typeof jQuery || "undefined" == typeof jQuery.Deferred) return promise;
                var deferred = jQuery.Deferred();
                promise.then(function(args) {
                    deferred.resolve.apply(deferred, args);
                }, function(args) {
                    deferred.reject.apply(deferred, args);
                });
                return deferred.promise();
            };
            Kinvey.Backbone.ModelMixin = _.extend({}, SyncMixin, {
                idAttribute: "_id",
                relations: []
            });
            Kinvey.Backbone.CollectionMixin = _.extend({}, SyncMixin, {
                query: null,
                clean: function(options) {
                    options = options ? _.clone(options) : {};
                    options.parse = "undefined" == typeof options.parse ? true : options.parse;
                    backboneWrapCallbacks(this, options);
                    return this.sync("delete", this, options);
                },
                count: function(options) {
                    options = _.clone(options) || {};
                    options.subject = this;
                    backboneWrapCallbacks(this, options, false);
                    var collection = _.result(this, "url");
                    var query = options.query || this.query;
                    var promise;
                    promise = USERS === collection ? Kinvey.User.count(query, options) : Kinvey.DataStore.count(collection, query, options);
                    return kinveyToBackbonePromise(promise, options);
                },
                group: function(aggregation, options) {
                    options = _.clone(options) || {};
                    options.subject = this;
                    backboneWrapCallbacks(this, options, false);
                    var query = options.query || this.query;
                    null != query && aggregation.query(query);
                    var collection = _.result(this, "url");
                    var promise;
                    promise = USERS === collection ? Kinvey.User.group(aggregation, options) : Kinvey.DataStore.group(collection, aggregation, options);
                    return kinveyToBackbonePromise(promise, options);
                }
            });
            var backboneWrapMetadata = function(fn) {
                return function() {
                    null === this._metadata && (this._metadata = new Kinvey.Metadata(this.attributes));
                    return fn.apply(this._metadata, arguments);
                };
            };
            _.extend(Kinvey.Backbone.ModelMixin, {
                _metadata: null,
                getAcl: backboneWrapMetadata(Kinvey.Metadata.prototype.getAcl),
                getCreatedAt: backboneWrapMetadata(Kinvey.Metadata.prototype.getCreatedAt),
                getLastModified: backboneWrapMetadata(Kinvey.Metadata.prototype.getLastModified),
                setAcl: function() {
                    backboneWrapMetadata(Kinvey.Metadata.prototype.setAcl).apply(this, arguments);
                    return this;
                }
            });
            var UserMixin = {
                url: USERS
            };
            Kinvey.Backbone.UserMixin = _.extend({}, Kinvey.Backbone.ModelMixin, UserMixin, {
                connect: function(provider, options) {
                    options = options ? _.clone(options) : {};
                    options.parse = "undefined" == typeof options.parse ? true : options.parse;
                    options.subject = this;
                    backboneWrapCallbacks(this, options);
                    var promise = Kinvey.Social.connect(this.attributes, provider, options);
                    return kinveyToBackbonePromise(promise, options);
                },
                disconnect: function(provider, options) {
                    options = options ? _.clone(options) : {};
                    options.parse = "undefined" == typeof options.parse ? true : options.parse;
                    options.subject = this;
                    backboneWrapCallbacks(this, options);
                    var promise = Kinvey.Social.disconnect(this.attributes, provider, options);
                    return kinveyToBackbonePromise(promise, options);
                },
                getEmailVerification: backboneWrapMetadata(Kinvey.Metadata.prototype.getEmailVerification),
                isLoggedIn: function() {
                    var user = Kinvey.getActiveUser();
                    if (null !== user) {
                        var kmd = this.get("_kmd");
                        return null != kmd && kmd.authtoken === user._kmd.authtoken;
                    }
                    return false;
                },
                login: function(usernameOrData, password, options) {
                    options = _.clone(isObject(usernameOrData) ? password : options) || {};
                    options.parse = "undefined" == typeof options.parse ? true : options.parse;
                    options.subject = this;
                    backboneWrapCallbacks(this, options);
                    var promise = Kinvey.User.login(usernameOrData, password, options);
                    return kinveyToBackbonePromise(promise, options);
                },
                logout: function(options) {
                    options = options ? _.clone(options) : {};
                    options.parse = "undefined" == typeof options.parse ? true : options.parse;
                    options.subject = this;
                    backboneWrapCallbacks(this, options);
                    var promise;
                    if (this.isLoggedIn()) promise = Kinvey.User.logout(options); else {
                        var error = clientError(Kinvey.Error.NOT_LOGGED_IN);
                        promise = Kinvey.Defer.reject(error);
                        wrapCallbacks(promise, options);
                    }
                    return kinveyToBackbonePromise(promise, options);
                },
                me: function(options) {
                    options = options ? _.clone(options) : {};
                    options.parse = "undefined" == typeof options.parse ? true : options.parse;
                    options.subject = this;
                    backboneWrapCallbacks(this, options);
                    var promise;
                    if (this.isLoggedIn()) promise = Kinvey.User.me(options); else {
                        var error = clientError(Kinvey.Error.NOT_LOGGED_IN);
                        promise = Kinvey.Defer.reject(error);
                        wrapCallbacks(promise, options);
                    }
                    return kinveyToBackbonePromise(promise, options);
                }
            });
            Kinvey.Backbone.StaticUserMixin = {
                verifyEmail: function(username, options) {
                    options = options || {};
                    var promise = Kinvey.User.verifyEmail(username, options);
                    return kinveyToBackbonePromise(promise, options);
                },
                forgotUsername: function(email, options) {
                    options = options || {};
                    var promise = Kinvey.User.forgotUsername(email, options);
                    return kinveyToBackbonePromise(promise, options);
                },
                resetPassword: function(username, options) {
                    options = options || {};
                    var promise = Kinvey.User.resetPassword(username, options);
                    return kinveyToBackbonePromise(promise, options);
                },
                exists: function(username, options) {
                    options = options || {};
                    var promise = Kinvey.User.exists(username, options);
                    return kinveyToBackbonePromise(promise, options);
                },
                restore: function(id, options) {
                    options = options || {};
                    var promise = Kinvey.User.restore(id, options);
                    return kinveyToBackbonePromise(promise, options);
                }
            };
            Kinvey.Backbone.UserCollectionMixin = _.extend(_.omit(Kinvey.Backbone.CollectionMixin, "clean"), UserMixin);
            var backboneRelations = function(mode, model) {
                var exclude = [];
                var relations = {};
                var prop = "read" === mode ? "autoFetch" : "autoSave";
                var stack = [];
                var addToStack = function(relations, depth, prefix) {
                    relations.forEach(function(relation) {
                        stack.push({
                            relation: relation,
                            depth: depth || 0,
                            prefix: prefix || null
                        });
                    });
                };
                addToStack(model.relations || []);
                var item;
                while (null != (item = stack.shift())) {
                    var depth = item.depth;
                    var prefix = item.prefix;
                    var relation = item.relation;
                    if (10 === depth) continue;
                    var relatedModel = null;
                    relation.relatedModel && (relatedModel = (root[relation.relatedModel] || relation.relatedModel).prototype);
                    var collection = relation.collection || _.result(relatedModel, "url");
                    if (null == collection) throw new Kinvey.Error("collection or relatedModel must be set on the relation.");
                    0 === collection.indexOf("/") && (collection = collection.substr(1));
                    var key = null !== prefix ? prefix + "." + relation.key : relation.key;
                    relations[key] = collection;
                    false === relation[prop] && exclude.push(key);
                    false === relation[prop] || null == relatedModel || isEmpty(relatedModel.relations) || addToStack(relatedModel.relations, depth + 1, key);
                }
                return {
                    exclude: exclude,
                    relations: relations
                };
            };
            var backboneToKinveyCRUD = function(method, collection, id, data, options) {
                null != id && isObject(data) && (data._id = id);
                var query = null == id && (!isObject(data) || isArray(data));
                var namespace = USERS === collection ? Kinvey.User : Kinvey.DataStore;
                var methodMap = {
                    create: namespace[USERS === collection ? "create" : "save"],
                    read: query ? namespace.find : namespace.get,
                    update: namespace.update,
                    "delete": query ? namespace.clean : namespace.destroy
                };
                var args = [ query ? options.query : "read" === method || "delete" === method ? id : data, options ];
                USERS !== collection && args.unshift(collection);
                return methodMap[method].apply(namespace, args);
            };
            Kinvey.Backbone.Sync = function(method, model, options) {
                options.query = options.query || model.query;
                options.subject = model;
                var silent = options.silent;
                var success = options.success;
                options.silent = options.silentFail || false;
                options.success = function(response) {
                    options.silent = silent;
                    success && success(response);
                };
                var data = options.attrs || model.toJSON(options);
                var url = options.url || _.result(model, "url");
                if (null == url) throw new Kinvey.Error("model or options argument must contain: url.");
                0 === url.indexOf("/") && (url = url.substr(1));
                var segments = url.split("/");
                var collection = segments[0];
                var id = segments[1] || data._id || null;
                var relations = model.model ? model.model.prototype.relations : model.relations;
                if (!isEmpty(relations)) {
                    var mode = "read" === method ? "read" : "write";
                    relations = backboneRelations(mode, this.model ? this.model.prototype : this);
                    options.exclude = relations.exclude;
                    options.relations = relations.relations;
                }
                var promise = backboneToKinveyCRUD(method, collection, id, data, options);
                return kinveyToBackbonePromise(promise, options);
            };
            var backboneModel;
            backboneModel = "undefined" != typeof Backbone.AssociatedModel ? Backbone.AssociatedModel : Backbone.Model;
            Kinvey.Backbone.Model = backboneModel.extend(Kinvey.Backbone.ModelMixin);
            Kinvey.Backbone.Collection = Backbone.Collection.extend(_.extend({}, Kinvey.Backbone.CollectionMixin, {
                model: Kinvey.Backbone.Model,
                initialize: function(models, options) {
                    var result = Backbone.Collection.prototype.initialize.apply(this, arguments);
                    options = options || {};
                    if (null != options.query && !(options.query instanceof Kinvey.Query)) throw new Kinvey.Error("options.query argument must be of type: Kinvey.Query.");
                    this.query = options.query;
                    return result;
                }
            }));
            Kinvey.Backbone.User = backboneModel.extend(Kinvey.Backbone.UserMixin, Kinvey.Backbone.StaticUserMixin);
            Kinvey.Backbone.UserCollection = Backbone.Collection.extend(_.extend({}, Kinvey.Backbone.UserCollectionMixin, {
                model: Kinvey.Backbone.User,
                initialize: Kinvey.Backbone.Collection.prototype.initialize
            }));
        }
        var isMobileWeb = "mobileweb" === Titanium.Platform.getName();
        var tiPlatformConnect = function(provider, options) {
            KINVEY_DEBUG && log("Obtaining a social identity.", arguments);
            options = options || {};
            if (null == options.consumerKey) throw new Kinvey.Error("options argument must contain: consumerKey.");
            if (null == options.consumerSecret) throw new Kinvey.Error("options argument must contain: consumerSecret.");
            var deferred = Kinvey.Defer.deferred();
            var adapter = root.__KinveySocialAdapter[provider](options);
            adapter.addEventListener("login", function(event) {
                if (event.success) return deferred.resolve({
                    consumer_key: options.consumerKey,
                    consumer_secret: options.consumerSecret,
                    access_token: event.accessTokenKey,
                    access_token_secret: event.accessTokenSecret
                });
                var error = clientError(Kinvey.Error.SOCIAL_ERROR, {
                    description: event.error,
                    debug: event.data || ""
                });
                deferred.reject(error);
            });
            adapter.authorize();
            KINVEY_DEBUG && deferred.promise.then(function(response) {
                log("Obtained the social identity.", response);
            }, function(error) {
                log("Failed to obtain a social identity.", error);
            });
            return deferred.promise;
        };
        var TiSocialAdapter = {
            facebook: function(options) {
                KINVEY_DEBUG && log("Initiating the Facebook OAuth2.0 flow.", arguments);
                options = options || {};
                if (null == options.appId) throw new Kinvey.Error("options argument must contain: appId.");
                var deferred = Kinvey.Defer.deferred();
                var TiFacebook = isMobileWeb ? Titanium.Facebook : require("facebook");
                TiFacebook.appid = options.appId;
                TiFacebook.permissions = options.permissions || TiFacebook.permissions || [];
                var listener = function(event) {
                    TiFacebook.removeEventListener("login", listener);
                    KINVEY_DEBUG && log("Received the Facebook login response.", event);
                    if (event.success) {
                        var expires = TiFacebook.getExpirationDate().getTime();
                        return deferred.resolve({
                            access_token: TiFacebook.getAccessToken(),
                            expires_in: root.parseInt((expires - new Date().getTime()) / 1e3, 10)
                        });
                    }
                    var error = clientError(Kinvey.Error.SOCIAL_ERROR, {
                        debug: event.data.status + ": " + event.error
                    });
                    deferred.reject(error);
                };
                TiFacebook.addEventListener("login", listener);
                TiFacebook.loggedIn ? TiFacebook.fireEvent("login", {
                    success: true
                }) : TiFacebook.authorize();
                KINVEY_DEBUG && deferred.promise.then(function(response) {
                    log("Obtained the Facebook OAuth2.0 tokens.", response);
                }, function(error) {
                    log("Failed to obtain the Facebook OAuth2.0 tokens.", error);
                });
                return deferred.promise;
            },
            google: isMobileWeb ? SocialAdapter.google : function(options) {
                options = options || {};
                options.scope = [ "https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email" ].join(" ");
                return tiPlatformConnect("Google", options);
            },
            linkedIn: isMobileWeb ? SocialAdapter.linkedIn : function(options) {
                return tiPlatformConnect("Linkedin", options);
            },
            twitter: isMobileWeb ? SocialAdapter.twitter : function(options) {
                return tiPlatformConnect("Twitter", options);
            }
        };
        Social.use(TiSocialAdapter);
        var storagePromise = Kinvey.Defer.resolve(null);
        var TiAppStorage = {
            _destroy: function(key) {
                storagePromise = storagePromise.then(function() {
                    Titanium.App.Properties.removeProperty(key);
                    return Kinvey.Defer.resolve(null);
                });
                return storagePromise;
            },
            _get: function(key) {
                storagePromise = storagePromise.then(function() {
                    var value = Titanium.App.Properties.getObject(key, null);
                    return Kinvey.Defer.resolve(value);
                });
                return storagePromise;
            },
            _save: function(key, value) {
                storagePromise = storagePromise.then(function() {
                    Titanium.App.Properties.setObject(key, value);
                    return Kinvey.Defer.resolve(null);
                });
                return storagePromise;
            }
        };
        Storage.use(TiAppStorage);
        var TiDatabaseAdapter = {
            dbName: function() {
                if (null == Kinvey.appKey) throw new Kinvey.Error("Kinvey.appKey must not be null.");
                return "Kinvey." + Kinvey.appKey;
            },
            execute: function(collection, query, parameters, options) {
                if (!isString(collection) || !/^[a-zA-Z0-9\-]{1,128}/.test(collection)) {
                    var error = clientError(Kinvey.Error.INVALID_IDENTIFIER, {
                        description: "The collection name has an invalid format.",
                        debug: 'The collection name must be a string containing only alphanumeric characters and dashes, "' + collection + '" given.'
                    });
                    return Kinvey.Defer.reject(error);
                }
                var escapedCollection = "'" + collection + "'";
                var isMulti = isArray(query);
                options = options || {};
                query = isMulti ? query : [ [ query, parameters ] ];
                try {
                    var db = Titanium.Database.open(TiDatabaseAdapter.dbName());
                    db.execute("BEGIN");
                    db.execute("CREATE TABLE IF NOT EXISTS " + escapedCollection + " " + "(key BLOB PRIMARY KEY NOT NULL, value BLOB NOT NULL)");
                    var response = query.map(function(parts) {
                        var sql = parts[0].replace("#{collection}", escapedCollection);
                        KINVEY_DEBUG && log("Executing a query.", sql, parts[1]);
                        var res = db.execute(sql, parts[1]);
                        var response = {
                            rowCount: db.getRowsAffected(),
                            result: null
                        };
                        if (null != res) {
                            response.result = [];
                            while (res.isValidRow()) {
                                var document = JSON.parse(res.fieldByName("value"));
                                response.result.push(document);
                                res.next();
                            }
                            res.close();
                        }
                        null != options.progress && options.progress(collection, response, query);
                        KINVEY_DEBUG && log("Executed the query.", response);
                        return response;
                    });
                    db.execute("COMMIT");
                    db.close();
                    return Kinvey.Defer.resolve(isMulti ? response : response.shift());
                } catch (e) {
                    KINVEY_DEBUG && log("Failed to execute the query.", e.message);
                    var error = clientError(Kinvey.Error.DATABASE_ERROR, {
                        debug: e.message
                    });
                    return Kinvey.Defer.reject(error);
                }
            },
            objectID: function(length) {
                length = length || 24;
                var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
                var result = "";
                for (var i = 0, j = chars.length; length > i; i += 1) {
                    var pos = Math.floor(Math.random() * j);
                    result += chars.substring(pos, pos + 1);
                }
                return result;
            },
            batch: function(collection, documents, options) {
                if (0 === documents.length) return Kinvey.Defer.resolve(documents);
                var queries = [];
                documents = documents.map(function(document) {
                    document._id = document._id || TiDatabaseAdapter.objectID();
                    queries.push([ "INSERT OR REPLACE INTO #{collection} (key, value) VALUES (?, ?)", [ document._id, JSON.stringify(document) ] ]);
                    return document;
                });
                var promise = TiDatabaseAdapter.execute(collection, queries, null, options);
                return promise.then(function() {
                    return documents;
                });
            },
            clean: function(collection, query, options) {
                null != query && query.sort(null).limit(null).skip(0);
                return TiDatabaseAdapter.find(collection, query, options).then(function(documents) {
                    if (0 === documents.length) return {
                        count: 0,
                        documents: []
                    };
                    var infix = [];
                    var parameters = documents.map(function(document) {
                        infix.push("?");
                        return document._id;
                    });
                    var sql = "DELETE FROM #{collection} WHERE key IN(" + infix.join(",") + ")";
                    var promise = TiDatabaseAdapter.execute(collection, sql, parameters, options);
                    return promise.then(function(response) {
                        return {
                            count: response.rowCount,
                            documents: documents
                        };
                    });
                });
            },
            count: function(collection, query, options) {
                null != query && query.sort(null).limit(null).skip(0);
                return TiDatabaseAdapter.find(collection, query, options).then(function(response) {
                    return {
                        count: response.length
                    };
                });
            },
            destroy: function(collection, id, options) {
                var promise = TiDatabaseAdapter.execute(collection, [ [ "SELECT value FROM #{collection} WHERE key = ?", [ id ] ], [ "DELETE       FROM #{collection} WHERE key = ?", [ id ] ] ], null, options);
                return promise.then(function(response) {
                    var count = response[1].rowCount;
                    var documents = response[0].result;
                    if (0 === count) {
                        var error = clientError(Kinvey.Error.ENTITY_NOT_FOUND, {
                            description: "This entity not found in the collection",
                            debug: {
                                collection: collection,
                                id: id
                            }
                        });
                        return Kinvey.Defer.reject(error);
                    }
                    return {
                        count: count,
                        documents: documents
                    };
                });
            },
            destruct: function() {
                var error;
                if (null == Kinvey.appKey) {
                    error = clientError(Kinvey.Error.MISSING_APP_CREDENTIALS);
                    return Kinvey.Defer.reject(error);
                }
                try {
                    var db = Titanium.Database.open(TiDatabaseAdapter.dbName());
                    if (db.remove) {
                        db.remove();
                        return Kinvey.Defer.resolve(null);
                    }
                    if (db.file && db.file.deleteFile()) return Kinvey.Defer.resolve(null);
                    error = clientError(Kinvey.Error.DATABASE_ERROR, {
                        debug: "The mechanism to delete the database is not implemented for this platform."
                    });
                    return Kinvey.Defer.reject(error);
                } catch (e) {
                    error = clientError(Kinvey.Error.DATABASE_ERROR, {
                        debug: e.message
                    });
                    return Kinvey.Defer.reject(error);
                }
            },
            find: function(collection, query, options) {
                var sql = "SELECT value FROM #{collection}";
                var promise = TiDatabaseAdapter.execute(collection, sql, [], options);
                return promise.then(function(response) {
                    response = response.result;
                    if (null == query) return response;
                    response = root.sift(query.toJSON().filter, response);
                    return query._postProcess(response);
                });
            },
            findAndModify: function(collection, id, fn, options) {
                options = options || {};
                var document = null;
                options.progress = function(collection, response, query) {
                    document = fn(response.result[0] || null);
                    query[1][1][1] = JSON.stringify(document);
                    delete options.progress;
                };
                var promise = TiDatabaseAdapter.execute(collection, [ [ "SELECT value FROM #{collection} WHERE key = ?", [ id ] ], [ "INSERT OR REPLACE INTO #{collection} (key, value) VALUES (?, ?)", [ id, null ] ] ], null, options);
                return promise.then(function() {
                    return document;
                });
            },
            get: function(collection, id, options) {
                var sql = "SELECT value FROM #{collection} WHERE key = ?";
                var promise = TiDatabaseAdapter.execute(collection, sql, [ id ], options);
                return promise.then(function(response) {
                    var documents = response.result || [];
                    if (0 === documents.length) {
                        var error = clientError(Kinvey.Error.ENTITY_NOT_FOUND, {
                            description: "This entity not found in the collection",
                            debug: {
                                collection: collection,
                                id: id
                            }
                        });
                        return Kinvey.Defer.reject(error);
                    }
                    return documents[0];
                });
            },
            group: function(collection, aggregation, options) {
                var reduce = aggregation.reduce.replace(/function[\s\S]*?\([\s\S]*?\)/, "");
                aggregation.reduce = new Function([ "doc", "out" ], reduce);
                var query = new Kinvey.Query({
                    filter: aggregation.condition
                });
                return TiDatabaseAdapter.find(collection, query, options).then(function(documents) {
                    var groups = {};
                    documents.forEach(function(document) {
                        var group = {};
                        for (var name in aggregation.key) aggregation.key.hasOwnProperty(name) && (group[name] = document[name]);
                        var key = JSON.stringify(group);
                        if (null == groups[key]) {
                            groups[key] = group;
                            for (var attr in aggregation.initial) aggregation.initial.hasOwnProperty(attr) && (groups[key][attr] = aggregation.initial[attr]);
                        }
                        aggregation.reduce(document, groups[key]);
                    });
                    var response = [];
                    for (var segment in groups) groups.hasOwnProperty(segment) && response.push(groups[segment]);
                    return response;
                });
            },
            save: function(collection, document, options) {
                document._id = document._id || TiDatabaseAdapter.objectID();
                var query = "INSERT OR REPLACE INTO #{collection} (key, value) VALUES(?, ?)";
                var parameters = [ document._id, JSON.stringify(document) ];
                var promise = TiDatabaseAdapter.execute(collection, query, parameters, options);
                return promise.then(function() {
                    return document;
                });
            },
            update: function(collection, document, options) {
                return TiDatabaseAdapter.save(collection, document, options);
            }
        };
        if ("undefined" != typeof Titanium.Database && "undefined" != typeof root.sift) {
            Database.use(TiDatabaseAdapter);
            [ "near", "regex", "within" ].forEach(function(operator) {
                root.sift.useOperator(operator, function() {
                    throw new Kinvey.Error(operator + " query operator is not supported locally.");
                });
            });
        }
        var TiHttp = {
            base64: function(value) {
                return Titanium.Utils.base64encode(value);
            },
            encode: function(value) {
                return Titanium.Network.encodeURIComponent(value);
            },
            request: function(method, url, body, headers, options) {
                body = body || null;
                headers = headers || {};
                options = options || {};
                var deferred = Kinvey.Defer.deferred();
                var request = options.xhr = Titanium.Network.createHTTPClient();
                request.open(method, url);
                options.timeout > 0 && (request.timeout = options.timeout);
                for (var name in headers) headers.hasOwnProperty(name) && request.setRequestHeader(name, headers[name]);
                isMobileWeb && options.file && request._xhr.overrideMimeType("text/plain; charset=x-user-defined");
                if (isMobileWeb) {
                    var abort = request.abort;
                    request.abort = function() {
                        if (request.DONE > request.readyState) {
                            request.onerror({
                                type: "timeout"
                            });
                            request.onerror = function() {};
                        }
                        return abort.apply(request, arguments);
                    };
                }
                request.onerror = request.onload = function(event) {
                    KINVEY_DEBUG && log("The network request completed.", request);
                    event = event || {};
                    isString(event.error) && -1 !== event.error.toLowerCase().indexOf("timed out") && (event.type = "timeout");
                    var status = "timeout" === event.type ? 0 : request.status;
                    if (2 === parseInt(status / 100, 10) || 304 === status) {
                        var response = !isMobileWeb && options.file ? request.responseData : request.responseText;
                        if (isMobileWeb && options.file && null != response) {
                            var buffer = new root.ArrayBuffer(response.length);
                            var bufView = new root.Uint8Array(buffer);
                            for (var i = 0, length = response.length; length > i; i += 1) bufView[i] = response.charCodeAt(i);
                            response = new Titanium.Blob({
                                data: bufView,
                                length: bufView.length,
                                mimeType: options.file
                            });
                        }
                        deferred.resolve(response || null);
                    } else deferred.reject(request.responseText || event.type || null);
                };
                KINVEY_DEBUG && log("Initiating a network request.", method, url, body, headers, options);
                if (isMobileWeb) {
                    var setHeader = request._xhr.setRequestHeader;
                    request._xhr.setRequestHeader = function(name) {
                        return "Content-Type" === name ? null : setHeader.apply(request._xhr, arguments);
                    };
                    if (body instanceof Titanium.Blob) {
                        var send = request._xhr.send;
                        request._xhr.send = function() {
                            return send.call(request._xhr, body._data);
                        };
                    }
                }
                isObject(body) && !isFunction(body.getLength) && (body = JSON.stringify(body));
                request.send(body);
                if (null != options.subject) {
                    var subject = options.subject;
                    delete options.subject;
                    isFunction(subject.trigger) && subject.trigger("request", subject, request, options);
                }
                return deferred.promise;
            }
        };
        Kinvey.Persistence.Net.use(TiHttp);
        return Kinvey;
    };
    var Kinvey = kinveyFn();
    "object" == typeof module && "object" == typeof module.exports ? module.exports = Kinvey : "function" == typeof define && define.amd ? define("kinvey", [], function() {
        return Kinvey;
    }) : root.Kinvey = Kinvey;
}).call(this);