import { FaEnvelope, FaInstagram, FaMapMarkerAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function ContactSection() {
  return (
    <section className="bg-[#677365] text-[#f7d486] py-16 px-6 text-center">
      
      <h2 className="text-3xl font-bold mb-10">Contact Us</h2>

      
      <div className="max-w-[600px] mx-auto text-left space-y-8">

        
        <div className="flex items-center gap-4">
          <FaEnvelope size={35} />
          <div>
            <p className="text-xl font-semibold">Email</p>
            <p className="text-[#f7d486] opacity-90">nalshiradraws@gmail.com</p>
          </div>
        </div>

        
        <div className="flex items-center gap-4">
          <FaXTwitter size={35} />
          <div>
            <p className="text-xl font-semibold">Twitter/X</p>
            <a
              href="https://x.com/nalshiradraws"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f7d486] opacity-90 hover:underline"
            >
              @nalshiradraws
            </a>
          </div>
        </div>

        
        <div className="flex items-center gap-4">
          <FaInstagram size={35} />
          <div>
            <p className="text-xl font-semibold">Instagram</p>
            <a
              href="https://www.instagram.com/nalshira_draws/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f7d486] opacity-90 hover:underline"
            >
              @nalshira_draws
            </a>
          </div>
        </div>

        
        <div className="flex items-center gap-4">
          <FaMapMarkerAlt size={35} />
          <div>
            <p className="text-xl font-semibold">Office</p>
            <p className="text-[#f7d486] opacity-90">
              UP AyalaLand TechnobHub Bldg M
            </p>
          </div>
        </div>
      </div>

      
      <div className="mt-10 flex justify-center">
        <iframe
          title="UP Ayala Technohub Building M Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.771906528799!2d121.04759631535536!3d14.661233089769266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b70f7c6fc3b1%3A0xa2bf1ee5a41c8b65!2sUP%20Ayala%20Land%20Tech%20Hub%20Bldg.%20M!5e0!3m2!1sen!2sph!4v1730025855555!5m2!1sen!2sph"
          width="100%"
          height="350"
          style={{ border: 0, borderRadius: "12px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      
      <footer className="mt-10 text-[#f7d486] opacity-90">
        Pluck & Brew Copyright © 2022–2025 Nalshira Games
      </footer>
    </section>
  );
}
