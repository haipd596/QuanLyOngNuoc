const EXCLUDED_TAGS = new Set([
  'MARK',
  'SCRIPT',
  'STYLE',
  'NOSCRIPT',
  'IFRAME',
  'OBJECT',
  'TEXTAREA',
  'INPUT',
]);

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const normalizeTerms = (keyword: string) => {
  const rawTerms = keyword
    .trim()
    .split(/\s+/)
    .map((item) => item.trim())
    .filter(Boolean);

  const meaningfulTerms = rawTerms.filter((item) => item.length > 1);
  const terms = meaningfulTerms.length > 0 ? meaningfulTerms : rawTerms;

  return Array.from(new Set(terms)).sort((left, right) => right.length - left.length);
};

const buildHighlightRegex = (keyword: string) => {
  const terms = normalizeTerms(keyword);
  if (!terms.length) return null;

  return new RegExp(`(${terms.map(escapeRegExp).join('|')})`, 'giu');
};

const shouldSkipNode = (node: Node) => {
  const parent = node.parentElement;
  if (!parent) return true;

  return EXCLUDED_TAGS.has(parent.tagName) || !node.textContent?.trim();
};

const highlightTextNode = (doc: Document, textNode: Text, matcher: RegExp) => {
  const text = textNode.textContent || '';
  matcher.lastIndex = 0;

  if (!matcher.test(text)) {
    return;
  }

  matcher.lastIndex = 0;
  const fragment = doc.createDocumentFragment();
  let lastIndex = 0;
  let match: RegExpExecArray | null = matcher.exec(text);

  while (match) {
    const matchedText = match[0];
    const matchIndex = match.index;

    if (matchIndex > lastIndex) {
      fragment.appendChild(doc.createTextNode(text.slice(lastIndex, matchIndex)));
    }

    const mark = doc.createElement('mark');
    mark.className = 'vbpl-fulltext-match';
    mark.textContent = matchedText;
    fragment.appendChild(mark);

    lastIndex = matchIndex + matchedText.length;
    match = matcher.exec(text);
  }

  if (lastIndex < text.length) {
    fragment.appendChild(doc.createTextNode(text.slice(lastIndex)));
  }

  textNode.parentNode?.replaceChild(fragment, textNode);
};

export const highlightHtml = (html: string, keyword?: string) => {
  const normalizedKeyword = keyword?.trim();
  if (!html || !normalizedKeyword) return html;

  if (
    typeof DOMParser === 'undefined' ||
    typeof NodeFilter === 'undefined'
  ) {
    return html;
  }

  const matcher = buildHighlightRegex(normalizedKeyword);
  if (!matcher) return html;

  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');
  const root = doc.body.firstElementChild;

  if (!root) return html;

  const walker = doc.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => (
        shouldSkipNode(node)
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_ACCEPT
      ),
    },
  );

  const textNodes: Text[] = [];
  let currentNode = walker.nextNode();

  while (currentNode) {
    textNodes.push(currentNode as Text);
    currentNode = walker.nextNode();
  }

  textNodes.forEach((node) => highlightTextNode(doc, node, matcher));

  return root.innerHTML;
};

export default highlightHtml;
