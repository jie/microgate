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
    },
    applications: {
      create: '/portal/admin/applications/create',
      view: '/portal/admin/applications/view'
    }
  },
  api: {
    logout: '/portal/rest/account/logout',
    login: '/portal/rest/account/login',
    apis: {
      view: '/portal/rest/apis/view',
      list: '/portal/rest/apis/query',
      create: '/portal/rest/apis/create'
    },
    services: {
      view: '/portal/rest/services/view',
      list: '/portal/rest/services/query',
      create: '/portal/rest/services/create'
    },
    applications: {
      view: '/portal/rest/applications/view',
      list: '/portal/rest/applications/query',
      create: '/portal/rest/applications/create',
      generateKey: '/portal/rest/applications/generate/key'
    },
    users: {
      view: '/portal/rest/users/view',
      list: '/portal/rest/users/query',
      create: '/portal/rest/users/create'
    },
  }
}

export default Settings;
