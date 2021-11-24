import 'js/util'

/* carrousel creates a div with buttons and a list of items
 * and will create a looping carrousel with the list of elements on the div,
 * including buttons and such.
 */
export class Carrousel {
	id = 'id' + performance.now()
	nelem = 0
	HTMLNode : HTMLDivElement

	constructor(items: NodeListOf<HTMLElement>) {
		this.HTMLNode = document.createElement('div')
		this.HTMLNode.className = 'carrousel'
		this.nelem = items.length

		//create list of elements
		let list = document.createElement('ol')
		this.HTMLNode.appendChild(list)
		list.className = 'carrousel-list'
		items.forEach((v, key) => {
			let li = document.createElement('li')
			li.className = 'carrousel-item'
			li.id = this.id + key.toString()
			li.appendChild(v)
			list.appendChild(li)
		})

		//next/prev button
		mkButton(list, '<', 'beforebegin', () => this.prev())
		mkButton(list, '>', 'afterend', () => this.next())
	}

	items(): NodeListOf<HTMLElement> {
		return this.HTMLNode.querySelectorAll('.carrousel-item')
	}

	focussed(): number {
		let item = this.items()
		let p = this.HTMLNode.getBoundingClientRect()
		for (let i = 0; i < item.length; i++) {
			let n = item[i].getBoundingClientRect()
			if (p.x < n.right && n.x < p.right) {
				return i
			}
		}
		throw 'Carrousel.focussed(): no item in screen'
	}

	focus(i: number) {
		let node = document.getElementById(this.id + i.toString())
		node.scrollIntoView()
	}

	next() {
		let i = (this.focussed() + 1) % this.nelem
		this.focus(i)
	}

	prev() {
		let i = (this.focussed() - 1 + this.nelem) % this.nelem
		this.focus(i)
	}
}
