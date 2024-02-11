const componentsContext = import.meta.glob('./**/index.vue');

const componentNames = Object.keys(componentsContext).map((path) => {
  const componentName = path.slice(2, -10); // Extract component name from the path
  return componentName;
});

export default componentNames;