export default function throttle(fn: any, context: any, delay: number) {
    let last = Date.now();

    return function(...args: any[]) {
        const now = Date.now();
        if (now - last > delay) {
            fn.call(context, ...args);
            last = now;
        }
    };
}
