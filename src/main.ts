import './styles.scss';
import {greetings as greeting} from './greeting';
import image from './assets/logo.png';

console.log('Hello World from your main file!');

const root = document.getElementById('root');

if (root) {
  const header = document.createElement('h1');
  header.innerHTML = greeting;
  root.appendChild(header);

  const img = document.createElement('img');
  img.src = image;
  root.appendChild(img);
}
