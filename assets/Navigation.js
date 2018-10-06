import { createSwitchNavigator } from 'react-navigation';
import Login from './Login'
import Signup from './Signup'

export default createSwitchNavigator ({
    Login: Login,
    Signup: Signup,
});