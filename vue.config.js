module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/retirement/'
    : '/',
  runtimeCompiler: true,
};
