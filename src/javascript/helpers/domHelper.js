import attackImg from '../../assets/attack.js'
import defenseImg from '../../assets/defense.js';
import healthIcon from '../../assets/health.js';
export function createElement({ tagName, className, attributes = {} }) {
  const element = document.createElement(tagName);

  if (className) {
    const classNames = className.split(' ').filter(Boolean);
    element.classList.add(...classNames);
  }

  Object.keys(attributes).forEach((key) => element.setAttribute(key, attributes[key]));

  return element;
}

export function createDetails({ option, value }) {
  const wrap = document.createElement('div');
  wrap.classList.add('fighter-preview___characteristics')
  let icon = document.createElement('span');
  if (option) {
    icon.classList.add('fighter-preview___characteristics-img');
    switch (option) {
      case 'attack':
        icon.innerHTML = attackImg;
      break
      case 'defense':
        icon.innerHTML = defenseImg;
      break
      case 'health':
        icon.innerHTML = healthIcon;
      break
    }
  }
  const param = document.createElement('p');
  param.innerHTML = value;
  option ? wrap.append(icon, param) : wrap.append(param);
  return wrap;
}