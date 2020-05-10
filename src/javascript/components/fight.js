import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  const allHPfirstFighter = firstFighter.health;
  const allHPsecondFighter = secondFighter.health;
  let blockFirstFighter = false;
  let blockSecondFighter = false;
  let pressedFirstFighter = new Map();
  let pressedSecondFighter = new Map();
  let firstFighterCriticalHit = true;
  let secondFighterCriticalHit = true;

  return new Promise((resolve) => {
    document.addEventListener('keydown', e => {
      switch (e.code) {
        case controls.PlayerOneAttack:
          if (!blockSecondFighter && !e.repeat && !blockFirstFighter) {
            secondFighter.health = secondFighter.health - getDamage(firstFighter, secondFighter);
            changeHPbar('right', allHPsecondFighter, secondFighter.health);
          }
          break;
        case controls.PlayerTwoAttack:
          if (!blockFirstFighter && !e.repeat && !blockSecondFighter) {
            firstFighter.health = firstFighter.health - getDamage(secondFighter, firstFighter);
            changeHPbar('left', allHPfirstFighter, firstFighter.health);
          }
          break;
        case controls.PlayerOneBlock:
          blockFirstFighter = true;
          break;
        case controls.PlayerTwoBlock:
          blockSecondFighter = true;
          break;
        case controls.PlayerOneCriticalHitCombination[0]:
          if (!e.repeat) {
            pressedFirstFighter.set(0, controls.PlayerOneCriticalHitCombination[0]);
          }
          break;
        case controls.PlayerOneCriticalHitCombination[1]:
          if (!e.repeat) {
            pressedFirstFighter.set(1, controls.PlayerOneCriticalHitCombination[1]);
          }
          break;
        case controls.PlayerOneCriticalHitCombination[2]:
          if (!e.repeat) {
            pressedFirstFighter.set(2, controls.PlayerOneCriticalHitCombination[2]);
          }
          break;
        case controls.PlayerTwoCriticalHitCombination[0]:
          if (!e.repeat) {
            pressedSecondFighter.set(0, controls.PlayerTwoCriticalHitCombination[0]);
          }
          break;
        case controls.PlayerTwoCriticalHitCombination[1]:
          if (!e.repeat) {
            pressedSecondFighter.set(1, controls.PlayerTwoCriticalHitCombination[1]);
          }
          break;
        case controls.PlayerTwoCriticalHitCombination[2]:
          if (!e.repeat) {
            pressedSecondFighter.set(2, controls.PlayerTwoCriticalHitCombination[2]);
          }
          break;
        default:
          break;
      }
      if (firstFighterCriticalHit && pressedFirstFighter.size === 3) {
        getCriticalHit(firstFighter);
        secondFighter.health = secondFighter.health - getCriticalHit(firstFighter);
        changeHPbar('right', allHPsecondFighter, secondFighter.health);
        firstFighterCriticalHit = false
        setTimeout(() => firstFighterCriticalHit = true, 10000);
      }
      if (secondFighterCriticalHit && pressedSecondFighter.size === 3) {
        getCriticalHit(secondFighter);
        firstFighter.health = firstFighter.health - getCriticalHit(secondFighter);
        changeHPbar('left', allHPfirstFighter, firstFighter.health);
        secondFighterCriticalHit = false
        setTimeout(() => secondFighterCriticalHit = true, 10000);
      }
      if (firstFighter.health <= 0 || secondFighter.health <= 0) {
        resolve(firstFighter.health > 0 ? firstFighter : secondFighter);
      }
    })
    document.addEventListener('keyup', e => {
      switch (e.code) {
        case controls.PlayerOneBlock:
          blockFirstFighter = false;
          break;
        case controls.PlayerTwoBlock:
          blockSecondFighter = false;
          break;
        case controls.PlayerOneCriticalHitCombination[0]:
          pressedFirstFighter.delete(0);
          break;
        case controls.PlayerOneCriticalHitCombination[1]:
          pressedFirstFighter.delete(1);
          break;
        case controls.PlayerOneCriticalHitCombination[2]:
          pressedFirstFighter.delete(2);
          break;
        case controls.PlayerTwoCriticalHitCombination[0]:
          pressedSecondFighter.delete(0);
          break;
        case controls.PlayerTwoCriticalHitCombination[1]:
          pressedSecondFighter.delete(1);
          break;
        case controls.PlayerTwoCriticalHitCombination[2]:
          pressedSecondFighter.delete(2);
          break;
        default:
          break;
      }
    })
    // resolve the promise with the winner when fight is over
  });
}

export function getDamage(attacker, defender) {
  // return damage
  const damage = getHitPower(attacker) - getBlockPower(defender);
  return damage > 0 ? damage : 0;
}

export function getHitPower(fighter) {
  // return hit power
  const power = fighter.attack * criticalHitChance();
  return power
}

export function getBlockPower(fighter) {
  // return block power
  const power = fighter.defense * dodgeChance();
  return power;
}

function getCriticalHit(attacker) {
  return attacker.attack * 2;
}

function criticalHitChance() {
  return Math.round(Math.random() + 1);
}

function dodgeChance() {
  return Math.round(Math.random() + 1);
}

function changeHPbar(position, allHP, currentHP) {
  const health = document.getElementById(`${position}-fighter-indicator`)
  const width = (100 * currentHP) / allHP;

  health.style.width = width >= 0 ? `${width}%` : 0 ;
}