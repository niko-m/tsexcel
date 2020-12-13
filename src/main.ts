import './styles.scss';
import App from '@core/App';

console.log('Hello World from your main file!');
console.log(process.env.NODE_ENV);

const root = document.getElementById('root');

if (root) {
  const app: App = new App(root);
  app.run();
}
