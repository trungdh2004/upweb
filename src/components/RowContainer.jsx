import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { MdShoppingBasket } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const RowContainer = ({ flag, data }, ref) => {
    const scrollItem = useRef();
    const [{ cartItems }, dispatch] = useStateValue();

    useImperativeHandle(ref, () => {
        return {
            left() {
                scrollItem.current.scrollLeft -= 200;
            },
            right() {
                scrollItem.current.scrollLeft += 200;
            },
        };
    });

    const handleCartItem = (item) => {
        dispatch({
            type: actionType.SET_CARD_ITEMS,
            cardItems: [item, ...cartItems],
        });
    };

    

    return (
        <div
            ref={scrollItem}

            className={`w-full mt-12 mb-6  ${
                flag ? 'overflow-x-scroll scrollbar ' : 'overflow-x-hidden flex-wrap justify-center'
            } flex  gap-2 py-0 scroll-smooth`}
        >
            {data.length > 0 ? (
                data.map((el) => (
                    <div
                    
                        key={el.id}
                        className="w-275 min-w-[275px] max-h-[175px] md:w-300 md:min-w-[300px] my-10 p-2 hover:drop-shadow-lg rounded-lg drop-shadow-md bg-gray-100 backdrop-blur-lg flex flex-col items-center justify-between"
                    >
                        <div className="w-full  flex item-center justify-between flex-1">
                            <motion.img
                                whileHover={{
                                    scale: 1.1,
                                }}
                                src={el.imageURL}
                                alt=""
                                className="-mt-8 h-28 drop-shadow-2xl "
                            />
                            <motion.div
                                onClick={() => {
                                    handleCartItem(el);
                                }}
                                whileTap={{
                                    scale: 0.75,
                                }}
                                className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center cursor-pointer"
                            >
                                <MdShoppingBasket className="text-white" />
                            </motion.div>
                        </div>

                        <div className="w-full flex flex-col items-end justify-end">
                            <p className=" text-red-500 font-semibold text-base md:text-lg">{el.title}</p>
                            <p className="mt-1 text-sm text-gray-500">{el.calories}</p>
                            <div className="flex items-center gap-8">
                                <p className="text-lg text-textColor font-semibold">
                                    <span className="text-sm text-red-500">$</span>
                                    {el.price}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="h-40 w-full flex items-center justify-center">
                    <div role="status">
                        <svg
                            ariahidden="true"
                            className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default forwardRef(RowContainer);
