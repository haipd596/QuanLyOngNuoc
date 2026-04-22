import styled from "styled-components";

/* ===== Section ===== */
export const Section = styled.section`
  max-width: 50%;
  margin: 0 auto 6rem auto;
  padding: 0 1.5rem;
`;

/* ===== Banner Wrapper ===== */
export const BannerWrapper = styled.div`
  position: relative;
  background: var(--primary);
  border-radius: 2rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 250px; /* Chiều cao banner mobile */

  @media (min-width: 768px) {
    flex-direction: row;
    height: 400px; /* Chiều cao banner desktop */
  }
`;

/* ===== Overlay Pattern ===== */
export const OverlayPattern = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.1;
  background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0);
  background-size: 24px 24px;
`;

/* ===== Content ===== */
export const BannerContent = styled.div`
  position: relative;
  z-index: 10;
  flex: 1;
  padding: 2rem;

  @media (min-width: 768px) {
    padding: 4rem;
  }
`;

export const BannerTitle = styled.h2`
  font-size: 2rem;
  font-weight: 900;
  line-height: 1.2;
  color: orange;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

export const BannerDesc = styled.p`
  margin-top: 2rem;
  font-size: 1.5rem;
  color: #fff;
  line-height: 1.6;
`;

/* ===== Button ===== */
export const BannerButton = styled.button`
  margin-top: 2rem;
  padding: 0.8rem 2rem;
  font-weight: 700;
  color: white;
  background: var(--secondary);
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05); /* phóng to nhẹ */
  }
`;

/* ===== Image ===== */
export const BannerImageWrapper = styled.div`
  flex: 1;
  width: 100%;
  height: 100%; /* Chiếm toàn bộ chiều cao BannerWrapper */
`;

export const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

