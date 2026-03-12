import React from 'react';
import { Button } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

const Home = () => {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50">
            <div className="text-center space-y-4">
                <h1 className="text-5xl font-black text-slate-900 tracking-tight">
                    Welcome to our <span className="text-indigo-700">Website</span>
                </h1>
                <p className="text-slate-700 text-lg font-medium">
                    Experience simplicity and elegance in every click.
                </p>
            </div>
            <Button variant="filled" color="orange">Button</Button>
            <Carousel withIndicators height={200} width={100}>
                <Carousel.Slide>Hello i am from the firsts slide</Carousel.Slide>
                <Carousel.Slide>Hello i am from the second slide</Carousel.Slide>
                <Carousel.Slide>Hello i am from the third slide</Carousel.Slide>
                {/* ...other slides */}
            </Carousel>

        </div>
    );
};

export default Home;
