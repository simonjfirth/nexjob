
import { Injectable, } from '@angular/core';
import iziToast from 'izitoast';

@Injectable(
    {
        providedIn: 'root'
    }
)

export class ToastService {

    constructor() { }

    notification(title: string, message: string, complete?: () => void, cancel?: () => void) {
        iziToast.question({
            title: title,
            message: message,
            color: '#fff',
            timeout: 0,
            progressBarColor: '#92d0e6',
            class: 'large-modal',
            position: 'center',
            overlay: true,
            close: false,
            buttons: [
                ['<button>Confirm</button>', function (instance, t) {
                    if (!!complete && typeof complete === 'function') {
                        complete();
                    }
                    instance.hide({ transitionOut: 'fadeOut' }, t, 'button');
                }, true],
                ['<button>Cancel</button>', function (instance, toast) {
                    if (!!cancel && typeof cancel === 'function') {
                        cancel();
                    }
                    instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                }, true]
            ],
        });
    }

    question(title: string, message: string, complete?: (reason: string) => void, cancel?: () => void) {
        iziToast.question({
            title: title,
            message: message,
            color: '#fff',
            timeout: 0,
            progressBarColor: '#dd984e',
            class: 'large-modal',
            position: 'center',
            overlay: true,
            close: false,
            buttons: [
                ['<button>Confirm</button>', function (instance, t) {
                    if (!!complete && typeof complete === 'function') {
                        let el = <any>document.getElementById('izitoast--input');
                        complete(el.value);
                    }
                    instance.hide({ transitionOut: 'fadeOut' }, t, 'button');
                }, false],
                ['<button>Cancel</button>', function (instance, toast) {
                    if (!!cancel && typeof cancel === 'function') {
                        cancel();
                    }
                    instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                }, false]
            ],

            inputs: [
                ['<textarea id="izitoast--input" placeholder="reason" required></textarea>', 'keyup', function (instance, t) {

                }, true],

            ],
        });
    }

    simpleQuestion(title: string, message: string, value?: string, complete?: (reason: string) => void, cancel?: () => void) {
        iziToast.question({
            title: title,
            message: message,
            color: '#fff',
            theme: 'light',
            timeout: 0,
            icon: null,
            progressBarColor: '#3c6473',
            class: 'large-modal',
            position: 'center',
            overlay: true,
            close: false,
            buttons: [
                ['<button>Confirm</button>', function (instance, t) {
                    if (!!complete && typeof complete === 'function') {
                        let el = <any>document.getElementById('izitoast--input');
                        complete(el.value);
                    }
                    instance.hide({ transitionOut: 'fadeOut' }, t, 'button');
                }, false],
                ['<button>Cancel</button>', function (instance, toast) {
                    if (!!cancel && typeof cancel === 'function') {
                        cancel();
                    }
                    instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                }, false]
            ],

            inputs: [
                [`<input id="izitoast--input" value="${value}"  required/>`, 'keyup', function (instance, t) {

                }, true],

            ],
        });
    }


    success(message: string, complete?: () => void, timeout?: number) {
        iziToast.success({
            message: message,
            class: 'success',
            position: 'bottomRight',
            theme: 'light',
            iconColor: '#fff',
            timeout: 2000,
            onClosing: function (data: any) {
                if (!!complete && typeof complete === 'function') {
                    complete();
                }
            }
        });
    }

    warn(message: string, complete?: () => void, timeout?: number) {
        iziToast.warning({
            message: message,
            class: 'warn',
            position: 'bottomRight',
            theme: 'light',
            iconColor: '#fff',
            timeout: 2000,
            onClosing: function (data: any) {
                if (!!complete && typeof complete === 'function') {
                    complete();
                }
            }
        });
    }

    warnTopLeft(message: string, complete?: () => void, timeout?: number) {
        iziToast.warning({
            message: message,
            class: 'warn',
            position: 'topRight',
            theme: 'light',
            iconColor: '#fff',
            timeout: 2000,
            onClosing: function (data: any) {
                if (!!complete && typeof complete === 'function') {
                    complete();
                }
            }
        });
    }

    error(message: string, timeout?: number) {
        iziToast.error({
            message: message,
            class: 'error',
            position: 'bottomRight',
            theme: 'light',
            iconColor: '#fff',
            timeout: 2000
        });
    }

}
