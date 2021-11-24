import {Modal} from 'components/modal'
import {Carrousel} from 'components/carrousel'

export class Gallery {
	constructor(gallery: HTMLElement) {
		let thumb: NodeListOf<HTMLElement> = gallery.querySelectorAll('.gallery-thumb')
		let full: NodeListOf<HTMLElement> = gallery.querySelectorAll('.gallery-full')

		if (thumb.length != full.length) {
			throw 'new Gallery(): thumbnails and fullsize images don\'t match'
		}

		full.forEach((el) => el.remove())
		let carrousel = new Carrousel(full)
		let modal = new Modal(carrousel.HTMLNode)

		for (let i = 0; i < thumb.length; i++) {
			thumb[i].addEventListener('click', () => {
				modal.show()
				carrousel.focus(i)
			})
		}
	}
}
