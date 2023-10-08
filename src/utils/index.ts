export const pickDataProps = (props: Record<string, unknown> = {}) => {
  const results: Record<string, unknown> = {};

  for (const key in props) {
    if (key.indexOf("data-") > -1) {
      results[key] = props[key];
    }
  }

  return results;
};
