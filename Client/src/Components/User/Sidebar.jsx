import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="userProfile max-w-screen-sm flex flex-nowrap">
            <div className="profile-left p-4 bg-gray-100 border-r">
                <span className="username text-lg font-semibold">Welcome, Ayush Khadka</span>
                <div className="manageAccount mt-4">
                    <span className="text-lg font-medium">Manage My Account</span>
                    <ul className="mt-2 list-disc pl-4">
                        <li><Link to="/profile" className="text-blue-500 hover:underline">My Profile</Link></li>
                        <li><Link to="/address-book" className="text-blue-500 hover:underline">Address Book</Link></li>
                        <li><Link to="/payment-options" className="text-blue-500 hover:underline">My Payment Options</Link></li>
                    </ul>
                </div>
                <div className="my-orders mt-4">
                    <span className="text-lg font-medium">My Orders</span>
                    <ul className="mt-2 list-disc pl-4">
                        <li><Link to="/orders" className="text-blue-500 hover:underline">My Orders</Link></li>
                        <li><Link to="/returns" className="text-blue-500 hover:underline">My Returns</Link></li>
                        <li><Link to="/cancellations" className="text-blue-500 hover:underline">My Cancellations</Link></li>
                    </ul>
                </div>
                <div className="my-reviews mt-4">
                    <span className="text-lg font-medium">My Reviews</span>
                    <ul className="mt-2 list-disc pl-4">
                        <li><Link to="/reviews" className="text-blue-500 hover:underline">My Reviews</Link></li>
                    </ul>
                </div>
                <div className="wishlist mt-4">
                    <span className="text-lg font-medium">My Wishlist & Followed Stores</span>
                    <ul className="mt-2 list-disc pl-4">
                        <li><Link to="/wishlist" className="text-blue-500 hover:underline">My Wishlist</Link></li>
                    </ul>
                </div>
                <div className="sell-on-daraz mt-4">
                    <span className="text-lg font-medium">Sell On Daraz</span>
                    <ul className="mt-2 list-disc pl-4">
                        <li><Link to="/sell-on-daraz" className="text-blue-500 hover:underline">Sell On Daraz</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
