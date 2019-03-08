const easing = (t: number) => Math.pow(t, 3);

export default function animate(
    duration: number,
    start: number,
    end: number,
    handler: any,
    elem: HTMLElement,
    cb?: any
) {
    const startTime = Date.now();
    let timer: any = null;

    function tick() {
        const percent = Math.min(1, (Date.now() - startTime) / duration);
        const offset = start + easing(percent) * (end - start);
        handler(elem, offset);
        if (percent === 1) {
            window.cancelAnimationFrame(timer);
            return;
        }
        timer = window.requestAnimationFrame(tick);
    }
    timer = window.requestAnimationFrame(tick);
    setTimeout(() => {
        if (cb) {
            cb(elem);
        }
    }, duration + 200);
}
