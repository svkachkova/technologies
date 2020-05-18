task('compileScripts', () => {
    const tsProject = ts.createProject("src/ts/tsconfig.json");

    return tsProject.src()
    .pipe(tsProject())
    .js.pipe(dest(dir.build + 'js/'));
});