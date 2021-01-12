
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/ui/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  window.addEventListener('resize', (e =>{
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }));


  let xhr = new XMLHttpRequest();
  let loc = 'https://prodnexgencdn.blob.core.windows.net/geniusats/build/storefront/assets/sprite.symbol.svg';
  
  xhr.open('GET', loc, true);
  xhr.onload = (e) => {
      if (xhr.readyState === 4) {
          if (xhr.status === 200) {
              let body = document.body;
              const element = document.createElement('div');
              element.innerHTML = xhr.responseText;
              body.insertBefore(element, body.firstChild);
          } else {
              console.error('SVGs failed to load');
          }
      }
  };
  
  xhr.send(null);
  