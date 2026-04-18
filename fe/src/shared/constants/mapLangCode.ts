export const mapLangCode = (lang?: string) => {
  switch (lang) {
    case "vi":
      return "vi";
    case "en":
      return "en";
    case "cn":
      return "cn";
    case "jp":
      return "jp";
    case "kr":
      return "kr";
    default:
      return "vi";
  }
};