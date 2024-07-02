
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuItem from "../../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";


const PopularMenu = () => {
    const [menu] = useMenu();
    const popular = menu.filter(item =>item.category === 'popular')
    

    return (
        <section className="mb-12">
            <SectionTitle
                subHeading ={"FROM OUR MENU"}
                heading ={"Popular Items"}
            >
            </SectionTitle>
            <div className="grid md:grid-cols-2 gap-10">
                {
                    popular.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem> )
                }
            </div>
            <button className="btn btn-outline text-orange-500 border-0 border-b-4 mt-4 flex justify-center items-center">View Full Menu</button>
        </section>
    );
};

export default PopularMenu;