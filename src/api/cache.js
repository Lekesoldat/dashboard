// By @fshauge
export const createResource = factory => {
  const cache = {};

  return {
    read: (key = 'default', ...args) => {
      if (key in cache) {
        return cache[key];
      }

      const execute = async () => {
        cache[key] = await factory(key, ...args);
      };

      throw execute();
    }
  };
};
