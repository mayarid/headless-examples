import classes from './MainNavigation.module.css';
import Link from 'next/link'

function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>NextJS Shops</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>Produk</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
