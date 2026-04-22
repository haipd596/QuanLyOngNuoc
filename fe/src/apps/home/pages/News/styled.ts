import styled from 'styled-components';
import { Link } from '@tanstack/react-router';

/* =======================
   Layout
======================= */
export const NewsContainer = styled.div`
  max-width: 85%;
  margin: 0 auto;
  padding: 28px 4rem 48px;
  background: #fff;

  @media (max-width: 768px) {
    padding: 24px 16px;
  }
`;

export const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

/* =======================
   Card
======================= */
export const NewsCardWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background-color: #ffffff;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

/* =======================
   Image
======================= */
export const NewsImageWrapper = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  flex-shrink: 0;
`;

export const NewsImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

/* =======================
   Content
======================= */
export const NewsCardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  flex: 1;
`;

/* =======================
   Badge / Category
======================= */
export const NewsCategory = styled.span`
  align-self: flex-start;
  margin-bottom: 8px;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  color: var(--primary);
  background-color: rgba(185, 28, 28, 0.06);
`;

/* =======================
   Title & Description
======================= */
export const NewsCardTitle = styled.h3`
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  line-height: 1.4;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${NewsCardWrapper}:hover & {
    color: var(--primary);
  }
`;

export const NewsCardDescription = styled.p`
  margin-bottom: 16px;
  font-size: 14px;
  color: #4b5563;
  line-height: 1.5;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

/* =======================
   Footer / Meta
======================= */
export const NewsCardFooter = styled.div`
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 13px;
  color: #6b7280;
`;

export const NewsAuthor = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;

  svg {
    font-size: 14px;
  }
`;

export const NewsDate = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;

  svg {
    font-size: 14px;
  }
`;

/* =======================
   Empty State
======================= */
export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: #999;

  h3 {
    font-size: 18px;
    margin: 16px 0 8px;
    color: #666;
  }

  p {
    font-size: 14px;
  }
`;