import { MapCard } from "./styled";

const ContactMap = () => {
  return (
    <MapCard>
      <iframe
        title="Bản đồ liên hệ"
        src="https://www.google.com/maps?q=54%20Tri%E1%BB%81u%20Kh%C3%BAc%2C%20Thanh%20Xu%C3%A2n%2C%20H%C3%A0%20N%E1%BB%99i&z=17&output=embed"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </MapCard>
  );
};

export default ContactMap;
