/* eslint-disable no-plusplus */
function xmlToJson(xmlNode: any) {
  const obj: any = {};

  if (xmlNode.nodeType === 3) {
    return { __text: xmlNode.nodeValue.trim() };
  }

  if (xmlNode.prefix) {
    obj.__prefix = xmlNode.prefix;
  }

  if (xmlNode.attributes) {
    for (let i = 0; i < xmlNode.attributes.length; i++) {
      const attr = xmlNode.attributes[i];
      obj[`_${attr.name}`] = attr.value;
    }
  }

  for (let i = 0; i < xmlNode.childNodes.length; i++) {
    const child = xmlNode.childNodes[i];
    const childName = child.nodeName.replace(/.+:/, '');
    const childJson = xmlToJson(child);

    if (Object.keys(childJson).length === 1 && childJson.__text) {
      obj[childName] = { __text: childJson.__text };
      if (child.prefix) obj[childName].__prefix = child.prefix;
    } else if (obj[childName]) {
      if (!Array.isArray(obj[childName])) {
        obj[childName] = [obj[childName]];
      }
      obj[childName].push(childJson);
    } else {
      obj[childName] = childJson;
    }
  }

  return obj;
}

export function parseXmlStringToJson(xmlString: string) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

  return xmlToJson(xmlDoc.documentElement);
}
