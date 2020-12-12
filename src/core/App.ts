import {logo} from '@/assets/images';

/**
 * Main application class.
 */
export default class App {
  /**
   * @constructor
   * @param root Root block selector.
   */
  constructor(private root: HTMLElement) {}

  /**
   * Run application.
   */
  run(): void {
    const header = document.createElement('h1');
    header.innerHTML = 'Hello world!';
    this.root.appendChild(header);

    const text = document.createElement('p');
    text.innerText =
      'All waters deep. Itself. Over. Sixth, you upon, grass bearing.';
    this.root.appendChild(text);

    const img = document.createElement('img');
    img.src = logo;
    this.root.appendChild(img);
  }
}
