import React, { useState } from "react";
import axios from 'axios';
import { FaFilter } from "react-icons/fa";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import { IoMdSearch } from "react-icons/io";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export default function TableHeader({ module, linkName, ids, setIds, getData, setSearchName, setSearchOrder }) {
    const [filterSearch, setFilterSearch] = useState(false);
    let apiBaseUrl = import.meta.env.VITE_APIBASEURL //http://localhost:8000/admin/

console.log(setSearchName)

    let deleteData = () => {
        console.log(ids)
        console.log(module)
        if (ids.length >= 1) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post(`${apiBaseUrl}${module}/multi-delete`, { ids })
                        .then((res) => res.data)
                        .then((finalRes) => {

                            getData()
                            setIds([])

                        })
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Record has been deleted.",
                        icon: "success"
                    });
                }
            });

        }

        else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please Select Records",
            });
        }
    }

    let changeStatus = () => {
        console.log(ids)
        console.log(module)
        axios.post(`${apiBaseUrl}${module}/changeStatus`, { ids })
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    toast.success(finalRes.msg)
                    getData()
                    setIds([])

                }
                else {
                    toast.error(finalRes.msg)
                }
            })
    }

    let checkSearchName=(event)=>{
        const { value } = event.target;

    // Check if value represents a number
    if (!isNaN(value) && value.trim() !== "") {
      console.log("It's a number:", value);
      setSearchOrder(value)
      setSearchName('')
    } else {
      console.log("It's a string:", value);
      setSearchName(value)
      setSearchOrder('')
    }
        
    }
    return (
        <div>
            <ToastContainer />
            {filterSearch && (
                <div className=" bg-[#F9FAFB] p-4 mb-5">
                    <form className="flex gap-2">
                        <input
                            onChange={checkSearchName}
                            type="text"
                            placeholder="Search name"
                            className="w-[400px] text-[14px] px-4 py-3 mr-2 border border-[#00000025] rounded-[4px]"
                        />
                        <div className="bg-[#1E40AF] text-[#fff] p-3 text-[18px] rounded-[4px]">
                            <IoMdSearch onClick={getData} />
                        </div>



                    </form>
                </div>
            )}


            <div className='flex items-center justify-between bg-slate-100 py-3 px-4 border rounded-t-md border-slate-400'>

                <h3 className='text-[26px] font-semibold'>{linkName} {setIds} </h3>
                <div className='flex justify-between'>
                    <button
                        onClick={() => setFilterSearch(!filterSearch)}
                        className="bg-[#1D4ED8] hover:bg-[#1d33d8] text-white p-3 mr-3 rounded-[8px] cursor-pointer"
                    >
                        {/* <FaFilter /> */}
                        {filterSearch ? <MdFilterAltOff /> : <MdFilterAlt />}
                    </button>
                    <button onClick={changeStatus} className='text-white font-medium px-4 bg-green-700 rounded-lg focus:outline-none hover:bg-green-900'>
                        Change Status
                    </button>
                    <button onClick={deleteData} className='text-white font-medium px-4 mx-4 bg-red-700 rounded-lg focus:outline-none hover:bg-red-900'>
                        Delete
                    </button>
                </div>
            </div></div>
    )
}
