import './styles.scss';
import App from '@core/App';

const root = document.getElementById('root');

if (root) {
  const app: App = new App(root);
  app.run();
}
