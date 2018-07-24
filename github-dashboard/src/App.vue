<template>
  <div id="app" class="global">
    <router-view></router-view>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'app',
  created() {
    this.autoLog()
  },
  methods: {
    ...mapActions ({
      autoLog: 'autoLogin'
    })
  }
}
</script>

<style lang="scss">

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    text-decoration: none;
    cursor: pointer;
  }

  /*Styles*/
  :root{
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
    font-size: 16px;
  }
  *, *:after, *:before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    background-color: #f4f7f9;
    color: #082746;
    width: 100vw;
    height: 100vh;
    max-width: 100%;
    i {
      color: #b0cad1;
    }
  }
  .global {
    width: 100%;
    height: 100%;
  }
  .screen-login,
  .modal {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    form {
      padding: 15px;
      width: 25%;
      max-width: 300px;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 4px 24px -1px rgba(0,0,0,0.1);
      
      h1 {
        text-align: center;
        margin: 1em auto 2em;
      }
    }
  }
  .form {
    &-group {
      display: flex;
      flex-direction: column;
      margin: 1.5em auto;

      label {
        font-size: 14px;
        font-weight: bold;

        & > span {
          font-size: 10px;
          margin-left: 0.5em;
        }
      }
      &:last-child {
        margin-top: 4em;
      }

      &.error .form-field {
        border-color: #c91818;
      }
    }
    &-field {
      padding: 5px;
      margin: 0.5em 0 0;
      height: 36px;
      border: 1px solid #c9d4d7;
    }

    &-btn {
      background: none;
      height: 46px;
      border: 1px solid #18bcc9;
      color: #18bcc9;
      text-transform: uppercase;
      cursor: pointer;
      font-weight: bold;

      &:hover {
        background-color: #18bcc9;
        color: #fff;
      }
    }
  }
  textarea.form-field {
    min-width: 100%;
    max-width: 100%;
    min-height: 80px;
    max-height: 240px;
  }
  .color {
    &-blue {color: #18bcc9;}
    &-darkBlue {color: #082746;}
    &-grey {color: #c9d4d7;}
  }
  .sidebar {
    border-top: 2px solid #f4f7f9;
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 5;
    background-color: #fff;
    box-shadow: 0 8px 24px -10px rgba(0,0,0,0.1);

    a {
      color: #18bcc9; 
      display: flex;
      line-height: 2; 

      &:hover {
        font-weight: bold;  
      }
    }

    &-profil {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px 0;
      border-bottom: 2px solid #f4f7f9;

      h2 {
        font-size: 1.5rem;
        font-weight: bold;
      }
      a {
        font-size: 1rem;
      }
    }

    img {
      width: 60px;
      height: 60px;
    }

    &-list {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 10px 15px;
      overflow: hidden;

      li {
        width: 100%;
      }

      a {
        font-size: 14px;
        position: relative;

        &:before{
          content: '';
          position: absolute;
          right: -15px;
          width: 3px;
          height: 100%;
          background-color: #18bcc9;
          opacity: 0;
          transform: translateX(5px);
          transition: opacity 0.1s ease-out, transform 0.3s ease-in;
        }
        &:hover:before {
          opacity: 1;
          transform: translateX(0);
        }
      }
    }
  } 
</style>
