<template>
  <!-- Tutorials: fossheim.io -->
  <div class="switch" aria-label="Coral Switch Lite illustration">
    <div class="volume down"></div>
    <div class="volume up"></div>
    <div class="back left"></div>
    <div class="back right"></div>
    <div class="body">
      <div class="minus"></div>
      <div class="plus">
        <div class="vertical"></div>
        <div class="horizontal"></div>
      </div>
      <div class="screen-container">
        <div class="screen"></div>
      </div>
      <div class="controller left"></div>
      <div class="controller right"></div>
      <div class="button-container" aria-hidden="true">
        <!-- use <button> in production for a11y reasons -->
        <div class="button top"><p>X</p></div>
        <div class="button right"><p>A</p></div>
        <div class="button bottom"><p>B</p></div>
        <div class="button left"><p>Y</p></div>
      </div>
      <div class="arrow-container">
        <div class="arrow top"></div>
        <div class="arrow right"></div>
        <div class="arrow bottom"></div>
        <div class="arrow left"></div>
      </div>
      <div class="screenshot"></div>
      <div class="home"></div>
    </div>
  </div>
  <div class="tikeUp">
    <div class="progress"></div>
  </div>
  <video controls style="width: 70%" id="videoElement"></video>
</template>

<script>
import { ref } from "vue";
import fly from "flv.js";

export default {

  setup() {
    const msg = ref("1233");
    return {
      msg
    };
  },
  created() {
  },
  mounted() {
    let url = "http://rboa9eje7.hb-bkt.clouddn.com/assets%2Fshanhai.mp4";
    if (fly.isSupported()) {
      let videoEl = document.querySelector("#videoElement");
      let flvPlay = fly.createPlayer({
        type: "mp4",
        url: url
      });
      flvPlay.attachMediaElement(videoEl);
      flvPlay.load();
      flvPlay.play();
    }
  }
};
</script>

<style scoped lang="scss">
.btn {
  width: 100px;
  height: 100px;
  background-color: #fff;
}

.tikeUp {
  width: 500px;
  height: 10px;
  background-color: #ccc;
  border: 2px solid #fff;

  .progress {
    width: 0;
    height: 100%;
    background-color: red;
  }
}

/* Tutorials: fossheim.io */
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  background-color: #E9F5D5;
}

.switch {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 665px;
  height: 300px;
  margin: 0 auto;
}

.volume {
  display: block;
  width: 16px;
  height: 2px;
  position: absolute;
  top: 3px;
  background-image: linear-gradient(#FA8888, #E56B69);
  border-radius: 1px;
}

.volume.down {
  left: 145px;
}

.volume.up {
  left: 175px;
}

.back {
  display: block;
  width: 170px;
  height: 120px;
  background-color: #DADADA;
  position: absolute;
  top: 4px;
  border-radius: 70px;
}

.back.left {
  left: 2px;
  box-shadow: 1px 1px 1px 0 #C1C1C1 inset,
  2px 2px 1px 0 #FFFFFF inset;
}

.back.right {
  right: 2px;
  box-shadow: -1px 1px 1px 0 #C1C1C1 inset,
  -2px 2px 1px 0 #FFFFFF inset;
}

.body {
  position: absolute;
  top: 5px;
  left: 5px;
  background-color: #fff;
  display: block;
  width: 655px;
  height: 290px;
  border-radius: 70px;
  background-image: linear-gradient(#FF8688, #FF7B81);
  box-shadow: -1px -7px 4px #F0696D inset, /* bottom */
  6px 5px 6px #FE8C90 inset, /* top */
  10px 10px 4px #FFAFB1 inset, /* top */
  -4px 5px 4px #FA7F84 inset,
  -10px 10px 4px #FD9A9E inset,
  0 80px 40px -70px rgba(0, 0, 0, 0.3);

}

.screen-container {
  display: block;
  width: 445px;
  height: 250px;
  background-color: #fff;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  border-radius: 9px;
  background-image: linear-gradient(#F4797C, #F07477);
  box-shadow: 0 0 0.5px 0.5px #FF9395,
  0px -3px 4px #E56A6F inset, 1px 1.5px 1.5px #BA525A inset,
  4px 4px 2px #FD8186 inset,
  -1px 1.5px 1.5px #BA525A inset,
  -4px 4px 2px #FD8186 inset;
}

.screen {
  display: block;
  width: 390px;
  height: 225px;
  background-color: #FFDADB;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 15px;
  border-radius: 2px;
  box-shadow: 0 0 1px 1px #EB8B89,
  0 0 0 5px #030303 inset;
}

.controller {
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-image: linear-gradient(
      -135deg,
      #F4F2F0,
      #AFAFAF
  );
  box-shadow: 0 -4.5px 3px #BAB6B3 inset,
  0 0 0.5px 5px #EFEDEE inset,
  0 -5px 0.5px 1px white inset,
  -1.5px 1.5px 2px 4px #888888 inset,
  0 0 1px 1px #2F0000,
  0 -1px 1.5px 1px #913639,
  0 10px 14px -2px #C64850;
}

.controller.left {
  position: absolute;
  left: 33px;
  top: 55px;
}

.controller.right {
  position: absolute;
  right: 33px;
  bottom: 90px;
}

.button-container {
  display: block;
  width: 75px;
  height: 75px;
  position: absolute;
  top: 45px;
  right: 20px;
}

.button {
  display: block;
  position: absolute;
  width: 23px;
  height: 23px;
  border-radius: 12.5px;
  background-color: #DBDBD9;
  background-image: linear-gradient(#E1DFE0, #D1D4CF);
  box-shadow: 0 2px 0.75px #F4F6FA inset,
  0 -2px 0.75px #B8A8A4 inset,
  -2px 0 0.75px #D1C7C9 inset,
  2px 0 0.75px #D1C7C9 inset,
  0 0 1px 1px #450709,
  0 -2px 1px 1px #EC919B,
  0 5px 4px -2px #D35657;
}

.button.top {
  top: 1px;
}

.button.bottom {
  bottom: 1px;
}

.button.top, .button.bottom {
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}

.button.left {
  left: 1px;
}

.button.right {
  right: 1px;
}

.button.left, .button.right {
  top: 25px;
}

.button p {
  text-align: center;
  margin-top: 4px;
  font-family: sans-serif;
  color: #B2B2B2;
}

.arrow-container {
  display: block;
  width: 62px;
  height: 62px;
  position: absolute;
  top: 140px;
  left: 25px;
}

.arrow-container:before, .arrow-container:after {
  position: absolute;
  left: 0;
  right: 0;
  content: "";
  display: block;
  width: 22px;
  height: 100%;
  background-color: yellow;
  border-radius: 3px;
  margin-left: auto;
  margin-right: auto;
  background-color: #0B0000;
}

.arrow-container:after {
  transform: rotate(90deg);
}

.arrow {
  position: absolute;
  display: block;
  width: 19px;
  height: 50%;
  background-color: #D2D2D2;
  z-index: 1;
  border-radius: 2px;
}

.arrow:after {
  content: "";
  display: block;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 6px solid #B8BAB9;
  position: absolute;
  top: 6px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}

.arrow.top {
  top: 1.5px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  box-shadow: 0 2px 2px #FAF5F7 inset,
  -1.5px 0 1px #FAF5F7 inset,
  1px 0 1px #FAF5F7 inset;
}

.arrow.bottom {
  transform: rotate(180deg);
  bottom: 1px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  box-shadow: 0 4px 2px -2px #B2A4A9 inset;
}

.arrow.right {
  top: 15.5px;
  transform: rotate(90deg);
  right: 8px;
  box-shadow: 0 3px 2px -2px #FFFBFC inset;
}

.arrow.left {
  top: 15.5px;
  transform: rotate(-90deg);
  left: 7px;
  box-shadow: 0 4px 2px -2px #FAF5F7 inset;
}

.screenshot {
  display: block;
  width: 20px;
  height: 20px;
  position: absolute;
  bottom: 20px;
  left: 75px;
  border-radius: 2px;
  background-image: linear-gradient(#D4D4D4, #E1DADC);
  box-shadow: 0 0 1px 0.5px #2B0809,
  1px 1px #F1EFF0 inset;
}

.screenshot:after {
  content: "";
  display: block;
  width: 12px;
  height: 12px;
  position: absolute;
  top: 4px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  border-radius: 6px;
  box-shadow: 0 1px 1px #ACADAA inset,
  0 -1px 1px #F2F2F2 inset;
}

.home {
  display: block;
  width: 23px;
  height: 23px;
  position: absolute;
  bottom: 24px;
  right: 70px;
  border-radius: 14px;
  background-color: #D7D7D7;
  box-shadow: 0 0.5px 0.5px #D8C3C5 inset,
  0 -0.5px 0.5px #5E474A inset,
  0 0 0.5px 2.5px #7E7276 inset,
  0 0 0.5px 3px #E7E5E3 inset,
  0 0 1px 0.75px #1B0000,
  0 0 1px 1.5px #FFA4A7;
}

.minus {
  position: absolute;
  display: block;
  width: 16px;
  height: 4px;
  top: 30px;
  left: 80px;
  border-radius: 1px;
  background-color: #DFD5D9;
  box-shadow: 0 0 0.5px 0.75px #4B0607,
  0 0 0 0.5px #FFFAF8 inset,
  0 2.5px 4px -1px #B84849;
}

.plus {
  display: block;
  width: 15px;
  height: 15px;
  position: absolute;
  top: 25px;
  right: 80px;
}

.plus:before, .plus:after {
  content: "";
  display: block;
  width: 5.5px;
  height: 100%;
  background-color: #340005;
  margin-left: auto;
  margin-right: auto;
  border-radius: 1px;
  position: absolute;
  left: 0;
  right: 0;
  box-shadow: 0 1px 1px rgba(52, 0, 5, 0.2),
  0 0 0.5px rgba(52, 0, 5, 0.5);
}

.plus:after {
  width: 5px;
  transform: rotate(90deg);
}

.vertical, .horizontal {
  position: absolute;
  display: block;
  width: 3.5px;
  z-index: 1;
  background-color: #E3E2DE;
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  border-radius: 0.5px;
}

.vertical {
  top: 1px;
  height: 13px;
}

.horizontal {
  transform: rotate(90deg);
  top: 1px;
  height: 13.5px;
}
</style>
