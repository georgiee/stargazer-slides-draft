var svg = document.getElementById('nightsky');
var size = 10;
var shootingStar;
shootingStar = createShootingStar({ x: 100, y: 100, radius: 100, angleStart: -90, angle: -180, debug: true });
svg.appendChild(shootingStar);
function createShootingStar(_a) {
    var x = _a.x, y = _a.y, radius = _a.radius, angle = _a.angle, _b = _a.angleStart, angleStart = _b === void 0 ? 0 : _b, _c = _a.debug, debug = _c === void 0 ? false : _c;
    var shootingStarShape = createSVGElement('circle');
    shootingStarShape.classList.add('shooting-star__shape');
    var shootingStar = createSVGElement('g');
    shootingStar.classList.add('shooting-star');
    shootingStar.setAttribute('transform', "translate(" + x + " " + y + ")");
    shootingStarShape.style.setProperty('--shooting-orbit-radius', radius + 'px');
    shootingStarShape.style.setProperty('--shooting-orbit-angle', angle + 'deg');
    shootingStarShape.style.setProperty('--shooting-orbit-angle-start', angleStart + 'deg');
    shootingStarShape.setAttribute('r', size);
    shootingStarShape.setAttribute('fill', 'white');
    if (debug) {
        debugShootingStar(shootingStar, radius, angleStart, angle);
    }
    shootingStar.appendChild(shootingStarShape);
    return shootingStar;
}
function debugShootingStar(star, radius, angleStart, angle) {
    var debugOrbit = createSVGElement('circle');
    debugOrbit.setAttribute('r', radius.toString());
    debugOrbit.setAttribute('fill', "yellow");
    debugOrbit.style.opacity = (0.3).toString();
    var markCenter = createSVGElement('circle');
    markCenter.setAttribute('r', 5);
    markCenter.setAttribute('fill', 'yellow');
    // create arc to visualize the travelling path
    var arc = createSVGElement('path');
    arc.setAttribute('fill', 'none');
    arc.setAttribute('stroke', 'red');
    arc.setAttribute('stroke-width', 'yellow');
    arc.classList.add('debug__arc');
    arc.setAttribute("d", describeArc(0, 0, radius, angleStart, angle));
    var starDebug = createSVGElement('g');
    starDebug.classList.add('shooting-star__debug');
    starDebug.appendChild(markCenter);
    starDebug.appendChild(debugOrbit);
    starDebug.appendChild(arc);
    star.appendChild(starDebug);
}
function createSVGElement(tag) {
    var element = document.createElementNS("http://www.w3.org/2000/svg", tag);
    return element;
}
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}
// Works for +360 and a total delta of -180
// via https://stackoverflow.com/questions/52056486/draw-reversed-circle-arc-changes-circle-center-coordinates
function describeArc(x, y, radius, startAngle, endAngle) {
    startAngle += 90;
    endAngle += 90;
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);
    var sweepFlag = endAngle > startAngle ? 0 : 1;
    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    if (endAngle - startAngle < -180) {
        largeArcFlag = "1";
    }
    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, sweepFlag, end.x, end.y
    ].join(" ");
    return d;
}
var shootingStar = document.querySelector('.shooting-star');
function toggle() {
    svg.classList.toggle('disable-debug');
}