<template lang="pug">
  div.container
    div#blast-emails-create
      div.content
        b-jumbotron(
          header="Blast Emails",
          lead="Create Blast Emails",
          fluid style="padding-left: 8%; padding-right: 8%;  margin-top: 10px; margin-bottom: 10px; border-radius:10px;")
          hr
          b-jumbotron
              b-form
                  b-form-group(
                    label="Upload Excel File :",
                    label-for="upload-excel-file", required)
                    b-row
                      b-col(
                        sm="12")
                        b-form-file(
                          v-model="excelFileItem",
                          placeholder="Choose an excel file...",
                          accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
                  b-form-group(
                    label="Recipient :",
                    label-for="recipient",
                    required)
                    b-form-checkbox-group(
                      v-model="recipientSelected",
                      :options="recipient",
                      required)
                  b-form-group(
                    label="Email :",
                    label-for="email")
                    b-row
                      b-col(
                        sm="10")
                        b-form-input#email(
                          type="email",
                          v-model="email",
                          placeholder="Enter recipient email address...",
                          required,
                          @keydown.enter.native="addEmailItem")
                      b-col(
                        sm="2")
                        b-button(
                          variant="primary",
                          v-on:click="addEmailItem") Add
                          v-icon#add-icon(
                            name="check")
                  b-row
                      b-col#email-item(
                        cols="12",
                        sm="auto",
                        v-for="( item, index) in emailItems",
                        v-bind:key="index")
                        DataItem(
                          v-bind:dataItem="emailItems",
                          v-bind:item="item",
                          v-bind:index="index")
                  b-form-group(
                    label="Cc :",
                    label-for="cc-email")
                    b-row
                      b-col(
                        sm="10")
                        b-form-input#cc-email(
                          type="email",
                          v-model="ccEmail",
                          placeholder="Enter recipient email...",
                          @keydown.enter.native="addCcEmailItem")
                      b-col(
                        sm="2")
                        b-button(
                          variant="primary",
                          v-on:click="addCcEmailItem") Add
                          v-icon#add-icon(
                            name="check")
                  b-row
                      b-col#cc-email-item(
                        cols="12",
                        sm="auto",
                        v-for="( item, index ) in ccEmailItems",
                        b-bind:key="index")
                        DataItem(
                          v-bind:dataItem="ccEmailItems",
                          v-bind:item="item",
                          v-bind:index="index")
                  b-form-group(
                    label="Bcc :",
                    laber-for="bcc-email")
                    b-row
                      b-col(
                        sm="10")
                        b-form-input#bcc-email(
                          type="email",
                          v-model="bccEmail",
                          placeholder="Enter recipient email...",
                          @keydown.enter.native="addBccEmailItem")
                      b-col(
                        sm="2")
                        b-button(
                          variant="primary",
                          v-on:click="addBccEmailItem") Add
                          v-icon#add-icon(
                            name="check")
                  b-row
                      b-col#bcc-email-item(
                        cols="12",
                        sm="auto",
                        v-for="( item, index ) in bccEmailItems",
                        v-bind:key="index")
                        DataItem(
                          v-bind:dataItem="bccEmailItems",
                          v-bind:item="item",
                          v-bind:index="index")
                  b-form-group(
                    label="Attachment :",
                    label-for="attachment-email")
                    b-row
                      b-col(
                        sm="10")
                        b-form-file#attachment-email(
                          v-model="attachmentEmail",
                          placeholder="Choose an attachment...",
                          @keydown.enter.native="addAttachmentEmailItem")
                      b-col(
                        sm="2")
                        b-button(
                          variant="primary",
                          v-on:click="addAttachmentEmailItem") Add
                          v-icon#add-icon(
                            name="check")
                  b-row
                      div(
                        cols="12",
                        sm="auto",
                        v-for="( item, index) in attachmentEmailItems",
                        v-bind:key="index")
                          DataItem#attachment-email-items(
                            v-bind:dataItems="attachmentEmailItems",
                            v-bind:item="item.name",
                            v-bind:index="index")
                  br(
                    v-show="attachmentEmailItems !== 0")
                  b-form-group(
                    label="Add Data to Attachment Excel File :",
                    label-for="data-to-attachment-excel-file")
                      div.row
                        div.col-sm-10
                          v-select#data-to-attachment-excel-file(
                            label="text",
                            :options="dataField",
                            v-model="excelDataFieldSelected",
                            style="background-color:white;"
                            )
                        div.col-sm-2
                          b-button(
                            variant="primary",
                            v-on:click="addExcelDataField") Add
                            v-icon#add-icon(
                              name="check")
                  b-row
                    div#attachment-excel-items(
                      cols="12",
                      sm="auto",
                      v-for="( item, index ) in excelDataItems",
                      v-bind:key="index")
                      DataItem(
                        v-bind:dataItems="excelDataItems",
                        v-bind:item="item",
                        v-bind:index="index")
                  br(
                    v-show="excelDataItems.length !== 0")
                  b-form-group(
                    label="Add Data to Template :",
                    label-for="data-to-template")
                      b-row
                        div.col-sm-10
                          v-select(
                            label="text",
                            :options="dataField",
                            v-model="dataFieldSelected",
                            style="background-color:white;"
                            )
                        div.col-sm-2
                          b-button(
                            variant="primary",
                            v-on:click="addDataField") Add
                            v-icon#add-icon(
                              name="check")
                  b-form-group(
                    label="Email Subject :",
                    label-for="subject-email")
                      div.row
                          div.col-sm-12
                                b-form-input#subject-email(
                                  type="text",
                                  v-model="subjectEmail",
                                  placeholder="Enter email subject...")
                  br
                  wysiwyg(
                    v-model="template",
                    placeholder="Write your email template...",
                    required,
                    style="background-color:white;"
                    )
                  br
                  br
                  b-modal(
                    id="modal-reset",
                    @ok="resetForm")
                    b-alert(
                      variant="danger" show) Anda ingin menghapus isi form?
                  b-modal(
                    id="modal-submit",
                    @ok="submitFormAdd")
                    b-alert(
                      variant="success" show) Anda ingin membuat blast email?
                  b-row
                    div.col-sm-8
                    div.col-sm-2.cancel-button
                        b-button(
                          variant="danger",
                          v-b-modal="'modal-reset'")
                          v-icon#cancel-icon(
                            name="trash-2")
                    div.col-sm-2
                        b-button(
                          variant="success",
                          v-b-modal="'modal-submit'")
                          v-icon#save-icon(
                            name="check-square")
</template>

<script>
import axios from 'axios'
import DataItem from '@/components/data-item'

export default {
  name: 'BlastEmailsCreate',
  components: { DataItem },
  mounted: function () {
    if (!this.$session.get('user')) {
      this.$router.push({path: '/'})
    }
  },
  data: function () {
    return {
      excelFile: null,
      recipient: [
        {
          text: 'Customer',
          value: true
        }
      ],
      counter: 100,
      max: 100,
      recipientSelected: false,
      email: '',
      ccEmail: '',
      bccEmail: '',
      excelFileItem: '',
      attachmentEmail: '',
      dataField: [
        {
          text: 'Order Id',
          value: 'Order Id'
        },
        {
          text: 'Order Item',
          value: 'Order Item'
        },
        {
          text: 'Logistic',
          value: 'Logistic'
        }
      ],
      excelDataItems: [],
      excelDataFieldSelected: '',
      dataFieldSelected: '',
      template: '',
      emailItems: [],
      ccEmailItems: [],
      bccEmailItems: [],
      excelFileItems: [],
      attachmentEmailItems: [],
      subjectEmail: '',
    }
  },
  methods: {
    checkContains: function (dataItem) {
      return dataItem === this.excelDataFieldSelected.text
    },
    addExcelDataField: function () {
      if (this.excelDataFieldSelected.value !== '' && !this.excelDataItems.find(this.checkContains)) {
        this.excelDataItems.push(this.excelDataFieldSelected.text)
        this.excelDataFieldSelected = ''
      }
    },
    addEmailItem: function () {
      if (this.email !== '') {
        this.emailItems.push(this.email)
        this.email = ''
      }
    },
    addCcEmailItem: function () {
      if (this.ccEmail !== '') {
        this.ccEmailItems.push(this.ccEmail)
        this.ccEmail = ''
      }
    },
    addBccEmailItem: function () {
      if (this.bccEmail !== '') {
        this.bccEmailItems.push(this.bccEmail)
        this.bccEmail = ''
      }
    },
    addDataField: function () {
      if (this.dataFieldSelected !== '') {
        this.template += ' ${' + this.dataFieldSelected.value + '} '
        this.dataFieldSelected = ''
      }
    },
    addExcelFileItem: function () {
      if (this.excelFileItem !== '') {
        this.excelFileItems.push(this.excelFileItem)
        this.excelFileItem = ''
      }
    },
    addAttachmentEmailItem: function () {
      if (this.attachmentEmail !== '') {
        this.attachmentEmailItems.push(this.attachmentEmail)
        this.attachmentEmail = ''
      }
    },
    submitFormAdd: function () {
      let data = new FormData()
      let self = this

      data.append('excelFile', this.excelFileItem)

      data.append('sendToCustomer', this.recipientSelected)

      for (let to in this.emailItems) {
        data.append('tos', this.emailItems[to])
      }

      for (let cc in this.ccEmailItems) {
        data.append('ccs', this.ccEmailItems[cc])
      }

      for (let bcc in this.bccEmailItems) {
        data.append('bccs', this.bccEmailItems[bcc])
      }

      for (let attachment in this.attachmentEmailItems) {
        data.append('attachments', this.attachmentEmailItems[attachment])
      }

      for (let item in this.excelDataItems) {
        data.append('newExcelFile', this.excelDataItems[item])
      }

      data.append('subject', this.subjectEmail)
      data.append('template', this.template)
      data.append('name', auth2.currentUser.get().getBasicProfile().getName())
      data.append('accessToken', this.$session.get('user').accessToken)
      data.append('refreshToken', this.$session.get('user').refreshToken)
      data.append('idToken', this.$session.get('user').idToken)

      let url = '/api/' + auth2.currentUser.get().getBasicProfile().getEmail() + '/blasts'

      axios.post(url, data)
        .then(function (response) {          
          alert(response.data.data.message)
          self.$router.push('/blast-emails')
        })
        .catch(function (error) {
          alert(error)
        })
    },
    resetForm: function () {
      this.excelFileItems = []
      this.recipientSelected = undefined
      this.emailItems = []
      this.ccEmailItems = []
      this.bccEmailItems = []
      this.attachmentEmailItems = []
      this.subjectEmail = ''
      this.template = ''
    }
  }
}
</script>

<style scoped>
.jumbotron {
  min-height: -webkit-fill-available;
  background-color: #eaf5f7;
}

.container {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
.cancel-button {
    text-align: end
}

.btn-primary {
  width: 100%;
  background-color: #17a2b8;
  border-color: #17a2b8;
  padding: 5px 5px 3px 5px !important;
}

.btn-success {
  width: 100%;
  background-color: #4a69bd;
  border-color: #4a69bd;
  padding: 5px 5px 3px 5px !important;
}

.btn-danger {
  width: 100%;
  background-color: #e55039;
  border-color: #e55039;
  padding: 5px 5px 3px 5px !important;
}

#cancel-icon, #save-icon, #add-icon {
  height: 23px;
  vertical-align: middle;
  margin-right: 0;
  padding-bottom: 5px
}

#add-icon {
  margin-left: 5px;
  margin-top: 5px;
  height: 18px;
}

#attachment-email-items {
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
}

#attachment-excel-items {
  margin-left: 15px;
  margin-right: 15px;
}
</style>
