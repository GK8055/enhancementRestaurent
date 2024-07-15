import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRouter = props => {
  const cookies = Cookies.get('jwt_token')
  console.log(cookies)
  if (cookies === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRouter
