export class OptAnimate {
  constructor() {
    this.animationTimer = null;
    this.delayedAnimationTimer = null;
  }

  AnimateWithDelay = (
    element,
    animationName,
    duration,
    onComplete,
    saveAnimatedState,
    delay
  ) => {
    if (delay === null || typeof delay === "undefined" || delay < 0) {
      this.Animate(
        element,
        animationName,
        duration,
        onComplete,
        saveAnimatedState
      );
    } else {
      clearTimeout(this.delayedAnimationTimer);
      this.delayedAnimationTimer = setTimeout(
        () => {
          this.Animate(
            element,
            animationName,
            duration,
            onComplete,
            saveAnimatedState
          );
        },
        delay,
        this
      );
    }
  };

  Animate = (
    element,
    animationName,
    duration,
    onComplete,
    saveAnimatedState
  ) => {
    let newDuration = duration;
    // saveAnimatedState = saveAnimatedState === true;
    element?.classList && element.classList.add("animated", animationName);

    if (newDuration == null || newDuration <= 0) {
      const style = window.getComputedStyle(element);
      newDuration =
        parseFloat(style.getPropertyValue("animation-duration")) * 1000;
    }

    element &&
      element.setAttribute(
        "style",
        `-webkit-animation-duration:${String(newDuration / 1000)}s; 
      animation-duration:${String(newDuration / 1000)}s`
      );

    clearTimeout(this.animationTimer);
    this.animationTimer = setTimeout(() => {
      if (!saveAnimatedState)
        element?.classList &&
          element.classList.remove("animated", animationName);

      if (typeof onComplete === "function") {
        onComplete(element);
      }
    }, duration);
  };

  destructor = () => {
    clearTimeout(this.animationTimer);
    clearTimeout(this.delayedAnimationTimer);
  };
}
