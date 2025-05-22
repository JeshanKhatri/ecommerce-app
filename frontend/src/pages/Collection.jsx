import React, {useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const {products, search, showSearch} = useContext(ShopContext);
   const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState(products);
  const [category, setCatagory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)){
    setCatagory(prev=>prev.filter(item => item !== e.target.value))
    }
    else{
      setCatagory(prev=>[...prev, e.target.value])
    }
  }

  const toggleSubCategory =(e)=>{
    if (subCategory.include(e.target.value)){
      setSubCategory(prev=>prev.filter(item => item !== e.target.value))
    }
    else{
      setSubCategory(prev=>[...prev, e.target.value])
    }
  }

  const applyFilter = () =>{
    let productsCopy = products.slice();
    if (showSearch && search){
      productsCopy = productsCopy.filter(item =>item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }
    if (subCategory.length > 0){
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }
    setFilterProducts(productsCopy)
  }

const sortProduct =() => {
  let fpCopy = filterProducts.slice();

  switch (sortType){
  case'low-high':
  setFilterProducts(fpCopy.sort((a,b)=> (a.price - b.price)));
  break;

  case 'high-low':
  setFilterProducts(fpCopy.sort((a,b)=> (b.price - a.price)));
  break;

  default:
    applyFilter();
    break;
  }

}
  useEffect (()=> {
    applyFilter();
  },[category, subCategory, search, showSearch])

  useEffect(() => {
    sortProduct();
  },[sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/*fil. options*/}
      <div className='min-w-60'>
        <p onCanPlay={()=> setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>Filters
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        
        
        {/* cat fil */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block `}>
           <p className='mb-3 text-sm font-medium'>CATEGORY</p>
           <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
           
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Home Use'}  onChange={toggleCategory}/>Home Use
            </p>

             <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Commercial Use'} onChange={toggleCategory} />Commercial Use
            </p>

             <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Gym Owners'} onChange={toggleCategory} /> Gym Owners
            </p>
            
             <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Personal Trainers'}  onChange={toggleCategory}/>Personal Trainers
            </p>

           </div>
        </div>

        {/* subcat fil */}
         <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block `}>
           <p className='mb-3 text-sm font-medium'>Type</p>
           <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
           
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Cardio Machines'} onChange={toggleSubCategory}/>Cardio Machines
            </p>

             <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={' Strength Equipment'} onChange={toggleSubCategory}/> Strength Equipment
            </p>

             <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Functional Training'} onChange={toggleSubCategory}/> Functional Training
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Accessories'} onChange={toggleSubCategory}/>Accessories
            </p>

           </div>
        </div>

      </div>

      {/* product list */}
      <div className="flex-1">
        <div className='flex justify-between text-base sm:text-2xl mb-4 '>
          <Title text1={'ALL'} text2={'EQUIPMENTS'}/>

          {/* sort */}
          <select onChange={(e)=> setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent">Sort By:Relavent</option>
            <option value="low-high">Sort By:Low to High</option>
            <option value="high-low">Sort By:High to Low</option>
          </select>
        </div>
        {/* product list */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {
            filterProducts.map((item,index)=>(
                <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection
