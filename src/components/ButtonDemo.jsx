import React, { useState } from 'react';
import Button from './common/Button';

const ButtonDemo = () => {
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
    };

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-12">
            <section>
                <h2 className="text-2xl font-bold mb-6 text-slate-800 border-b pb-2">Button Variants</h2>
                <div className="flex flex-wrap gap-4 items-center">
                    <Button variant="primary">Primary Button</Button>
                    <Button variant="gradient">Gradient Button</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost Button</Button>
                    <Button variant="danger">Danger Action</Button>
                </div>
            </section>

            <section className="bg-slate-900 p-8 rounded-3xl">
                <h2 className="text-2xl font-bold mb-6 text-white border-b border-white/10 pb-2">Glassmorphism (Dark Context)</h2>
                <div className="flex flex-wrap gap-4 items-center">
                    <Button variant="glass">Glass Button</Button>
                    <Button variant="glass" size="lg">Large Glass</Button>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-6 text-slate-800 border-b pb-2">Sizes</h2>
                <div className="flex flex-wrap gap-4 items-end">
                    <Button size="sm" variant="gradient">Small Button</Button>
                    <Button size="md" variant="gradient">Medium Button</Button>
                    <Button size="lg" variant="gradient">Large Button</Button>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-6 text-slate-800 border-b pb-2">Interactions & States</h2>
                <div className="flex flex-wrap gap-4 items-center">
                    <Button
                        variant="primary"
                        loading={loading}
                        onClick={handleClick}
                    >
                        {loading ? 'Processing...' : 'Click to Load'}
                    </Button>
                    <Button variant="primary" disabled>Disabled Button</Button>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-6 text-slate-800 border-b pb-2">Full Width</h2>
                <div className="max-w-md space-y-4">
                    <Button variant="gradient" fullWidth>Full Width Gradient</Button>
                    <Button variant="outline" fullWidth>Full Width Outline</Button>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-6 text-slate-800 border-b pb-2">With Icons (Demo)</h2>
                <div className="flex flex-wrap gap-4 items-center">
                    <Button variant="primary">
                        <span>Send Message</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11zM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493z" />
                        </svg>
                    </Button>

                    <Button variant="outline">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                        <span>Add Item</span>
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default ButtonDemo;
