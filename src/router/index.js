import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import RulesCreate from '@/components/rules/rules-create'
import BlastEmailsCreate from '@/components/blast-emails/blast-emails-create'
import BlastEmailsProgress from '@/components/blast-emails/blast-emails-progress'
import Rules from '@/components/rules/rules-index'
import BlastEmails from '@/components/blast-emails/blast-emails-index'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/rules/create',
      name: 'RulesCreate',
      component: RulesCreate
    },
    {
      path: '/blast-emails/create',
      name: 'BlastEmailsCreate',
      component: BlastEmailsCreate
    },
    {
      path: '/rules/create/:ruleId',
      name: 'RulesCreate',
      component: RulesCreate
    },
    {
      path: '/blast-emails/create/:blastEmailId',
      name: 'BlastEmailsCreate',
      component: BlastEmailsCreate
    },
    {
      path: '/blast-emails/progress/:blastEmailId',
      name: 'BlastEmailsProgress',
      component: BlastEmailsProgress
    },
    {
      path: '/rules',
      name: 'Rules',
      component: Rules
    },
    {
      path: '/blast-emails',
      name: 'BlastEmails',
      component: BlastEmails
    }
  ]
})
