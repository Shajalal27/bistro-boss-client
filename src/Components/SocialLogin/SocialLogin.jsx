import { FaGithub, FaGoogle, FaTwitter } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";



const SocialLogin = () => {
    const{googleSignIn} = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then(result =>{
            console.log(result.user)
            const userInfo ={
                email: result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res =>{
                console.log(res.data);
                navigate('/')
            })
        })
    }
    return (
        <div>
            <div className="flex justify-center items-center gap-2">
                <button onClick={handleGoogleSignIn} className="btn ">
                     <FaGoogle></FaGoogle>
                Google
                </button>
                <button className="btn ">
                     <FaGithub></FaGithub>
                Github
                </button>
                <button className="btn ">
                     <FaTwitter></FaTwitter>
                Twitter
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;