import DOMPurify from 'dompurify';

export type CleanHtmlOptions = {
  removeWordClasses?: boolean;
  removeLangAttr?: boolean;
  normalizeNbsp?: boolean;
};

export const cleanHtml = (
  html: string,
  options: CleanHtmlOptions = {}
) => {
  if (!html) return '';

  const {
    removeWordClasses = true,
    removeLangAttr = true,
    normalizeNbsp = true,
  } = options;

  let cleaned = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
  });

  if (removeWordClasses) {
    cleaned = cleaned.replace(/class="Mso[^"]*"/g, '');
  }

  if (removeLangAttr) {
    cleaned = cleaned.replace(/\s?lang="[^"]*"/g, '');
  }

  if (normalizeNbsp) {
    cleaned = cleaned.replace(/&nbsp;/g, ' ');
  }

  return cleaned.trim();
};
