import { showModal } from './modal.js';
import { createElement } from '../../helpers/domHelper';
export function showWinnerModal(fighter) {
  // call showModal function
  const bodyElement = createElement({ tagName: 'h1', className: 'modal-body'})
  bodyElement.innerHTML = `${fighter.name} WIN`
  showModal({ title: 'Fatality', bodyElement, onClose: () => {location.reload(true)} });
}
