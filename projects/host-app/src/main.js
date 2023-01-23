function main() {
    window.FeatureFooUrl = "http://localhost:8001";
    window.FeatureBarUrl = "http://localhost:8002";
    
    import("./App.jsx").then(({ mount }) => {
        mount();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    main();
});
