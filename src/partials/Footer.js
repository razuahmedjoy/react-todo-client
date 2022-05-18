import React from 'react';

const Footer = () => {
    return (
        <div>
            <footer className="footer footer-center p-4 bg-base-300 text-base-content">
                <div>
                    <p>Copyright &copy; {new Date().getFullYear()} - Developed by Razu Ahmed Joy</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;