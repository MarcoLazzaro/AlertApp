import React, {Component} from 'react';
import {HiMenu} from "react-icons/hi"

class NavigationBar extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          show: false
        };
      }

      render(){
        return (
            <header className='nav-header'>
                <HiMenu size="3em" onClick={() => this.setState({show: !this.state.show})}></HiMenu>
                {this.state.show && this.props.children}
                <div className='logo-name'>
                  <img className = 'logo' src='/favicon.ico' alt='Application Logo' ></img>
                  <span>AlertAPP</span>
                </div>
            </header>
        )
      }
}

export default NavigationBar


/* Login section if needed
<ul className='nav-bar'>
                    <li><a href="#login">Login</a></li>
                    <li><a href="Profile.asp">Profile</a></li>
                </ul>
*/