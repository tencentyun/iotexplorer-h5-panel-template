<template>
    <div class="loading"/>
</template>

<script>
    export default {

    }
</script>

<style scoped>

.loading {
    margin: 0 auto ;
    margin-top: 45%;
    font-size: 6px;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    position: relative;
    text-indent: -9999em;
    animation: load-effect 1s infinite linear;
 }

 @keyframes load-effect {

    0% {
        box-shadow:
        0 -3em 0 .2em #9ba0a5,
        2em -2em 0 0 #9ba0a5,
        3em 0 0 -.5em #9ba0a5,
        2em 2em 0 -.5em #9ba0a5,
        0 3em 0 -.5em #9ba0a5,
        -2em 2em 0 -.5em #9ba0a5,
        -3em 0 0 -.5em #9ba0a5,
        -2em -2em 0 0 #9ba0a5;
    }
    12.5% {
        box-shadow:
          0 -3em 0 0 #9ba0a5,
          2em -2em 0 .2em #9ba0a5,
          3em 0 0 0 #9ba0a5,
          2em 2em 0 -.5em #9ba0a5,
          0 3em 0 -.5em #9ba0a5,
          -2em 2em 0 -.5em #9ba0a5,
          -3em 0 0 -.5em #9ba0a5,
          -2em -2em 0 -.5em #9ba0a5;
     }

     25% {
        box-shadow:
          0 -3em 0 -.5em #9ba0a5,
          2em -2em 0 0 #9ba0a5,
          3em 0 0 .2em #9ba0a5,
          2em 2em 0 0 #9ba0a5,
          0 3em 0 -.5em #9ba0a5,
          -2em 2em 0 -.5em #9ba0a5,
          -3em 0 0 -.5em #9ba0a5,
          -2em -2em 0 -.5em #9ba0a5;
     }

     37.5% {
        box-shadow:
          0 -3em 0 -.5em #9ba0a5,
          2em -2em 0 -.5em #9ba0a5,
          3em 0 0 0 #9ba0a5,
          2em 2em 0 .2em #9ba0a5,
          0 3em 0 0 #9ba0a5,
          -2em 2em 0 -.5em #9ba0a5,
          -3em 0 0 -.5em #9ba0a5,
          -2em -2em 0 -.5em #9ba0a5;
     }

     50% {
        box-shadow:
          0 -3em 0 -.5em #9ba0a5,
          2em -2em 0 -.5em #9ba0a5,
          3em 0 0 -.5em #9ba0a5,
          2em 2em 0 0 #9ba0a5,
          0 3em 0 .2em #9ba0a5,
          -2em 2em 0 0 #9ba0a5,
          -3em 0 0 -.5em #9ba0a5,
          -2em -2em 0 -.5em #9ba0a5;
     }

     62.5% {
        box-shadow:
          0 -3em 0 -.5em #9ba0a5,
          2em -2em 0 -.5em #9ba0a5,
          3em 0 0 -.5em #9ba0a5,
          2em 2em 0 -.5em #9ba0a5,
          0 3em 0 0 #9ba0a5,
          -2em 2em 0 .2em #9ba0a5,
          -3em 0 0 0 #9ba0a5,
          -2em -2em 0 -.5em #9ba0a5;
     }

     75% {
        box-shadow:
          0 -3em 0 -.5em #9ba0a5,
          2em -2em 0 -.5em #9ba0a5,
          3em 0 0 -.5em #9ba0a5,
          2em 2em 0 -.5em #9ba0a5,
          0 3em 0 -.5em #9ba0a5,
          -2em 2em 0 0 #9ba0a5,
          -3em 0 0 .2em #9ba0a5,
          -2em -2em 0 0 #9ba0a5;
     }

     87.5% {
        box-shadow:
          0 -3em 0 0 #9ba0a5,
          2em -2em 0 -.5em #9ba0a5,
          3em 0 0 -.5em #9ba0a5,
          2em 2em 0 -.5em #9ba0a5,
          0 3em 0 -.5em #9ba0a5,
          -2em 2em 0 0 #9ba0a5,
          -3em 0 0 0 #9ba0a5,
          -2em -2em 0 .2em #9ba0a5;
     }


    100% {
        box-shadow:
          0 -3em 0 .2em #9ba0a5,
          2em -2em 0 0 #9ba0a5,
          3em 0 0 -.5em #9ba0a5,
          2em 2em 0 -.5em #9ba0a5,
          0 3em 0 -.5em #9ba0a5,
          -2em 2em 0 -.5em #9ba0a5,
          -3em 0 0 -.5em #9ba0a5,
          -2em -2em 0 0 #9ba0a5;
     }
}
</style>
