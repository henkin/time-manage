<template>
  <div class="container">
    <form v-if="!$store.state.authUser" @submit.prevent="login">
      <a href="/api/auth">Login with Google</a>
      <!--<p class="error" v-if="formError">{{ formError }}</p>-->
      <!--<p><i>To login, use <b>demo</b> as username and <b>demo</b> as password.</i></p>-->
      <!--<p>Username: <input type="text" v-model="formUsername" name="username" /></p>-->
      <!--<p>Password: <input type="password" v-model="formPassword" name="password" /></p>-->
      <!--<button type="submit">Login</button>-->
    </form>
    <div v-else>
      <h4>Hello {{ $store.state.authUser.profile.name.givenName }}!</h4>
      <button @click="logout">Logout</button>
      <p><nuxt-link to="/secret">Super secret page</nuxt-link></p>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        formError: null,
        formUsername: '',
        formPassword: ''
      }
    },
    methods: {
      async login() {
        try {
          await this.$store.dispatch('login', {
            username: this.formUsername,
            password: this.formPassword
          })
          this.formUsername = ''
          this.formPassword = ''
          this.formError = null
        } catch (e) {
          this.formError = e.message
        }
      },
      async logout() {
        try {
          await this.$store.dispatch('logout')
        } catch (e) {
          this.formError = e.message
        }
      }
    }
  }
</script>

<style scoped>

</style>
