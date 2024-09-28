import { useForm } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from 'use-http';
import {
  Description,
  Heading,
  Label,
  Field,
  Wrapper,
  ErrorMessage,
  MainButton,
  DescrText,
  ProtectedEye,
  ContainerLoader,
} from './Login.styled';
import { ToastContainer } from 'react-toastify';
import { StyledToastContainer } from 'components/Teachers/Teachers.styled';
import Loader from 'components/Loader';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/operations';

export const Login = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loading } = useFetch();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [BtnName, setBtnName] = useState('Log In');
  const [active, setActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  //setting query state on change and passing it as props to search component
  const onQueryChange = useCallback(
    e => {
      if (e.currentTarget.value === ' ') {
        return;
      }
      if (e.currentTarget.name === 'email') {
        setEmail(e.currentTarget.value.trim());
      }
      if (e.currentTarget.name === 'password') {
        setPassword(e.currentTarget.value.trim());
      }
    },
    [setEmail, setPassword]
  );

  const togglePassword = () => {
    setIsVisible(!isVisible);
  };

  //common method success notifications
  const toastSuccess = (message, _) => {
    toast.success(message, {
      className: 'toast-message',
    });
  };
  const toastError = (message, _) => {
    toast.error(message, {
      className: 'toast-message',
    });
  };

  const onSubmitForm = data => {
    setIsSubmitSuccessful(true);

    if (data.password === '' && data.email === '') {
      toastError('Please provide details');
      return;
    } else {
      setPassword('');
      setEmail('');
      setIsLoading(true);
      setActive(true);
    }
    dispatch(
      logIn({
        email: data.email.toLowerCase(),
        password: data.password,
      })
    ).then(data => {
      try {
        setIsLoading(false);
        if (data?.error?.message) {
          toastError(
            `Email or password is incorrect OR check your email to complete your registration.`
          );
          setActive(true);
          setTimeout(() => {
            setActive(false);
          }, 4000);
        }
        if (!data?.error?.message) {
          toastSuccess(`You are logging...`);
          setActive(true);
          setPassword('');
          setEmail('');
          setBtnName('Logging...');
          setTimeout(() => {
            window.location.href =
              'https://volodya1989.github.io/learn-lingo/#/teachers';
            // window.location.href = `http://localhost:3000/learn-lingo/#/teachers`;

            setActive(false);
            setBtnName('Log In');
          }, 2000);
        }
      } catch (error) {
        console.log('error', error.message);
      }
    });
  };

  const handleLoading = useCallback(
    e => {
      if (!loading && !isSubmitSuccessful) {
        setTimeout(() => {
          setIsLoading(true);
        }, 1000);
      }
    },
    [loading, isSubmitSuccessful]
  );

  useEffect(() => {
    handleLoading();
  }, [handleLoading]);
  return (
    <>
      {!isLoading && !isSubmitSuccessful ? (
        <Loader />
      ) : (
        <Description>
          <ContainerLoader>
            {isLoading && isSubmitSuccessful && <Loader />}
          </ContainerLoader>

          <StyledToastContainer autoClose={4000} position="top-right">
            <ToastContainer />;
          </StyledToastContainer>
          <Heading>{`Log In`}</Heading>
          <DescrText>
            Welcome back! Please enter your credentials to access your account
            and continue your search for an teacher.
          </DescrText>

          <form onSubmit={handleSubmit(data => onSubmitForm(data))}>
            {errors.password && (
              <ErrorMessage>Password is required.</ErrorMessage>
            )}
            {errors.email && <ErrorMessage>Email is required.</ErrorMessage>}
            <Wrapper>
              <Field
                {...register('email', { required: true, value: email })}
                onChange={onQueryChange}
                name="email"
                value={email}
                autoComplete="off"
                type={'text'}
              />
              <Label htmlFor={1}>{'Email'}</Label>
            </Wrapper>
            <Wrapper>
              <Field
                {...register('password', {
                  required: true,
                  value: password,
                })}
                sx={{
                  position: 'relative',
                }}
                onChange={onQueryChange}
                name="password"
                value={password}
                autoComplete="off"
                type={isVisible ? 'text' : 'password'}
              />
              <ProtectedEye onClick={togglePassword}>
                {!isVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </ProtectedEye>
              <Label htmlFor={1}>{'Password'}</Label>
            </Wrapper>

            <MainButton
              disabled={password && email ? active : true}
              type="submit"
              value={
                isLoading && isSubmitSuccessful ? 'Submitting...' : BtnName
              }
            />
          </form>
        </Description>
      )}
    </>
  );
};
export default Login;
