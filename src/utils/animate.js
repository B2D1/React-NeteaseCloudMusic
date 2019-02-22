const easing = t => Math.pow(t, 3);

export default function animate(durationTime, oldValue, value, obj, handler) {
    const startTime = Date.now();
    let timer = null;

    function step() {
        let percent = Math.min(1, (Date.now() - startTime) / durationTime);
        let offset = oldValue + easing(percent) * (value - oldValue);
        handler(obj, offset);
        if (percent === 1) {
            window.cancelAnimationFrame(timer);
        }
        timer = window.requestAnimationFrame(step);
    }
    timer = window.requestAnimationFrame(step);
}
