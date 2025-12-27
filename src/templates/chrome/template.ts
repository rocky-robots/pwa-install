import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { WebAppManifest } from 'web-app-manifest';
import { msg } from '@lit/localize';
import { ManifestScreenshot } from '../../types/types';

const template = (name: string, description: string, installDescription: string, disableDescription: boolean, disableScreenshots: boolean, disableClose: boolean, icon: string, manifest: WebAppManifest, installAvailable: any, hideDialog: any, install: any, toggleGallery: any, galleryRequested: boolean, toggleHowTo: any, howToRequested: boolean, isAndroidFallback: boolean, isRTL: boolean = false) => {
    const installDialogClasses = () => { return {available: installAvailable, gallery: galleryRequested }};
    const screenshotsAvailable = !disableScreenshots && manifest.screenshots && manifest.screenshots.length;

    return html`
        <div id="pwa-install-element" dir="${isRTL ? 'rtl' : 'ltr'}">
            <div class="install-dialog chrome ${classMap(installDialogClasses())}">
                <div class="dialog-body">
                    <div class="icon">
                        <img src="${icon}" alt="icon" class="icon-image" draggable="false">
                    </div>
                    <div class="about">
                        <div class="name">
                            <label>${name}</label>
                            ${!disableClose? html`<button class="material-button secondary close" @click='${hideDialog}'>
                                <svg viewBox="0 0 24 24"><path d="M5.3 18.7c.2.2.4.3.7.3s.5-.1.7-.3l5.3-5.3 5.3 5.3a1.08 1.08 0 0 0 .7.3 1.08 1.08 0 0 0 .7-.3c.4-.4.4-1 0-1.4L13.4 12l5.3-5.3c.4-.4.4-1 0-1.4s-1-.4-1.4 0L12 10.6 6.7 5.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l5.3 5.3-5.3 5.3c-.4.4-.4 1 0 1.4z"/></svg>
                            </button>` : ''}
                        </div>
                        <div class="hostname" style="display: none;">${location.hostname}</div>
                    </div>
                    ${description ? html `<div class="description app-description">${description}</div>`: ''}
                    ${!disableDescription? 
                        html`<hr><div class="description install-description">${installDescription? installDescription: `${msg('This site has app functionality.')} ${msg('Install it on your device for extensive experience and easy access.')}`}</div>` 
                        : ''}
                    ${screenshotsAvailable && installAvailable? html`<pwa-gallery .screenshots=${manifest.screenshots as ManifestScreenshot[]} .rtl="${isRTL}"></pwa-gallery>`: ''}
                    ${true? html`<hr><table class="description app-descriptiony">
                        <tr class="description-step">
                            <td class="svg-wrap">
                                <svg height="24" viewBox="0 -960 960 960" width="24" fill=""><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>
                            </td>
                            <td class="step-text">${msg('Open your browser menu')}</td>
                        </tr>
                        <tr class="description-step">
                            <td class="svg-wrap add-icon">
                                <svg height="24" viewBox="0 -960 960 960" width="24"><path d="M320-40q-33 0-56.5-23.5T240-120v-160h80v40h400v-480H320v40h-80v-160q0-33 23.5-56.5T320-920h400q33 0 56.5 23.5T800-840v720q0 33-23.5 56.5T720-40H320Zm0-120v40h400v-40H320ZM176-280l-56-56 224-224H200v-80h280v280h-80v-144L176-280Zm144-520h400v-40H320v40Zm0 0v-40 40Zm0 640v40-40Z"/></svg>
                            </td>
                            <td class="step-text">${msg('Tap "Add to Home screen"')}</td>
                        </tr>
                    </table>`:''}
                    <div class="action-buttons">
                        ${screenshotsAvailable? html`<button class="material-button secondary" @click='${toggleGallery}'>${galleryRequested?msg('Less'):msg('More')}</button>`:''}
                        ${false && installAvailable? html`<button class="material-button primary install" @click='${install}'>${msg('Install')}</button>`:""}
                    </div>
                </div>
            </div>
            <div class="install-dialog chrome mobile ${classMap(installDialogClasses())}">
                <pwa-bottom-sheet .props=${{name, icon, description}} .disableClose=${disableClose} .install=${install} .hideDialog=${hideDialog} .toggleHowTo=${toggleHowTo} .howToRequested=${howToRequested} .fallback=${isAndroidFallback}>
                    ${screenshotsAvailable && installAvailable? html`<pwa-gallery .screenshots=${manifest.screenshots as ManifestScreenshot[]} .rtl="${isRTL}"></pwa-gallery>`: ''}
                </pwa-bottom-sheet>
            </div>
        </div>`;
};
export default template;
