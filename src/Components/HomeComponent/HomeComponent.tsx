import Accordion from '../../SharedComponents/AccordionComponent/AccordionComponent';
import styles from './HomeComponent.module.css';
import { useState } from 'react';

import spaceinvaders from '../../assets/images/spaceinvaders.png';
import patrick from '../../assets/images/wip.gif';
import genreLogo from '../../assets/images/genreLogo.png';

export default function Home():JSX.Element{
    return(
        <main className={styles.main}>
            <div>
                <div className={styles.containerSection}>
                    <section>
                        <Accordion 
                            button={<ButtonAccordion titleButton={"Qu'est-ce que VideogameAPI ?"}></ButtonAccordion>} 
                            content={<ContentAccordion content={<WhatIsVideogameAPI></WhatIsVideogameAPI>}></ContentAccordion>}>
                        </Accordion>
                        <Accordion 
                            button={<ButtonAccordion titleButton={"C'est quoi le but (。_。) ?"}></ButtonAccordion>} 
                            content={<ContentAccordion content={<Blagounette></Blagounette>}></ContentAccordion>}>
                        </Accordion>
                    </section>
                    <section>
                        <div className={styles.imgSpaceInvaders}>
                            <img src={spaceinvaders} alt="spaceinvaders" />
                        </div>
                    </section>
                </div>

                <div className={styles.containerLink}>
                    <LinkToTopic></LinkToTopic>
                </div>

            </div>
        </main>
    )
}

//#region ACCORDION
function ButtonAccordion(props:{titleButton:string}):JSX.Element{
    const [directArrow, setDirectArrow] = useState("arrowDown");

    const ChangeDirectionArrow = () =>{
        if(directArrow === "arrowDown"){
            setDirectArrow("arrowUp");
        }else{
            setDirectArrow("arrowDown")
        }
    }
    return (
        <button className={styles.buttonAccordion} onClick={() => ChangeDirectionArrow()}>
            {props.titleButton}
            <span className={"material-icons " + styles[directArrow]}>expand_more</span>
        </button>
    )
}

function ContentAccordion(props:{content:JSX.Element}):JSX.Element{
    return(
        <div className={styles.contentAccordion}>
            {props.content}
        </div>
    )
}

function WhatIsVideogameAPI():JSX.Element{
    return(
        <div className={styles.paragraphe}>
            <p>Videogame.API est juste un petit projet personnel alliant deux technologies.</p>
            <ul>
                <li>La première étant React, qui me permet de faire (je l'espère), un joli truc.</li>
                <li>La seconde étant .NET Core pour la partie back-end pour enregistrer des informations, les modifier, les afficher, etc..</li>
            </ul>
        </div>
    )
}

function Blagounette():JSX.Element{
    return(
        <img src={patrick} alt="no this is patrick" />
    )
}
//#endregion

function LinkToTopic():JSX.Element{
    return(
        <div className={styles.link}>
            <div className={styles.imgContainer}>
                <img src={genreLogo} alt="logo genre" />
            </div>
            <div>
                <h3>Découvrez les différents genres.</h3>
                <p>
                    Un genre de jeu vidéo désigne un ensemble de jeux vidéo caractérisés par un gameplay similaire. 
                    L'absence de consensus sur la normalisation des critères qui les définissent se traduit parfois 
                    par une incohérence au niveau de la classification des jeux.
                </p>
                <p>Et cela selon Wikipédia. Faisons confiance à Wikipédia.</p>
            </div>
        </div>
    )
}