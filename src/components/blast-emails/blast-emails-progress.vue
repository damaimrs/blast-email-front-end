<template lang="pug">
  b-container
    div#blast-emails
      b-jumbotron(
      fluid,
      style="padding-left: 8%; padding-right: 8%; margin-top: 10px; margin-bottom: 10px; border-radius:10px;")
        b-row(
        style="margin-bottom: 5%")
          b-col(
          sm="6")
          b-col(
          sm="6")
            b-row(
            align-h="end")
              b-button#add-button(
              variant="danger",
              style="width: 50%",
              v-on:click="downloadDetailBlast") Download Progress File
                v-icon#add-icon(
                name="download"                
                )
        b-row(
        style="margin-bottom: 5%; background-color: #fff; border-radius: 10px; padding-top: 20px; padding-bottom: 20px; padding-left: 10px; padding-right: 10px;",
        v-bind:items="items")
          b-col(
          sm="6")
            h6 Blast Email Progress &emsp; : {{ data.blast_email_progress }}
            h6 Blast Email Total&emsp;&emsp; &emsp;: {{ data.blast_email_total }}
          b-col(
          sm="6")
            h6 &emsp; Created by &emsp;: {{ data.created_by }}
            h6 &emsp; Created at &emsp; : {{ data.created_at }}
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
              slot-scope="data") {{ data.index + 1 }}
            br
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'BlastEmailsProgress',
  mounted: function () {
    if (!this.$session.get('user')) {
      this.$router.push({path: '/'})
    }

    this.blastEmailId = parseInt(this.$route.params.blastEmailId)
    this.getBlasts()
  },
  data: function () {
    return {
      blastEmailId: undefined,
      fields: [
        {
          key: 'no',
          thStyle: 'width: 40px'
        },
        {
          key: 'awb',
          label: 'Awb Number',
          sortable: true
        },
        'email',
        {
          key: 'order_item_id',
          label: 'Order Item Id',
          sortable: true
        },
        {
          key: 'is_status',
          label: 'Status'
        },
        'message',
      ],
      items: [],
      data: ''
    }
  },
  methods: {
    'dateFormat': function (value) {
      return moment(value).format('MM/DD/YYYY HH:mm')
    },
    'getBlasts': function () {
      let url = '/api/' + auth2.currentUser.get().getBasicProfile().getEmail() + '/blasts/' + this.blastEmailId

      let options = {
        headers: {
          'Authorization': 'Bearer ' + this.$session.get('user').idToken
        }
      }

      axios.get(url, options)
        .then(this.onGetBlastsSuccess)
        .catch(this.onGetBlastsFailure)
    },
    'onGetBlastsSuccess': function (response) {
      this.items = []

      if (response.data.data) {
        response.data.data.created_at = moment(response.data.data.created_at).format('MM/DD/YYYY HH:mm')
        this.data = response.data.data
        this.items = this.data.items

        for (let item in this.items){

          if(this.items[item].awb == null || this.items[item].awb == ''){
            this.items[item].awb = '-'
          }
          
          if(this.items[item].email == null || this.items[item].email == ''){
            this.items[item].email = '-'
          }

          if(this.items[item].order_item_id == null || this.items[item].order_item_id == ''){
            this.items[item].order_item_id = '-'
          }

          if(this.items[item].is_success == true){
            this.items[item].is_status = 'Success' 
          }else {
            this.items[item].is_status = 'Failed'
          }

          if(this.items[item].message == null || this.items[item].message == ''){
            this.items[item].message = '-'
          }

        }
        console.log(this.data)
      }
    },
    'onGetBlastsFailure': function (error) {      
      alert(error)
    },
    'downloadDetailBlast': function () {

      let url = '/api/' + auth2.currentUser.get().getBasicProfile().getEmail() + '/blasts/' + this.blastEmailId + '/files'      

      let options = {
        headers: {
          'Authorization': 'Bearer ' + this.$session.get('user').idToken,
          'Content-Type' : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"  
        },
        responseType: "arraybuffer"
      }

      axios.get(url, options)
        .then(this.downloadDetailBlastSuccess)
        .catch(this.downloadDetailBlastFailure)
    },
    'downloadDetailBlastSuccess': function (response) {

        const url = window.URL.createObjectURL(new Blob([response.data], {type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}));
        const link = document.createElement('a');
        
        link.href = url;
        link.setAttribute('download', 'Detail Blast.xlsx');
        document.body.appendChild(link);
        link.click();
        console.log(response)
        alert("File Berhasil Didownload!")

    },
    'downloadDetailBlastFailure': function (error) {
      alert(error)
    },
  }
}
</script>

<style scoped>
.jumbotron {
  min-height: -webkit-fill-available;
  background-color: #eaf5f7;
}

.no {
  width : 100px;
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
