import { forbiddenWord } from "./../constant/index";
import { decode_utf8, encode_utf8 } from "./utf-8";
const checkSingerWord = (word: string) => {
  var result = false;
  var DataInput = String(word);
  for (let index = 0; index < forbiddenWord.length; index++) {
    const element = forbiddenWord[index];
    if (encode_utf8(DataInput) == encode_utf8(element)) {
      result = true;
    }
  }
  if (word === "") {
    result = false;
  }
  return result;
};

const checkForbiddenWordFun = (stringWord: string): boolean => {
  const key = stringWord.toLowerCase().split(/[~`!@#$%^&*()_.-]/g);
  var dataTemp = key.filter(checkSingerWord);
  // console.log(dataTemp, key);
  if (dataTemp.length >= 1) {
    return true;
  } else {
    return false;
  }
};
/*
 * if checkForbiddenWordFun return true this message is don't good
 * else that message is good for that
 */
export default checkForbiddenWordFun;
