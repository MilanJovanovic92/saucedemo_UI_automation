import { PlaywrightTestConfig } from '@playwright/test';
import * as envURLs from './environments.json';

const env = {
    prod: envURLs.prod,
    test: envURLs.stage
}

export const config: PlaywrightTestConfig = {
    expect: {
        timeout: 5000
    },
    reporter: [
        ['junit', { outputFile: 'reports/results-junit.xml'}],
        ['html', { outputFolder: 'reports/html/'}]
    ],
    forbidOnly: !!process.env.CI,
    use: {
        baseURL: env[process.env.env],
        screenshot: 'on',
        acceptDownloads: true,
        trace: 'on',
        headless: false,
        browserName: 'chromium'
    },
    grep: [new RegExp(process.env.tags)],
    retries: 1
};

export default config;