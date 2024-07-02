import { Link } from "react-router-dom";
import Cover from "../../../../Shared/Cover/Cover";
import MenuItem from "../../../../Shared/MenuItem/MenuItem";



const MenuCategory = ({items, title, img}) => {
   
 
    return (
        <div className="pt-8">
            { title && <Cover img={img} title={title}></Cover>}
            <div className="grid md:grid-cols-2 gap-10 my-16">
                {
                    items.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem> )
                }
            </div>
            <Link to={`/order/${title}`}>
                <button className="btn btn-outline text-slate-700 border-0 border-b-4 mt-4 mb-10 text-center font-bold text-xl">View Full Menu</button>
            </Link>
        </div>
    );
};

export default MenuCategory;