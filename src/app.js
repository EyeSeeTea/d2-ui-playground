import React from 'react';
import { render } from 'react-dom';
import log from 'loglevel';
import { init, config, getUserSettings, getManifest } from 'd2/lib/d2';
import Root from './Root';
import { configI18n } from './util/i18n';
import fp from 'lodash/fp';
import '../scss/app.scss';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

log.setLevel(
    process.env.NODE_ENV === 'production' ? log.levels.INFO : log.levels.TRACE
);

getManifest('manifest.webapp')
    .then(manifest => {
        const baseUrl =
            process.env.NODE_ENV === 'production'
                ? manifest.getBaseUrl()
                : DHIS_CONFIG.baseUrl;
        config.baseUrl = `${baseUrl}/api/29`;
        config.context = manifest.activities.dhis; // Added temporarily for util/api.js

        log.info(`Loading: ${manifest.name} v${manifest.version}`);
        log.info(`Built ${manifest.manifest_generated_at}`);
    })
    .then(getUserSettings)
    .then(configI18n)
    .then(init)
    .then(
        d2 => {
            console.log("d2", d2);
            window.fp = fp;

            window.d2 = d2;
            if (!d2.currentUser.authorities.has('F_SYSTEM_SETTING')) {
                console.log("Current user has no 'F_SYSTEM_SETTING'");
                //return;
            }

            render(
                <Root d2={d2} />,
                document.getElementById('app')
            );
        },
        err => {
            log.error('Failed to initialize D2:', JSON.stringify(err));
            document.write(`D2 initialization error: ${err}`);
        }
    );