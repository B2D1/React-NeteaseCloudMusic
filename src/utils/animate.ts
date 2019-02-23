const easing = (t: number) => Math.pow(t, 3);

export default function animate(
    durationTime: number,
    oldValue: number,
    value: number,
    handler: any,
    target: any,
    cb?: any
) {
    const startTime = Date.now();
    let timer: any = null;

    function step() {
        const percent = Math.min(1, (Date.now() - startTime) / durationTime);
        const offset = oldValue + easing(percent) * (value - oldValue);
        handler(target, offset);
        if (percent === 1) {
            window.cancelAnimationFrame(timer);
            if (cb) {
                cb(target);
            }
            return;
        }
        timer = window.requestAnimationFrame(step);
    }
    timer = window.requestAnimationFrame(step);
}
