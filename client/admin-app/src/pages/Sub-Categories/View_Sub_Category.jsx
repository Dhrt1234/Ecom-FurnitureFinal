import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { FaFilter } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import axios from 'axios';

import HeaderCategory from '../../common/HeaderCategory';
export default function View_Sub_Category() {
    const linkName = "View Sub Category";
    let [subcategoryList, setSubCategoryList] = useState([])
    let [staticPath, setStaticPath] = useState('')
    let apiBaseUrl = import.meta.env.VITE_APIBASEURL

    let getSubCategories = () => {
        axios.get(`${apiBaseUrl}subcategory/view`)
            .then((res) => res.data)
            .then((finalRes) => {
                console.log(finalRes)
                setSubCategoryList(finalRes.data)
                setStaticPath(finalRes.staticPath)
                //  setTotalpages(finalRes.pages)
            })

    }

    useEffect(() => {
        getSubCategories()
    }, [])
    return (
        <div>
            <section className='w-full'>
                <div className='border-b-2 text-gray-300'></div>
                <div className='py-3'>
                    <nav className='mt-1'>
                        <ul className='flex items-center'>
                            <li> <Link to={'/dashboard'}><span className='font-bold text-gray-800'>Home </span> </Link> </li>&nbsp;
                            <li> <Link to={'/user'}><span className='font-bold text-gray-800'>/&nbsp;Sub Category</span> </Link> </li>
                            <li> <span className='font-bold text-gray-800'>/&nbsp;View</span></li>
                        </ul>

                    </nav>
                </div>
                <div className='border-b-2 text-gray-300'></div>
                <div className='w-full min-h-[620px]'>
                    <div className='max-w-[1220px] mx-auto py-5'>

                        <HeaderCategory linkName={linkName} />
                        <div className='border border-slate-400 border-t-0 rounded-b-md'>

                            <div className='overflow-x-auto'>

                                <table className='w-full text-gray-500'>
                                    <thead className='text-gray-900 text-[12px] uppercase bg-gray-50'>
                                        <tr>
                                            <th>
                                                <input type='checkbox' className='text-blue-600 text-sm rounded-sm w-4 h-4 border-gray-400 ' />
                                            </th>
                                            <th scope='col' className='px-6 py-3'>Parent Category Name</th>
                                            <th scope='col' className='px-6 py-3'>Sub Category Name</th>
                                            <th scope='col' className='w-[12%]'>Image</th>
                                            <th scope='col' className='w-[15%]'>Order No</th>
                                            <th scope='col' className='w-[11%]'>Status</th>
                                            <th scope='col' className='w[6%]'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            subcategoryList.map((items, index) => {
                                                return (


                                                    <tr className='bg-white hover:bg-gray-50'>
                                                        <th className='w-4 p-4'>
                                                            <input type='checkbox' className='text-blue-600 text-sm rounded-sm w-4 h-4 border-gray-400 ' />
                                                        </th>
                                                        <th scope='row' className=' text-[15px] px-6 py-4'>

                                                            {items.parentCategory.categoryName}

                                                        </th>
                                                        <th scope='row' className='  text-[15px] px-6 py-4'>

                                                            {items.subcategoryName}

                                                        </th>
                                                        <th className='px-6 py-4'>
                                                            <img src={staticPath + items.subcategoryImage} className=' mx-5 w-10 h-10 rounded-full' />
                                                        </th>
                                                        <th className='text-[15px] px-6  py-4'>{items.subcategoryOrder}</th>

                                                        <th className=' px-6 py-4'>
                                                            {items.subcategoryStatus ?
                                                                <button className='text-white font-medium px-5 py-2 bg-green-700 rounded-lg focus:outline-none hover:bg-green-900'>
                                                                    Active
                                                                </button>
                                                                :
                                                                <button className='text-white font-medium px-5 py-2 bg-red-700 rounded-lg focus:outline-none hover:bg-red-900'>
                                                                    Deactive
                                                                </button>
                                                            }
                                                        </th>
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
export { View_Sub_Category }