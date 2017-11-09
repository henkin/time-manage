<template>
    <section class="container">
        <div>
            <!--<logo/>-->
            <h1 class="title">
                Goals
            </h1>
            <h2 class="subtitle">
                True goals:
            </h2>
            <ul class="links">
                <li>exert consistent effort in upgrading self-image</li>
                <li>stop using</li>
                <li>meaningful relationships - maintain multiple successful friendships. measure</li>
                <li>work on what's important - focus time, skill, and effort on the problem</li>
                <li>eliminate potential regrets - bias for action, measure negative value of non-attempted.</li>
                <li>allow myself to try and fail - always stronger.</li>
                <li>meaningful work - utility to rest of species/society/</li>
            <li>become a millionaire by 40 - create the goal manager</li>
                <li>love - its the best thing in the world</li>
            </ul>
            <div class="links">
                <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
                <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
            </div>
        </div>
    </section>
</template>

<script>
  import Logo from '~/components/Logo.vue'

  export default {
    components: {
      Logo
    }
  }
</script>

<style>
    .container {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .title {
        font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
        display: block;
        font-weight: 300;
        font-size: 100px;
        color: #35495e;
        letter-spacing: 1px;
    }

    .subtitle {
        font-weight: 300;
        font-size: 42px;
        color: #526488;
        word-spacing: 5px;
        padding-bottom: 15px;
    }

    .links {
        padding-top: 15px;
        font-size: 17pt;
        text-align: left;
    }
</style>
