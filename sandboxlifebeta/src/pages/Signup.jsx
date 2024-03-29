import Header from '../components/Header';
import Signup from '../components/Signup';

export default function SignupPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Header
        heading="Signup to create an account"
        paragraph="Already have an account? "
        linkName="Login"
        linkUrl="/"
      />
      <Signup />
    </div>
  );
}
