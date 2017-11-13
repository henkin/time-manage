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
          <span>New goal:</span>

          <div class="goal-title-container">
            <form class="form-inline goal-form" v-on:submit.prevent="createGoal">
              <div class="input-group">
                <label class="sr-only" for="inlineFormInput">Name</label>
                <input v-model="goalName"
                       autofocus
                       ref='search'
                       id="goal-title"
                       type="text"
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
          <h2>Count: {{goals.length}}</h2>
          <div v-for="goal in goals">
            <p><h3>{{goal}}</h3></p>
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
  import { focus } from 'vue-focus'

  export default {
    directives: {focus: focus},
    components: {},
    data () {
      return {
        focused: true,
        goals: [],
        goalName: ''
      }
    },
    methods: {
      createGoal () {
        this.goals.push(this.goalName)
        this.goalName = ''
        document.getElementById('goal-title').focus()
      }
    }
  }
</script>

<style>
  [class*='col-'] {
    background: #EEE;
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

  .links {
    padding-top: 15px;
    font-size: 17pt;
    text-align: left;
  }

  .right-side {
    justify-content: right;
    align-items: right;
    text-align: right;
  }

  .left-side {
    justify-content: left;
    align-items: left;
    text-align: left;
    background-color: lightblue;
  }
</style>
