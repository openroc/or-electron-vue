export default [{
  path: '/',
  name: 'about',
  component: require('./components/about'),
}, {
  path: '*',
  redirect: '/',
}, ];
