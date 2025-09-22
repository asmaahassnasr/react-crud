import type { IProduct } from '../interfaces'
import { Image } from './Image'
import Button from './UI/Button'
import { txtSlicer } from '../utils/fuctions'
import ColorsComponent from './ColorsComponent'
import { memo } from 'react'
interface IProps {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  openEditModal: () => void;
  idx: number;
  setProductToEditIdx: (vlaue: number) => void;
  openRemoveModal: () => void;
}

const ProductCard = ({ product, setProductToEdit, openEditModal,openRemoveModal, idx, setProductToEditIdx }: IProps) => {

  const { description, imageURL, price, title, category, colors } = product;

  const renderColors = colors.map(clr => <ColorsComponent key={clr} color={clr} />)


  const onEdit = () => {
    setProductToEdit(product);
    openEditModal();
    setProductToEditIdx(idx);
  }

  const onRemove = () =>{
    setProductToEdit(product);
    openRemoveModal();
  }
  return (
    <div className=" max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col">

      <Image imageSrc={imageURL} imageAlt="Product image" imageClasses="h-44 rounded-md" />
      <h3 className='text-xl font-medium mt-3'>{title}</h3>
      <p className='text-md mt-3 font-medium'> {txtSlicer(description)} </p>
      <div className="flex flex-wrap items-center space-x-2 my-3 ">
        {renderColors}
      </div>

      <div className="flex justify-between items-center mb-2">
          <span className='font-bold text-indigo-500'>${Number(price).toLocaleString()} </span>
        <div className='flex items-center'> 
          <span className='mx-2 text-xs font-semibold'>{category.name}</span>
          <Image imageSrc={category.imageURL} imageAlt={category.name} imageClasses="w-10 h-10 rounded-full object-center" />
        </div>
      </div>

      <div className="flex justify-between space-x-2 items-center mt-5">
        <Button className='bg-indigo-700' onClick={onEdit}>Edit</Button>
        <Button className='bg-red-700' onClick={onRemove}>delete</Button>
      </div>
    </div>
  )
}

export default memo(ProductCard);