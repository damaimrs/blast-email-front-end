<template lang="pug">
b-container
  div#blast-emails
    b-jumbotron(
      header="Blast Emails",
      lead="Blast Emails Dashboard",
      fluid,
      style="padding-left: 8%; padding-right: 8%; margin-top: 10px; margin-bottom: 10px; border-radius:10px;")
      hr
      b-row(
        style="margin-bottom: 5%")
        b-col(
          sm="6")
        b-col(
          sm="6")
          b-row(
            align-h="end",
            style="margin-top:5%")
            b-button#add-button(
              variant="primary",
              to="/blast-emails/create") Create Blast Emails
              v-icon#add-icon(
                name="check")
      b-row.justify-content-md-center(
        style="text-align:center; background-color:white; border-radius:8px;")
        div.content(
          style="min-width: 90%")
          b-table(striped,
            hover,
            v-bind:fields="fields",
            v-bind:items="items",
            style="font-size: 15px",
            table-layout: fixed)
            template(
              slot="no",
              slot-scope="data") {{ (number * 10) + data.index  + 1 - 10}}
            template(
              slot="options",
              slot-scope="data")
              b-button-group
                b-btn#see-progress-button(
                  type="button",
                  size="sm",
                  variant="warning",
                  v-bind:to="'/blast-emails/progress/' + data.item.blast_email_id")
                  v-icon#edit-icon(
                    name="eye")
          br
          b-row(
            align-h="center")
            b-pagination(
              v-bind:total-rows="paging.total_item",
              v-model="page",
              v-bind:limit="paginationLimit",
              v-bind:per-page="paging.item_per_page")
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'BlastEmails',
  mounted: function () {
    if (!this.$session.get('user')) {
      this.$router.push({path: '/'})
    }

    this.page = parseInt(1)
    this.getBlasts()
  },
  data: function () {
    return {
      fields: [
        {
          key: 'no',
          thStyle: 'width: 60px'
        },
        {
          key: 'blast_email_progress',
          label: 'Progress',
          thStyle: 'width: 150px'
        },
        {
          key: 'blast_email_total',
          label: 'Total Email',
          thStyle: 'width: 150px'
        },
        {
          key: 'created_by',
          thStyle: 'width: 350px;'
        },
        {
          key: 'created_at',
          formatter: this.dateFormat
        },
        {
          key: 'options',
          thStyle: 'width: 100px;'
        }
      ],
      items: [],
      page: null,
      paginationLimit: 3,
      paging: {},
      search: null,
      number: '',
    }
  },
  methods: {
    'dateFormat': function (value) {
      return moment(value).format('MM/DD/YYYY HH:mm')
    },
    'getBlasts': function () {
      let url = '/api/' + auth2.currentUser.get().getBasicProfile().getEmail() + '/blasts'

      let options = {
        headers: {
          'Authorization': 'Bearer ' + this.$session.get('user').idToken
        },
        params: {
          'page': this.page
        }
      }

      axios.get(url, options)
        .then(this.onGetBlastsSuccess)
        .catch(this.onGetBlastsFailure)
    },
    'onGetBlastsSuccess': function (response) {
      this.items = []

      this.number = response.data.paging.page

      if (response.data.data) {
        this.items = response.data.data
        this.paging = response.data.paging

        this.page = this.paging.page
      }
    },
    'onGetBlastsFailure': function (error) {
      alert(error)
    }
  },
  watch: {
    page: function() {
      this.getBlasts()
    }
  }
}
</script>

<style scoped>
.jumbotron {
  min-height: -webkit-fill-available;
  background-color: #eaf5f7;
}

.cancel-button {
    text-align: end
}

.container {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.content {
  min-width: 50%;
}

.btn-primary {
  background-color: #17a2b8;
  border-color: #17a2b8;
}

.btn-primary:hover {
  background-color: #0f7f91;
  border-color: #0f7f91;
}

.btn-outline-primary:hover {
  background-color: #9ec3ff !important;
  border-color: #9ec3ff !important;
}

.btn-success {
  width: 100%;
  background-color: #2aba5a;
  border-color: #2aba5a;
  padding: 5px 5px 3px 5px !important;
}

.btn-danger {
  width: 100%;
  background-color: #bc4242;
  border-color: #bc4242;
  padding: 5px 5px 3px 5px !important;
}

.btn-danger:hover {
  background-color: #eb2f06;
  border-color: #eb2f06;
}

.btn-warning {
  width: 100%;
  background-color: #f6b93b;
  border-color: #f6b93b;
  padding: 5px 5px 3px 5px !important;
}

.btn-warning:hover {
  background-color: #fa983a;
  border-color: #fa983a;
}

#edit-icon, #delete-icon, #add-icon, #detail-icon, #icon-search {
  height: 16px;
  color: white;
}

#add-icon {
  vertical-align: middle;
  margin-right: 0;
  margin-left: 5px;
  height: 18px;
}

#add-button {
  margin-right: 10%;
  margin-top: 17px;
}

thead, tbody {
  background-color: white;
  border-radius: 10%;
}

tbody tr:hover {
  background-color: #e8ebef;
}

#search {
  width: 80%;
  margin-top: 35px;
  margin-left: 5%;
}

</style>
