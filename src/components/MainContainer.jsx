import React, { useRef } from 'react';
import HomeContainer from './HomeContainer';
import { motion } from 'framer-motion';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import RowContainer from './RowContainer';
import { useStateValue } from '../context/StateProvider';
import MenuContainer from './MenuContainer';
import CardContainer from './CardContainer';

const MainContainer = () => {
    const [{ foodItems, cartShow }, dispatch] = useStateValue();

    const scrollRef = useRef();

    return (
        <div className="w-full h-auto flex flex-col items-center justify-center">
            <HomeContainer />

            <section className="w-full my-6">
                <div className="w-full flex items-center justify-between">
                    <p className="text-lg font-semibold text-headingColor uppercase relative before:absolute before:rounded-lg before:content before:w-20 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 ">
                        Our fresh & healthy fruits
                    </p>

                    <div className="hidden md:flex gap-3 items-center ">
                        <motion.div
                            onClick={() => {
                                scrollRef.current.left();
                            }}
                            whileTap={{
                                scale: 0.6,
                            }}
                            className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all divide-fuchsia-100 ease-in-out hover:shadow-lg flex items-center justify-center"
                        >
                            <MdChevronLeft className="text-lg text-white" />
                        </motion.div>
                        <motion.div
                            onClick={() => {
                                scrollRef.current.right();
                            }}
                            whileTap={{
                                scale: 0.6,
                            }}
                            className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all divide-fuchsia-100 ease-in-out hover:shadow-lg flex items-center justify-center"
                        >
                            <MdChevronRight className="text-lg text-white" />
                        </motion.div>
                    </div>
                </div>
                <RowContainer
                    flag={true}
                    data={foodItems?.filter((el) => el.category.toLowerCase() === 'fruits')}
                    ref={scrollRef}
                />
            </section>
            <MenuContainer />
            {cartShow && <CardContainer />}
        </div>
    );
};

export default MainContainer;
