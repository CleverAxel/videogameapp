import styles from './ThumbnailGenreComponent.module.css';
interface IPropsThumbnailGenre{
    backgroundColor:string;
    title?:string;
    description?:string
    image?:string;
}
export default function ThumbnailGenre({backgroundColor, title = "Pas de titre", description ="Aucune description", image}:IPropsThumbnailGenre):JSX.Element{
    return(
        <div className={styles.thumbnailContainer} style={{backgroundColor : backgroundColor}}>
            <div className={styles.imgContainer}>
                {image && <img src={image} alt="genre" />}
            </div>
            <div className={styles.descriptionContainer}>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    )
}