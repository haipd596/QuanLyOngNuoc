export const OPTIONS_ACCEPT_DOCX = [
  {
    label: 'doc',
    value: 'application/msword',
  },
  {
    label: 'docx',
    value: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  },
];

export const OPTIONS_ACCEPT_PDF = [
  {
    label: 'pdf',
    value: 'application/pdf',
  },
];

export const OPTIONS_ACCEPT_UPLOAD = [
  ...OPTIONS_ACCEPT_DOCX,
  ...OPTIONS_ACCEPT_PDF,
  {
    label: 'xlsx',
    value: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
  {
    label: 'xls',
    value: 'application/vnd.ms-excel',
  },
];

export const OPTIONS_ACCEPT_OTHER_TYPES = [
  {
    label: 'jpg',
    value: 'image/jpeg',
  },
  {
    label: 'png',
    value: 'image/png',
  },
];

export const defaultAccept = OPTIONS_ACCEPT_UPLOAD.map(({ value }) => value);
