const Settings = {
  cookie: {
    name: 'microgate',
    expiredays: 7,
    path: '/'
  },
  pages: {
    login: '/portal/account/login',
    index: '/portal/admin/dashboard'
  },
  apis: {
    logout: '/portal/rest/account/logout',
    login: '/portal/rest/account/login'
  }
}

export default Settings;
