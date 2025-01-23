import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdShareService {
  private id: number | undefined;

  constructor() {
    this.id = undefined;
  }

  public setId(id: number | undefined) {
    if (typeof id === 'string') {
      this.id = Number(id);
    } else {
      this.id = id;
    }
  }

  public getId() {
    return this.id;
  }
}
