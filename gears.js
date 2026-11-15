/* gears.js — draws the spinning gear train beside the name on the home page.
   It paints into <canvas class="gears" id="gears"> using plain canvas drawing, no libraries.
   Line colours come from --fg and --accent in style.css, so they follow the theme. */

(function () {
  "use strict";

  /* ── Settings you can change ──────────────────────────────────────────── */

  // One entry per gear, in the order they mesh. More teeth = bigger gear.
  //   holes: round cut-outs in the gear body (0 for none)
  //   accent: true draws it in the highlight colour
  var GEARS = [
    { teeth: 30, holes: 6 },
    { teeth: 14, holes: 0, accent: true },
    { teeth: 22, holes: 4 },
  ];

  // Direction (in radians) from each gear to the next one. First entry is unused.
  var DIRECTIONS = [0, 0.35, -0.9];

  var SPEED = 0.18;          // turning speed of the first gear; 0 stops the spin
  var SCROLL_SPEED = 0.0035; // extra turning per pixel scrolled
  var TILT_X = -0.5;         // how far the train leans back (radians)
  var TILT_Y = 0.55;         // how far it is turned sideways (radians)
  var FOLLOW_MOUSE = true;   // lean slightly toward the pointer
  var THICKNESS = 0.22;      // gear thickness
  var LINE_OPACITY = 0.6;    // normal gears (the accent gear is always solid)
  var FILL_OPACITY = 0.035;  // faint tint on the gear faces
  var FIT = 0.9;             // share of the canvas the train may fill

  /* ── Gear shape ───────────────────────────────────────────────────────── */

  var MODULE = 0.1;          // tooth size; meshing gears must share it
  var TIP_HALF = 0.125;      // half the tooth-tip width, as a fraction of one tooth step
  var FLANK = 0.075;         // width of the sloped tooth side, same units
  var CIRCLE_STEPS = 48;

  function pitchRadius(gear) {
    return (MODULE * gear.teeth) / 2;
  }

  function circle(cx, cy, r) {
    var points = [];
    for (var i = 0; i < CIRCLE_STEPS; i++) {
      var a = (i / CIRCLE_STEPS) * Math.PI * 2;
      points.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
    }
    return points;
  }

  // Flat outline of one gear: the toothed rim, then the centre bore and any cut-outs.
  function gearOutline(gear) {
    var pitchR = pitchRadius(gear);
    var outerR = pitchR + MODULE;
    var rootR = pitchR - 1.25 * MODULE;
    var step = (Math.PI * 2) / gear.teeth;
    var corners = [
      [outerR, -TIP_HALF],
      [outerR, TIP_HALF],
      [rootR, TIP_HALF + FLANK],
      [rootR, 1 - TIP_HALF - FLANK],
    ];

    var rim = [];
    for (var i = 0; i < gear.teeth; i++) {
      for (var j = 0; j < corners.length; j++) {
        var a = (i + corners[j][1]) * step;
        rim.push([corners[j][0] * Math.cos(a), corners[j][0] * Math.sin(a)]);
      }
    }

    var loops = [circle(0, 0, Math.max(rootR * 0.28, MODULE * 1.2))];
    for (var h = 0; h < gear.holes; h++) {
      var ha = (h / gear.holes) * Math.PI * 2 + Math.PI / gear.holes;
      loops.push(circle(rootR * 0.6 * Math.cos(ha), rootR * 0.6 * Math.sin(ha), rootR * 0.14));
    }
    return { rim: rim, loops: loops };
  }

  // Where each gear sits and how it turns, so the teeth of neighbours actually mesh.
  // Gear 0 turns at t; gear i turns at t * (teeth of gear 0 / teeth of gear i), alternating direction.
  function layoutTrain(gears, directions) {
    var centers = [[0, 0]];
    var phase = [0];
    var ratio = [1];
    for (var i = 1; i < gears.length; i++) {
      var prev = gears[i - 1];
      var cur = gears[i];
      var stepPrev = (Math.PI * 2) / prev.teeth;
      var stepCur = (Math.PI * 2) / cur.teeth;
      // The next gear has to sit in line with a tooth of the previous one: snap to the nearest.
      var wanted = directions[i] || 0;
      var snapped = phase[i - 1] + Math.round((wanted - phase[i - 1]) / stepPrev) * stepPrev;
      var distance = pitchRadius(prev) + pitchRadius(cur);
      centers.push([
        centers[i - 1][0] + Math.cos(snapped) * distance,
        centers[i - 1][1] + Math.sin(snapped) * distance,
      ]);
      ratio.push(-ratio[i - 1] * (prev.teeth / cur.teeth));
      // A gap of this gear must face the previous one.
      phase.push(snapped + Math.PI - stepCur / 2);
    }
    return { centers: centers, phase: phase, ratio: ratio };
  }

  /* ── Drawing ──────────────────────────────────────────────────────────── */

  var canvas = document.getElementById("gears");
  var ctx = canvas && canvas.getContext ? canvas.getContext("2d") : null;
  if (!ctx) return;

  var outlines = GEARS.map(gearOutline);
  var train = layoutTrain(GEARS, DIRECTIONS);

  // Bounding box of the whole train, used to centre it and scale it to the canvas.
  var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  train.centers.forEach(function (c, i) {
    var r = pitchRadius(GEARS[i]) + MODULE;
    minX = Math.min(minX, c[0] - r);
    maxX = Math.max(maxX, c[0] + r);
    minY = Math.min(minY, c[1] - r);
    maxY = Math.max(maxY, c[1] + r);
  });
  var midX = (minX + maxX) / 2;
  var midY = (minY + maxY) / 2;

  // A camera 8 units back with a 30° field of view.
  var CAMERA_Z = 8;
  var VIEW_HEIGHT = 2 * CAMERA_Z * Math.tan((15 * Math.PI) / 180);

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var colors = { fg: "#000", accent: "#000" };
  var width = 0, height = 0, dpr = 1;
  var turn = 0;                  // how far gear 0 has turned
  var tiltX = 0, tiltY = 0;      // current lean, eased toward the target
  var pointerX = 0, pointerY = 0;
  var visible = true;
  var lastTime = null;
  var frame = null;

  function readColors() {
    var style = getComputedStyle(document.documentElement);
    colors.fg = style.getPropertyValue("--fg").trim();
    colors.accent = style.getPropertyValue("--accent").trim();
  }

  function resize() {
    var box = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = box.width;
    height = box.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
  }

  function draw() {
    if (!width || !height) return;
    var viewWidth = (VIEW_HEIGHT * width) / height;
    var scale = Math.min(viewWidth / (maxX - minX), VIEW_HEIGHT / (maxY - minY)) * FIT;
    var pixelsPerUnit = height / VIEW_HEIGHT;
    var cosX = Math.cos(tiltX), sinX = Math.sin(tiltX);
    var cosY = Math.cos(tiltY), sinY = Math.sin(tiltY);
    var spin = turn + window.scrollY * SCROLL_SPEED;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1 / dpr;
    ctx.lineJoin = "round";

    GEARS.forEach(function (gear, i) {
      var angle = train.phase[i] + spin * train.ratio[i];
      var cosA = Math.cos(angle), sinA = Math.sin(angle);
      var cx = train.centers[i][0] - midX;
      var cy = train.centers[i][1] - midY;

      // Gear-local point → spin → place in the train → tilt → perspective → canvas pixels.
      function project(p, z) {
        var x = (p[0] * cosA - p[1] * sinA + cx) * scale;
        var y = (p[0] * sinA + p[1] * cosA + cy) * scale;
        z *= scale;
        var x1 = x * cosY + z * sinY;
        var z1 = -x * sinY + z * cosY;
        var y2 = y * cosX - z1 * sinX;
        var z2 = y * sinX + z1 * cosX;
        var k = (pixelsPerUnit * CAMERA_Z) / (CAMERA_Z - z2);
        return [width / 2 + x1 * k, height / 2 - y2 * k];
      }

      function trace(points, z) {
        points.forEach(function (p, n) {
          var s = project(p, z);
          if (n === 0) ctx.moveTo(s[0], s[1]);
          else ctx.lineTo(s[0], s[1]);
        });
        ctx.closePath();
      }

      var half = THICKNESS / 2;
      var outline = outlines[i];
      ctx.strokeStyle = gear.accent ? colors.accent : colors.fg;
      ctx.fillStyle = colors.fg;

      [half, -half].forEach(function (z) {
        ctx.beginPath();
        trace(outline.rim, z);
        outline.loops.forEach(function (loop) {
          trace(loop, z);
        });
        if (z > 0) {
          ctx.globalAlpha = FILL_OPACITY;
          ctx.fill("evenodd");
        }
        ctx.globalAlpha = gear.accent ? 1 : LINE_OPACITY;
        ctx.stroke();
      });

      // Edges across the thickness, one per tooth corner.
      ctx.beginPath();
      outline.rim.forEach(function (p) {
        var front = project(p, half);
        var back = project(p, -half);
        ctx.moveTo(front[0], front[1]);
        ctx.lineTo(back[0], back[1]);
      });
      ctx.stroke();
    });
    ctx.globalAlpha = 1;
  }

  function targetTilt() {
    var follow = FOLLOW_MOUSE && !reduceMotion.matches;
    return [TILT_X - (follow ? pointerY * 0.18 : 0), TILT_Y + (follow ? pointerX * 0.25 : 0)];
  }

  function tick(time) {
    frame = null;
    var delta = lastTime === null ? 0 : Math.min((time - lastTime) / 1000, 0.1);
    lastTime = time;
    turn += delta * SPEED;
    var target = targetTilt();
    var ease = 1 - Math.exp(-3 * delta);
    tiltX += (target[0] - tiltX) * ease;
    tiltY += (target[1] - tiltY) * ease;
    draw();
    schedule();
  }

  // Animate only while the gears are on screen and motion is allowed.
  function schedule() {
    if (frame === null && visible && !reduceMotion.matches) frame = requestAnimationFrame(tick);
  }

  // One still frame, used when motion is reduced and after a resize or theme change.
  function drawStill() {
    if (reduceMotion.matches) {
      var target = targetTilt();
      tiltX = target[0];
      tiltY = target[1];
    }
    draw();
  }

  window.addEventListener("pointermove", function (e) {
    pointerX = (e.clientX / window.innerWidth) * 2 - 1;
    pointerY = -((e.clientY / window.innerHeight) * 2 - 1);
  }, { passive: true });

  new ResizeObserver(function () {
    resize();
    drawStill();
  }).observe(canvas);

  new IntersectionObserver(function (entries) {
    visible = entries[entries.length - 1].isIntersecting;
    lastTime = null;
    schedule();
  }).observe(canvas);

  // Redraw in the new colours when the theme switch flips class="dark" on <html>.
  new MutationObserver(function () {
    readColors();
    drawStill();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

  reduceMotion.addEventListener("change", function () {
    lastTime = null;
    drawStill();
    schedule();
  });

  readColors();
  resize();
  drawStill();
  schedule();
})();
