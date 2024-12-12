const body = document.getElementsByTagName("body")[0];
let mouseIsPressed = false;
window.onMouseHold = () => { }
body.addEventListener('mousedown', () => {
    mouseIsPressed = true;
});
body.addEventListener('mouseup', () => {
    mouseIsPressed = false;
});
body.addEventListener('mousemove', (event) => {
    window.mouseX = event.clientX;
    window.mouseY = event.clientY;
});

setInterval(() => {
    if (mouseIsPressed) window.onMouseHold();
}, 10);
window.bodyTag = body;
window.getDivSize = (element) => {
    if (!element || !(element instanceof HTMLElement)) {
        throw new Error("Invalid element provided. Ensure it is a valid HTMLElement.");
    }

    const rect = element.getBoundingClientRect();

    return { width: rect.width, height: rect.height };
}
window.getDivCenter = (element) => {
    if (!element || !(element instanceof HTMLElement)) {
        throw new Error("Invalid element provided. Ensure it is a valid HTMLElement.");
    }

    const rect = element.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    return { x: centerX, y: centerY };
}

window.getMagnitude = (vector) => {
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
}
window.normalizeVector = (vector) => {
    let magnitude = getMagnitude(vector);
    return {x: vector.x / magnitude, y: vector.y / magnitude}
}
window.createVector = (point1, point2) => {
    return {x: point2.x - point1.x, y: point2.y - point1.y};
};
window.createPoint = (x, y) => {
    return {x: x, y: y};
}
window.multiplyVector = (vector, factor) => {
    return {x: vector.x * factor, y: vector.y * factor}
}