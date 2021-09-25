export const encode_utf8 = (s: string) => {
  return unescape(encodeURIComponent(s));
};

export const decode_utf8 = (s: string) => {
  return decodeURIComponent(escape(s));
};
