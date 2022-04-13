import Conf from 'conf';

const conf = new Conf();
export default conf;

export const moduleConf = (moduleName: string) => {
  const genCompositeKey = (key: string) => `${moduleName}.${key}`;
  const set = (key: string, value: any) => {
    conf.set(genCompositeKey(key), value);
  };
  const get = (key: string) => {
    return conf.get(genCompositeKey(key));
  };
  const has = (key: string) => {
    return conf.has(genCompositeKey(key));
  };
  const del = (key: string) => {
    conf.delete(genCompositeKey(key));
  };
  return { set, get, has, del };
};
export type ModuleConf = ReturnType<typeof moduleConf>;
