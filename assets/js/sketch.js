/**
     * Copyright (C) 2012 by Justin Windle
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
var Sketch = function () {
  function c(i) {
    i = h(i || {}, o);
    var s = "sketch-" + e++,
      f = document.createElement("canvas");
    switch (i.type) {
      case n:
        try {
          r = f.getContext("webgl", i)
        } catch (l) {}
        try {
          r = r || f.getContext("experimental-webgl", i)
        } catch (l) {}
        if (!r) throw "WebGL not supported";
        break;
      case t:
        try {
          r = f.getContext("2d", i)
        } catch (l) {}
        if (!r) throw "Canvas not supported";
        break;
      default:
        f = r = document.createElement("div")
    }
    return f.className = "sketch", f.id = s, i.container.appendChild(f), h(self, u), h(r, i), h(r, a), d(), m(), r
      .autostart && setTimeout(r.start, 0), r
  }

  function h(e, t) {
    for (var n in t) e.hasOwnProperty(n) || (e[n] = t[n]);
    return e
  }

  function p(e) {
    function n(e, t) {
      return function () {
        e.call(t, arguments)
      }
    }
    var t = {};
    for (var r in e) typeof e[r] == "function" ? t[r] = n(e[r], e) : t[r] = e[r];
    return t
  }

  function d() {
    function n(t) {
      return e[t] || String.fromCharCode(t)
    }

    function i(e) {
      r.mouse.ox = r.mouse.x, r.mouse.oy = r.mouse.y, r.mouse.x = e.x, r.mouse.y = e.y, r.mouse.dx = r.mouse.x - r
        .mouse.ox, r.mouse.dy = r.mouse.y - r.mouse.oy
    }

    function o(e) {
      var t, n = p(e);
      n.original = e;
      for (var i = r.canvas, o = 0, u = 0; i; i = i.offsetParent) o += i.offsetLeft, u += i.offsetTop;
      if (n.touches && !!n.touches.length)
        for (var a = n.touches.length - 1, f; a >= 0; a--) f = n.touches[a], f.x = f.pageX - o, f.y = f.pageY - u,
          t = s[a] || f, f.dx = f.x - t.x, f.dy = f.y - t.x, f.ox = t.x, f.oy = t.y, s[a] = p(f);
      else n.x = n.pageX - o, n.y = n.pageY - u, t = s.mouse || n, n.dx = n.x - t.x, n.dy = n.y - t.y, n.ox = t.x,
        n.oy = t.y, s.mouse = n;
      return n
    }

    function u(e) {
      e.preventDefault(), e = o(e), r.touches = e.touches, i(r.touches[0]), r.touchstart && r.touchstart(e), r
        .mousedown && r.mousedown(e)
    }

    function c(e) {
      e = o(e), r.touches = e.touches, i(r.touches[0]), r.touchmove && r.touchmove(e), r.mousemove && r.mousemove(
        e)
    }

    function h(e) {
      e = o(e);
      if (!e.touches.length) s = {};
      else
        for (var t in s) e.touches[t] || delete s[t];
      r.touchend && r.touchend(e), r.mouseup && r.mouseup(e)
    }

    function d(e) {
      e = o(e), r.mouseover && r.mouseover(e)
    }

    function v(e) {
      e = o(e), r.dragging || (l(r.canvas, "mousemove", g), l(r.canvas, "mouseup", b), f(document, "mousemove",
          g), f(document, "mouseup", b), r.dragging = !0), r.touches = [e], r.touchstart && r.touchstart(e), r
        .mousedown && r.mousedown(e)
    }

    function g(e) {
      e = o(e), i(e), r.touches = [e], r.touchmove && r.touchmove(e), r.mousemove && r.mousemove(e)
    }

    function y(e) {
      e = o(e), r.mouseout && r.mouseout(e)
    }

    function b(e) {
      e = o(e), r.dragging && (l(document, "mousemove", g), l(document, "mouseup", b), f(r.canvas, "mousemove",
          g), f(r.canvas, "mouseup", b), r.dragging = !1), delete s.mouse, r.touchend && r.touchend(e), r
        .mouseup && r.mouseup(e)
    }

    function w(e) {
      e = o(e), r.click && r.click(e)
    }

    function E(e) {
      r.keys[n(e.keyCode)] = !0, r.keys[e.keyCode] = !0, r.keydown && r.keydown(e)
    }

    function S(e) {
      r.keys[n(e.keyCode)] = !1, r.keys[e.keyCode] = !1, r.keyup && r.keyup(e)
    }
    var e = {
      8: "BACKSPACE",
      9: "TAB",
      13: "ENTER",
      16: "SHIFT",
      27: "ESCAPE",
      32: "SPACE",
      37: "LEFT",
      38: "UP",
      39: "RIGHT",
      40: "DOWN"
    };
    for (var t in e) a.keys[e[t]] = !1;
    var s = {};
    f(r.canvas, "touchstart", u), f(r.canvas, "touchmove", c), f(r.canvas, "touchend", h), f(r.canvas,
      "mouseover", d), f(r.canvas, "mousedown", v), f(r.canvas, "mousemove", g), f(r.canvas, "mouseout", y), f(r
      .canvas, "mouseup", b), f(r.canvas, "click", w), f(document, "keydown", E), f(document, "keyup", S), f(
      window, "resize", m)
  }

  function v(e) {
    i || (r.dt = (e = e || Date.now()) - r.now, r.millis += r.dt, r.now = e, r.update && r.update(r.dt), r
      .autoclear && r.clear(), r.draw && r.draw(r)), i = ++i % r.interval, s = requestAnimationFrame(v)
  }

  function m(e) {
    r.fullscreen ? (r.height = r.canvas.height = window.innerHeight, r.width = r.canvas.width = window
      .innerWidth) : (r.canvas.height = r.height, r.canvas.width = r.width), r.resize && r.resize()
  }
  var e = 0,
    t = "canvas",
    n = "web-gl",
    r, i = 0,
    s = -1,
    o = {
      fullscreen: !0,
      autostart: !0,
      autoclear: !0,
      autopause: !0,
      container: document.body,
      interval: 1,
      type: t
    },
    u = {
      PI: Math.PI,
      TWO_PI: Math.PI * 2,
      HALF_PI: Math.PI / 2,
      QUARTER_PI: Math.PI / 4,
      sin: Math.sin,
      cos: Math.cos,
      tan: Math.tan,
      pow: Math.pow,
      exp: Math.exp,
      min: Math.min,
      max: Math.max,
      sqrt: Math.sqrt,
      atan: Math.atan,
      atan2: Math.atan2,
      ceil: Math.ceil,
      round: Math.round,
      floor: Math.floor,
      random: function (e, t) {
        return e && typeof e.length == "number" && !!e.length ? e[Math.floor(Math.random() * e.length)] : (
          typeof t != "number" && (t = e || 1, e = 0), e + Math.random() * (t - e))
      }
    },
    a = {
      millis: 0,
      now: NaN,
      dt: NaN,
      keys: {},
      mouse: {
        x: 0,
        y: 0,
        ox: 0,
        oy: 0,
        dx: 0,
        dy: 0
      },
      touches: [],
      initialized: !1,
      dragging: !1,
      running: !1,
      start: function () {
        if (r.running) return;
        r.setup && !r.initialized && (r.autopause && (f(window, "focus", r.start), f(window, "blur", r.stop)), r
          .setup()), r.initialized = !0, r.running = !0, r.now = Date.now(), v()
      },
      stop: function () {
        cancelAnimationFrame(s), r.running = !1
      },
      clear: function () {
        r.canvas && (r.canvas.width = r.canvas.width)
      }
    },
    f = function () {
      if (window.addEventListener) return function (e, t, n) {
        e.addEventListener(t, n, !1)
      };
      if (window.attachEvent) return function (e, t, n) {
        e.attachEvent("on" + t, n)
      };
      el["on" + ev] = fn
    }(),
    l = function () {
      if (window.removeEventListener) return function (e, t, n) {
        e.removeEventListener(t, n, !1)
      };
      if (window.detachEvent) return function (e, t, n) {
        e.detachEvent("on" + t, n)
      };
      el["on" + ev] = null
    }();
  return {
    CANVAS: t,
    WEB_GL: n,
    create: c
  }
}();
Date.now || (Date.now = function () {
    return +(new Date)
  }),
  function () {
    for (var e = 0, t = ["ms", "moz", "webkit", "o"], n = 0; n < t.length && !window.requestAnimationFrame; ++n)
      window.requestAnimationFrame = window[t[n] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[
        n] + "CancelAnimationFrame"] || window[t[n] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function (t) {
      var n = Date.now(),
        r = Math.max(0, 16 - (n - e)),
        i = window.setTimeout(function () {
          t(n + r)
        }, r);
      return e = n + r, i
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (e) {
      clearTimeout(e)
    })
  }();




/**
 * 
 */
var Capabilities = {
  isOnline: function () {
    return navigator.onLine;
  },

  isTouchDevice: function () {
    return navigator.userAgent.match(/(iphone|ipad|ipod|android)/gi);
  },

  suportsLocalStorage: function () {
    return ('localStorage' in window) && window['localStorage'] !== null;
  }
};

/**
 * Defines a 2D position.
 */
function Point(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

Point.prototype.distanceTo = function (x, y) {
  var dx = x - this.x;
  var dy = y - this.y;
  return Math.sqrt(dx * dx + dy * dy);
};

Point.prototype.clonePosition = function () {
  return {
    x: this.x,
    y: this.y
  };
};

Point.prototype.interpolate = function (x, y, amp) {
  this.x += (x - this.x) * amp;
  this.y += (y - this.y) * amp;
};

/**
 * Defines of a rectangular region.
 */
function Region() {
  this.left = 999999;
  this.top = 999999;
  this.right = 0;
  this.bottom = 0;
}

Region.prototype.reset = function () {
  this.left = 999999;
  this.top = 999999;
  this.right = 0;
  this.bottom = 0;
};

Region.prototype.inflate = function (x, y) {
  this.left = Math.min(this.left, x);
  this.top = Math.min(this.top, y);
  this.right = Math.max(this.right, x);
  this.bottom = Math.max(this.bottom, y);
};

Region.prototype.expand = function (x, y) {
  this.left -= x;
  this.top -= y;
  this.right += x;
  this.bottom += y;
};

Region.prototype.contains = function (x, y) {
  return x > this.left && x < this.right && y > this.top && y < this.bottom;
};

Region.prototype.size = function () {
  return ((this.right - this.left) + (this.bottom - this.top)) / 2;
};

Region.prototype.center = function () {
  return new Point(this.left + (this.right - this.left) / 2, this.top + (this.bottom - this.top) / 2);
};

Region.prototype.toRectangle = function () {
  return {
    x: this.left,
    y: this.top,
    width: this.right - this.left,
    height: this.bottom - this.top
  };
};



// shim layer with setTimeout fallback from http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function ( /* function */ callback, /* DOMElement */ element) {
      window.setTimeout(callback, 1000 / 60);
    };
})();



/**
 * @author Hakim El Hattab
 */
(function () {

  var NODES_X = Math.ceil(window.innerWidth * 0.02),
    NODES_Y = Math.ceil(window.innerHeight * 0.02),

    BEAT_VELOCITY = 0.01,
    BEAT_FREQUENCY = 2,
    BEAT_LIMIT = 3,

    // Distance threshold between active node and beat
    ACTIVATION_DISTANCE = 10,

    // Number of neighboring nodes to push aside on impact
    WAVE_RADIUS = 4;

  // The world dimensions
  var world = {
      width: window.innerWidth,
      height: window.innerHeight,
      center: new Point(window.innerWidth / 2, window.innerHeight / 2)
    },

    id = 0,

    container,
    styles,

    query = {},

    activateNodeDistance = 0,
    currentBeat = null,
    currentStyle = null,

    nodes = [],
    beats = [];

  /**
   * 
   */
  function initialize() {
    var ctx = Sketch.create();

    container = document.querySelector('#sketch-animation');
    container.appendChild(ctx.canvas)
    styles = document.querySelector('.styles');
    styles.addEventListener('change', onStyleChanged, false);

    var hash = window.location.hash.slice(1);
    console.log(hash);
    if (hash.length > 1) styles.value = hash;

    currentStyle = "none";

    // ctx.autoclear = false;

    ctx.setup = function () {
      // Distance between nodes
      var cx = world.width / (NODES_X + 1),
        cy = world.height / (NODES_Y + 1);

      activateNodeDistance = Math.min(cx, cy) * 0.5;

      var i,
        j,
        x = 0,
        y = 0,
        len = NODES_X * NODES_Y;

      // Generate nodes
      for (y = 0; y < NODES_Y; y++) {
        for (x = 0; x < NODES_X; x++) {
          nodes.push(new Node(cx + x * cx, cy + y * cy, x, y));
        }
      }

      // Determine node neighbors
      for (i = 0; i < len; i++) {
        var nodeA = nodes[i];

        for (j = 0; j < len; j++) {
          var nodeB = nodes[j];

          if (nodeA !== nodeB && nodeB.distanceToNode(nodeA) < WAVE_RADIUS) {
            nodeA.neighbors.push(nodeB);
          }
        }
      }

      // Generate beats
      for (i = 0; i < BEAT_LIMIT; i++) {
        var beat = new Beat(
          world.center.x,
          world.center.y,
          i
        );

        beats.push(beat);
      }
    }

    ctx.draw = function () {
      // ctx.fillStyle = 'rgba( 0, 0, 0, 0.3 )';
      // ctx.fillRect( 0, 0, world.width, world.height );

      // Render nodes
      for (var i = 0, len = nodes.length; i < len; i++) {
        var node = nodes[i];

        this.updateNode(node);
        this.drawNode(node);
      }

      // Render beats
      ctx.save();

      var activeBeats = 0;

      for (var i = 0, len = beats.length; i < len; i++) {
        var beat = beats[i];

        this.updateBeat(beat);
        this.drawBeat(beat);

        if (beat.active) activeBeats++;
      }

      ctx.restore();

      var nextBeat = currentBeat ? beats[(currentBeat.index + 1) % beats.length] : null;

      if (!currentBeat) {
        currentBeat = beats[0];
        currentBeat.activate();
      } else if (!nextBeat.active && activeBeats < BEAT_FREQUENCY && currentBeat.strength > 1 /
        BEAT_FREQUENCY) {
        currentBeat = nextBeat;
        currentBeat.activate();
      }
    }

    ctx.updateNode = function (node) {
      // Active nodes that the mouse touches when pressed down
      if (ctx.dragging) {
        if (node.distanceTo(ctx.mouse.x, ctx.mouse.y) < activateNodeDistance) {
          if (node.active === false) {
            node.activate();
          }
        }
      }

      // node.strength = Math.max( node.strength - 0.01, 0 );
      // node.strength += ( node.strengthTarget - node.strength ) * 0.2;
      node.size += (node.sizeTarget - node.size) * 0.05;

      if (node.growing) {
        node.strength = Math.min(node.strength + 0.15, 1);
      } else {
        node.strength = Math.max(node.strength - 0.02, 0);
      }

      if (node.strength === 1) {
        node.growing = false;
      }

      node.offsetTargetX *= 0.6;
      node.offsetTargetY *= 0.6;

      node.offsetX += (node.offsetTargetX - node.offsetX) * 0.2;
      node.offsetY += (node.offsetTargetY - node.offsetY) * 0.2;

      if (node.strength > 0.1) {
        for (j = 0, jlen = node.neighbors.length; j < jlen; j++) {
          var neighbor = node.neighbors[j];

          var radians = Math.atan2(node.indexh - neighbor.indexh, node.indexv - neighbor.indexv),
            distance = node.distanceToNode(neighbor) * 0.75;

          neighbor.offsetX += Math.sin(radians - Math.PI) * node.strength * (WAVE_RADIUS - distance);
          neighbor.offsetY += Math.cos(radians - Math.PI) * node.strength * (WAVE_RADIUS - distance);
        }
      }
    }

    ctx.drawNode = function (node) {
      // Angle and distance between node and center
      var radians = Math.atan2(world.center.y - node.y, world.center.x - node.x),
        distance = node.distanceTo(world.center.x, world.center.y);

      var distanceFactor = distance / Math.min(world.width, world.height);

      // Offset for the pin head
      var ox = node.offsetX + Math.cos(radians - Math.PI) * (30 * distanceFactor) * node.strength,
        oy = node.offsetY + Math.sin(radians - Math.PI) * (30 * distanceFactor) * node.strength;

      var anchorTR = getNodeByIndex(node.indexh + 1, node.indexv),
        anchorBR = getNodeByIndex(node.indexh + 1, node.indexv + 1),
        anchorBL = getNodeByIndex(node.indexh, node.indexv + 1);

      if (currentStyle === 'circle') {
        if (node.active) {
          ctx.beginPath();
          ctx.arc(node.paintedX, node.paintedY, node.size * 25 * (0.1 + node.strength), 0, Math.PI * 2, true);
          ctx.fillStyle = node.color;
          ctx.fill();

          node.size = 1;
        } else {
          node.size = node.sizeTarget || 1;
        }
      } else if (currentStyle === 'diagonal') {
        if (anchorTR && anchorBR && anchorBL) {
          ctx.beginPath();
          ctx.moveTo(node.paintedX, node.paintedY);
          ctx.lineTo(anchorBR.paintedX, anchorBR.paintedY);
          ctx.strokeStyle = node.color;
          ctx.stroke();
        }

        node.size = node.sizeTarget || 0;
      } else if (currentStyle === 'grid') {
        if (anchorTR && anchorBR && anchorBL) {
          ctx.beginPath();
          ctx.moveTo(node.paintedX, node.paintedY);
          ctx.lineTo(anchorTR.paintedX - 1, anchorTR.paintedY);
          ctx.lineTo(anchorBR.paintedX - 1, anchorBR.paintedY - 1);
          ctx.lineTo(anchorBL.paintedX, anchorBL.paintedY - 1);
          ctx.fillStyle = node.color;
          ctx.fill();
        }

        node.size = node.sizeTarget || 1;
      } else if (currentStyle === 'cross') {
        if (anchorTR && anchorBR && anchorBL) {
          ctx.beginPath();
          ctx.moveTo(node.paintedX, node.paintedY);
          ctx.lineTo(anchorBR.paintedX, anchorBR.paintedY);
          ctx.moveTo(anchorTR.paintedX, anchorTR.paintedY);
          ctx.lineTo(anchorBL.paintedX, anchorBL.paintedY);
          ctx.strokeStyle = node.color;
          ctx.stroke();
        }

        node.size = node.sizeTarget || 0;
      } else {
        node.size = node.sizeTarget || 2;
      }

      node.paintedX = node.x + ox;
      node.paintedY = node.y + oy;

      // Pin head
      ctx.beginPath();
      ctx.arc(node.paintedX, node.paintedY, node.size, 0, Math.PI * 2, true);
      ctx.fillStyle = node.color;
      ctx.fill();

      // if( node.strength ) {
      // 	var radius = 4 + node.size * 20 * node.strength;

      // 	ctx.beginPath();
      // 	ctx.arc( node.x, node.y, radius, 0, Math.PI * 2, true );

      // 	var gradient = ctx.createRadialGradient( node.x, node.y, 0, node.x, node.y, radius );
      // 	gradient.addColorStop( 0, node.activeColorA );
      // 	gradient.addColorStop( 1, node.activeColorB );

      // 	ctx.fillStyle = gradient;
      // 	ctx.fill();
      // }
    }

    ctx.updateBeat = function (beat) {
      if (beat.active) {
        beat.strength += BEAT_VELOCITY;
      }

      // Remove used up beats
      if (beat.strength > 1) {
        beat.deactivate();
      } else if (beat.active) {
        // Check for collision with nodes
        for (var j = 0, len = nodes.length; j < len; j++) {
          var node = nodes[j];

          if (node.active && node.collisionLevel < beat.level) {
            // Distance between the beat wave and node
            var distance = Math.abs(node.distanceTo(beat.x, beat.y) - (beat.size * beat.strength));

            if (distance < ACTIVATION_DISTANCE) {
              node.collisionLevel = beat.level;
              node.highlight();
            }
          }
        }
      }
    }

    ctx.drawBeat = function (beat) {
      if (beat.active && beat.strength > 0) {
        ctx.beginPath();
        ctx.arc(beat.x, beat.y, Math.max((beat.size * beat.strength) - 2, 0), 0, Math.PI * 2, true);
        ctx.lineWidth = 8;
        ctx.globalAlpha = 0.2 * (1 - beat.strength);
        ctx.strokeStyle = beat.color;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(beat.x, beat.y, beat.size * beat.strength, 0, Math.PI * 2, true);
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.8 * (1 - beat.strength);
        ctx.strokeStyle = beat.color;
        ctx.stroke();
      }
    }

    ctx.keydown = function (event) {
      if (event.keyCode == 32) {
        for (var i = 0, len = nodes.length; i < len; i++) {
          nodes[i].deactivate();
        }
      }
    }
  }

  function onStyleChanged(event) {
    window.location.hash = styles.value;
    // console.log(styles.value);
    currentStyle = styles.value;
  }

  function getNodeByIndex(h, v) {
    if (h >= NODES_X || h < 0 || v >= NODES_Y || v < 0) return null;

    return nodes[(v * NODES_X) + h];
  }

  /**
   * Represets one node/point in the grid.
   */
  function Node(x, y, indexh, indexv) {
    // invoke super
    this.constructor.apply(this, arguments);

    this.indexh = indexh;
    this.indexv = indexv;

    this.id = ++id;
    this.neighbors = [];
    this.collisionLevel = 0;
    this.active = false;
    this.growing = false;
    this.strength = 0;
    this.size = 0;
    this.sizeTarget = this.size;

    this.offsetX = 0;
    this.offsetY = 0;

    this.offsetTargetX = 0;
    this.offsetTargetY = 0;

    this.paintedX = this.x;
    this.paintedY = this.y;

    this.color = 'hsla(' + (x / world.width) * 360 + ', 50%, 60%, 1)'
    this.activeColorA = 'hsla(' + (x / world.width) * 360 + ', 50%, 60%, 0.8)';
    this.activeColorB = 'hsla(' + (x / world.width) * 360 + ', 50%, 60%, 0)';
  }
  Node.prototype = new Point();
  Node.prototype.distanceToNode = function (node) {
    var dx = node.indexh - this.indexh;
    var dy = node.indexv - this.indexv;

    return Math.sqrt(dx * dx + dy * dy);
  };
  Node.prototype.distanceTo = function (x, y) {
    var dx = x - this.paintedX;
    var dy = y - this.paintedY;

    return Math.sqrt(dx * dx + dy * dy);
  };
  Node.prototype.activate = function () {
    this.active = true;
    this.sizeTarget = 5;
  };
  Node.prototype.deactivate = function () {
    this.active = false;
    this.sizeTarget = 1;
  };
  Node.prototype.highlight = function (delay) {
    this.growing = true;
  };

  /**
   * Represents a beatwave that triggers nodes.
   */
  function Beat(x, y, index) {
    // invoke super
    this.constructor.apply(this, arguments);

    this.color = 'hsla(180, 100%, 100%, 0.2)';
    this.index = index;
    this.level = ++id;
    this.size = Math.max(world.width, world.height) * 0.65;
    this.active = false;
    this.strength = 0;
  };
  Beat.prototype = new Point();
  Beat.prototype.activate = function () {
    this.level = ++id;
    this.active = true;
    this.strength = 0;
  };
  Beat.prototype.deactivate = function () {
    this.active = false;
  };

  initialize();

})();