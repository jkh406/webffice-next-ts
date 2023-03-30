import { createContext, useContext, useEffect, useReducer, useRef, Component } from 'react';
import PropTypes from 'prop-types';
import ApiService from "service/apiservice"
import authApi from 'service/auth-api';
import { login, logout, setToken } from 'store/slice/auth-slice'
import { useAppDispatch } from 'hooks/use-auth'
import { useDispatch, useSelector } from 'react-redux';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState : any = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state : any, action : any) => {
    const user = action.payload; 
    console.log('user', user);
    return {
      ...state,
      ...(
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state : any, action : any) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state : any) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state : any, action : any) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props : any) => {
  const { children } = props;
  const [state, setState] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    console.log("isAuthenticated", initialized.current);
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      console.log("isAuthenticated", isAuthenticated);
      const user = {
        avatar: '/assets/avatars/avatar-anika-visser.png',
        name: 'admin',
        email: 'admin@anbtech.co.kr'
      };

      setState({
        type: HANDLERS.INITIALIZE,
        payload: user
      });
    } else {
      setState({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    []
  );

  const skip = () => {
    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: 'SkipID',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'SKIP',
      email: 'SKIP@anbtech.co.kr'
    };

    setState({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signIn = async (_email : any, _password : any) => {
    await authApi.loginUser(_email, _password)
    .then( res => {
      const user = {
        id: res.data.id,
        avatar: res.data.avatar,
        name: res.data.name,
        email: res.data.email
      };
      window.sessionStorage.setItem('authenticated', 'true');
  
      setState({
        type: HANDLERS.SIGN_IN,
        payload: user
      });
    })
    .catch(error => {
      if (error.response.status === 400) {
        alert("아이디 혹은 비밀번호를 확인해주세요")
      }else {
        alert ("서버에 일시적으로 문제가 생겼습니다. 잠시후 다시 시도해주세요.")
      }
    });
  };

  const signUp = async (_email : any, _name : any, _password : any) => {

    ApiService.checkUserByEmail(_email)
      .then( res => {
        if(!res.data.email)
        {
          let user = {
            name: _name,
            password: _password,
            email: _email,
          }
      
          ApiService.addUser(user)
          .then( res => {
                console.log('성공적으로 등록되었습니다.');
          })
          .catch( err => {
            console.log('saveUser() 에러', err);
          });
        }
      })
      .catch(err => {
        console.log('loadUser() 에러', err);
      });

      throw new Error('이미 존재하는 계정입니다.');
  };

  const signOut = () => {
    setState({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signUp,
        signOut
      }}
      
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext : any  = () => useContext(AuthContext);
