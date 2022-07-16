import { ReactElement } from 'react';
import styles from './Layout.module.css';
import {NavBar} from '../NavBar';

type Props = {
    children: ReactElement;
}

export const Layout = ({ children }: Props) => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Site</h1>
            </header>
            <NavBar />
            <main>{children}</main>
            <footer className={styles.footer}>
                All rights reserved
            </footer>
        </div>
    );
}