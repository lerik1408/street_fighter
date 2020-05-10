import { createElement, createDetails } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  const fighterPreviewImg = createFighterImage(fighter);
  const wrapOprion = createElement({
    tagName: 'div',
    className: 'fighter-preview__option'
  })
  const nameOption = createDetails({option: false, value: fighter.name })
  const attackOption = createDetails({ option: 'attack', value: fighter.attack })
  const defenseOption = createDetails({ option: 'defense', value: fighter.defense })
  const healthOption = createDetails({ option: 'health', value: fighter.health })
  wrapOprion.append(nameOption, attackOption, defenseOption, healthOption)
  fighterElement.append(fighterPreviewImg, wrapOprion);
  // todo: show fighter info (image, name, health, etc.)

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
