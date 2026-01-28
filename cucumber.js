export default {
    paths: ["tests/features/**/*.feature"],

    import: ["tests/step-definitions/**/*.ts"],

    requireModule: ['ts-node/register'],

    format: [
        "progress-bar",
        "html:tests/reports/cucumber-report.html",
        "json:tests/reports/cucumber-report.json",
    ],

    formatOptions: {
        snippetInterface: "async-await",
    },
};
