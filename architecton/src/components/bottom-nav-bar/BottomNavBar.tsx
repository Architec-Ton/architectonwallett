import React from 'react';
import { NavLink } from 'react-router-dom';
import './BottomNavBar.styles.css';

import walletIcon from '../../assets/icon-Wallet-nawbar.svg';
import appsIcon from '../../assets/icon-Apps-nawbar.svg';
import swapIcon from '../../assets/icon-Swap-nawbar.svg';
import stocksIcon from '../../assets/icon-Stocks-nawbar.svg';

interface NavItem {
    to: string;
    icon: string;
    label: string;
}

const navItems: NavItem[] = [
    { to: '/', icon: walletIcon, label: 'Wallet' },
    { to: '/apps', icon: appsIcon, label: 'Apps' },
    { to: '/swap', icon: swapIcon, label: 'Swap' },
    { to: '/stocks', icon: stocksIcon, label: 'Stocks' },
];

const BottomNavBar: React.FC = () => {
    return (
        <nav className="bottom-nav-bar">
            {navItems.map((item) => (
                <NavLink to={item.to} key={item.to} /*activeCaassName='active'*/>
                    <img src={item.icon} className="icon" alt={item.label} aria-label={item.label} />
                </NavLink>
            ))}
        </nav>
    );
};

export default BottomNavBar;

