<template>
    <section class="container-fluid">
        <div style="width: 100%">

            <!--<logo/>-->
            <h1 class="title">
                I am here
            </h1>
            <h2 class="subtitle">
                <span>title</span>

                <div class="input-container">
                    <input id="input" type="text"/>
                </div>
            </h2>

            <div>{{$store.counter}}</div>
            <button @click="$store.commit('increment')">{{ $store.state.counter }}</button>
        </div>
    </section>
</template>

<script>
  // import Logo from '~/components/Logo.vue'

  export default {
    components: {
      // Logo
    }
  }
</script>

<style>
    [class*='col-'] {
        background: lightgreen;
    }

    #input {
        font-size: 30pt;
        width: 100%;
        height: 100%;
        border: 0;
        padding: 0;
        margin: 0;
    }

    .input-container {
        border: 5px dashed #EEE;
        border-radius: 12px;
        width: 80%;
    }

    .container-fluid {
        min-height: 100vh;
        display: flex;
        white-space: nowrap;
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

        /*justify-content: right;*/
        /*align-items: right;*/
        /*text-align: right;*/
    }

    .links {
        padding-top: 15px;
        font-size: 17pt;
        text-align: left;
    }

    .left-side {
        justify-content: right;
        align-items: right;
        text-align: right;
    }

    .right-side {
        justify-content: left;
        align-items: left;
        text-align: left;
        background-color: lightblue;
    }
</style>
