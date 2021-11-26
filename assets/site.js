import {Gallery} from 'www-components/src/gallery.ts'

for (let g of document.querySelectorAll('.gallery')) {
	new Gallery(g)
}
