import appstore from '../../assets/badges/appstore badges.png'
import playstore from '../../assets/badges/google-play-badge.png'
import appgallery from '../../assets/badges/app galery.png'
import cod from '../../assets/media logo/cod.png'
import esewa from '../../assets/media logo/esewa-removebg-preview.png'
import mastercard from '../../assets/media logo/mastercard-removebg-preview.png'
import visa from '../../assets/media logo/visa-removebg-preview.png'
import imepay from '../../assets/media logo/imepay-removebg-preview.png'
import pci from '../../assets/media logo/pci-removebg-preview.png'
import facebook from '../../assets/media logo/Facebook-Logo.png'
import instagram from '../../assets/media logo/instagram_logo.png'
import youtube from '../../assets/media logo/youtube_logo.png'
import webpage from '../../assets/media logo/web_logo.png'



const Footer = () => {
  return (
    <div>
        <div className='grid gap-10'>
            {/* upper Section  */}
            <div className='flex justify-around'>
                {/* customer care section  */}
                <div>
                    <ul>
                        <h2 className='font-semibold'>Customer Care</h2>
                        <li className='hover:underline cursor-pointer'><a href="">Help Center</a></li>
                        <li className='hover:underline cursor-pointer'><a href="">How to Buy</a></li>
                        <li className='hover:underline cursor-pointer'><a href="">Retruns & Refunds</a></li>
                        <li className='hover:underline cursor-pointer'><a href="">Contact Us</a></li>
                    </ul>
                </div>

                {/* Daraz section  */}
                <div>
                    <ul>
                        <h2 className='font-semibold'>Daraz</h2>
                        <li className='hover:underline cursor-pointer'><a href="">About Daraz</a></li>
                        <li className='hover:underline cursor-pointer'><a href="">Careers</a></li>
                        <li className='hover:underline cursor-pointer'><a href="">Daraz Blogs</a></li>
                        <li className='hover:underline cursor-pointer'><a href="">Terms & Conditions</a></li>
                        <li className='hover:underline cursor-pointer'><a href="">Privacy Policy</a></li>
                        <li className='hover:underline cursor-pointer'><a href="">Digital Payments</a></li>
                        <li className='hover:underline cursor-pointer'><a href="">Daraz Customer University</a></li>
                        <li className='hover:underline cursor-pointer'><a href="">Daraz Affiliate Program</a></li>
                    </ul>
                </div>

                {/* Download link section */}
                <div>
                    <ul className=''>
                        <h2 className='font-semibold'>Download Link</h2>
                        <li><a href=""><img src={appstore} alt="" className='w-28'/></a></li>
                        <li><a href=""><img src={playstore} alt="" className='w-28'/></a></li>
                        <li><a href=""><img src={appgallery} alt="" className='w-28'/></a></li>
                    </ul>
                </div>
            </div>

            {/* Lower Section  */}
            <div className='flex justify-around'>
                {/* Payment Method Section  */}
                <div>
                        <h2 className='font-semibold'>payment partners</h2>
                    <ul className='grid grid-cols-3 gap-3 justify-center items-center'>
                        <li><a href=""><img className='w-20' src={cod} alt="" /></a></li>
                        <li><a href=""><img className='w-20' src={visa} alt="" /></a></li>
                        <li><a href=""><img className='w-20' src={mastercard} alt="" /></a></li>
                        <li><a href=""><img className='w-20' src={esewa} alt="" /></a></li>
                        <li><a href=""><img className='w-20' src={imepay} alt="" /></a></li>
                    </ul>
                </div>

                {/* verified by section  */}
                <div>
                    <ul>
                        <h2 className='font-semibold'>Verified by</h2>
                        <li><a href=""><img className='w-24' src={pci} alt="" /></a></li>
                    </ul>
                </div>

                {/* social media section  */}
                <div>
                        <h2 className='font-semibold'>social media</h2>
                    <ul className='flex justify-center items-center'>
                        <li><a href=""><img src={facebook} alt="" className='w-20'/></a></li>
                        <li><a href=""><img src={instagram} alt="" className='w-16'/></a></li>
                        <li><a href=""><img src={youtube} alt="" className='w-20'/></a></li>
                        <li><a href=""><img src={webpage} alt="" className='w-14'/></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer