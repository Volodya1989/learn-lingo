import { useForm } from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import useLocalStorage from 'hooks/useLocalStorage';

import {
  Description,
  Text,
  Heading,
  Label,
  Field,
  Wrapper,
  ErrorMessage,
  MainButton,
} from './TrialLesson.styled';
export const TrialLesson = ({ details: { surname, name } }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState: { isSubmitSuccessful },
  } = useForm();
  const [fullName, setFullName] = useLocalStorage('fullName' || '');
  const [email, setEmail] = useLocalStorage('email' || '');
  const [phone, setPhone] = useLocalStorage('phone' || '');

  //setting query state on change and passing it as props to search component
  const onQueryChange = useCallback(
    e => {
      console.log(e.currentTarget.name);
      if (e.currentTarget.value === ' ') {
        return;
      }
      if (e.currentTarget.name === 'email') {
        setEmail(e.currentTarget.value);
      }
      if (e.currentTarget.name === 'fullName') {
        setFullName(e.currentTarget.value);
      }
      if (e.currentTarget.name === 'phone') {
        setPhone(e.currentTarget.value);
      }
      // setQuerySearch(e.currentTarget.value);
    },
    [setEmail, setFullName, setPhone]
  );
  const onClick = data => {
    setFullName('');
    setPhone('');
    setEmail('');
    console.log(data);
  };

  useEffect(() => {
    console.log(isSubmitSuccessful);

    if (isSubmitSuccessful) {
      console.log('deleting');
      setFullName('');
      setPhone('');
      setEmail('');
    }
  }, [setEmail, setFullName, setPhone, isSubmitSuccessful]);
  // const { showBridge, description, brand, model } = details;
  return (
    <>
      {/* <TrialLessonStyled
        src={
          showBridge
            ? require('../../../images/bridge.jpg')
            : require('../../../images/placeholderCar.jpg')
        }
        onError={e =>
          (e.target.src = require('../../../images/placeholderCar.jpg'))
        }
        alt="large image"
        width="600"
      /> */}
      <Description>
        <Heading>{`Book Trial Lesson `}</Heading>
        <Text>Your Teacher: {`${surname} ${name}`} </Text>
        <Text>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </Text>
        <form onSubmit={handleSubmit(data => onClick(data))}>
          {errors.email && <ErrorMessage>Email is required.</ErrorMessage>}
          {errors.fullName && (
            <ErrorMessage>Full Name is required.</ErrorMessage>
          )}
          {errors.phone && (
            <ErrorMessage>Phone number is required.</ErrorMessage>
          )}

          <Wrapper>
            <Field
              {...register('fullName', {
                required: true,
                value: fullName,
                maxLength: 5,
              })}
              onChange={onQueryChange}
              name="fullName"
              value={fullName}
              autoComplete="off"
              type={'text'}
            />
            <Label htmlFor={1}>{'Full Name'}</Label>
          </Wrapper>
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
              {...register('phone', { required: true, value: phone })}
              onChange={onQueryChange}
              name="phone"
              value={phone}
              autoComplete="off"
              type={'text'}
            />
            <Label htmlFor={1}>{'Phone'}</Label>
          </Wrapper>
          <MainButton type="submit" value={'Book'} />
        </form>
      </Description>
    </>
  );
};
export default TrialLesson;
