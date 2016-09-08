import MainApp from './admin'
import { ApiCreateApp, ApisListApp } from './apis'
import { ServicesApp, ServicesCreateApp } from './services'
import DashboardApp from './dashboard'
import { ApplicationsApp, ApplicationsCreateApp } from './applications'
import { UsersApp, UsersCreateApp } from './users'


module.exports = {
  MainApp: MainApp,
  ApiCreateApp: ApiCreateApp,
  ApisListApp: ApisListApp,
  ServicesApp: ServicesApp,
  ServicesCreateApp: ServicesCreateApp,
  DashboardApp: DashboardApp,
  ApplicationsApp: ApplicationsApp,
  ApplicationsCreateApp: ApplicationsCreateApp,
  UsersApp: UsersApp,
  UsersCreateApp: UsersCreateApp
}
