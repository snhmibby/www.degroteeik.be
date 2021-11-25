export function mkButton(parent: HTMLElement, html: string, fn) {
	let btn = document.createElement('span')
	btn.innerHTML = html
	btn.className = 'icon-button'
	btn.onclick = fn
	parent.appendChild(btn)
	return btn
}

