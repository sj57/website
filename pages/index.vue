<template>
    <div class="app" ref="app">
        <div class="app__wrapper">
            <div class="app__wrapper__content" ref="content" :class="{'app__wrapper__content--error': error}">

                <div class="app__content">

                    <div class="app__loading" v-if="loading">
                        <div class="lds-ellipsis">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>

                    <div class="app__main" v-else-if="apiToken">

                        <div class="app__main__button" @click="openGarage()">
                            לחץ לפתיחת המחסום חניה
                        </div>

                    </div>
                    <div class="app__error" v-else>

                        <div class="app__error__sign">

                            <div class="app__error__sign__pulse">
                            </div>
                            <div class="app__error__sign__icon">
                                <svg width="122" height="115" viewBox="0 0 122 115" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M66.0029 2.97424C63.9048 -0.991413 57.3803 -0.991413 55.2823 2.97424L0.709059 106.057C0.2178 106.981 -0.0257448 108.016 0.00215376 109.062C0.0300523 110.108 0.328443 111.129 0.868252 112.026C1.40806 112.922 2.17088 113.664 3.08237 114.177C3.99387 114.691 5.02296 114.961 6.06936 114.958H115.216C116.261 114.961 117.29 114.692 118.201 114.178C119.112 113.665 119.874 112.924 120.413 112.028C120.952 111.132 121.25 110.111 121.278 109.066C121.305 108.021 121.061 106.986 120.57 106.063L66.0029 2.97424ZM66.7063 96.7674H54.5789V84.64H66.7063V96.7674ZM54.5789 72.5126V42.1942H66.7063L66.7123 72.5126H54.5789Z" fill="white"/>
                                </svg>
                            </div>

                        </div>


                        <div class="app__error__button">
                            <div class="app__error__button__join">
                                לקבלת גישה יש לפתוח את הקישור המקורי.
                                <br>
                                צריך סיוע? פנה ליוסף בWhatsApp לתמיכה
                            </div>
                        </div>


                    </div>

                </div>
                <div class="app__footer">
                    <div class="app__footer__links">
                        <a href="https://github.com/sj57" target="_blank">פרוייקט קוד פתוח</a>
                        <a href="https://github.com/sj57/privacy" target="_blank">מדיניות פרטיות</a>
                    </div>
                    <div class="app__footer__logo">

                    </div>
                </div>

            </div>
            <div class="app__wrapper__filler-photo">
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';

const {phone} = require('phone');

export default {
    name: "index.vue",
    computed: {
        urlHash() {
            return this.$route.hash || ''
        }
    },
    watch: {
        urlHash() {
            this.loadApiTokenFromUrlHash();
        },

    },
    methods: {
        async openGarage() {
            this.loading = true;
            try {
                await axios.post(`https://api.sj57.info/v1/garage`, null, {headers: {"Authorization": this.apiToken}})
                alert("בוצע");
            } catch (e) {
                alert("משהו השתבש. אם הבעיה חוזרת דווח ליוסף");
                throw e;
            } finally {
                this.loading = false;
            }
        },
        linkScroll() {
            let appElement = this.$refs.app;
            let contentElement = this.$refs.content;
            appElement.addEventListener('mousewheel', (e) => {
                if (e.ctrlKey) {
                    return;
                }
                e.preventDefault();
                contentElement.scrollTop += e.deltaY / 3;
            })
        },
        async loadApiTokenFromUrlHash() {
            this.apiToken = this.urlHash.replaceAll('#', '').replaceAll('/', '');
        },


    },
    mounted() {
        this.loadApiTokenFromUrlHash();
        this.linkScroll();
    },

    data() {
        return {
            apiToken: '',
            loading: false,
        }
    }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;600;700&family=Inter:wght@900&display=swap');


@mixin responsive($above:none, $below:none) {
  @if $above {
    @media (min-width: $above) {
      @content
    };
  }

  @if $below {
    @media (max-width: $below) {
      @content
    };
  }
}


$breakpoint-mobile-small: 360px;
$breakpoint-mobile: 640px;
$breakpoint-tablet-small: 800px;
$breakpoint-tablet: 1280px;

$padding-level-1: 64px;
$padding-level-2: 32px;
$padding-level-3: 16px;
$padding-level-4: 8px;

$color-background-white: #fff;
$color-background-red: #010052;
$color-background-dark-red: #000b26;
$color-background-dark: #000b28;
$color-background-black: #000;
$color-background-light-gray: #E3E3E3;
$color-background-dark-gray: #BEBEBE;


html {
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Heebo', sans-serif;

  background-color: $color-background-dark-gray;
  box-shadow: inset 0 180px 0 0 $color-background-light-gray;

}

* {
  box-sizing: border-box;
}

@mixin defuse-links($color, $text-decoration: none) {
  text-decoration: $text-decoration;
  color: $color;

  &:active, &:visited, &:link, &:hover {
    color: $color;
  }
}

@include responsive($above: $breakpoint-mobile) {

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: $color-background-black;
  }

  ::-webkit-scrollbar-thumb {
    background: $color-background-dark;

    &:hover {
      background: $color-background-dark;
    }
  }
}

.app {

  display: flex;
  justify-content: center;
  height: 100vh;
  direction: rtl;

  .button {
    font-family: 'Heebo', sans-serif;
    font-weight: 700;
    font-size: 24px;
    color: $color-background-white;
    box-shadow: inset 0 0 0 4px $color-background-white;
    border-radius: 10px;
    padding: $padding-level-3 $padding-level-2;
    cursor: pointer;
  }

  &__form {
    padding: 0 $padding-level-2;

    &__description {
      font-size: 18px;
      color: $color-background-white;
      padding-bottom: $padding-level-3;

      a {
        @include defuse-links($color: $color-background-white, $text-decoration: underline);
      }
    }

    &__input {
      padding-top: $padding-level-3;

      input {
        background: #fff;
        position: relative;
        box-shadow: 0 10px 20px 0 rgba(6, 6, 59, 0.05);
        overflow-x: visible;
        overflow-y: visible;
        border-radius: 10px;

        box-sizing: border-box;
        width: 100%;
        $input-height: 80px;
        height: $input-height;
        padding: $padding-level-2;

        -webkit-appearance: none;
        border: none;

        font-family: 'Heebo', sans-serif;
        font-weight: 600;
        font-size: 24px;


        &:focus {
          outline-width: 0;
          box-shadow: 0 5px 20px 0 rgba(6, 6, 59, 0.1);
        }


      }
    }

    &__button {
      padding-top: $padding-level-2;
      display: flex;
      justify-content: center;

    }
  }

  &__header {
    height: 100px;
    display: flex;
    flex-shrink: 0;
    flex-direction: row;
    align-items: center;
    padding: 0 $padding-level-2;
    justify-content: space-between;

    &__logo {
      z-index: 1;
    }

    &__switch-account-button {
      width: 50px;
      height: 50px;
      border-radius: 100px;
      cursor: pointer;
      display: flex;
      position: relative;
      justify-content: center;
      left: - $padding-level-4;
      align-items: center;
      transition: all 0.1s ease-in;

      &:hover {
        background: #333;
      }
    }
  }

  &__content {
    min-height: 500px;
    flex-grow: 1;
    flex-shrink: 0;
  }

  &__loading {

    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    justify-items: center;
    height: 100%;

    .lds-ellipsis {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;
    }

    .lds-ellipsis div {
      position: absolute;
      top: 33px;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      background: #fff;
      animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }

    .lds-ellipsis div:nth-child(1) {
      left: 8px;
      animation: lds-ellipsis1 0.6s infinite;
    }

    .lds-ellipsis div:nth-child(2) {
      left: 8px;
      animation: lds-ellipsis2 0.6s infinite;
    }

    .lds-ellipsis div:nth-child(3) {
      left: 32px;
      animation: lds-ellipsis2 0.6s infinite;
    }

    .lds-ellipsis div:nth-child(4) {
      left: 56px;
      animation: lds-ellipsis3 0.6s infinite;
    }

    @keyframes lds-ellipsis1 {
      0% {
        transform: scale(0);
      }
      100% {
        transform: scale(1);
      }
    }
    @keyframes lds-ellipsis3 {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(0);
      }
    }
    @keyframes lds-ellipsis2 {
      0% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate(24px, 0);
      }
    }


  }

  &__footer {
    background: rgba(#000, 0.3);
    display: flex;
    flex-direction: row;
    padding: $padding-level-2;
    justify-content: space-between;

    &__logo {
    }

    &__links {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      gap: $padding-level-3;

      a {
        display: block;
        @include defuse-links($color: $color-background-white, $text-decoration: underline);
      }
    }
  }

  &__wrapper {
    max-width: $breakpoint-tablet;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    overflow: hidden;

    @include responsive($above: $breakpoint-tablet) {
      margin-top: $padding-level-2;
      border-radius: 4px;

    }

    &__filler-photo {
      flex-grow: 1;
      background: black;
      width: 100%;
      background: url("https://github.com/sj57/website/assets/1287098/42d28a51-7641-47c7-b393-d0b705e6a78f");
      object-fit: cover;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;

      @include responsive($below: $breakpoint-tablet-small) {
        display: none;
      }
    }

    &__content {
      background: linear-gradient(180deg, #29009C 0%, #230085 52.08%, #090023 100%);
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      transition: all 0.1s ease-in-out;

      @include responsive($above: $breakpoint-tablet-small) {
        max-width: 500px;
      }

      $class-name: &;

      &#{$class-name}--error {
        background-color: $color-background-dark;
      }
    }
  }

  &__main {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    justify-items: center;
    height: 100%;

    &__button {

      font-weight: 700;
      font-size: 24px;
      width: 180px;
      height: 180px;
      background: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-items: center;
      justify-content: center;
      text-align: center;
      padding: 20px;
      cursor: pointer;
      animation: pulse 3s infinite;

      @keyframes pulse {
        0% {
          box-shadow: 0 0 0 0 rgba(#fff, 0.4);
        }
        70% {
          box-shadow: 0 0 0 30px rgba(#fff, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(#fff, 0);
        }
      }
    }
  }

  &__error {
    padding: 100px $padding-level-2 0;


    a {
      @include defuse-links($color: $color-background-white, $text-decoration: underline);
    }

    &__sign {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      padding-top: $padding-level-2;

      &__icon {
        z-index: 1;
      }

      &__pulse {
        background: rgba(#000, 0.3);
        position: absolute;
        width: 200px;
        height: 200px;
        border-radius: 100px;

        animation: pulse-dot 2.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;

        @keyframes pulse-dot {
          0% {
            transform: scale(.5);
          }
          50% {
            transform: scale(1);
          }
          100% {
            transform: scale(.5);
          }
        }
      }
    }

    &__message {
      padding-top: $padding-level-3;
      color: $color-background-white;
      position: relative;
    }

    &__button {
      padding-top: $padding-level-2;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &__join {
        padding-top: $padding-level-2;
        color: $color-background-white;
        text-align: center;

      }
    }
  }
}

</style>