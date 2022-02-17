// type and theme map
export const tagTheme = {
  Default: 'primary',
  Music: 'light',
  Coding: 'primary',
  City: 'light',
}

export function randomId() {
  const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0]
  return uint32.toString(16)
}
