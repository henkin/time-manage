<template>
    <section class="container-fluid">
        <div style="width: 100%">

            <!--<logo/>-->
            <div class="row">
                <div class="col-sm">
                    <h1 class="title">
                        Goals
                    </h1>
                </div>
            </div>
            <div class="row">
                <div class="col-sm">
                    <h3>New goal:</h3>

                    <div class="goal-title-container">
                        <form class="form-inline goal-form"
                              v-on:submit.prevent="createGoal"
                              autocomplete="off">
                            <div class="input-group">
                                <label class="sr-only" for="inlineFormInput">Name</label>
                                <!-- these are to remove the autocomplete from Chrome -->
                                <input style="display:none" type="text" name="fakeusernameremembered"/>
                                <input style="display:none" type="password" name="fakepasswordremembered"/>
                                <input v-model="name"
                                       autofocus
                                       type="text"
                                       autocomplete="new-password"
                                       id="goal-title"
                                       v-focus="focused"
                                       @focus="focused = true"
                                       @blur="focused = false"
                                />
                                <!--<div class="input-group-addon">@</div>-->
                                <button type="submit" class="btn btn-primary right-side">Submit</button>
                            </div>
                        </form>
                        <!--<button type="submit" text="asdf">yes</button>-->
                    </div>
                </div>
            </div>


            <div class="row">
                <div class="col-sm">
                    <h4>Count: {{ goals.length }}</h4>
                    <div v-for="goal in goals">
                        <p>
                        <h2>{{ goal.name }}</h2>
                    </div>
                </div>
            </div>
            <!--<div>{{$store.counter}}</div>-->
            <!--<button @click="$store.commit('increment')">{{ $store.state.counter }}</button>-->
        </div>
    </section>
</template>

<script>
  // import Logo from '~/components/Logo.vue'
  import { mapGetters } from 'vuex'
  import { focus } from 'vue-focus'
  import io from 'socket.io-client'
  // eslint-disable-next-line no-unused-vars
  let socket

  if (typeof window !== 'undefined') {
    console.log('window!')

    socket = io()
    console.log(socket)
  }

  export default {
    directives: {focus: focus},
    components: {},
    data () {
      return {
        focused: true,
        name: ''
      }
    },
    methods: {
      createGoal () {
        this.$store.dispatch('addGoal', {name: this.name})
        this.name = ''
        document.getElementById('goal-title').focus()
      }
    },
    computed: {
      ...mapGetters(['goals'])
    },
    created () {
      // this.$store.dispatch('loadGoals')
    }
//    created: {
//      this.$store.dispatch('getUsers')
//    },
  }
</script>

<style>

    [class*='col-'] {
        /*background: #111;*/
    }

    button {
        font-size: 30pt;
    }

    #goal-title {
        font-size: 30pt;
        width: 100%;
        height: 100%;
        border: 0;
        padding: 0;
        margin: 0;
        border-radius: 5px 0 0 5px;
    }

    .goal-title-container {
        /*border: 2px dashed white;*/
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

   .right-side {
        justify-content: right;
        align-items: right;
        text-align: right;
    }
</style>
