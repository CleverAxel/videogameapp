import { useRef } from 'react';
import styles from './AccordionComponent.module.css';

/**
 * @param props Button = Bouton sur lequel cliquer, Content = Le contenu à dévoiler quand l'on clique sur le bouton
 * className = la class a attribué à l'accordéon
 */
export default function Accordion(props:IPropsAccordion):JSX.Element{
    const content = useRef<HTMLDivElement>(null);

    const toggleContent = () => {
        if(content.current?.style.maxHeight){
            content.current.style.maxHeight = "";
        }else{
            if(content.current){
                content.current.style.maxHeight = content.current.scrollHeight + "px";
            }
        }
    }

    return(
        <div className={props.className}>
            <div onClick={() => {toggleContent()}}>
                {props.button}
            </div>

            <div ref={content} className={styles.content}>
                {props.content}
            </div>
        </div>
    );
}


interface IPropsAccordion{
    className?:string;
    button:JSX.Element;
    content:JSX.Element;
    children?:any;
}