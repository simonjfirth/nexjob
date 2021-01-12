import { IConfig } from './config.interfaces';


export class BaseConfigService {

     public readonly config: IConfig;

     constructor() {
          this.config = this.getClientConfig();
     }

     getClientConfig() {
          let clientId = this._getClientId();
          let token = this._getConfigItem('data-tokenurl');
          let apiurl = this._getConfigItem('data-apiurl');
          let apiversion = this._getConfigItem('data-apiversion');
          let cdnUrl = this._getConfigItem('data-cdn');

          return <IConfig>{
               apiRootUrl: apiurl,
               clientId: clientId,
               apiTokenUrl: token,
               apiVersion: apiversion,
               cdn: cdnUrl
          };
     }

     protected _resolveUrl(urlToResolve: string) {
          let resolvedUrl = urlToResolve;
          resolvedUrl = resolvedUrl.replace('{clientId}', this.config.clientId);
          resolvedUrl = resolvedUrl.replace('{cdn}', this.config.cdn);
          resolvedUrl = resolvedUrl.replace('{api}', this.config.apiRootUrl);
          resolvedUrl = resolvedUrl.replace('{version}', this.config.apiVersion);
          resolvedUrl = resolvedUrl.replace(/\/+/ig, '/');
          return this._removeDoubleSlash(resolvedUrl);
     }

     protected _removeTrailingSlash(urlToResolve: string) {
          return urlToResolve.replace(/\/$/ig, '');
     }

     protected _removeDoubleSlash(urlToResolve: string) {
          return urlToResolve.replace(/\/+/ig, '/').replace(':/', '://');
     }


     private _getClientId() {
          let CLIENT_ID = null;
          let head = document.head;
          CLIENT_ID = head.getAttribute('data-clientid');
          if (!/^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-5][0-9a-f]{3}-?[089ab][0-9a-f]{3}-?[0-9a-f]{12}$/i.test(CLIENT_ID)) {
               throw new Error('Not a valid client ID');
          } else {
               CLIENT_ID = CLIENT_ID.toUpperCase();
          }
          return CLIENT_ID;
     }

     private _getConfigItem(selector: string) {
          let head = document.head;
          return head.getAttribute(selector);
     }
}