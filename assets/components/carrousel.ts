import {mkButton} from 'js/util'

/* carrousel creates a div with buttons and a list of items
 * and will create a looping carrousel with the list of elements on the div,
 * including buttons and such.
 */
export class Carrousel {
	id = 'id' + performance.now()
	nelem = 0
	HTMLNode : HTMLDivElement
	lastcurrent = 0

	/* create structure like:
	 * <div class='carrousel'>
	 *   <button prev>
	 *   <button next>
	 *   <ol class='carrousel-list'>
	 *     <li class='carrousel-item'>
	 *       <item from arguments>
	 */
	constructor(items: NodeListOf<HTMLElement>) {
		this.HTMLNode = document.createElement('div')
		this.HTMLNode.className = 'carrousel'
		this.nelem = items.length

		let prev = mkButton(this.HTMLNode, '<', () => this.prev())
		let next = mkButton(this.HTMLNode, '>', () => this.next())
		prev.classList.add('prev-button')
		next.classList.add('next-button')

		let list = document.createElement('ol')
		this.HTMLNode.appendChild(list)
		list.className = 'carrousel-list'
		items.forEach((v, key) => {
			let li = document.createElement('li')
			li.className = 'carrousel-item'
			li.id = this.itemID(key)
			li.appendChild(v)
			list.appendChild(li)
		})
	}

	itemID(k): string {
		return this.id + k.toString()
	}

	items(): NodeListOf<HTMLElement> {
		return this.HTMLNode.querySelectorAll('.carrousel-item')
	}

	current(): number {
		let item = this.items()
		let p = this.HTMLNode.getBoundingClientRect()
		for (let i = 0; i < item.length; i++) {
			let n = item[i].getBoundingClientRect()
			//the first (and only?) item that's fully in the viewbox
			if (p.x <= n.x && n.right <= p.right) {
				return i
			}
		}
		//backup in case there is no item in full view
		return this.lastcurrent
	}

	focus(i: number) {
		this.lastcurrent = i
		let node = document.getElementById(this.itemID(i))
		node.scrollIntoView()
	}

	next() {
		let i = (this.current() + 1) % this.nelem
		this.focus(i)
	}

	prev() {
		let i = (this.current() - 1 + this.nelem) % this.nelem
		this.focus(i)
	}
}
