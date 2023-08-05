import React from 'react';
import { useState } from 'react';
import { IoFastFood } from 'react-icons/io5';
import { categories } from '../utils/data';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import RowContainer from './RowContainer';
import { useStateValue } from '../context/StateProvider';

const MenuContainer = () => {
    const [filter, setFilter] = useState('chicken');
    const [{ foodItems }, dispatch] = useStateValue();

    return (
        <section className="w-full my-6 " id="menu">
            <div className="">
                <p className="text-lg font-semibold text-headingColor uppercase relative before:absolute before:rounded-lg before:content before:w-20 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
                    Our Hot Dishes
                </p>

                <div className="w-full flex items-center justify-start lg:justify-center gap-8 mt-6 overflow-x-scroll scrollbar-none">
                    {categories &&
                        categories.map((el) => (
                            <motion.div
                                whileTap={{
                                    scale: 0.7,
                                }}
                                key={el.id}
                                onClick={() => {
                                    setFilter(el.name);
                                }}
                                className={`group ${
                                    filter === el.name ? 'bg-red-500' : 'bg-card'
                                } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center duration-150 transition-all hover:bg-red-500 ease-in-out`}
                            >
                                <div
                                    className={`w-10 h-10 ${
                                        filter === el.name ? 'bg-card' : 'bg-red-500'
                                    } rounded-full  group-hover:bg-card flex items-center justify-center`}
                                >
                                    <IoFastFood
                                        className={`text-card ${
                                            filter === el.name ? 'text-red-600' : 'text-card'
                                        } group-hover:text-red-600 text-lg`}
                                    />
                                </div>
                                <p
                                    className={`text-sm text-textColor group-hover:text-white ${
                                        filter === el.name ? 'text-white' : 'text-textColor'
                                    }`}
                                >
                                    {el.name}
                                </p>
                            </motion.div>
                        ))}
                </div>

                {/* menu */}
                <div className="w-full">
                    <RowContainer
                        flag={false}
                        data={foodItems.filter((el) => el.category.toLowerCase() === filter.toLowerCase())}
                    />
                </div>
            </div>
        </section>
    );
};

export default MenuContainer;
