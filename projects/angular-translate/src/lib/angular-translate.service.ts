import { Inject, Injectable } from '@angular/core'
import { flatten as flattenObject } from 'flat'
import { vsprintf } from 'sprintf-js'

interface translations {
  [k: string]: string | translations
}
@Injectable({
  providedIn: 'root'
})

export class AngularTranslateService {
  translationsWhat: { [k: string]: string }

  constructor (
    @Inject('DICTIONARY') private readonly incomingTranslation: any
  ) {
    console.log('inject')
    this.translationsWhat = flattenObject(this.incomingTranslation)
    console.log('newTranslate', this.incomingTranslation, this.translationsWhat)
    this.translate = this.translate.bind(this)
  }

  setTranslations (value: unknown): void {
    this.translationsWhat = flattenObject(value)
  }

  hasTranslation (value: string): boolean {
    return Boolean(this.translationsWhat[value])
  }

  translate (value: string, parameters: any[] = []): string {
    console.log('translate', value, this.translationsWhat)
    const translated = (this.hasTranslation(value)) ? this.translationsWhat[value] : value
    try {
      console.log('translated', translated, vsprintf(translated, parameters))
      return vsprintf(translated, parameters)
    } catch (e) {
      return translated.replace(/%s|%d/gi, '')
    }
  }

  translatePart (key: string, index: number): string {
    if (this.hasTranslation(key)) {
      const translatedParts = this.getParts(this.translationsWhat[key])
      return translatedParts.length > index
        ? translatedParts[index]
        : this.getDefaultForPart(key, index)
    } else {
      return this.getDefaultForPart(key, index)
    }
  }

  translateChunk (object: translations): translations {
    return Object.keys(object).reduce((translated, key) => Object.assign({}, translated, { [key]: this.deepTranslate(object[key]) }), {})
  }

  private deepTranslate (value: string | translations): string | translations {
    return typeof value === 'string' ? this.translate(value) : this.translateChunk(value as any)
  }

  private getParts (text: string): string[] {
    return text.split(/%s|%d/gi)
  }

  private getDefault (key: string): string {
    return key.replace(/%s|%d/gi, '')
  }

  private getDefaultForPart (key: string, index: number): string {
    return `${this.getDefault(key)}[${index}]`
  }
}
