import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { FaFilter } from "react-icons/fa";
import { FaPen } from "react-icons/fa";

import HeaderSubCategory from '../../common/HeaderSubCategory';
import axios from 'axios';
export default function View_Sub_Category_2() {
    const linkName = "View Sub SubCategory";
    let [subsubcatList, setSubSubCatList] = useState([])
    let [staticPath, setStaticPath] = useState('')
    let apiBaseUrl = import.meta.env.VITE_APIBASEURL

    let getSubSubCategories = () => {
        axios.get(`${apiBaseUrl}sub_subcategory/view`)
            .then((res) => res.data)
            .then((finalRes) => {
                console.log(finalRes)
                setSubSubCatList(finalRes.data)
                setStaticPath(finalRes.staticPath)
                //  setTotalpages(finalRes.pages)
            })

    }

    useEffect(() => {
        getSubSubCategories()
    }, [])
    return (
        <div>
            <section className='w-full'>
                <div className='border-b-2 text-gray-300'></div>
                <div className='py-3'>
                    <nav className='mt-1'>
                        <ul className='flex items-center'>
                            <li> <Link to={'/dashboard'}><span className='font-bold text-gray-800'>Home </span> </Link> </li>&nbsp;
                            <li> <Link to={'/user'}><span className='font-bold text-gray-800'>/&nbsp;Sub Sub Category</span> </Link> </li>
                            <li> <span className='font-bold text-gray-800'>/&nbsp;View</span></li>
                        </ul>

                    </nav>
                </div>
                <div className='border-b-2 text-gray-300'></div>
                <div className='w-full min-h-[620px]'>
                    <div className='max-w-[1220px] mx-auto py-5'>

                        <HeaderSubCategory linkName={linkName} />
                        <div className='border border-slate-400 border-t-0 rounded-b-md'>

                            <div className='overflow-x-auto'>

                                <table className='w-full text-gray-500'>
                                    <thead className='text-gray-900 text-[12px] uppercase bg-gray-50'>
                                        <tr>
                                            <th>
                                                <input type='checkbox' className='text-blue-600 text-sm rounded-sm w-4 h-4 border-gray-400 ' />
                                            </th>
                                            <th scope='col' className='px-6 py-3'>Parent Category</th>
                                            <th scope='col' className='px-6 py-3'>Sub Category</th>
                                            <th scope='col' className='px-6 py-3'>Category Name</th>
                                            <th scope='col' className='w-[12%]'>Image</th>
                                            <th scope='col' className='w-[15%]'>Order No</th>
                                            <th scope='col' className='w-[11%]'>Status</th>
                                            <th scope='col' className='w[6%]'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {

                                            subsubcatList.map((items, index) => {
                                                return (


                                                    <tr className='bg-white hover:bg-gray-50'>
                                                        <th className='w-4 p-4'>
                                                            <input type='checkbox' className='text-blue-600 text-sm rounded-sm w-4 h-4 border-gray-400 ' />
                                                        </th>
                                                        <th scope='row' className=' text-[15px] px-6 py-4'>

                                                            {items.subCategory.parentCategory.categoryName}

                                                        </th>


                                                        <th scope='row' className=' text-[15px] px-6 py-4'>

                                                           {items.subCategory.subcategoryName}

                                                        </th>
                                                        <th scope='row' className='  text-[15px] px-6 py-4'>

                                                            {items.sub_subcatName}

                                                        </th>
                                                        <th className='px-6 py-4'>
                                                            <img src={staticPath + items.sub_subcatImage} className='mx-5 w-10 h-10 rounded-full' />
                                                        </th>
                                                        <th className='text-[15px] px-6  py-4'>{items.sub_subcatOrder}</th>

                                                        {items.sub_subcatstatus ?
                                                            <button className='text-white font-medium px-5 py-2 bg-green-700 rounded-lg focus:outline-none hover:bg-green-900'>
                                                                Active
                                                            </button>
                                                            :
                                                            <button className='text-white font-medium px-5 py-2 bg-red-700 rounded-lg focus:outline-none hover:bg-red-900'>
                                                                Deactive
                                                            </button>
                                                        }
                                                        <th className='px-2 py-4'>
                                                            <Link to={'/update-Category/${items._id}'}>
                                                                <button className='w-[40px] relative   h-[40px] rounded-[50%] bg-blue-700 hover:bg-blue-800'>

                                                                    <FaPen className='text-white absolute left-3 bottom-3' />

                                                                </button>
                                                            </Link>

                                                        </th>
                                                    </tr>
                                                )
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export { View_Sub_Category_2 }