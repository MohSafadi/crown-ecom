import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../components/contexts/user.context';
import { CartContext } from '../../components/contexts/cart.context';


import { signOutUser } from '../../utils/firebase/firebase.utils';

import './navigation.styles.scss';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

const Navigation = () => {
  //we are getting the user data from the context component
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  //We need to make this function to first sign out the user and connect that state of signed out to our context component too
  // this way we update our state of "user" both in the database and in the actual saved code in context "currentUser"
  // const signOutHandler = async () => {
  //   await signOutUser();
  //   setCurrentUser(null);
  // }
  //Edit: We are able to let go of this code because now we are tracking user in "user.context"
  //That code listens for both sign in and out states and also sets the current user to either "user" or "null"
  //So we can now directly use the Firebase function "signOutUser" as the onClick listener.


  return (
    <Fragment>
      <div className='navigation'>

        <Link className='logo-container' to='/'>
          <CrwnLogo className='logo' />
        </Link>

        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>
          {currentUser ? (<span className='nav-link' onClick={signOutUser}>SIGN OUT</span>) : (<Link className='nav-link' to='/auth'>
            SIGN IN
          </Link>)}

          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
