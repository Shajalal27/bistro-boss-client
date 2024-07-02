import { FaEdit, FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";


const ManageItems = () => {
    const[menu, , refetch] = useMenu();
    const axiosSecure = useAxiosSecure();


    const handleDeleteItem = (item) =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then( async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`);
                // console.log(res.data);
                if(res.data.deletedCount > 0){
                    //refetch to update the ui
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${item.name} has been deleted.`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            }
          });

    }


    return (
        <div>
            <SectionTitle heading="Manage All Items" subHeading="Hurry up">
            </SectionTitle>
          <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        <th>Image</th>
                        <th>Item Name</th>
                        <th>price</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                       menu.map((item, index) => <tr key={item._id}>
                        <td>
                            {index + 1}
                        </td>
                        <td>
                        <div className="flex items-center gap-3">
                            <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                            </div>
                            </div>
                            
                        </div>
                        </td>
                        <td>
                        {item.name}
                        </td>
                        <td>${item.price}</td>
                        <td>
                            <Link to={`/dashboard/updateItem/${item._id}`}>
                            <button
                                className="btn bg-orange-500 btn-md">
                                <FaEdit className="text-white text-xl"></FaEdit>
                            </button>
                            </Link>
                        </td>
                        <td>
                        <button
                                onClick={() =>handleDeleteItem(item)}
                                className="btn bg-slate-300 btn-md">
                                <FaTrashAlt className="text-red-500 text-xl"></FaTrashAlt>
                             </button>
                        </td>
                        </tr>)
                    }
                    
                    </tbody>        
                </table>
            </div>
          </div>
        </div>
    );
};

export default ManageItems;