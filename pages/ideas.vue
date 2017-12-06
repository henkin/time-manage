<template>
  <div class="container-fluid">
    <div style="width: 100%">

      <!--<logo/>-->
      <div class="row">
        <div class="col-sm">
          <h1 class="title">
            Ideas
          </h1>
        </div>
      </div>
      <div class="row">
        <div class="col-sm">
          <h3>New Idea:</h3>

          <div class="idea-title-container">
            <form class="form-inline idea-form"
                  v-on:submit.prevent="createIdea"
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
                       id="idea-title"
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

        <h4>Count: {{ ideas.length }}</h4>
        <ul>
          <transition-group name="list" tag="p">
          <li class="row idea-item" v-for="idea in ideas" :key="idea.id">
            <div class="col-md-3 idea-list-createdAt"> {{ agoTime(idea.createdAt) }}</div>
            <div class="col-md-4 idea-list-name">
              <span class="idea-item-name-span" v-bind:class="{saving: !idea.createdAt }">{{ idea.name }}</span>
            </div>
            <br>
          </li>
          </transition-group>
        </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<style>
  .idea-item {
    /*display: table-cell;*/
    border: 1px dashed #DDD;
  }

  .list-enter-active, .list-leave-active {
    /*transition: all 1s;*/
    opacity: 1;
  }

  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */
  {
    /*opacity: 0;*/
    opacity: 1;
    /*transform: translateY(30px);*/
  }

  .idea-list-createdAt {
    font-size: small;
  }

  .idea-item-name-span {
    word-wrap: break-word;
    font-size: 20pt;
  }

  .idea-list-name {
    float: right;
    transition: opacity 1s ease-in-out;
  }

  /*.saving {*/
    /*opacity: 0.5;*/
  /*}*/


  [class*='col-'] {
    /*background: #111;*/
  }

  button {
    font-size: 30pt;
  }

  #idea-title {
    font-size: 30pt;
    width: 100%;
    height: 100%;
    border: 0;
    padding: 0;
    margin: 0;
    border-radius: 5px 0 0 5px;
  }

  .idea-title-container {
    /*border: 2px dashed white;*/
    border-radius: 12px;
    width: 80%;
  }

  .container-fluid {
    /*min-height: 100vh;*/
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
<script>
  // import Logo from '~/components/Logo.vue'
  import { mapGetters } from 'vuex'
  import { focus } from 'vue-focus'
  import io from 'socket.io-client'
  import moment from 'moment'

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
      createIdea () {
        this.$store.dispatch('addIdea', this.name)
        this.name = ''
        document.getElementById('idea-title').focus()
      },
      agoTime (dateTime) {
        return dateTime ? moment(dateTime).fromNow() : ''
      }
    },
    computed: {
      ...mapGetters(['ideas'])

    },
    created () {
      // this.$store.dispatch('loadIdeas')
      if (process.browser) {
        this.$store.dispatch('init', io())
      }
    }
//    created: {
//      this.$store.dispatch('getUsers')
//    },
  }
</script>
