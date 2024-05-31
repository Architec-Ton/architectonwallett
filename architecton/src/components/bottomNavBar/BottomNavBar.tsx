import React from 'react';
import { NavLink } from 'react-router-dom';
import './BottomNavBar.css';
import { ReactComponent as WalletIcon } from '../../assets/';
import { ReactComponent as AppsIcon } from '../../assets/';
import { ReactComponent as SwapIcon } from '../../assets/';
import { ReactComponent as StocksIcon } from '../../assets/';

const navItems = [
    { to: '/', icon: WalletIcon, label: 'Wallet' },
    { to: '/', icon: AppsIcon, label: 'Apps' },
    { to: '/', icon: SwapIcon, label: 'Swap' },
    { to: '/', icon: StocksIcon, label: 'Stocks' },
];

const BottomNavBar: React.FC = () => {
    return (
        <nav className="bottom-nav-bar">
            {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                    <NavLink to={item.to}  key={item.to}>
                        <IconComponent className="icon" aria-label={item.label} />
                    </NavLink>
                );
            })}
        </nav>
    );
};

export default BottomNavBar;

