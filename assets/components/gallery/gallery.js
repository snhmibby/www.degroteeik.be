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

class Gallery {
	constructor(list) {
		this.items = list.querySelectorAll('li')
		this.curIdx = 0
		this.curItem = undefined

		let nelem = this.items.length
		for (let i = 0; i < this.items.length; i++) {
			let item = this.items[i]

			//install next/prev buttons around the full-size image
			let full = item.querySelector('.gallery-full')
			this.addButton(full, (i - 1 + nelem) % nelem, "<", 'beforebegin')
			this.addButton(full, (i + 1) % nelem, ">", 'afterend')

			//click handlers hide/show modal
			let thumb = item.querySelector('.gallery-thumb')
			let modal = item.querySelector('.gallery-modal')
			thumb.onclick = () => this.show(modal)
			modal.onclick = () => this.hide(modal)
		}
	}

	show(item) {
		this.curItem = item
		item.style.display = 'flex'
	}

	hide(item) {
		item.style.display = 'none'
	}

	slide(next) {
		this.hide(this.curItem)
		this.show(next)
	}

	addButton(item, nextIdx, text, where) {
		let nextModal = this.items[nextIdx].querySelector('.gallery-modal')
		let btn = document.createElement("span")
		btn.innerText = text
		btn.className = 'gallery-button'
		btn.onclick = () => this.slide(nextModal)
		return item.insertAdjacentElement(where, btn)
	}
}
