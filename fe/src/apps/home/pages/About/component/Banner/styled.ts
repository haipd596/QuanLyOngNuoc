import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Image = styled.img`
  width: 100%;
  height: 600px;
  object-fit: cover;
  display: block;
`;

export const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 8rem;
  transform: translateY(-50%);
  max-width: 100rem;
  color: #fff;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 36px;
  color: orange;
`;

export const Description = styled.p`
  font-size: 20px;
  line-height: 1.6;
  font-style: italic;
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5); 
`;
