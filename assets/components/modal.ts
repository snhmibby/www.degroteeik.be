import {Icon, IconButton} from './iconbutton'
/* Modal implements a simple pop up screen.
 * It has a close button, and pressing escape closes it.
 * It takes the entire screen and displays the element in the constructor argument.
 */

//TODO: I don't know how to block interaction with things behind the modal :)
export class Modal {
	div : HTMLDivElement

	constructor(el: HTMLElement) {
		let div = document.createElement('div')
		this.div = div
		div.className = 'popup modal hidden'
		div.appendChild(el)

		let b = IconButton(div, Icon.X, () => this.hide())
		b.classList.add('close')

		document.addEventListener('keydown', (ev) => {
			if (ev.key == "Escape") {
				this.hide()
			}
		})

		document.body.appendChild(this.div)
	}

	show() {
		this.div.classList.remove('hidden')
	}

	hide() {
		this.div.classList.add('hidden')
	}
}
