<template>
  <div class="starfield w-full h-full">
    <div class="fixed some-stars" />
    <div class="fixed stars" />
    <div class="fixed more-stars" />

    <slot>
      <div class="h-full flex flex-col items-center justify-center">
        <slot name="cta"></slot>
      </div>
    </slot>
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
  min-height: inherit;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  // overflow: hidden;

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
}
</style>
