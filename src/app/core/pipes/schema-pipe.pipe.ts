import { Pipe, PipeTransform } from '@angular/core';
import { VacancyDtoRead } from '../interfaces/custom.interfaces';
import { DomSanitizer } from '@angular/platform-browser';
import { Details } from '../interfaces/api.interfaces';
import { hiringOrganisations } from 'src/environments/environment.prod';
import { ConfigService } from '../config/config.service';
import { NgModelGroup } from '@angular/forms';

@Pipe({
  name: 'JobListing'
})
export class SchemaPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer, private _configService: ConfigService) {
  }

  transform(value: any, args?: any): any {
    if (!!value) {
      return this.schemaModel(value);
    }
    return null;
  }

  schemaModel(model: Details) {
    const descriptions = (<any>model).descriptions.map(o => o.Description).join('<br>');
  //  const hiring = hiringOrganisations.find(o => o.id === this._configService.clientId);
    const jobPosting = {
      "@context": "https://schema.org/",
      "@type": "JobPosting",
      "title": model.title,
      "url": document.URL,
      "description": descriptions,
      "datePosted": (<any>model).liveDate,
      "validThrough": model.externalClosing,
      "employmentType": model.contractTypeName,
      "hiringOrganization": {
        "@type": "Organization",
        "name": (<any>model).companyName,
        "sameAs": "",
        "logo": (<any>model).logoUrl
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": (<any>model).locationName,
          "addressLocality": "",
          "addressRegion": "",
          "postalCode": "",
          "addressCountry": "UK",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": (<any>model)?.latitude,
            "longitude": (<any>model)?.longitude
          }
        }
      },
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "GBP",
        "value": {
          "@type": "PropertyValue",
          "value": "false",
        }
      }
    }

    const json = jobPosting ? JSON.stringify(jobPosting, null, 2).replace(/<\/script>/g, '<\\/script>') : '';
    const html = `<script type="application/ld+json">${json}</script>`;
    const safeHtml = this.sanitizer.bypassSecurityTrustHtml(html);
    return safeHtml;
  }

}
