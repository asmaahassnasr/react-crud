import { useCallback, useState, type ChangeEvent, type FormEvent } from "react"
import  ProductCard  from "./components/ProductCard"
import Modal from "./components/UI/Modal"
import { categories, colors, formInputsList, productList } from "./data"
import Button from "./components/UI/Button"
import Input from "./components/UI/Input"
import type { IProduct } from "./interfaces"
import { productValidation } from "./validations"
import ErrorsMsg from "./components/ErrorsMsg"
import ColorsComponent from "./components/ColorsComponent"
import { v4 as uuid } from "uuid";
import Select from "./components/UI/Select"
import type { ProductNameTypes } from "./types"
import toast, { Toaster } from "react-hot-toast"

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


  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [isOpenRemoveModal, setIsOpenRemoveModal] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [products, setProducts] = useState<IProduct[]>(productList)
  const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProductObj)
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0)
  const [product, setProduct] = useState<IProduct>(defaultProductObj)
  const [errors, setErrors] = useState({
    title: "",
    price: "",
    imageURL: "",
    description: ""
  })
  const [tempColors, setTempColors] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState(categories[1])

  

  const toastMsg = (msg:string) =>{
    toast.success(msg,{
    icon: '👏',
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  })
  }

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  const openEditModal = useCallback(() => setIsOpenEditModal(true), [])
  const closeEditModal = () => setIsOpenEditModal(false)

  const openRemoveModal = useCallback(() => setIsOpenRemoveModal(true), [])
  const closeRemoveModal = () => setIsOpenRemoveModal(false)

  const onChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setProduct({
      ...product,
      [name]: value
    })

    setErrors({
      ...errors,
      [name]: ""
    })
  }

  const onChangeEditHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value
    })

    setErrors({
      ...errors,
      [name]: ""
    })
  }

  const cancelHandler = () => {
    setProduct(defaultProductObj);
    close();
  }
  const cancelEditHandler = () => {
    closeEditModal();
  }

  const cancelRemoveHandler = () => {
    closeRemoveModal();
  }

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {

    event.preventDefault();

    const { title, description, imageURL, price } = product
    const errs = productValidation({ title, description, imageURL, price })

    const hasErrorMsg = Object.values(errs).some(val => val === "") && Object.values(errs).every(val => val === "");

    if (!hasErrorMsg) {
      setErrors(errs);
      return;
    }

    setProducts(prev => [{ ...product, id: uuid(), colors: tempColors, category: selectedCategory }, ...prev]);
    setProduct(defaultProductObj);
    setTempColors([]);
    close();
    toastMsg("Successfully Added New Product");

  }

  const submitEditHandler = (event: FormEvent<HTMLFormElement>): void => {

    event.preventDefault();

    const { title, description, imageURL, price } = productToEdit
    const errs = productValidation({ title, description, imageURL, price })

    const hasErrorMsg = Object.values(errs).some(val => val === "") && Object.values(errs).every(val => val === "");

    if (!hasErrorMsg) {
      setErrors(errs);
      return;
    }

    const updatedProducts = [...products];
    updatedProducts[productToEditIdx] = { ...productToEdit, colors: tempColors.concat(productToEdit.colors) };
    setProducts(updatedProducts);

    setProductToEdit(defaultProductObj);
    setTempColors([]);
    closeEditModal();
    toastMsg("Successfully Updated")

  }

  const submitRemoveProduct = () => {
    const filtered = products.filter(prod => prod.id !== productToEdit.id)
    setProducts(filtered);
    closeRemoveModal();
    toastMsg("Successfully Deleted ");
    
  }

  const renderedProductList = products.map((prod, idx) => <ProductCard
    key={prod.id}
    product={prod}
    setProductToEdit={setProductToEdit}
    idx={idx}
    setProductToEditIdx={setProductToEditIdx}
    openEditModal={openEditModal}
    openRemoveModal={openRemoveModal}
  />)

  const renderFormInputsList = formInputsList.map(ele =>
    <div className="flex flex-col" key={ele.id}>
      <label className="mb-2 font-medium text-sm text-gray-700" htmlFor={ele.id}>{ele.label}</label>
      <Input type={ele.type} name={ele.name} id={ele.id} value={product[ele.name]} onChange={onChangeHandler} />
      <ErrorsMsg msg={errors[ele.name]}></ErrorsMsg>
    </div>
  )


  const renderEditableProductWithErrorsMsg = (id: string, name: ProductNameTypes, label: string) => {
    return (
      <div className="flex flex-col">
        <label className="mb-2 font-medium text-md text-gray-700" htmlFor={id}>{label}</label>
        <Input type="text" name={name} id={id} value={productToEdit[name]} onChange={onChangeEditHandler} />
        <ErrorsMsg msg={errors[name]}></ErrorsMsg>
      </div>
    )
  }

  const renderColors = colors.map(clr => <ColorsComponent key={clr} color={clr} onClick={() => {
    if (tempColors.includes(clr)) {
      setTempColors(prev => prev.filter(item => item !== clr));
      return;
    }
    if (productToEdit.colors.includes(clr)) {
      setTempColors(prev => prev.filter(item => item !== clr));
      return;
    }

    setTempColors((prev) => [...prev, clr])

  }} />)

  return (
    <>
      <main className="container mx-auto">

        <Button className="bg-indigo-700 hover:bg-indigo-800 block mx-auto p-5 my-10 font-medium" width={"w-fit"} onClick={open}>Build Product</Button>

        <div className="m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2">
          {renderedProductList}
        </div>

        {/* -------------------- ADD PRODUCT MODAL ------------------------------------- */}
        <Modal isOpen={isOpen} title="Add New Product" closeModal={close}>
          <form className="space-y-3" onSubmit={submitHandler}>
            {renderFormInputsList}
            <Select selected={selectedCategory} setSelected={setSelectedCategory} />
            <div className="flex flex-wrap items-center space-x-2 mt-5 ">
              {renderColors}
            </div>
            <div className="flex flex-wrap items-center space-x-2 my-2 ">
              {tempColors.map(clr =>
                <span key={clr} style={{ background: clr }} className="mr-1 p-1 mb-1 text-xs rounded-md text-white">{clr}</span>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <Button className="bg-indigo-700 hover:bg-indigo-800">Submit</Button>
              <Button className="bg-gray-200 hover:bg-gray-300 !text-black" onClick={cancelHandler}>Close</Button>
            </div>
          </form>
        </Modal>

        {/* -------------------- EDIT PRODUCT MODAL ------------------------------------- */}
        <Modal isOpen={isOpenEditModal} title="EDIT PRODUCTS" closeModal={closeEditModal}>
          <form className="space-y-3" onSubmit={submitEditHandler}>
            {renderEditableProductWithErrorsMsg("title", "title", "Product Title ")}
            {renderEditableProductWithErrorsMsg("description", "description", "Product Description ")}
            {renderEditableProductWithErrorsMsg("imageURL", "imageURL", "Product Image URL ")}
            {renderEditableProductWithErrorsMsg("price", "price", "Product Price ")}

            <Select selected={productToEdit.category} setSelected={(value) => setProductToEdit({ ...productToEdit, category: value })} />

            <div className="flex flex-wrap items-center space-x-2 mt-5 ">
              {renderColors}
            </div>
            <div className="flex flex-wrap items-center space-x-2 my-2 ">
              {tempColors.concat(productToEdit.colors).map(clr =>
                <span key={clr} style={{ background: clr }} className="mr-1 p-1 mb-1 text-xs rounded-md text-white">{clr}</span>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <Button className="bg-indigo-700 hover:bg-indigo-800">Submit</Button>
              <Button className="bg-gray-200 hover:bg-gray-300 !text-black" onClick={cancelEditHandler}>Close</Button>
            </div>
          </form>
        </Modal>

        {/* ----------------------------------- Remove PRoduct Modal  */}
        <Modal
          isOpen={isOpenRemoveModal}
          title="Are you sure to remove this product from your store ?"
          description="Deleting this product will remove it permentaly from your inventory, an associated data, sales history, and other related data will also be deleted. Please make sure this is the intended action"
          closeModal={closeRemoveModal}
        >
          <div className="flex items-center space-x-3">
            <Button className="bg-red-800 hover:bg-red-900" onClick={submitRemoveProduct}>Yes, Remove</Button>
            <Button className="bg-gray-200 hover:bg-gray-300 !text-black" onClick={cancelRemoveHandler}>Cancel</Button>
          </div>
        </Modal>

        <Toaster position="bottom-right" reverseOrder={false}/>
      </main>
    </>
  )
}

export default App
