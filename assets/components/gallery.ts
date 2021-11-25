import {Modal} from 'components/modal'
import {Carrousel} from 'components/carrousel'

/* a gallery should have thumbnails and full pictures.
 * html code can look like:
 * <div class="gallery">
 *   <a class="gallery-full" href="link-to-img">
 *     <img class="gallery-thumb" src="path/to.img"
 *   </a>
 *   ...
 *
 * or
 * <div class="gallery">
 *   <img class="gallery-thumb" src="..">
 *   <img class="gallery-full" src="..">
 *   ...
 *
 * The only rules are: thumb and full elements should be in same order
 * If gallery-full is an anchor element, it is assumed to be an img and will be used as img src.
 * Otherwise, it can be an arbitrary html element.
 *
 * Basically, the code removes all gallery-{thumb,full} nodes and adds them
 * again in an ordered list context in different places. The thumbnails stay in the gallery,
 * while the full size images are placed in a modal-element.
 */

export class Gallery {
	constructor(gallery: HTMLElement) {
		let thumb: NodeListOf<HTMLElement> = gallery.querySelectorAll('.gallery-thumb')
		let full: NodeListOf<HTMLElement> = gallery.querySelectorAll('.gallery-full')
		let thumblist = document.createElement('ol')
		gallery.appendChild(thumblist)

		if (thumb.length != full.length) {
			throw 'new Gallery(): thumbnails and fullsize images don\'t match'
		}

		full.forEach((el) => el.remove())
		thumb.forEach((el) => {
			el.remove()
			let li = document.createElement('li')
			li.appendChild(el)
			thumblist.appendChild(li)
		})

		//create an array of the fullsize elements.
		let fullsize = Array.from(full).map((el: HTMLElement) => {
			//special handling for anchor tags; create an img tag for the href
			//this is so that without javascript, the gallery can still function by linking
			//the thumbnails to the fullsize image.
			//when javascript works we can remove the link and make a cool carrousel :D
			if (el.tagName.toUpperCase() != "A") {
				return el
			}
			let img = document.createElement('img')
			img.src = el.getAttribute('href')
			return img
		})

		let carrousel = new Carrousel(fullsize)
		let modal = new Modal(carrousel.HTMLNode)

		for (let i = 0; i < thumb.length; i++) {
			thumb[i].addEventListener('click', () => {
				modal.show()
				carrousel.focus(i)
			})
		}
	}
}
