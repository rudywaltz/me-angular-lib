import { Pipe, PipeTransform } from '@angular/core'
import { AngularTranslateService } from './angular-translate.service'

@Pipe({ name: 'ngtranslate' })
export class AngularTranslatePipe implements PipeTransform {
  constructor (private readonly angularTranslateService: AngularTranslateService) {}

  transform (value: string, options: any[] = []): string {
    console.log('pipe', value)
    return this.angularTranslateService.translate(value, options)
  }
}
