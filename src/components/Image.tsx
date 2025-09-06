
interface IProps {
    imageSrc: string;
    imageAlt: string;
    imageClasses: string;
}

export const Image = ({ imageSrc, imageAlt, imageClasses }: IProps) => {
    return (
        <img src={imageSrc} alt={imageAlt} className={imageClasses} />
    )
}
