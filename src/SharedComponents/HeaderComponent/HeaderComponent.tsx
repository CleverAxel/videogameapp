import nescontroller from '../../assets/images/nescontroller.png';
import styles from './HeaderComponent.module.css';

export default function Header():JSX.Element{
    return(
      <header className={styles.header}> 
        <div>
  
          <div className={styles.titleWDescription}>
            <h1>VIDEOGAME.API</h1>
            <p>Une API test réalisée en .NET Core</p>
          </div>
  
          <div className={styles.containerImg}>
            <img src={nescontroller} alt="" />
          </div>
        </div>
      </header>
    )
  }