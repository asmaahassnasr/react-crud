import { useState, type ChangeEvent, type FormEvent } from "react"
import { ProductCard } from "./components/ProductCard"
import Modal from "./components/UI/Modal"
import { formInputsList, productList } from "./data"
import Button from "./components/UI/Button"
import Input from "./components/UI/Input"
import type { IProduct } from "./interfaces"
import { productValidation } from "./validations"
import ErrorsMsg from "./components/ErrorsMsg"

function App() {

  const defaultProductObj = {
    title: "",
    price: "",
    imageURL: "",
    description: "",
    colors: [],
    category: {
      name: "",
      imageURL: ""
    }
  }


  const [isOpen, setIsOpen] = useState(false)
  const [product, setProduct] = useState<IProduct>(defaultProductObj)
  const [errors, setErrors] = useState({
    title: "",
    price: "",
    imageURL: "",
    description: ""
  })



  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  const onChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setProduct({
      ...product,
      [name]: value
    })
    
    setErrors({
      ...errors,
      [name]:""
    })
  }

  const cancelHandler = () => {
    setProduct(defaultProductObj);
    close();
  }

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {

    event.preventDefault();

    const { title, description, imageURL, price } = product
    const errs = productValidation({ title, description, imageURL, price })

    const hasErrorMsg = Object.values(errs).some(val => val === "") && Object.values(errs).every(val => val === "");

    if (!hasErrorMsg){
      setErrors(errs);
      return;
    }
      
    console.log("Will be Submitted");

  }

  const renderedProductList = productList.map(prod => <ProductCard key={prod.id} product={prod} />)

  const renderFormInputsList = formInputsList.map(ele =>
    <div className="flex flex-col" key={ele.id}>
      <label className="mb-2 font-medium text-sm text-gray-700" htmlFor={ele.id}>{ele.label}</label>
      <Input type={ele.type} name={ele.name} id={ele.id} value={product[ele.name]} onChange={onChangeHandler} />
      <ErrorsMsg msg={errors[ele.name]}></ErrorsMsg>
    </div>
  )

  return (
    <>
      <main className="container mx-auto">

        <Button className="bg-indigo-700 hover:bg-indigo-800" onClick={open}>Add Product</Button>

        <div className="m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2">
          {renderedProductList}
        </div>

        <Modal isOpen={isOpen} title="Add New Product" closeModal={close}>
          <form className="space-y-3" onSubmit={submitHandler}>
            {renderFormInputsList}
            <div className="flex items-center space-x-3">
              <Button className="bg-indigo-700 hover:bg-indigo-800">Submit</Button>
              <Button className="bg-gray-500 hover:bg-gray-600" onClick={cancelHandler}>Close</Button>
            </div>
          </form>
        </Modal>
      </main>
    </>
  )
}

export default App
