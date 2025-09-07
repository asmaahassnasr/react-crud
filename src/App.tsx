import { ProductCard } from "./components/ProductCard"
import { productList } from "./data"

function App() {

  const renderedProductList = productList.map(prod => <ProductCard key={prod.id} product={prod} />)
  return (
    <>
      <main className="container mx-auto">
        <div className="m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2">
          {renderedProductList}
        </div>
      </main>
    </>
  )
}

export default App
