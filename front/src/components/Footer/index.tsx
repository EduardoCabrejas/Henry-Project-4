import Image from "next/image";
import Link from "next/link";
import fb from "../../../public/images/face.png";
import git from "../../../public/images/git.png";
import insta from "../../../public/images/insta.png";
import link from "../../../public/images/link.png";
import tw from "../../../public/images/twitt.png";
import wpp from "../../../public/images/wpp.png";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className="w-full grid grid-cols-2 gap-2 bg-gradient-to-br from-darkblue2 via-lightblue2 to-darkblue1 font-semibold p-2 overflow-auto">
      <div>
        <p className="text-lightblue1 stroke-v text-sm md:text-lg">2024 - © Todos los derechos reservados</p>
        <h1 className="text-xs md:text-sm">About Us</h1>
        <p className="text-xs">
          We are starting our businness into the virtual world, so we hope can enjoy our website, the visual and if something is interesting for you,
          can acomplish your wish.
        </p>
      </div>
      <div>
        <h1 className="text-center m-1">Follow Us</h1>
        <div className="grid grid-cols-2 gap-1 md:grid-cols-6">
        <div className="flex flex-col justify-center items-center">
          <Link href="https://www.facebook.com/educabre19">
            <Image className={styles.sites} src={fb} alt="Facebook"/>
          </Link>
            <p className="text-xs md:text-sm">Facebook</p>
          </div>
          <div className="flex flex-col items-center">
            <Link href="https://github.com/EduardoCabrejas">
            <Image className={styles.sites} src={git} alt="GitHub"/>
            </Link>
            <p className="text-xs md:text-sm">GitHub</p>
          </div>
          <div className="flex flex-col items-center">
            <Link href="https://www.instagram.com/educabre19/">
            <Image className={styles.sites} src={insta} alt="Instagram"/>
            </Link>
            <p className="text-xs md:text-sm">Instagram</p>
          </div>
          <div className="flex flex-col items-center">
            <Link href="https://www.linkedin.com/in/eduardo-cabrejas/">
            <Image className={styles.sites} src={link} alt="Linkedin"/>
            </Link>
            <p className="text-xs md:text-sm">Linkedin</p>
          </div>
          <div className="flex flex-col items-center">
            <Link href="https://x.com/Edu_Cabrejas" target="_blank">
            <Image className={styles.sites} src={tw} alt="Twitter"/>
            </Link>
            <p className="text-xs md:text-sm">Twitter</p>
          </div>
          <div className="flex flex-col items-center">
            <Link href="https://wa.me/542266545426">
            <Image className={styles.sites} src={wpp} alt="Whatsapp"/>
            </Link>
            <p className="text-xs md:text-sm">Whatsapp</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
