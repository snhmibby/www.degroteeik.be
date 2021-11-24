export function mkButton(item: HTMLElement, text: string, where: InsertPosition, fn) {
	let btn = document.createElement("span")
	btn.innerText = text
	btn.className = 'icon-button'
	btn.onclick = fn
	item.insertAdjacentElement(where, btn)
	return btn
}

