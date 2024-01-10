function includes(s, w) {
  for (let i = 0; i <= s.length - w.length; i++) {
    let subString = s.substring(i, i + w.length);
    if (subString === w) return true;
  }
  return false;
}

console.log(includes('abcd'));
