import Vue from 'vue'
import Router from 'vue-router'

const login = resolve => require(['../views/login'], resolve)
const home = resolve => require(['../views/home'], resolve)
const navMenu = resolve => require(['../components/navMenu'], resolve)
const mainPage = resolve => require(['../views/mainPage'], resolve)
const announcement = resolve => require(['../views/teacher/announcementManagement/announcement'], resolve)
const graduationManagement= resolve => require(['../views/teacher/graduationManagement/graduationManagement'], resolve)
const graduation = resolve => require(['../views/teacher/documentManagement/graduation'], resolve)
const openingReport = resolve => require(['../views/teacher/documentManagement/openingReport'], resolve)
const subject = resolve => require(['../views/teacher/subjectManagement/subject'], resolve)
const selectedTopic= resolve => require(['../views/teacher/subjectManagement/selectedTopic'], resolve)
Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'login',
		component: login
	}, {
		path: '/home',
		name: 'home',
		component: home,
		children: [{
			path: '/home/navMenu',
			component: navMenu
		},{
			path: '/home/mainPage',
			component: mainPage
		},{
			path: '/home/announcement',
			component: announcement
		},{
			path: '/home/graduationManagement',
			component: graduationManagement
		},{
			path: '/home/selectedTopic',
			component: selectedTopic
		},{
			path: '/home/subject',
			component: subject
		},{
			path: '/home/graduation',
			component: graduation
		},{
			path: '/home/openingReport',
			component: openingReport
		}]
	}]
})