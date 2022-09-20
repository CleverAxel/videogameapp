import React, { lazy } from 'react';
import styles from './DashboardComponent.module.css';

const GenreComponent = lazy(() => import("./GenreComponent/GenreComponent"));

export default function Dashboard():JSX.Element{
    return(
        <main className={styles.main} >
            <div>
                <Sidebar></Sidebar>

                <section>
                    <GenreComponent></GenreComponent>
                </section>
                
            </div>
        </main>
    )
}


function Sidebar(){
    return(
        <nav className={styles.nav}>
            <button> <span className="material-icons ">label</span> GENRE</button>
        </nav>
    )
}