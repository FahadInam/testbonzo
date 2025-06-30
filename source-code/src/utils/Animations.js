import { spring } from 'react-router-transition';

function bounce(val) {
  return spring(val, {
    stiffness: 175,
    damping: 25,
  });
}

export const PageAnimate = {
  ltr: {
    atEnter: {
      opacity: 0,
      offset: 25,
    },

    atLeave: {
      opacity: 0,
      offset: -150,
    },
  },

  rtl: {
    atEnter: {
      opacity: 0,
      offset: -100,
    },

    atLeave: {
      opacity: 0,
      offset: 100,
    },
  },

  ttd: {
    atEnter: {
      opacity: 0,
      scale: 1.5,
    },
    // leave in a transparent, downscaled state
    atLeave: {
      opacity: bounce(0),
      scale: bounce(0.8),
    },
  },

  Active: {
    opacity: bounce(1),
    offset: bounce(0),
  },

  MapStyles: (styles) => {
    return {
      opacity: styles.opacity,
      transform: `translate3d(${styles.offset}%, 0, 0)`,
    };
  },
  MapNoStyles: (styles) => {
    return {
      // opacity: styles.opacity,
      // transform: `translate3d(${styles.offset}%, 0, 0)`,
    };
  },
};

export class OptAnimate {
  constructor() {
    this.animationTimer = null;
    this.delayedAnimationTimer = null;
  }

  AnimateWithDelay = (element, animationName, duration, onComplete, saveAnimatedState, delay) => {
    if (delay === null || typeof delay === 'undefined' || delay < 0) {
      this.Animate(element, animationName, duration, onComplete, saveAnimatedState);
    } else {
      clearTimeout(this.delayedAnimationTimer);
      this.delayedAnimationTimer = setTimeout(
        () => {
          this.Animate(element, animationName, duration, onComplete, saveAnimatedState);
        },
        delay,
        this
      );
    }
  };

  Animate = (element, animationName, duration, onComplete, saveAnimatedState) => {
    let newDuration = duration;
    // saveAnimatedState = saveAnimatedState === true;
    element?.classList && element.classList.add('animated', animationName);

    if (newDuration == null || newDuration <= 0) {
      const style = window.getComputedStyle(element);
      newDuration = parseFloat(style.getPropertyValue('animation-duration')) * 1000;
    }

    element &&
      element.setAttribute(
        'style',
        `-webkit-animation-duration:${String(newDuration / 1000)}s; 
      animation-duration:${String(newDuration / 1000)}s`
      );

    clearTimeout(this.animationTimer);
    this.animationTimer = setTimeout(() => {
      if (!saveAnimatedState) element?.classList && element.classList.remove('animated', animationName);

      if (typeof onComplete === 'function') {
        onComplete(element);
      }
    }, duration);
  };

  destructor = () => {
    clearTimeout(this.animationTimer);
    clearTimeout(this.delayedAnimationTimer);
  };
}
