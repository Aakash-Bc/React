import React, { useRef } from 'react';
import { Button, Title, Text, Overlay } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import '@mantine/carousel/styles.css';

const Home = () => {
    // Autoplay and Fade plugins initialization
    const autoplay = useRef(Autoplay({ delay: 5000 }));
    const fade = useRef(Fade());

    const images = [
        { src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b', alt: 'Mountains' },
        { src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000', alt: 'City' },
        { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', alt: 'Ocean' },
        { src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e', alt: 'Forest' },
        { src: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0', alt: 'Desert' },
    ];

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
            {/* Full-screen Background Carousel */}
            <div className="absolute inset-0 z-0">
                <Carousel
                    withIndicators={false}
                    withControls={false}
                    height="100%"
                    loop
                    slideSize="100%"
                    plugins={[autoplay.current, fade.current]}
                    classNames={{
                        root: 'h-full',
                        viewport: 'h-full',
                        container: 'h-full'
                    }}
                >
                    {images.map((image, index) => (
                        <Carousel.Slide key={index}>
                            <div className="relative h-full w-full">
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-full object-cover animate-ken-burns"
                                />
                                <Overlay color="#000" opacity={0.5} zIndex={1} />
                            </div>
                        </Carousel.Slide>
                    ))}
                </Carousel>
            </div>

            {/* Content Over the Background - Enhanced Visibility & Design */}
            <div className="relative z-10 px-4 w-full max-w-5xl animate-fade-in-up">
                <div className="bg-black/20 backdrop-blur-md rounded-[3rem] p-10 md:p-20 border border-white/10 shadow-2xl flex flex-col items-center space-y-12 transition-all duration-700 hover:bg-black/30">
                    <div className="space-y-6 text-center">
                        <Title className="text-white text-5xl md:text-8xl font-black tracking-tight drop-shadow-2xl leading-tight">
                            Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Experience</span>
                        </Title>
                        <Text className="text-white text-lg md:text-2xl font-semibold opacity-90 drop-shadow-lg leading-relaxed max-w-2xl mx-auto">
                            Discover breathtaking visuals and elegant solutions crafted for the modern world.
                        </Text>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 pt-4">
                        <Button 
                            variant="filled" 
                            size="xl" 
                            radius="xl" 
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl shadow-blue-500/20 px-12 h-16 text-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Explore Now
                        </Button>
                        <Button 
                            variant="outline" 
                            size="xl" 
                            radius="xl" 
                            className="text-white border-white/40 hover:bg-white hover:text-black hover:border-white transition-all duration-300 px-12 h-16 text-lg backdrop-blur-sm"
                        >
                            Learn More
                        </Button>
                    </div>
                </div>
            </div>

            {/* In-page Animations */}
            <style>{`
                @keyframes ken-burns {
                    from { transform: scale(1); }
                    to { transform: scale(1.1); }
                }
                .animate-ken-burns {
                    animation: ken-burns 15s ease-in-out infinite alternate;
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 1s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default Home;
