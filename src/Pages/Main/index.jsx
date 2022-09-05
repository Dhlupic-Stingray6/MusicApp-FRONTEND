import React from 'react'
import { Link } from "react-router-dom"
import { Button } from '../../Components';
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import CopyrightIcon from "@mui/icons-material/Copyright";
import {default  as logo} from "../favicon.jpg"

import styles from "./styles.module.scss";


const navLinks = [
	{ name: "Contact", link: "/contact"},
	{ name: "Sign up", link: "/signup" },
	{ name: "Log in", link: "/login" },
];





const footerLinks = [
	"legal",
	"privacy center",
	"privacy policy",
	"Cookies",
	"About ads",
	"Additional CA Privacy Disclosures",
];

const footerIcons = [<InstagramIcon />, <TwitterIcon />, <FacebookIcon />];






const Main = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.navbar_container}>
        <div/>

        
        <div className={styles.nav_links}>
          {navLinks.map((link, index) => (
            <Link key={index} to={link.link} className={styles.links}>
              {link.name}
            </Link>
          ))}

        </div>
      </nav>
      <main className={styles.main_container}>
				<div className={styles.main}>
					<h1>Welcome</h1>
					
					<Link to="/signup">
						<Button
              label="GET STARTED"
              style= {{ color: "white", width: "18rem", fontSize: "1.4rem" }}
            />
					
					</Link>
				</div>
			</main>
      <footer className={styles.footer_container}>
				<div className={styles.footer_1}>
					<Link to="/" className={styles.footer_logo}>
						<img src={logo} alt="logo" />
					</Link>
					
						
					
					
					<div className={styles.footer_icons}>
						{footerIcons.map((icon, index) => (
							<div className={styles.icon} key={index}>
								{icon}
							</div>
						))}
					</div>
				</div>
				<div className={styles.footer_2}>
					<div className={styles.footer_2_links}>
						{footerLinks.map((link, index) => (
							<div className={styles.links} key={index}>
								{link}
							</div>
						))}
					</div>
					<div className={styles.copy_right}>
						<CopyrightIcon />
						<span>2022 Hlupi</span>
					</div>
				</div>
			</footer>
    </div>
  )
}

export default Main