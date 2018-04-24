import { Inject, Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Quote } from "../domain/quote.model";

@Injectable()
export class QuoteService {
  // private uri: string = 'https://api.hzy.pw/saying/v1/ciba';
  constructor(@Inject("BASE_CONFIG") private config, private http: Http) {}

  getQuote(): Observable<Quote> {
    const uri = `${this.config.uri}/quotes/${Math.floor(Math.random() * 10)}`;
    return this.http
      .get(uri)
      .debug("quote: ")
      .map(res => res.json() as Quote);
  }
}
