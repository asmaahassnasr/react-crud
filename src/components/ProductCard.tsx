import type { IProduct } from '../interfaces'
import { Image } from './Image'
import Button from './UI/Button'

interface IProps {
  product: IProduct
}

export const ProductCard = ({ product }: IProps) => {

  const { description, imageURL, price, title } = product;

  return (
    <div className="border rounded-md p-2 flex flex-col">
      
      <Image imageSrc={imageURL} imageAlt="Product Name" imageClasses="rounded-md" />
      <h3>{title}</h3>
      <p> {description} </p>
      <div className="flex items-center space-x-2 my-2">
        <span className="w-5 h-5 bg-red-400 rounded-full cursor-pointer" />
        <span className="w-5 h-5 bg-yellow-900 rounded-full cursor-pointer" />
        <span className="w-5 h-5 bg-blue-400 rounded-full cursor-pointer" />
      </div>

      <div className="flex justify-between items-center mb-2">
        <span>${price}</span>
        <Image imageSrc={imageURL} imageAlt="Product Name" imageClasses="w-10 h-10 rounded-full object-center" />
      </div>

      <div className="flex justify-between space-x-2 items-center mt-5">
        <Button className='bg-indigo-700' >Edit</Button>
        <Button className='bg-red-700' >delete</Button>
      </div>
    </div>
  )
}
