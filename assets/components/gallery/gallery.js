/* Gallery thinks your HTML should look like so:
 * <ul class="gallery">    (or ol)
 *   <li>
 *     <img class="gallery-thumbnail">
 *     <div class="gallery-modal">
 *       <img class="gallery-full">
 *   <li>
 *     <img class="gallery-thumbnail">
 *     <div class="gallery-modal">
 *       <img class="gallery-full">
 */

class Gallery {
	constructor(list) {
		this.list = list.querySelectorAll('li')
		this.curIdx = 0
		this.curItem = undefined
		for (let i = 0; i < this.list.length; i++) {
			let nelem = this.list.length
			let item = this.list[i]
			let thumb = item.querySelector('.gallery-thumb')
			let modal = item.querySelector('.gallery-modal')

			//install next/prev buttons
			let prev = this.addButton(modal, (i - 1 + nelem) % nelem, "<")
			let next = this.addButton(modal, (i + 1) % nelem, ">")
			prev.style.left = "20px"
			next.style.right = "20px"

			//click handlers
			thumb.onclick = () => this.pop(item)
			modal.onclick = () => this.unpop(item)
		}
	}

	pop(item) {
		this.curItem = item
		let modal = item.querySelector('.gallery-modal')
		modal.style.display = 'flex'
	}

	unpop(item) {
		let modal = item.querySelector('.gallery-modal')
		modal.style.display = 'none'
	}

	slide(nextIdx) {
		this.unpop(this.curItem)
		this.pop(this.list[nextIdx])
	}

	addButton(item, next, text) {
		let btn = document.createElement("span")
		btn.innerText = text
		btn.className = 'gallery-button'
		btn.onclick = () => this.slide(next)
		return item.appendChild(btn)
	}
}
