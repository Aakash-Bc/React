import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-500 text-sm font-medium">
          © 2026 YourBrand. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm text-slate-400 font-medium">
          <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;