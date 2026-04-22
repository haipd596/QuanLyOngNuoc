import styled from "styled-components";
import bgAbout from "@assets/images/bg-about.png";

export const Section = styled.section`
  background-image: url(${bgAbout});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 64px 48px;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

export const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin: 0 auto 28px;
`;

export const AvatarPlaceholder = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #ddd;
  margin: 0 auto 28px;
`;

export const QuoteText = styled.blockquote`
  font-size: 2rem;
  line-height: 1.9;
  color: #3a3a3a;
  font-style: italic;
  max-width: 60%;
  margin: 0 auto 20px;
  padding: 0;
  border: none;
`;

export const Author = styled.p`
  font-size: 1.3rem;
  color: #888;
  margin: 0;
  letter-spacing: 0.5px;
`;
