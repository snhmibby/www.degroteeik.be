import 'js/swiped-events';

/* Gallery assumes your HTML looks like so:
 * <ul id="my-gallery" class="gallery">    (or ol)
 *   <li>
 *     <img class="gallery-thumb">
 *     <div class="gallery-modal">
 *       <img class="gallery-full">
 *   <li>
 *     <img class="gallery-thumb">
 *     <div class="gallery-modal">
 *       <img class="gallery-full">
 * <script> new Gallery(document.querySelector('#my-gallery')) </script>
 */

export class Gallery {
	items : NodeListOf<HTMLLIElement>
	curIdx: number
	curItem: HTMLElement
	constructor(list: HTMLElement) {
		this.items = list.querySelectorAll('li')
		this.curIdx = 0
		this.curItem = undefined

		let nelem = this.items.length
		for (let i = 0; i < this.items.length; i++) {
			let item = this.items[i]
			let full: HTMLImageElement = item.querySelector('.gallery-full')
			let thumb: HTMLImageElement = item.querySelector('.gallery-thumb')
			console.log(full)
			console.log(thumb)
			let modal: HTMLDivElement = item.querySelector('.gallery-modal')

			//install next/prev buttons around the full-size image
			let prev = (i - 1 + nelem) % nelem
			let next = (i + 1) % nelem
			this.addButton(full, prev, "<", 'beforebegin')
			this.addButton(full, next, ">", 'afterend')

			//install swipe handlers
			modal.addEventListener('swiped-left', () => this.swipe(this.items[next]))
			modal.addEventListener('swiped-right', () => this.swipe(this.items[prev]))

			//click handlers hide/show modal
			modal.onclick = () => this.hide(modal)
			thumb.onclick = () => this.show(modal)
		}
	}

	show(item : HTMLElement) {
		this.curItem = item
		item.style.display = 'flex'
	}

	hide(item : HTMLElement) {
		item.style.display = 'none'
	}

	swipe(next : HTMLLIElement) {
		this.slide(next.querySelector('.gallery-modal'))
	}

	slide(next : HTMLDivElement) {
		this.hide(this.curItem)
		this.show(next)
	}

	addButton(item: HTMLElement, nextIdx: number, text: string, where: InsertPosition) {
		let nextModal : HTMLDivElement = this.items[nextIdx].querySelector('.gallery-modal')
		let btn = document.createElement("span")
		btn.innerText = text
		btn.className = 'gallery-button'
		btn.onclick = () => this.slide(nextModal)
		return item.insertAdjacentElement(where, btn)
	}
}
