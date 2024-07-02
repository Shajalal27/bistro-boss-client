import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api =`https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddItems = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) =>{
        console.log(data)
         //img upload to imgbb and then get an url
        const imageFile = {image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers:{
                "content-type": "multipart/form-data",
            }
        });
        if(res.data.success){
            //now send the menu item data to the server with the image url
            const menuItem ={
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image:res.data.data.dispaly_url
            }
            //
            const menuRes = await axiosSecure.post('/menu', menuItem)
            console.log(menuRes.data)
            if(menuRes.data.insertedId){
                //show success popup
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
        console.log('with image url', res.data);

    };
    
    return (
        <div>
            <SectionTitle heading="add an item" subHeading="What's new?"></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                         <label className="label">
                            <span className="label-text">Recipe name?*</span>
                         </label>
                         <input 
                         {...register('name', {required:true})}
                         required
                         type="text" placeholder="Recipe Name" className="input input-bordered w-full" />
                    </div>
                    <div className="flex gap-6">
                        {/* category */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select defaultValue="default" {...register('category',  {required:true})}
                            className="select select-bordered w-full">
                                <option disabled selected value="default">Selecte a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="desserts">Desserts</option>
                                <option value="drink">Drink</option>
                            </select>
                        </div>
                        {/* price */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input 
                            {...register('price',  {required:true})}
                            type="number" placeholder="Price" className="input input-bordered w-full" />
                        </div>
                    </div>
                   {/* Recipe details */}
                   <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe Details</span>
                        </div>
                        <textarea 
                        {...register('recipe',  {required:true})}
                        className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>
                        
                    </label>
                    <div className="form-control w-full my-6">
                        <input 
                         {...register('image',  {required:true})}
                        type="file" className="file-input w-full max-w-xs" />
                    </div>
                    <button className="btn">
                        Addtem <FaUtensils className="ml-4"></FaUtensils>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;