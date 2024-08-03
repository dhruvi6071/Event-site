import AuthForm from '../components/AuthForm';
import { json, redirect } from 'react-router-dom';
function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({request}) {

  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  if(mode !== 'login' && mode !== 'signup'){
    throw json({message: 'Unsupported mode.'}, {status: 422});

  }

    const data = await request.formData();
    const authData = {
      email: data.get('email'),
      password: data.get('password')
    };

    const response = await fetch('http://localhost:8080/' + mode, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(authData),
    });

    //For invalid user or id.
    if(response.status === 422 || response.status === 401){
      return response;
    }

    if(!response.ok){
      throw json({message: 'Could not authenticate User'}, {status: 500});
    }

    //we need to store tokens so that we can authorize the user for some features such as delete etc.

    const resData = await response.json();
    const token = resData.token;

    localStorage.setItem('token', token);

    //To get back to home page
    return redirect('/');
}