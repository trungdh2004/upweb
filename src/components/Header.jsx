import React, { useState } from 'react';
import Logo from '../asset/logo.png';
import Avatar from '../asset/avatar.png';
import { MdShoppingBasket, MdAdd, MdLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { animate, motion } from 'framer-motion';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase.config';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { useEffect } from 'react';

const Header = () => {
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
    const [isMenu, setIsMenu] = useState(false);

    const handleLogin = async () => {
        if (!user) {
            const {
                user: { refreshToken, providerData },
            } = await signInWithPopup(firebaseAuth, provider);
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0],
            });
            localStorage.setItem('user', JSON.stringify(providerData[0]));
        } else {
            setIsMenu((preve) => !preve);
        }
    };

    const handleLogout = () => {
        setIsMenu(false);
        localStorage.clear();
        dispatch({
            type: actionType.SET_USER,
            user: null,
        });
    };

    const handleShowCart = () => {
        dispatch({
            type: actionType.SET_CARD_SHOW,
            cartShow: !cartShow,
        });
    };

    return (
        <header className="fixed z-50 w-screen p-3 px-4 md:px-16 bg-primary">
            {/* deskstop 7 table */}
            <div className="hidden md:flex w-full h-full items-center justify-between ">
                <Link to={'/'} className="flex items-center gap-2">
                    <img src={Logo} alt="" className="w-10 object-cover " />
                    <p className="text-headingColor text-xl font-bold">City</p>
                </Link>

                <div className="flex items-center gap-8">
                    <motion.ul
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 200 }}
                        className="flex items-center gap-8 ml-auto"
                    >
                        <li
                            className="text-base text-textColor hover:text-headingColor duration-100 cursor-pointer"
                            onClick={() => {
                                setIsMenu(false);
                            }}
                        >
                            Home
                        </li>
                        <li
                            className="text-base text-textColor hover:text-headingColor duration-100 cursor-pointer"
                            onClick={() => {
                                setIsMenu(false);
                            }}
                        >
                            Menu
                        </li>
                        <li
                            className="text-base text-textColor hover:text-headingColor duration-100 cursor-pointer"
                            onClick={() => {
                                setIsMenu(false);
                            }}
                        >
                            Abou us
                        </li>
                        <li
                            className="text-base text-textColor hover:text-headingColor duration-100 cursor-pointer"
                            onClick={() => {
                                setIsMenu(false);
                            }}
                        >
                            Service
                        </li>
                    </motion.ul>

                    <div className="relative flex items-center justify-center" onClick={handleShowCart}>
                        <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
                        {cartItems && cartItems.length > 0 && (
                            <div className=" absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-cartNumBg">
                                <p className="text-xs text-white font-semibold ">{cartItems.length}</p>
                            </div>
                        )}
                    </div>

                    <div className="relative ">
                        <motion.img
                            whileTap={{
                                scale: 0.6,
                            }}
                            src={user ? user.photoURL : Avatar}
                            alt=""
                            className="w-10 min-w-[40px] h-10 min-h-[40px] object-cover drop-shadow-xl cursor-pointer rounded-full"
                            onClick={handleLogin}
                        />
                        {isMenu ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                className="w-40 bg-gray-50 flex shadow-xl rounded-lg absolute top-12 right-0 flex-col overflow-hidden"
                            >
                                {user && user.email === 'dohuutrung123456@gmail.com' && (
                                    <Link to={'/createItem'}>
                                        <p
                                            className="px-4 py-2 flex items-center cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base justify-between"
                                            onClick={() => {
                                                setIsMenu(false);
                                            }}
                                        >
                                            New Item <MdAdd />
                                        </p>
                                    </Link>
                                )}
                                <p className="px-4 py-2 flex items-center cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base justify-between">
                                    Logout <MdLogout />
                                </p>
                            </motion.div>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>

            {/* mobile */}
            <div className="flex md:hidden w-full h-full justify-between items-center">
                <div className="relative flex items-center justify-center" onClick={handleShowCart}>
                    <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
                    {cartItems && cartItems.length > 0 && (
                        <div className=" absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-cartNumBg">
                            <p className="text-xs text-white font-semibold ">{cartItems.length}</p>
                        </div>
                    )}
                </div>

                <Link to={'/'} className="flex items-center gap-2">
                    <img src={Logo} alt="" className="w-10 object-cover " />
                    <p className="text-headingColor text-xl font-bold">City</p>
                </Link>

                <div className="relative ">
                    <motion.img
                        whileTap={{
                            scale: 0.6,
                        }}
                        src={user ? user.photoURL : Avatar}
                        alt=""
                        className="w-10 min-w-[40px] h-10 min-h-[40px] object-cover drop-shadow-xl cursor-pointer rounded-full"
                        onClick={handleLogin}
                    />
                    {isMenu ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            className="w-40 bg-gray-50 flex shadow-xl rounded-lg absolute top-12 right-0 flex-col overflow-hidden"
                        >
                            {user && user.email === 'dohuutrung123456@gmail.com' && (
                                <Link to={'/createItem'}>
                                    <p className="px-4 py-2 flex items-center cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base justify-between">
                                        New Item <MdAdd />
                                    </p>
                                </Link>
                            )}

                            <ul className="flex items-start flex-col w-full ">
                                <li className="w-full px-4 py-2 flex items-center cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base justify-between ">
                                    Home
                                </li>
                                <li className="w-full px-4 py-2 flex items-center cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base justify-between ">
                                    Menu
                                </li>
                                <li className="w-full px-4 py-2 flex items-center cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base justify-between ">
                                    Abou us
                                </li>
                                <li className="w-full px-4 py-2 flex items-center cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base justify-between ">
                                    Service
                                </li>
                            </ul>

                            <p
                                className="px-4 py-2 flex items-center cursor-pointer bg-gray-200 hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base justify-between"
                                onClick={handleLogout}
                            >
                                Logout <MdLogout />
                            </p>
                        </motion.div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
