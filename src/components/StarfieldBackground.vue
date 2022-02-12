<template>
  <div class="starfield relative w-full h-full">
    <div class="some-stars" />
    <div class="stars" />
    <div class="more-stars" />
    <div class="cta">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
// credit: https://codepen.io/saransh/pen/BKJun
// TODO: mouse look twinkling starts & warp animation when action pressed?

@function multiple-box-shadow($numOfStars) {
  $value: '#{random(2000)}px #{random(2000)}px #FFF';
  @for $i from 2 through $numOfStars {
    $value: '#{$value}, #{random(2000)}px #{random(2000)}px #FFF';
  }
  @return unquote($value);
}

$shadows-small: multiple-box-shadow(700);
$shadows-medium: multiple-box-shadow(200);
$shadows-large: multiple-box-shadow(100);

.starfield {
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  overflow: hidden;

  .some-stars {
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow: $shadows-medium;
    animation: parallaxStar 100s linear infinite;

    &:after {
      content: ' ';
      position: absolute;
      top: 2000px;
      width: 2px;
      height: 2px;
      background: transparent;
      box-shadow: $shadows-medium;
    }
  }

  .stars {
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow: $shadows-small;
    animation: parallaxStar 50s linear infinite;

    &:after {
      content: ' ';
      position: absolute;
      top: 2000px;
      width: 1px;
      height: 1px;
      background: transparent;
      box-shadow: $shadows-small;
    }
  }

  .more-stars {
    width: 3px;
    height: 3px;
    background: transparent;
    box-shadow: $shadows-large;
    animation: parallaxStar 150s linear infinite;

    &:after {
      content: ' ';
      position: absolute;
      top: 2000px;
      width: 3px;
      height: 3px;
      background: transparent;
      box-shadow: $shadows-large;
    }
  }

  .cta {
    text-align: center;
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 9;
  }
}
</style>
