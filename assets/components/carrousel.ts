import {Icon, IconButton} from 'components/iconbutton';

/* carrousel creates a div with buttons and a list of items
 * and will create a looping carrousel with the list of elements on the div.
 * The Carrousel div can be accessed on the 'HTMLNode' property.
 */
export class Carrousel {
	HTMLNode : HTMLDivElement //the actual carrousel element
	id = 'id' + performance.now()
	nelem = 0
	lastcurrent = 0
	scrollFocus : HTMLOListElement //focus this for left/right buttons to scroll

	/* create structure like:
	 * <div class='carrousel'>
	 *   <button prev>
	 *   <button next>
	 *   <ol class='carrousel-list'>
	 *     <li class='carrousel-item'>
	 *       <item from arguments>
	 */
	constructor(items: HTMLElement[]) {
		this.HTMLNode = document.createElement('div')
		this.HTMLNode.className = 'carrousel'
		this.nelem = items.length

		let prev = IconButton(this.HTMLNode, Icon.ChevronLeft, () => this.prev())
		let next = IconButton(this.HTMLNode, Icon.ChevronRight, () => this.next())
		prev.classList.add('prev-button')
		next.classList.add('next-button')

		let list = document.createElement('ol')
		this.scrollFocus = list
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
		this.scrollFocus.focus()
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
