<template>
  <div class="container">
    <h1>Please login</h1>
    <form v-if="!$store.state.authUser" @submit.prevent="login">
      <p class="error" v-if="formError">{{ formError }}</p>
      <p><i>To login, use <b>demo</b> as username and <b>demo</b> as password.</i></p>
      <a href="/api/auth">Login with Google</a>
      <p>Username: <input type="text" v-model="formUsername" name="username" /></p>
      <p>Password: <input type="password" v-model="formPassword" name="password" /></p>
      <button type="submit">Login</button>
    </form>
    <div v-else>
      <h3>Hello {{ $store.state.authUser.username }}!</h3>
      <pre>secret content, I am shown only when the use is connected.</pre>
      <p><i>You can also refresh this page, you'll still be connected!</i></p>
      <button @click="logout">Logout</button>
    </div>
    <p><nuxt-link to="/secret">Super secret page</nuxt-link></p>
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
