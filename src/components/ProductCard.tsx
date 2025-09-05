interface IProps{}
export const ProductCard = ({}: IProps) => {
  return (
    <div className="border rounded-md p-2 flex flex-col">

      <img src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?_gl=1*mcus9p*_ga*NjcxMTI4OTk0LjE3NTcwNjc5MjU.*_ga_8JE65Q40S6*czE3NTcwNjc5MjQkbzEkZzAkdDE3NTcwNjc5MjQkajYwJGwwJGgw" alt="prod_1"/>
      
      <h3> Product One For Sale</h3>
      
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit ea explicabo necessitatibus doloremque.</p>

      <div className="flex items-center space-x-2 my-2">
        <span className="w-5 h-5 bg-red-400 rounded-full cursor-pointer"/>
      <span className="w-5 h-5 bg-yellow-900 rounded-full cursor-pointer"/>
      <span className="w-5 h-5 bg-blue-400 rounded-full cursor-pointer"/>
      </div>

      <div className="flex justify-between items-center mb-2">
        <span>$500.000</span>
      <img src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?_gl=1*mcus9p*_ga*NjcxMTI4OTk0LjE3NTcwNjc5MjU.*_ga_8JE65Q40S6*czE3NTcwNjc5MjQkbzEkZzAkdDE3NTcwNjc5MjQkajYwJGwwJGgw" alt="prod_1" className="w-10 h-10 rounded-full"/>
      </div>

      <div className="flex justify-between space-x-2 items-center mt-5">
        <button className="bg-indigo-700 w-full text-white p-2 rounded-md">EDIT</button>
        <button className="bg-red-700 w-full text-white p-2 rounded-md">DELETE</button>
      </div>
    </div>
  )
}
