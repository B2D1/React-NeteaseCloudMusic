export default function throttle(fn: any, context: any, delay: number) {
  let last = Date.now();
  let timer: any = null;

  return function(...args: any[]) {
    const now = Date.now();
    const remain = delay - (now - last);
    clearTimeout(timer);
    if (remain <= 0) {
      fn.call(context, ...args);
      last = now;
    } else {
      timer = setTimeout(fn, remain);
    }
  };
}
