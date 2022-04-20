//my-app.js
import './my-date.js'

class MyAppElement extends HTMLElement {
    constructor() {
        super();
        // open：影子根的元素可以从根外部的 JavaScript 访问，例如使用Element.shadowRoot：
        // const shadowRoot = this.attachShadow({mode:'open'});
        const shadowRoot = this.attachShadow({mode:'closed'});
        shadowRoot.innerHTML = this.template();
    }
    connectedCallback() {
        console.log('my-app element is connected');
    }
    template() {
        return `
            <style>
            /* <template>样式里面的:host伪类，指代自定义元素本身。 */
                p {
                color: #f00;
                }
            </style>

            <p>This is a ${this.getAttribute('value')}</p>
            <slot></slot>
            <p>This is a ${this.getAttribute('value')}</p>
            <my-date></my-date>
        `;
    }
}
customElements.define('my-app', MyAppElement);

