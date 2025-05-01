export default {
    root: "./src",
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        rollupOptions: {
            input: {
                index: "./src/index.html",
                about: "./src/tictactoe.html",
            },
        },
    },
};