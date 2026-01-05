export function limitLines(str, maxLines) {
  return str
    .split('\n')
    .filter((_line, index) => index < maxLines)
    .join('\n');
}

export function limitWords(str, maxWords) {
  return str
    .split(' ')
    .filter((v, i) => i < maxWords - 1)
    .join(' ');
}

export function limitChars(str, maxChars) {
  return str
    .split('')
    .filter((v, i) => i < maxChars)
    .join('');
}
