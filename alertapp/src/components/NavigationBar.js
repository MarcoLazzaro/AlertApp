import React from 'react'

function NavigationBar() {
    return (
        <header className='nav-header'>
            <img className = 'logo' src='/favicon.ico' alt='Application Logo'></img>
            <ul className='nav-bar'>
                <li><a href="Login.asp">Login</a></li>
                <li><a href="Profile.asp">Profile</a></li>
            </ul>
        </header>
    )
}

export default NavigationBar
