import { useState, useEffect } from 'react';
import { Loader } from '@mantine/core';

const BlogPage = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [author, setAuthor] = useState("");

    // Page loading state
    const [pageLoading, setPageLoading] = useState(true);

    // Button loading state
    const [buttonLoading, setButtonLoading] = useState(false);

    const [blogs, setBlogs] = useState([
        {
            id: 1,
            title: "First Blog",
            description: "This is the first blog post.",
            category: "tech",
            author: "Aakash",
            date: "2024-06-01",
            img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=60"
        }
    ]);

    // 3 second page loading
    useEffect(() => {
        const storedBlogs = localStorage.getItem("blog");

        if (storedBlogs) {
            setBlogs(JSON.parse(storedBlogs));
        }

        const timer = setTimeout(() => {
            setPageLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const addBlog = () => {
        if (!title || !description || buttonLoading) return;

        setButtonLoading(true);

        // 2 second loading before add
        setTimeout(() => {
            const newBlog = {
                id: Date.now(),
                title: title,
                description: description,
                category: category,
                author: author,
                date: new Date().toLocaleDateString(),
                img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=60"
            };

            const updatedBlogs = [...blogs, newBlog];

            setBlogs(updatedBlogs);
            localStorage.setItem("blog", JSON.stringify(updatedBlogs));

            setTitle("");
            setDescription("");
            setCategory("");
            setAuthor("");

            setButtonLoading(false);
        }, 1000);
    };

    const deleteBlog = (id) => {
        const updatedBlogs = blogs.filter(blog => blog.id !== id);
        setBlogs(updatedBlogs);
        localStorage.setItem("blog", JSON.stringify(updatedBlogs));
    };

    // Page Loader
    if (pageLoading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <Loader color="blue" size="xl" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 flex flex-col items-center">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.4618 4.04658C14.6652 4.86901 15.8624 5.85918 17.0015 6.99832C18.1407 8.13749 19.1309 9.3347 19.9533 10.5382C20.6544 9.16072 21.0758 7.8564 21.2064 6.72484C21.371 5.29776 21.0678 4.24334 20.4122 3.58772C19.7566 2.9321 18.7022 2.62887 17.2751 2.79353C16.1435 2.92409 14.8392 3.34552 13.4618 4.04658ZM20.8687 11.9999C21.8741 10.2347 22.5142 8.47649 22.6965 6.89677C22.8915 5.20639 22.5677 3.6219 21.4729 2.52706C20.378 1.43222 18.7935 1.10838 17.1032 1.30341C15.5235 1.48568 13.7652 2.12579 12.0001 3.13117C10.235 2.12585 8.47679 1.48578 6.89713 1.30354C5.2068 1.10853 3.62236 1.43238 2.52754 2.5272C1.43272 3.62203 1.10888 5.20649 1.3039 6.89684C1.48615 8.47654 2.12623 10.2347 3.13159 11.9999C2.12632 13.765 1.48629 15.5231 1.30408 17.1027C1.10909 18.793 1.43295 20.3774 2.52774 21.4722C3.62254 22.567 5.20694 22.8909 6.89723 22.6959C8.47686 22.5137 10.235 21.8736 12.0001 20.8684C13.7652 21.8737 15.5234 22.5138 17.1031 22.696C18.7934 22.891 20.3778 22.5672 21.4727 21.4724C22.5675 20.3775 22.8913 18.7931 22.6963 17.1028C22.5141 15.5231 21.874 13.765 20.8687 11.9999ZM19.1195 11.9999C18.2825 10.6747 17.2143 9.33237 15.9409 8.05898C14.6675 6.78562 13.3252 5.71736 12.0001 4.88044C10.6751 5.71734 9.3328 6.78555 8.05951 8.05884C6.78609 9.33228 5.71778 10.6747 4.88085 11.9999C5.71776 13.3249 6.78599 14.6672 8.05932 15.9406C9.33267 17.2139 10.675 18.2822 12.0001 19.1191C13.3252 18.2822 14.6677 17.2139 15.9411 15.9404C17.2144 14.6671 18.2826 13.3249 19.1195 11.9999ZM13.4618 19.953C14.6653 19.1305 15.8625 18.1403 17.0017 17.0011C18.1408 15.862 19.1309 14.6649 19.9533 13.4616C20.6543 14.839 21.0757 16.1432 21.2062 17.2747C21.3708 18.7017 21.0676 19.7561 20.412 20.4117C19.7564 21.0673 18.702 21.3705 17.275 21.2059C16.1435 21.0754 14.8392 20.654 13.4618 19.953ZM10.5383 19.9529C9.33492 19.1305 8.13777 18.1404 6.99866 17.0012C5.85956 15.8621 4.86943 14.665 4.04702 13.4616C3.34607 14.839 2.92471 16.1432 2.79419 17.2746C2.62958 18.7016 2.93281 19.756 3.5884 20.4116C4.24399 21.0672 5.29835 21.3704 6.72534 21.2058C7.85681 21.0752 9.161 20.6539 10.5383 19.9529ZM4.04699 10.5381C4.86944 9.33463 5.85966 8.13738 6.99885 6.99819C8.13792 5.85912 9.33502 4.869 10.5384 4.0466C9.16098 3.34559 7.85673 2.9242 6.72522 2.79366C5.29819 2.62903 4.2438 2.93226 3.58821 3.58786C2.9326 4.24347 2.62937 5.29787 2.79401 6.72493C2.92456 7.85646 3.34596 9.16073 4.04699 10.5381ZM12.0002 10.2497C11.0337 10.2497 10.2502 11.0332 10.2502 11.9997C10.2502 12.9662 11.0337 13.7497 12.0002 13.7497C12.9667 13.7497 13.7502 12.9662 13.7502 11.9997C13.7502 11.0332 12.9667 10.2497 12.0002 10.2497ZM8.7502 11.9997C8.7502 10.2048 10.2053 8.74971 12.0002 8.74971C13.7951 8.74971 15.2502 10.2048 15.2502 11.9997C15.2502 13.7946 13.7951 15.2497 12.0002 15.2497C10.2053 15.2497 8.7502 13.7946 8.7502 11.9997Z" fill="currentColor"/></svg>
            {/* Header */}
            <div className="space-y-4 border-b border-slate-100 pb-8 text-center w-full">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                    Our <span className="text-blue-600">Blog</span>
                </h1>
                <p className="text-slate-500 max-w-2xl mx-auto">
                    Share your thoughts and explore stories from our community.
                    Simple, clean, and insightful.
                </p>
            </div>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3.00297 12.3566C3.29568 12.6497 3.29539 13.1246 3.00232 13.4173L2.84853 13.5709C2.71716 13.7021 2.71716 13.9144 2.84853 14.0456C2.9804 14.1774 3.19458 14.1774 3.32646 14.0456L5.0182 12.356C5.31127 12.0632 5.78614 12.0635 6.07886 12.3566C6.37157 12.6497 6.37128 13.1246 6.07821 13.4173L4.38647 15.107C3.66896 15.8236 2.50602 15.8236 1.78851 15.107C1.0705 14.3898 1.0705 13.2267 1.78851 12.5096L1.94231 12.356C2.23538 12.0632 2.71025 12.0635 3.00297 12.3566Z" fill="currentColor"/><path d="M7.85705 13.3529C8.14994 13.6458 8.14994 14.1206 7.85705 14.4135L5.74014 16.5304C5.44725 16.8233 4.97238 16.8233 4.67948 16.5304C4.38659 16.2375 4.38659 15.7627 4.67948 15.4698L6.79639 13.3529C7.08928 13.06 7.56415 13.06 7.85705 13.3529Z" fill="currentColor"/><path d="M10.6328 16.1252C10.9257 16.4181 10.9257 16.893 10.6328 17.1859L8.53033 19.2883C8.23744 19.5812 7.76256 19.5812 7.46967 19.2883C7.17678 18.9954 7.17678 18.5205 7.46967 18.2276L9.5721 16.1252C9.86499 15.8323 10.3399 15.8323 10.6328 16.1252Z" fill="currentColor"/><path d="M7.47223 16.5211C7.76184 16.8172 7.75656 17.292 7.46042 17.5816L5.75085 19.2536C5.45472 19.5432 4.97987 19.5379 4.69026 19.2418C4.40064 18.9457 4.40592 18.4708 4.70206 18.1812L6.41163 16.5093C6.70777 16.2196 7.18261 16.2249 7.47223 16.5211Z" fill="currentColor"/><path d="M11.6063 17.9262C11.8991 18.2193 11.8988 18.6942 11.6057 18.9869L9.91396 20.6766C9.78259 20.8078 9.78259 21.0201 9.91396 21.1513C10.0458 21.283 10.26 21.283 10.3919 21.1513L10.5457 20.9977C10.8388 20.705 11.3136 20.7053 11.6063 20.9984C11.8991 21.2914 11.8988 21.7663 11.6057 22.059L11.4519 22.2126C10.7344 22.9293 9.57145 22.9293 8.85394 22.2126C8.13593 21.4955 8.13593 20.3324 8.85394 19.6152L10.5457 17.9256C10.8388 17.6329 11.3136 17.6331 11.6063 17.9262Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M17.992 1.25005L18.1257 1.25011L18.6709 1.25011C19.4245 1.25008 20.064 1.25005 20.5742 1.31835C21.1169 1.39101 21.6242 1.55306 22.0343 1.96148C22.4449 2.37034 22.6082 2.87675 22.6814 3.41869C22.7501 3.92731 22.75 4.56474 22.75 5.31465L22.75 5.85813L22.7501 5.99204C22.7506 6.89302 22.7511 7.55278 22.4995 8.15745C22.2482 8.76181 21.7798 9.22757 21.1396 9.86427L21.0445 9.95889L18.7785 12.2153L18.8178 12.2759C19.1587 12.8017 19.4379 13.2324 19.64 13.6048C19.8504 13.9925 20.0034 14.3624 20.0648 14.7749C20.1625 15.4309 20.0741 16.1046 19.8157 16.7229C19.7171 16.9587 19.549 17.2011 19.3822 17.4159C19.2064 17.6424 18.9922 17.8881 18.7635 18.1371C18.3085 18.6321 17.7629 19.1755 17.2803 19.6561L17.2733 19.6631L17.2001 19.7359C16.5258 20.4074 15.356 20.1913 14.9951 19.2872C14.7962 18.7889 14.7185 18.5976 14.6218 18.4215C14.5313 18.2568 14.4276 18.0997 14.3115 17.9518C14.1891 17.7958 14.0459 17.6509 13.6778 17.2843L13.2548 16.9139C13.1838 16.9215 13.1119 16.9253 13.0389 16.9253C12.46 16.9253 11.9864 16.6831 11.5504 16.3519C11.1409 16.0408 10.6885 15.5903 10.1559 15.0598L8.88948 13.7987C8.35683 13.2684 7.90436 12.8178 7.5919 12.4101C7.25931 11.976 7.01482 11.5028 7.01482 10.9234C7.01482 10.836 7.02042 10.7502 7.03134 10.6659L6.34386 9.98128C6.30157 9.93917 6.28523 9.92292 6.26917 9.90735C5.95301 9.60096 5.58096 9.35721 5.17285 9.18927C5.15212 9.18073 5.13067 9.17223 5.07507 9.15023L4.74565 9.01985C3.79897 8.64519 3.54286 7.42334 4.26681 6.70246L4.27379 6.6955C4.75643 6.2149 5.30208 5.67157 5.79928 5.21855C6.04927 4.99077 6.29596 4.77757 6.52336 4.60252C6.73915 4.43639 6.98217 4.26928 7.21827 4.17144C7.83797 3.91463 8.51283 3.8269 9.1698 3.92387C9.5826 3.9848 9.95325 4.13671 10.3423 4.34611C10.7162 4.54732 11.1486 4.8253 11.6768 5.16484L11.7425 5.20708L14.012 2.94712L14.1066 2.85293C14.7465 2.21486 15.2139 1.74886 15.8199 1.49889C16.4256 1.24906 17.0864 1.24948 17.992 1.25005ZM17.6921 13.2972C17.9734 13.7323 18.1754 14.0508 18.3217 14.3204C18.4875 14.6259 18.5554 14.8223 18.5812 14.9958C18.6374 15.3731 18.5878 15.7709 18.4317 16.1445C18.4128 16.1898 18.3465 16.3039 18.1974 16.4961C18.0573 16.6765 17.8739 16.8882 17.6589 17.1221C17.2539 17.5629 16.7662 18.051 16.3015 18.5139C16.1635 18.1697 16.0627 17.9291 15.9366 17.6994C15.8068 17.4632 15.658 17.2379 15.4916 17.0258C15.3039 16.7866 15.0892 16.5729 14.7525 16.2377L14.7163 16.2016C14.75 16.1735 14.7836 16.145 14.8171 16.1162C15.1468 15.8318 15.516 15.4641 15.9405 15.0414L17.6921 13.2972ZM18.1257 2.75011C17.0287 2.75011 16.6883 2.76329 16.3919 2.88557C16.0958 3.0077 15.8462 3.23754 15.0705 4.01002L9.98374 9.07532C9.54925 9.50797 9.22322 9.83317 8.97823 10.1124C8.73189 10.3932 8.6135 10.5774 8.55796 10.7154C8.52633 10.7939 8.51482 10.8586 8.51482 10.9234C8.51482 11.041 8.55194 11.1967 8.78258 11.4978C9.02638 11.8159 9.40545 12.1957 9.98374 12.7715L10.0519 12.8394L11.3149 11.5817C11.6084 11.2895 12.0833 11.2905 12.3756 11.584C12.6679 11.8775 12.6669 12.3524 12.3733 12.6446L11.1148 13.8979L11.1785 13.9613C11.7568 14.5371 12.1382 14.9146 12.4578 15.1575C12.76 15.3871 12.9179 15.4253 13.0389 15.4253C13.1008 15.4253 13.1612 15.4152 13.2315 15.3893C13.3677 15.3392 13.5518 15.2267 13.8373 14.9804C14.1217 14.7351 14.4536 14.4052 14.8994 13.9613L19.9861 8.896C20.7622 8.12315 20.9924 7.87509 21.1146 7.58136C21.2366 7.28796 21.25 6.95116 21.25 5.85812L21.25 5.3653C21.25 4.55083 21.2484 4.01574 21.1949 3.61939C21.1443 3.24494 21.0602 3.10834 20.9759 3.02438C20.8911 2.93998 20.7527 2.85563 20.3751 2.80508C19.9763 2.75169 19.4382 2.75011 18.6206 2.75011H18.1257ZM18.3474 5.63287C17.3949 4.68438 15.8519 4.68438 14.8994 5.63287C13.9451 6.58311 13.9451 8.12508 14.8994 9.07532C15.8519 10.0238 17.3949 10.0238 18.3474 9.07532C19.3016 8.12508 19.3016 6.58311 18.3474 5.63287ZM15.9578 6.69577C16.325 6.33008 16.9217 6.33008 17.289 6.69577C17.6545 7.05972 17.6545 7.64847 17.289 8.01242C16.9217 8.37811 16.325 8.37811 15.9578 8.01242C15.5923 7.64847 15.5923 7.05972 15.9578 6.69577ZM10.6542 6.29082C10.2199 6.01237 9.9013 5.81219 9.63147 5.66697C9.3244 5.5017 9.12633 5.43371 8.95076 5.40779C8.56998 5.35159 8.16887 5.4012 7.79253 5.55716C7.74625 5.57634 7.63125 5.64262 7.43837 5.79111C7.25709 5.93066 7.04446 6.11327 6.80953 6.32733C6.36887 6.72884 5.88119 7.21193 5.41817 7.67281L5.62705 7.75548L5.63208 7.75747C5.68116 7.77689 5.71245 7.78928 5.74367 7.80212C6.32744 8.04235 6.86009 8.39121 7.31306 8.83019C7.33737 8.85374 7.36126 8.87754 7.39886 8.91497L7.73886 9.25355C7.77541 9.20985 7.81273 9.16641 7.85067 9.12317C8.13281 8.80158 8.49446 8.44146 8.90924 8.02843L10.6542 6.29082Z" fill="currentColor"/></svg>
            {/* Create Post Form */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md min-h-[400px] flex flex-col shrink-0 justify-center">
                <h2 className="text-xl font-black text-blue-600 mb-6 text-center uppercase tracking-widest underline decoration-blue-200 underline-offset-8">
                    Create Post
                </h2>

                <div className="flex flex-col gap-4 overflow-y-auto pr-1 custom-scrollbar">
                    <input
                        type="text"
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                        value={title}
                        placeholder="Blog Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <textarea
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all h-24 resize-none"
                        value={description}
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                            type="text"
                            className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                            value={category}
                            placeholder="Category"
                            onChange={(e) => setCategory(e.target.value)}
                        />

                        <input
                            type="text"
                            className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                            value={author}
                            placeholder="Author"
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>
                </div>

                {/* Publish Button */}
                <button
                    className={`mt-6 text-white font-black py-3 px-6 rounded-xl shadow-lg transition-all text-sm uppercase tracking-wider
                    ${buttonLoading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
                        }`}
                    onClick={addBlog}
                    disabled={buttonLoading}
                >
                    {buttonLoading ? (
                        <div className="flex justify-center items-center gap-2">
                            <Loader color="white" size="sm" />
                            Publishing...
                        </div>
                    ) : (
                        "PUBLISH"
                    )}
                </button>
            </div>


            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full justify-items-center">
                {blogs.map((items) => (
                    <div
                        key={items.id}
                        className="group bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 max-w-sm w-full relative"
                    >
                        {/* Delete Button */}
                        <button
                            onClick={() => deleteBlog(items.id)}
                            className="absolute top-4 right-4 bg-red-50 text-red-500 p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all duration-300 z-10"
                            title="Delete Blog"
                        >
                            ✕
                        </button>

                        {items.img && (
                            <div className="aspect-video mb-6 overflow-hidden rounded-xl">
                                <img
                                    src={items.img}
                                    alt={items.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        )}

                        <div className="space-y-3">
                            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
                                {items.category || 'General'}
                            </span>

                            <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                                {items.title}
                            </h3>

                            <p className="text-slate-600 text-sm line-clamp-3">
                                {items.description}
                            </p>

                            <div className="pt-4 flex items-center justify-between border-t border-slate-50">
                                <span className="text-sm font-medium text-slate-500">
                                    By {items.author || 'Anonymous'}
                                </span>

                                <span className="text-xs text-slate-400">
                                    {items.date}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogPage;