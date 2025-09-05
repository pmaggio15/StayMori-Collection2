import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useClerk, useUser, UserButton } from '@clerk/clerk-react';

const BookIcon = () => (
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
    </svg>
)

const Navbar = ({ onOpenHotelReg }) => {
    const navLinks = [
        { name: 'Home', path: '/', type: 'link' },
        { name: 'Hotels', path: '/rooms', type: 'link' },
        { name: 'Experience', path: '/experience', type: 'link' },
        { name: 'Register', action: onOpenHotelReg, type: 'button' },
    ];

    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    
    const {openSignIn} = useClerk()
    const {user} = useUser()
    const navigate = useNavigate()
    const location = useLocation()

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when clicking outside
    React.useEffect(() => {
        const handleClickOutside = () => {
            if (isMenuOpen) setIsMenuOpen(false);
        };
        
        if (isMenuOpen) {
            document.addEventListener('click', handleClickOutside);
        }
        
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isMenuOpen]);

    return (
        <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-8 lg:px-16 xl:px-24 transition-all duration-300 z-50 ${
            isScrolled 
                ? "bg-white/96 backdrop-blur-xl shadow-lg border-b border-gray-200/50 py-3" 
                : "bg-gradient-to-r from-gray-600/80 via-gray-900/80 to-gray-600/80 py-4 md:py-6"
        }`}>
            {/* Logo */}
            <Link to='/' className="flex items-center space-x-2 group">
                <div className={`p-3 rounded-xl transition-all duration-300 ${
                    isScrolled ? 'bg-gray-800 shadow-sm' : 'bg-white/90 backdrop-blur-sm shadow-lg'
                }`}>
                    <img 
                        src={assets.logo} 
                        alt="Hotel Logo" 
                        className={`h-12 w-24 transition-all duration-300 ${
                            isScrolled ? 'brightness-0 invert opacity-90' : 'opacity-100'
                        }`} 
                    />
                </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
                {navLinks.map((link, i) => (
                    link.type === 'link' ? (
                        <Link 
                            key={i} 
                            to={link.path} 
                            className={`relative group py-2 px-1 text-medium font-medium transition-colors duration-300 ${
                                isScrolled ? 'text-gray-700 hover:text-slate-600' : 'text-white hover:text-white'
                            }`}
                        >
                            {link.name}
                            <div className={`absolute bottom-0 left-0 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-full ${
                                isScrolled ? 'bg-slate-500' : 'bg-white'
                            }`} />
                        </Link>
                    ) : (
                        <button 
                            key={i} 
                            onClick={link.action}
                            className={`relative group py-2 px-1 text-medium font-medium transition-colors duration-300 ${
                                isScrolled ? 'text-gray-700 hover:text-slate-600' : 'text-white hover:text-white'
                            }`}
                        >
                            {link.name}
                            <div className={`absolute bottom-0 left-0 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-full ${
                                isScrolled ? 'bg-slate-500' : 'bg-white'
                            }`} />
                        </button>
                    )
                ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
                {/* Search Button */}
                <button 
                    className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-105 ${
                        isScrolled 
                            ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-800' 
                            : 'text-white hover:bg-white/10 hover:text-white'
                    }`}
                    aria-label="Search hotels"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>

                {/* Dashboard Link */}
                <Link 
                    className={`cursor-not-allowed px-4 py-2 text-sm font-medium rounded-xl border transition-all duration-300 hover:scale-105 ${
                        isScrolled 
                            ? 'border-gray-300 text-gray-700 hover:bg-gray-50' 
                            : 'border-white/30 text-white hover:bg-white/10'
                    }`}
                >
                    Dashboard
                </Link>

                {/* User Button or Sign In */}
                {user ? 
                (<UserButton>
                    <UserButton.MenuItems>
                        <UserButton.Action label='My Bookings' labelIcon={<BookIcon/>} onClick={() => navigate('/my-bookings') } />
                    </UserButton.MenuItems>
                </UserButton>)
                :
                (<button onClick={openSignIn} className={`px-6 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg ${
                    isScrolled 
                        ? 'bg-slate-600 text-white hover:bg-slate-700 shadow-gray-600/25' 
                        : 'bg-white text-gray-900 hover:bg-gray-100 shadow-white/25'
                }`}>
                    Sign In
                </button>)
                }
            </div>

            {/* Mobile Menu Button and User Button */}
            <div className="flex items-center space-x-3 lg:hidden">
                {/* Mobile User Button */}
                {user && 
                <UserButton>
                    <UserButton.MenuItems>
                        <UserButton.Action label='My Bookings' labelIcon={<BookIcon/>} onClick={() => navigate('/my-bookings') } />
                    </UserButton.MenuItems>
                </UserButton>}
                
                {/* Mobile Search */}
                <button 
                    className={`p-2 rounded-lg transition-colors duration-300 ${
                        isScrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                    }`}
                    aria-label="Search"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>

                {/* Hamburger Menu */}
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsMenuOpen(!isMenuOpen);
                    }}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                        isScrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                    }`}
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                >
                    <div className="relative w-5 h-5">
                        <span className={`absolute block w-5 h-0.5 bg-current transform transition-all duration-300 ${
                            isMenuOpen ? 'rotate-45 top-2' : 'top-1'
                        }`} />
                        <span className={`absolute block w-5 h-0.5 bg-current top-2 transition-opacity duration-300 ${
                            isMenuOpen ? 'opacity-0' : 'opacity-100'
                        }`} />
                        <span className={`absolute block w-5 h-0.5 bg-current transform transition-all duration-300 ${
                            isMenuOpen ? '-rotate-45 top-2' : 'top-3'
                        }`} />
                    </div>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] lg:hidden" 
                     onClick={() => setIsMenuOpen(false)} />
            )}

            {/* Mobile Menu */}
            <div className={`fixed top-0 right-0 w-80 max-w-[85vw] h-screen bg-white shadow-2xl transform transition-transform duration-300 z-[9999] lg:hidden ${
                isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}>
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold font__playfair text-gray-800">StayMori Collection</span>
                    </div>
                    {user && (
                            <img 
                                src={user.imageUrl} 
                                alt={user.fullName || user.firstName || 'Profile'} 
                                className="w-8 h-8 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                            />
                        )}
                    <button 
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Close menu"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu Content */}
                <div className="flex flex-col h-full">
                    <div className="flex-1 py-6 overflow-y-auto min-h-0">
                        {navLinks.map((link, i) => (
                            link.type === 'link' ? (
                                <Link 
                                    key={i} 
                                    to={link.path} 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-slate-600 transition-colors duration-200 font-medium"
                                >
                                    {link.name}
                                </Link>
                            ) : (
                                <button 
                                    key={i} 
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        link.action();
                                    }}
                                    className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-slate-600 transition-colors duration-200 font-medium w-full text-left"
                                >
                                    {link.name}
                                </button>
                            )
                        ))}
                        
                        {/* Only show Dashboard if user is logged in */}
                        {user && (
                            <Link 
                                to="/dashboard"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center px-6 py-4 mx-6 mt-4 text-center text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                            >
                                Dashboard
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Footer - FORCED TO BOTTOM */}
                    <div className="flex-shrink-0 p-6 border-t border-gray-100 bg-white sticky bottom-0">
                        {user ? (
                            <div className="text-center text-gray-600 text-sm">
                                Profile menu available in top bar
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <button 
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        openSignIn();
                                    }}
                                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-white hover:text-[#8b8952] border border-blue-600 hover:border-[#8b8952] transition-colors duration-200"
                                >
                                    Sign In with Clerk
                                </button>
                                <p className="text-xs text-center text-gray-500">Join StayMori Collection</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar