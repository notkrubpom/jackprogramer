import './apps/user-list'
import './jwt'
import mock from './mock'
import './pages/faq'
import './pages/help-center'

// Apps
import './apps/invoice'

// Dashboard
import './dashboard/analytics'

// forwards the matched request over network
mock.onAny().passThrough()
