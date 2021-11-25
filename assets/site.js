import {Gallery} from 'components/gallery.ts'

for (let g of document.querySelectorAll('.gallery')) {
	new Gallery(g)
}
