export default function recursiveGetter(
  obj: any,
  name: string,
  _default: any = undefined
) {
  const _name = name.replace(/\[/g, '.[');
  const names = _name.split('.');
  let val = obj;
  let it: number | string;
  for (let idx = 0; idx < names.length; idx++) {
    it = names[idx];
    if (it[0] == '[') {
      it = parseInt(it.substring(1, it.length - 1));
    }
    val = val?.[it];
    if (val == undefined) return _default;
  }
  return val;
}
