import { useState } from "react"
import { ProductCard } from "./components/ProductCard"
import Modal from "./components/UI/Modal"
import { productList } from "./data"
import Button from "./components/UI/Button"

function App() {

  let [isOpen, setIsOpen] = useState(false)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }


  const renderedProductList = productList.map(prod => <ProductCard key={prod.id} product={prod} />)
  return (
    <>
      <main className="container mx-auto">

        <Button className="bg-indigo-700 hover:bg-indigo-800" onClick={open}>Add Product</Button>

        <div className="m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2">
          {renderedProductList}
        </div>

        <Modal isOpen={isOpen} title="Add New Product" closeModal={close}>
          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800">Submit</Button>
            <Button className="bg-gray-300 hover:bg-gray-400" onClick={close}>Close</Button>
          </div>
        </Modal>
      </main>
    </>
  )
}

export default App
