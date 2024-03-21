import Header from '../components/Header';
import Login from '../components/Login';

export default function LoginPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center sm:px-6 lg:px-8">
      <Header
        heading="Login to your account"
        paragraph="Don't have an account yet? "
        linkName="Signup"
        linkUrl="/signup"
      />
      <Login />
    </div>
  );
}
