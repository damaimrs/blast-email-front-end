<template lang="pug">
  div#header
    b-navbar(
      type="dark",
      variant="info",
      toggleable="md")
      b-navbar-toggle(
        target="nav_dropdown_collapse")
      div.row
        div.col-sm-1
          b-btn(
            variant="primary",
            to="/",
            style="background-color: #17a2b8; border-color: #17a2b8;")
            img#icon(
              src="../assets/Blibli-logo.png",
              width="100")
        div.col-sm-1
      b-collapse#nav_dropdown_collapse(is-nav)
        b-navbar-nav(
          v-if="isSignedIn")
          b-nav-item(
            to="/rules") Rules
          b-nav-item(
            to="/blast-emails") Blast Emails         
        b-navbar-nav.ml-auto
          b-button#google-sign-in-button(
            variant="info",
            v-if="!isSignedIn",
            v-on:click="onSignIn") Sign In
          b-button(
            v-if="isSignedIn",
            variant="info",
            v-on:click="onSignOut") Sign Out
</template>

<script>
import axios from 'axios'

export default {
  name: 'Header',
  data: function () {
    return {
      isSignedIn: this.$session.has('user')
    }
  },
  methods: {
    'onSignIn': function () {
      auth2.grantOfflineAccess().then(this.onSignInSuccessCallback, this.onSignInFailureCallback)
    },
    'onSignInSuccessCallback': function (response) {
      if (response.code) {

        let url = '/api/users/tokens'
        let options = {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/octet-stream;charset=utf-8'
          },
          params: {
            'authorizationCode': response.code
          }
        }

        axios.get(url, options)
          .then(this.onSuccessGenerateTokenCallback)
          .catch(this.onFailureGenerateTokenCallback)
      } else {
        alert('Google server didn\'t answer')
      }
    },
    'onSuccessGenerateTokenCallback': function (response) {
      if (response.data.data) {

        let user = {
          idToken: response.data.data.id_token,
          refreshToken: response.data.data.refresh_token,
          accessToken: response.data.data.access_token
        }

        this.$session.start()
        this.$session.set('user', user)
        this.changeisSignedIn()
      }
    },
    'onFailureGenerateTokenCallback': function (error) {
      auth2.signOut()

      alert(error)
    },
    'onSignInFailureCallback': function (error) {
      alert(error.error)
    },
    'onSignOut': function () {
      auth2.signOut()

      this.$session.remove('user')
      this.$session.destroy()
      this.changeisSignedIn()

      alert('Sign out success')

      this.$router.push({path: '/'})
    },
    'changeisSignedIn': function () {
      this.isSignedIn = this.$session.has('user')
    }
  }
}
</script>

<style scoped>
.col-sm-1 {
  text-align: center
}
.navbar-brand {
  cursor: pointer
}
.btn-primary {
  background-color: #17a2b8;
  border-color: #17a2b8;
}
#header {
  box-shadow: 5px 3px #888888;
}
</style>
