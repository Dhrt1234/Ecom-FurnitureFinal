import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useEffect } from "react";
import $ from "jquery";
import "dropify/dist/js/dropify.min.js";
import "dropify/dist/css/dropify.min.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'

export default function Add_Sub_Category_2() {

    let [parentCatList, setParentCatList] = useState([])
    let [subCatList, setSubCatList] = useState([])
/* let [parentcattId, setParentCatId]=useState(null) */
    let apiBaseUrl = import.meta.env.VITE_APIBASEURL //http://localhost:8000/admin/
    const navigate = useNavigate();

    let getParentcategory = () => {
        axios.get(`${apiBaseUrl}sub_subcategory/parentcategory`)
            .then((res) => res.data)
            .then((finalRes) => {
                setParentCatList(finalRes.data)
            })
    }
//console.log(parentcattId);

    let getSubcategory = (event) => {
       // alert(event)
        let parentId= event.target.value;
        console.log("pid",parentId)
      //  axios.get(`${apiBaseUrl}sub_subcategory/subcategory/${parentId}`)
          axios.get(`${apiBaseUrl}sub_subcategory/subcategory/${parentId}`)
            .then((res) => res.data)
            .then((finalRes) => {
                setSubCatList(finalRes.data)
                console.log(finalRes.data)
            })
    }


    let savesub_SubCategory = (e) => {
        e.preventDefault()
        let formValue = new FormData(e.target)  //Form tag
        axios.post(`${apiBaseUrl}sub_subcategory/insert`, formValue)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    console.log(finalRes)
                    toast.success(finalRes.msg)
                    e.target.reset()
                    $(".dropify").data('dropify').clearElement();
                    setTimeout(() => {
                        navigate('/view-Sub-category_2')

                    }, 3000)
                }
                else {

                    toast.error(finalRes.msg)
                }


            })
    }

    useEffect(() => {
        getParentcategory()
        getSubcategory
    }, [])

    useEffect(() => {
        $(".dropify").dropify({
            messages: {
                default: "Drag and drop",
                error: 'Ooops, something wrong happended.'
            },
            tpl: {
                loader: '<div class="dropify-loader"></div>',
                errorLine: '<p class="dropify-error">{{ error }}</p>',
                message: `<div class="dropify-message"><span class="file-icon" /> <p class="text-[25px]">{{ default }}</p></div>`,
            },
        });
    });





    return (
        <div>
            <ToastContainer />
            <section className='w-full'>
                <div className='border-b-2 text-gray-300'></div>
                <div className='py-3'>
                    <nav className='mt-1'>
                        <ul className='flex items-center'>
                            <li> <Link to={'/dashboard'}><span className='font-bold text-gray-800'>Home </span> </Link> </li>&nbsp;
                            <li> <Link to={'/user'}><span className='font-bold text-gray-800'>/&nbsp;Sub Category</span> </Link> </li>
                            <li> <span className='font-bold text-gray-800'>/&nbsp;Add Sub Sub Category</span></li>
                        </ul>

                    </nav>
                </div>
                <div className='border-b-2 text-gray-300'></div>
                <div className='w-full min-h-[620px]'>
                    <div className='max-w-[1220px] mx-auto py-5'>
                        <h3 className='text-[26px] p-2 border rounded-t-md font-semibold border-slate-400 bg-gray-200'>Add Sub SubCategory</h3>
                        <form onSubmit={savesub_SubCategory} className=' py-3 px-2 border border-t-0 rounded-b-md border-slate-400' autoComplete='off'>
                            <div className='flex gap-5'>
                                <div className='w-[30%]'>
                                    <label className="mb-1">
                                        <b>Sub SubCategory Image</b>
                                    </label>
                                    <input
                                        type="file"
                                        className="dropify text-[15px]"
                                        data-height="250"
                                        name='sub_subcatImage'
                                    />
                                </div>
                                <div className='w-[62%]'>

                                    <div className='mb-3 p-1'>
                                        <label for="name" className='p-1 block font-medium text-gray-900'>Parent Category Name </label>

                                        <select name='parentCategory' onChange={getSubcategory} className='text-[20px] border-2 py-2 px-2 block shadow-md
                                                             border-gray-400 w-full rounded-lg focus:border-blue-500'>
                                            <option>Select Parent Category</option>
                                            {
                                                parentCatList.map((items, index) =>

                                                    <option  key={index} value={items._id}> {items.categoryName}  </option>
                                                )
                                            }
                                        </select>
                                    </div>

                                    <div className='mb-3 p-1'>
                                        <label for="name" className='p-1 block font-medium text-gray-900'>Sub Category Name </label>

                                        <select name='subCategory' className='text-[20px] border-2 py-2 px-2 block shadow-md
                                                             border-gray-400 w-full rounded-lg focus:border-blue-500'>
                                            <option>Select Sub Category</option>
                                            {
                                                subCatList.map((items, index) =>
                                                    <option key={index} value={items._id}>{items.subcategoryName}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    <div className='mb-3 p-1'>
                                        <label for="name" className='p-1 block font-medium text-gray-900'>Category Name</label>
                                        <input type='name' name='sub_subcatName' id='sub_subcatName' className='text-[20px] border-2 py-2 px-2 block shadow-md
                                                         border-gray-400 w-full rounded-lg focus:border-blue-500' placeholder='Sub SubCategory Name' />
                                    </div>

                                    <div className='mb-3 p-1'>
                                        <label for="order" className='p-1 block font-medium text-gray-900'>Order</label>
                                        <input type='number' name='sub_subcatOrder' id='sub_subcatOrder' className='text-[20px] border-2 py-2 px-2 block shadow-md
                                                         border-gray-400 w-full rounded-lg focus:border-blue-500' placeholder='Order' />
                                    </div>

                                </div>
                            </div>

                            <button className='text-white bg-purple-500 hover:bg-purple-700 font-medium rounded-lg py-3 px-2 my-3 mx-1.5'>Add Sub Category

                            </button>
                        </form>
                    </div>

                </div>


            </section>








        </div>
    )
}
export { Add_Sub_Category_2 }