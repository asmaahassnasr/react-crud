import type {HTMLAttributes} from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement>{
    color:string;
}
const ColorsComponent = ({color , ...rest}: IProps) => {
  return (
        <span className="block w-5 h-5 rounded-full cursor-pointer mb-3" {...rest} style={{backgroundColor:color}}/>
  )
}

export default ColorsComponent