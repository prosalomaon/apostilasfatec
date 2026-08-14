module.exports = function (eleventyConfig) {
  // Passthrough static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/imagens");

  // Layout aliases
  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');
  eleventyConfig.addLayoutAlias('aula', 'layouts/aula.njk');
  eleventyConfig.addLayoutAlias('exercicio', 'layouts/exercicio.njk');
  eleventyConfig.addLayoutAlias('dashboard', 'layouts/dashboard.njk');
  eleventyConfig.addLayoutAlias('questionario', 'layouts/questionario.njk');

  // Universal Collection for Lessons
  eleventyConfig.addCollection("aulas", function (collectionApi) {
    return collectionApi.getFilteredByTag("aula")
      .filter(item => item.data.aula_numero)
      .sort((a, b) => {
        const subjectA = a.data.subject || "";
        const subjectB = b.data.subject || "";
        if (subjectA !== subjectB) return subjectA.localeCompare(subjectB);
        return parseInt(a.data.aula_numero) - parseInt(b.data.aula_numero);
      });
  });

  // Collection for Subjects (Dashboards)
  eleventyConfig.addCollection("subjects", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/componentes/*/index.njk").sort((a, b) => {
      return (a.data.subject_title || "").localeCompare(b.data.subject_title || "");
    });
  });


  // Helper to filter collections by subject and bimester
  const getLessons = (collection, subject, bimester) => {
    return collection
      .filter(item => item.data.subject === subject && item.data.tags.includes(bimester))
      .sort((a, b) => parseInt(a.data.aula_numero) - parseInt(b.data.aula_numero));
  };

  eleventyConfig.addNunjucksFilter("filterBySubjectBimester", function (collection, subject, bimester) {
    return getLessons(collection, subject, bimester);
  });

  return {
    pathPrefix: "/apostilas/",
    dir: {
      input: "src",
      output: "_site"
    }
  };
};

