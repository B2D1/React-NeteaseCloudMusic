export function simplifyPlayCount(num: number) {
  if (`${Math.floor(num)}`.length > 8) {
    const dotIndex = `${num / 10e7}`.indexOf('.');
    return `${num / 10e7}`.substring(0, dotIndex + 2) + '亿';
  }
  return Math.floor(num / 10e3) + '万';
}
