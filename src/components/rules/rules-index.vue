<template lang="pug">
b-container
  div#rules
    b-jumbotron(
      header="Rules",
      lead="Rules Dashboard",
      fluid,
      style="padding-left: 8%; padding-right: 8%; margin-top: 10px; margin-bottom: 10px; border-radius:10px;")
      hr
      b-row(
        style="margin-bottom: 5%")
        b-col(
          sm="3")
        b-col(
          sm="9")
          b-row(
            align-h="end",
            style="margin-top:5%")
            b-col(
              sm="8"
              )
              b-row(
                align-h="end"
                )
                b-button#search(
                @click="showSearchForm=true"
                  variant="primary",
                  title="Search rules"
                  )
                  v-icon#cancel-icon(
                    name="search"
                    )
            b-col(sm="4")
              b-button#add-button(
                variant="primary",
                to="/rules/create",
                title="Add rules",) Create Rule
                v-icon#add-icon(
                  name="check")
      b-row
        b-alert#search-form(
          variant="primary",
          dismissible,
          :show="showSearchForm",
          @dismissed="showSearchForm=false"
          )
          b-form
            b-row
              b-col(
                sm="6"
                )
                b-form-group(
                label-for="Search",
                )
                  v-select(
                    label="text",
                    :options="cmSubCategory",
                    v-model="filterByCMSelected",
                    placeholder="Search Sub Category..",
                    required,
                    style="font-size:13.5px"
                    )
              b-col(
                sm="6"
                )
                b-form-group(
                label-for="Search"
                )
                  v-select(
                    label="text",
                    :options="cmSubSubCategory",
                    v-model="filterByCMSubCategorySelected",
                    placeholder="Search Sub Sub Category..",
                    required,
                    style="font-size:13.5px"
                    )
            b-row
              b-col(
                sm="6"
                )
                b-form-group(
                label-for="Search"
                )
                  v-select(
                    label="text",
                    :options="logistic",
                    v-model="filterByLogisticSelected",
                    placeholder="Search logistic",
                    required,
                    style="font-size:13.5px"
                  )
              b-col(
                sm="6"
                )
                b-form-group(
                label-for="Search"
                )
                  v-select(
                    label="text",
                    :options="fullfilment",
                    v-model="filterByFulfillmentSelected",
                    placeholder="Search fulfillment",
                    required,
                    style="font-size:13.5px"
                    )
            b-row
              b-col(
                sm="6"
                )
                b-form-group(
                label-for="Search"
                )
                  v-select(
                    label="text",
                    :options="sendingRule",
                    v-model="filterBySendingRuleSelected",
                    placeholder="Search sending rule",
                    required,
                    style="font-size:13.5px"
                    )
              b-col(
                sm="6"
                )
                b-row.justify-content-md-end
                  b-button#delete-button(
                      type="button",
                      size="sm",
                      variant="info",
                      title="Search rules",
                      style="width: 70px; margin-right: 15px;",
                      v-on:click="getRules"
                      ) Go

      br(
        v-show="showSearchForm == true"
        )
      b-row.justify-content-md-center(
        style="text-align:center; background-color:white; border-radius:8px;"
        )
        div.content
          b-table(striped,
            hover,
            v-bind:items="items",
            v-bind:fields="fields"
            style="font-size: 13px")
            template(
              slot="no",
              slot-scope="data") {{ (number * 10) + data.index  + 1 - 10}}
            template(
              slot="options",
              slot-scope="data")
              b-button-group
                b-button#edit-button(
                  type="button",
                  size="sm",
                  v-bind:to="'/rules/create/' + data.item.rule_id",
                  variant="warning",
                  title="Edit rules")
                  v-icon#edit-icon(
                    name="edit-3")
                b-button#delete-button(
                  type="button",
                  size="sm",
                  variant="danger",
                  @click="showModalDelete(data.item.rule_id)",
                  title="Delete rules")
                  v-icon#delete-icon(
                    name="delete")
              br
          b-modal(
            v-model="modalDelete",
            @ok="deleteRule")
              b-alert(variant="danger" show) Anda ingin menghapus rules?
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
  name: 'Rules',
  mounted: function () {
    if (!this.$session.get('user')) {
      this.$router.push({path: '/'})
    }

    this.page = parseInt(1)
    this.getRules()
  },
  data: function () {
    return {
      fields: [
        {
          key: 'no',
          thStyle: 'line-height: 35px;'
        },
        {
          key: 'cm_sub_category',
          label: 'Sub Category',
          thStyle: 'line-height: 35px;'
        },
        {
          key: 'cm_sub_sub_category',
          label: 'Sub Sub Category'
        },
        {
          key: 'logistic',
          thStyle: 'line-height: 35px;'
        },
        'logistic_fulfilment',
        'sending_rule',,
        {
          key: 'created_by',
          thStyle: 'line-height: 35px;'
        },
        {
          key: 'created_at',
          formatter: this.dateFormat,
          thStyle: 'line-height: 35px;'
        },
        {
          key: 'options',
          thStyle: 'line-height: 35px;'
        }
      ],
      items: [],
      number: null,
      page: null,
      paginationLimit: 3,
      paging: {},
      cmSubCategory: [
        {
          id: 1,
          text: 'Keterlambatan Pickup'
        },
        {
          id: 2,
          text: 'Keterlambatan Drop'
        }
      ],
      cmSubSubCategory: [
        {
          id: 1,
          text: 'Drop 1'
        },
        {
          id: 2,
          text: 'Drop 2'
        }
      ],
      logistic: [
        {
          id: 1,
          text: 'JNE'
        },
        {
          id: 2,
          text: 'Pos Indonesia'
        }
      ],
      fullfilment: [
        {
          id: 1,
          text: 'Reguler'
        },
        {
          id: 2,
          text: 'Dropship'
        }
      ],
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
      filterByCMSelected: undefined,
      filterByCMSubCategorySelected: undefined,
      filterByLogisticSelected: undefined,
      filterByFulfillmentSelected: undefined,
      filterBySendingRuleSelected: undefined,
      showSearchForm: false,
      deleteId: '',
      modalDelete: false
    }
  },
  watch: {
    page: function() {
      this.getRules()
    }
  },
  methods: {
    'dateFormat': function (value) {
      return moment(value).format('MM/DD/YYYY HH:mm')
    },
    'getRules': function () {
      let url = '/api/' + auth2.currentUser.get().getBasicProfile().getEmail() + '/rules'

      let options = {
        headers: {
          'Authorization': 'Bearer ' + this.$session.get('user').idToken
        },
        params: {
          'page': this.page,
          'cmSubId': this.filterByCMSelected ? this.filterByCMSelected.id : this.filterByCMSelected,
          'cmSubSubId': this.filterByCMSubCategorySelected ? this.filterByCMSubCategorySelected.id : this.filterByCMSubCategorySelected,
          'logisticId': this.filterByLogisticSelected ? this.filterByLogisticSelected.id : this.filterByLogisticSelected,
          'logisticFulfilmentId': this.filterByFulfillmentSelected ? this.filterByFulfillmentSelected.id : this.filterByFulfillmentSelected,
          'sendingRule': this.filterBySendingRuleSelected ? this.filterBySendingRuleSelected.id : this.filterBySendingRuleSelected
        }
      }

      axios.get(url, options)
        .then(this.onGetRuleSuccess)
        .catch(this.onGetRuleFailure)
    },
    'onGetRuleSuccess': function (response) {
      this.items = []
      this.number = response.data.paging.page

      if (response.data.data) {
        this.items = response.data.data
        this.paging = response.data.paging   
        this.page = this.paging.page

        for (let sr in response.data.data) {
          
          if(response.data.data[sr].cm_sub_sub_category == null){
            this.items[sr].cm_sub_sub_category = '-'
          }

          if(response.data.data[sr].logistic_fulfilment == null){
            this.items[sr].logistic_fulfilment = '-'
          }

          if (response.data.data[sr].sending_rule == 'EVERY_NEW_CM') {
            this.items[sr].sending_rule = 'Every New CM'
          } else if (response.data.data[sr].sending_rule == 'EVERY_DAY') {
            this.items[sr].sending_rule = 'Every Day'
          } else {
            this.items[sr].sending_rule = 'Every Change Status'
          }
        }        
      }
    },
    'onGetRuleFailure': function (error) {
      alert(error)
    },
    'deleteRule': function () {
      let url = '/api/' + auth2.currentUser.get().getBasicProfile().getEmail() + '/rules/' + this.deleteId

      let options = {
        headers: {
          'Authorization': 'Bearer ' + this.$session.get('user').idToken
        }
      }
      axios.delete(url, options)
        .then(this.onDeleteRuleSuccess)
        .catch(this.onDeleteRuleFailure)
    },
    'onDeleteRuleSuccess': function (response) {
      if (response.data.data) {
        alert(response.data.data.message)
        this.deleteId = ''
        this.getRules()
      }
    },
    'onDeleteRuleFailure': function (error) {
      alert(error)
    },
    'showModalDelete': function (id) {
      this.deleteId = id

      this.modalDelete = true
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

#edit-icon, #delete-icon, #add-icon, #detail-icon, #icon-search, #cancel-icon {
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
  /* width: 60%; */
  width: 100%;
}

thead, tbody {
  background-color: white;
  border-radius: 10%;
}

tbody tr:hover {
  background-color: #e8ebef;
}

#search {
  width: 10%;
  height: 38px;
}

thead {
  background-color: #d2deef;
  font-size: 14px;
}

#search-form {
  padding-top: 25px;
  width: 100%;
  background-color: white;
  border-color: white;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12), 0 3px 5px -1px rgba(0, 0, 0, .2);
}

</style>
