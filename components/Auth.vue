<template>
  <div>
    Hey buddy
    <div class="col-sm">
      {{ this.$store.state.oauth }}
    </div>
    <div class="col-sm">
      <a @click="login">Log In</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'auth',
    methods: {
      login () {
        const redirectUrl = this.$route.path
        // Or another path to return to after logging in
        this.$router.push(`/auth/login?redirect-url=${redirectUrl}`)
      }
    }
  }
</script>

<style scoped>

</style>
