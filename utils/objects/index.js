function underlineToCamel(data) {
  if (typeof data != "object" || !data) return data;
  if (Array.isArray(data)) {
    return data.map((item) => underlineToCamel(item));
  }

  const newData = {};
  for (const key in data) {
    const newKey = key.replace(/_([a-z])/g, (p, m) => m.toUpperCase());
    newData[newKey] = underlineToCamel(data[key]);
  }
  return newData;
}

module.exports = { underlineToCamel };
