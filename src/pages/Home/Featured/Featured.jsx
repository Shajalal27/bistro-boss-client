import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg';

import './Featured.css'

const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white pt-8 my-10">
            <SectionTitle
                subHeading='Check it Out'
                heading='Featured Item'
            ></SectionTitle>
            <div className="md:flex justify-center items-center bg-slate-600 bg-opacity-80 px-36 pb-20 pt-12">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className="md:ml-10">
                    <p>May 23, 2024</p>
                    <p className="uppercase">Where can I get some</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur dolores ducimus tempore hic distinctio reprehenderit possimus in atque voluptatem minus provident accusamus, eius tempora aliquid cumque delectus illo saepe facilis recusandae officia, quaerat repellat labore id culpa? Laborum accusamus quibusdam voluptatem quisquam. Ex, expedita iure eius culpa repellat porro eaque!</p>
                    
                </div>
            </div>
            
        </div>
    );
};

export default Featured;