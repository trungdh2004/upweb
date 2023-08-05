import React from 'react';
import Delivery from '../asset/delivery.png';
import HeroBg from '../asset/heroBg.png';
import { heroData } from '../utils/data';

const HomeContainer = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full" id="home">
            <div className="py-2 flex-1 flex flex-col items-start justify-start gap-6">
                <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
                    <p className="text-base text-orange-500 font-semibold">Bike Delivery</p>
                    <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
                        <img src={Delivery} alt="" className="w-full h-full object-contain" />
                    </div>
                </div>
                <p className="text-[2.3rem] lg:text-[4.2rem] font-bold tracking-wide text-headingColor">
                    The Fastest Delivery in{' '}
                    <span className="text-orange-600 text-[3rem] lg:text-[4.6rem]">Your City</span>
                </p>
                <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste voluptates illum minima omnis saepe
                    quibusdam modi eius eum necessitatibus atque inventore, corporis culpa tempora numquam, earum, vitae
                    facere eaque debitis.
                </p>
                <button
                    type="button"
                    className="text-center bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
                >
                    Order Now
                </button>
            </div>

            <div className="py-2 flex-1 flex items-center relative">
                <img src={HeroBg} alt="" className="lg:w-auto w-full lg:h-650 h-420 ml-auto" />
                <div className="w-full h-full absolute flex items-center justify-center top-0 left-0 lg:px-32 py-4 gap-2 flex-wrap ">
                    {heroData &&
                        heroData.map((n) => (
                            <div
                                key={n.id}
                                className="lg:w-190 min-w-[150px] p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
                            >
                                <img src={n.image} alt="" className="w-20 lg:w-40 -mt-10 lg:-mt-20" />
                                <p className="text-base lg:text-xl mt-2 font-semibold text-textColor lg:mt-4">
                                    {n.name}
                                </p>
                                <p className="lg:text-sm text-[12px] text-gray-500 font-semibold my-1 lg:my-3">
                                    {n.decp}
                                </p>
                                <p className="text-sm font-semibold text-headingColor">
                                    <span className="text-xs text-red-500">$</span> {n.price}
                                </p>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default HomeContainer;
