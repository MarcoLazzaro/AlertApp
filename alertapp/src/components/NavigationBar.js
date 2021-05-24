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
                <img className = 'logo' src='/favicon.ico' alt='Application Logo' ></img>
                <HiMenu size="3em" onClick={() => this.setState({show: !this.state.show})}></HiMenu>
                <ul className='nav-bar'>
                    <li><a href="#login">Login</a></li>
                    <li><a href="Profile.asp">Profile</a></li>
                </ul>
                {this.state.show && this.props.children}
            </header>
        )
      }
}

export default NavigationBar
