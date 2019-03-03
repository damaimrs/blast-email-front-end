<template lang="pug">
  div#data-item
    b-button(
      variant="info",
      disabled) {{ item }} &nbsp
        b-badge#delete-item(
          variant="light",
          v-on:click="deleteThisItem") X
</template>

<script>
import axios from 'axios'

export default {
  name: 'DataItem',
  props: [ 'dataItems', 'item', 'index' ],
  methods: {
    deleteThisItem: function () {

      if (this.dataItems[this.index].id && this.dataItems[this.index].ruleId) {
        this.deleteAttachmentFileInServer()
      } else {
        this.removeItemFromArray()
      }
    },
    deleteAttachmentFileInServer: function () {
      let url = '/api/' + auth2.currentUser.get().getBasicProfile().getEmail() +
        '/rules/' + this.dataItems[this.index].ruleId +
        '/attachments/' + this.dataItems[this.index].id

      let options = {
        headers: {
          'Authorization': 'Bearer ' + this.$session.get('user').idToken
        }
      }

      axios.delete(url, options)
        .then(this.onDeleteAttachmentFileInServerSuccess)
        .catch(this.onDeleteAttachmentFileInServerFailed)
    },
    onDeleteAttachmentFileInServerSuccess: function (response) {
      if (response.data.data) {
        this.removeItemFromArray()
      }
    },
    onDeleteAttachmentFileInServerFailed: function (error) {
      alert(error)
    },
    removeItemFromArray: function () {
      this.dataItems.splice(this.index, 1)
    }
  }
}
</script>

<style scoped>
#delete-item {
    cursor: pointer;
    z-index : 1;
}

#data-item {
    margin-top: 10px;
    margin-bottom: 10px;
}

.btn-info {
  background-color: #f25502;
  border-color: #f25502;
}
</style>
