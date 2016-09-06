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
      view: '/portal/admin/apis/create'
    }
  },
  apis: {
    logout: '/portal/rest/account/logout',
    login: '/portal/rest/account/login',
    view: '/portal/rest/apis/view'
  }
}

export default Settings;
