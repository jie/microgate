const Settings = {
  cookie: {
    name: 'microgate',
    expiredays: 7,
    path: '/'
  },
  pages: {
    login: '/portal/account/login',
    index: '/portal/admin/dashboard',
    api: {
      create: '/portal/admin/apis/create',
      view: '/portal/admin/apis/view'
    },
    services: {
      create: '/portal/admin/services/create',
      view: '/portal/admin/services/view'
    }
  },
  api: {
    logout: '/portal/rest/account/logout',
    login: '/portal/rest/account/login',
    apis: {
      view: '/portal/rest/apis/view',
      list: '/portal/rest/apis/query'
    },
    services: {
      view: '/portal/rest/services/view',
      list: '/portal/rest/services/query'
    }
  }
}

export default Settings;
