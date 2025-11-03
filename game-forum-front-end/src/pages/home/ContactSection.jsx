import { FaEnvelope, FaInstagram, FaMapMarkerAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function ContactSection() {
  return (
    <div className="bg-[#677365] text-[#f7d486] py-16 px-8 md:px-20">
      
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
        
        <section className="flex flex-col justify-center md:justify-start flex-1">
          <h2 className="text-3xl font-bold mb-10 text-left">Contact Us</h2>

          <div className="space-y-7">
            
            <div className="flex items-center gap-4">
              <FaEnvelope size={28} className="flex-shrink-0" />
              <div>
                <p className="text-lg font-semibold text-left leading-none">Email</p>
                <p className="text-[#f7d486] opacity-90 leading-tight">
                  nalshiradraws@gmail.com
                </p>
              </div>
            </div>

            
            <div className="flex items-center gap-4">
              <FaXTwitter size={28} className="flex-shrink-0" />
              <div>
                <p className="text-lg text-left font-semibold leading-none">Twitter/X</p>
                <a
                  href="https://x.com/nalshiradraws"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#f7d486] opacity-90 hover:underline leading-tight"
                >
                  @nalshiradraws
                </a>
              </div>
            </div>

            
            <div className="flex items-center gap-4">
              <FaInstagram size={28} className="flex-shrink-0" />
              <div>
                <p className="text-lg text-left font-semibold leading-none">Instagram</p>
                <a
                  href="https://www.instagram.com/nalshira_draws/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#f7d486] opacity-90 hover:underline leading-tight"
                >
                  @nalshira_draws
                </a>
              </div>
            </div>

            
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt size={28} className="flex-shrink-0" />
              <div>
                <p className="text-lg text-left font-semibold leading-none">Office</p>
                <p className="text-[#f7d486] opacity-90 leading-tight">
                  UP AyalaLand Technobhub Bldg M
                </p>
              </div>
            </div>
          </div>
        </section>

        
        <section className="flex-shrink-0 flex justify-center md:justify-end md:self-center">
          <iframe
            title="UP Ayala Technohub Building M Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.771906528799!2d121.04759631535536!3d14.661233089769266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b70f7c6fc3b1%3A0xa2bf1ee5a41c8b65!2sUP%20Ayala%20Land%20Tech%20Hub%20Bldg.%20M!5e0!3m2!1sen!2sph!4v1730025855555!5m2!1sen!2sph"
            width="320"
            height="260"
            className="rounded-xl"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="mt-10 text-center text-[#f7d486] opacity-90">
        Pluck & Brew Copyright © 2022–2025 Nalshira Games
      </footer>
    </div>
  );
}
