export function simplifyPlayCount(num: number) {
    return Math.floor(num / 10000) + '万';
}
