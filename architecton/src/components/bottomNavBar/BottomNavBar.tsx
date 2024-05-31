import React from 'react';
import { NavLink } from 'react-router-dom';
import './BottomNavBar.styles.css';

// @ts-ignore
import { ReactComponent as WalletIcon } from './path/bottombar_wallet.svg';
// @ts-ignore
import { ReactComponent as AppsIcon } from '../../assets/bottombar_apps.svg';
// @ts-ignore
import { ReactComponent as SwapIcon } from '../../assets/bottombar_swap.svg';
// @ts-ignore
import { ReactComponent as StocksIcon } from '../../assets/bottombar_stocks.svg';

interface NavItem {
    to: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    label: string;
}

const navItems : NavItem[] = [
    { to: '/', icon: WalletIcon, label: 'Wallet' },
    { to: '/projects', icon: AppsIcon, label: 'Apps' },
    { to: '/swap', icon: SwapIcon, label: 'Swap' },
    { to: '/stocks', icon: StocksIcon, label: 'Stocks' },
];

const BottomNavBar: React.FC = () => {
    return (
        <nav className="bottom-nav-bar">
            {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                    <NavLink to={item.to} key={item.to} >
                        <IconComponent className={'icon'} aria-label={item.label} />
                    </NavLink>
                );
            })}
        </nav>
    );
};

export default BottomNavBar;

