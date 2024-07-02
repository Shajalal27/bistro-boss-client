import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api =`https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
    const {name, category, recipe, price, _id} = useLoaderData();
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
                image: res.data.data.dispaly_url
            }
            //
            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem)
            console.log(menuRes.data)
            if(menuRes.data.modifiedCount > 0 ){
                //show success popup
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is updated to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
        console.log('with image url', res.data);

    };

    // console.log(item);
    return (
        <div>
            <SectionTitle heading="Update an Item" subHeading="Refetch Info"></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                         <label className="label">
                            <span className="label-text">Recipe name?*</span>
                         </label>
                         <input 
                         {...register('name', {required:true})}
                         required
                         type="text" defaultValue={name} placeholder="Recipe Name" className="input input-bordered w-full" />
                    </div>
                    <div className="flex gap-6">
                        {/* category */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select defaultValue={category} {...register('category',  {required:true})}
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
                            type="number" defaultValue={price} placeholder="Price" className="input input-bordered w-full" />
                        </div>
                    </div>
                   {/* Recipe details */}
                   <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe Details</span>
                        </div>
                        <textarea defaultValue={recipe}
                        {...register('recipe',  {required:true})}
                        className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>
                        
                    </label>
                    <div className="form-control w-full my-6">
                        <input 
                         {...register('image',  {required:true})}
                        type="file" className="file-input w-full max-w-xs" />
                    </div>
                    <button className="btn">
                        Update menu Item
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;