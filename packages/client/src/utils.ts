export const truncate = (str: string, maxlength: number) => {
  return str.length > maxlength ? str.slice(0, maxlength - 1) + "…" : str;
};

export const fill = (text: string, values: Object) => {
  // there are edge cases that I'm going to ignore for now
  let finalMessage = text;

  for (const variable of Object.keys(values)) {
    const template = `{{${variable}}}`;
    const value = `${(values as any)[variable]}`;

    finalMessage = finalMessage.replaceAll(template, value);
  }

  return finalMessage;
};
