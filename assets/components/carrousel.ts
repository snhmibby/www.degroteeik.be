import {mkButton} from 'js/util'

/* carrousel creates a div with buttons and a list of items
 * and will create a looping carrousel with the list of elements on the div,
 * including buttons and such.
 */
export class Carrousel {
	id = 'id' + performance.now()
	nelem = 0
	HTMLNode : HTMLDivElement

	/* create structure like:
	 * <div class='carrousel'>
	 *   <ol class='carrousel-list'>
	 *     <li class='carrousel-item'>
	 *       <item from arguments>
	 */
	constructor(items: NodeListOf<HTMLElement>) {
		this.HTMLNode = document.createElement('div')
		this.HTMLNode.className = 'carrousel'
		this.nelem = items.length

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

		//next/prev button
		let prev = mkButton(list, '<', 'beforebegin', () => this.prev())
		let next = mkButton(list, '>', 'afterend', () => this.next())
		prev.classList.add('prev-button')
		next.classList.add('next-button')
	}

	itemID(k): string {
		return this.id + k.toString()
	}

	items(): NodeListOf<HTMLElement> {
		return this.HTMLNode.querySelectorAll('.carrousel-item')
	}

	get current(): number {
		let item = this.items()
		let p = this.HTMLNode.getBoundingClientRect()
		for (let i = 0; i < item.length; i++) {
			let n = item[i].getBoundingClientRect()
			if (p.x < n.right && n.x < p.right) {
				return i
			}
		}
		throw 'Carrousel.current(): no item in screen'
	}

	focus(i: number) {
		let node = document.getElementById(this.itemID(i))
		node.scrollIntoView()
	}

	next() {
		let i = (this.current + 1) % this.nelem
		this.focus(i)
	}

	prev() {
		let i = (this.current - 1 + this.nelem) % this.nelem
		this.focus(i)
	}
}
