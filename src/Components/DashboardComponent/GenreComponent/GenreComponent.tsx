import { Dispatch, lazy, SetStateAction, useCallback, useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { ConvertImage } from '../../../Services/ConvertFile';
import styles from './GenreComponent.module.css';
const ThumbnailGenre = lazy(() => import("../../../SharedComponents/ThumbnailGenreComponent/ThumbnailGenreComponent"));

enum EnumDisplayComponent{
    containerCrud,
    addGenre,
}

function WhatToDisplay(state:EnumDisplayComponent, setState:Dispatch<SetStateAction<EnumDisplayComponent>>){
    if(state === EnumDisplayComponent.containerCrud) return <ContainerCrud setState={setState} ></ContainerCrud>

    if(state === EnumDisplayComponent.addGenre) return (
        <ContainerSelected setState={setState}>
            <FormAddGenre></FormAddGenre>
        </ContainerSelected>
    );
}

export default function GenreComponent():JSX.Element{
    const [displayComponent, setDisplayComponent] = useState(EnumDisplayComponent.containerCrud)
    return(
        <>
            {WhatToDisplay(displayComponent, setDisplayComponent)}
        </>
    )
}


/******************************************/


function ContainerCrud(props:{setState:Dispatch<SetStateAction<EnumDisplayComponent>>}):JSX.Element{
    let divElement = useRef<HTMLDivElement>();
    const callbackDiv = useCallback((node:HTMLDivElement) => {
        if(node){
            divElement.current = node;
            node.classList.remove(styles.hideElement);
            setTimeout(() => {
                node.classList.remove(styles.translateToTheLeft);
            }, 1);
        }
    },[]);
    

    const callbackHide = () => {
        if(divElement){
            divElement.current?.classList.add(styles.translateToTheLeft);
            setTimeout(() => {
                divElement.current?.classList.add(styles.hideElement);
                props.setState(EnumDisplayComponent.addGenre)
            }, 100);
        }
    }

    return(
        <div className={styles.containerSelection + " " + styles.hideElement + " " + styles.translateToTheLeft + " " + styles.getAnimation} ref={callbackDiv}>
            <CrudThumbNail icon={'new_label'} title={'AJOUTER UN NOUVEAU GENRE'} onClick={callbackHide}></CrudThumbNail>
            <CrudThumbNail icon={''} title={''} onClick={callbackHide}></CrudThumbNail>
            <CrudThumbNail icon={''} title={''} onClick={callbackHide}></CrudThumbNail>
            <CrudThumbNail icon={''} title={''} onClick={callbackHide}></CrudThumbNail>
        </div>
    )
}


/********************************************************/


function CrudThumbNail(props:{icon:string, title:string, onClick:() => void}):JSX.Element{
    return(
        <div className={styles.crudThumbnail} onClick={() => {props.onClick()}} >
            <span className="material-icons ">{props.icon}</span>
            {props.title}
        </div>
    )
}


/**************************** */


function ContainerSelected(props:{setState:Dispatch<SetStateAction<EnumDisplayComponent>>, children:JSX.Element}):JSX.Element{
    let divElement = useRef<HTMLDivElement>();
    const callbackDiv = useCallback((node:HTMLDivElement) => {
        if(node){
            divElement.current = node;
            node.classList.remove(styles.hideElement);
            setTimeout(() => {
                node.classList.remove(styles.translateToTheLeft);
            }, 1);
        }
    },[]);

    const goBack = () => {
        if(divElement){
            divElement.current?.classList.add(styles.translateToTheLeft);
            setTimeout(() => {
                divElement.current?.classList.add(styles.hideElement);
                props.setState(EnumDisplayComponent.containerCrud)
            }, 100);
        }
    }
    return(
        <div ref={callbackDiv} className={styles.hideElement + " " + styles.translateToTheLeft + " " + styles.getAnimation}>
            <button onClick={() => {goBack()}} className={styles.buttonBack}><span className={"material-icons " + styles.arrow}>arrow_back</span>RETOUR</button>
            {props.children}
        </div>
    )
}


/************************************/
interface FileDetails{
    fileName:string;
    base64:string;
}
function FormAddGenre():JSX.Element{
    const[toggleColor, setToggleColor] = useState(false)
    const [color, setColor] = useState("#aabbcc");
    const [file, setFile] = useState<FileDetails>();

    const[title, setTitle] = useState<string>();
    const[description, setDescription] = useState<string>();

    const handleFileUpload = async (files:FileList | null) => {
        if(files){
            let base64OfImg = await ConvertImage.ToBase64(files[0]) as string;
            console.log(base64OfImg)
            setFile({fileName : files[0].name, base64 : base64OfImg})
        }
    }

    return(
        <div className={styles.formContainer}>
            <div>
                <h2>AJOUTER UN GENRE</h2>
            </div>
            <form className={styles.form}>

                <div>
                    <label htmlFor="formAddGenreTitle">TITRE DU GENRE</label>
                    <input value={title} onChange={(e) => {setTitle(e.target.value)}} type="text" id='formAddGenreTitle'/>
                </div>
                
                <div>
                    <label htmlFor="formAddGenreDescription">DESCRIPTION DU GENRE</label>
                    <textarea value={description} onChange={(e) => {setDescription(e.target.value)}} id="formAddGenreDescription"></textarea>
                </div>

                <div className={styles.chooseColor}>
                    <div>
                        <label className={styles.chooseColor} htmlFor="formAddGenreColor" onClick={() => {setToggleColor(!toggleColor)}}>COULEUR DU GENRE 
                            <span className={"material-icons "}>palette</span>
                            <div style={{backgroundColor:color}}></div>
                        </label>
                    </div>
                    {toggleColor && <HexColorPicker className={styles.colorPicker} color={color} onChange={setColor} />}
                </div>

                <div className={styles.inputFile}>
                    <label htmlFor="formAddGenreFile">IMAGE DU GENRE
                        <div>
                            <span className={"material-icons " + styles.uploadIcon}>cloud_upload</span>
                        </div>
                    </label>
                    {file && 
                        <div>
                            <img src={file.base64} alt="" />
                        </div>
                    }
                    <input type="file" id='formAddGenreFile' accept="image/png, image/jpeg" onChange={(e) => {handleFileUpload(e.target.files)}} />
                </div>
                <div>
                    <button disabled={false}><span className={"material-icons "}>publish</span>PUBLIER</button>
                </div>
                <ThumbnailGenre backgroundColor={color} image={file?.base64} title={title} description={description}></ThumbnailGenre>
            </form>
        </div>
    )
}
