<template lang="pug">
  div.container
    div#rules-create
      div.content
        b-jumbotron(
          header="Rules",
          lead="Create Rules",
          fluid style="padding-left: 8%; padding-right: 8%;  margin-top: 10px; margin-bottom: 10px; border-radius:10px;")
          hr
          b-jumbotron
              b-form
                  b-form-group(
                    label="CM: ",
                    label-for="cm-sub-category")
                      v-select(
                        label="text",
                        :options="cmSubCategory",
                        v-model="cmSubCategorySelected",
                        required
                        style="background-color:white;"
                        )
                      br(
                        v-show="showCmSubSubCategory")
                      b-form-group(
                      v-if="showCmSubSubCategory",
                      label="CM Sub Category: ",
                      label-for="cm-sub-sub-category")
                        v-select#cm-sub-sub-category(
                          v-if="showCmSubSubCategory",
                          label="text",
                          :options="cmSubCategorySelected.cmSubSubCategory",
                          v-model="cmSubSubCategorySelected",
                          required,
                          style="background-color:white;"
                          )
                  b-form-group(
                    label="Logistic:",
                    label-for="logistic")
                      v-select(
                        label="text",
                        :options="logistic",
                        v-model="logisticSelected",
                        style="background-color:white;"
                        )
                      br(
                        v-show="showLogisticFullfilment")
                      b-form-group(
                      v-if="showLogisticFullfilment",
                      label="Fulfillment",
                      label-for="fulfillment")
                        v-select#cm-logistic-fullfilment(
                          v-if="showLogisticFullfilment",
                          label="text",
                          :options="logisticSelected.fullfilment",
                          v-model="fullfilmentSelected",
                          required,
                          style="background-color:white;"
                          )
                  b-form-group(
                  label="Create Dropship File Attachment :",
                  label-for="dropshipFile",
                  required)
                    b-form-checkbox-group(
                    v-model="dropshipFileSelected",
                    :options="dropshipFile",
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
                            placeholder="Enter email address...",
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
                        v-for="( item, index ) in emailItems",
                        v-bind:key="index")
                        DataItem(
                          v-bind:dataItems="emailItems",
                          v-bind:item="item",
                          v-bind:index="index")
                  br(
                    v-show="emailItems.length !== 0")
                  b-form-group(
                    label="Cc :",
                    label-for="cc-email")
                    b-row
                      b-col(
                        sm="10")
                        b-form-input#cc-email(
                          type="email",
                          v-model="ccEmail",
                          placeholder="Enter email address...",
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
                        v-bind:key="index")
                        DataItem(
                          v-bind:dataItems="ccEmailItems",
                          v-bind:item="item",
                          v-bind:index="index")
                  br(
                    v-show="ccEmailItems.length !== 0")
                  b-form-group(
                    label="Bcc :",
                    label-for="bcc-email")
                    b-row
                      b-col(
                        sm="10")
                        b-form-input#bcc-email(
                          type="email",
                          v-model="bccEmail",
                          placeholder="Enter email address...",
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
                        v-bind:dataItems="bccEmailItems",
                        v-bind:item="item",
                        v-bind:index="index")
                  br(
                    v-show="bccEmailItems.length !== 0")
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
                    b-col#attachment-email-item(
                      cols="12",
                      sm="auto",
                      v-for="( item, index ) in attachmentEmailItems",
                      v-bind:key="index")
                      DataItem(
                        v-bind:dataItems="attachmentEmailItems",
                        v-bind:item="item.name",
                        v-bind:index="index")
                  br(
                    v-show="attachmentEmailItems.length !== 0")
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
                    label="Sending Rule :",
                    label-for="sending-rule")
                      v-select(
                        label="text",
                        :options="sendingRule",
                        v-model="sendingRuleSelected",
                        required,
                        style="background-color:white;"
                        )
                  b-form-group(
                    label="Add Data to Template :",
                    label-for="data-to-template")
                      div.row
                          div.col-sm-10
                                v-select#data-to-template(
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
                    @ok="resetForm"
                  )
                    b-alert(variant="danger" show) Anda ingin menghapus isi form?
                  b-modal(
                    id="modal-submit",
                    @ok="submitFormAdd"
                  )
                    b-alert(variant="success" show) Anda ingin menyimpan rule?
                  div.row
                      div.col-sm-8
                      div.col-sm-2.cancel-button
                          b-button(
                            variant="danger",
                            v-b-modal="'modal-reset'"
                            )
                            v-icon#cancel-icon(
                              name="trash-2"
                              )
                      div.col-sm-2
                          b-button(
                            variant="success",
                            v-b-modal="'modal-submit'"
                            )
                            v-icon#save-icon(
                              name="check-square"
                              )
</template>

<script>
import axios from 'axios'
import DataItem from '@/components/data-item'

export default {
  name: 'RulesCreate',
  components: { DataItem },
  mounted: function () {
    if (!this.$session.get('user')) {
      this.$router.push({path: '/'})
    }

    this.ruleId = parseInt(this.$route.params.ruleId)

    if(this.ruleId){
      this.getRule()
    }
  },
  data: function () {
    return {
      ruleId: undefined,
      dropshipFile: [
        {
          text: 'Create Dropship File Attachment',
          value: true
        }
      ],
      dropshipFileSelected: false,
      cmSubCategory: [
        {
          id: 1,
          text: 'Keterlambatan Pickup'
        },
        {
          id: 2,
          text: 'Keterlambatan Drop',
          cmSubSubCategory: [
            {
              id: 1,
              text: 'Drop 1'
            },
            {
              id: 2,
              text: 'Drop 2'
            }
          ]
        }
      ],
      cmSubCategorySelected: undefined,
      cmSubSubCategorySelected: undefined,
      logistic: [
        {
          id: 1,
          text: 'JNE',
          fullfilment: [
            {
              id: 1,
              text: 'Reguler'
            },
            {
              id: 2,
              text: 'Dropship'
            }
          ]
        },
        {
          id: 2,
          text: 'Pos Indonesia'
        }
      ],
      logisticSelected: undefined,
      fullfilmentSelected: undefined,
      email: '',
      ccEmail: '',
      bccEmail: '',
      attachmentEmail: '',
      sendingRule: [
        {
          text: 'Every New CM',
          value: 'EVERY_NEW_CM'
        },
        {
          text: 'Every Day',
          value: 'EVERY_DAY'
        },
        {
          text: 'Every Change Status',
          value: 'EVERY_CHANGE_STATUS'
        }
      ],
      sendingRuleSelected: '',
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
      dataFieldSelected: '',
      emailItems: [],
      ccEmailItems: [],
      bccEmailItems: [],
      attachmentEmailItems: [],
      excelDataFieldSelected: '',
      subjectEmail: '',
      template: '',
      counter: 100,
      max: 100,
      excelDataItems: []
    }
  },
  watch: {
    cmSubCategorySelected: function (value) {
      if (!value.cmSubSubCategory) {
        this.cmSubSubCategorySelected = undefined
      }
    },
    logisticSelected: function (value) {
      if (!value.fullfilment) {
        this.fullfilmentSelected = undefined
      }
    }
  },
  computed: {
    showCmSubSubCategory: function () {
      return this.cmSubCategorySelected && this.cmSubCategorySelected.cmSubSubCategory
    },
    showLogisticFullfilment: function () {
      return this.logisticSelected && this.logisticSelected.fullfilment
    }
  },
  methods: {
    'getRule': function () {
      let url = '/api/' + auth2.currentUser.get().getBasicProfile().getEmail() + '/rules/' + this.ruleId

      let options = {
        headers: {
          'Authorization': 'Bearer ' + this.$session.get('user').idToken
        }
      }

      axios.get(url, options)
        .then(this.onGetRuleSuccess)
        .catch(this.onGetRuleFailure)
    },
    'onGetRuleSuccess': function (response) {
      let rule = response.data.data
      if (rule) {
        if (rule.cm_sub_category_id != ''){
          if (rule.cm_sub_category_id == 1){
            this.cmSubCategorySelected = {
              id : parseInt(rule.cm_sub_category_id),
              text : "Keterlambatan Pickup"
            }
          }
          else {
            this.cmSubCategorySelected = {
              id: parseInt(rule.cm_sub_category_id),
              text: 'Keterlambatan Drop',
              cmSubSubCategory: [
                {
                  id: 1,
                  text: 'Drop 1'
                },
                {
                  id: 2,
                  text: 'Drop 2'
                }
              ]
            }
          }
        }

        if (rule.cm_sub_sub_category_id != ''){
          if (rule.cm_sub_sub_category_id == 1){
            this.cmSubSubCategorySelected = {
              id : parseInt(rule.cm_sub_sub_category_id),
              text : "Drop 1"
            }
          }
          else {
            this.cmSubSubCategorySelected = {
              id : parseInt(rule.cm_sub_sub_category_id),
              text : "Drop 2"
            }
          }
        }

        if (rule.logistic_id != ''){
          if(rule.logistic_id == 1){
            this.logisticSelected = {
              id : parseInt(rule.logistic_id),
              text : "JNE",
              fullfilment: [
                {
                  id: 1,
                  text: 'Reguler'
                },
                {
                  id: 2,
                  text: 'Dropship'
                }
              ]
            }
          }
          else {
            this.logisticSelected = {
              id : parseInt(rule.logistic_id),
              text : "Pos Indonesia"
            }
          }
        }

        if (rule.logistic_fulfilment_id != null) {
          if(rule.logistic_fulfilment_id == 1){
            this.fullfilmentSelected = {
              id: parseInt(rule.logistic_fulfilment_id),
              text: 'Reguler'
            }
          }
          else {
            this.fullfilmentSelected = {
              id: parseInt(rule.logistic_fulfilment_id),
              text: 'Dropship'
            }
          }
        }

        if (rule.sending_rule != ''){
          if (rule.sendingRule == 'EVERY_NEW_CM'){
            this.sendingRuleSelected = {
              text: 'Every New CM',
              value: 'EVERY_NEW_CM'
            }
          }
          else if (rule.sending_rule == 'EVERY_DAY') {
            this.sendingRuleSelected = {
              text: 'Every Day',
              value: 'EVERY_DAY'
            }
          }
          else {
            this.sendingRuleSelected = {
              text: 'Every Change Status',
              value: 'EVERY_CHANGE_STATUS'
            }
          }
        }

        this.dropshipFileSelected = rule.create_dropship_attachment

        for (let to in rule.to) {
          this.emailItems.push(rule.to[to].email)
        }

        for (let cc in rule.cc) {
          this.ccEmailItems.push(rule.cc[cc].email)
        }

        for (let bcc in rule.bcc) {
          this.bccEmailItems.push(rule.bcc[bcc].email)
        }

        for (let attachments in rule.attachment) {
          rule.attachment[attachments].ruleId = rule.rule_id
          this.attachmentEmailItems.push(rule.attachment[attachments])
        }

        for (let index in rule.newExcelFile) {
          this.excelDataItems.push(rule.newExcelFile[index].field)
        }

        this.subjectEmail = rule.subject
        this.template = rule.template
      }
    },
    'onGetRuleFailure': function (error) {
      alert(error)
    },
    addDataField: function () {
      if (this.dataFieldSelected !== '') {
        this.template += ' ${' + this.dataFieldSelected.value + '} '
        this.dataFieldSelected = ''
      }
    },
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
    addAttachmentEmailItem: function () {
      if (this.attachmentEmail !== '') {
        this.attachmentEmailItems.push(this.attachmentEmail)
        this.attachmentEmail = ''
      }
    },
    resetForm: function () {
      this.cmSubCategorySelected = undefined
      this.cmSubSubCategorySelected = undefined
      this.logisticSelected = undefined
      this.fullfilmentSelected = undefined
      this.dropshipFileSelected = false
      this.emailItems = []
      this.ccEmailItems = []
      this.bccEmailItems = []
      this.attachmentEmailItems = []
      this.sendingRuleSelected = undefined
      this.subjectEmail = ''
      this.template = ''
    },
    submitFormAdd: function () {
      let url = undefined
      let self = this
      let data = new FormData()
      data.append('cmSubId', this.cmSubCategorySelected.id)

      if (this.cmSubSubCategorySelected) {
        data.append('cmSubSubId', this.cmSubSubCategorySelected.id)
      }

      data.append('logisticId', this.logisticSelected.id)

      if (this.fullfilmentSelected) {
        data.append('logisticFulfilmentId', this.fullfilmentSelected.id)
      }

      data.append('createLogisticDropshipAttachment', this.dropshipFileSelected)

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

      data.append('sendingRule', this.sendingRuleSelected.value)
      data.append('subject', this.subjectEmail)
      data.append('template', this.template)
      data.append('name', auth2.currentUser.get().getBasicProfile().getName())
      data.append('accessToken', this.$session.get('user').accessToken)
      data.append('refreshToken', this.$session.get('user').refreshToken)
      data.append('idToken', this.$session.get('user').idToken)

      url = '/api/' + auth2.currentUser.get().getBasicProfile().getEmail() + '/rules'

      if (this.ruleId){
          url = url + '/' + this.ruleId
       }

      axios.post(url, data)
        .then(function (response) {
          alert(response.data.data.message)
          self.$router.push('/rules')
        })
        .catch(function (error) {
          alert(error)
        })
    }
  }
}
</script>

<style scoped>
.jumbotron {
  min-height: -webkit-fill-available;
  background-color: #eaf5f7;
}

#email-item {
  text-align: center;
}

.cancel-button {
    text-align: end
}

.container {
  padding-left: 0 !important;
  padding-right: 0 !important;
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

#attachment-excel-items {
  margin-left: 15px;
  margin-right: 15px;
}
</style>
