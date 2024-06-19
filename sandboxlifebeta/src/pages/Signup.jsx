import Header from '../components/Header';
import Signup from '../components/Signup';
import backGroundImg from '../assets/otherImg/loginBackgroundImg.jpg';


export default function SignupPage() {
  return (
    <div className="h-screen  flex flex-col items-center justify-center">
      <img src={backGroundImg} className='w-screen h-screen' alt="" />
      <div className='absolute bg-opacity-10  p-5 rounded-md shadow-md shadow-[#282828] mx-2'>
      <Header
        heading="Signup to create an account"
        paragraph="Already have an account? "
        linkName="Login"
        linkUrl="/"
      />
      <Signup />
    </div>
    </div>
  );
}
