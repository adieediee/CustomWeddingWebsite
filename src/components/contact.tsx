import styles from "./contact.module.css";
import Envelop from "./envelop";

export default function Contact() {
  return (
    <div className={styles.contact}>
      <h2>Nechajte nám spomienku</h2>
      <p>Budeme šťastní, ak nám zanecháte pár slov, ktoré si prečítame po našom veľkom dni</p>
      <div className={styles.envelop_container}>
        <div className={styles.pattern}>
          <div>
            <span>A teraz uz len spoločný život</span>
            <span>A teraz uz len spoločný život</span>
            <span>A teraz uz len spoločný život</span>
          </div>
          <div>
            <span>A teraz uz len spoločný život</span>
            <span>A teraz uz len spoločný život</span>
            <span>A teraz uz len spoločný život</span>
          </div>
          <div>
            <span>A teraz uz len spoločný život</span>
            <span>A teraz uz len spoločný život</span>
            <span>A teraz uz len spoločný život</span>
          </div>
        </div>
        <Envelop />
      </div>
    </div>
  );
}
