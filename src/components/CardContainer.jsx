import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { motion } from 'framer-motion';
import { RiRefreshFill } from 'react-icons/ri';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import emptyCart from '../asset/emptyCart.svg';

const CardContainer = () => {
    const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
    const [total, setTotal] = useState(0);
    const [subtotal, setsubTotal] = useState(0);

    const handleShowCart = () => {
        dispatch({
            type: actionType.SET_CARD_SHOW,
            cartShow: !cartShow,
        });
    };

    const handleUpQty = (item) => {
        dispatch({
            type: actionType.SET_DOWN_QTY,
            itemQty: item,
        });
    };
    const handleDownQty = (item) => {
        dispatch({
            type: actionType.SET_UP_QTY,
            itemQty: item,
        });
    };

    const handleTotal = () => {
        return cartItems.reduce((all, el) => all + parseFloat(el.qty) * parseFloat(el.price), 0);
    };

    useEffect(() => {
        setTotal(cartItems.reduce((all, el) => all + parseFloat(el.qty) * parseFloat(el.price), 0));
    }, [cartItems.reduce((all, el) => all + parseFloat(el.qty) * parseFloat(el.price), 0)]);
    return (
        <motion.div
            initial={{
                opacity: 0,
                x: 200,
            }}
            animate={{
                opacity: 1,
                x: 0,
            }}
            exit={{
                opacity: 0,
                x: 200,
            }}
            className=" fixed top-0 right-0 md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101] "
        >
            {/* header card */}

            <div className="w-full flex items-center justify-between p-4">
                <motion.div
                    className=""
                    whileTap={{
                        scale: 0.7,
                    }}
                    onClick={handleShowCart}
                >
                    <MdOutlineKeyboardBackspace className="text-textColor text-3xl cursor-pointer" />
                </motion.div>

                <p className="text-lg text-textColor font-semibold">Cart</p>
                <motion.p
                    whileTap={{ scale: 0.75 }}
                    className="text-base flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md duration-100 ease-in-out transition-all cursor-pointer text-textColor "
                >
                    Clear <RiRefreshFill />
                </motion.p>
            </div>

            {/* item card */}

            {cartItems && cartItems.length > 0 ? (
                <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
                    {/* card item */}
                    <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
                        {cartItems &&
                            cartItems.map((el) => (
                                <div
                                    key={el.id}
                                    className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2"
                                >
                                    <img
                                        src={el.imageURL}
                                        alt=""
                                        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
                                    />

                                    {/* card name */}
                                    <div className="flex flex-col gap-2">
                                        <p className="text-base text-gray-50 ">{el.title}</p>
                                        <p className="text-base text-gray-300 font-semibold">
                                            ${parseFloat(el.price) * el.qty}
                                        </p>
                                    </div>

                                    <div className="group flex items-center gap-2 ml-auto cursor-pointer">
                                        <motion.div
                                            whileTap={{ scale: 0.75 }}
                                            onClick={() => {
                                                handleUpQty(el);
                                            }}
                                        >
                                            <BiMinus className="text-white" />
                                        </motion.div>

                                        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
                                            {el.qty}
                                        </p>
                                        <motion.div
                                            whileTap={{ scale: 0.75 }}
                                            onClick={() => {
                                                handleDownQty(el);
                                            }}
                                        >
                                            <BiPlus className="text-white" />
                                        </motion.div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    {/* cart total section */}
                    <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
                        <div className="w-full flex items-center justify-between">
                            <p className="text-lg text-gray-400">Sub Total</p>
                            <p className="text-lg text-gray-400">${cartItems && cartItems.length > 0 && total}</p>
                        </div>

                        <div className="w-full flex items-center justify-between">
                            <p className="text-lg text-gray-400">Delivery</p>
                            <p className="text-lg text-gray-400">$10</p>
                        </div>

                        <div className="w-full border-b border-gray-600 my-2"></div>

                        <div className="w-full flex items-center justify-between">
                            <p className="text-xl text-gray-400 font-semibold">Sub Total</p>
                            <p className="text-xl text-gray-400 font-semibold">${total + 10}</p>
                        </div>

                        {user ? (
                            <motion.button
                                whileTap={{
                                    scale: 0.8,
                                }}
                                type="button"
                                className="w-full p-2 rounded-full bg-orange-500 text-gray-50 my-2 hover:shadow-lg transition-all duration-150 ease-in-out"
                            >
                                Check Out
                            </motion.button>
                        ) : (
                            <motion.button
                                whileTap={{
                                    scale: 0.8,
                                }}
                                type="button"
                                className="w-full p-2 rounded-full bg-orange-500 text-gray-50 my-2 hover:shadow-lg transition-all duration-150 ease-in-out"
                            >
                                Login to check out
                            </motion.button>
                        )}
                    </div>
                </div>
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-6">
                    <img src={emptyCart} alt="" />
                    <p className="text-xl text-textColor font-semibold">Add some items to your cart</p>
                </div>
            )}
        </motion.div>
    );
};

export default CardContainer;
